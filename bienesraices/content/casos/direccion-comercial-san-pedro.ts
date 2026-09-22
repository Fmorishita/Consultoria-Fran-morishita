import { esquemaCaso, type Caso } from "@contenido/esquemas";
import { pendienteI18n } from "@/lib/pendiente";

export const direccionComercialSanPedro: Caso = esquemaCaso.parse({
  slug: "direccion-comercial-san-pedro",
  activo: true,
  cliente: "Gus Marcos",
  anonimo: false,
  sector: {
    es: "Desarrollo residencial · San Pedro Garza García, N.L.",
    en: "Residential development · San Pedro Garza García, N.L.",
  },
  periodo: "2 años",
  titulo: {
    es: "Dirección comercial de un desarrollador en San Pedro",
    en: "Sales direction for a developer in San Pedro",
  },
  resumen: {
    es: "Dos años al frente de la comercialización de un desarrollador de Nuevo León: demanda, filtro y cierre trabajando como una sola operación.",
    en: "Two years running a Nuevo León developer's demand machine: paid media, qualification and closing working as a single system.",
  },
  reto: [
    pendienteI18n("párrafo del reto: cómo vendía el desarrollador antes de trabajar juntos y qué lo frenaba"),
  ],
  sistema: [
    {
      titulo: { es: "Demanda propia y constante", en: "Demand of our own, constantly" },
      detalle: {
        es: "Campañas propias para llenar el pipeline todos los días, no depender de referidos ni de portales.",
        en: "In-house campaigns that fill the pipeline every day instead of relying on referrals or listing portals.",
      },
    },
    {
      titulo: { es: "Filtro antes de la visita", en: "Filtering before the visit" },
      detalle: {
        es: "Cada interesado se califica y se prioriza antes de ocupar la agenda. El vendedor habla con quien sí puede comprar.",
        en: "Every prospect is qualified and prioritized before taking up the calendar. Sales only talks to people who can actually buy.",
      },
    },
    {
      titulo: { es: "Cierre por videollamada", en: "Closing over video call" },
      detalle: {
        es: "Proceso de cierre remoto con guion, materiales y seguimiento definidos, medible de punta a punta.",
        en: "A remote closing process with a defined script, materials and follow-up, measurable end to end.",
      },
    },
  ],
  resultados: [
    {
      cifra: "+$70 MDP",
      etiqueta: { es: "en ventas en 2 años", en: "in sales over 2 years" },
      nota: {
        es: "Cifra declarada en video por Gus Marcos.",
        en: "Figure stated on video by Gus Marcos.",
      },
    },
  ],
  testimonioSlug: "gus-marcos",
  seo: {
    title: {
      es: "Caso: dirección comercial de un desarrollador en San Pedro",
      en: "Case: sales direction for a developer in San Pedro",
    },
    description: {
      es: "Cómo dirigí la comercialización de un desarrollador en San Pedro Garza García: demanda propia, filtro antes de la visita y un proceso de cierre escrito.",
      en: "How I ran a San Pedro developer's sales operation: demand of our own, filtering before the visit and a written closing process.",
    },
  },
});
