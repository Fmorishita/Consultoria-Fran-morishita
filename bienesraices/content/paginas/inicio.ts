import { pendienteI18n } from "@/lib/pendiente";

export const INICIO = {
  hero: {
    antetitulo: { es: "Ensenada, Baja California", en: "Ensenada, Baja California" },
    titulo: { es: "Yo no espero\nal comprador.\nLo traigo.", en: "I don't wait\nfor the buyer.\nI bring them." },
    subtitulo: {
      es: "Dirijo la comercialización de desarrollos inmobiliarios y vendo propiedades con canal digital propio, desde Ensenada.",
      en: "I run the sales operation of real estate developments and sell property through my own digital channel, from Ensenada.",
    },
  },
  testimonio: {
    antetitulo: { es: "Prueba, no promesa", en: "Proof, not promises" },
    titulo: { es: "Que lo diga quien trabajó conmigo", en: "Let the person who worked with me say it" },
  },
  trackRecord: {
    antetitulo: { es: "Track record", en: "Track record" },
    titulo: { es: "Números, no adjetivos", en: "Numbers, not adjectives" },
  },
  frentes: {
    antetitulo: { es: "Dos frentes", en: "Two fronts" },
    titulo: { es: "Según de qué lado estés", en: "Depending which side you're on" },
    items: [
      {
        titulo: { es: "Quiero comprar", en: "I want to buy" },
        texto: {
          es: "Lotes, casas y preventa en Ensenada y Baja California. Información clara, números reales y respuesta el mismo día.",
          en: "Lots, homes and pre-sale in Ensenada and Baja California. Straight information, real numbers and a same-day reply.",
        },
        href: "/proyectos",
        cta: { es: "Ver proyectos", en: "View properties" },
      },
      {
        titulo: { es: "Soy desarrollador", en: "I'm a developer" },
        texto: {
          es: "Tienes producto y te falta máquina de venta. Dirijo la comercialización completa: demanda, calificación, cierre y métricas.",
          en: "You have product and no sales machine. I run the whole commercial operation: demand, qualification, closing and metrics.",
        },
        href: "/desarrolladores",
        cta: { es: "Ver cómo trabajo", en: "See how I work" },
      },
    ],
  },
  metodo: {
    antetitulo: { es: "Cómo funciona", en: "How it works" },
    titulo: { es: "Un sistema, tres piezas", en: "One system, three pieces" },
    pasos: [
      {
        titulo: { es: "Demanda", en: "Demand" },
        texto: {
          es: "Campañas de Meta Ads hechas para vender metros cuadrados, no para juntar likes. El inventario se mueve cuando entra gente nueva todos los días.",
          en: "Meta Ads campaigns built to sell square meters, not to collect likes. Inventory moves when new people come in every single day.",
        },
      },
      {
        titulo: { es: "Calificación", en: "Qualification" },
        texto: {
          es: "IA y CRM separan a quien puede comprar hoy de quien compra en seis meses. Nadie pierde el tiempo: ni tú, ni el comprador.",
          en: "AI and CRM separate who can buy today from who buys in six months. Nobody wastes time: not you, not the buyer.",
        },
      },
      {
        titulo: { es: "Cierre", en: "Closing" },
        texto: {
          es: "Videollamada, seguimiento medido y cierre. Cada peso de pauta rastreado desde el clic hasta la conversación.",
          en: "Video call, measured follow-up and close. Every ad peso tracked from the click to the conversation.",
        },
      },
    ],
  },
  proyectos: {
    antetitulo: { es: "Proyectos", en: "Properties" },
    titulo: { es: "Lo que estoy promoviendo", en: "What I'm promoting right now" },
  },
  cierre: {
    titulo: { es: "¿Empezamos por WhatsApp?", en: "Shall we start on WhatsApp?" },
    texto: {
      es: "Escríbeme y te contesto yo. Si es compra, te paso números; si es tu desarrollo, agendamos 30 minutos.",
      en: "Message me and you'll get me, not a bot. Buying? I'll send you numbers. Developing? Let's book 30 minutes.",
    },
  },
} as const;

export const NOTA_INICIO = pendienteI18n(
  "fotografía de Fran en Ensenada para el hero (horizontal, alta resolución, con derechos)",
);
