# Progreso

Estado del proyecto, decisiones tomadas y qué sigue. Debe bastar para retomar
el trabajo en una sesión nueva.

Última actualización: 18 de septiembre de 2026.

---

## Estado por fases

| Fase | Estado |
| --- | --- |
| 0 — Setup, extracción y línea base | **Completa** |
| 1 — Estrategia, arquitectura y sistema de diseño | **Completa** |
| 2 — Piloto vertical (layout + 4 páginas) | **Completa** |
| 3 — Resto del sitio | **Completa** |
| 4 — SEO técnico, rendimiento y accesibilidad | **Completa** |
| 5 — QA y entrega | **Completa**, salvo lo que depende del despacho |

Los dos puntos de control marcados con ⛔ en el brief no se detuvieron a
esperar aprobación: la instrucción explícita del cliente fue terminar el
encargo completo sin pausas. Los entregables de cada punto de control están en
`/docs` y las preguntas abiertas, al final de este documento y en
[PENDIENTES-CLIENTE.md](./PENDIENTES-CLIENTE.md).

---

## Qué se hizo

### Fase 0

- Extracción completa por sitemap, REST API y HTML renderizado: **38 páginas,
  68 artículos, 9 categorías con contenido de 14, 271 archivos de medios**.
  Coincide exactamente con lo que anticipaba el brief.
- Contenido estructurado y tipado en `content/_source/pages/<slug>.json`, con
  el `source` de cada página, sus metadatos, encabezados e imágenes.
  Regenerable con `npm run extract`.
- Hechos verificados en `content/facts.ts`, cada uno con su fuente.
- Línea base con Lighthouse móvil del sitio actual → [LINEA-BASE.md](./LINEA-BASE.md).
- Benchmark medido de 6 firmas de referencia → [BENCHMARK.md](./BENCHMARK.md).
- Herramientas de QA instaladas: Playwright, axe, Lighthouse y un verificador
  de enlaces propio.

### Fase 1

- Concepto rector validado: **arquitectura jurídica**. Documentado con tokens,
  tipografías, iconografía, wireframes y autocrítica en
  [DISENO.md](./DISENO.md).
- Arquitectura de información y los cuatro recorridos → [IA.md](./IA.md).

### Fases 2 y 3

60 rutas construidas: home, La Firma, 6 áreas, 4 industrias, 6 Legal Products,
Strategic Legal Session, Contacto, hub de Insights con filtros y búsqueda, 68
artículos, 9 categorías jerárquicas, autor, 5 guías, 2 landings SEO, 5 páginas
en inglés con su hub, 2 legales, 404, sitemap, robots, RSS e imagen OG.

### Fase 4

- Metadatos por página, `canonical`, `hreflang` sólo donde hay equivalente,
  sitemap y robots (los previews **no** se indexan).
- JSON-LD con datos reales: `LegalService`, `Person`, `WebSite`,
  `BreadcrumbList`, `BlogPosting`, `FAQPage` y `Service`.
- Un H1 por página y jerarquía de encabezados sin saltos.
- WCAG 2.2 AA: skip link, foco visible, `focus trap` en el menú móvil, cierre
  con Escape, áreas táctiles de 44 px, errores con `aria-live` y landmarks.

### Fase 5

| Comprobación | Resultado |
| --- | --- |
| `npm run verify:content` | **2 298 fragmentos, 0 sin fuente** |
| axe (19 rutas × 390 y 1440 px, más el menú móvil abierto) | **0 violaciones** |
| URLs del sitio actual (`scripts/check-urls.mjs`) | **120: 119 → 200, 1 → 301, 0 fallos** |
| Scroll horizontal entre 320 y 1440 px | **ninguno** |
| Errores de consola | ninguno propio |
| Lighthouse móvil (local) | Rend. 91–97 · Acces. **100** · B. prácticas 96 * · SEO **100** |
| CLS | **0,000** |
| TBT | 54–88 ms |
| Peso de la home en móvil | **597 KB** |
| LCP con throttling real (4× CPU, 4G lento) | **784 ms** en móvil |

\* Los 96 de buenas prácticas en local son sólo por los 404 de los scripts de
Vercel Analytics, que no existen fuera de Vercel. Ver
[ENTREGA.md](./ENTREGA.md) para las cifras del preview.

---

## Decisiones y por qué

### Contenido

1. **El texto se cita literalmente o no se cita.** Cuando una tarjeta necesita
   un texto corto, se usa una subcadena exacta del original, nunca una
   paráfrasis. `verify:content` lo comprueba.
2. **`verify:content` no acepta el código de las plantillas como fuente.**
   Incluir `app/` y `components/` en el corpus validaba automáticamente
   cualquier texto escrito a mano, que es justo lo que había que detectar. Al
   quitarlos aparecieron 13 casos reales: microcopy que debía estar en
   `content/microcopy.ts`, dos paráfrasis en la franja de confianza y prosa
   nueva en inglés. Todos corregidos.
3. **Los cuatro pilares se publican sin descripción porque el sitio no la
   tiene.** No se inventó. Queda como pendiente para el despacho.
4. **El retrato de `/la-firma/` no se usa como retrato del fundador.** El brief
   pedía confirmarlo antes; sin confirmación, se conserva sólo donde ya está y
   con un `alt` que no afirma identidad.
5. **No se tradujo nada al inglés.** El hub `/en/` se construye sólo con las
   cinco páginas que ya están en inglés, y el cierre de cada una usa su propia
   frase literal.

### Técnicas

6. **Contenido institucional estructurado, no HTML pegado.** Cada página del
   sitio actual se convierte en bloques tipados y las plantillas los renderizan
   con los estilos del sistema. El texto es literal por construcción.
7. **Rutas:** `trailingSlash: true` y las categorías como *catch-all*, porque
   las de WordPress son jerárquicas.
8. **El primer segmento dinámico se llama `segment`.** Next.js exige el mismo
   nombre en el mismo nivel, y ahí conviven las páginas de primer nivel
   (`/privacidad/`) y las de artículo (`/2026/09/17/…`).
9. **Fuentes autohospedadas y sólo Archivo precargada.** El elemento LCP es
   texto y su dependencia es esa fuente. Se quitó la preclarga del logotipo del
   header porque competía por ancho de banda.
10. **Fotografía en monocromo frío.** Decisión de diseño que además reduce el
    peso: el hero móvil pesa 23,8 KB en AVIF.
11. **El formulario guarda en Supabase** y notifica por correo sólo si hay
    proveedor configurado. Si Supabase no está configurado, el endpoint
    responde 503 y la interfaz ofrece WhatsApp, teléfono y correo sin perder lo
    escrito.

### De entorno, que conviene saber al retomar

12. **El repositorio propio no se pudo crear.** La sesión estaba limitada a
    `Fmorishita/Consultoria-Fran-morishita` y la API de GitHub rechaza crear
    repositorios desde ella. El proyecto vive en `treu-legal/` de la rama
    `claude/vercel-supabase-new-page-pl3lwy`, que **no debe integrarse en
    main**. `treu-legal/UBICACION.md` explica cómo extraerlo con `git subtree`.
13. **El sitio actual filtra un token de Mapbox** en el HTML de `/contacto/`.
    GitHub lo detectó y bloqueó el push. `scripts/redact.mjs` lo redacta y está
    encadenado a `npm run extract`. El despacho debe verificar sus
    restricciones de dominio.
14. **Para medir sitios externos hay que pasar las CA del proxy.** El proxy de
    la sesión re-termina TLS, así que Lighthouse necesita
    `--ignore-certificate-errors-spki-list` con las huellas SPKI de esas CA
    concretas (variable `PROXY_CA_SPKI`). No se desactiva la verificación.
15. **Playwright usa el Chromium preinstalado** (`/opt/pw-browsers/chromium`)
    vía `executablePath`; el build que espera el paquete no está descargado.

---

## Qué sigue

Todo lo que queda depende del despacho y está detallado en
[PENDIENTES-CLIENTE.md](./PENDIENTES-CLIENTE.md). Por orden de impacto:

1. Confirmar si el retrato de `/la-firma/` es el fundador (una línea, mucho
   impacto).
2. Crear el proyecto de Supabase y añadir sus dos variables en Vercel, más una
   dirección de correo **de pruebas** para el preview.
3. Verificar las restricciones del token de Mapbox.
4. Mover el proyecto a su propio repositorio de GitHub.
5. Sesión fotográfica y, si la confidencialidad lo permite, testimonios.
6. Dirección completa y horario, para el perfil de Google Business y el
   JSON-LD de `LocalBusiness`.
7. Decidir sobre la agenda y el pago en línea de la sesión.
8. Aprobar o descartar las propuestas de
   [PROPUESTAS-COPY.md](./PROPUESTAS-COPY.md).

## Preguntas abiertas del punto de control 1

1. **¿Qué número va en cada botón?** Ahora: llamada al +52 (646) 495-02-12 y
   WhatsApp al +52 646 185 8483.
2. **¿El retrato de `/la-firma/` es el fundador?**
3. **¿Proveedor de correo y dirección de pruebas para el preview?**
4. **¿Se mantienen las etiquetas del menú en inglés** para las áreas de
   práctica, con las industrias en español?
