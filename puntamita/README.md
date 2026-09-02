# Punta Mita Homes — sitio web

Sitio bilingüe (ES/EN) de captación para **Punta Mita Homes | Luxury Real Estate** — la práctica de real estate de lujo de **Jaime Valdés** ([@soyjaimevaldes](https://www.instagram.com/soyjaimevaldes)) en Punta Mita, Playa Destiladeras y Nuevo Vallarta.

Es un **proyecto autocontenido**: no depende de nada del sitio de consultoría que vive en la raíz de este repositorio. Para moverlo a su propio repo y dominio basta con copiar esta carpeta.

Sin build, sin dependencias, sin framework. HTML, CSS y JS planos.

---

## ⚠️ Antes de publicar

Cuatro cosas, todas en `js/data.js` salvo la última:

| # | Qué | Dónde | Por qué importa |
|---|---|---|---|
| 1 | **Número de WhatsApp** | `SITE.whatsapp` | Sin él se usa el link corto del perfil de IG, que **no admite mensaje pre-llenado**: el lead llega sin sus respuestas. Con el número, Jaime recibe nombre, objetivo, zona, presupuesto y tiempos en el primer mensaje. Formato: solo dígitos con lada país, p. ej. `523221234567`. |
| 2 | **Correo** | `SITE.email` | Mientras esté vacío, el enlace de correo se oculta solo (no queda roto). |
| 3 | **Fotos** | `photos: []` de cada propiedad | Hoy cada ficha muestra un degradado con la leyenda "Fotografía por cargar". Funciona y se ve intencional, pero las fotos reales son lo que más va a mover la conversión. |
| 4 | **Supabase** | `SITE.supabase` | Sin configurar, el formulario **no pierde el lead**: igual abre WhatsApp. Con Supabase además queda el histórico con UTMs para medir campañas. Ver `supabase.sql`. |

---

## Verificar con Jaime

Dos cosas se tomaron de las publicaciones de Instagram y conviene confirmarlas antes de que el sitio salga a pauta:

- **El reparto Naya / Nayama.** Las publicaciones dicen que Naya y Nayama son dos proyectos frente al mar de One Development en Playa Destiladeras, y que el conjunto son *"solo 11 residencias y 17 departamentos"*. El sitio asigna las 11 residencias a Naya y los 17 departamentos a Nayama, que es la lectura natural — pero no está confirmado cuál es cuál.
- **Las 2 residencias disponibles.** Viene del post *"Nos quedan solo 2 residencias disponibles"*. Es un dato que caduca: hay que actualizarlo o quitarlo (`remaining` en `js/data.js`).

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
| `js/data.js` | **Configuración, zonas y propiedades. El único archivo que se edita para publicar inventario.** |
| `js/app.js` | Motor bilingüe, navegación, animaciones, formato, WhatsApp, UTMs |
| `js/properties.js` | Tarjetas, catálogo, filtros y ficha de propiedad |
| `js/lead-form.js` | Calificador multi-paso, scoring y envío |
| `supabase.sql` | Tabla de leads con RLS lista para pegar en Supabase |
| `vercel.json` | URLs limpias, cabeceras de seguridad y caché |

---

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

## Verlo en local

```bash
cd puntamita
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar

Es 100% estático: Vercel, Netlify, Cloudflare Pages o GitHub Pages.

En Vercel, `vercel.json` ya trae URLs limpias (`/propiedades` en vez de `/propiedades.html`), cabeceras de seguridad y caché larga para estáticos. Si se publica en un dominio distinto a `puntamitahomes.com`, actualiza `SITE.siteUrl`, `robots.txt` y `sitemap.xml`.

Antes de correr pauta, agrega el píxel de Meta y Google Analytics. Si los agregas, hay que permitirlos en la cabecera `Content-Security-Policy` de `vercel.json`.

---

## Fuentes de los datos de mercado

Las cifras de la guía de compra (fideicomiso a 50 años renovable, costos de cierre de 5%–8%, constitución del fideicomiso de USD $1,000–$1,500, cuota anual de USD $550–$700, franja restringida de 50 km del artículo 27 constitucional) son rangos de referencia del mercado público mexicano, y así se presentan en la página. La página dice explícitamente que no son asesoría legal y que el notario emite el cálculo exacto.
