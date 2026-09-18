# Cambios de contenido

Registro completo de **toda** modificación al texto del sitio actual. Fuera de
esta lista, el texto es literal.

Lo permitido por el brief: reordenar, jerarquizar, dividir párrafos, convertir
listas en componentes, pasar MAYÚSCULAS sostenidas a formato normal y corregir
erratas evidentes. Nada de reescritura de estilo: las mejoras de redacción
están propuestas, sin aplicar, en [PROPUESTAS-COPY.md](./PROPUESTAS-COPY.md).

Las correcciones de texto se aplican en un solo sitio,
[`content/corrections.ts`](../content/corrections.ts), y `npm run verify:content`
las acepta como fuente válida.

## 1. Erratas corregidas

| Dónde | Antes | Ahora | Motivo |
| --- | --- | --- | --- |
| Home, tarjeta de industria | Construción e Infraestructura | Construcción e Infraestructura | Errata ortográfica. La propia página de la industria ya lo escribe bien. |
| Home, tarjeta de Legal Product | …necesaria para operara en México… | …necesaria para operar en México… | Errata de conjugación. |
| `/la-firma/`, perfil profesional | …para empresas, son especialización en… | …para empresas, con especialización en… | Errata: «son» por «con». |
| `/la-firma/`, quiénes somos | …aliados estratégicos de las empresas.. | …aliados estratégicos de las empresas. | Punto duplicado. |

## 2. Unificación de un nombre propio

| Dónde | Antes | Ahora | Motivo |
| --- | --- | --- | --- |
| Home, tarjeta de área de práctica | Litigation Strategy & Corporate Disputes | Strategic Litigation & Dispute Resolution | El menú y la propia página del área usan este segundo nombre. Se unifica con el de la página, no al contrario. |

## 3. MAYÚSCULAS sostenidas pasadas a formato normal

Los títulos del sitio actual están en mayúsculas sostenidas, lo que reduce la
legibilidad y hace que los lectores de pantalla los deletreen. Se muestran en
formato normal **sin cambiar una sola palabra**. Ejemplos:

| Antes | Ahora |
| --- | --- |
| ¿POR QUÉ TREU LEGAL & BUSINESS? | ¿Por qué Treu Legal & Business? |
| ÁREAS DE PRÁCTICA | Áreas de Práctica |
| INDUSTRIAS QUE ASESORAMOS | Industrias que asesoramos |
| CONSULTORÍA JURÍDICA CORPORATIVA | Consultoría jurídica corporativa |
| VISIÓN CROSS-BORDER MÉXICO-EE.UU. | Visión cross-border México-EE.UU. |

La conversión conserva siglas y nombres propios (TREU, CRSS, PLD, RNIE, OMPI,
ESADE, UABC, EE.UU., FinTech…). Está implementada en la función `unshout` de
[`content/corrections.ts`](../content/corrections.ts).

El wordmark «TREU / LEGAL & BUSINESS» y el tagline «LEGAL INTELLIGENCE FOR
BUSINESS» **sí** conservan la caja alta: son la marca.

## 4. Elementos retirados

| Qué | Dónde | Motivo |
| --- | --- | --- |
| Bloque «Brought to you by the creators of» con 5 logotipos | Home | Contenido de demostración de la plantilla StartAce, servido desde `s0.wp.com`. Parecían logotipos de clientes. |
| Imagen de patrones de demostración de WordPress.com | `/la-firma/` | Contenido de demostración (`dotcompatterns.wordpress.com`). |
| «365» suelto al final de la home | Home | Texto residual junto al aviso de cookies, sin relación con el contenido del despacho. |
| Enlace «Colaboración Profesional» del footer | Footer | Responde 404. Se sustituye por una redirección 301 a `/la-firma/`, que sí tiene la sección de colaboración multidisciplinaria. Anotado en pendientes. |
| Aviso de cookies del alojamiento | Todas | El sitio nuevo usa Vercel Web Analytics, que no utiliza cookies, así que el aviso deja de ser necesario. Si se añaden cookies no esenciales habrá que implementar consentimiento. |
| Listas de palabras clave ocultas | Home y landings | La home tenía bloques con listas de términos («Corporate lawyer Mexico», «Business Lawyer Mexico»…) sin función informativa. Es relleno de SEO que hoy penaliza. |
| Segundo formulario de `/contacto/` | `/contacto/` | Los dos formularios se unifican en uno. Ver el inventario. |
| Token público de Mapbox del mapa embebido | `/contacto/` | No se versiona ninguna credencial. Ver pendientes. |

## 5. Reordenación sin cambio de texto

- La home pasa de listar 30 artículos seguidos (más un segundo bloque de
  Insights con 23 páginas de paginación) a mostrar **los 3 más recientes** y un
  enlace al hub. El listado completo, con filtros y paginación, vive en
  `/insights/`.
- Los diferenciadores reales del despacho (trayectoria, notaría, formación,
  visión cross-border) suben de las subpáginas a una franja en la home.
- Los datos de la Strategic Legal Session (duración, con quién, honorario
  acreditable y tiempo de respuesta) acompañan al CTA en todo el sitio. Antes
  sólo aparecían en su propia página.
- Las preguntas frecuentes y los perfiles de la sesión se convierten en
  componentes (`<dl>` y rejilla), con el mismo texto.

## 6. Lo que NO se ha tocado

- Aviso y Política de Privacidad y Condiciones de uso: sólo cambia el formato.
- Todos los nombres propios y marcas: Treu Legal & Business, Legal Intelligence
  for Business, Strategic Legal Session, Corporate Health Check™, HR Legal
  System™, Contract Architecture™, Corporate Risk & Structure System (CRSS)™,
  Business Launch Package, Cross-Border Entry Package.
- Los `title` y `description` de cada página, salvo las erratas anteriores.
- El texto de los 68 artículos, que sigue viniendo de WordPress.
