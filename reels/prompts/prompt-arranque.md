Actúa como mi estratega de contenido y editor de video con HyperFrames. Vamos a crear reels orgánicos para mi marca personal de consultoría, Fran Morishita (https://franmorishita.vercel.app), dirigidos a dos nichos de Baja California: (1) desarrolladoras, brokers e inmobiliarias y (2) médicos, dentistas y clínicas privadas. El objetivo es conseguir leads calientes por DM que agenden mi sesión de diagnóstico, no likes.

Sigue CLAUDE.md en todo momento. Trabaja paso a paso; en cada ⛔ PUNTO DE CONTROL detente y espera mi OK.

## PASO 1 · PREPARA TODO

1. Node ≥ 22, ffmpeg/ffprobe y `npx hyperframes doctor --json` (revisa el campo `ok`). Instala lo que falte; antes de instalar algo a nivel sistema, dime qué y por qué.
2. Skills: usa `/hyperframes:hyperframes` si el plugin está instalado; si no, `npx hyperframes skills update` y dime si debo reiniciar Claude Code.
3. Prueba de transcripción en español (`--model small --language es`) y `npx hyperframes auth status` + `npx hyperframes media-use resolve --doctor`: qué funciona ya y qué requiere iniciar sesión en HeyGen. No inicies sesión por mí.
4. Crea las carpetas de CLAUDE.md. Si existe `estilo.md` (copiado de mi proyecto inmobiliario) úsalo; si hay `referencia/referencia.mp4` y no hay estilo.md, analízalo igual que en el otro proyecto (fotogramas 2 por segundo + cambios de plano, valores medidos, [SUPOSICIÓN] donde no puedas medir). Si no hay ninguno, pregúntame.
5. Tabla: herramienta · versión · estado · qué hiciste.

## PASO 2 · EXTRAE LA WEB

1. Lee la web completa (todas las secciones: inicio, dolor, servicios, método, nichos, sobre Fran, testimonios, FAQ, contacto) y guárdala en `fuente/web.md`, textual y por sección.
2. Captura la web para usarla como material visual: `npx hyperframes capture` (lee antes la referencia de init/capture de /hyperframes-cli). Guarda capturas en móvil y escritorio de cada sección en `fuente/capturas/`.
3. Saca del CSS los colores (hex) y tipografías, y el logotipo FRANMORISHITA / FM si está como imagen o SVG.
4. Arma `fuente/hechos-verificados.md` como BORRADOR con cada afirmación de la web que sea cifra o resultado, en tabla: afirmación · dónde aparece · estado (por verificar). Señala:
   - Contadores que se ven en $0 / 0 años (error de la web, no son datos).
   - Testimonios vacíos.
   - "Cientos de millones para clientes" sin cifra ni respaldo.
   - Cualquier contradicción con otras cifras mías que te dé.
5. Arma `fuente/oferta.md`: servicios, proceso de 4 pasos, diferenciadores, CTA (sesión de 30 min) y qué falta para que funcione (WhatsApp, link de agenda, usuario de Instagram).
6. ⛔ PUNTO DE CONTROL: dime qué cifras confirmo, cuáles quito y qué pruebas reales puedo aportar (casos, capturas de resultados con permiso, el video de Gus, testimonios). También, lista de errores de la web que conviene corregir antes de mandar tráfico ahí.

## PASO 3 · NICHOS Y OFERTA DE ENTRADA

Para cada nicho, crea `nichos/<nicho>.md`:
- Quién decide y cómo habla (palabras que usa: "unidades", "preventa", "absorción" / "pacientes", "consulta de valoración", "agenda llena", "turismo médico").
- 8 fugas de dinero concretas que mis servicios resuelven (leads de Meta sin respuesta, WhatsApp que tarda horas, sin CRM, pauta sin medir, landing que no convierte, recepción saturada, no-shows, cero seguimiento a cotizaciones…).
- Objeciones para contratarme (ya tuve agencia, es caro, la IA espanta a mis clientes o pacientes, no tengo tiempo) y cómo las respondo sin prometer resultados.
- Umbral de calificación PROPUESTA (tamaño mínimo de negocio o inversión) para filtrar en el CTA.
- 2–3 lead magnets PROPUESTA con su palabra clave (p. ej. "AUDITORÍA": reviso tu embudo de leads en 10 min; "AGENDA": checklist de 7 fugas de pacientes por WhatsApp; "DEMO": te mando el video del agente de IA respondiendo un lead), y qué necesito tener listo para entregarlos.
- Recuerda: la web no tiene nicho de salud. Todo lo de salud es PROPUESTA.

⛔ PUNTO DE CONTROL: apruebo o corrijo nichos, umbrales y lead magnets. Lo aprobado pasa a oferta.md y `embudo/palabras-clave.md`.

## PASO 4 · MARCA

Crea `marca/frame.md` (formato HyperFrames, /hyperframes-creative) con los colores y tipografías de la web. Si una tipografía no se puede embeber, propone la alternativa más cercana. Hazme 2 tarjetas de prueba (gancho y CTA) como snapshots para aprobar el look. ⛔ PUNTO DE CONTROL.

## PASO 5 · PRIMER LOTE (10 reels)

1. `calendario/lote-01.md`: 10 ideas, 5 por nicho, con la mezcla de CLAUDE.md (4 educativos, 3 demos, 2 prueba, 1 oferta). Por idea: id · nicho · tipo · gancho (≤ 8 palabras) · fuga que ataca · palabra clave · formato (A sin mí a cámara / B conmigo a cámara) · qué material necesita.
2. Para los que sean formato B, dame la lista de tomas que debo grabar (frase exacta, encuadre vertical, luz, duración): las grabo en un bloque y te las paso en `grabaciones/`.
3. ⛔ PUNTO DE CONTROL: apruebo el calendario.

## PASO 6 · GUIONES

Para cada idea aprobada, `guiones/lote-01/<id>.md` con:
- 3 ganchos alternativos y tu recomendado.
- Tabla por tramo (gancho · problema · insight/demo · prueba · CTA): tiempo · voz · texto en pantalla · visual (ruta exacta) · fuente (web.md / hechos-verificados.md / oferta.md) o PROPUESTA.
- Texto del post (caption) con la palabra clave y el filtro de calificación, más 3–5 hashtags locales y de nicho.
- Embudo: respuesta automática, preguntas de calificación, destino para calificados y no calificados.
- Checklist: veracidad, sin garantías, cuidados del nicho.
⛔ PUNTO DE CONTROL: apruebo los guiones (puedes enseñarme 3 primero para calibrar y luego el resto).

## PASO 7 · VOZ Y PRODUCCIÓN

1. Voz: pregúntame A (grabo notas de voz con los guiones aprobados), B (HeyGen) o C (Kokoro). Para mi marca personal recomienda A. En A, corta silencios > 0.3 s y muletillas sin comerte sílabas y vuelve a transcribir el audio limpio. Compara siempre la transcripción contra el guion (cifras y nombres).
2. Construye el PRIMER reel con el router de HyperFrames pasándole todo el contexto: vertical 1080x1920, español, duración real de la voz, flow companion, storyboard yes. Formato A → /general-video (o /faceless-explainer si es puramente explicativo); formato B → /talking-head-recut. En BRIEF.md: assets con rutas exactas y la nota "Edición según estilo.md, marca según frame.md, contenido y veracidad según CLAUDE.md".
3. Subtítulos palabra por palabra dentro del área útil; CTA con la palabra clave grande ≥ 3 s; mockups marcados "demo".
4. `npx hyperframes check`, snapshots revisados por ti y ⛔ PUNTO DE CONTROL en Studio. Luego borrador `--quality draft --fps 30` y el QA de CLAUDE.md.
5. Cuando apruebe el primero, congela la receta `reel-consultoria` (/media-use → recipe freeze) y produce los otros 9 con flow automation y storyboard no. Enséñamelos en Studio por tandas de 3.
6. Renders finales `--quality high` solo con mi OK, en `videos/<id>/renders/`.

## PASO 8 · PUBLICAR Y MEDIR

1. Calendario de publicación sugerido (días y horas para dueños de negocio en Baja California) y orden alternando nichos.
2. Antes de publicar cada reel: confirma que su palabra clave tiene respuesta automática activa en `embudo/palabras-clave.md`. Si no, no se publica.
3. Crea `metricas/registro.md` con columnas: id · fecha · vistas · retención a 3 s · comentarios con palabra clave · DMs · calificados · llamadas agendadas · clientes.
4. Correcciones que apruebe → estilo.md, nichos, oferta o CLAUDE.md según el tipo.

Empieza por el PASO 1.
