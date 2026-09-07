/**
 * Mecánica de WhatsApp — el único destino del sitio.
 *
 * Cada botón de contacto abre WhatsApp con un mensaje ya escrito que incluye
 * el contexto de la unidad que la persona está viendo en ese momento. Sin esto,
 * el lead llega como "Hola" y hay que empezar la conversación de cero.
 */

/**
 * Número comercial de Baja Jetskis: 646 256 3006 (Ensenada, Baja California).
 *
 * NOTA DE FORMATO: México usa `52` + 10 dígitos en wa.me. Algunas líneas
 * migradas todavía responden solo con el `1` intermedio (`521`). Si al probar
 * en un celular real el enlace abre WhatsApp pero no encuentra el contacto,
 * cambia esta constante a '5216462563006'. Es el único lugar que hay que tocar.
 */
export const WHATSAPP_E164 = '526462563006'

/** Cómo se escribe el número en pantalla. */
export const WHATSAPP_DISPLAY = '646 256 3006'

export type Seccion =
  | 'ficha'
  | 'catalogo'
  | 'hero'
  | 'permuta'
  | 'pago'
  | 'flotante'
  | 'contacto'
  | 'taller'
  | 'par'
  | 'sin-stock'

export type WhatsAppContext = {
  marca?: string
  modelo?: string
  anio?: number
  precio?: string
  seccion?: Seccion
  lang?: 'es' | 'en'
}

/** Arma "Yamaha VX Cruiser HO 2019" a partir de lo que haya. */
function describirUnidad(ctx: WhatsAppContext): string {
  return [ctx.marca, ctx.modelo, ctx.anio].filter(Boolean).join(' ').trim()
}

const MENSAJES_ES: Record<Seccion, (u: string, ctx: WhatsAppContext) => string> = {
  ficha: (u, c) =>
    `Hola, me interesa la ${u}${c.precio ? ` — ${c.precio}` : ''}. La vi en su sitio y quiero más información.`,
  catalogo: (u, c) =>
    `Hola, me interesa la ${u}${c.precio ? ` — ${c.precio}` : ''}. La vi en su sitio y quiero más información.`,
  hero: () => 'Hola, quiero información sobre las motos acuáticas que tienen disponibles.',
  permuta: () =>
    'Hola, tengo una moto acuática y me interesa darla a cuenta. Quiero saber cómo funciona.',
  pago: (u) =>
    u
      ? `Hola, quiero saber sobre opciones de pago para la ${u}.`
      : 'Hola, quiero saber sobre opciones de pago y apartado.',
  par: (u) =>
    u
      ? `Hola, me interesa el par de motos acuáticas ${u}. Quiero precio por las dos.`
      : 'Hola, me interesan dos motos acuáticas. Quiero precio por el par.',
  taller: () =>
    'Hola, quiero saber cómo reconstruyen las unidades y qué incluye la garantía.',
  contacto: () => 'Hola, quiero información sobre las motos acuáticas que tienen disponibles.',
  flotante: (u, c) =>
    u
      ? `Hola, me interesa la ${u}${c.precio ? ` — ${c.precio}` : ''}. La vi en su sitio y quiero más información.`
      : 'Hola, quiero información sobre las motos acuáticas que tienen disponibles.',
  'sin-stock': () =>
    'Hola, no vi la unidad que busco en su sitio. ¿Me avisan cuándo les entre algo así?',
}

const MENSAJES_EN: Record<Seccion, (u: string, ctx: WhatsAppContext) => string> = {
  ficha: (u, c) =>
    `Hi, I'm interested in the ${u}${c.precio ? ` — ${c.precio}` : ''}. I saw it on your site and I'd like more information.`,
  catalogo: (u, c) =>
    `Hi, I'm interested in the ${u}${c.precio ? ` — ${c.precio}` : ''}. I saw it on your site and I'd like more information.`,
  hero: () => "Hi, I'd like information about the personal watercraft you have available.",
  permuta: () => 'Hi, I have a personal watercraft and I want to trade it in. How does it work?',
  pago: (u) =>
    u
      ? `Hi, I'd like to know about payment options for the ${u}.`
      : "Hi, I'd like to know about payment and deposit options.",
  par: (u) =>
    u
      ? `Hi, I'm interested in the pair of ${u} skis. Can you quote me for both?`
      : "Hi, I'm interested in two units. Can you quote me for the pair?",
  taller: () => 'Hi, I want to know how you rebuild the units and what the warranty covers.',
  contacto: () => "Hi, I'd like information about the personal watercraft you have available.",
  flotante: (u, c) =>
    u
      ? `Hi, I'm interested in the ${u}${c.precio ? ` — ${c.precio}` : ''}. I saw it on your site and I'd like more information.`
      : "Hi, I'd like information about the personal watercraft you have available.",
  'sin-stock': () =>
    "Hi, I didn't see the unit I'm looking for on your site. Can you let me know when something like it comes in?",
}

/** El texto que va a llegar a WhatsApp, sin codificar. */
export function buildWhatsAppMessage(ctx: WhatsAppContext = {}): string {
  const tabla = ctx.lang === 'en' ? MENSAJES_EN : MENSAJES_ES
  const seccion = ctx.seccion ?? 'hero'
  const unidad = describirUnidad(ctx)
  const plantilla = tabla[seccion] ?? tabla.hero
  return plantilla(unidad, ctx)
}

/**
 * Enlace listo para usar. `encodeURIComponent` es obligatorio: los acentos,
 * las comas, el guion largo y el signo `$` rompen el enlace si van en crudo.
 */
export function buildWhatsAppLink(ctx: WhatsAppContext = {}): string {
  const texto = buildWhatsAppMessage(ctx)
  // `encodeURIComponent` deja pasar el signo de pesos tal cual; se codifica a
  // mano para que el precio pueda ir con `$` sin arriesgar el enlace.
  const codificado = encodeURIComponent(texto).replace(/\$/g, '%24')
  return `https://wa.me/${WHATSAPP_E164}?text=${codificado}`
}

type Ventana = Window & {
  fbq?: (...args: unknown[]) => void
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
}

/**
 * Disparo de evento en cada clic. Queda preparado para el píxel de Meta y para
 * Google Analytics: si no están cargados, no truena ni bloquea la navegación.
 * Nombre de evento acordado: `contact_whatsapp`.
 */
export function trackWhatsAppClick(ctx: WhatsAppContext = {}): void {
  if (typeof window === 'undefined') return

  const payload = {
    modelo: [ctx.marca, ctx.modelo].filter(Boolean).join(' ') || 'sin-modelo',
    anio: ctx.anio ?? null,
    precio: ctx.precio ?? null,
    seccion: ctx.seccion ?? 'hero',
    idioma: ctx.lang ?? 'es',
  }

  const w = window as Ventana

  try {
    w.dataLayer?.push({ event: 'contact_whatsapp', ...payload })
    w.gtag?.('event', 'contact_whatsapp', payload)
    // En Meta, Contact es el evento estándar; el custom conserva el modelo.
    w.fbq?.('track', 'Contact', payload)
    w.fbq?.('trackCustom', 'contact_whatsapp', payload)
  } catch {
    // La analítica nunca puede impedir que el usuario llegue a WhatsApp.
  }
}
