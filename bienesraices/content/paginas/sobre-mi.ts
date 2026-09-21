import { pendienteI18n } from "@/lib/pendiente";

export const SOBRE_MI = {
  antetitulo: { es: "Sobre mí", en: "About me" },
  titulo: { es: "Vendo con demanda propia,\nno con suerte", en: "I sell with demand I create,\nnot with luck" },
  parrafos: [
    {
      es: "Soy Fran Morishita, consultor de marketing y dirección comercial con base en Ensenada, Baja California. Trabajo en dos frentes: vendo propiedades con mi propio canal digital y dirijo la comercialización de desarrollos para quienes los construyen.",
      en: "I'm Fran Morishita, a marketing and sales consultant based in Ensenada, Baja California. I work on two fronts: I sell property through my own digital channel, and I direct sales operations for the people who build developments.",
    },
    {
      es: "Mi diferenciador no es conocer el mercado, eso lo dice cualquiera. Es que traigo la demanda: genero leads con Meta Ads, los califico con IA y CRM, y cierro por videollamada.",
      en: "My edge isn't knowing the market, anyone can say that. It's that I bring the demand: I generate leads with Meta Ads, qualify them with AI and CRM, and close over video call.",
    },
    {
      es: "He dirigido la comercialización de desarrollos completos, desde el primer peso de pauta hasta la conversación que cierra. Ese trabajo está documentado en el portafolio y validado en video por mi socio Gus Marcos.",
      en: "I've directed the sales operation of entire developments, from the first ad peso to the conversation that closes. That work is documented in the portfolio and validated on video by my partner Gus Marcos.",
    },
    pendienteI18n("párrafo personal: por qué bienes raíces y cómo llegaste a Ensenada"),
  ],
  credenciales: {
    antetitulo: { es: "Credenciales", en: "Credentials" },
    items: [pendienteI18n("credenciales, certificaciones y registro como agente inmobiliario en B.C.")],
  },
  cierre: {
    titulo: { es: "¿Platicamos?", en: "Shall we talk?" },
    texto: {
      es: "La conversación empieza en WhatsApp y sigue en videollamada. Sin formularios eternos.",
      en: "The conversation starts on WhatsApp and continues on a video call. No endless forms.",
    },
  },
  seo: {
    title: { es: "Sobre Fran Morishita · Bienes raíces en Ensenada", en: "About Fran Morishita · Real estate in Ensenada" },
    description: {
      es: "Consultor de marketing y dirección comercial en bienes raíces, con base en Ensenada, Baja California.",
      en: "Marketing and sales direction consultant in real estate, based in Ensenada, Baja California.",
    },
  },
} as const;
