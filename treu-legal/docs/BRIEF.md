# Brief maestro para Claude Code — Rediseño de treulegal.solutions

Eres el equipo completo de este proyecto: director de diseño, especialista en UX y conversión (CRO) para servicios profesionales B2B, e ingeniero front-end senior. Lee este documento completo antes de actuar; es tu fuente de instrucciones durante todo el proyecto.

---

## 0. Modo de trabajo

- Trabaja por fases (sección 6). Al cerrar cada una, actualiza `docs/PROGRESO.md`: qué hiciste, qué decidiste y por qué, qué sigue y qué dudas quedan abiertas. Debe bastar para retomar en una sesión nueva después de `/clear`.
- En la Fase 0 crea `CLAUDE.md` en la raíz con las reglas no negociables (sección 2), la decisión técnica (sección 5), los comandos del proyecto y la ruta a este brief, para que se carguen en cada sesión.
- Hay dos puntos de control marcados con ⛔. Ahí te detienes, presentas lo pedido y esperas mi aprobación. Fuera de ellos, avanza con autonomía y criterio.
- Usa subagentes para lo paralelizable: extracción de páginas y artículos, benchmark y QA.
- Haz commits pequeños y descriptivos al cerrar cada bloque de trabajo.
- Si tienes disponible una skill de diseño front-end (por ejemplo `frontend-design`), úsala en las fases 1 y 2.

## 1. Objetivo

Convertir treulegal.solutions en el sitio de firma jurídica corporativa con mejor diseño, experiencia móvil y conversión de su mercado, por encima de las firmas de referencia de Estados Unidos y México, usando exclusivamente la información que ya existe en el sitio actual.

**Prueba de éxito:** un director general, socio o CFO que llega desde su celular entiende en menos de 5 segundos qué hace Treu, para qué empresas y cuál es el siguiente paso (la Strategic Legal Session), y puede iniciarlo en dos toques o menos desde cualquier página.

**Nivel esperado:** el de un estudio de diseño premium. Debe sentirse hecho a la medida para Treu, no una plantilla de despacho.

## 2. Reglas no negociables

1. **Cero invención.** Todo hecho, cifra, nombre, credencial, servicio, precio, plazo, ubicación o afirmación sale del sitio actual. Si no está en el sitio, no existe. Prohibido agregar testimonios, reseñas, estadísticas, logos de clientes, casos de éxito, premios, año de fundación, garantías, "consulta gratuita", conteos de clientes o urgencia artificial.
2. **Lo que sí puedes hacer con el texto:** reordenar, jerarquizar, dividir párrafos, convertir listas en componentes, pasar las MAYÚSCULAS sostenidas a formato normal y corregir erratas evidentes (cada corrección se registra en `docs/CAMBIOS-DE-CONTENIDO.md`). Si necesitas un texto más corto para una tarjeta o un extracto, usa un fragmento literal del original, no una paráfrasis. El texto completo debe seguir disponible en su página de detalle.
3. **Copy nuevo:** solo microcopy neutro de interfaz ("Menú", "Enviar solicitud", "Llamar", "Escribir por WhatsApp", "Leer artículo", "Ver todos"…). Todo vive en `content/microcopy.ts` para revisarlo en bloque. Trato de usted, como el resto del sitio. Si crees que un texto existente podría estar mejor escrito, no lo cambies: propón la alternativa en `docs/PROPUESTAS-COPY.md` para que el despacho decida.
4. **Nombres propios y marcas tal cual:** Treu Legal & Business, Legal Intelligence for Business, Strategic Legal Session, Corporate Health Check™, HR Legal System™, Contract Architecture™, Corporate Risk & Structure System (CRSS)™, Business Launch Package, Cross-Border Entry Package, etc.
5. **Lo que falta no se simula.** Si un sitio de primer nivel tendría algo que Treu no ha proporcionado (testimonios, fotos del equipo, dirección completa, horario…), el diseño debe verse completo sin ello y la carencia se anota en `docs/PENDIENTES-CLIENTE.md` (qué falta, por qué mejora la conversión y formato sugerido). Nada de placeholders visibles.
6. **Sin logos de terceros** (universidades, instituciones, empresas): sugieren afiliación. Las credenciales se muestran como texto.
7. **Textos legales intactos** (Aviso de Privacidad, Condiciones de uso): solo cambia su formato.
8. **Producción es de solo lectura.** No toques el dominio, el DNS ni el WordPress actual. Solo despliegas previews.

## 3. Contexto (verificado el 18 de septiembre de 2026; confírmalo en la Fase 0)

**La firma.** Treu Legal & Business es una firma boutique de arquitectura jurídica empresarial con sede en Ensenada, B.C. Tagline: Legal Intelligence for Business. Fundador y Principal Counsel: Marco Polo Hernández Alvarado. Según /la-firma/: más de 18 años de práctica, 15 de ellos en la Notaría Pública No. 1 de Ensenada, y formación en UABC, ESADE, Duke University y la OMPI, entre otras (extrae la lista completa).

**Audiencia, según su propio contenido:** dueños, directores y socios de empresas en Baja California y México; empresas familiares; desarrolladoras y constructoras; empresas extranjeras que operan o quieren operar en México.

**Conversión principal: la Strategic Legal Session** (/strategic-legal-session/). Según el sitio: 60 minutos con el fundador, presencial en Ensenada o por videoconferencia, honorario de USD $150 acreditable al 100% si se contrata el proyecto dentro de los 30 días siguientes, y respuesta en menos de 24 horas hábiles. La página incluye la estructura de la sesión (bloques de 15, 30 y 15 minutos), los perfiles para quienes está pensada y preguntas frecuentes. Hoy la home no explica nada de esto.

**Contenido actual: 38 páginas y 68 artículos.**
- 6 áreas de práctica: Corporate & Business Law; Compliance & Risk Prevention; Labor & Employment Strategy; Corporate Governance & Family Business; Cross-Border Advisory; Strategic Litigation & Dispute Resolution.
- 4 industrias: Desarrollo Inmobiliario; Construcción e Infraestructura; Comercio, Servicios y Manufactura; Empresas Binacionales.
- 6 Legal Products, sin precios publicados (no los inventes).
- Insights: 68 artículos del fundador, publicados varias veces por semana, en 9 categorías con contenido, más 5 guías y checklists bajo /insights/.
- 5 páginas en inglés bajo /en/ y 2 landings SEO en español (/corporate-lawyer-baja-california/ y /corporate-compliance-mexico/).
- La Firma, Contacto, Aviso de Privacidad (/privacidad/) y Condiciones de uso (/condiciones-de-uso/).

**Contacto** (fuente única en `content/facts.ts`): info@treulegal.solutions; teléfono +52 (646) 495-02-12 (el que aparece en todo el sitio); WhatsApp +52 646 185 8483 (hoy solo aparece en /strategic-legal-session/); página de LinkedIn de la empresa; ubicación en Google Maps (31.879155, -116.60361). Confírmame en el punto de control 1 qué número va en cada botón.

**Marca.** Wordmark "TREU / LEGAL & BUSINESS" en azul #0F4C81 con tracking amplio; isotipo: una "T" gris con el perfil de un león. Existen versiones azul y blanca del logo; descarga la mejor resolución disponible.

**Stack actual.** WordPress.com + Elementor + tema StartAce. REST API pública: https://treulegal.solutions/wp-json/wp/v2/ (pages, posts, categories, media, users).

## 4. Diagnóstico del sitio actual (todo debe quedar resuelto)

- **Home sobrecargada:** lista 30 artículos seguidos y después repite otro bloque de Insights con paginación de 23 páginas.
- **Residuos de plantilla que parecen clientes:** un bloque con 5 logos de demostración del tema StartAce (servidos desde s0.wp.com); una imagen de demostración de patrones de WordPress.com en /la-firma/; un "365" suelto al final de la home (verifica su origen). Elimínalos.
- **CTA incoherente:** un botón "Strategic Legal Session" lleva a /contacto/ y otro a /strategic-legal-session/. Contacto contiene dos formularios diferentes en su código, con campos y opciones distintos.
- **Canales escondidos o rotos:** WhatsApp aparece en una sola página; el enlace tel: general no lleva "+" (tel:526464950212); el enlace a Colaboración Profesional del footer da 404 (retíralo del sitio nuevo y anótalo en pendientes).
- **Formulario difícil en móvil:** el selector del área principal del asunto usa encabezados como opciones seleccionables y sangrías hechas con espacios.
- **SEO técnico:** áreas de práctica, industrias y Legal Products sin H1; H1 duplicado en /strategic-legal-session/ y en /corporate-lawyer-baja-california/; hreflang incompleto (las páginas internas revisadas no lo tienen); la og:description de la home mezcla "por" dentro de una frase en inglés; la home en inglés (/en/legal-intelligence-for-business-corporate-lawyer-in-mexico-english/) muestra texto en español.
- **Nombres inconsistentes:** Strategic Litigation & Dispute Resolution en el menú y en su página, pero Litigation Strategy & Corporate Disputes en la tarjeta de la home. Unifica con el nombre de la página y regístralo.
- **Erratas** (hay más; búscalas en todo el sitio): "Construción", "operara" por "operar", "son especialización" por "con especialización".
- **Accesibilidad:** imágenes sin alt (todas las de /la-firma/ y /contacto/); títulos en mayúsculas sostenidas.
- **Rendimiento:** la home tiene 53 imágenes, 17 scripts y 10 hojas de estilo, e incluye un PNG de 1.6 MB.
- **Imágenes genéricas:** rascacielos de cristal y oficinas de stock que no representan Baja California. Las miniaturas de Insights (fotos de stock con velo azul) sí son consistentes: consérvalas con recorte y tratamiento uniformes.
- **Confianza enterrada:** los diferenciadores reales (trayectoria del fundador, la notaría, su formación, la visión cross-border México–EE.UU., respuesta en menos de 24 horas hábiles, honorario acreditable) viven escondidos en subpáginas.

## 5. Decisión técnica

- **Front-end nuevo:** Next.js (App Router, última versión estable) + TypeScript + Tailwind CSS, desplegado en Vercel. Server Components por defecto; JavaScript de cliente solo para menú móvil, formulario y filtros.
- **WordPress como CMS headless para Insights:** el fundador sigue publicando en WordPress como hoy. El sitio lee posts, categorías, autor y medios por REST API con ISR (revalidación cada ~15 minutos) y un endpoint de revalidación on-demand protegido con secreto, documentado para conectarlo después a un webhook de publicación.
- **Páginas institucionales** (home, firma, áreas, industrias, productos, sesión, contacto, landings, guías y legales): migradas a contenido estructurado y tipado en `/content`, extraído del sitio actual; cada bloque lleva un campo `source` con su URL de origen.
- **URLs:** conserva todas las rutas existentes: páginas, artículos (/AAAA/MM/DD/slug/), /category/…/, /author/…/, /insights/…/, /en/…/ y /feed/. Si alguna debe cambiar: redirección 301 y registro en `docs/REDIRECCIONES.md`.
- **Formulario:** Route Handler + validación con zod + honeypot + envío por email con Resend (u otro proveedor que yo indique) usando variables de entorno (`RESEND_API_KEY`, `CONTACT_TO`). No inventes credenciales: crea `.env.example`. Durante el preview, los envíos van a una dirección de prueba que yo te dé, nunca al despacho. Si el envío falla, el usuario ve las alternativas (WhatsApp, teléfono, correo) sin perder lo que escribió.
- **Analítica:** Vercel Web Analytics + Speed Insights (sin cookies). Eventos: `cta_click` (con la ubicación del botón), `whatsapp_click`, `tel_click`, `email_click`, `form_start`, `form_submit_success` y `form_submit_error`. GA4 o Meta Pixel solo si te doy los IDs; si se agregan cookies no esenciales, implementa consentimiento.

## 6. Fases

### Fase 0 — Setup, extracción y línea base (todavía sin diseñar)

1. Crea el proyecto, `CLAUDE.md` y `docs/PROGRESO.md`. Instala las herramientas de QA: Playwright, axe (`@axe-core/playwright`), Lighthouse CLI y un verificador de enlaces.
2. **Extracción completa** (sitemap + REST API + HTML renderizado). Por cada página guarda: texto visible limpio, metadatos (title, description, OG), encabezados, CTAs con su destino, formularios (campos, labels, placeholders, opciones, obligatoriedad, mensajes de éxito y error, texto de consentimiento), imágenes (URL, tamaño, alt, ubicación) y enlaces. Salidas: `content/_source/` (crudo) y `docs/INVENTARIO.md` (legible).
3. **Hechos** en `content/facts.ts`, cada uno con su fuente: contacto, fundador y credenciales, datos de la sesión, redes y ubicación.
4. **Línea base:** Lighthouse móvil y capturas con Playwright (390 y 1440 px) de la home, /strategic-legal-session/, un área de práctica y un artículo → `docs/LINEA-BASE.md`.
5. **Benchmark** para medir, no para copiar. Analiza con capturas la home, una página de servicio y el contacto de: en EE.UU., cooley.com, wsgr.com y fenwick.com; en México, vonwobeser.com, galicia.com.mx, ritch.com.mx y creel.mx. Si alguno bloquea el acceso, sigue con los demás. Matriz en `docs/BENCHMARK.md`: claridad de la propuesta en 5 segundos, visibilidad del siguiente paso, navegación móvil, velocidad, señales de confianza, experiencia de contenidos, bilingüismo y accesibilidad. Cierra con 5 a 8 formas concretas en que Treu les gana con su propio contenido. Las grandes firmas ganan por marca; una boutique gana por claridad, velocidad, especialización regional y acceso directo al fundador.

### Fase 1 — Estrategia, arquitectura y sistema de diseño

Diseña mobile-first: primero a 390 px; el escritorio es una expansión, no al revés.

**Recorridos que el sitio debe resolver:**
- Empresario de Baja California con un problema concreto, desde el celular, que llega por Google o LinkedIn.
- Empresa extranjera que evalúa operar en México (en inglés).
- Lector de un Insight que todavía no está listo para contratar.
- Prospecto decidido que quiere agendar ya.

**Arquitectura de información:** navegación principal de máximo 6 elementos más el botón principal; menú desplegable (mega menú en escritorio) para Áreas e Industrias; teléfono visible en el header de escritorio; menú móvil a pantalla completa con el botón principal y contacto directo; footer completo y útil. Documenta en `docs/IA.md`, incluido el mapa de relaciones área ↔ industria ↔ Legal Product ↔ categoría de Insights (solo relaciones que el sitio ya hace o que se desprenden de sus textos).

**Estrategia de CTAs:**
- **Un solo CTA principal en todo el sitio:** la Strategic Legal Session → /strategic-legal-session/. Siempre acompañado de sus datos reales clave (duración, con quién, honorario acreditable y tiempo de respuesta), porque responden justo las dudas que frenan el clic.
- **Secundarios:** WhatsApp (wa.me con un mensaje prellenado neutro), llamada (tel: en formato internacional +52…) y correo.
- **Contextuales:** en áreas e industrias, el Legal Product relacionado además de la sesión; en artículos, la sesión y artículos relacionados.
- **Móvil:** barra inferior fija con Sesión, WhatsApp y Llamar; respeta `safe-area-inset-bottom`, no tapa contenido y se oculta cuando el formulario está en pantalla.
- **Cierre de conversión** al final de cada página.
- **Un solo formulario**, que unifica los dos de Contacto: los campos del formulario de solicitud de sesión con la misma obligatoriedad de hoy, y sus mismas opciones de asunto organizadas con `<optgroup>` real o en dos pasos (área → tema); una columna; tipos de input y `autocomplete` correctos; errores en línea; casilla de consentimiento obligatoria con enlace al Aviso de Privacidad; y el mensaje de éxito que ya usa el sitio. En /strategic-legal-session/ el formulario debe alcanzarse rápido en móvil.

**Sistema de diseño, en dos pasadas.** Primero un plan (tokens + wireframes). Luego revísalo contra este brief: si alguna parte se parece al resultado genérico que darías para cualquier despacho, cámbiala y explica por qué. Solo entonces escribe código.
- **Concepto rector sugerido** (valídalo o propón uno mejor): *arquitectura jurídica*. El propio sitio usa esa idea y buena parte de su audiencia desarrolla y construye. Lenguaje de plano arquitectónico: retícula precisa, trazos finos de construcción y cotas en el azul de marca, usado con moderación (el hero y uno o dos momentos más), combinado con fotografía de Baja California. Gasta la audacia en un solo lugar; todo lo demás, sobrio y disciplinado.
- **Color:** parte del azul del logo (#0F4C81) y del gris del isotipo; define de 4 a 6 tokens con hex y rol. Contraste AA (4.5:1 en texto, 3:1 en componentes). Evita los clichés: azul marino con dorado de despacho tradicional, crema con terracota, negro con acento neón.
- **Tipografía:** una o dos familias elegidas a propósito que dialoguen con el wordmark geométrico de TREU; evita las de siempre (Inter, Roboto, Montserrat, Poppins, Open Sans, Lato, Playfair Display). Autohospedadas con `next/font`, subconjunto latino con acentos, escala tipográfica definida, líneas de menos de 75 caracteres, cuerpo mínimo de 16 px en móvil y 18 px en artículos.
- **Iconos:** un solo set SVG (Lucide o Phosphor) con trazo consistente; un icono con significado para cada área, industria y producto.
- **Evita las señas del diseño genérico hecho con IA:** etiquetas en mayúsculas con tracking encima de cada título; numeraciones 01/02/03 donde no hay secuencia (la estructura 15/30/15 de la sesión sí es una secuencia); flechas → en todos los botones; rejillas de tarjetas idénticas con la misma sombra; animación de aparición en cada sección; el hero de cifras grandes con degradado. Un solo momento de movimiento orquestado, y respeta `prefers-reduced-motion`.
- **Imágenes, en este orden:**
  1. Las propias que valgan la pena: logo (azul y blanco), isotipo y el retrato en blanco y negro de /la-firma/ (confírmame que es el fundador antes de usarlo como tal).
  2. Fotografía con licencia libre para uso comercial (Unsplash o Pexels) del contexto real del despacho: Ensenada y su puerto, Valle de Guadalupe, obra y desarrollo inmobiliario, parques industriales, la frontera Tijuana–San Diego, mesas de trabajo y documentos. Nada de mazos, balanzas, apretones de manos ni rascacielos genéricos. Si aparecen personas, que no parezcan clientes ni equipo de Treu.
  3. Ilustración o patrón SVG propio: retícula de plano, curvas topográficas de Baja California, el isotipo como marca de agua.

  Descarga y optimiza (AVIF/WebP, tamaños responsivos, `next/image`, dimensiones explícitas), escribe alt descriptivo en español y registra fuente, autor y licencia en `docs/CREDITOS-IMAGENES.md`.

**Entregable:** `docs/DISENO.md` con tokens, tipografías, wireframes ASCII de la home (móvil y escritorio), justificación y la autocrítica de la segunda pasada.

⛔ **Punto de control 1.** Preséntame INVENTARIO, BENCHMARK, IA, DISENO y el borrador de PENDIENTES-CLIENTE, junto con tus preguntas abiertas: qué número va en cada botón, el retrato, el proveedor de email y la dirección de prueba, y si las etiquetas del menú en inglés se quedan como están. Espera mi aprobación.

### Fase 2 — Piloto vertical

Construye el layout global (header, menú móvil, barra inferior y footer) y cuatro páginas: la home, /strategic-legal-session/, un área de práctica y un artículo de Insights.

**Home, orden sugerido** (ajústalo con criterio y justifícalo):
1. **Hero:** el tagline, la propuesta de valor que ya usa el sitio, el CTA principal con sus datos clave y WhatsApp como alternativa.
2. **Franja de confianza** con hechos reales: trayectoria, notaría, formación y visión cross-border México–EE.UU.
3. **¿Por qué Treu?** con los cuatro pilares que ya existen.
4. **Áreas de práctica** (6) con icono, descripción real y enlace.
5. **Industrias** (4).
6. **Legal Products** (6), presentados por lo que obtiene el cliente, sin precios.
7. **Cómo funciona la sesión:** la estructura 15/30/15, el formato, el honorario acreditable y el tiempo de respuesta.
8. **El fundador:** perfil con extractos literales y enlace a La Firma.
9. **Insights:** los 3 más recientes y acceso al hub.
10. **Cierre:** el bloque de cierre que ya existe al final de la home, con el CTA.

Revisa tú mismo con capturas de Playwright (360, 390, 768, 1024 y 1440 px) contra `docs/DISENO.md` y corrige antes de mostrarme nada. Antes de dar por buena cada página, quítale un accesorio: el elemento decorativo que menos aporte.

⛔ **Punto de control 2.** Muéstrame capturas móvil y escritorio de las 4 páginas, su Lighthouse y el preview en Vercel. Espera aprobación.

### Fase 3 — Resto del sitio

- Plantillas y todas las páginas del inventario: área de práctica, industria, Legal Product, landing SEO, guía, páginas en inglés, La Firma, Contacto y legales.
- **Hub de Insights:** filtros por categoría con conteo, búsqueda, paginación real con URL compartible, fecha y tiempo de lectura, autor con bio corta real, artículos relacionados por categoría, un CTA discreto a mitad del artículo y otro al final, índice en artículos largos y botones para compartir por LinkedIn, WhatsApp o copiar enlace. Estilos de lectura para el HTML de WordPress, previamente sanitizado.
- **Inglés:** /en/ con las páginas en inglés existentes y un hub construido solo con ese contenido; selector de idioma únicamente donde exista equivalente; hreflang correcto. No traduzcas nada sin aprobación: anótalo en pendientes.
- 404 útil (búsqueda + CTA) y confirmación clara tras enviar el formulario.

### Fase 4 — SEO técnico, rendimiento y accesibilidad

- Metadatos por página (conserva títulos y descripciones actuales, corrigiendo erratas), imágenes OG generadas con la marca, canonical, sitemap.xml, robots.txt y hreflang.
- JSON-LD solo con datos reales: `LegalService`/`Organization` (nombre, logo, email, teléfono, Ensenada B.C., geo, LinkedIn en sameAs), `Person` para el fundador, `WebSite`, `BreadcrumbList`, `BlogPosting`, `FAQPage` con las preguntas reales de la sesión y `Service` para los Legal Products.
- Un H1 por página y jerarquía de encabezados correcta.
- Rendimiento: prioridad de carga solo para la imagen LCP, fuentes precargadas con `font-display: swap`, sin librerías pesadas de animación ni carruseles, JS inicial de la home ≤ 120 KB gzip y peso total de la home en móvil ≤ 1 MB.
- Accesibilidad WCAG 2.2 AA: HTML semántico, skip link, foco visible, navegación completa con teclado, áreas táctiles de 44×44 px como mínimo, labels reales en formularios, errores anunciados con aria-live y menú móvil accesible (focus trap y cierre con Escape).

### Fase 5 — QA y entrega

- **`npm run verify:content`:** extrae el texto visible del build y verifica que cada fragmento exista en `content/_source/` (normalizando mayúsculas, espacios y comillas), en `content/microcopy.ts` o en `docs/CAMBIOS-DE-CONTENIDO.md`. Reporte en `docs/VERIFICACION-CONTENIDO.md`. Debe terminar en cero textos sin fuente.
- Playwright + axe en todas las plantillas; 0 enlaces rotos; prueba de tel:, wa.me y mailto:; envío del formulario en modo prueba; 0 errores en consola; sin scroll horizontal entre 320 y 1440 px.
- Todas las URLs del sitemap actual responden 200 o 301 en el sitio nuevo.
- Lighthouse final contra la línea base, en una tabla antes/después.
- Deploy de preview en Vercel (CLI o MCP), nunca a producción.
- **`docs/ENTREGA.md`:** resumen de cambios, capturas antes/después, tabla de Lighthouse, pasos para salir a producción (mover WordPress a un subdominio como cms., webhook de revalidación, DNS, verificación de redirecciones y Search Console) y `docs/PENDIENTES-CLIENTE.md` priorizado por impacto.

## 7. Definición de terminado

- [ ] `verify:content` en cero: ningún hecho, cifra ni testimonio inventado.
- [ ] CTA principal visible sin scroll en 360×640 y alcanzable en dos toques o menos desde cualquier página.
- [ ] WhatsApp y llamada a un toque desde cualquier página en móvil.
- [ ] Lighthouse móvil: Rendimiento ≥ 95; Accesibilidad, Buenas prácticas y SEO en 100 (home, sesión, área y artículo).
- [ ] LCP ≤ 2.0 s, CLS ≤ 0.05 y TBT ≤ 150 ms en Lighthouse móvil.
- [ ] 0 violaciones de axe y contraste AA en todo el sitio.
- [ ] Todas las URLs actuales responden 200 o 301; 0 enlaces rotos.
- [ ] Sin residuos de plantilla, sin logos de terceros y sin placeholders visibles.
- [ ] Un H1 por página; metadatos y JSON-LD válidos en la prueba de resultados enriquecidos de Google.
- [ ] Un Insight nuevo publicado en WordPress aparece solo en el sitio (ISR o revalidación).
- [ ] Documentación completa en /docs y `PENDIENTES-CLIENTE.md` listo para enviarse al despacho.

## 8. Arranque de PENDIENTES-CLIENTE (complétalo)

Lo que Treu podría aportar para superar a la competencia. Nunca se inventa:
- Sesión fotográfica profesional del fundador y de la oficina en Ensenada.
- Testimonios o casos con autorización y resguardo de confidencialidad.
- Dirección completa y horario de atención.
- Cédula profesional, colegiaciones y membresías verificables.
- Agenda y pago en línea de la Strategic Legal Session.
- Versión completa en inglés aprobada por el despacho.
- Perfil de Google Business con reseñas.
- Contenido para Colaboración Profesional, o retirar esa sección definitivamente.
