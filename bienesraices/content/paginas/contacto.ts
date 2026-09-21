export const CONTACTO = {
  antetitulo: { es: "Contacto", en: "Contact" },
  titulo: { es: "Hablemos hoy,\nno la próxima semana", en: "Let's talk today,\nnot next week" },
  texto: {
    es: "La vía más rápida es WhatsApp: contesto yo. Si prefieres agenda, reserva 30 minutos. Y si quieres dejarlo por escrito, aquí está el formulario.",
    en: "WhatsApp is the fastest way and you get me, not an assistant. Prefer a calendar? Book 30 minutes. Rather write it down? The form is right here.",
  },
  opciones: [
    {
      titulo: { es: "WhatsApp", en: "WhatsApp" },
      texto: { es: "Respuesta el mismo día, en horario hábil.", en: "Same-day reply during business hours." },
    },
    {
      titulo: { es: "Videollamada de 30 min", en: "30-minute video call" },
      texto: { es: "Para desarrolladores y compradores que ya traen números.", en: "For developers and buyers who already have numbers on the table." },
    },
  ],
  formulario: {
    titulo: { es: "Déjame tus datos", en: "Leave me your details" },
    texto: { es: "Te escribo yo, normalmente el mismo día.", en: "I'll reply personally, usually the same day." },
  },
  seo: {
    title: { es: "Contacto · Fran Morishita", en: "Contact · Fran Morishita" },
    description: {
      es: "Escríbeme por WhatsApp, agenda una videollamada de 30 minutos o déjame tus datos.",
      en: "Message me on WhatsApp, book a 30-minute video call, or leave me your details.",
    },
  },
} as const;
