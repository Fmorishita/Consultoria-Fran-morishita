# Consultoría Fran Morishita — Landing Page

Landing page de alta conversión para los servicios de consultoría de crecimiento de Fran Morishita: páginas web, Meta Ads, escalamiento de negocios, marketing digital, inteligencia artificial, CRM y sistemas de ventas, con especialidad en Real Estate, E-commerce y Gastronomía.

## Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Estructura de todas las secciones de la landing |
| `styles.css` | Sistema de diseño (dark premium + dorado), animaciones y responsive |
| `script.js` | Animaciones de scroll, contadores, menú móvil y formulario de leads |
| `content-config.js` | Contenido por defecto del sitio + constantes de Supabase (compartido) |
| `content-loader.js` | Carga el contenido publicado desde Supabase y lo pinta en la página |
| `admin.html` / `admin.css` / `admin.js` | Panel de administración en `/admin` |
| `vercel.json` | URLs limpias en Vercel (`/admin`) |

## Panel de administración (`/admin`)

Panel protegido con login (Supabase Auth, registros públicos desactivados) para editar todo el sitio sin tocar código:

- **Edición total**: textos, títulos, botones, emojis, iconos, colores, foto de Fran, número de WhatsApp, opciones del formulario y metadatos SEO.
- **Listas dinámicas**: agregar, eliminar y reordenar servicios, dolores, pasos del método, nichos, estadísticas y preguntas del FAQ.
- **Secciones ocultables**: cada sección tiene interruptor de visibilidad.
- **Vista previa en vivo**: iframe del sitio que se actualiza al instante mientras escribes (modo escritorio y móvil).
- **Borrador vs. publicado**: los cambios se autoguardan como borrador (tabla `site_config`, fila `draft`); el sitio en vivo solo cambia al pulsar **Publicar** (fila `published`). "Descartar cambios" vuelve a la última versión publicada.
- **Leads**: tabla con todos los leads capturados, buscador y exportación a CSV.
- **Imágenes**: se suben al bucket público `sitio` de Supabase Storage.

El contenido publicado lo lee la landing al cargar (con timeout de 2.5s y fallback al contenido por defecto de `content-config.js`).

## Secciones

1. **Hero** — titular de impacto, prueba social (+$100 MDP, +10 años) y doble CTA
2. **Marquesina** — nichos y servicios en movimiento
3. **El problema** — puntos de dolor del dueño de negocio
4. **Servicios** — 6 tarjetas con efecto de luz que sigue el cursor
5. **Método** — 4 pasos: diagnóstico, estrategia, ejecución conjunta, escalamiento
6. **Nichos** — Real Estate, E-commerce y Gastronomía
7. **Sobre Fran** — credenciales y colaboraciones (Gus Marcos de MTY)
8. **Comparativa** — agencia tradicional vs. Consultoría Morishita
9. **FAQ** — objeciones frecuentes en acordeón
10. **Contacto** — formulario de captura de leads + urgencia
11. **Footer** + botón flotante de WhatsApp

## Captura de leads

Cada envío del formulario hace dos cosas:

1. **Guarda el lead en Supabase** (tabla `public.leads` del proyecto "Consultoria fran morishita") con los campos del formulario más los parámetros UTM de la URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) para saber de qué campaña vino cada lead.
2. **Abre WhatsApp** (+52 646 256 3006) con un mensaje pre-armado con los datos del prospecto.

La tabla tiene RLS activado: la clave publicable del sitio **solo puede insertar**; los leads únicamente se pueden leer desde el dashboard de Supabase (Table Editor → `leads`).

## Páginas de propuesta para clientes

Además de la landing principal, el sitio puede alojar páginas dedicadas de propuesta comercial para clientes específicos — páginas de una sola sección (`/nombrecliente.html`, servida como `/nombrecliente` gracias a `cleanUrls`), con `noindex` y sin enlace desde el nav principal, para compartir por WhatsApp/email.

**Ejemplo: `/vinedosdelmar`** — propuesta de Sistema de Crecimiento Comercial para Fincamex / Viñedos del Mar.
- `vinedosdelmar.html` / `.css` / `.js`: página autocontenida con su propio sistema de diseño (paleta crema/navy/dorado/vino, tipografía Cormorant Garamond + Inter — ver variables `:root` en el CSS).
- `docs/`: PDFs descargables enlazados desde la página (ej. `docs/Lista_Precios_Vinedos_del_Mar.pdf`). Para agregar uno nuevo, súbelo a esta carpeta con el nombre exacto que referencia el `href` del botón correspondiente.
- Sin candado por defecto (pensada para revisión rápida desde el celular); si el contenido lo amerita, se le puede agregar un candado de sesión como el usado anteriormente en esta misma página.

Para crear una página de este tipo para otro cliente, pide que se genere siguiendo el mismo patrón.

## Pendientes opcionales

- [ ] **Foto de Fran**: en la sección "Sobre Fran" de `index.html` hay un placeholder `FM`; sustitúyelo por `<img src="assets/fran.jpg" alt="Fran Morishita" />`.
- [ ] **Analítica**: agrega tu píxel de Meta y Google Analytics antes de correr pauta.

## Cómo verlo en local

No requiere build ni dependencias:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Despliegue

Es un sitio 100% estático: puede publicarse directo en **GitHub Pages**, **Netlify**, **Vercel** o cualquier hosting.
