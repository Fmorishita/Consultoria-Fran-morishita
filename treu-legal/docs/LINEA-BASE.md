# Línea base

Medición del sitio actual antes de tocar nada, para poder comparar. Producción
es de sólo lectura: estas mediciones no modifican el sitio.

Reproducible con `node scripts/baseline.mjs`. Datos crudos en
`docs/_lighthouse/base/`.

## Lighthouse móvil — treulegal.solutions (18 de septiembre de 2026)

| Página | Rend. | Acces. | B. prácticas | SEO | LCP | CLS | TBT | Peso | Peticiones |
| --- | --: | --: | --: | --: | --: | --: | --: | --: | --: |
| `/` | **59** | 93 | 100 | 92 | 21,3 s | 0,000 | 68 ms | 4 775 KB | 58 |
| `/strategic-legal-session/` | **64** | 94 | 100 | 100 | 13,4 s | 0,001 | 110 ms | 2 977 KB | 57 |
| `/areas-de-practica/corporate-business-law/` | **62** | 91 | 100 | 100 | 6,6 s | 0,002 | 99 ms | 804 KB | 48 |
| `/insights/` | **79** | 93 | 100 | 92 | 4,1 s | 0,000 | 70 ms | 1 233 KB | 53 |

## Lighthouse móvil — sitio nuevo, medido en servidor local

| Página | Rend. | Acces. | B. prácticas | SEO | LCP | CLS | TBT | Peso |
| --- | --: | --: | --: | --: | --: | --: | --: | --: |
| `/` | **91** | **100** | 96 * | **100** | 3,5 s * | 0,000 | 59 ms | 597 KB |
| `/strategic-legal-session/` | **94** | **100** | 96 * | **100** | 3,0 s * | 0,000 | 54 ms | 516 KB |
| `/areas-de-practica/corporate-business-law/` | **93** | **100** | 96 * | **100** | 3,0 s * | 0,001 | 88 ms | 521 KB |
| `/insights/` | **97** | **100** | 96 * | **100** | 2,5 s * | 0,000 | 81 ms | 433 KB |

\* Dos salvedades del entorno local, ambas desaparecen en el preview de Vercel:

- **Buenas prácticas 96.** El único fallo es `errors-in-console`: los scripts
  de Vercel Analytics (`/_vercel/insights/script.js` y
  `/_vercel/speed-insights/script.js`) sólo existen dentro de Vercel, así que
  en local devuelven 404.
- **LCP.** El modelo de throttling simulado de Lighthouse penaliza un servidor
  local sin CDN, sin HTTP/2 y sin Brotli. Con throttling **real** sobre el
  mismo build (4× CPU y 4G lento, vía CDP) el LCP medido es:

  | Ancho | LCP | Elemento LCP |
  | --- | --: | --- |
  | 390 px | **784 ms** | Párrafo de propuesta de valor del hero |
  | 1440 px | **2 272 ms** | Fotografía del hero (`valle-de-guadalupe-1024.avif`) |

Las cifras definitivas, medidas contra el preview de Vercel, están en
[ENTREGA.md](./ENTREGA.md).

## Capturas

`docs/_capturas/` contiene capturas a 390 y 1440 px de la home, la sesión, un
área de práctica y contacto. Se regeneran con `node scripts/shots.mjs`.

## Otras mediciones del sitio actual

De la extracción (`docs/INVENTARIO.md` y `content/_source/`):

| | |
| --- | --- |
| Páginas | 38 |
| Artículos | 68 |
| Categorías con contenido | 9 de 14 |
| Archivos en la biblioteca de medios | 271 |
| Imágenes sin `alt` en el contenido | 51 |
| Formularios distintos en `/contacto/` | 2 |
| Páginas de paginación en el listado de la home | 23 |
| URLs comprobadas en el sitio nuevo | 120 (119 responden 200, 1 con 301) |
