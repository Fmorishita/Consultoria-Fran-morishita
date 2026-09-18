# Sistema de diseño

## Concepto rector: arquitectura jurídica

El propio sitio usa esa idea («arquitectura jurídica empresarial», «Contract
Architecture™», «arquitectura laboral») y buena parte de su audiencia
desarrolla y construye. El lenguaje visual es el del **plano arquitectónico**:
retícula precisa, trazos finos de construcción y cotas en el azul de marca.

La regla de uso es la contención: **la audacia se gasta en un solo lugar**, el
hero de la home. Todo lo demás es sobrio y disciplinado.

### El hallazgo que sostiene el concepto

La fotografía del hero es el Valle de Guadalupe, en Ensenada: **hileras de
viñedo trazadas en líneas paralelas sobre la ladera**. La retícula del plano no
es un adorno superpuesto a la marca, es una estructura que ya existe en el
paisaje real de Baja California. El hero pone los dos lado a lado —panel de
marca con la retícula a la izquierda, fotografía a la derecha— y la retícula
continúa sobre la foto para coser los dos paneles.

Separar texto y fotografía en paneles tiene además una razón técnica: garantiza
contraste AA sin tener que apagar la imagen hasta hacerla invisible, que es lo
que ocurría en la primera versión.

## Tokens de color

Parten del azul del wordmark (#0F4C81) y del gris del isotipo. Seis tokens con
rol definido, en [`tailwind.config.ts`](../tailwind.config.ts):

| Token | Hex | Rol | Contraste sobre blanco |
| --- | --- | --- | --- |
| `ink` | `#0B1B2B` | Texto principal | 15,9:1 |
| `blue` | `#0F4C81` | Marca, enlaces, botón principal | 8,9:1 |
| `blue-deep` | `#0A3558` | Fondos densos, footer, hero | 12,6:1 (texto blanco encima) |
| `slate` | `#5A6B7B` | Texto secundario (gris del isotipo) | 5,5:1 |
| `line` | `#D7DDE4` | Trazos de construcción y separadores | decorativo |
| `paper` | `#F6F8FA` | Fondo alterno de sección | — |

Todo texto cumple AA (≥ 4,5:1) y los componentes ≥ 3:1. En el footer, el blanco
al 60 % sobre `blue-deep` da 5,5:1 y al 70 %, 7,0:1.

**Clichés evitados a propósito:** azul marino con dorado de despacho
tradicional, crema con terracota, negro con acento neón.

## Tipografía

Dos familias, elegidas a propósito:

| Uso | Familia | Por qué |
| --- | --- | --- |
| Títulos e interfaz | **Archivo** (400–700, variable) | Grotesca de rasgos geométricos y caja alta ancha. Dialoga con el wordmark de TREU, que es geométrico y de tracking amplio. |
| Prosa larga | **Source Serif 4** (400–600 + cursiva, variable) | Serif de pantalla para los 68 artículos y los textos legales. Cambia el registro: sans para la estructura, serif para la lectura. |

Ninguna de las de siempre (Inter, Roboto, Montserrat, Poppins, Open Sans, Lato,
Playfair Display).

- Autohospedadas con `next/font/local`, subconjunto **latino** (cubre acentos y
  ñ: `U+0000-00FF`). 207 KB en total.
- Sólo Archivo se precarga: el elemento LCP es texto y su dependencia es esa
  fuente. Source Serif carga con `swap` cuando una página de prosa la necesita.
- `adjustFontFallback` calcula un fallback con métricas ajustadas: el CLS
  medido es 0,000.
- Cuerpo mínimo de 16 px en móvil y 18 px en artículos. Líneas de menos de
  75 caracteres (`max-width: 68ch`).

### Escala

| Paso | Tamaño | Uso |
| --- | --- | --- |
| `step--1` | 0,875 rem | Metadatos, etiquetas, microcopy |
| `step-0` | 1 rem | Cuerpo de interfaz |
| `step-1` | 1,125 rem | Entradillas y prosa de artículo |
| `step-2` | 1,25–1,5 rem | Títulos de tarjeta |
| `step-3` | 1,5–2 rem | Títulos de subsección |
| `step-4` | 1,875–2,75 rem | Títulos de sección |
| `step-5` | 2,25–4 rem | H1 |

## Iconos

Un solo set: **Lucide** (licencia ISC), trazo uniforme de 1,5. Los paths se
copian de `lucide-static` a [`components/Icon.tsx`](../components/Icon.tsx)
para no cargar una dependencia de iconos en el cliente.

Un icono con significado por área, industria y producto:

| Entrada | Icono | Por qué |
| --- | --- | --- |
| Corporate & Business Law | `building-2` | Estructura societaria |
| Compliance & Risk Prevention | `shield-check` | Prevención verificada |
| Labor & Employment Strategy | `users` | Plantilla |
| Corporate Governance & Family Business | `network` | Órganos de decisión |
| Cross-Border Advisory | `arrow-left-right` | Tránsito entre dos jurisdicciones |
| Strategic Litigation & Dispute Resolution | `split` | Caminos que se bifurcan |
| Desarrollo Inmobiliario | `land-plot` | Predio en plano |
| Construcción e Infraestructura | `hard-hat` | Obra |
| Comercio, Servicios y Manufactura | `factory` | Planta |
| Empresas Binacionales | `globe` | Operación internacional |
| Business Launch Package | `milestone` | Punto de partida |
| Corporate Health Check™ | `activity` | Diagnóstico |
| HR Legal System™ | `id-card` | Expediente laboral |
| Contract Architecture™ | `ruler` | Instrumento de trazo |
| CRSS™ | `layers` | Estructura por capas |
| Cross-Border Entry Package | `door-open` | Entrada al mercado |

Sin mazos, balanzas ni apretones de manos.

## Movimiento

**Un solo momento orquestado** y respeto a `prefers-reduced-motion`, que
desactiva toda animación y el scroll suave. Fuera de eso sólo hay transiciones
de color en `hover` y un zoom del 3 % en la miniatura del artículo. No hay
animación de aparición en cada sección.

## Imágenes

En el orden que fija el brief.

### 1. Activos propios

- Wordmark horizontal «TREU / LEGAL & BUSINESS» en azul (header) y en blanco
  (footer), recortados al contenido y servidos en WebP: 17,3 KB y 13,6 KB.
- Isotipo (la «T» con el perfil del león) en azul y blanco, como marca de agua
  al 6–15 % de opacidad y como favicon.
- El retrato en blanco y negro de `/la-firma/` se conserva **en la misma
  posición que ocupa hoy**, dentro de la sección de perfil profesional. Su
  texto alternativo no afirma la identidad de la persona: la confirmación del
  despacho está pendiente (ver [PENDIENTES-CLIENTE.md](./PENDIENTES-CLIENTE.md)).

### 2. Fotografía con licencia libre del contexto real del despacho

Dos imágenes, ambas verificadas una por una antes de usarse. Créditos completos
en [CREDITOS-IMAGENES.md](./CREDITOS-IMAGENES.md).

- **Valle de Guadalupe** (hero de la home): hileras de viñedo en retícula.
- **Conurbación Tijuana–San Diego** (Cross-Border Advisory y Empresas
  Binacionales): fotografía de la NASA desde la Estación Espacial
  Internacional, donde se lee la retícula urbana de ambas ciudades y la línea
  de la frontera. Es un plano real, no un cliché de frontera.

Descartadas a propósito: una vista aérea de Ensenada llena de vallas
publicitarias de terceros, y toda fotografía de muro fronterizo. Nada de mazos,
balanzas, apretones de manos ni rascacielos genéricos.

**Tratamiento uniforme:** monocromo frío de bajo contraste
([`scripts/images.mjs`](../scripts/images.mjs)). Es una decisión de diseño —la
fotografía acompaña, nunca compite con la retícula y la tipografía— y además
reduce el peso drásticamente al eliminar el detalle de color: el hero móvil
pesa 23,8 KB en AVIF.

Variantes responsivas en AVIF y WebP con dimensiones explícitas. Las miniaturas
de Insights (fotos con velo azul) son consistentes entre sí: se conservan con
recorte 16:9 uniforme.

### 3. Ilustración propia en SVG

- Retícula de plano (`.plan-grid`): dos degradados lineales de 1 px cada 3 rem,
  al 7 % del azul de marca.
- Curvas topográficas de la península de Baja California (`TopoLines`), al
  7–9 % de blanco, sólo en el borde del hero.
- Cotas (`Cota`): la línea con remates que mide una distancia en un plano. Se
  usa para etiquetar un dato real, nunca como adorno vacío.

## Señas del diseño genérico hecho con IA, y qué se hizo en su lugar

| Seña a evitar | Qué se hizo |
| --- | --- |
| Etiquetas en mayúsculas con tracking encima de cada título | Sólo hay antetítulo donde el sitio original ya tiene etiqueta de sección («Nuestro enfoque», «La sesión», «Estructura», «Perfil»), y en formato normal. |
| Numeraciones 01/02/03 sin secuencia | Los cuatro pilares **no** van numerados: llevan icono. Sí va numerada la estructura 15/30/15 de la sesión, que es una secuencia real. |
| Flechas → en todos los botones | Ningún botón lleva flecha. Los enlaces de sección son texto subrayado. |
| Rejillas de tarjetas idénticas con la misma sombra | Cero sombras: el límite lo marca un trazo de 1 px. Y las industrias **no** usan la rejilla de tarjetas: son cuatro, con texto largo, así que se presentan como filas editoriales anchas. Rompe la monotonía de tres rejillas iguales seguidas. |
| Animación de aparición en cada sección | Un solo momento de movimiento, con `prefers-reduced-motion` respetado. |
| Hero de cifras grandes con degradado | El hero es tipográfico y fotográfico, en dos paneles planos. Los cuatro datos de la sesión van en cuerpo pequeño, como cotas. |

## Wireframe de la home — móvil (390 px)

```
┌────────────────────────────────┐
│ [TREU]                     ☰   │  header fijo, 64 px
├────────────────────────────────┤
│▚▚ retícula ▚▚                  │
│ LEGAL                          │
│ INTELLIGENCE                   │  H1, caja alta, step-5
│ FOR BUSINESS                   │
│                                │
│ Arquitectura jurídica          │  propuesta de valor  ← elemento LCP
│ empresarial y prevención…      │
│                                │
│ ┌────────────────────────────┐ │
│ │ Agendar Strategic Legal S. │ │  CTA principal — visible sin scroll
│ └────────────────────────────┘ │     (probado a 360×640: acaba en 513 px)
│ ┌────────────────────────────┐ │
│ │ ⌗ Escribir por WhatsApp    │ │
│ └────────────────────────────┘ │
│ ────────────────────────────── │
│ DURACIÓN      CON QUIÉN        │  los 4 datos de la sesión, como cotas
│ 60 minutos    El Principal…    │
│ HONORARIO     RESPUESTA        │
│ USD $150…     Menos de 24 h…   │
├────────────────────────────────┤
│ [ fotografía Valle de Guadalupe ]  banda de 176 px
├────────────────────────────────┤
│ ✓ TRAYECTORIA                  │  franja de confianza
│ más de 18 años de experiencia… │  (hechos reales, hoy enterrados)
│ ✓ FORMACIÓN NOTARIAL           │
│ 15 años de formación notarial… │
├────────────────────────────────┤
│ ──                             │
│ Nuestro enfoque                │
│ ¿Por qué Treu Legal &          │
│ Business?                      │
│ [icono] Consultoría jurídica   │  4 pilares, sin numeración
│ [icono] Entendimiento operat.  │
│ …                              │
├────────────────────────────────┤
│ Áreas de práctica              │  6 tarjetas, 1 col. en móvil
├────────────────────────────────┤
│ Industrias que asesoramos      │  4 filas editoriales
├────────────────────────────────┤
│ Legal Products                 │  6 tarjetas
├────────────────────────────────┤
│ Qué ocurre en los 60 minutos   │  15/30/15, numerado (es secuencia)
├────────────────────────────────┤
│ Marco Polo Hernández Alvarado  │  perfil + formación
├────────────────────────────────┤
│ Insights                       │  los 3 más recientes
├────────────────────────────────┤
│ Inteligencia Legal con Visión  │  cierre que ya existe en la home
├────────────────────────────────┤
│ Strategic Legal Session   ▓▓▓  │  cierre de conversión, fondo azul
├────────────────────────────────┤
│ footer                         │
├────────────────────────────────┤
│ Sesión │ WhatsApp │ Llamar     │  barra inferior fija
└────────────────────────────────┘
```

## Wireframe de la home — escritorio (1440 px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [TREU]  La Firma  Áreas ⌄  Industrias ⌄  Legal Products  Insights       │
│                                   ☏ +52 (646) 495-02-12  [ Strategic… ] │
├─────────────────────────────────────────────┬────────────────────────────┤
│▚▚ retícula de plano ▚▚                      │                            │
│  LEGAL INTELLIGENCE                         │   fotografía               │
│  FOR BUSINESS                               │   Valle de Guadalupe       │
│                                             │   (hileras en retícula)    │
│  Arquitectura jurídica empresarial y…       │                            │
│                                             │   la retícula continúa     │
│  [ Agendar Strategic… ] [ WhatsApp ]        │   sobre la fotografía      │
│  ───────────────────────────────────        │                            │
│  DURACIÓN  CON QUIÉN  HONORARIO  RESPUESTA  │                            │
├─────────────────────────────────────────────┴────────────────────────────┤
│ ✓ TRAYECTORIA   ✓ FORMACIÓN NOTARIAL   ✓ FORMACIÓN   ✓ VISIÓN            │
├──────────────────────────────────────────────────────────────────────────┤
│ ──                                                                       │
│ Nuestro enfoque                                                          │
│ ¿Por qué Treu Legal & Business?                                          │
│ ┌──────────┬──────────┬──────────┬──────────┐                            │
│ │ ico      │ ico      │ ico      │ ico      │  4 pilares                 │
│ │ Consult. │ Entend.  │ Prevenc. │ Visión   │                            │
│ └──────────┴──────────┴──────────┴──────────┘                            │
├──────────────────────────────────────────────────────────────────────────┤
│ Áreas de práctica        ┌───────┬───────┬───────┐                       │
│                          │ 3 × 2 tarjetas, 1 px │                       │
├──────────────────────────────────────────────────────────────────────────┤
│ Industrias que asesoramos                                                │
│ ico │ Desarrollo Inmobiliario │ Estructuración legal de proyectos…        │
│ ico │ Construcción e Infraest.│ Optimización y creación de sistemas…      │
├──────────────────────────────────────────────────────────────────────────┤
│ … (Legal Products, sesión, fundador, Insights, cierre, CTA, footer)       │
└──────────────────────────────────────────────────────────────────────────┘
```

## Autocrítica de la segunda pasada

El brief pide revisar el plan y cambiar lo que se parezca al resultado genérico
que se daría para cualquier despacho. Esto es lo que se cambió, y por qué.

1. **El hero tenía la fotografía de fondo al 22 % de opacidad bajo un degradado
   denso.** Resultado: la foto era invisible. Se había elegido el Valle de
   Guadalupe precisamente porque sus hileras son una retícula, y ese argumento
   se perdía. Se rehízo en dos paneles: la foto tiene presencia real y el
   contraste del texto queda garantizado por construcción, no por un velo.

2. **Los cuatro pilares llevaban numeración 01–04.** Es una de las señas que el
   brief prohíbe explícitamente, y con razón: no son una secuencia, son un
   conjunto. Se sustituyó por un icono con significado para cada uno. La
   numeración se quedó sólo donde sí hay secuencia: los bloques de 15, 30 y 15
   minutos de la sesión.

3. **Áreas, industrias y Legal Products usaban la misma rejilla de tarjetas,
   tres veces seguidas.** Es el resultado genérico. Las industrias son sólo
   cuatro y su texto es largo, así que pasaron a filas editoriales anchas con
   el icono a la izquierda. La página gana ritmo.

4. **El bloque de cierre dejaba media pantalla vacía en escritorio**, porque la
   prosa está limitada a 68 caracteres dentro de un contenedor ancho. Se pasó a
   dos columnas: título a la izquierda, prosa a la derecha.

5. **Se escribió prosa nueva en inglés** para el cierre de las páginas de
   `/en/`, traduciendo los datos de la sesión. El brief prohíbe traducir sin
   aprobación, y `npm run verify:content` lo detectó. Se sustituyó por la frase
   de cierre que cada una de esas páginas ya publica en inglés («Schedule a
   consultation with Treu Legal & Business to…»).

6. **Dos datos de la franja de confianza eran paráfrasis**, no fragmentos
   literales («Más de 18 años de práctica jurídica de alto nivel» en lugar de
   «más de 18 años de experiencia en práctica jurídica de alto nivel»). También
   lo detectó `verify:content` una vez que se dejó de incluir el código de las
   plantillas en el corpus de fuentes válidas —incluirlo validaba
   automáticamente cualquier texto escrito a mano, que es justo lo que había
   que detectar.

7. **Se quitó un accesorio a cada página antes de darla por buena**, como pide
   el brief. En la home fue la preclarga del logotipo del header: competía por
   ancho de banda con la fuente, que es la dependencia real del LCP.
