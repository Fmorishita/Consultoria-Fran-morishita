"""Mezcla final: VO (+Gus nivelado), música con ducking por actividad de voz, SFX por cues.
Normaliza a -14 LUFS integrados con limitador de pico real a -1 dBTP."""
import json, sys, os
import numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfilt, resample_poly

SR = 48000
A = sys.argv[1]           # carpeta audio (vo.wav, vo_timeline.json, gen/)
OUTDIR = sys.argv[2]
os.makedirs(OUTDIR, exist_ok=True)
meter = pyln.Meter(SR)

vo, _ = sf.read(os.path.join(A, "vo.wav"), dtype="float32")
tl = json.load(open(os.path.join(A, "vo_timeline.json")))
music, _ = sf.read(os.path.join(A, "gen", "music.wav"), dtype="float32")
cues = json.load(open(os.path.join(A, "gen", "cues.json")))
N = len(vo)
music = np.pad(music, (0, max(0, N - len(music))))[:N]

# --- nivelar Gus contra la voz TTS ---
gus = next(s for s in tl["segments"] if s["id"] == "GUS")
g0, g1 = int(gus["start"] * SR), int(gus["end"] * SR)
mask = np.ones(N, bool); mask[g0:g1] = False
l_tts = meter.integrated_loudness(vo[mask][: int(25 * SR)])
seg = vo[g0:g1].copy()
seg = sosfilt(butter(2, 90, "high", fs=SR, output="sos"), seg)
l_gus = meter.integrated_loudness(seg)
gain_gus = 10 ** ((l_tts - l_gus + 0.5) / 20)
vo[g0:g1] = seg * gain_gus
print(f"TTS {l_tts:.1f} LUFS, Gus {l_gus:.1f} LUFS -> +{20*np.log10(gain_gus):.1f} dB")

# --- envolvente de actividad de voz para ducking ---
act = np.zeros(N, np.float32)
for s in tl["segments"]:
    for w in s["words"]:
        a, b = int((w["start"] - 0.05) * SR), int((w["end"] + 0.12) * SR)
        act[max(0, a):b] = 1.0
# suavizado (attack 40 ms / release 300 ms) por bloques de 1 ms
blk = SR // 1000
nb = N // blk
a_blk = act[: nb * blk].reshape(nb, blk).max(1)
env = np.zeros(nb); e = 0.0
for i in range(nb):
    tgt = a_blk[i]
    k = 1 / 40 if tgt > e else 1 / 300
    e += (tgt - e) * k
    env[i] = e
env = np.repeat(env, blk); env = np.pad(env, (0, N - len(env)), mode="edge")
duck_db = np.where(np.arange(N) >= g0, 0, 0).astype(np.float32)
music_gain_db = -1.0 - 9.0 * env               # -1 dB sin voz, -10 dB con voz
music_gain_db[g0 - int(0.3 * SR):g1 + int(0.1 * SR)] -= 5.0  # más abajo bajo Gus
music_d = music * (10 ** (music_gain_db / 20))

# --- SFX ---
sfx = np.zeros(N, np.float32)
lib = {}
for c in cues:
    if c["sfx"] not in lib:
        lib[c["sfx"]], _ = sf.read(os.path.join(A, "gen", f"sfx_{c['sfx']}.wav"), dtype="float32")
    x = lib[c["sfx"]]; i = int(c["t"] * SR)
    n = min(len(x), N - i)
    if n > 0: sfx[i:i + n] += x[:n] * c["gain"]

# --- niveles relativos de stems ---
VO_G, MUS_G, SFX_G = 1.0, 0.55, 0.42
mix = vo * VO_G + music_d * MUS_G + sfx * SFX_G

def true_peak_limit(x, ceiling_db=-1.0):
    ceil = 10 ** (ceiling_db / 20)
    up = resample_poly(x, 4, 1)
    pk = np.abs(up).reshape(-1, 4).max(1)[: len(x)]
    pk = np.pad(pk, (0, len(x) - len(pk)))
    need = np.minimum(1.0, ceil / np.maximum(pk, 1e-9))
    la = int(0.005 * SR)
    # mínimo en ventana de lookahead
    from scipy.ndimage import minimum_filter1d
    g = minimum_filter1d(need, size=2 * la + 1)
    out_g = np.empty_like(g); cur = 1.0
    rel = 1 / (0.08 * SR)
    for i in range(len(g)):
        cur = g[i] if g[i] < cur else min(g[i], cur + rel)
        out_g[i] = cur
    return x * out_g

# medir en estéreo (dual mono), que es lo que entrega el MP4
st = lambda m: np.stack([m, m], axis=1)
for it in range(4):
    L = meter.integrated_loudness(st(mix))
    mix = mix * 10 ** ((-14.0 - L) / 20)
    mix = true_peak_limit(mix, -2.0)
L = meter.integrated_loudness(st(mix))
up = resample_poly(mix, 4, 1)
tp = 20 * np.log10(np.max(np.abs(up)) + 1e-12)
print(f"MASTER {L:.2f} LUFS, true peak {tp:.2f} dBTP, dur {N/SR:.2f}s")
sf.write(os.path.join(OUTDIR, "master.wav"), st(mix).astype(np.float32), SR, subtype="PCM_24")
# stems para edición futura
sf.write(os.path.join(OUTDIR, "stem-voz.wav"), vo.astype(np.float32), SR, subtype="PCM_24")
sf.write(os.path.join(OUTDIR, "stem-musica.wav"), (music_d * MUS_G).astype(np.float32), SR, subtype="PCM_24")
sf.write(os.path.join(OUTDIR, "stem-sfx.wav"), (sfx * SFX_G).astype(np.float32), SR, subtype="PCM_24")
