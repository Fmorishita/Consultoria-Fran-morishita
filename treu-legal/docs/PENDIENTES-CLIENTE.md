# Pendientes del cliente

Lo que Treu podría aportar para superar a la competencia. **Nada de esto se ha
simulado**: el sitio se ve completo sin ello. Ordenado por impacto en la
conversión.

## Urgente — no es diseño

### 0. Verificar el token de Mapbox de `/contacto/`

El HTML de `/contacto/` incrusta un token público de Mapbox del mapa embebido.
GitHub lo detectó al subir el contenido extraído y bloqueó el push, así que el
proyecto lo redacta automáticamente
([`scripts/redact.mjs`](../scripts/redact.mjs)).

Los tokens `pk.` de Mapbox están pensados para vivir en el cliente, pero **sólo
son seguros si tienen restricción de dominio**. Conviene entrar a la cuenta de
Mapbox, comprobar que ese token esté restringido a `treulegal.solutions` y
rotarlo si no lo está. El sitio nuevo no usa Mapbox: enlaza a Google Maps con
las coordenadas.

## Alto impacto

### 1. Confirmar la identidad del retrato de `/la-firma/`

El sitio actual publica un retrato en blanco y negro dentro de la sección
«Perfil profesional». Por contexto parece ser el fundador, pero **el despacho
no lo ha confirmado**, así que el sitio nuevo:

- lo conserva exactamente en la misma posición que hoy;
- **no** lo usa en la home ni en ningún sitio donde afirmar que es el fundador
  sería una afirmación nueva;
- le pone un texto alternativo que no asegura la identidad de la persona.

Basta una confirmación por escrito para poder usarlo como retrato del fundador
en la home, en `/strategic-legal-session/` y en la imagen OG. **Es el cambio de
una sola línea con más impacto de esta lista.**

### 2. Sesión fotográfica profesional del fundador y de la oficina en Ensenada

El sitio no tiene ninguna fotografía propia del despacho. Las dos fotografías
de contexto que usa el sitio nuevo son de licencia libre (Valle de Guadalupe y
la conurbación Tijuana–San Diego) y están elegidas para no parecer stock, pero
no sustituyen a material propio.

Formato sugerido: 8–12 tomas horizontales a 3000 px de ancho como mínimo, en
JPEG sin recorte. Retrato del fundador (fondo neutro y fondo de oficina), la
oficina vacía, una mesa de trabajo con documentos y una toma del edificio.

Por qué mejora la conversión: es la señal de confianza que más pesa cuando el
despacho no puede publicar testimonios.

### 3. Testimonios o casos, con autorización y resguardo de confidencialidad

El sitio nuevo **no incluye ninguno**, porque el sitio actual no los tiene.

Formato sugerido: 3–5 testimonios de dos o tres frases con nombre, cargo,
industria y tamaño de empresa, más una autorización por escrito. Si la
confidencialidad no lo permite, sirven casos anonimizados por sector
(«desarrolladora inmobiliaria en Ensenada, 40 empleados»).

### 4. Dirección completa y horario de atención

Hoy sólo hay coordenadas y la ciudad. Sin calle, número y horario no se puede
hacer un perfil de Google Business ni un `LocalBusiness` completo en JSON-LD,
que es lo que alimenta las búsquedas «abogado corporativo cerca de mí».

Formato sugerido: calle y número, colonia, código postal, y horario por día.

### 5. Perfil de Google Business con reseñas

Con la dirección y el horario del punto anterior. Es el canal por el que un
empresario de Ensenada busca un abogado, y hoy el despacho no aparece.

### 6. Agenda y pago en línea de la Strategic Legal Session

Ahora mismo la sesión requiere formulario, respuesta del despacho y
coordinación manual. Con agenda en línea (Cal.com o Calendly) y pago con
tarjeta (Stripe o Mercado Pago), el prospecto decidido cierra sin esperar. La
página ya publica el precio: USD $150.

Es la mejora de conversión con mejor relación esfuerzo/resultado después del
punto 1.

## Impacto medio

### 7. Cédula profesional, colegiaciones y membresías verificables

La biblioteca de medios del sitio contiene logotipos de ANADE, el Colegio de
Abogados de Ensenada, la ICC México y la CNNM, de una versión anterior del
sitio. **No se han usado**: no aparecen en el sitio actual, así que afirmar esas
membresías sería inventar, y además el brief prohíbe logotipos de terceros.

Si las membresías están vigentes, con el número de cédula profesional y el
nombre de cada colegiación se pueden mostrar **como texto** en `/la-firma/`,
que es como debe hacerse.

### 8. Versión completa en inglés aprobada por el despacho

Hoy hay cinco páginas en inglés y el resto del sitio está en español. Además,
`/en/legal-intelligence-for-business-corporate-lawyer-in-mexico-english/` tiene
el título en inglés y el cuerpo en español.

El sitio nuevo **no traduce nada**: el hub `/en/` se construye sólo con lo que
ya existe en inglés, y el selector de idioma aparece únicamente donde hay
equivalente. Los datos de la Strategic Legal Session sólo están publicados en
español, así que en las páginas de `/en/` se usa la frase de cierre que cada una
ya tiene.

Prioridad de traducción, para el recorrido de la empresa extranjera:
`/strategic-legal-session/` → `/industrias/empresas-binacionales/` →
`/legal-products/cross-border-entry-package/` → `/la-firma/`.

### 9. Contenido para Colaboración Profesional, o retirar la sección

El enlace «Colaboración Profesional» del footer actual responde **404**. El
sitio nuevo lo retira y deja una redirección 301 a `/la-firma/`, que sí tiene
la sección de colaboración multidisciplinaria con su formulario «ME INTERESA
COLABORAR».

Decisión pendiente: crear la página con su propio contenido y formulario, o
retirar la sección definitivamente.

### 10. Descripción de los cuatro pilares de la home

Los cuatro pilares («Consultoría jurídica corporativa», «Entendimiento
operativo de negocios», «Prevención de riesgos legales», «Visión cross-border
México-EE.UU.») se publican **sólo como títulos**, sin una línea que los
explique. Son los diferenciadores del despacho. Una o dos frases por pilar,
escritas por el despacho, y el diseño ya reserva el espacio.

## Configuración técnica que el despacho debe aportar

| Qué | Para qué | Variable |
| --- | --- | --- |
| Proyecto de Supabase (URL y service role key) | Guardar las solicitudes del formulario | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| Dirección de correo de **pruebas** | Recibir los envíos del preview. **Nunca la del despacho** mientras sea preview | `CONTACT_TO` |
| Clave de Resend (u otro proveedor) | Notificación por correo de cada solicitud. Opcional: sin ella la solicitud se guarda igual | `RESEND_API_KEY` |
| Secreto de revalidación | Webhook de publicación de WordPress → `/api/revalidate` | `REVALIDATE_SECRET` |
| IDs de GA4 o Meta Pixel | Sólo si el despacho los quiere. Si se añaden, hay que implementar consentimiento de cookies | — |

Ver [`.env.example`](../.env.example) y el apartado de Supabase de
[ENTREGA.md](./ENTREGA.md).

## Decisiones que el despacho debe confirmar

1. **¿Qué número va en cada botón?** El sitio nuevo usa el teléfono
   +52 (646) 495-02-12 (el que aparece en todo el sitio) para llamar, y el
   WhatsApp +52 646 185 8483 (hoy sólo visible en
   `/strategic-legal-session/`) para mensajería. Si el WhatsApp debe ser otro,
   se cambia en una línea de `content/facts.ts`.
2. **¿Se mantienen las etiquetas del menú en inglés?** Las áreas de práctica
   están en inglés («Corporate & Business Law») y las industrias en español
   («Desarrollo Inmobiliario»). Se ha conservado tal cual.
3. **¿Proveedor de correo?** El formulario está preparado para Resend; cambiarlo
   es sustituir una función en `app/api/contacto/route.ts`.
4. **Erratas:** las cuatro correcciones aplicadas están en
   [CAMBIOS-DE-CONTENIDO.md](./CAMBIOS-DE-CONTENIDO.md). Si alguna no procede,
   se retira de `content/corrections.ts`.
