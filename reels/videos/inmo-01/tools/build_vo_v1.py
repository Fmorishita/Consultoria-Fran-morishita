"""Ensambla la voz en off: recorta pausas largas, coloca segmentos cuantizados
a corcheas del tempo, inserta el clip de Gus y exporta vo.wav + timeline.json."""
import json, subprocess, sys, os
import numpy as np, soundfile as sf

SR = 48000
VODIR, GUS, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
BPM = 140.0
EIGHTH = 60.0 / BPM / 2

# mapeo de tokens TTS -> texto de subtítulo
CAPMAP = {"lid": "lead", "once": "11", "veinte": "20", "SISTEMA": "SISTEMA"}

def load(path, ss=None, t=None):
    cmd = ["ffmpeg", "-v", "error"]
    if ss is not None: cmd += ["-ss", str(ss)]
    if t is not None: cmd += ["-t", str(t)]
    cmd += ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).copy()

def fade(x, n_in, n_out):
    if n_in: x[:n_in] *= np.linspace(0, 1, n_in)
    if n_out: x[-n_out:] *= np.linspace(1, 0, n_out)
    return x

def tighten(audio, words, maxgap=0.2, keep=0.12, special=None):
    """Recorta silencios entre palabras > maxgap dejando `keep` s."""
    special = special or {}
    segs, out_words, cursor_src, t_out = [], [], 0.0, 0.0
    # rango útil: desde 30ms antes de la primera palabra
    start = max(0.0, words[0]["start"] - 0.03)
    cursor_src = start
    pieces = []
    for i, w in enumerate(words):
        out_words.append(dict(w))
    cuts = []  # (src_from, src_to) a eliminar
    for i in range(len(words) - 1):
        g = words[i + 1]["start"] - words[i]["end"]
        k = special.get(words[i]["text"], keep)
        if g > maxgap or words[i]["text"] in special:
            if g > k:
                mid_keep_a = words[i]["end"] + k * 0.5
                mid_keep_b = words[i + 1]["start"] - k * 0.5
                cuts.append((mid_keep_a, mid_keep_b))
    end = words[-1]["end"] + 0.14
    # construir audio
    xf = int(0.006 * SR)
    a, removed_before = [], []
    src_pts = [start] + [p for c in cuts for p in c] + [end]
    chunks = [(src_pts[j], src_pts[j + 1]) for j in range(0, len(src_pts), 2)]
    out = np.zeros(0, dtype=np.float32)
    mapping = []  # (src_start, src_end, out_start)
    for (s0, s1) in chunks:
        seg = audio[int(s0 * SR):int(s1 * SR)].copy()
        seg = fade(seg, xf, xf)
        mapping.append((s0, s1, len(out) / SR))
        out = np.concatenate([out, seg])
    def remap(t):
        for s0, s1, o in mapping:
            if t <= s1 + 1e-6:
                return o + max(0.0, t - s0)
        s0, s1, o = mapping[-1]
        return o + (s1 - s0)
    for w in out_words:
        w["start"], w["end"] = remap(w["start"]), remap(w["end"])
    return out, out_words

order = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "GUS", "v9"]
# pausa mínima ANTES de cada bloque (s)
pre = {"v1": 0.18, "v2": 0.10, "v3": 0.10, "v4": 0.22, "v5": 0.30, "v6": 0.18, "v7": 0.18, "v8": 0.28, "GUS": 0.12, "v9": 0.30}
quantize = {"v4", "v5", "v8", "v9"}  # arranques en corchea
TAIL = 1.7

timeline, cur, track = [], 0.0, []
for sid in order:
    t0 = cur + pre[sid]
    if sid in quantize:
        t0 = np.ceil(t0 / EIGHTH) * EIGHTH
    if sid == "GUS":
        ms, md = 7.0, 4.95
        a = load(GUS, ms, md)
        a = fade(a, int(0.04 * SR), int(0.08 * SR))
        g = json.load(open(os.path.join(os.path.dirname(OUT), "gus_words.json")))
        words = [{"text": w["text"], "start": t0 + w["start"] - ms, "end": t0 + w["end"] - ms} for w in g if w["start"] >= ms - 0.1 and w["end"] <= ms + md + 0.05]
        timeline.append({"id": sid, "start": round(t0, 3), "end": round(t0 + md, 3), "media_start": ms, "duration": md, "words": words})
        track.append((t0, a, 1.0))
        cur = t0 + md
        continue
    audio = load(os.path.join(VODIR, sid + ".mp3"))
    words = json.load(open(os.path.join(VODIR, sid + ".json")))
    special = {"Funciona": 0.30}
    a, w2 = tighten(audio, words, special=special)
    words_g = []
    for w in w2:
        txt = CAPMAP.get(w["text"], w["text"])
        words_g.append({"text": txt, "start": round(t0 + w["start"], 3), "end": round(t0 + w["end"], 3)})
    # fusiona "I" "A" -> "IA"
    merged = []
    for w in words_g:
        if merged and merged[-1]["text"] == "I" and w["text"] == "A":
            merged[-1]["text"] = "IA"; merged[-1]["end"] = w["end"]
        else:
            merged.append(w)
    dur = len(a) / SR
    timeline.append({"id": sid, "start": round(t0, 3), "end": round(t0 + dur, 3), "words": merged})
    track.append((t0, a, 1.0))
    cur = t0 + dur

total = cur + TAIL
mix = np.zeros(int(total * SR) + SR, dtype=np.float32)
for t0, a, g in track:
    i = int(round(t0 * SR)); mix[i:i + len(a)] += a * g
mix = mix[:int(total * SR)]
sf.write(OUT, mix, SR, subtype="PCM_24")
json.dump({"bpm": BPM, "total": round(total, 3), "segments": timeline}, open(OUT.replace(".wav", "_timeline.json"), "w"), ensure_ascii=False, indent=1)
for s in timeline:
    print(s["id"], s["start"], s["end"], " ".join(w["text"] for w in s["words"]))
print("TOTAL", round(total, 3))
