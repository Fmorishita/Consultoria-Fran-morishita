/**
 * El recorrido de compra, de la primera pregunta a las llaves.
 * Se usa en el home y en cada ficha de propiedad: es el argumento
 * de oficio más fuerte que tenemos y no depende de ningún dato pendiente.
 */
export const PROCESO = {
  titulo: { es: "De la primera pregunta\na la escritura", en: "From the first question\nto the deed" },
  texto: {
    es: "Comprar en México desde California, o comprar tierra antes de construir, se vuelve simple cuando cada etapa tiene un responsable con nombre. Ese soy yo.",
    en: "Buying in Mexico from California, or buying land before you build, gets simple when every stage has a name attached to it. That name is mine.",
  },
  pasos: [
    {
      icono: "conversacion",
      titulo: { es: "Conversación inicial", en: "First conversation" },
      texto: {
        es: "Media hora para entender qué vas a hacer con la propiedad: vivirla, rentarla o sostenerla. De ahí sale qué te muestro y qué te ahorro.",
        en: "Half an hour to understand what the property is for: living, renting or holding. That decides what I show you and what I spare you.",
      },
    },
    {
      icono: "seleccion",
      titulo: { es: "Selección y números", en: "Shortlist and numbers" },
      texto: {
        es: "Te llega una lista corta con superficie, orientación, vista real y condiciones de pago vigentes de cada opción. Sin opciones de relleno.",
        en: "You get a short list with each option's size, orientation, actual view and current payment terms. No filler options.",
      },
    },
    {
      icono: "visita",
      titulo: { es: "Visita en sitio", en: "On-site visit" },
      texto: {
        es: "Recorremos los lotes a la hora que importa. Si estás fuera del país, la hacemos en video y te mando el levantamiento completo.",
        en: "We walk the lots at the hour that matters. If you're abroad, we do it on video and I send you the full walkthrough.",
      },
    },
    {
      icono: "apartado",
      titulo: { es: "Apartado y contrato", en: "Reservation and contract" },
      texto: {
        es: "Se firma el apartado del lote elegido y se revisa el contrato con tu abogado o con el notario que prefieras antes de cualquier depósito fuerte.",
        en: "You reserve the chosen lot and review the contract with your own attorney or notary before any significant deposit.",
      },
    },
    {
      icono: "escritura",
      titulo: { es: "Escrituración y entrega", en: "Closing and handover" },
      texto: {
        es: "Coordino notaría, fideicomiso si eres extranjero y entrega de expediente. Sigo disponible después de la firma: la posventa también es parte del trato.",
        en: "I coordinate the notary, the bank trust if you're a foreign buyer, and the handover of your file. I stay available after signing: after-sale service is part of the deal.",
      },
    },
  ],
} as const;
