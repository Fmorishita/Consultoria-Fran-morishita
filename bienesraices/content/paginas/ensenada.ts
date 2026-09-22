/**
 * Por qué Ensenada: el argumento de inversión y el estilo de vida.
 * Sin cifras inventadas: aquí no hay porcentajes de plusvalía ni tiempos
 * de traslado que no pueda respaldar. El `icono` mapea a src/lib/iconos.ts.
 */
export const ENSENADA = {
  inversion: {
    titulo: { es: "Por qué esta costa\ny no otra", en: "Why this coast\nand no other" },
    texto: {
      es: "Ensenada no es una playa de temporada. Es una ciudad con puerto de altura, valle vinícola a media hora y un comprador que llega de los dos lados de la frontera.",
      en: "Ensenada is not a seasonal beach town. It's a city with a deep-water port, a wine valley half an hour away and buyers arriving from both sides of the border.",
    },
    razones: [
      {
        icono: "frontera",
        titulo: { es: "Demanda de los dos lados", en: "Demand from both sides" },
        texto: {
          es: "Compradores mexicanos y californianos buscan lo mismo: costa del Pacífico a precio mexicano, a unas horas de San Diego. Tu salida no depende de un solo mercado.",
          en: "Mexican and Californian buyers want the same thing: Pacific coastline at Mexican prices, a few hours from San Diego. Your exit doesn't depend on a single market.",
        },
      },
      {
        icono: "vista",
        titulo: { es: "La vista no se fabrica", en: "Views can't be manufactured" },
        texto: {
          es: "La franja con vista al mar es finita y se coloca primero. Dentro de un desarrollo cerrado, el lote de primera fila es el que marca el precio de todo lo que queda detrás.",
          en: "Ocean-view land is finite and sells first. Inside a gated development, the front-row lot sets the price for everything behind it.",
        },
      },
      {
        icono: "puerto",
        titulo: { es: "Economía que no para en invierno", en: "An economy that doesn't stop in winter" },
        texto: {
          es: "Puerto de altura, agricultura del valle, pesca, cruceros y turismo enológico durante todo el año. La ciudad tiene motor propio, no solo temporada alta.",
          en: "A deep-water port, valley agriculture, fishing, cruise ships and year-round wine tourism. The city runs on its own engine, not just high season.",
        },
      },
      {
        icono: "llave",
        titulo: { es: "Entrada sin banco", en: "No bank required" },
        texto: {
          es: "Comprar tierra urbanizada con financiamiento directo del desarrollo deja el capital trabajando sin trámite bancario ni historial crediticio en México.",
          en: "Buying urbanized land with financing straight from the developer puts your capital to work without a bank process or Mexican credit history.",
        },
      },
    ],
  },
  estilo: {
    titulo: { es: "La vida aquí", en: "Life here" },
    texto: {
      es: "Lo que compras no termina en la barda del lote: es a qué hora sales a caminar y qué tienes a veinte minutos de la puerta.",
      en: "What you buy doesn't stop at the property line: it's what your afternoons look like and what sits twenty minutes from your door.",
    },
    items: [
      {
        icono: "vino",
        titulo: { es: "El Valle de Guadalupe al lado", en: "Valle de Guadalupe next door" },
        texto: {
          es: "La región vinícola más importante de México, con bodegas y mesas de nivel internacional, está a un paseo en coche.",
          en: "Mexico's most important wine region, with world-class wineries and tables, is a short drive away.",
        },
      },
      {
        icono: "ola",
        titulo: { es: "Mar de diario", en: "The ocean, daily" },
        texto: {
          es: "Pesca, surf, kayak y playa abierta sin fila ni reservación. El Pacífico es el patio de la ciudad, no un plan de fin de semana.",
          en: "Fishing, surfing, kayaking and open beach with no lines or reservations. The Pacific is the city's backyard, not a weekend plan.",
        },
      },
      {
        icono: "mesa",
        titulo: { es: "Mesa de Baja Med", en: "The Baja Med table" },
        texto: {
          es: "Mariscos, producto del valle y la cocina Baja Med que puso a esta costa en el mapa gastronómico del país.",
          en: "Seafood, valley produce and the Baja Med cooking that put this coast on the country's culinary map.",
        },
      },
      {
        icono: "clima",
        titulo: { es: "Clima que se agradece", en: "Weather you notice" },
        texto: {
          es: "Mediterráneo: veranos secos, inviernos templados y brisa del Pacífico prácticamente todo el año.",
          en: "Mediterranean: dry summers, mild winters and Pacific breeze practically year-round.",
        },
      },
    ],
  },
} as const;
