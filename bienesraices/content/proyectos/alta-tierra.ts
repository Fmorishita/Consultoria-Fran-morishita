import { esquemaProyecto, type Proyecto } from "@contenido/esquemas";
import { pendiente } from "@/lib/pendiente";
import { SITIO } from "@contenido/sitio";

const OFICIAL = "https://altatierra.mx/wp-content/uploads";

/**
 * Datos tomados del sitio oficial del desarrollo (altatierra.mx).
 * Lo que ahí no se publica (precios, enganche, tasa) queda pendiente:
 * no se inventa ni se pinta.
 */
export const altaTierra: Proyecto = esquemaProyecto.parse({
  slug: "alta-tierra",
  activo: true,
  autorizado: true,
  destacado: true,
  nombre: "Alta Tierra Residencial",
  desarrollador: pendiente("razón social del desarrollador de Alta Tierra para el crédito en la ficha"),
  ciudad: "Ensenada, Baja California",
  tipo: "lotes",
  estado: "entrega-inmediata",
  hero: {
    imagen: `${OFICIAL}/2026/02/at-20.jpg`,
    titulo: {
      es: "Alta Tierra",
      en: "Alta Tierra",
    },
    subtitulo: {
      es: "Lotes urbanizados con vista al Pacífico en Zona Playitas, Ensenada",
      en: "Urbanized lots with Pacific Ocean views in Zona Playitas, Ensenada",
    },
  },
  pitch: [
    {
      es: "Alta Tierra es un fraccionamiento cerrado tipo master planned community en Ensenada: acceso controlado, seguridad monitoreada las 24 horas y calles urbanizadas desde el día uno. Compras un lote listo para construir, no una promesa.",
      en: "Alta Tierra is a gated master-planned community in Ensenada: controlled access, 24/7 monitored security and urbanized streets from day one. You buy a lot that's ready to build on, not a promise.",
    },
    {
      es: "Más de 40 hectáreas de áreas verdes y parques rodean los lotes, y buena parte de ellos mira al Océano Pacífico, con vista directa o desde el segundo nivel. Esa vista es la que no se repone: hay una sola primera fila.",
      en: "More than 40 hectares of green areas and parks surround the lots, and many of them face the Pacific Ocean, either directly or from a second floor. That view is the part you can't replace: there's only one front row.",
    },
    {
      es: "El financiamiento es directo con el desarrollo, a 36, 48 o 60 meses, sin pasar por un banco. Yo te acompaño desde la primera pregunta hasta la firma.",
      en: "Financing comes straight from the development, over 36, 48 or 60 months, with no bank involved. I walk you through it from the first question to signing.",
    },
  ],
  ubicacion: {
    direccion: "De La Paz 95, Zona Playitas, 22820 Ensenada, Baja California",
    tiemposClave: [],
  },
  amenidades: [
    { icono: "seguridad", texto: { es: "Acceso controlado y seguridad monitoreada 24/7", en: "Controlled access and 24/7 monitored security" } },
    { icono: "vista", texto: { es: "Lotes con vista al Océano Pacífico", en: "Lots with Pacific Ocean views" } },
    { icono: "parque", texto: { es: "Más de 40 hectáreas de áreas verdes y parques", en: "Over 40 hectares of green areas and parks" } },
    { icono: "servicios", texto: { es: "Servicios urbanos completos y calles urbanizadas", en: "Full urban services and paved streets" } },
    { icono: "deporte", texto: { es: "Centros de recreación con jardineras y cancha de pádel", en: "Recreation areas with gardens and a padel court" } },
    { icono: "planeacion", texto: { es: "Master planned community privada y delimitada", en: "Private, delimited master-planned community" } },
    { icono: "posventa", texto: { es: "Servicio posventa incluido", en: "Post-sale service included" } },
  ],
  inventario: {
    etiqueta: { es: "Lotes urbanizados", en: "Urbanized lots" },
    superficieMin: 275,
    superficieMax: 473,
    precioDesde: pendiente("precio de lista por categoría de lote (Residencial, Plus y Premium) con fecha de vigencia"),
    moneda: "MXN",
    notaLegal: SITIO.legal.leyendaProyectos,
  },
  financiamiento: {
    plazosMeses: [36, 48, 60],
    engancheMinPct: pendiente("enganche mínimo que pide el desarrollo"),
    tasaAnualPct: pendiente("tasa anual del financiamiento directo (0 si es sin intereses)"),
    esquema: {
      es: "Financiamiento directo con el desarrollo, sin instituciones bancarias.",
      en: "Financing directly with the development, no banks involved.",
    },
  },
  galeria: [
    { src: `${OFICIAL}/2025/11/at-26-scaled.jpg`, alt: { es: "Vista del desarrollo Alta Tierra en Ensenada", en: "View of the Alta Tierra development in Ensenada" } },
    { src: `${OFICIAL}/2025/11/WhatsApp-Image-2025-11-26-at-13.41.05.jpeg`, alt: { es: "Lotes urbanizados de Alta Tierra", en: "Urbanized lots at Alta Tierra" } },
    { src: `${OFICIAL}/2026/07/WhatsApp-Image-2026-07-24-at-11.03.36-AM.jpeg`, alt: { es: "Áreas comunes de Alta Tierra", en: "Common areas at Alta Tierra" } },
  ],
  faq: [
    {
      p: { es: "¿Qué es Alta Tierra y dónde está?", en: "What is Alta Tierra and where is it?" },
      r: {
        es: "Un desarrollo residencial privado en Zona Playitas, Ensenada. Ofrece lotes urbanizados con vista al mar, amplias áreas verdes y un entorno pensado para seguridad, plusvalía y calidad de vida.",
        en: "A private residential development in Zona Playitas, Ensenada. It offers urbanized lots with ocean views, large green areas and an environment built for security, appreciation and quality of life.",
      },
    },
    {
      p: { es: "¿De qué tamaño son los lotes?", en: "How big are the lots?" },
      r: {
        es: "Desde 275 m² hasta 473 m², repartidos en categorías Residencial, Plus y Premium, para adaptarse a distintos proyectos y presupuestos.",
        en: "From 275 m² to 473 m², split into Residencial, Plus and Premium categories to fit different projects and budgets.",
      },
    },
    {
      p: { es: "¿Todos los lotes tienen vista al océano?", en: "Do all lots have ocean views?" },
      r: {
        es: "No todos, pero muchos sí. Hay opciones con vista directa y permanente, y otras con vista desde el segundo nivel o rooftop. La vista cambia el precio y la disponibilidad, así que conviene preguntar por lote específico.",
        en: "Not all, but many do. Some have direct, permanent views; others have views from a second floor or rooftop. The view drives price and availability, so it's worth asking about a specific lot.",
      },
    },
    {
      p: { es: "¿Es un fraccionamiento privado?", en: "Is it a gated community?" },
      r: {
        es: "Sí, es un fraccionamiento cerrado tipo master planned gated community, con acceso controlado y seguridad monitoreada 24/7.",
        en: "Yes, it's a closed master-planned gated community with controlled access and 24/7 monitored security.",
      },
    },
    {
      p: { es: "¿Hay financiamiento?", en: "Is there financing?" },
      r: {
        es: "Sí, financiamiento directo con el desarrollo a 36, 48 y 60 meses, sin necesidad de recurrir a un banco. El enganche y las condiciones vigentes te las paso por WhatsApp.",
        en: "Yes, financing directly with the development over 36, 48 and 60 months, with no bank needed. I'll send you the current down payment and terms over WhatsApp.",
      },
    },
    {
      p: { es: "¿Se puede visitar antes de comprar?", en: "Can I visit before buying?" },
      r: {
        es: "Sí, y es lo que recomiendo. Escríbeme y agendamos la visita para que veas los lotes disponibles en persona.",
        en: "Yes, and that's what I recommend. Message me and we'll set up a visit so you can see the available lots in person.",
      },
    },
  ],
  whatsapp: {
    keyword: "ALTA-TIERRA",
    mensajePrefill: {
      es: "Hola Fran, me interesa Alta Tierra en Ensenada. ¿Me pasas lotes disponibles, precios y el esquema de pagos?",
      en: "Hi Fran, I'm interested in Alta Tierra in Ensenada. Could you send me available lots, pricing and the payment plan?",
    },
  },
  seo: {
    title: {
      es: "Alta Tierra · Lotes con vista al mar en Ensenada",
      en: "Alta Tierra · Ocean-view lots in Ensenada",
    },
    description: {
      es: "Lotes urbanizados de 275 a 473 m² con vista al Pacífico en Zona Playitas, Ensenada. Fraccionamiento cerrado, seguridad 24/7 y financiamiento directo a 36, 48 y 60 meses.",
      en: "Urbanized lots from 275 to 473 m² with Pacific views in Zona Playitas, Ensenada. Gated community, 24/7 security and direct financing over 36, 48 and 60 months.",
    },
  },
});
