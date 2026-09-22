/**
 * Home. Registro editorial: primero lo que el comprador necesita resolver,
 * luego el inventario con precios, y al final a quién le toca qué. El paso a
 * paso de la compra vive en cada ficha. Nada de jerga de agencia: el
 * comprador no compra herramientas.
 */
export const INICIO = {
  hero: {
    antetitulo: { es: "Ensenada · Baja California", en: "Ensenada · Baja California" },
    titulo: {
      es: "Comprar en Baja,\ncon todo\na la vista.",
      en: "Buying in Baja,\nwith everything\nin plain sight.",
    },
    subtitulo: {
      es: "Represento terreno y residencia en Ensenada. Precios publicados, proceso explicado y la misma persona contigo hasta la escritura.",
      en: "I represent land and homes in Ensenada. Published prices, an explained process, and the same person with you through closing.",
    },
    pie: {
      es: "Atención personal, en español e inglés, para compradores de México y California.",
      en: "Personal representation, in Spanish and English, for buyers from Mexico and California.",
    },
    firma: {
      es: "Fran Morishita, representación inmobiliaria en la costa de Baja California",
      en: "Fran Morishita, real estate representation on the Baja California coast",
    },
    /** Las cifras se calculan del inventario publicado; aquí solo van sus rótulos. */
    franja: {
      desarrollos: { es: "desarrollos en representación", en: "developments represented" },
      desde: { es: "precio de entrada en el portafolio", en: "entry price across the book" },
      sinInteres: { es: "de interés en el pago directo de {nombre}", en: "interest on the {nombre} direct plan" },
    },
  },
  destacado: {
    antetitulo: { es: "Del portafolio", en: "From the book" },
    titulo: { es: "Alta Tierra", en: "Alta Tierra" },
    texto: {
      es: "Uno de los desarrollos que represento hoy: fraccionamiento cerrado sobre la ladera de Playitas, con la franja de lotes que mira al océano ya urbanizada. La primera fila es finita y se coloca antes que el resto.",
      en: "One of the developments I represent today: a gated community on the Playitas hillside, with its ocean-facing row of lots already serviced. The front row is finite, and it sells before everything behind it.",
    },
  },
  propiedades: {
    titulo: { es: "El resto del portafolio", en: "The rest of the book" },
    texto: {
      es: "Terreno, residencia y preventa en Ensenada y su corredor costero. Cada ficha lleva medidas, ubicación y condiciones vigentes, revisadas conmigo antes de publicarse. Una parte no se publica nunca.",
      en: "Land, homes and pre-sale along Ensenada and its coastal corridor. Every listing carries measurements, location and current terms, reviewed with me before it goes up. Part of it never gets published at all.",
    },
  },
  prueba: {
    antetitulo: { es: "Respaldo", en: "Track record" },
    titulo: { es: "Quien ya me confió su inventario", en: "Who has trusted me with their inventory" },
    texto: {
      es: "La comercialización de un desarrollo se juzga por una sola cosa: cuánto se colocó y en cuánto tiempo. Esto es lo que dice quien ya lo vivió.",
      en: "A development's sales operation is judged on one thing: how much was placed and how fast. Here is what someone who lived it has to say.",
    },
  },
  captura: {
    titulo: { es: "¿Buscas algo que todavía no está en esta página?", en: "Looking for something that isn't on this page yet?" },
    texto: {
      es: "Parte de lo que represento no se publica. Dime zona, superficie y horizonte de inversión, y te escribo cuando entre algo que encaje, antes de que salga al mercado.",
      en: "Part of what I represent never gets published. Tell me the area, the size and your investment horizon, and I'll write to you when something fits, before it reaches the market.",
    },
  },
  cierre: {
    titulo: { es: "La visita cambia la decisión", en: "The visit changes the decision" },
    texto: {
      es: "Ninguna fotografía resuelve dónde pega el sol a las seis de la tarde ni cuánto océano se ve desde un segundo nivel. Agenda una visita y lo revisamos lote por lote.",
      en: "No photograph settles where the light falls at six in the evening or how much ocean you see from a second floor. Book a visit and we'll walk it lot by lot.",
    },
  },
} as const;
