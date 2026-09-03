# Punta Mita Homes — sitio web

Sitio bilingüe (ES/EN) de captación para **Punta Mita Homes | Luxury Real Estate** — la práctica de real estate de lujo de **Jaime Valdés** ([@soyjaimevaldes](https://www.instagram.com/soyjaimevaldes), cuenta verificada, +56 mil seguidores) en Punta Mita, Playa Destiladeras y Nuevo Vallarta.

El posicionamiento del sitio es el suyo, no uno inventado: *"ayudo a familias a comprar su segunda casa"* y **biofilia** — la tesis de que una casa se elige por cómo se vive, no por cómo se ve en el render. La biofilia tiene sección propia en la home porque es su diferenciador declarado y ningún competidor de la zona lo usa.

Es un **proyecto autocontenido**: no depende de nada del sitio de consultoría que vive en la raíz de este repositorio. Para moverlo a su propio repo y dominio basta con copiar esta carpeta.

Sin build, sin dependencias, sin framework. HTML, CSS y JS planos.

---

## Identidad visual

La paleta sale del logotipo, no al revés. Los dos colores de marca son los que trae el monograma:

| Token | Valor | Uso |
|---|---|---|
| `--sea` | `#545E69` | Pizarra del logotipo |
| `--deep` | `#3E4751` | Fondo de secciones oscuras |
| `--sun` | `#2E3640` | Acción primaria (se invierte a crema sobre fondo oscuro) |
| `--foam` | `#C9BFAE` | Arena clara: acentos sobre oscuro |
| `--brass` | `#6E6252` | Arena profunda: eyebrows sobre claro |
| `--bone` | `#F7F4EF` | Fondo de página |

Todos los valores de texto están elegidos para cumplir **WCAG AA** sobre su fondo previsto; el contraste va anotado en el comentario de cada token en `css/styles.css`. Hay una auditoría automatizada que mide el contraste real renderizado — ver "Verificación" abajo.

El monograma vive en `assets/logo.png` con fondo transparente. Sobre el hero se aclara con un filtro CSS (`.brand-mark`) y recupera su color en cuanto la nav se vuelve sólida.

## ⚠️ Antes de publicar

Cuatro cosas, todas en `js/data.js` salvo la última:

| # | Qué | Dónde | Por qué importa |
|---|---|---|---|
| 1 | **Número de WhatsApp** | `SITE.whatsapp` | Sin él se usa el link corto del perfil de IG, que **no admite mensaje pre-llenado**: el lead llega sin sus respuestas. Con el número, Jaime recibe nombre, objetivo, zona, presupuesto y tiempos en el primer mensaje. Formato: solo dígitos con lada país, p. ej. `523221234567`. |
| 2 | **Correo** | `SITE.email` | Mientras esté vacío, el enlace de correo se oculta solo (no queda roto). |
| 3 | **Más fotos** | `photos: []` de cada propiedad | Hay tres fotos reales en `assets/` recuperadas de sus publicaciones (ver abajo), pero son recortes de capturas de Instagram. Los originales en alta resolución, y galerías propias por proyecto, es lo que más va a mover la conversión. El Tigre todavía no tiene ninguna. |
| 4 | **Supabase** | `SITE.supabase` | Sin configurar, el formulario **no pierde el lead**: igual abre WhatsApp. Con Supabase además queda el histórico con UTMs para medir campañas. Ver `supabase.sql`. |

---

## Fotografías

Tres imágenes salieron de sus propias publicaciones y están recortadas para quitar la interfaz de Instagram:

| Archivo | Qué es | Dónde se usa |
|---|---|---|
| `assets/destiladeras-alberca.jpg` | Alberca de borde infinito con el árbol, Playa Destiladeras. Es la foto de perfil de @puntamita.homes | Fondo del hero y fichas de Naya y Nayama |
| `assets/jaime.jpg` | Retrato de Jaime | Sección "Con quién estás hablando" |

`jaime.jpg` viene de un original en buena resolución. La captura de la sala que se usaba antes en "¿Para qué comprar una casa en Punta Mita?" se retiró: era un recorte de pantalla de baja calidad y se sustituyó por `stock-casa-abierta.jpg`.

`destiladeras-alberca.jpg` sí sigue siendo un recorte de captura, así que **conviene sustituirla por el original** en cuanto Jaime lo pase. Cada una está asignada a la zona que le corresponde según la publicación de la que salió, así que si se cambian hay que respetar esa atribución.

### Imágenes ilustrativas (`assets/stock-*.jpg`)

Ocho fotografías de Unsplash (licencia libre, uso comercial permitido) dan cuerpo a las secciones editoriales: fondos de subhero, bandas a sangre y cinco de las seis tarjetas de zona.

**No se usa ninguna en la galería de una propiedad, y no debe usarse.** Una foto en la ficha de un listado es una afirmación sobre esa propiedad concreta; en una sección editorial es solo ambiente. El pie de página lo dice explícitamente ("Algunas imágenes de zona son ilustrativas y no corresponden a una propiedad en particular").

Se sustituyen borrando el archivo y apuntando `photo:` de la zona en `js/data.js` a la imagen real.

## Verificar con Jaime

Cuatro cosas se tomaron de las publicaciones de Instagram y conviene confirmarlas antes de que el sitio salga a pauta:

- **El reparto Naya / Nayama.** Las publicaciones dicen que Naya y Nayama son dos proyectos frente al mar de One Development en Playa Destiladeras, y que el conjunto son *"solo 11 residencias y 17 departamentos"*. El sitio asigna las 11 residencias a Naya y los 17 departamentos a Nayama, que es la lectura natural — pero no está confirmado cuál es cuál.
- **Las 2 residencias disponibles.** Viene del post *"Nos quedan solo 2 residencias disponibles"*. Es un dato que caduca: hay que actualizarlo o quitarlo (`remaining` en `js/data.js`).
- **El Tigre.** La publicación lo muestra como una **casa** en obra en Nuevo Vallarta, marcada como nuevo listing. Faltan recámaras, metros, precio y fecha de entrega.
- **MAENA.** Aparece en un chaleco suyo en un post etiquetado en Punta de Mita. Parece ser otro desarrollo que representa; no se incluyó en el sitio porque no hay información suficiente. Si lo comercializa, vale la pena agregarlo.

También quedó fuera **@soyhuichol**, su otra cuenta, porque no hay contexto sobre qué es. Si tiene que ver con el negocio, se puede enlazar desde el footer.

No hay ni un precio inventado en el sitio. Los proyectos se presentan bajo el modelo **Colección Privada** (precio bajo solicitud), que es el que ya usa el perfil de Instagram con *"Request our Private Collection"*.

---

## Estructura

| Archivo | Qué hace |
|---|---|
| `index.html` | Home: hero, pilares, Destiladeras, selección, zonas, rigor, método, calificador, sobre Jaime, FAQ |
| `propiedades.html` | Catálogo con filtros (zona, tipo, recámaras, precio, orden) sincronizados con la URL |
| `propiedad.html` | Ficha individual. Lee `?id=` y se arma desde `js/data.js` |
| `zonas.html` | Guía comparativa de las seis zonas |
| `guia-compra.html` | Guía de compra: fideicomiso, costos de cierre, proceso, tierra ejidal, renta, checklist |
| `contacto.html` | Calificador a pantalla completa |
| `gracias.html` | Página de gracias, distinta según la calificación del lead (`noindex`) |
| `css/styles.css` | Sistema de diseño completo, mobile-first |
| `js/data.js` | **Configuración, zonas, propiedades y testimonios. El único archivo que se edita para publicar contenido.** |
| `js/app.js` | Motor bilingüe, navegación, animaciones, formato, WhatsApp, UTMs |
| `js/properties.js` | Tarjetas, catálogo, filtros y ficha de propiedad |
| `js/lead-form.js` | Calificador multi-paso, scoring y envío |
| `supabase.sql` | Tabla de leads con RLS lista para pegar en Supabase |
| `vercel.json` | URLs limpias, cabeceras de seguridad y caché |

---

## Testimonios

Los tres que trae el sitio son **ejemplos**, escritos para ver cómo se integra la sección. No son clientes reales, y el sitio lo dice: mientras `TESTIMONIALS_DEMO` sea `true` cada tarjeta lleva una etiqueta *Ejemplo* y bajo la rejilla aparece una nota aclarándolo.

Para publicar los reales, en `js/data.js`:

```js
const TESTIMONIALS_DEMO = false;      // apaga etiquetas y nota

const TESTIMONIALS = [
  {
    id:'t1',
    initials:'AM',                     // el avatar son las iniciales
    name:'Alejandra M.',
    place:  { es:'Monterrey, N.L.', en:'Monterrey, Mexico' },
    context:{ es:'Segunda casa · Playa Destiladeras', en:'Second home · Playa Destiladeras' },
    quote:  { es:'…', en:'…' }
  },
  // …
];
```

Puedes poner los que quieras: la rejilla es de tres columnas en escritorio y se apila sola. Si un testimonio solo existe en español, repite el texto en `en` — es preferible a dejarlo vacío.

Un apunte que vale la pena conservar: **no publiques testimonios inventados con la bandera en `false`**. Un testimonio es una afirmación sobre una persona real y sobre el servicio; presentarlo como genuino cuando no lo es engaña a quien está por gastar cientos de miles de dólares. Por eso la bandera existe.

## Movimiento

`js/motion.js` define cuatro gestos, todos con la misma curva y todos apagados por completo bajo `prefers-reduced-motion`:

1. **Titulares palabra por palabra.** Cada `display-1/2/3` se parte en palabras que suben desde detrás de su propia caja. El retraso se calcula **por línea**, no por palabra, para que cada renglón entre como una unidad en vez de como una cascada de letras. El corte se rehace al cambiar de idioma, porque el motor bilingüe reemplaza el `innerHTML`.
2. **Imágenes que se descubren.** Un barrido de `clip-path` de abajo hacia arriba mientras la imagen se asienta desde una escala ligeramente mayor.
3. **Paralaje** suave en las bandas a sangre. La imagen va a `scale(1.12)` para tener margen de recorrido; `.band` la recorta, así que no genera scroll horizontal — verificado a 320, 390 y 430 px recorriendo la página completa.
4. **Conteo** en las tres primeras cifras del hero.

El contenido que pinta el JS (fichas, zonas, testimonios, galería) se vuelve a registrar con un `rescan()`.

## Iconografía

La home cargaba demasiado texto seguido. Cada punto de los bloques *pilares*, *biofilia*, *caso de inversión* y *lo que se revisa* lleva ahora un icono de línea que sirve de ancla visual.

Los iconos son SVG en línea definidos en el diccionario `I` del generador, con trazo de 1.5 y `currentColor`, así que heredan el color del contexto: arena profunda sobre fondo claro, arena clara sobre fondo oscuro. La clase `.ico` los envuelve en un círculo de 46 px.

## Cargar propiedades reales

Todo vive en el arreglo `PROPERTIES` de `js/data.js`. Una ficha completa:

```js
{
  id:'naya',                    // único; es el ?id= de la URL
  status:'venta',               // 'venta' | 'preventa' | 'vendida'
  zone:'punta-de-mita',         // debe existir en ZONES
  type:'residencia',            // debe existir en TYPES
  featured:true,                // aparece en la home
  hot:true, isNew:true,         // etiquetas de la tarjeta

  priceOnRequest:true,          // muestra "Precio bajo solicitud"
  price:{ usd:2450000 },        // …o el precio real, y se quita priceOnRequest

  beds:3, baths:3.5,            // opcionales
  m2:305, terrace:78, lot:1400,
  parking:2, year:2019,

  units:11, remaining:2,        // para proyectos completos
  developer:'One Development',
  beach:'Playa Destiladeras',
  delivery:{ es:'Entrega inmediata', en:'Immediate delivery' },

  title:      { es:'…', en:'…' },
  headline:   { es:'…', en:'…' },   // una línea, va bajo el título en la ficha
  description:{ es:'…', en:'…' },
  amenities:  { es:['…'], en:['…'] },
  views:['ocean','golf','jungle'],

  hoa:{ usd:1450, period:'mes' },   // opcional
  roi:{ adr:1200, occupancy:64,     // opcional: calcula bruto anual y rendimiento
        note:{ es:'…', en:'…' } },

  photos:[]                     // ver abajo
}
```

Los campos que dejes fuera simplemente no se pintan. No hace falta tocar el HTML.

### Fotos

Pon los archivos en `assets/` y referencia las rutas:

```js
photos: ['assets/naya-1.jpg', 'assets/naya-2.jpg', 'assets/naya-3.jpg']
```

La primera es la de la tarjeta; la ficha usa hasta cinco en el mosaico. Sin fotos, se genera un degradado estable por `id` con la leyenda "Fotografía por cargar" — se ve intencional, no roto. Conviene exportarlas a **WebP**, máximo ~1800 px de ancho.

---

## Bilingüe

El español va en el HTML y el inglés viaja en `data-en`:

```html
<h2 data-en="Beachfront residences">Residencias frente al mar</h2>
<meta name="description" content="…" data-en-content="…">
<input placeholder="Nombre" data-en-placeholder="Name">
```

`js/app.js` intercambia el contenido al vuelo. Para traducir un atributo, se usa `data-en-<atributo>` (`placeholder`, `aria-label`, `title`, `content`, `alt`, `value`).

**Prioridad del idioma:** `?lang=es|en` en la URL → preferencia guardada → idioma del navegador. La URL manda a propósito: así una campaña en español con `?lang=es` llega en español aunque esa persona haya cambiado el idioma antes.

Los textos que genera el JS (etiquetas del catálogo, pasos del formulario) están en los objetos `L` de `js/properties.js` y `COPY` de `js/lead-form.js`.

---

## El calificador

Ocho pasos, definidos en `STEPS` dentro de `js/lead-form.js`. Cada respuesta pesa puntos (`w`) y el total define el trato que recibe el prospecto:

| Puntos | Tier | Qué pasa |
|---|---|---|
| 70 – 100 | **A** | Se abre WhatsApp con todas sus respuestas y la página de gracias dice que entra a la lista corta |
| 45 – 69 | **B** | Igual abre WhatsApp; la página de gracias promete la selección en 24 h |
| 0 – 44 | **C** | **No** abre WhatsApp. Se le manda a la guía de compra, sin llamadas |

El mayor peso lo tienen el **tiempo de compra** (hasta 30 pts), el **presupuesto** (hasta 25) y la **forma de pago** (hasta 20). Ese es el filtro: alguien que "está investigando sin fecha" y "aún por definir" el presupuesto no le consume el día a Jaime, pero tampoco se pierde — se queda en la base con su score.

Para cambiar los umbrales: `TIER_MIN_A` y `TIER_MIN_B` al inicio del archivo.

Si Supabase falla o no está configurado, el lead **igual llega a WhatsApp**. Se prioriza no perderlo.

---

## Verificación

Además de las pruebas de flujo, hay una auditoría de accesibilidad que corre en Chromium sin interfaz a **320, 390 y 430 px** sobre las siete páginas y mide, para cada nodo de texto, el contraste real ya compuesto (resolviendo transparencias contra el fondo efectivo). También detecta desbordamiento horizontal y áreas táctiles por debajo de 30 px.

Fue lo que encontró el fallo de visibilidad más grave: el panel claro del calificador vive dentro de una sección `.bg-deep`, y heredaba de ella `color:var(--bone)`, así que quedaba texto crema sobre panel crema. El texto sobre fotografía se excluye del cálculo automático (no es medible de forma fiable) y se revisa a ojo.

## Verlo en local

```bash
cd puntamita
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar

Es 100% estático: Vercel, Netlify, Cloudflare Pages o GitHub Pages.

`vercel.json` trae URLs limpias (`/propiedades` en vez de `/propiedades.html`), cabeceras de seguridad y caché larga para estáticos.

> **Ojo:** Vercel solo lee el `vercel.json` de la **raíz** del proyecto. Mientras esta carpeta viva dentro del repo de consultoría, el `puntamita/vercel.json` está **inerte** y manda el de la raíz. El sitio funciona igual — el CSP de la raíz ya permite Google Fonts y Supabase, que es todo lo que necesita — pero no recibe la caché inmutable de estáticos. Este archivo entra en vigor en cuanto la carpeta sea su propio proyecto de Vercel, que es el destino previsto.

Los enlaces internos usan la extensión `.html`, así que el sitio funciona con o sin `cleanUrls`.

El sitio apunta a **`puntamitahomes.vercel.app`**. Si cambia el dominio, hay que actualizar `SITE.siteUrl` en `js/data.js`, `robots.txt` y `sitemap.xml`.

Antes de correr pauta, agrega el píxel de Meta y Google Analytics. Si los agregas, hay que permitirlos en la cabecera `Content-Security-Policy` de `vercel.json`.

---

## Fuentes de los datos de mercado

Las cifras de la guía de compra (fideicomiso a 50 años renovable, costos de cierre de 5%–8%, constitución del fideicomiso de USD $1,000–$1,500, cuota anual de USD $550–$700, franja restringida de 50 km del artículo 27 constitucional) son rangos de referencia del mercado público mexicano, y así se presentan en la página. La página dice explícitamente que no son asesoría legal y que el notario emite el cálculo exacto.
