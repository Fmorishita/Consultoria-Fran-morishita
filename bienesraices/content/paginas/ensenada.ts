/**
 * Por qué Ensenada: el argumento de inversión y el estilo de vida.
 * Sin cifras inventadas: aquí no hay porcentajes de plusvalía ni tiempos
 * de traslado que no pueda respaldar.
 */
export const ENSENADA = {
  inversion: {
    titulo: { es: "Por qué comprar en Ensenada", en: "Why buy in Ensenada" },
    texto: {
      es: "No es una playa de temporada. Es una ciudad con puerto, valle vinícola y un comprador que llega de los dos lados de la frontera.",
      en: "This isn't a seasonal beach town. It's a city with a port, a wine valley and buyers arriving from both sides of the border.",
    },
    razones: [
      {
        titulo: { es: "Demanda de los dos lados", en: "Demand from both sides" },
        texto: {
          es: "Compradores mexicanos y californianos buscan lo mismo: costa del Pacífico a precio mexicano, a unas horas de San Diego. Tu salida no depende de un solo mercado.",
          en: "Mexican and Californian buyers want the same thing: Pacific coastline at Mexican prices, a few hours from San Diego. Your exit doesn't depend on a single market.",
        },
      },
      {
        titulo: { es: "La vista no se fabrica", en: "Views can't be manufactured" },
        texto: {
          es: "La franja con vista al mar es finita y se coloca primero. En un desarrollo cerrado, el lote de primera fila es el que marca el precio de los demás.",
          en: "Ocean-view land is finite and sells first. Inside a gated development, the front-row lot sets the price for everything behind it.",
        },
      },
      {
        titulo: { es: "Economía que no para en invierno", en: "An economy that doesn't stop in winter" },
        texto: {
          es: "Puerto de altura, agricultura del valle, pesca, cruceros y turismo enológico todo el año. La ciudad tiene actividad propia, no solo temporada alta.",
          en: "A deep-water port, valley agriculture, fishing, cruise ships and year-round wine tourism. The city runs on its own engine, not just high season.",
        },
      },
      {
        titulo: { es: "Entrada sin banco", en: "No bank required" },
        texto: {
          es: "Comprar tierra en preventa urbanizada con financiamiento directo del desarrollo deja el capital trabajando sin trámite bancario ni historial en México.",
          en: "Buying urbanized land with financing straight from the developer puts your capital to work without a bank process or Mexican credit history.",
        },
      },
    ],
  },
  estilo: {
    titulo: { es: "La vida aquí", en: "Life here" },
    texto: {
      es: "Lo que compras no es solo el lote: es a qué hora sales a caminar y qué hay a veinte minutos de tu puerta.",
      en: "You're not only buying the lot: you're buying what your afternoons look like and what sits twenty minutes from your door.",
    },
    items: [
      {
        titulo: { es: "El Valle de Guadalupe al lado", en: "Valle de Guadalupe next door" },
        texto: {
          es: "La región vinícola más importante de México, con bodegas y restaurantes de nivel internacional, está a un paseo en coche.",
          en: "Mexico's most important wine region, with world-class wineries and restaurants, is a short drive away.",
        },
      },
      {
        titulo: { es: "Mar de diario", en: "The ocean, daily" },
        texto: {
          es: "Pesca, surf, kayak y playa abierta sin fila ni reservación. El Pacífico es el patio de la ciudad, no un plan de fin de semana.",
          en: "Fishing, surfing, kayaking and open beach with no lines or reservations. The Pacific is the city's backyard, not a weekend plan.",
        },
      },
      {
        titulo: { es: "Mesa de Baja Med", en: "The Baja Med table" },
        texto: {
          es: "Mariscos, producto del valle y cocina Baja Med que puso a esta costa en el mapa gastronómico.",
          en: "Seafood, valley produce and the Baja Med cooking that put this coast on the culinary map.",
        },
      },
      {
        titulo: { es: "Clima que se agradece", en: "Weather you notice" },
        texto: {
          es: "Clima mediterráneo: veranos secos, inviernos templados y brisa del Pacífico casi todo el año.",
          en: "A Mediterranean climate: dry summers, mild winters and Pacific breeze most of the year.",
        },
      },
    ],
  },
} as const;
