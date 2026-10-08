# salud-01 · "El paciente de las 10 p.m."

- **Nicho:** salud privada (especialistas, dentistas, clínicas estéticas; Tijuana, Mexicali, Ensenada) · **Tipo:** demostración con costo de oportunidad · **Formato:** A (foto de Fran en el CTA)
- **Duración real:** 44.4 s · 1080x1920 · 30 fps · −14 LUFS
- **Palabra clave:** AGENDA · **Fuga:** mensajes de pacientes sin contestar fuera de horario + inasistencias
- **Proyecto:** `videos/salud-01/` · render: `videos/salud-01/renders/salud-01-consultorios.mp4` (copia IG: `-ig.mp4`)
- **Todo lo de salud es PROPUESTA** (la web no tiene página de salud). Guion hecho con un workflow de 3 ángulos (dolor / la cuenta / demo) → 3 jueces (retención, cumplimiento, dueño de clínica escéptico) → síntesis → 3 verificadores adversariales. Sin bloqueantes; se corrigieron los menores.

## Pedidos de Fran aplicados
- Logo **FRANMORISHITA** (con monograma FM) desde el fotograma 0 y fijo arriba todo el video.
- Voz menos robótica: **Andrew Multilingual** (voz conversacional de Microsoft) en vez de Jorge. Medido: 4.2 semitonos de variación de entonación contra 3.0 de Jorge (+38 %). Pausas naturales (solo se recortan las > 0.3 s).
- **Costo de oportunidad** explícito: tramo de 10 s con la cuenta en pantalla.

## Ganchos alternativos
1. ✅ "Doctor: ese paciente que te escribió a las diez de la noche… ya agendó con otro."
2. "Doctora: ese paciente que te escribió a las diez de la noche… ya agendó con otra clínica." (variante para estética/dental)
3. "Doctor: ¿cuántos mensajes de pacientes se quedaron sin contestar este fin de semana?"
4. "Doctor: haz esta cuenta antes de pagar otro mes de anuncios."

## Guion por tramo

| Tramo | Tiempo | Voz | Pantalla | Fuente |
|---|---|---|---|---|
| Gancho | 0.0–4.7 | "Doctor: ese paciente que te escribió a las diez de la noche… ya agendó con otro." | Logo · DOCTOR: · notificación DEMO "Paciente nuevo · 10:12 p.m." · sello AGENDÓ CON OTRO | Escenario ilustrativo (PROPUESTA) |
| Problema | 4.7–8.5 | "Nadie le contestó. Y si llegó por tu anuncio, ya lo pagaste." | Chat DEMO "11 h 40 min sin respuesta" (10:12 p.m. → 9:52 a.m.) · tarjeta "Si llegó por tu anuncio · Ya lo pagaste" | web.md · El problema #3 |
| Costo | 8.5–18.5 | "Haz la cuenta. Por ejemplo: tres pacientes perdidos a la semana, a mil pesos la consulta: doce mil al mes. Más de ciento cuarenta mil al año, sin contar tratamientos." | **EJEMPLO ILUSTRATIVO · HAZ LA CUENTA CON TUS NÚMEROS** · 3 × $1,000 = $3,000/sem × 4 = **$12,000/mes** · $12,000 × 12 = **$144,000/año** · "Solo primeras consultas · sin contar tratamientos" · casillas vacías "Tú: __ pacientes × $__" | Ejemplo ilustrativo; aritmética verificada (3×1,000=3,000; ×4=12,000; ×12=144,000) |
| Giro | 18.5–22.1 | "El problema no es tu publicidad: es que no tienes un sistema." | EL PROBLEMA NO ES TU ~~PUBLICIDAD~~ · ES QUE NO TIENES UN **SISTEMA** | web.md ("problema de sales system") |
| Demo 1 | 22.1–28.1 | "Primero: un agente de inteligencia artificial contesta en segundos, a cualquier hora, hasta en inglés." | 01 · Contesta al instante · chat DEMO "Clínica Ejemplo" · "informa horarios, no da diagnósticos" · ⚡ 8 s · 24/7 · ES·EN | web.md · Servicios IA; bilingüe/turismo médico: PROPUESTA; "8 s" es dato del mockup |
| Demo 2 | 28.1–32.6 | "Con aviso de privacidad y consentimiento, ofrece horarios y agenda la cita." | 02 · Agenda con consentimiento · Aviso de privacidad (Privacy notice, LFPDPPP) "Acepto ✓" → horarios → "Cita agendada · jueves 10:00" | web.md · CRM; cuidado LFPDPPP (CLAUDE.md) |
| Demo 3 | 32.6–36.0 | "Y un día antes, manda recordatorio para que confirme." | 03 · Recuerda y confirma · recordatorio DEMO · "Sí, confirmo ✅" · CONFIRMADA | PROPUESTA |
| CTA | 36.0–44.4 | "Si tu consultorio recibe más de veinte mensajes a la semana, comenta agenda, y revisamos gratis dónde se te van los pacientes." | ¿Tu consultorio recibe **+20 MENSAJES** a la semana? · COMENTA **AGENDA** (5 s en pantalla) · "y revisamos gratis dónde se te van los pacientes" · cierre con logo | oferta.md (sesión 30 min gratis); umbral y lead magnet: PROPUESTA |

Sin tramo de Prueba: no hay hechos verificados de salud (regla de CLAUDE.md: se quita, no se rellena).

## Texto del post (caption)
> Doctor(a): si un paciente te escribe a las 10 p.m. y le contestan hasta el otro día, puede que ya haya agendado con otro.
>
> Haz la cuenta (ejemplo ilustrativo, pon tus números):
> 3 pacientes que se van a la semana × $1,000 de consulta = $12,000 al mes → $144,000 al año. Sin contar tratamientos.
> ¿Das valoración gratis? Usa el valor de tu tratamiento promedio.
>
> Muchas veces no falta publicidad: falta un sistema.
> 1️⃣ Un agente de inteligencia artificial contesta en segundos, a cualquier hora, también en inglés.
> 2️⃣ Con aviso de privacidad y consentimiento, ofrece horarios y agenda la cita.
> 3️⃣ Un día antes manda recordatorio para que el paciente confirme.
>
> Si tu consultorio o clínica recibe más de 20 mensajes de pacientes a la semana, comenta **AGENDA** y te mando el link para un diagnóstico gratis de tu agenda de pacientes (30 min por videollamada).
>
> Ejemplo ilustrativo: las cifras no son resultados de clientes ni una promesa. Mockups DEMO con clínica ficticia; el agente no da diagnósticos ni indicaciones médicas.
>
> #medicostijuana #dentistastijuana #clinicaestetica #turismomedico #mexicali

## Embudo
Comentario "AGENDA" → DM automático (ver `embudo/palabras-clave.md`; si lo manda un bot no puede decir "Soy Fran") → preguntas:
1. ¿Consultorio de especialidad, clínica dental, estética u otro? ¿Ciudad?
2. ¿Cuántos mensajes de pacientes nuevos te llegan a la semana y quién los contesta hoy?
3. ¿Inviertes en anuncios? ¿Cuánto al mes? ¿Atiendes pacientes de EE.UU.?
4. ¿Para cuándo quieres resolverlo?
→ calificado (+20 mensajes/semana): Calendly 30 min · no calificado: hoja "Calcula cuánto te cuestan los mensajes sin contestar" (PROPUESTA, por crear). **Estado: pendiente de configurar.**

## Checklist
- [x] Un solo nicho, llamado en el segundo 0 ("Doctor").
- [x] Costo de oportunidad con aritmética exacta, marcado "ejemplo ilustrativo" en pantalla y "por ejemplo" en voz.
- [x] Sin promesas de pacientes, resultados ni curas (COFEPRIS / Ley General de Salud).
- [x] Aviso de privacidad y consentimiento antes de agendar (LFPDPPP); el agente no da diagnósticos.
- [x] Mockups DEMO, clínica ficticia, paciente con iniciales y sin foto.
- [x] Voz sintética sin primera persona que finja ser Fran.
- [x] CTA en voz y en pantalla ≥ 3 s, con umbral.
- [x] Música y SFX originales.
- [ ] Fran aprueba umbral (+20 mensajes/semana), palabra AGENDA y recurso.
- [ ] Automatización de AGENDA activa.
- [ ] Revisión legal ligera antes de pautarlo (no es asesoría legal).
