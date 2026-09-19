# Arquitectura de información

Diseñada mobile-first. El escritorio es una expansión, no al revés.

## Navegación principal

Seis elementos más el botón principal, como máximo:

| Elemento | Ruta | Desplegable |
| --- | --- | --- |
| La Firma | `/la-firma/` | — |
| Áreas de práctica | `/areas-de-practica/` | 6 áreas (mega menú en escritorio) |
| Industrias | `/industrias/` | 4 industrias (mega menú en escritorio) |
| Legal Products | `/legal-products/` | — |
| Insights | `/insights/` | — |
| Contacto | `/contacto/` | — |
| **Strategic Legal Session** | `/strategic-legal-session/` | Botón principal, siempre visible |

- **Escritorio:** el teléfono es visible en el header a partir de 1280 px, con
  su icono y el número completo. El botón principal aparece desde 640 px.
- **Móvil:** menú a pantalla completa con `focus trap`, cierre con Escape y
  los desplegables como `<details>`. Al final del menú, el botón principal más
  WhatsApp, llamada y correo.
- **Barra inferior fija en móvil:** Sesión · WhatsApp · Llamar. Respeta
  `safe-area-inset-bottom`, no tapa el contenido (el layout reserva su alto) y
  se oculta automáticamente cuando el formulario entra en pantalla.

## Mapa del sitio

```
/
├── la-firma/
├── areas-de-practica/
│   ├── corporate-business-law/
│   ├── compliance-risk-prevention/
│   ├── labor-employment/
│   ├── corporate-governance-family-business/
│   ├── cross-border-advisory/
│   └── strategic-litigation-dispute-resolution/
├── industrias/
│   ├── desarrollo-inmobiliario/
│   ├── construccion-infraestructura/
│   ├── comercio-servicios-manufactura/
│   └── empresas-binacionales/
├── legal-products/
│   ├── business-launch-package/
│   ├── corporate-health-check/
│   ├── hr-legal-system/
│   ├── contract-architecture/
│   ├── corporate-risk-structure-system/
│   └── cross-border-entry-package/
├── strategic-legal-session/          ← conversión principal
├── insights/                          ← hub con filtros, búsqueda y paginación
│   ├── guia-de-estructuracion-legal-para-empresas-en-crecimiento-2026/
│   ├── guia-arquitectura-contractual-inmobiliaria-mexico/
│   ├── labor-compliance-checklist-para-empresas-mexicanas-2026/
│   ├── guia-certeza-legal-nearshoring-para-empresas-mexicanas/
│   └── guia-gobierno-familiar-organos-decision-empresa/
├── AAAA/MM/DD/<slug>/                 ← 68 artículos (WordPress headless)
├── category/[…]/                      ← 9 categorías, jerárquicas
├── author/<slug>/
├── contacto/
├── corporate-lawyer-baja-california/  ← landing SEO
├── corporate-compliance-mexico/       ← landing SEO
├── en/                                ← hub en inglés
│   ├── corporate-law-mexico/
│   ├── labor-lawyer-mexico/
│   ├── construction-lawyer-mexico/
│   ├── doing-business-in-mexico-lawyer/
│   └── legal-intelligence-for-business-corporate-lawyer-in-mexico-english/
├── privacidad/
├── condiciones-de-uso/
├── feed/                              ← RSS
├── sitemap.xml
└── robots.txt
```

## Recorridos que el sitio resuelve

### 1. Empresario de Baja California con un problema concreto, desde el móvil

Llega por Google o LinkedIn a un artículo o a una landing. En el primer
pantallazo ve de qué trata; al final del artículo, el CTA con los datos de la
sesión; en todo momento, WhatsApp y llamada a un toque en la barra inferior.
Del artículo al formulario: dos toques.

### 2. Empresa extranjera que evalúa operar en México

Entra por `/en/doing-business-in-mexico-lawyer/` o
`/en/corporate-law-mexico/`. El hub `/en/` reúne las cinco páginas en inglés.
El selector de idioma aparece **sólo donde existe equivalente en español**, con
`hreflang` correcto en ambos sentidos. Desde cualquiera de ellas llega a
`/industrias/empresas-binacionales/` y al Cross-Border Entry Package.

### 3. Lector de un Insight que todavía no está listo para contratar

El artículo ofrece índice de contenidos, artículos relacionados por categoría,
autor con su bio real y botones para compartir. El CTA a media lectura es
discreto: un bloque de una línea con el filete de marca. El hub le permite
filtrar por las 9 categorías y buscar.

### 4. Prospecto decidido que quiere agendar ya

El botón principal está en el header en todas las páginas y en la barra
inferior en móvil. En `/strategic-legal-session/` la ficha de datos lleva un
enlace a `#formulario`: un toque para llegar al formulario.

## Estrategia de CTAs

- **Un solo CTA principal en todo el sitio:** la Strategic Legal Session.
  Siempre acompañado de sus cuatro datos reales (duración, con quién, honorario
  acreditable y tiempo de respuesta), porque responden justo las dudas que
  frenan el clic.
- **Secundarios:** WhatsApp (`wa.me` con mensaje prellenado neutro), llamada
  (`tel:` en formato internacional `+52…`, que el sitio actual tiene mal) y
  correo.
- **Contextuales:** en áreas e industrias, el Legal Product relacionado además
  de la sesión; en artículos, la sesión y artículos relacionados.
- **Cierre de conversión** al final de cada página, salvo en las legales.

## Relaciones área ↔ industria ↔ Legal Product

Sólo las que el sitio ya hace explícitas o se desprenden de sus textos.
Implementadas en `relations` de [`content/site.ts`](../content/site.ts).

| Área de práctica | Industrias | Legal Products |
| --- | --- | --- |
| Corporate & Business Law | Desarrollo Inmobiliario, Comercio/Servicios/Manufactura | Business Launch Package, Contract Architecture™, CRSS™ |
| Compliance & Risk Prevention | Comercio, Servicios y Manufactura | Corporate Health Check™ |
| Labor & Employment Strategy | Construcción e Infraestructura, Comercio/Servicios/Manufactura | HR Legal System™ |
| Corporate Governance & Family Business | — | CRSS™ |
| Cross-Border Advisory | Empresas Binacionales | Cross-Border Entry Package |
| Strategic Litigation & Dispute Resolution | Construcción e Infraestructura | Contract Architecture™ |

| Industria | Áreas | Legal Products |
| --- | --- | --- |
| Desarrollo Inmobiliario | Corporate & Business Law | Contract Architecture™ |
| Construcción e Infraestructura | Labor & Employment, Strategic Litigation | Contract Architecture™, HR Legal System™ |
| Comercio, Servicios y Manufactura | Labor & Employment, Compliance & Risk Prevention | HR Legal System™, Corporate Health Check™ |
| Empresas Binacionales | Cross-Border Advisory | Cross-Border Entry Package |

Las categorías de Insights se relacionan con las áreas por su propio nombre
(`corporate-law-governance`, `labor-compliance`, `real-estate-construction`,
`cross-border`, `strategic-thinking`), así que el hub filtra por ellas sin
necesidad de un mapa adicional.

## Footer

Cuatro columnas que reproducen la estructura actual con el árbol real:

- **La Firma:** La Firma, Strategic Legal Session, Insights.
- **Práctica:** Áreas de práctica (con las tres primeras), Industrias, Legal Products.
- **Contacto:** Contacto, correo, teléfono, WhatsApp, LinkedIn.
- **Legal:** Aviso de Privacidad, Condiciones de uso.

Se retira «Colaboración Profesional», cuyo enlace responde 404 en el sitio
actual; queda una redirección 301 a `/la-firma/`, que sí contiene la sección de
colaboración multidisciplinaria.
