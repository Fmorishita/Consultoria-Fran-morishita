import { pendienteI18n } from "@/lib/pendiente";

/**
 * Home de captación: la propiedad destacada y el inventario mandan.
 * Lo que explica cómo trabajo vive en /desarrolladores y /portafolio.
 */
export const INICIO = {
  hero: {
    antetitulo: { es: "Bienes raíces en Baja California", en: "Real estate in Baja California" },
    titulo: { es: "Lotes y casas\nen Ensenada,\nsin vueltas.", en: "Lots and homes\nin Ensenada,\nno runaround." },
    subtitulo: {
      es: "Soy Fran Morishita. Te paso precios, disponibilidad y el proceso completo por WhatsApp, el mismo día.",
      en: "I'm Fran Morishita. I send you pricing, availability and the full process over WhatsApp, the same day.",
    },
  },
  destacado: {
    titulo: { es: "En preventa ahora", en: "In pre-sale now" },
    texto: {
      es: "La propiedad en la que estoy trabajando hoy. Pregunta por disponibilidad antes de que se muevan las etapas.",
      en: "The property I'm working on right now. Ask about availability before the phases move.",
    },
  },
  propiedades: {
    titulo: { es: "Lo que tengo disponible", en: "What I have available" },
    texto: {
      es: "Lotes, casas y preventa que represento en Ensenada y alrededores. Cada ficha trae números, ubicación y una conversación directa conmigo.",
      en: "Lots, homes and pre-sale I represent in and around Ensenada. Each listing has numbers, location and a direct line to me.",
    },
  },
  prueba: {
    titulo: { es: "Con quién estás tratando", en: "Who you're dealing with" },
    texto: {
      es: "No soy un portal ni un call center. Contesto yo, y estos son los números que respaldan mi trabajo.",
      en: "I'm not a portal or a call center. You get me, and these are the numbers behind my work.",
    },
  },
  captura: {
    titulo: { es: "¿No ves lo que buscas?", en: "Not seeing what you want?" },
    texto: {
      es: "Dime qué buscas y con qué presupuesto. Te aviso en cuanto entre algo que encaje, antes de publicarlo.",
      en: "Tell me what you're after and your budget. I'll ping you when something fits, before it goes public.",
    },
  },
  cierre: {
    titulo: { es: "¿Empezamos por WhatsApp?", en: "Shall we start on WhatsApp?" },
    texto: {
      es: "Escríbeme con la zona, el presupuesto y para cuándo lo quieres. Te contesto yo, normalmente el mismo día.",
      en: "Message me with the area, the budget and your timeline. You'll get me, usually the same day.",
    },
  },
} as const;

export const NOTA_INICIO = pendienteI18n(
  "fotografía de Fran en Ensenada para el hero (horizontal, alta resolución, con derechos)",
);
