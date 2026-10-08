# inmo-01 v3 · "El prospecto de las 11 p.m. (y el que nunca llega)"

- **Nicho:** inmobiliario, con dos buyer personas: **desarrollador inmobiliario** e **inmobiliaria / broker**. **Tipo:** demostración + prueba, con costo de oportunidad. **Formato:** A (sin Fran a cámara; foto de Fran en el CTA).
- **Duración real:** 59.5 s (límite de Fran: 60 s) · 1080x1920 · 30 fps · −14 LUFS
- **Palabra clave:** **VENTAS** (antes SISTEMA) · **Fugas que ataca:** (1) prospectos que escriben de noche y nadie contesta; (2) sin anuncios activos nadie escribe y las unidades no se mueven.
- **Proyecto:** `videos/inmo-01/` · render: `videos/inmo-01/renders/inmo-01-desarrolladores.mp4` (copia IG: `-ig.mp4`). La v1 y la v2 quedan en el historial de git.

## Cambios v3 (pedido de Fran, 2026-10-08)
1. **Fotos del inicio:** se pasó de 6 a **2**. Una es del desarrollador, en "Desarrollador", y la otra de la inmobiliaria, en "o inmobiliaria".
2. **Costo de oportunidad con cifras de Fran:** **4 a 7 ventas al mes**, con ticket de **$3 a $6 MDP**, son **$12 a $42 MDP al mes** que dejas de facturar. Para la inmobiliaria, una comisión del **3 al 6 %** da **$360,000 a $2,520,000 al mes**.
3. **Creativo del anuncio:** ahora es un anuncio con formato de Facebook / Instagram. Lleva cuenta "Torre Ejemplo · Publicidad · Ensenada, B.C.", un render de la torre (generado con IA y marcado así), etiqueta PREVENTA, titular "Depas de 2 y 3 recámaras con vista al mar", amenidades y el botón "Enviar mensaje por WhatsApp". Las marcas de plataforma aparecen como "f" e "IG", sin logos oficiales. En la voz ya no se dice "Meta", sino **"Facebook e Instagram"**.
4. **Voz consistente:** el cambio a acento americano venía de escribir "Gús Márcos" con acentos para la voz. Lo medimos con Whisper: con esa escritura detecta inglés con p = 0.998. Ahora la voz ya no dice el nombre ("¿Funciona? Escucha a este desarrollador") y el nombre va en pantalla. Las 10 frases salen en **español con p ≥ 0.975** en la detección de idioma de Whisper.
5. **CTA nuevo:** "Si te sientes estancado en tus ventas o quieres multiplicarlas, comenta la palabra **ventas**…"

## Guion por tramo

| Tramo | Tiempo | Voz | Pantalla | Fuente |
|---|---|---|---|---|
| Gancho | 0.0–5.5 | "Desarrollador o inmobiliaria: ese prospecto que te escribió a las once de la noche… ya apartó con otro." | Logo · DESARROLLADOR / O INMOBILIARIA: · 2 fotos de personas ficticias generadas con IA (desarrollador → inmobiliaria) con su etiqueta · leyenda IA · notificación DEMO 11:07 p.m. · sello APARTÓ CON OTRO | Escenario ilustrativo (PROPUESTA) · nichos/inmobiliario.md, fuga #1 |
| Dolor 2 | 5.8–9.8 | "Y sin anuncios activos, ni te escriben… y tus unidades no se mueven." | Administrador de anuncios DEMO: 0 campañas · 0 mensajes · unidades ficticias · SIN MOVERSE | Pedido de Fran (v2) · web.md El problema #2 |
| Costo (desarrollador) | 10.1–17.7 | "Por ejemplo: si se te van de cuatro a siete ventas al mes, de tres a seis millones cada una, son de doce a cuarenta y dos millones que dejas de facturar." | EJEMPLO ILUSTRATIVO · Ventas que se te van / mes: 4–7 · × Ticket por unidad: $3–$6 MDP · DESARROLLADOR · DEJAS DE FACTURAR AL MES **$12,000,000 a $42,000,000** | **Cifras de Fran (pedido v3)**, como ejemplo ilustrativo. 4×3 = 12; 7×6 = 42 (MDP). |
| Costo (inmobiliaria) | 18.0–25.0 | "Si eres inmobiliaria, con comisiones del tres al seis por ciento, son de trescientos sesenta mil a más de dos millones y medio al mes." | INMOBILIARIA · COMISIÓN DEL 3 AL 6 % · AL MES **$360,000 a $2,520,000** · "Cifras de ejemplo en MXN · ingreso antes de costos · no es precio de ningún desarrollo" · casillas "Tú: __ ventas × $__" | Cifras de Fran (v3). 3 % de 12 M = 360,000; 6 % de 42 M = 2,520,000 ("más de dos millones y medio"). |
| Giro | 25.3–28.3 | "El problema no es tu producto: es que no tienes un sistema." | EL PROBLEMA NO ES TU ~~PRODUCTO~~ · SISTEMA | web.md |
| Demo 1 | 28.6–33.4 | "Primero: anuncios en Facebook e Instagram para atraer compradores, no curiosos." | 01 · Anuncios a compradores · anuncio DEMO de FB/IG (ver cambio 3) que pasa de PAUSADO a ACTIVO · 🎯 COMPRADORES · ~~CURIOSOS~~ | web.md: Servicios "Meta Ads que sí venden" (se dice Facebook e Instagram por claridad) |
| Demo 2 | 33.7–39.3 | "Luego, un agente de inteligencia artificial contesta en segundos, a cualquier hora, y lo califica." | 02 · el mismo chat de las 11:07 p.m. se contesta y el sello desaparece · 8 s · 24/7 · perfil del prospecto DEMO | web.md: Servicios IA |
| Demo 3 | 39.5–43.3 | "Y agenda la visita en tu C R M, con seguimiento automático." | 03 · visita confirmada · pipeline CRM DEMO | web.md: Servicios CRM |
| Prueba | 43.6–51.2 | "¿Funciona? Escucha a este desarrollador." + **Gus:** "…e hicimos una empresa que facturó 60 millones de pesos en dos años." | ¿FUNCIONA? · foto de Fran con Gus · perfil de IG · GUS MARCOS · Desarrollador inmobiliario · Monterrey · TESTIMONIO REAL · $60 MDP FACTURADOS EN 2 AÑOS · "Testimonio de un caso real · no es garantía de resultados" | hechos-verificados.md T1–T3 (**permiso de Gus pendiente**) |
| CTA | 51.5–59.5 | "Si te sientes estancado en tus ventas o quieres multiplicarlas, comenta la palabra ventas y te mando el link de tu diagnóstico gratis." | ¿Te sientes estancado EN TUS VENTAS? ¿O quieres MULTIPLICARLAS? · COMENTA **VENTAS** · "y te mando el link de tu diagnóstico gratis" · cierre con logo | Pedido de Fran (v3) · oferta.md (sesión gratis de 30 min) |

## Verificación (workflow con 3 verificadores adversariales + medición)
- **Duración:** el primer borrador medía 62.9 s. Se recortó "Haz la cuenta" (ya está en pantalla), "con un ticket", "de pesos", "pensados" y "de Monterrey" (también en pantalla). Quedó en **59.5 s**.
- **Aritmética:** revisada por el verificador de veracidad (correcta). "Más de dos millones y medio" coincide con $2,520,000.
- **Idioma de la voz:** Whisper `-dl` frase por frase: v1 0.985 · v2 0.997 · v3 0.996 · v4 0.994 · v5 0.997 · v6 0.993 · v7 0.997 · v8 0.994 · v9 0.976 · v10 0.989 (todas en es).
- **Testimonio:** se agregó la leyenda "no es garantía de resultados" para que los $60 MDP no se lean como resultado típico (LFPC art. 32).
- **Anuncio:** sin precios (NOM-247), torre ficticia con la leyenda "DEMO · RENDER IA · FICTICIO" y sin logos oficiales de las plataformas.
- **Acento norteño:** **no se resuelve con esta voz.** Andrew Multilingual (Microsoft) es una voz estadounidense que habla español: suena consistente y neutra, no norteña. Las opciones reales son (A) que Fran grabe las 10 frases (`assets/audio/voz/guion-voz.tsv`), que es lo recomendado, o (B) una voz norteña de pago en ElevenLabs o HeyGen. La B requiere su OK porque cuesta.

## Texto del post (caption)
> Desarrollador o inmobiliaria: si tu prospecto te escribe a las 11 p.m. y le contestan al otro día, ya apartó en otro lado. Y si no tienes anuncios activos, ni siquiera te escriben. 🏗️
>
> Haz la cuenta (ejemplo ilustrativo, pon tus números):
> 4 a 7 ventas perdidas al mes × $3–$6 MDP = de $12 a $42 MDP al mes que dejas de facturar.
> Si eres inmobiliaria, con comisiones del 3 al 6 %, son de $360,000 a $2,520,000 al mes.
>
> Casi nunca es el producto: es que no hay sistema.
> 1️⃣ Anuncios en Facebook e Instagram para atraer compradores, no curiosos.
> 2️⃣ Un agente de inteligencia artificial contesta en segundos, a cualquier hora, y califica.
> 3️⃣ Agenda la visita en tu CRM, con seguimiento automático.
>
> Para desarrolladoras e inmobiliarias: si te sientes estancado en tus ventas o quieres multiplicarlas, comenta **VENTAS** y te mando el link para un diagnóstico gratis de tu embudo (30 min por videollamada).
>
> Cifras de ejemplo: no son resultados de clientes ni precios de ningún desarrollo. El testimonio es de un caso real y no es garantía de resultados. Imágenes de personas y renders generados con IA (ficticios). Mockups DEMO.
>
> #desarrolladorasinmobiliarias #inmobiliariastijuana #bienesraicesbc #ensenada #preventa

## Embudo
Comentario "VENTAS" (palabra exacta y sola) → DM automático (ver `embudo/palabras-clave.md`) → preguntas: ¿desarrollo, inmobiliaria o broker? · unidades / número de asesores · inversión mensual en anuncios · urgencia → calificado: Calendly de 30 min · no calificado: checklist de fugas + nutrición. **Estado: pendiente de configurar.** El filtro de calificación (desarrollo +20 unidades / inmobiliaria +5 asesores) salió del CTA a pedido de Fran y ahora vive en las preguntas del DM y en el texto del post ("Para desarrolladoras e inmobiliarias").

## Checklist
- [x] Dos buyer personas en el segundo 0 y solo 2 fotos.
- [x] Cifras de Fran con aritmética exacta, marcadas como ejemplo.
- [x] "Facebook e Instagram", ya no "Meta".
- [x] Voz consistente en español en las 10 frases (medido).
- [ ] Acento norteño: requiere la voz grabada de Fran o una voz de pago (con su OK).
- [x] ≤ 60 s (59.5 s).
- [x] Leyendas de IA, DEMO y "no es garantía de resultados".
- [ ] Permiso por escrito de Gus Marcos.
- [ ] Automatización de VENTAS activa.
