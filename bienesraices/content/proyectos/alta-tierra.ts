import { esquemaProyecto, type Proyecto } from "@contenido/esquemas";
import { pendiente } from "@/lib/pendiente";
import { SITIO } from "@contenido/sitio";

// Copias locales de las fotos del sitio oficial (altatierra.mx). Se sirven
// desde /public para que la ficha no dependa de que el desarrollador
// mantenga sus URLs.
const FOTOS = "/imagenes/alta-tierra";

/**
 * Datos tomados del sitio oficial del desarrollo (altatierra.mx).
 *
 * La lista de precios es la que el desarrollador publica ahí para la etapa 2.5,
 * copiada tal cual, incluidas sus condiciones (20% de enganche, 12 o 24 pagos
 * sin intereses, apartado de 1,000 USD reembolsable, precio sin gastos de
 * escrituración). No se dedujo ni se redondeó ninguna cifra: las mensualidades
 * de la lista son exactamente el saldo dividido entre el plazo, que es lo que
 * confirma que el esquema va sin intereses.
 *
 * El orden de la galería importa: [0] es la foto de ambiente que usa "La vida
 * aquí" y [1] la que sostiene la banda de cierre.
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
    imagen: `${FOTOS}/vista-bahia.jpg`,
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
      es: "Alta Tierra es un fraccionamiento cerrado sobre la ladera de Playitas: acceso controlado, seguridad monitoreada las 24 horas y calles urbanizadas desde el día uno. Lo que compras es un lote listo para construir, no una promesa con fecha.",
      en: "Alta Tierra is a gated community on the Playitas hillside: controlled access, 24-hour monitored security and urbanized streets from day one. What you buy is a lot ready to build on, not a promise with a date attached.",
    },
    {
      es: "Más de 40 hectáreas de áreas verdes y parques rodean los lotes, y buena parte de ellos mira a la bahía, con vista directa o desde el segundo nivel. Esa vista es la parte que no se repone: hay una sola primera fila y se coloca antes que todo lo que queda detrás.",
      en: "More than 40 hectares of green areas and parks surround the lots, and many of them face the bay, either directly or from a second floor. That view is the part you can't replace: there's only one front row, and it sells before everything behind it.",
    },
    {
      es: "El esquema es directo con el desarrollo: 20% de enganche y el saldo en 12 o 24 pagos sin intereses, sin banco y sin historial crediticio en México. Yo te acompaño desde la primera pregunta hasta la escritura.",
      en: "The scheme is direct with the development: 20% down and the balance over 12 or 24 interest-free payments, with no bank and no Mexican credit history required. I walk you through it from the first question to the deed.",
    },
  ],
  ubicacion: {
    direccion: "De La Paz 95, Zona Playitas, 22820 Ensenada, Baja California",
    zona: "Zona Playitas",
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
    precioDesde: 1699000,
    moneda: "MXN",
    notaLegal: SITIO.legal.leyendaProyectos,
  },
  financiamiento: {
    plazosMeses: [12, 24],
    engancheMinPct: 20,
    tasaAnualPct: 0,
    esquema: {
      es: "Directo con el desarrollo, sin instituciones bancarias: 20% de enganche y el saldo en 12 o 24 pagos sin intereses.",
      en: "Direct with the development, no banks involved: 20% down and the balance over 12 or 24 interest-free payments.",
    },
    resumen: {
      es: "Directo, sin banco: 20% y 12 o 24 meses sin intereses",
      en: "Direct, no bank: 20% down, 12 or 24 months interest free",
    },
    nota: {
      es: "El apartado del lote es de 1,000 USD y es reembolsable. El precio de lista no incluye gastos de escrituración. El desarrollo también ofrece plazos más largos de financiamiento directo; esas condiciones se confirman por lote.",
      en: "The lot reservation is 1,000 USD and it is refundable. List prices do not include closing costs. The development also offers longer direct-financing terms; those conditions are confirmed lot by lot.",
    },
  },
  listaPrecios: {
    etiqueta: { es: "Etapa 2.5", en: "Phase 2.5" },
    nota: {
      es: "Lista publicada por el desarrollo para la etapa 2.5, con 20% de enganche y el saldo sin intereses. Vigente hasta agotar existencias y sujeta a cambios sin previo aviso. El precio no incluye gastos de escrituración.",
      en: "List published by the development for phase 2.5, with 20% down and the balance interest free. Valid while units last and subject to change without notice. Prices do not include closing costs.",
    },
    zonas: [
      {
        nombre: { es: "Zona Mar", en: "Ocean side" },
        tipos: [
          { nombre: "Plus", superficieMin: 272, superficieMax: 313, precio: 1999000 },
          { nombre: "Residencial Grande", superficieMin: 339, precio: 2383000 },
          { nombre: "Premium", superficieMin: 274, superficieMax: 289, precio: 2999000 },
        ],
      },
      {
        nombre: { es: "Zona Montaña", en: "Mountain side" },
        tipos: [
          { nombre: "Residencial", superficieMin: 258, superficieMax: 283, precio: 1699000 },
          { nombre: "Vista", superficieMin: 259, superficieMax: 282, precio: 1899000 },
          { nombre: "Plus", superficieMin: 237, superficieMax: 308, precio: 1999000 },
          { nombre: "Plus Grande", superficieMin: 340, superficieMax: 390, precio: 2383000 },
          { nombre: "Plus Esquina", superficieMin: 404, superficieMax: 422, precio: 2599000 },
        ],
      },
    ],
  },
  galeria: [
    {
      src: `${FOTOS}/familia-calle.jpg`,
      alt: {
        es: "Familia recorriendo las calles urbanizadas de Alta Tierra al atardecer",
        en: "A family walking the urbanized streets of Alta Tierra at sunset",
      },
    },
    {
      src: `${FOTOS}/vista-bahia.jpg`,
      alt: {
        es: "Vista aérea de la bahía de Ensenada desde la ladera de Alta Tierra",
        en: "Aerial view of Ensenada bay from the Alta Tierra hillside",
      },
    },
    {
      src: `${FOTOS}/modulo-ventas.jpg`,
      alt: {
        es: "Compradores revisando la planta arquitectónica en el módulo de ventas de Alta Tierra",
        en: "Buyers reviewing the floor plan at the Alta Tierra sales office",
      },
    },
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
      p: { es: "¿De qué tamaño son los lotes y cuánto cuestan?", en: "How big are the lots and what do they cost?" },
      r: {
        es: "Van de 275 a 473 m², repartidos en categorías como Residencial, Vista, Plus y Premium. En la etapa 2.5 los precios de lista arrancan en $1,699,000 MXN para Residencial en Zona Montaña y llegan a $2,999,000 MXN para Premium en Zona Mar. La tabla completa está más arriba en esta página.",
        en: "They run from 275 to 473 m², split into categories such as Residencial, Vista, Plus and Premium. In phase 2.5 list prices start at $1,699,000 MXN for Residencial on the mountain side and reach $2,999,000 MXN for Premium on the ocean side. The full table is further up this page.",
      },
    },
    {
      p: { es: "¿Cómo funciona el pago?", en: "How does payment work?" },
      r: {
        es: "Se aparta el lote con 1,000 USD reembolsables, se cubre 20% de enganche y el saldo se paga en 12 o 24 mensualidades sin intereses, directo con el desarrollo y sin pasar por un banco. El precio de lista no incluye gastos de escrituración.",
        en: "You reserve the lot with a refundable 1,000 USD deposit, pay 20% down, and the balance is spread over 12 or 24 interest-free monthly payments, directly with the development and with no bank involved. List prices do not include closing costs.",
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
      p: { es: "¿Puedo comprar si vivo en Estados Unidos?", en: "Can I buy if I live in the United States?" },
      r: {
        es: "Sí. Al ser financiamiento directo del desarrollo no necesitas historial crediticio en México. Si eres extranjero, la propiedad en zona costera se adquiere mediante fideicomiso bancario, y yo coordino ese trámite con la notaría.",
        en: "Yes. Because financing comes straight from the development, you don't need Mexican credit history. If you're a foreign buyer, coastal property is held through a bank trust, and I coordinate that process with the notary.",
      },
    },
    {
      p: { es: "¿Se puede visitar antes de comprar?", en: "Can I visit before buying?" },
      r: {
        es: "Sí, y es lo que recomiendo. Agenda la visita y recorremos los lotes disponibles a la hora en que se aprecia la vista. Si estás fuera del país, lo hacemos en video.",
        en: "Yes, and that's what I recommend. Book the visit and we'll walk the available lots at the hour the view earns its price. If you're abroad, we do it on video.",
      },
    },
  ],
  whatsapp: {
    keyword: "ALTA-TIERRA",
    mensajePrefill: {
      es: "Hola Fran, me interesa Alta Tierra en Ensenada. ¿Me pasas los lotes disponibles y el esquema de pagos?",
      en: "Hi Fran, I'm interested in Alta Tierra in Ensenada. Could you send me the available lots and the payment plan?",
    },
  },
  seo: {
    title: {
      es: "Alta Tierra · Lotes con vista al mar en Ensenada desde $1,699,000",
      en: "Alta Tierra · Ocean-view lots in Ensenada from $1,699,000 MXN",
    },
    description: {
      es: "Lotes urbanizados de 275 a 473 m² con vista al Pacífico en Zona Playitas, Ensenada. Fraccionamiento cerrado, seguridad 24/7, 20% de enganche y el saldo en 12 o 24 pagos sin intereses.",
      en: "Urbanized lots from 275 to 473 m² with Pacific views in Zona Playitas, Ensenada. Gated community, 24/7 security, 20% down and the balance over 12 or 24 interest-free payments.",
    },
  },
});
