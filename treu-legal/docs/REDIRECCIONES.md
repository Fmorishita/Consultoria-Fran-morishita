# Redirecciones

El sitio nuevo **conserva todas las rutas del sitio actual**. Las 120 URLs
publicadas hoy (38 páginas, 68 artículos, 9 categorías, 1 autor, el feed y los
archivos de SEO) responden en el sitio nuevo: 119 con **200** y 1 con **301**.

Comprobación automática: `node scripts/check-urls.mjs`.

## Ninguna ruta de contenido cambia

| Tipo | Patrón | Estado |
| --- | --- | --- |
| Páginas | `/<slug>/` | 200 |
| Áreas de práctica | `/areas-de-practica/<slug>/` | 200 |
| Industrias | `/industrias/<slug>/` | 200 |
| Legal Products | `/legal-products/<slug>/` | 200 |
| Guías | `/insights/<slug>/` | 200 |
| Artículos | `/AAAA/MM/DD/<slug>/` | 200 |
| Categorías (incluidas las jerárquicas) | `/category/<madre>/<hija>/` | 200 |
| Autor | `/author/<slug>/` | 200 |
| Páginas en inglés | `/en/<slug>/` | 200 |
| Legales | `/privacidad/`, `/condiciones-de-uso/` | 200 |
| RSS | `/feed/` | 200 |

Las categorías de WordPress son jerárquicas y su URL lleva la categoría madre
(`/category/corporate-law-governance/corporate-governance/`). La ruta del sitio
nuevo es *catch-all* y resuelve por el último segmento, comprobando que la ruta
completa coincida con la que publica WordPress.

## Redirecciones 301 añadidas

Definidas en [`next.config.ts`](../next.config.ts).

| Origen | Destino | Motivo |
| --- | --- | --- |
| `/colaboracion-profesional` | `/la-firma/` | El enlace del footer actual responde **404**. `/la-firma/` contiene la sección de colaboración multidisciplinaria. Ver pendientes. |
| `/author/:slug/feed` | `/feed/` | WordPress publica un feed por autor; el sitio nuevo tiene uno solo. |
| `/category/:slug/feed` | `/feed/` | Ídem por categoría. |
| `/comments/feed` | `/feed/` | El sitio nuevo no tiene comentarios. |

## Redirección temporal (302)

| Origen | Destino | Motivo |
| --- | --- | --- |
| `/wp-admin/:path*` | `/` | Rutas de administración de WordPress que no existen en el sitio nuevo. Es 302, no 301, porque al mover WordPress a un subdominio esas rutas volverán a existir allí. |

## Normalización de la barra final

`trailingSlash: true` replica el comportamiento actual: todas las rutas llevan
barra final y las variantes sin barra se redirigen con **308** (equivalente
permanente que conserva el método). Por eso hay una sola 301 en la
comprobación: es la normalización de `/en` → `/en/`.

## Al salir a producción

Ver [ENTREGA.md](./ENTREGA.md). El paso crítico es mover WordPress a un
subdominio (`cms.treulegal.solutions`) **antes** de apuntar el DNS, para que
siga sirviendo la REST API de los Insights.
