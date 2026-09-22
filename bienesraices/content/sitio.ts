import { esquemaSitio } from "@contenido/esquemas";
import { pendiente } from "@/lib/pendiente";

/** Datos globales del negocio. Un solo lugar para cambiarlos. */
export const SITIO = esquemaSitio.parse({
  nombre: "Fran Morishita",
  rol: {
    es: "Representación inmobiliaria en la costa de Baja California",
    en: "Real estate representation on the Baja California coast",
  },
  ciudad: { es: "Ensenada, Baja California", en: "Ensenada, Baja California" },
  dominio: "https://franmorishita-realestate.vercel.app",
  /** "a" = tierra nocturna · "b" = crema profundo. Ver /styleguide. */
  direccionVisual: "a",
  whatsapp: {
    numero: "5216462563006",
    mensajeGeneral: {
      es: "Hola Fran, vi tu sitio y me gustaría platicar de una propiedad en Ensenada.",
      en: "Hi Fran, I saw your site and I'd like to talk about a property in Ensenada.",
    },
  },
  retrato:
    "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781439320844-ChatGPT_Image_Jun_14__2026__02_37_33_AM.jpg",
  calendario: "https://calendly.com/franmorishita/30min",
  redes: [],
  legal: {
    registroEstatal: pendiente("número de registro estatal como agente inmobiliario en B.C."),
    razonSocial: pendiente("razón social o nombre del responsable para el aviso de privacidad"),
    domicilio: pendiente("domicilio fiscal para el aviso de privacidad"),
    leyendaProyectos: {
      es: "Imágenes ilustrativas. Precios, medidas y disponibilidad sujetos a cambio sin previo aviso. No constituye oferta vinculante.",
      en: "Illustrative images. Prices, measurements and availability are subject to change without notice. This is not a binding offer.",
    },
  },
});
