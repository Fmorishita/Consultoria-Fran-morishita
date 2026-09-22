export const CONTACTO = {
  antetitulo: { es: "Contacto", en: "Contact" },
  titulo: { es: "Hablemos de lo que\nestás buscando", en: "Let's talk about\nwhat you're after" },
  texto: {
    es: "Tres formas de empezar, según cuánta prisa tengas. En las tres contesto yo.",
    en: "Three ways to start, depending on how fast you need to move. In all three, you get me.",
  },
  opciones: [
    {
      titulo: { es: "Visita o videollamada", en: "Visit or video call" },
      texto: { es: "Media hora en agenda para recorrer el desarrollo o revisarlo en pantalla si estás fuera.", en: "Half an hour on the calendar to walk the development, or review it on screen if you're away." },
    },
    {
      titulo: { es: "WhatsApp", en: "WhatsApp" },
      texto: { es: "Para una pregunta concreta sobre un lote, un precio o una fecha. Respuesta el mismo día en horario hábil.", en: "For a specific question about a lot, a price or a date. Same-day reply during business hours." },
    },
    {
      titulo: { es: "Expediente por correo", en: "File by email" },
      texto: { es: "Déjame tus datos y te mando disponibilidad, condiciones y plano sin que tengas que hablar con nadie todavía.", en: "Leave me your details and I'll send availability, terms and the site plan without you having to talk to anyone yet." },
    },
  ],
  formulario: {
    titulo: { es: "Déjame tus datos", en: "Leave me your details" },
    texto: { es: "Te escribo yo, normalmente el mismo día.", en: "I'll reply personally, usually the same day." },
  },
  seo: {
    title: { es: "Contacto · Fran Morishita", en: "Contact · Fran Morishita" },
    description: {
      es: "Agenda una visita al desarrollo, escríbeme por WhatsApp o pide el expediente completo de la propiedad.",
      en: "Book a visit to the development, message me on WhatsApp, or request the full property file.",
    },
  },
} as const;
