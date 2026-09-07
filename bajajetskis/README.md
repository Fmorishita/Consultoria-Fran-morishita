# Baja Jetskis — sitio web

Sitio de venta de **motos acuáticas reconstruidas** en Ensenada, Baja California.
Un solo objetivo: que el visitante abra WhatsApp con un mensaje ya escrito sobre
la unidad exacta que estaba viendo.

No hay carrito, ni checkout, ni formularios. El sitio es un catálogo persuasivo
con un único destino.

**Proyecto autocontenido**: no depende de nada del resto del repositorio. Para
moverlo a su propio repo basta con copiar esta carpeta.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verificación de producción
```

---

## Los dos archivos que se tocan para operar el sitio

| Quiero… | Archivo |
|---|---|
| Publicar, apartar o marcar como vendida una unidad | `data/inventario.ts` |
| Cambiar testimonios, datos del mecánico y cifras | `data/placeholder-content.ts` |
| Cambiar cualquier texto del sitio | `content/copy.es.ts` y `content/copy.en.ts` |
| Cambiar el número de WhatsApp | `lib/whatsapp.ts` → `WHATSAPP_E164` |

Agregar una unidad es añadir un objeto a `INVENTARIO`. Aparece sola en la
portada, en `/inventario`, en su ficha, en el `sitemap.xml` y en los datos
estructurados de Google. No se toca ningún componente.

---

## ⚠️ Antes de publicar

| # | Qué | Dónde | Por qué importa |
|---|---|---|---|
| 1 | **Verificar el enlace de WhatsApp en un celular real** | `lib/whatsapp.ts` | El formato es `52` + 10 dígitos. Si el enlace abre WhatsApp pero no encuentra el contacto, cambia la constante a `5216462563006`. Es el único lugar que hay que tocar. |
| 2 | **Testimonios reales** | `data/placeholder-content.ts` | Los cuatro que están son **inventados**, marcados en el código y con aviso visible en la página. Al poner los reales, cambia `MODO_PLACEHOLDER` a `false` y el aviso desaparece solo. |
| 3 | **Fotografía real** | `public/assets/` | Todas las imágenes son placeholders generados. Ver `public/assets/inventario/LEEME.md` para el estándar y las proporciones. |
| 4 | **Inventario real** | `data/inventario.ts` | Las seis unidades son de ejemplo, con precios y horas inventados. |
| 5 | **Datos del mecánico y del taller** | `data/placeholder-content.ts` | Nombre, años de oficio y cifras de trayectoria están marcados como PLACEHOLDER. |
| 6 | **Domicilio exacto** | `data/inventario.ts` → `NEGOCIO.direccion` | Hoy dice "Zona del Estero". Afecta al mapa y a los datos estructurados de Google. |
| 7 | **Dominio final** | `lib/routes.ts` → `SITE_URL` | De ahí salen las canónicas, el `sitemap.xml` y las imágenes de Open Graph. |
| 8 | **Píxel de Meta y Google Analytics** | `app/(es)/layout.tsx` y `app/(en)/layout.tsx` | El disparo del evento ya está hecho (ver abajo); falta cargar los scripts. |

---

## La mecánica de WhatsApp

Todo enlace de contacto del sitio pasa por `components/WhatsAppLink.tsx`, que
usa `buildWhatsAppLink()` de `lib/whatsapp.ts`. Así ninguno se publica sin
contexto, sin `rel="noopener noreferrer"` ni sin evento de analítica.

| Dónde está el usuario | Mensaje que se abre |
|---|---|
| Ficha de producto | `Hola, me interesa la Yamaha VX Cruiser HO 2019 — $11,800 USD. La vi en su sitio y quiero más información.` |
| Tarjeta del catálogo | El mismo, con los datos de esa unidad |
| Hero de la portada | `Hola, quiero información sobre las motos acuáticas que tienen disponibles.` |
| Recibimos la tuya a cuenta | `Hola, tengo una moto acuática y me interesa darla a cuenta…` |
| Opciones de pago | `Hola, quiero saber sobre opciones de pago para la {modelo}.` |
| Par de gemelas | `Hola, me interesa el par de motos acuáticas {modelo}. Quiero precio por las dos.` |
| Botón flotante | El de la unidad si hay una en pantalla; si no, el genérico |
| Sin stock / filtro vacío | `Hola, no vi la unidad que busco en su sitio. ¿Me avisan cuándo les entre algo?` |

El texto va con `encodeURIComponent`, y el signo `$` se codifica a mano a `%24`
porque `encodeURIComponent` lo deja pasar tal cual.

### Analítica

En cada clic se dispara el evento **`contact_whatsapp`** con el modelo como
parámetro, hacia `dataLayer`, `gtag` y `fbq` (`Contact` + evento personalizado).
Si los scripts no están cargados, no truena y no bloquea la navegación. Solo
falta pegar los snippets del píxel y de GA en los layouts.

---

## Identidad visual

Los tokens salen del **Manual de Identidad Visual v2.0**, no de una
interpretación. Están en `app/globals.css` con el contraste medido anotado en
cada uno.

| Token | Hex | Uso |
|---|---|---|
| `navy` | `#0B1D33` | Azul Abismo Marino · texto principal y fondos oscuros |
| `deep` | `#153254` | Azul Océano Profundo · degradados y banners |
| `gold` | `#C49A45` | Oro Costero · acento y filetes |
| `ochre` | `#8C7B65` | Arena Tostada · bordes e iconos |
| `parchment` | `#F4EEDF` | Marfil Perla · fondo editorial |
| `ink` | `#334155` | Gris Carbón Marino · cuerpo de texto |

**Tipografía:** Cinzel Decorative (display, mayúsculas sostenidas, con Georgia
de respaldo) y Montserrat (lectura, con Helvetica Neue de respaldo) — las dos
familias del manual, con la jerarquía de su tabla: H1 y H2 en display, H3 y
cuerpo en Montserrat.

### Tres decisiones que conviene conocer

1. **El oro no se usa como texto sobre fondo claro.** Medido: 2.25:1 sobre
   marfil y 2.61:1 sobre blanco — reprueba WCAG AA. Sobre azul marino da 6.51:1
   y ahí sí es color de texto. En fondo claro el oro pinta filetes y sellos, y
   nunca carga información que no esté también en un texto navy.
2. **Los pies de foto van en Gris Carbón Marino, no en Arena Tostada.** El
   manual asigna el ocre a pies de foto (§04); a 12 px eso da 3.53:1 y reprueba
   AA. El ocre se queda en bordes de icono y detalles decorativos.
3. **En la barra de navegación va el bloque tipográfico, no el medallón.** El
   manual fija 120 px como dimensión mínima digital del emblema (§02); a 40 px
   de altura el grabado del sol se empasta. El emblema completo aparece en el
   pie de página y en el favicon, siempre por encima de ese mínimo.

El logotipo se procesó con `scripts/preparar-logo.py`, que recorta el fondo
blanco exterior sin tocar el blanco interior del anillo, que sí es parte del
diseño.

---

## Verificación

```bash
npm run build && npx next start -p 3210 &
node scripts/auditar.mjs
```

Recorre las 13 páginas en un navegador real y revisa dos cosas:

1. **Todos los enlaces de WhatsApp**: número correcto, texto codificado,
   `target="_blank"` con `rel="noopener noreferrer"`, mensaje con contenido y
   contexto de producto en las fichas.
2. **El contraste realmente renderizado** de cada bloque de texto contra su
   fondo real, con el umbral WCAG AA que corresponde a su tamaño y peso.

Última corrida: **96 enlaces y 858 bloques de texto en 13 páginas, sin fallos.**

Requiere Playwright, que no es dependencia del sitio:
`npm i -D playwright` solo si vas a correr la auditoría.

---

## Estructura

```
app/
  (es)/          portada, /inventario, /inventario/[slug], /taller, /contacto
  (en)/en/       home, /inventory, /inventory/[slug], /workshop, /contact
  globals.css    tokens del manual
  sitemap.ts     las dos versiones con hreflang
components/      secciones y primitivas
  views/         una vista por página, compartida por los dos idiomas
content/         copy.es.ts y copy.en.ts (TypeScript obliga a que el inglés cubra todas las llaves)
data/            inventario.ts y placeholder-content.ts
lib/             whatsapp.ts, format.ts, routes.ts
scripts/         auditar.mjs, generar-placeholders.py, preparar-logo.py
```

Cada idioma tiene su propio layout raíz para que el `lang` del `<html>` sea
correcto en el HTML servido y no parchado en el navegador.

---

## SEO

- Metadatos por página, Open Graph y Twitter Card en los dos idiomas.
- `hreflang` recíproco entre español e inglés, con `x-default` al español.
- Schema.org: `AutoDealer` en todo el sitio, `Product` en cada ficha (con
  precio, disponibilidad, horas de motor y potencia) y `FAQPage` en la portada.
- `sitemap.xml` y `robots.txt` generados desde el inventario.
- Las unidades vendidas se quedan publicadas como historial, pero salen del
  sitemap.

Palabras clave trabajadas: *venta de motos acuáticas Ensenada*, *jetski
seminuevo Baja California*, *comprar moto acuática Tijuana*, *motos acuáticas
Mexicali*.

---

## Despliegue

Next.js 16 con App Router, TypeScript y Tailwind 4. Todas las páginas son
estáticas: `next build` genera 25 rutas prerenderizadas.

En Vercel es un **proyecto propio** con *Root Directory* = `bajajetskis`. La
raíz de este repositorio es un sitio estático distinto y no comparte build.
