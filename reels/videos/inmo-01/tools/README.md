# Cómo se generó el audio de inmo-01 (reproducible)

Requisitos: `pip install edge-tts numpy scipy soundfile pyloudnorm`, ffmpeg.
En la nube de Claude Code, `tts_edge.py` apunta el SSL al CA del proxy (`/root/.ccr/ca-bundle.crt`); fuera de ahí, quita esas líneas.

```bash
# 1) Voz: una frase por línea en assets/audio/voz/guion-voz.tsv (id<TAB>texto)
while IFS=$'\t' read -r id txt; do
  echo "$txt" > voz/$id.txt
  python3 tools/tts_edge.py es-MX-JorgeNeural +16% +0Hz voz/$id.txt voz/$id.mp3 voz/$id.json
done < assets/audio/voz/guion-voz.tsv

# 2) Ensamble: recorta pausas, inserta el clip de Gus (7.0–11.95 s) y escribe vo.wav + vo_timeline.json
#    (gus_words.json debe estar junto a la salida)
python3 tools/build_vo.py voz/ assets/video/gus-testimonio.mp4 work/vo.wav

# 3) Música original + SFX + hoja de cues
python3 tools/synth_audio.py work/gen 42.436 work/vo_timeline.json

# 4) Mezcla y master (-14 LUFS estéreo, ≤ -2 dBTP antes del AAC)
python3 tools/mix.py work work/out
ffmpeg -i work/out/master.wav -c:a aac -b:a 256k assets/audio/master.m4a
cp work/vo_timeline.json assets/audio/vo_timeline.json

# 5) Subtítulos: inyecta los tiempos de palabra en index.html
python3 tools/inject_data.py
```

Para cambiar a **la voz de Fran** (recomendado): graba cada frase de `guion-voz.tsv`, transcribe con
`npx hyperframes transcribe <archivo> --model small --language es`, arma `vo.wav` + `vo_timeline.json`
con el mismo formato y repite 3–5. Las escenas se recolocan solas porque sus tiempos salen de las palabras.

## v2 (2026-10-08) · voz Andrew + Gus + fotos IA

```bash
# 1) Voz Andrew (+9 %), una frase por línea del TSV (la fila GUS es el clip, no se sintetiza)
while IFS=$'\t' read -r id txt; do [ "$id" = GUS ] && continue
  echo "$txt" > voz/$id.txt
  python3 tools/tts_edge.py en-US-AndrewMultilingualNeural +9% +0Hz voz/$id.txt voz/$id.mp3 voz/$id.json
done < assets/audio/voz/guion-voz.tsv
# 2) Ensamble con pausas naturales + clip de Gus + reemplazos de subtítulos
python3 tools/build_vo.py voz/ assets/audio/voz/guion-voz.tsv assets/audio/voz/reemplazos-subtitulos.json work/vo.wav assets/video/gus-testimonio.mp4 assets/audio/voz/gus_words.json
# 3–5) igual que arriba: synth_audio.py work/gen <total> work/vo_timeline.json · mix.py · inject_data.py
# Fotos de buyer persona (personas ficticias, CPU, ~1 min c/u): python3 tools/gen_personas.py <salida>
```
Las versiones v1 se conservan como `build_vo_v1.py`, `synth_audio_v1.py` y `assets/audio/voz/guion-voz-v1.tsv`.
