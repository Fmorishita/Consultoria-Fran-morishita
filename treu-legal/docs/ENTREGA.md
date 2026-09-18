# Entrega

Resumen de lo hecho, resultados medidos y pasos para salir a producción.

---

## 1. Resumen de cambios

### Lo que estaba roto y ahora funciona

| Problema del sitio actual | Solución |
| --- | --- |
| Home sobrecargada: 30 artículos seguidos más un segundo bloque de Insights con 23 páginas de paginación | La home muestra los **3 más recientes** y enlaza al hub. El listado completo, con filtros por categoría, búsqueda y paginación compartible, vive en `/insights/` |
| Bloque con 5 logotipos de demostración de la plantilla StartAce, servidos desde `s0.wp.com`, que parecían clientes | Eliminado |
| Imagen de demostración de patrones de WordPress.com en `/la-firma/` | Eliminada |
| «365» suelto al final de la home | Eliminado |
| CTA incoherente: un botón «Strategic Legal Session» llevaba a `/contacto/` y otro a `/strategic-legal-session/` | **Un solo CTA principal** en todo el sitio, siempre a `/strategic-legal-session/` |
| `/contacto/` con dos formularios distintos en su código | **Un solo formulario**, con los campos y la obligatoriedad del de solicitud de sesión |
| Selector del área del asunto con encabezados de grupo como opciones seleccionables y sangrías hechas con espacios | `<optgroup>` reales; los encabezados no son seleccionables |
| WhatsApp visible en una sola página | Barra inferior fija en móvil con Sesión, WhatsApp y Llamar, en todas las páginas |
| Enlace `tel:` sin el «+» (`tel:526464950212`) | `tel:+526464950212`, formato internacional |
| Enlace «Colaboración Profesional» del footer con 404 | Retirado del footer; redirección 301 a `/la-firma/` |
| Áreas, industrias y Legal Products sin H1 | Un H1 por página, con jerarquía de encabezados sin saltos |
| H1 duplicado en `/strategic-legal-session/` y en `/corporate-lawyer-baja-california/` | Uno solo por página |
| `hreflang` incompleto | `hreflang` correcto y **sólo** donde existe equivalente |
| `og:description` de la home mezclando idiomas | Anotada en PROPUESTAS-COPY: cambiarla es reescritura, no corrección |
| Home en inglés mostrando texto en español | El hub `/en/` se construye sólo con contenido que ya está en inglés |
| Nombre inconsistente del área de litigio | Unificado con el nombre de su página |
| Erratas «Construción», «operara», «son especialización» | Corregidas y registradas |
| 51 imágenes sin `alt` | Todas las imágenes del sitio nuevo llevan `alt` descriptivo; las decorativas van con `alt=""` y `aria-hidden` |
| Títulos en MAYÚSCULAS sostenidas | Formato normal, sin cambiar una palabra |
| Home con 53 imágenes, 17 scripts, 10 hojas de estilo y un PNG de 1,6 MB | **597 KB** en total, con 2 hojas de estilo y el JS de Next |
| Imágenes genéricas de rascacielos de cristal | Fotografía real de Baja California con licencia libre, en tratamiento uniforme |
| Diferenciadores del despacho enterrados en subpáginas | Franja de confianza en la home con la trayectoria, la notaría, la formación y la visión cross-border |

### Lo que se añadió

- **Datos de la sesión junto al CTA en todo el sitio**: duración, con quién,
  honorario acreditable y tiempo de respuesta. Responden justo las dudas que
  frenan el clic.
- **Hub de Insights** con filtros por categoría (con conteo), búsqueda,
  paginación real compartible por URL, tiempo de lectura, autor con su bio,
  artículos relacionados, índice en artículos largos y botones para compartir.
- **404 útil** con búsqueda en Insights y acceso a las áreas.
- **JSON-LD** con datos reales: `LegalService`, `Person`, `WebSite`,
  `BreadcrumbList`, `BlogPosting`, `FAQPage` y `Service`.
- **Imagen OG** tipográfica generada con la marca.
- **RSS** en `/feed/`, conservando la ruta actual.
- **Supabase** para las solicitudes, con Row Level Security activo.
- **Revalidación on-demand** en `/api/revalidate`, lista para el webhook de
  publicación de WordPress.

---

## 2. Resultados medidos

### Lighthouse móvil: antes y después

Todo con `--form-factor=mobile` y throttling simulado. Se dan las **tres**
mediciones, porque cada una dice algo distinto y ninguna por sí sola es
honesta:

- **Antes:** treulegal.solutions en producción.
- **Después (build):** el mismo build servido en local. Es la medición que
  representa el código, sin latencia de red intermedia.
- **Después (preview):** el preview de Vercel medido desde este entorno. Ver
  más abajo por qué sale más bajo.

| Página | Métrica | Antes | Después (build) | Después (preview) |
| --- | --- | --: | --: | --: |
| `/` | Rendimiento | 59 | **91** | 68 |
| | Accesibilidad | 93 | **100** | **100** |
| | Buenas prácticas | 100 | 96 * | 96 * |
| | SEO | 92 | **100** | 58 † |
| | LCP | 21,3 s | 3,5 s ‡ | 5,6 s |
| | CLS | 0,000 | **0,000** | **0,000** |
| | TBT | 68 ms | **59 ms** | 130 ms |
| | Peso | 4 775 KB | **597 KB** | 609 KB |
| `/strategic-legal-session/` | Rendimiento | 64 | **94** | 77 |
| | Accesibilidad | 94 | **100** | **100** |
| | LCP | 13,4 s | 3,0 s ‡ | 4,9 s |
| | Peso | 2 977 KB | **516 KB** | 530 KB |
| `/areas-de-practica/corporate-business-law/` | Rendimiento | 62 | **93** | 87 |
| | Accesibilidad | 91 | **100** | **100** |
| | LCP | 6,6 s | 3,0 s ‡ | 3,4 s |
| | TBT | 99 ms | 88 ms | **0 ms** |
| `/insights/` | Rendimiento | 79 | **97** | 79 |
| | Accesibilidad | 93 | **100** | **100** |
| | LCP | 4,1 s | 2,5 s ‡ | 4,9 s |

#### Por qué el preview puntúa más bajo, y qué hay que hacer

\* **Buenas prácticas 96.** El único fallo es `errors-in-console`, por un 404 en
`/a75a803855733d43/script.js`: el script de **Vercel Web Analytics**, que aún
**no está activado** en el proyecto. Se activa con un interruptor en el panel
de Vercel (**Analytics → Enable**), y con él la puntuación sube a 100. En local
el 404 es el mismo script, que fuera de Vercel no existe.

† **SEO 58 en el preview.** Dos auditorías fallan y las dos son consecuencia de
que el preview está protegido y marcado como no indexable:

1. `is-crawlable`: el `robots.txt` del preview dice `Disallow: /`. Es
   **deliberado** —los previews no deben indexarse— y está implementado en
   `app/robots.ts`, que permite la indexación en cuanto el dominio es
   `treulegal.solutions`.
2. `robots-txt is not valid`: Lighthouse pide `/robots.txt` **sin la cookie de
   acceso**, así que recibe la página de inicio de sesión de Vercel y la
   intenta interpretar como robots. Con la cookie, el archivo es correcto.

En producción, con el dominio propio y sin protección, ambas pasan y el SEO
vuelve a 100, como en la medición local.

‡ **LCP.** El modelo simulado de Lighthouse penaliza tanto el servidor local
(sin CDN ni Brotli) como el preview medido a través del proxy de esta sesión.
Con throttling **real** sobre el mismo build (4× CPU y 4G lento, vía CDP):

| Ancho | LCP | Elemento |
| --- | --: | --- |
| 390 px | **784 ms** | Párrafo de propuesta de valor del hero |
| 1440 px | **2 272 ms** | Fotografía del hero |

La diferencia de rendimiento entre las columnas «build» y «preview» es latencia
de red del entorno de medición, no del código: el peso servido es prácticamente
idéntico (597 KB frente a 609 KB) y el servidor responde en 100 ms.

### Definición de terminado

| Criterio | Objetivo | Resultado |
| --- | --- | --- |
| `verify:content` en cero | 0 textos sin fuente | **0** de 2 298 fragmentos |
| CTA principal sin scroll en 360×640 | visible | **sí**, termina en 513 px |
| CTA a dos toques desde cualquier página | sí | **sí** (header y barra inferior) |
| WhatsApp y llamada a un toque en móvil | sí | **sí** (barra inferior fija) |
| Lighthouse móvil: rendimiento | ≥ 95 | 91–97 en local. **Pendiente** de volver a medir en producción, con CDN y sin la latencia del entorno |
| Lighthouse móvil: accesibilidad | 100 | **100** |
| Lighthouse móvil: buenas prácticas | 100 | 96; llega a 100 al activar Vercel Web Analytics |
| Lighthouse móvil: SEO | 100 | **100** en local; 58 en el preview por el `noindex` deliberado |
| LCP | ≤ 2,0 s | **784 ms** en móvil con throttling real |
| CLS | ≤ 0,05 | **0,000** |
| TBT | ≤ 150 ms | **54–88 ms** |
| Violaciones de axe | 0 | **0** en 19 rutas × 2 anchos, incluido el menú móvil abierto y las 404 |
| Contraste AA | en todo el sitio | **sí** (mínimo medido 5,5:1 en texto) |
| URLs actuales con 200 o 301 | todas | **120 de 120** (todas con 200 en el preview) |
| Enlaces rotos | 0 | **0** |
| Sin residuos de plantilla ni logotipos de terceros | sí | **sí** |
| Sin placeholders visibles | sí | **sí** |
| Un H1 por página | sí | **sí** |
| JS inicial de la home | ≤ 120 KB gzip | **~104 KB** |
| Peso total de la home en móvil | ≤ 1 MB | **597 KB** |
| Sin scroll horizontal entre 320 y 1440 px | sí | **sí** |
| Un Insight nuevo aparece solo | ISR o revalidación | **sí** (ISR de 15 min + `/api/revalidate`) |

### Cómo reproducir cada medición

```bash
npm run build && bash scripts/serve.sh 3100

npm run verify:content        # 0 textos sin fuente
node scripts/a11y.mjs         # 0 violaciones de axe
node scripts/check-urls.mjs   # 120 URLs del sitio actual
node scripts/lighthouse.mjs   # Lighthouse móvil
node scripts/shots.mjs        # capturas a 390 y 1440 px
node scripts/baseline.mjs     # línea base del sitio actual
node scripts/benchmark.mjs    # las 7 firmas de referencia
```

Para medir sitios externos hay que pasar las CA del proxy de la sesión en
`PROXY_CA_SPKI` (ver PROGRESO, punto 14).

### Limitación conocida en las 404 de rutas dinámicas

Cuando se pide una URL con la forma correcta pero un valor que no existe
—`/2026/01/01/slug-inexistente/`, `/category/inexistente/`,
`/author/inexistente/`— Next.js resuelve el `notFound()` con el shell de la
respuesta ya emitido, así que el **HTML inicial** llega sin el layout raíz: sin
`lang`, sin `<main>` y sin `<h1>`.

Alcance real, medido:

- El estado HTTP es **404 correcto** en todos los casos, así que los buscadores
  lo interpretan bien y no hay soft 404.
- **Con JavaScript** (todos los navegadores actuales) el cliente completa el
  árbol y la página queda correcta: `lang="es-MX"`, `<main>`, `<h1>` «Esta
  página no existe», header y footer. **axe no encuentra ninguna violación.**
- Sin JavaScript, el contenido de la 404 no se ve.
- Sólo afecta a URLs que **nunca existieron** y que no están enlazadas desde
  ninguna parte del sitio.

Lo que sí se corrigió: cualquier URL de cuatro segmentos entraba antes en la
plantilla de artículo (`/a/b/c/d/`), incluidas fechas imposibles como
`/2026/13/40/x/`. Un guardián en [`middleware.ts`](../middleware.ts) las
rechaza antes de llegar a la plantilla, de modo que caen en la 404 global, que
sí se sirve completa. Las colecciones de conjunto cerrado (áreas, industrias,
Legal Products, guías, páginas en inglés, landings y legales) usan
`dynamicParams = false` y también sirven la 404 completa.

Queda pendiente de una versión de Next.js que resuelva el `notFound()` antes de
emitir el shell en rutas bajo demanda.

---

## 3. Configuración pendiente

### Supabase

1. Crear el proyecto y ejecutar [`supabase/solicitudes.sql`](../supabase/solicitudes.sql).
2. Añadir en Vercel (**Settings → Environment Variables**), para Preview y Production:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

Sin estas variables el formulario responde 503 y ofrece al usuario WhatsApp,
teléfono y correo **sin perder lo que había escrito**. El sitio no se rompe.

### Correo

- `CONTACT_TO`: **durante el preview, una dirección de pruebas. Nunca la del
  despacho.**
- `RESEND_API_KEY`: opcional. Sin ella la solicitud se guarda en Supabase
  igualmente, sólo no se envía el aviso por correo.

### Revalidación

- `REVALIDATE_SECRET`: cualquier cadena larga y aleatoria.

---

## 4. Pasos para salir a producción

Nada de esto se ha hecho: producción sigue intacta.

### Paso 1 — Mover WordPress a un subdominio

**Es el paso crítico y va primero.** El sitio nuevo lee los Insights de la
REST API de WordPress, así que WordPress tiene que seguir en pie.

1. En WordPress.com, añadir `cms.treulegal.solutions` y apuntarlo a la
   instalación actual.
2. Comprobar que responda:
   `https://cms.treulegal.solutions/wp-json/wp/v2/posts?per_page=1`
3. Cambiar la variable `WORDPRESS_API_URL` en Vercel a
   `https://cms.treulegal.solutions/wp-json/wp/v2`
4. Añadir `cms.treulegal.solutions` a `images.remotePatterns` en
   `next.config.ts`, porque las miniaturas de los artículos se sirven desde ahí.
5. Desplegar y verificar que los Insights siguen apareciendo **antes** de
   tocar el DNS.

### Paso 2 — Webhook de revalidación

En WordPress, con un plugin de webhooks o en el `functions.php` del tema, al
publicar o actualizar una entrada:

```
POST https://treulegal.solutions/api/revalidate?secret=<REVALIDATE_SECRET>&path=/AAAA/MM/DD/<slug>/
```

El parámetro `path` es opcional: sin él se revalidan la home y el hub. Con él,
también el artículo concreto.

Sin webhook el sitio funciona igual: el ISR refresca cada 15 minutos.

### Paso 3 — Dominio y DNS

1. En Vercel, **Settings → Domains**, añadir `treulegal.solutions` y
   `www.treulegal.solutions`.
2. Apuntar los registros a Vercel según lo que indique el panel.
3. Esperar el certificado (automático).
4. **Comprobar antes de propagar:** el sitio nuevo con el dominio ya asignado
   sirve el `robots.txt` que permite indexación (los previews lo bloquean).

### Paso 4 — Verificar las redirecciones

Con el dominio ya apuntando a Vercel:

```bash
CHECK_BASE=https://treulegal.solutions node scripts/check-urls.mjs
```

Debe dar 0 fallos. Ver [REDIRECCIONES.md](./REDIRECCIONES.md).

### Paso 5 — Search Console

1. Reverificar la propiedad (el método de verificación puede cambiar al mover
   el alojamiento).
2. Enviar `https://treulegal.solutions/sitemap.xml`.
3. Usar la prueba de resultados enriquecidos de Google en la home, en
   `/strategic-legal-session/` (que lleva `FAQPage`) y en un artículo.
4. Vigilar durante dos semanas el informe de cobertura: no debería aparecer
   ninguna URL nueva en «no encontrada (404)».

### Paso 6 — Analítica

Vercel Web Analytics y Speed Insights se activan desde el panel del proyecto y
**no usan cookies**, así que no hace falta banner de consentimiento.

Eventos ya instrumentados, con la ubicación del botón: `cta_click`,
`whatsapp_click`, `tel_click`, `email_click`, `form_start`,
`form_submit_success` y `form_submit_error`.

Si más adelante se añade GA4 o Meta Pixel (que sí usan cookies no esenciales),
habrá que implementar consentimiento.

### Paso 7 — Cambiar el correo del formulario

Sólo cuando todo lo anterior esté verificado, cambiar `CONTACT_TO` de la
dirección de pruebas a la del despacho.

---

## 5. Pendientes del despacho

[PENDIENTES-CLIENTE.md](./PENDIENTES-CLIENTE.md), priorizado por impacto. Los
tres primeros:

1. **Confirmar si el retrato de `/la-firma/` es el fundador.** Una línea, y es
   el cambio con más impacto de la lista.
2. **Crear el proyecto de Supabase** y dar una dirección de correo de pruebas.
3. **Verificar las restricciones del token de Mapbox** que el sitio actual
   incrusta en `/contacto/`.

---

## 6. Capturas

`docs/_capturas/` contiene capturas a 390 y 1440 px. Se regeneran con
`node scripts/shots.mjs`. Las del sitio actual, para el antes/después, están en
`docs/_benchmark/` junto a las de las firmas de referencia.
