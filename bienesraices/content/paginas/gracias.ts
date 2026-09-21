import type { I18n } from "@/lib/i18n";

type Variante = { titulo: I18n; texto: I18n; cta?: I18n };

export const GRACIAS: Record<string, Variante> & { default: Variante } = {
  default: {
    titulo: { es: "Listo. Te leo.", en: "Done. I've got it." },
    texto: {
      es: "Recibí tus datos y te contesto personalmente, normalmente el mismo día hábil.",
      en: "I received your details and I'll answer personally, usually within the same business day.",
    },
  },
  lead: {
    titulo: { es: "Listo. Te leo.", en: "Done. I've got it." },
    texto: {
      es: "Recibí tus datos. Si quieres adelantar, escríbeme directo por WhatsApp y lo vemos ahora mismo.",
      en: "I got your details. If you want to move faster, message me on WhatsApp and we'll get into it right now.",
    },
    cta: { es: "Escribirme por WhatsApp", en: "Message me on WhatsApp" },
  },
  proyecto: {
    titulo: { es: "Gracias por tu interés", en: "Thanks for your interest" },
    texto: {
      es: "Te mando disponibilidad y precios actualizados del proyecto. Si tienes prisa, WhatsApp es más rápido.",
      en: "I'll send you current availability and pricing for the project. If you're in a hurry, WhatsApp is faster.",
    },
    cta: { es: "Escribirme por WhatsApp", en: "Message me on WhatsApp" },
  },
  desarrollador: {
    titulo: { es: "Gracias. Vamos a los números.", en: "Thank you. Let's get to the numbers." },
    texto: {
      es: "Te contacto para agendar la llamada de diagnóstico de 30 minutos. Si prefieres, reserva tú mismo el horario.",
      en: "I'll reach out to book the 30-minute diagnostic call. If you prefer, grab a slot yourself.",
    },
    cta: { es: "Agendar ahora", en: "Book it now" },
  },
};

export const SEO_GRACIAS = {
  title: { es: "Gracias", en: "Thank you" },
  description: { es: "Mensaje recibido.", en: "Message received." },
} as const;
