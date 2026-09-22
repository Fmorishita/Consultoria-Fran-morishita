import { esquemaProyecto, type Proyecto } from "@contenido/esquemas";
import { pendiente } from "@/lib/pendiente";
import { SITIO } from "@contenido/sitio";

/**
 * Datos tomados de las fichas públicas del desarrollo (RE/MAX, Century 21,
 * icasas) y de su página en Facebook. Nada aquí se dedujo.
 *
 * Los precios de lista NO se publican todavía: lo único que encontré en
 * fuentes públicas es la preventa del modelo Esmeralda, y viene de un portal,
 * no del desarrollador. Hasta que Fran confirme la lista vigente con el
 * desarrollo, la ficha dice "precio a consultar".
 */
export const residencialDiamante: Proyecto = esquemaProyecto.parse({
  slug: "residencial-diamante",
  activo: true,
  autorizado: true,
  destacado: false,
  nombre: "Residencial Diamante",
  desarrollador: pendiente("razón social del desarrollador de Residencial Diamante para el crédito en la ficha"),
  ciudad: "Ensenada, Baja California",
  tipo: "casas",
  estado: "preventa",
  hero: {
    imagen: pendiente("fotos autorizadas de Residencial Diamante (fachada, casa muestra y roof garden)"),
    titulo: { es: "Residencial Diamante", en: "Residencial Diamante" },
    subtitulo: {
      es: "Casas con roof garden y vista al mar, a cinco minutos del Blvd. Costero",
      en: "Homes with roof gardens and ocean views, five minutes from Blvd. Costero",
    },
  },
  pitch: [
    {
      es: "Setenta y cuatro casas en el corazón de Ensenada, dentro de un condominio con acceso controlado y seguridad las 24 horas. No es un fraccionamiento en las afueras: estás en el Fraccionamiento Acapulco, a unas cuadras del Blvd. Costero.",
      en: "Seventy-four homes in the heart of Ensenada, inside a gated condominium with controlled access and 24-hour security. This is not a subdivision on the outskirts: you are in Fraccionamiento Acapulco, a few blocks from Blvd. Costero.",
    },
    {
      es: "Las casas se entregan con cocina integral equipada y cisterna, y el roof garden mira al mar. Es la opción para quien no quiere construir: se firma, se entrega y se habita.",
      en: "Homes are delivered with a fully equipped kitchen and a cistern, and the roof garden faces the ocean. This is the option for someone who does not want to build: you sign, you receive it and you move in.",
    },
    {
      es: "La ubicación es el argumento: enfrente está Baja Dynamo, a cinco minutos la Macroplaza del Mar, y alrededor Costco, Walmart, Sam's Club, escuelas, universidades, gimnasios y hospitales. Todo lo que se resuelve en coche aquí se resuelve caminando o en minutos.",
      en: "Location is the argument: Baja Dynamo sits across the street, Macroplaza del Mar is five minutes away, and Costco, Walmart, Sam's Club, schools, universities, gyms and hospitals surround it. What usually takes a drive here takes a walk or a few minutes.",
    },
  ],
  ubicacion: {
    direccion: "Calle Guaymas, entre Bahía Magdalena y San Felipe, Fraccionamiento Acapulco, Ensenada, Baja California",
    zona: "Fracc. Acapulco",
    tiemposClave: [],
  },
  amenidades: [
    { icono: "seguridad", texto: { es: "Acceso controlado y seguridad 24 horas", en: "Controlled access and 24-hour security" } },
    { icono: "vista", texto: { es: "Roof garden con vista al mar", en: "Roof garden with ocean views" } },
    { icono: "servicios", texto: { es: "Cocina integral equipada y cisterna incluidas", en: "Equipped kitchen and cistern included" } },
    { icono: "parque", texto: { es: "Áreas comunes dentro del condominio", en: "Common areas inside the condominium" } },
    { icono: "planeacion", texto: { es: "Setenta y cuatro casas, condominio delimitado", en: "Seventy-four homes, a delimited condominium" } },
    { icono: "orientacion", texto: { es: "A cuadras del Blvd. Costero y de la Macroplaza del Mar", en: "Blocks from Blvd. Costero and Macroplaza del Mar" } },
  ],
  inventario: {
    etiqueta: { es: "Casas en preventa", en: "Homes in pre-sale" },
    superficieMin: 91,
    superficieMax: pendiente("superficie de terreno de los modelos Rubí y Zafiro"),
    precioDesde: pendiente("lista de precios vigente de Residencial Diamante por modelo, confirmada con el desarrollo"),
    moneda: "MXN",
    notaLegal: SITIO.legal.leyendaProyectos,
  },
  galeria: [],
  faq: [
    {
      p: { es: "¿Qué modelos hay?", en: "What models are available?" },
      r: {
        es: "El desarrollo maneja los modelos Rubí, Zafiro y Esmeralda. Cambian en superficie y distribución; la disponibilidad se mueve rápido en preventa, así que conviene preguntar por modelo y no por el desarrollo entero.",
        en: "The development offers the Rubí, Zafiro and Esmeralda models. They differ in size and layout; availability moves fast in pre-sale, so it is better to ask about a specific model rather than the development as a whole.",
      },
    },
    {
      p: { es: "¿Qué incluye la casa al entregarla?", en: "What does the home include on handover?" },
      r: {
        es: "Cocina integral equipada y cisterna. El roof garden viene terminado y con vista al mar. Los acabados y el equipamiento exacto de cada modelo te los paso por escrito antes de que apartes.",
        en: "An equipped kitchen and a cistern. The roof garden comes finished and facing the ocean. I send you each model's exact finishes and equipment in writing before you reserve.",
      },
    },
    {
      p: { es: "¿Dónde está exactamente?", en: "Where exactly is it?" },
      r: {
        es: "En calle Guaymas, entre Bahía Magdalena y San Felipe, en el Fraccionamiento Acapulco. Enfrente está Baja Dynamo y la Macroplaza del Mar queda a unos cinco minutos.",
        en: "On Guaymas street, between Bahía Magdalena and San Felipe, in Fraccionamiento Acapulco. Baja Dynamo is across the street and Macroplaza del Mar is about five minutes away.",
      },
    },
    {
      p: { es: "¿Sirve para rentar?", en: "Does it work as a rental?" },
      r: {
        es: "Es de los pocos productos en Ensenada que funciona igual para vivirlo y para rentarlo: casa terminada, dentro de la ciudad y a cuadras del malecón. Si tu plan es rentar, lo revisamos con números antes de que apartes.",
        en: "It is one of the few products in Ensenada that works equally for living in and for renting: a finished home, inside the city and blocks from the waterfront. If renting is your plan, we run the numbers before you reserve.",
      },
    },
  ],
  whatsapp: {
    keyword: "DIAMANTE",
    mensajePrefill: {
      es: "Hola Fran, me interesa Residencial Diamante en Ensenada. ¿Me pasas modelos disponibles y precios?",
      en: "Hi Fran, I'm interested in Residencial Diamante in Ensenada. Could you send me available models and pricing?",
    },
  },
  seo: {
    title: {
      es: "Residencial Diamante · Casas con roof garden en Ensenada",
      en: "Residencial Diamante · Roof-garden homes in Ensenada",
    },
    description: {
      es: "Casas en preventa en el Fraccionamiento Acapulco, Ensenada: acceso controlado, seguridad 24 horas, cocina integral, cisterna y roof garden con vista al mar.",
      en: "Pre-sale homes in Fraccionamiento Acapulco, Ensenada: controlled access, 24-hour security, equipped kitchen, cistern and an ocean-view roof garden.",
    },
  },
});
