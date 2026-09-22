import { esquemaProyecto, type Proyecto } from "@contenido/esquemas";
import { pendiente } from "@/lib/pendiente";
import { SITIO } from "@contenido/sitio";

/**
 * Datos tomados del sitio oficial del desarrollo (gaiaresidencial.com) y de
 * las fichas públicas de sus modelos. Los precios son los que el desarrollo
 * publica en su propia página, con su misma advertencia: no incluyen gastos
 * notariales. Las amenidades marcadas como próximas se publican como
 * próximas, no como existentes.
 */
export const gaiaResidencial: Proyecto = esquemaProyecto.parse({
  slug: "gaia-residencial",
  activo: true,
  autorizado: true,
  destacado: false,
  nombre: "Gaia Residencial",
  desarrollador: pendiente("razón social del desarrollador de Gaia Residencial para el crédito en la ficha"),
  ciudad: "Ensenada, Baja California",
  tipo: "casas",
  estado: "en-construccion",
  hero: {
    imagen: pendiente("fotos o renders autorizados de Gaia Residencial"),
    titulo: { es: "Gaia Residencial", en: "Gaia Residencial" },
    subtitulo: {
      es: "Casas nuevas con casa club y acceso controlado, en Colinas del Golfo",
      en: "New homes with a clubhouse and controlled access, in Colinas del Golfo",
    },
  },
  pitch: [
    {
      es: "Es el desarrollo que resuelve la primera casa y la casa de retiro con el mismo producto: casas nuevas en clusters privados, con acceso controlado las 24 horas y caseta de vigilancia, en Colinas del Golfo.",
      en: "This is the development that solves both the first home and the retirement home with the same product: new houses in private clusters, with 24-hour controlled access and a guard booth, in Colinas del Golfo.",
    },
    {
      es: "Dos modelos, de dos y de tres recámaras, ambos con roof garden y cajones para dos coches. La casa club y la terraza ya están; el eco parque, la zona de asadores, la cancha deportiva y el área de niños vienen en camino.",
      en: "Two models, two and three bedrooms, both with a roof garden and parking for two cars. The clubhouse and terrace are already there; the eco park, grill zone, sports court and kids area are on the way.",
    },
    {
      es: "A diferencia de un lote, aquí se puede usar crédito hipotecario: el desarrollo acepta los esquemas de las instituciones. Si tu plan es rentar en corto, es de los pocos productos de la zona que sirve para eso sin obra de por medio.",
      en: "Unlike a lot, here you can use a mortgage: the development accepts institutional financing. If short-term rental is your plan, this is one of the few products in the area that works for it with no construction involved.",
    },
  ],
  ubicacion: {
    direccion: "Colinas del Golfo 377, 22760 Ensenada, Baja California",
    tiemposClave: [],
  },
  amenidades: [
    { icono: "seguridad", texto: { es: "Acceso controlado 24/7 con caseta de vigilancia", en: "24/7 controlled access with a guard booth" } },
    { icono: "planeacion", texto: { es: "Clusters privados con acceso automático", en: "Private clusters with automatic access" } },
    { icono: "servicios", texto: { es: "Iluminación solar en áreas comunes", en: "Solar lighting in common areas" } },
    { icono: "parque", texto: { es: "Casa club y terraza", en: "Clubhouse and terrace" } },
    { icono: "deporte", texto: { es: "Próximamente: eco parque, zona de asadores, cancha deportiva y área de niños", en: "Coming soon: eco park, grill zone, sports court and kids area" } },
    { icono: "vista", texto: { es: "Roof garden en los dos modelos", en: "Roof garden on both models" } },
  ],
  inventario: {
    etiqueta: { es: "Casas de 2 y 3 recámaras", en: "Two and three bedroom homes" },
    superficieMin: 110,
    superficieMax: pendiente("superficie de terreno del modelo Terra Plus"),
    precioDesde: 3275000,
    moneda: "MXN",
    notaLegal: SITIO.legal.leyendaProyectos,
  },
  financiamiento: {
    plazosMeses: [120, 180, 240],
    esquema: {
      es: "Se aceptan créditos hipotecarios de las instituciones. Los plazos y la mensualidad dependen de tu institución y de tu perfil, así que se cotizan caso por caso.",
      en: "Institutional mortgages are accepted. Terms and monthly payments depend on your lender and your profile, so they are quoted case by case.",
    },
    nota: {
      es: "El precio de lista no incluye gastos notariales ni otros gastos de cierre.",
      en: "List prices do not include notarial or other closing costs.",
    },
  },
  listaPrecios: {
    etiqueta: { es: "Lista vigente", en: "Current list" },
    nota: {
      es: "Precios publicados por el desarrollo en su propio sitio. No incluyen gastos notariales u otros. Sujetos a cambio sin previo aviso y a disponibilidad de modelo.",
      en: "Prices published by the development on its own site. They exclude notarial and other costs. Subject to change without notice and to model availability.",
    },
    zonas: [
      {
        nombre: { es: "Modelos", en: "Models" },
        tipos: [
          { nombre: "Gea · 2 recámaras", superficieMin: 110.5, precio: 3275000 },
          { nombre: "Terra Plus · 3 recámaras", superficieMin: 110.5, precio: 3875000 },
        ],
      },
    ],
  },
  galeria: [],
  faq: [
    {
      p: { es: "¿Cuál es la diferencia entre Gea y Terra Plus?", en: "What's the difference between Gea and Terra Plus?" },
      r: {
        es: "Gea es de dos recámaras y Terra Plus de tres. Gea tiene 92.48 m² de construcción sobre 110.50 m² de terreno, con sala, comedor, cocina, patio trasero, área de lavado, medio baño y cajones para dos coches en planta baja, y arriba recámara principal con baño y vestidor, recámara secundaria con baño y roof garden.",
        en: "Gea has two bedrooms and Terra Plus has three. Gea is 92.48 m² of construction on a 110.50 m² lot, with living room, dining room, kitchen, back patio, laundry, half bath and parking for two cars on the ground floor, plus a primary bedroom with bath and walk-in closet, a second bedroom with bath and a roof garden upstairs.",
      },
    },
    {
      p: { es: "¿Puedo usar crédito hipotecario?", en: "Can I use a mortgage?" },
      r: {
        es: "Sí. El desarrollo acepta los esquemas de crédito de las instituciones. La mensualidad depende de tu institución y de tu perfil, así que se cotiza caso por caso y te ayudo a armar el expediente.",
        en: "Yes. The development accepts institutional mortgage schemes. The monthly payment depends on your lender and your profile, so it is quoted case by case and I help you put the file together.",
      },
    },
    {
      p: { es: "¿Qué amenidades están listas y cuáles no?", en: "Which amenities are ready and which aren't?" },
      r: {
        es: "La casa club, la terraza, el acceso controlado con caseta y la iluminación solar están. El eco parque, la zona de asadores, la cancha deportiva y el área de niños están anunciados como próximos, y así te los cuento: como próximos, no como hechos.",
        en: "The clubhouse, the terrace, the controlled access with a guard booth and the solar lighting are in place. The eco park, grill zone, sports court and kids area are announced as coming, and that is how I present them: as coming, not as done.",
      },
    },
    {
      p: { es: "¿Sirve para rentar en Airbnb?", en: "Does it work for Airbnb?" },
      r: {
        es: "El desarrollo se promueve también para ese uso. Antes de comprar con ese plan conviene revisar el reglamento del condominio y correr los números de ocupación, y eso lo hacemos juntos.",
        en: "The development is also marketed for that use. Before buying with that plan it is worth reviewing the condominium rules and running occupancy numbers, and we do that together.",
      },
    },
  ],
  whatsapp: {
    keyword: "GAIA",
    mensajePrefill: {
      es: "Hola Fran, me interesa Gaia Residencial en Ensenada. ¿Me pasas disponibilidad de modelos y el esquema de crédito?",
      en: "Hi Fran, I'm interested in Gaia Residencial in Ensenada. Could you send me model availability and the mortgage options?",
    },
  },
  seo: {
    title: {
      es: "Gaia Residencial · Casas nuevas en Ensenada desde $3,275,000",
      en: "Gaia Residencial · New homes in Ensenada from $3,275,000 MXN",
    },
    description: {
      es: "Casas nuevas de 2 y 3 recámaras con roof garden en Colinas del Golfo, Ensenada. Clusters privados, acceso controlado 24/7, casa club y crédito hipotecario aceptado.",
      en: "New two and three bedroom homes with roof gardens in Colinas del Golfo, Ensenada. Private clusters, 24/7 controlled access, clubhouse and mortgages accepted.",
    },
  },
});
