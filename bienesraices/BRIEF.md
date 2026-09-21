# Prompt maestro para Claude Code — Sitio web "Fran Morishita · Bienes Raíces"

> **Cómo usarlo:** crea una carpeta vacía, abre Claude Code dentro, corre `/init` y pega
> este documento completo como primer mensaje. Claude Code debe leerlo entero, hacerte las
> preguntas marcadas como `[CONFIRMAR]` y **entregarte un plan antes de escribir código**.
> Guarda este archivo en la raíz del repo como `BRIEF.md` para poder referenciarlo después.

---

## 0. Antes de escribir una sola línea

Lee este documento completo. Después:

1. Genera un `CLAUDE.md` en la raíz con: stack, convenciones, estructura de carpetas y la
   regla de que **todo el contenido comercial vive en archivos de datos, nunca hardcodeado
   en componentes**.
2. Entrégame un plan por fases (máx. 1 pantalla) y espera mi "va" antes de construir.
3. Lista en un solo bloque todos los `[CONFIRMAR]` que necesitas de mí.
4. No inventes cifras, precios, testimonios ni nombres de clientes. Si falta un dato, usa
   el placeholder literal `[CONFIRMAR: descripción]` y sigue. **El build no se considera
   terminado si queda un `[CONFIRMAR]` en producción** — deben quedar todos listados al final.

---

## 1. Contexto del negocio

Soy **Fran Morishita**, consultor de marketing y dirección comercial especializado en bienes
raíces, con base en Ensenada, Baja California. Opero en dos frentes:

- **Venta de propiedades** (casas, lotes, preventa) como canal de venta digital propio.
- **Dirección estratégica de marketing** para desarrolladores inmobiliarios.

Mi diferenciador no es "conozco el mercado": es que **traigo la demanda**. Genero leads con
Meta Ads, los califico con IA y CRM, y cierro por videollamada. Ya dirigí la comercialización
de desarrollos completos.

**Prueba social principal:** mi socio Gus Marcos, desarrollador en San Pedro Garza García,
Nuevo León. Tengo video suyo validando que generamos **más de 70 millones de pesos en ventas
en 2 años**. Ese video es el activo más importante del sitio y debe ir arriba, no escondido.

**Primer proyecto a promover:** Alta Tierra, desarrollo residencial de lotes en Ensenada.

---

## 2. El único trabajo del sitio

Convertir tráfico pagado (Meta Ads, Google) en **conversaciones de WhatsApp calificadas** y,
en segundo plano, en **llamadas de descubrimiento con desarrolladores**.

Todo lo demás —portafolio, historia, diseño— existe para reducir la fricción de esos dos
eventos. Si un elemento no acerca al visitante a uno de esos dos botones, no va.

Métrica de éxito: tasa de visita → conversación iniciada. Objetivo de diseño: **LCP < 2.5s en
4G**, porque el costo por lead sube con cada segundo de carga.

---

## 3. Stack

- **Next.js 15+ (App Router) + TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** para primitivas (no para el look — ver §8)
- **next/image** para todo activo visual, con `priority` solo en el hero
- Deploy en **Vercel**
- Sin base de datos en v1. El contenido vive en archivos versionados.
- Formularios: server actions + envío a webhook (ver §7)

No agregues dependencias fuera de esta lista sin proponérmelo primero y justificar por qué.

---

## 4. Rutas

| Ruta | Propósito |
|---|---|
| `/` | Home de marca personal. Posicionamiento + video Gus Marcos + track record + proyectos + CTA |
| `/proyectos` | Índice de propiedades y desarrollos que promuevo |
| `/proyectos/[slug]` | **Landing de venta por proyecto.** Plantilla reutilizable. El primero: `alta-tierra` |
| `/portafolio` | Casos de dirección comercial y marketing (para desarrolladores) |
| `/portafolio/[slug]` | Caso a detalle: reto, sistema implementado, resultado |
| `/desarrolladores` | Oferta de servicio B2B: dirección comercial y sistemas de venta |
| `/sobre-mi` | Historia, credenciales, por qué bienes raíces |
| `/contacto` | Formulario + WhatsApp + calendario |
| `/gracias` | Página de conversión (dispara eventos de píxel). Con variante por origen |
| `/aviso-de-privacidad` | Obligatorio en México para captar datos |

**Bilingüe ES/EN** desde el día uno con segmento `[locale]`: `/es/...` y `/en/...`, default
`es`, y `hreflang` correcto. Hay compradores binacionales en San Diego y el inglés no es
opcional para ese mercado. El contenido en inglés no se traduce automático: cada archivo de
datos tiene campos `es` y `en`.

---

## 5. Sistema de contenido (la parte más importante)

El sitio debe ser una **máquina de aterrizar proyectos nuevos**. Quiero publicar un desarrollo
nuevo editando un archivo y subiendo fotos, sin tocar componentes.

Crea `content/proyectos/<slug>.ts` (tipado, validado con Zod) con esta forma:

```ts
type Proyecto = {
  slug: string;
  activo: boolean;                 // si false, no se lista ni indexa
  nombre: string;
  desarrollador?: string;
  ciudad: string;
  tipo: 'lotes' | 'casas' | 'departamentos' | 'preventa' | 'comercial';
  estado: 'preventa' | 'entrega-inmediata' | 'en-construccion';
  hero: { imagen: string; video?: string; titulo: I18n; subtitulo: I18n };
  pitch: I18n;                     // 2-3 párrafos
  ubicacion: {
    direccion: string;
    coords: [number, number];
    tiemposClave: { destino: I18n; minutos: number }[]; // "15 min al Valle de Guadalupe"
  };
  amenidades: { icono: string; texto: I18n }[];
  inventario: {
    etiqueta: I18n;                // "Lotes residenciales"
    superficieMin?: number;
    superficieMax?: number;
    precioDesde?: number;
    moneda: 'MXN' | 'USD';
    notaLegal?: I18n;              // "Precios sujetos a cambio sin previo aviso"
  };
  financiamiento?: {
    engancheMinPct: number;
    plazosMeses: number[];
    tasaAnualPct: number;          // 0 si es sin intereses
    nota?: I18n;
  };
  galeria: { src: string; alt: I18n }[];
  faq: { p: I18n; r: I18n }[];
  whatsapp: { keyword: string; mensajePrefill: I18n };
  seo: { title: I18n; description: I18n; ogImage: string };
};
```

Misma lógica para `content/casos/<slug>.ts` (portafolio) y `content/testimonios.ts`.

La plantilla `/proyectos/[slug]` debe renderizar bien tanto un desarrollo de 300 lotes como
una sola casa en venta: secciones opcionales que desaparecen si el dato no existe.

---

## 6. Componentes clave

**`<VideoTestimonio>`** — Reproductor liviano (thumbnail + carga diferida del iframe, nunca el
player completo en el primer render). Va en el home, arriba, con el nombre y cargo de quien
habla debajo. Un solo video arriba; los demás en un carrusel más abajo.

**`<TrackRecord>`** — Tira de cifras con animación de conteo discreta. Cada cifra acepta una
nota al pie para su respaldo. Datos en `content/track-record.ts`, no hardcodeados.

**`<CalculadoraFinanciamiento>`** — Para proyectos con `financiamiento`. Entradas: precio
(o selector de lote), % de enganche, plazo. Salida: enganche en pesos/dólares y mensualidad
estimada. Usa amortización simple si `tasaAnualPct > 0`; división directa si es 0.
Debe mostrar leyenda: *"Cálculo estimado con fines informativos. No constituye una oferta de
crédito ni una cotización formal."* Al mover el slider, dispara evento `calculadora_usada`.
El CTA debajo de la calculadora manda la mensualidad calculada dentro del mensaje de WhatsApp.

**`<CtaWhatsApp>`** — Botón que arma un deep link `https://wa.me/<numero>?text=...` con:
mensaje prellenado del proyecto + keyword + UTMs capturados. Variante flotante en móvil
(que no tape contenido) y variante inline. **Es el CTA principal de todo el sitio.**

**`<FormularioLead>`** — Nombre, teléfono, email, interés (select), mensaje. Checkbox de
consentimiento de privacidad **sin premarcar**, obligatorio. Honeypot + rate limit.
Al enviar: server action → webhook → redirect a `/gracias?tipo=...`.

**`<Mapa>`** — Estático por defecto (imagen + botón "Ver en Google Maps"). Nada de cargar un
SDK de mapas en el primer render.

---

## 7. Tracking y captura (crítico para la pauta)

1. **Captura de UTMs** en el primer landing: `utm_source`, `utm_medium`, `utm_campaign`,
   `utm_content`, `utm_term`, `fbclid`, `gclid`. Guárdalos en `sessionStorage` + cookie de
   primera parte (90 días) y adjúntalos a **todo** lead y a todo mensaje de WhatsApp.
   Sin esto no sé qué anuncio vendió, y eso es todo el juego.
2. **Meta Pixel + Conversions API.** El píxel del lado del cliente y, además, un route handler
   `/api/capi` que manda el evento server-side con `event_id` compartido para deduplicar.
   Eventos: `ViewContent` (proyecto), `Lead` (formulario), `Contact` (clic WhatsApp),
   `calculadora_usada` (custom).
3. **GA4** con los mismos eventos.
4. **Webhook de leads** a una URL en variable de entorno (`LEAD_WEBHOOK_URL`) — irá a n8n /
   GoHighLevel. Payload JSON plano con todos los campos + UTMs + `proyecto_slug` + timestamp.
   Si el webhook falla, el usuario **no** ve error: guarda en log y muestra éxito igual, pero
   manda alerta a `ALERT_WEBHOOK_URL`. Un lead perdido por un 500 es dinero tirado.
5. Todas las llaves en `.env.local` con `.env.example` documentado. Ninguna llave en el repo.

---

## 8. Dirección de diseño

**Referencia mental:** marca personal premium, no plantilla de inmobiliaria. Nada de
carruseles de casas genéricas, nada de azul corporativo, nada de íconos de casita.

- **Tipografía con carácter:** una serif editorial para titulares (peso alto, tamaños grandes,
  tracking cerrado) contra una sans neutra para texto. Escala tipográfica amplia — el salto
  entre titular y cuerpo debe ser evidente.
- **Paleta:** base oscura cálida o crema profundo (tierra, arena, piedra), un acento único
  y saturado usado con avaricia. Nada de gradientes de moda.
- **Fotografía como protagonista:** imágenes a sangre, altura generosa, texto encima con
  overlay controlado. Si una foto es mala, mejor no ponerla.
- **Espacio en blanco agresivo.** Secciones que respiran. Pocas cosas por pantalla.
- **Movimiento discreto:** fade-up al entrar en viewport, nada que rebote. Respeta
  `prefers-reduced-motion`.
- **Móvil primero de verdad:** la mayoría del tráfico llegará de Instagram en celular. Diseña
  la versión de 390px primero y expande.
- Accesibilidad: contraste AA mínimo, foco visible, `alt` en todo, navegable con teclado.

Antes de construir, propón **dos direcciones visuales distintas** en una página `/styleguide`
con tipografías, paleta y un bloque de ejemplo de cada una. Elijo yo.

---

## 9. SEO y compartibilidad

- Metadata por ruta e idioma; `generateMetadata` en las dinámicas.
- **OG images dinámicas** con `@vercel/og` para cada proyecto y caso.
- JSON-LD: `Person` (home), `RealEstateListing` por proyecto, `BreadcrumbList`.
- `sitemap.ts` y `robots.ts` generados desde el contenido; los proyectos con `activo: false`
  quedan fuera y con `noindex`.
- URLs limpias en español para las rutas en español.

---

## 10. Piso legal (no negociable)

- **Aviso de privacidad** conforme a la LFPDPPP: identidad y domicilio del responsable,
  finalidades primarias y secundarias, medios para ejercer derechos ARCO, transferencias.
  Genera la estructura con `[CONFIRMAR]` en cada dato personal mío; yo lo reviso.
- Consentimiento explícito, no premarcado, antes de enviar cualquier formulario.
- Leyenda al pie de cada proyecto: *"Imágenes ilustrativas. Precios, medidas y disponibilidad
  sujetos a cambio sin previo aviso. No constituye oferta vinculante."*
- Espacio reservado en el footer para mi número de registro estatal como agente inmobiliario
  y, cuando aplique, la mención de que promuevo el desarrollo con autorización del
  desarrollador.

---

## 11. Datos que te voy a dar (déjalos como `[CONFIRMAR]` hasta que te los pase)

- Número de WhatsApp de negocio
- URL del video de Gus Marcos + su nombre completo, cargo y empresa tal como quiere aparecer
- Cifras exactas del track record y cómo respaldarlas
- Fotos y renders autorizados de Alta Tierra, y **autorización por escrito del desarrollador**
  para usar marca, renders y precios
- Precios, superficies y esquema de financiamiento vigentes de Alta Tierra
- Casos del portafolio: cuáles puedo nombrar y cuáles van anonimizados
- Dominio final, píxel de Meta, ID de GA4, URL del webhook
- Datos fiscales y domicilio para el aviso de privacidad

**No publiques información de ningún desarrollo sin que yo confirme la autorización.**

---

## 12. Cómo quiero que trabajes

- Plan primero, código después. Fases pequeñas, y me muestras resultado al cerrar cada una.
- Commits atómicos con mensajes descriptivos en español.
- Corre `npm run build` y `tsc --noEmit` antes de decirme que algo está listo. Si no compila,
  no está listo.
- Componentes chicos y con un solo propósito. Si un archivo pasa de ~200 líneas, pártelo.
- Cero `any`. Cero texto de contenido dentro de componentes.
- Cuando algo tenga dos caminos razonables, no elijas en silencio: dime los dos en una línea
  cada uno y tu recomendación.
- Si detectas que algo de este brief está mal pensado o se contradice, dímelo. Prefiero la
  corrección temprana que el rework.

## 13. Criterios de aceptación de la v1

- [ ] Home, `/proyectos/alta-tierra`, `/portafolio`, `/desarrolladores`, `/contacto` y
      `/gracias` funcionando en ES y EN
- [ ] Publicar un proyecto nuevo requiere solo crear un archivo en `content/proyectos/`
- [ ] UTMs viajan desde el clic del anuncio hasta el mensaje de WhatsApp y el webhook
- [ ] Píxel + CAPI deduplicando eventos correctamente
- [ ] Lighthouse móvil: Performance ≥ 90, Accesibilidad ≥ 95
- [ ] Ningún `[CONFIRMAR]` visible en producción
- [ ] Desplegado en Vercel con preview por rama
