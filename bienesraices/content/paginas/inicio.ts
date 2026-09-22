/**
 * Home. Registro editorial: la tierra y la vista mandan, el inventario
 * se muestra, y el oficio se demuestra con el proceso, no se explica.
 * Nada de jerga de agencia: el comprador no compra herramientas.
 */
export const INICIO = {
  hero: {
    antetitulo: { es: "Ensenada · Baja California", en: "Ensenada · Baja California" },
    titulo: {
      es: "Comprar en Baja\nno tiene que\ndar miedo.",
      en: "Buying in Baja\nshouldn't\nfeel risky.",
    },
    subtitulo: {
      es: "Represento terreno y residencia en Ensenada. Me hago cargo de lo que quita el sueño: título, fideicomiso, pago y posventa.",
      en: "I represent land and homes in Ensenada. I handle what keeps buyers up at night: title, bank trust, payment and after-sale.",
    },
    pie: {
      es: "Atención personal, en español e inglés, para compradores de México y California.",
      en: "Personal representation, in Spanish and English, for buyers from Mexico and California.",
    },
    firma: {
      es: "Fran Morishita, representación inmobiliaria en la costa de Baja California",
      en: "Fran Morishita, real estate representation on the Baja California coast",
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
  plaza: {
    antetitulo: { es: "La plaza", en: "The market" },
  },
  proceso: {
    antetitulo: { es: "Cómo se compra", en: "How it works" },
  },
  propiedades: {
    antetitulo: { es: "Inventario", en: "Inventory" },
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
    antetitulo: { es: "Búsqueda a la medida", en: "Private search" },
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
