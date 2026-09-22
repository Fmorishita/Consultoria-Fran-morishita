/**
 * Sobre mí. Habla del oficio de representar, no de las herramientas con las
 * que se consigue la demanda: eso es asunto interno y vive en /desarrolladores.
 */
export const SOBRE_MI = {
  antetitulo: { es: "Sobre mí", en: "About" },
  titulo: {
    es: "Represento tierra,\nno listados.",
    en: "I represent land,\nnot listings.",
  },
  parrafos: [
    {
      es: "Soy Fran Morishita. Vivo en Ensenada y represento propiedad en esta costa: lotes con vista al Pacífico, residencia y desarrollos en preventa. Trabajo con pocos inventarios a la vez, porque vender bien un desarrollo exige conocerlo lote por lote.",
      en: "I'm Fran Morishita. I live in Ensenada and represent property along this coast: Pacific-view lots, homes and pre-sale developments. I take on few inventories at a time, because selling a development well means knowing it lot by lot.",
    },
    {
      es: "Atiendo a compradores de los dos lados de la frontera, en español y en inglés. Buena parte de ellos compra desde California y necesita algo más que fotografías: quiere saber cómo se escritura, qué implica un fideicomiso y quién responde el teléfono cuando ya firmó.",
      en: "I work with buyers on both sides of the border, in Spanish and English. Many of them buy from California and need more than photographs: they want to know how title works, what a bank trust involves, and who answers the phone after they've signed.",
    },
    {
      es: "Del otro lado trabajo con quien construye. He dirigido la comercialización de desarrollos completos, con responsabilidad sobre el ritmo de colocación y no solo sobre la publicidad. Ese trabajo está documentado en el portafolio.",
      en: "On the other side I work with the people who build. I've directed the sales operation of entire developments, accountable for the pace of placement and not just for advertising. That work is documented in the portfolio.",
    },
  ],
  principios: {
    titulo: { es: "Cómo trabajo", en: "How I work" },
    items: [
      {
        icono: "exclusividad",
        titulo: { es: "Pocos inventarios a la vez", en: "Few inventories at a time" },
        texto: {
          es: "No listo todo lo que se me ofrece. Si represento un desarrollo, lo conozco lote por lote y sé cuál te conviene y cuál no.",
          en: "I don't list everything I'm offered. If I represent a development, I know it lot by lot, and I know which one suits you and which one doesn't.",
        },
      },
      {
        icono: "conversacion",
        titulo: { es: "Contesto yo", en: "You get me" },
        texto: {
          es: "La conversación no pasa por un centro de atención ni por un asistente. Quien te muestra la propiedad es quien te acompaña a la notaría.",
          en: "The conversation never routes through a call center or an assistant. Whoever shows you the property is whoever walks you to the notary.",
        },
      },
      {
        icono: "numeros",
        titulo: { es: "Los números, completos", en: "The numbers, in full" },
        texto: {
          es: "Precio, enganche, plazo, gastos de escrituración y mantenimiento. Prefiero perder una venta a que alguien descubra un costo después de firmar.",
          en: "Price, down payment, term, closing costs and dues. I'd rather lose a sale than have someone discover a cost after signing.",
        },
      },
      {
        icono: "bilingue",
        titulo: { es: "Español e inglés", en: "Spanish and English" },
        texto: {
          es: "Contrato, fideicomiso y trato con notaría explicados en el idioma en el que tomas decisiones de dinero.",
          en: "Contract, bank trust and notary process explained in the language you actually make money decisions in.",
        },
      },
    ],
  },
  cierre: {
    titulo: { es: "Empecemos por la conversación", en: "Let's start with a conversation" },
    texto: {
      es: "Media hora basta para saber si lo que represento es lo que buscas. Si no lo es, te lo digo y te ahorro el recorrido.",
      en: "Half an hour is enough to know whether what I represent is what you're after. If it isn't, I'll say so and spare you the tour.",
    },
  },
  seo: {
    title: { es: "Sobre Fran Morishita · Bienes raíces en Ensenada", en: "About Fran Morishita · Real estate in Ensenada" },
    description: {
      es: "Representación inmobiliaria en la costa de Ensenada, Baja California, para compradores de México y California.",
      en: "Real estate representation on the Ensenada coast, Baja California, for buyers from Mexico and California.",
    },
  },
} as const;
