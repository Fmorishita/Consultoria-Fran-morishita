# Estado del proyecto de reels (para retomar en otra sesión)

Última actualización: 2026-10-07.

## Hecho
- `inmo-01` (desarrolladores) producido y renderizado: `videos/inmo-01/renders/inmo-01-desarrolladores.mp4` (42.4 s, 1080x1920, 30 fps, −14 LUFS).
- Guion con trazabilidad, caption, embudo y checklist: `guiones/lote-01/inmo-01.md`.
- Borradores de fuente: `fuente/web.md`, `fuente/hechos-verificados.md`, `fuente/oferta.md`, `nichos/inmobiliario.md`, `marca/frame.md`, `estilo.md`, `embudo/palabras-clave.md`.
- Entorno: HyperFrames 0.8.140 + skills instalados, whisper `small` (es) probado, Chrome headless listo.

## Pendiente de Fran antes de publicar inmo-01
1. **Permiso por escrito de Gus Marcos** para usar nombre, foto, perfil y video en reels (regla 5 de CLAUDE.md).
2. **Automatización de la palabra SISTEMA** (ManyChat / Meta) con las preguntas de `embudo/palabras-clave.md`.
3. Aprobar umbral "+20 unidades" y el lead magnet (diagnóstico gratis del embudo).
4. Voz: hoy es TTS es-MX ("Jorge", Microsoft Edge). Suena mexicano neutro, **no norteño auténtico**. Opciones: (A) Fran graba las 9 frases de `videos/inmo-01/assets/audio/voz/guion-voz.tsv` → se reemplaza en minutos; (B) HeyGen/ElevenLabs con voz norteña (requiere cuenta). Uso comercial de la voz de Edge: revisar términos de Microsoft antes de pautar.
5. Confirmar colores/tipos de `marca/frame.md` y el usuario de Instagram.

## Errores en la web (corregir en /admin antes de mandar tráfico)
- Tarjeta de Gus: "+3,000,000 Millones de USD" → debería ser "+$3,000,000 USD" (o "+60 MDP").
- "Nuestros Servicicios" (typo en el tag de Servicios).
- Comparativa: "si tú inviertes $1 Dólar yo debo multiplicar mínimo el doble" se lee como garantía.
- Contadores animados arrancan en 0 (capturas/robots ven "$0").

## salud-01 (hecho 2026-10-08)
- `videos/salud-01/renders/salud-01-consultorios.mp4` (v2, 45.0 s): ticket $10,000–$50,000 → $100,000–$500,000 al mes que dejas de facturar; montaje de 6 doctores high ticket ficticios generados con IA local (leyenda en pantalla; activar "Información de IA" al publicar). Guion: `guiones/lote-01/salud-01.md`. Pendiente: aprobar umbral y AGENDA, activar automatización, revisión legal ligera.
- Mejora pendiente opcional: aplicar el logo desde el inicio y la voz Andrew también a inmo-01.

## Siguiente
- Resto del lote 01 con `prompts/prompt-nuevo-lote.md`; reutilizar `videos/inmo-01` como receta (`tools/README.md`).
