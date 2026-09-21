import { esquemaProyecto, type Proyecto } from "@contenido/esquemas";
import { pendiente, pendienteI18n } from "@/lib/pendiente";
import { SITIO } from "@contenido/sitio";

/**
 * Primer proyecto. Mientras `autorizado` sea false no se publican
 * precios, galería ni esquema de financiamiento: solo se ven en preview.
 */
export const altaTierra: Proyecto = esquemaProyecto.parse({
  slug: "alta-tierra",
  activo: true,
  autorizado: false,
  nombre: "Alta Tierra",
  desarrollador: pendiente("nombre del desarrollador de Alta Tierra y autorización por escrito"),
  ciudad: "Ensenada, Baja California",
  tipo: "lotes",
  estado: "preventa",
  hero: {
    imagen: pendiente("render o fotografía aérea autorizada para el hero (mínimo 1920×1080)"),
    titulo: {
      es: "Alta Tierra",
      en: "Alta Tierra",
    },
    subtitulo: {
      es: "Lotes residenciales en preventa · Ensenada, Baja California",
      en: "Residential lots in pre-sale · Ensenada, Baja California",
    },
  },
  pitch: [
    pendienteI18n("párrafo 1 del pitch: qué es Alta Tierra y para quién es"),
    pendienteI18n("párrafo 2 del pitch: por qué aquí y por qué ahora (plusvalía, entorno, etapa)"),
  ],
  ubicacion: {
    direccion: pendiente("dirección exacta o punto de referencia de Alta Tierra"),
    tiemposClave: [],
  },
  amenidades: [],
  inventario: {
    etiqueta: { es: "Lotes residenciales", en: "Residential lots" },
    superficieMin: pendiente("superficie mínima de lote en m²"),
    superficieMax: pendiente("superficie máxima de lote en m²"),
    precioDesde: pendiente("precio de lista desde, con fecha de vigencia"),
    moneda: "MXN",
    notaLegal: SITIO.legal.leyendaProyectos,
  },
  financiamiento: {
    engancheMinPct: 20,
    plazosMeses: [12, 24, 36, 48],
    tasaAnualPct: 0,
    nota: pendienteI18n(
      "esquema real de financiamiento (enganche mínimo, plazos y tasa). Los valores del archivo son provisionales y solo se ven en preview",
    ),
  },
  galeria: [],
  faq: [],
  whatsapp: {
    keyword: "ALTA-TIERRA",
    mensajePrefill: {
      es: "Hola Fran, me interesa Alta Tierra en Ensenada. ¿Me pasas disponibilidad y precios?",
      en: "Hi Fran, I'm interested in Alta Tierra in Ensenada. Could you send me availability and prices?",
    },
  },
  seo: {
    title: {
      es: "Alta Tierra · Lotes residenciales en Ensenada",
      en: "Alta Tierra · Residential lots in Ensenada",
    },
    description: {
      es: "Lotes residenciales en preventa en Ensenada, Baja California. Disponibilidad, precios y financiamiento directo por WhatsApp.",
      en: "Residential lots in pre-sale in Ensenada, Baja California. Availability, pricing and financing directly over WhatsApp.",
    },
  },
});
