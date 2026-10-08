"""Música original (trap/hype oscuro, 140 BPM, Fa menor) y SFX sintetizados.
Todo generado aquí con numpy: sin samples de terceros, uso comercial libre."""
import json, sys, os
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

SR = 48000
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def t_(d): return np.arange(int(d * SR)) / SR
def env_exp(d, tau): return np.exp(-t_(d) / tau)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, f1, f2, o=2): return sosfilt(butter(o, [f1, f2], 'band', fs=SR, output='sos'), x)
def norm(x, peak=0.9): m = np.max(np.abs(x)) + 1e-9; return x / m * peak
def midi(n): return 440.0 * 2 ** ((n - 69) / 12)

def place(buf, x, t0, g=1.0):
    i = int(round(t0 * SR))
    if i < 0: x = x[-i:]; i = 0
    n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n] * g

# ---------- instrumentos ----------
def kick(d=0.45):
    t = t_(d); f = 48 + 110 * np.exp(-t / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) * env_exp(d, 0.16)
    click = hp(rng.standard_normal(len(t)), 2500) * env_exp(d, 0.004) * 0.35
    return np.tanh(1.6 * (x + click))

def snare(d=0.3):
    t = t_(d)
    tone = np.sin(2 * np.pi * 185 * t) * env_exp(d, 0.05) * 0.6
    nz = bp(rng.standard_normal(len(t)), 1200, 9000) * env_exp(d, 0.09)
    return np.tanh(1.3 * (tone + nz))

def clap(d=0.35):
    nz = bp(rng.standard_normal(int(d * SR)), 900, 6000)
    e = np.zeros(len(nz))
    for k, o in enumerate([0, 0.011, 0.022]):
        i = int(o * SR); e[i:] += np.exp(-np.arange(len(e) - i) / SR / (0.012 if k < 2 else 0.12))
    return nz * e * 0.8

def hat(d=0.06, open_=False):
    d = 0.25 if open_ else d
    nz = hp(rng.standard_normal(int(d * SR)), 7000, 4)
    return nz * env_exp(d, 0.08 if open_ else 0.018) * 0.5

def sub808(freq, d, glide_from=None):
    t = t_(d)
    f = np.full(len(t), freq)
    if glide_from: f = freq + (glide_from - freq) * np.exp(-t / 0.06)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) + 0.25 * np.sin(2 * ph)
    e = np.minimum(1, t / 0.005) * np.exp(-t / (d * 0.9))
    return np.tanh(2.2 * x * e) * 0.8

def saw(freq, d, detune=(0, -0.11, 0.09)):
    t = t_(d); x = np.zeros(len(t))
    for dt in detune:
        f = freq * 2 ** (dt / 12); x += 2 * ((t * f) % 1.0) - 1
    return x / len(detune)

def pad(notes, d, cutoff=1400):
    x = sum(saw(midi(n), d) for n in notes) / len(notes)
    x = lp(x, cutoff, 2)
    a = int(0.25 * SR); r = int(0.4 * SR)
    e = np.ones(len(x)); e[:a] = np.linspace(0, 1, a); e[-r:] = np.linspace(1, 0, r)
    return x * e

def pluck(freq, d=0.35):
    t = t_(d)
    x = (2 * ((t * freq) % 1) - 1) * 0.6 + np.sin(2 * np.pi * freq * 2 * t) * 0.3
    return lp(x, 3200) * env_exp(d, 0.09)

def bell(freq, d=1.2):
    t = t_(d)
    x = np.sin(2 * np.pi * freq * t + 1.8 * np.sin(2 * np.pi * freq * 3.5 * t) * np.exp(-t / 0.3))
    return x * env_exp(d, 0.35)

# ---------- música ----------
BPM = 140.0; BEAT = 60 / BPM; BAR = 4 * BEAT
TOTAL = float(sys.argv[2])
music = np.zeros(int((TOTAL + 2) * SR))
# Fm - Db - Ab - Eb  (i VI III VII)
CHORDS = [[53, 56, 60, 65], [49, 53, 56, 61], [56, 60, 63, 68], [51, 55, 58, 63]]
ROOTS = [29, 25, 32, 27]  # F1 Db1 Ab1 Eb1 (+12 => octava 2)
ARP = [0, 2, 1, 3, 2, 1, 3, 0]

def section(t0, t1, kind, bar_offset=0):
    """Rellena [t0,t1) con un patrón; la rejilla arranca en t0."""
    nb = int(np.ceil((t1 - t0) / BAR))
    for b in range(nb):
        tb = t0 + b * BAR
        if tb >= t1: break
        ci = (b + bar_offset) % 4
        bar_len = min(BAR, t1 - tb)
        # pad
        g_pad = {"tension": 0.2, "drop": 0.13, "soft": 0.12, "cta": 0.14}[kind]
        cut = {"tension": 900, "drop": 1800, "soft": 1100, "cta": 2000}[kind]
        place(music, pad(CHORDS[ci], bar_len + 0.3, cut), tb, g_pad)
        for s in range(16):  # semicorcheas
            ts = tb + s * BEAT / 4
            if ts >= t1: break
            if kind == "tension":
                if s in (0, 10): place(music, kick(), ts, 0.75)
                if s % 2 == 0: place(music, hat(), ts, 0.16 if s % 4 else 0.22)
                if s == 8: place(music, clap(), ts, 0.32)
                if s % 4 == 0: place(music, pluck(midi(CHORDS[ci][ARP[(s // 2) % 8]] + 12)), ts, 0.10)
            elif kind in ("drop", "cta"):
                if s in (0, 6, 10) or (s == 14 and b % 2): place(music, kick(), ts, 0.85)
                if s == 8: place(music, snare(), ts, 0.45); place(music, clap(), ts, 0.35)
                if s % 2 == 0 or (b % 2 and s in (13, 15)): place(music, hat(), ts, 0.2)
                if s == 14 and not b % 2: place(music, hat(open_=True), ts, 0.12)
                if s in (0, 6, 10):
                    r = ROOTS[ci] + 12
                    place(music, sub808(midi(r), BEAT * (1.4 if s == 0 else 0.9), midi(r + 7) if s == 10 else None), ts, 0.55)
                if s % 2 == 0: place(music, pluck(midi(CHORDS[ci][ARP[(s // 2) % 8]] + 12)), ts, 0.11)
            elif kind == "soft":
                if s == 0: place(music, kick(), ts, 0.4)
                if s == 0: place(music, sub808(midi(ROOTS[ci] + 12), BAR * 0.9), ts, 0.25)
                if s % 4 == 2: place(music, hat(), ts, 0.08)

tl = json.load(open(sys.argv[3]))
W = {s["id"]: s for s in tl["segments"]}
def wt(seg, txt):
    for w in W[seg]["words"]:
        if w["text"].lower().startswith(txt.lower()): return w["start"]
    raise KeyError(txt)

T_SISTEMA = wt("v5", "sistema")
T_PROOF = W["v9"]["start"] - 0.25
T_CTA = W["v10"]["start"]
T_PAUTA = W["v5"]["start"]

section(0.0, T_PAUTA, "tension")
# breakdown: solo pad filtrado + riser hasta el drop
place(music, pad(CHORDS[3], T_SISTEMA - T_PAUTA + 0.2, 700), T_PAUTA, 0.14)
section(T_SISTEMA, T_PROOF, "drop")
section(T_PROOF, T_CTA, "soft", 2)
section(T_CTA, TOTAL - 1.6, "cta")
# cierre: acorde final largo + kick + sub
place(music, pad(CHORDS[0], 2.2, 1600), TOTAL - 1.6, 0.16)
place(music, kick(), TOTAL - 1.6, 0.9)
place(music, sub808(midi(41), 1.5), TOTAL - 1.6, 0.6)
# fade out final
fo = int(0.5 * SR); end = int(TOTAL * SR)
music[end - fo:end] *= np.linspace(1, 0, fo); music[end:] = 0
music = music[:end]
music = np.tanh(1.2 * music) / np.tanh(1.2)
sf.write(os.path.join(OUT, "music.wav"), norm(music, 0.89).astype(np.float32), SR, subtype="PCM_24")

# ---------- SFX ----------
def sfx_impact(d=1.6):
    t = t_(d); f = 32 + 90 * np.exp(-t / 0.06)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(d, 0.45)
    nz = lp(rng.standard_normal(len(t)), 3000) * env_exp(d, 0.12) * 0.6
    crack = hp(rng.standard_normal(len(t)), 3000) * env_exp(d, 0.015) * 0.5
    return norm(np.tanh(1.8 * (boom + nz + crack)))

def sfx_whoosh(d=0.45, up=True):
    t = t_(d); nz = rng.standard_normal(len(t))
    out = np.zeros(len(t)); n = 24; L = len(t) // n
    for k in range(n):
        fr = k / (n - 1); fc = 400 + 5000 * (fr if up else 1 - fr)
        seg = bp(nz, fc * 0.6, min(fc * 1.6, 20000))[k * L:(k + 1) * L]
        out[k * L:(k + 1) * L] = seg
    e = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.5
    return norm(out * e, 0.8)

def sfx_riser(d=2.0):
    t = t_(d); nz = rng.standard_normal(len(t))
    out = np.zeros(len(t)); n = 40; L = len(t) // n
    for k in range(n):
        fc = 300 * (40 ** (k / (n - 1)))
        out[k * L:(k + 1) * L] = bp(nz, fc * 0.7, min(fc * 1.4, 22000))[k * L:(k + 1) * L]
    tone = np.sin(2 * np.pi * np.cumsum(200 * 8 ** (t / d)) / SR) * 0.25
    e = (t / d) ** 2
    return norm((out + tone) * e, 0.8)

def sfx_ding():
    return norm(np.concatenate([bell(1318.5, 0.18) * 0.8, bell(1760.0, 0.9)]), 0.7)

def sfx_pop(f=900):
    t = t_(0.12); fr = f * (1 + 1.5 * np.exp(-t / 0.01))
    return norm(np.sin(2 * np.pi * np.cumsum(fr) / SR) * env_exp(0.12, 0.03), 0.6)

def sfx_tick():
    return norm(hp(rng.standard_normal(int(0.03 * SR)), 3000) * env_exp(0.03, 0.004) + np.sin(2 * np.pi * 2400 * t_(0.03)) * env_exp(0.03, 0.006), 0.5)

def sfx_type(n=10, gap=0.075):
    out = np.zeros(int((n * gap + 0.1) * SR))
    for k in range(n):
        c = hp(rng.standard_normal(int(0.02 * SR)), 2000) * env_exp(0.02, 0.003)
        place(out, c * (0.6 + 0.4 * rng.random()), k * gap + rng.random() * 0.02)
    return norm(out, 0.45)

def sfx_glitch(d=0.35):
    t = t_(d); out = np.zeros(len(t)); L = int(0.025 * SR)
    for k in range(0, len(t), L):
        f = rng.choice([180, 240, 600, 1200, 2400]); seg = np.sign(np.sin(2 * np.pi * f * t[:L]))
        out[k:k + L] = seg[:len(out[k:k + L])] * (0.3 + 0.7 * rng.random())
    return norm(lp(out, 6000) * env_exp(d, 0.2), 0.55)

def sfx_buzz():  # error / perdido
    t = t_(0.45)
    x = (2 * ((t * 110) % 1) - 1) + (2 * ((t * 116.5) % 1) - 1)
    return norm(lp(x, 1500) * np.minimum(1, (0.45 - t) / 0.05), 0.55)

def sfx_coins():
    out = np.zeros(int(1.2 * SR))
    for k in range(9):
        place(out, bell(2000 + 900 * rng.random(), 0.5) * (0.5 + 0.5 * rng.random()), k * 0.045)
    return norm(out, 0.6)

def sfx_swipe():
    return norm(sfx_whoosh(0.25, True) * 0.6 + np.concatenate([np.zeros(int(0.18 * SR)), sfx_pop(1400)])[:int(0.25 * SR)], 0.6)

def sfx_scratch():
    t = t_(0.5); f = 600 * np.exp(-t / 0.12) + 60
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.3 * bp(rng.standard_normal(len(t)), 300, 3000)
    return norm(x * env_exp(0.5, 0.18), 0.6)

lib = {"impact": sfx_impact(), "whoosh": sfx_whoosh(), "whoosh_dn": sfx_whoosh(0.4, False), "riser": sfx_riser(T_SISTEMA - T_PAUTA + 0.05),
       "riser_cta": sfx_riser(1.2), "ding": sfx_ding(), "pop": sfx_pop(), "pop_hi": sfx_pop(1500), "tick": sfx_tick(),
       "type": sfx_type(), "glitch": sfx_glitch(), "buzz": sfx_buzz(), "coins": sfx_coins(), "swipe": sfx_swipe(), "scratch": sfx_scratch()}
for k, v in lib.items():
    sf.write(os.path.join(OUT, f"sfx_{k}.wav"), v.astype(np.float32), SR, subtype="PCM_24")

# ---------- hoja de cues (tiempos globales) · v2 ----------
cues = [
    ("impact", 0.0, 0.9), ("whoosh", 0.05, 0.5),
    ("whoosh", 0.22, 0.3), ("pop", 0.3, 0.3), ("whoosh", wt("v1", "inmobiliaria") - 0.15, 0.35), ("pop", wt("v1", "inmobiliaria") - 0.05, 0.3),
    ("impact", wt("v1", "inmobiliaria") - 0.08, 0.45),
    ("ding", wt("v1", "escribió") - 0.12, 0.6), ("pop_hi", wt("v1", "11") - 0.05, 0.4),
    ("glitch", wt("v1", "apartó") - 0.05, 0.55), ("buzz", wt("v1", "apartó"), 0.45),
    ("whoosh", W["v2"]["start"] - 0.15, 0.45),
    ("tick", wt("v2", "activos") - 0.05, 0.55), ("tick", wt("v2", "escriben") - 0.05, 0.55),
    *[("tick", wt("v2", "escriben") + 0.25 + k * 0.18, 0.35) for k in range(5)],
    ("pop", wt("v2", "unidades") - 0.2, 0.4), ("pop", wt("v2", "unidades") - 0.1, 0.4), ("pop", wt("v2", "unidades"), 0.4),
    ("impact", wt("v2", "mueven") - 0.1, 0.55), ("buzz", wt("v2", "mueven"), 0.35),
    ("whoosh", W["v3"]["start"] - 0.15, 0.45),
    ("pop", wt("v3", "4–7"), 0.5), ("pop_hi", wt("v3", "$3–$6"), 0.5),
    ("riser_cta", wt("v3", "$12–$42") - 1.0, 0.3), ("impact", wt("v3", "$12–$42"), 0.95), ("coins", wt("v3", "$12–$42") + 0.05, 0.6), ("coins", wt("v3", "$12–$42") + 0.5, 0.45),
    ("buzz", wt("v3", "facturar"), 0.3),
    ("whoosh", wt("v4", "inmobiliaria") - 0.15, 0.4), ("pop", wt("v4", "3–6"), 0.5),
    ("impact", wt("v4", "$360,000"), 0.8), ("coins", wt("v4", "$360,000") + 0.05, 0.55), ("coins", wt("v4", "$2.5") + 0.05, 0.5), ("ding", wt("v4", "mes"), 0.4),
    ("scratch", T_PAUTA - 0.12, 0.5),
    ("riser", T_PAUTA, 0.75), ("buzz", wt("v5", "producto") + 0.3, 0.35),
    ("impact", T_SISTEMA, 1.0),
    ("whoosh", W["v6"]["start"] - 0.2, 0.45), ("ding", wt("v6", "Facebook") - 0.05, 0.5), ("pop_hi", wt("v6", "compradores"), 0.5), ("swipe", wt("v6", "curiosos"), 0.5),
    ("whoosh", W["v7"]["start"] - 0.2, 0.45), ("type", wt("v7", "agente"), 0.5), ("ding", wt("v7", "contesta"), 0.55),
    ("whoosh_dn", wt("v7", "contesta") + 0.05, 0.4), ("pop", wt("v7", "cualquier"), 0.4),
    ("whoosh", wt("v7", "califica") - 0.2, 0.4), ("pop", wt("v7", "califica") + 0.05, 0.45), ("pop_hi", wt("v7", "califica") + 0.2, 0.45), ("pop", wt("v7", "califica") + 0.35, 0.45),
    ("ding", wt("v7", "califica") + 0.7, 0.45),
    ("whoosh", W["v8"]["start"] - 0.2, 0.45), ("pop_hi", wt("v8", "visita"), 0.5), ("swipe", wt("v8", "CRM") + 0.1, 0.6), ("swipe", wt("v8", "seguimiento"), 0.5),
    ("whoosh_dn", W["v9"]["start"] - 0.25, 0.5), ("pop", wt("v9", "Escucha"), 0.45),
    ("whoosh", W["GUS"]["start"] - 0.15, 0.35), ("impact", wt("GUS", "60"), 0.45), ("coins", wt("GUS", "60") + 0.05, 0.3),
    ("riser_cta", W["v10"]["start"] - 1.15, 0.35),
    ("impact", W["v10"]["start"], 0.6), ("pop_hi", wt("v10", "ventas"), 0.5), ("pop_hi", wt("v10", "multiplicarlas"), 0.5),
    ("impact", wt("v10", "comenta"), 0.85), ("ding", wt("v10", "palabra") + 0.45, 0.5),
    ("pop", wt("v10", "diagnóstico"), 0.4),
]
json.dump([{"sfx": c, "t": round(t, 3), "gain": g} for c, t, g in cues], open(os.path.join(OUT, "cues.json"), "w"), indent=1)
json.dump({"T_SISTEMA": T_SISTEMA, "T_PROOF": T_PROOF, "T_CTA": T_CTA, "T_PAUTA": T_PAUTA}, open(os.path.join(OUT, "marks.json"), "w"), indent=1)
print("ok", len(cues), "cues", {"T_SISTEMA": T_SISTEMA, "T_PROOF": T_PROOF, "T_CTA": T_CTA})
