import { esquemaSitio } from "@contenido/esquemas";
import { pendiente } from "@/lib/pendiente";

/** Datos globales del negocio. Un solo lugar para cambiarlos. */
export const SITIO = esquemaSitio.parse({
  nombre: "Fran Morishita",
  rol: {
    es: "Consultor de marketing y dirección comercial en bienes raíces",
    en: "Real estate marketing and sales director",
  },
  ciudad: { es: "Ensenada, Baja California", en: "Ensenada, Baja California" },
  dominio: "https://franmorishita-bienesraices.vercel.app",
  /** "a" = tierra nocturna · "b" = crema profundo. Ver /styleguide. */
  direccionVisual: "a",
  whatsapp: {
    numero: "5216462563006",
    mensajeGeneral: {
      es: "Hola Fran, vi tu sitio y quiero platicar de una propiedad.",
      en: "Hi Fran, I saw your site and I'd like to talk about a property.",
    },
  },
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
