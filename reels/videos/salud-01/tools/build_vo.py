"""Ensambla la voz en off (sin clip externo): conserva pausas naturales (solo recorta > 0.38 s a 0.26 s),
coloca segmentos con aire entre frases y genera vo.wav + vo_timeline.json con palabras de subtítulo.
Uso: build_vo.py <dir_voz con vN.mp3/vN.json> <segs.tsv> <reemplazos.json> <salida.wav>"""
import json, subprocess, sys, os
import numpy as np, soundfile as sf

SR = 48000
VODIR, SEGS, REPL, OUT = sys.argv[1:5]
PRE_DEFAULT = 0.26      # aire entre frases
LEAD = 0.30             # el primer golpe visual/SFX va antes de la voz
TAIL = 1.25

def load(path):
    cmd = ["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).copy()

def fade(x, n):
    if n and len(x) > 2 * n:
        x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n)
    return x

def tighten(audio, words, maxgap=0.3, keep=0.22):
    start = max(0.0, words[0]["start"] - 0.04)
    end = words[-1]["end"] + 0.16
    pts = [start]
    for i in range(len(words) - 1):
        g = words[i + 1]["start"] - words[i]["end"]
        if g > maxgap:
            pts += [words[i]["end"] + keep / 2, words[i + 1]["start"] - keep / 2]
    pts.append(end)
    out, mapping = np.zeros(0, np.float32), []
    for j in range(0, len(pts), 2):
        s0, s1 = pts[j], pts[j + 1]
        mapping.append((s0, s1, len(out) / SR))
        out = np.concatenate([out, fade(audio[int(s0 * SR):int(s1 * SR)].copy(), int(0.008 * SR))])
    def remap(t):
        for s0, s1, o in mapping:
            if t <= s1 + 1e-6: return o + max(0.0, t - s0)
        s0, s1, o = mapping[-1]; return o + (s1 - s0)
    return out, [{**w, "start": remap(w["start"]), "end": remap(w["end"])} for w in words]

repl = json.load(open(REPL))  # [{"seq": ["doce","mil"], "show": "$12,000"}...] y {"word": "x", "show": "y"}
def apply_repl(words):
    out, i = [], 0
    while i < len(words):
        hit = None
        for r in repl:
            seq = r.get("seq")
            if seq and [w["text"].lower() for w in words[i:i + len(seq)]] == [s.lower() for s in seq]:
                hit = r; break
        if hit:
            n = len(hit["seq"])
            out.append({"text": hit["show"], "start": words[i]["start"], "end": words[i + n - 1]["end"]}); i += n
        else:
            w = dict(words[i]); i += 1
            for r in repl:
                if r.get("word") and r["word"].lower() == w["text"].lower(): w["text"] = r["show"]
            out.append(w)
    return out

segs = [l.rstrip("\n").split("\t") for l in open(SEGS, encoding="utf-8") if l.strip()]
timeline, track, cur = [], [], LEAD - PRE_DEFAULT
for sid, *rest in segs:
    pre = float(rest[1]) if len(rest) > 1 and rest[1] else PRE_DEFAULT
    t0 = cur + pre
    a, w2 = tighten(load(os.path.join(VODIR, sid + ".mp3")), json.load(open(os.path.join(VODIR, sid + ".json"))))
    words = apply_repl([{"text": w["text"], "start": round(t0 + w["start"], 3), "end": round(t0 + w["end"], 3)} for w in w2])
    dur = len(a) / SR
    timeline.append({"id": sid, "start": round(t0, 3), "end": round(t0 + dur, 3), "words": words})
    track.append((t0, a)); cur = t0 + dur
total = cur + TAIL
mix = np.zeros(int(total * SR) + SR, np.float32)
for t0, a in track:
    i = int(round(t0 * SR)); mix[i:i + len(a)] += a
sf.write(OUT, mix[:int(total * SR)], SR, subtype="PCM_24")
json.dump({"total": round(total, 3), "segments": timeline}, open(OUT.replace(".wav", "_timeline.json"), "w"), ensure_ascii=False, indent=1)
for s in timeline: print(s["id"], s["start"], s["end"], " ".join(w["text"] for w in s["words"]))
print("TOTAL", round(total, 3))
