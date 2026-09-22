/**
 * Lo que de verdad frena una compra en esta costa, y a quién le pasa.
 *
 * OBJECIONES va arriba del todo: son las frases que un comprador dice en voz
 * baja antes de pedir una cita, y la página tiene que contestarlas antes de
 * enseñar inventario.
 *
 * PERSONAS cierra la página: cada perfil con el problema de fondo, no con el
 * dato demográfico. Sirve para que el visitante se reconozca y para que el
 * mensaje que me manda ya venga con contexto.
 *
 * Nada aquí lleva cifras: son objeciones y motivos, no estadísticas.
 */
export const OBJECIONES = {
  titulo: {
    es: "Lo que quieres saber\nantes de enamorarte\nde un lote",
    en: "What you want to know\nbefore you fall for\na piece of land",
  },
  texto: {
    es: "Encontrar la propiedad es la parte fácil. Estas son las seis preguntas que más me hacen, contestadas completas y por adelantado, para que llegues a la visita con lo importante ya resuelto.",
    en: "Finding the property is the easy part. These are the six questions I get asked most, answered in full and up front, so you arrive at the visit with the important things already settled.",
  },
  items: [
    {
      icono: "llave",
      duda: { es: "“¿Puedo ser dueño si no soy mexicano?”", en: "“Can I actually own it if I'm not Mexican?”" },
      respuesta: {
        es: "Sí. En la franja costera la propiedad se tiene mediante fideicomiso bancario: queda a tu nombre, la puedes heredar y la puedes vender. No es una renta larga ni un préstamo de nombre. Coordino ese trámite con la notaría y te explico cada firma antes de que la hagas.",
        en: "Yes. Along the coastal strip, property is held through a bank trust: it is in your name, you can pass it on and you can sell it. It is not a long lease or a borrowed name. I coordinate that process with the notary and explain every signature before you make it.",
      },
    },
    {
      icono: "planeacion",
      duda: { es: "“Me enseñan un render y el terreno no tiene ni calle”", en: "“They show me a render and the land has no street”" },
      respuesta: {
        es: "Por eso represento pocos inventarios. Lo que te muestro está urbanizado o tiene obra que se puede ir a ver hoy. Si algo todavía es promesa, te lo digo antes de la visita y no después del apartado.",
        en: "That is why I represent few inventories. What I show you is serviced or has construction you can go see today. If something is still a promise, I tell you before the visit, not after the deposit.",
      },
    },
    {
      icono: "numeros",
      duda: { es: "“El banco me dice que no, o me pide historial que no tengo aquí”", en: "“The bank says no, or asks for credit history I don't have here”" },
      respuesta: {
        es: "Los desarrollos que represento financian directo, sin institución bancaria de por medio. Eso significa sin historial crediticio en México, sin avalúo bancario y sin meses esperando una respuesta que puede ser no.",
        en: "The developments I represent finance directly, with no bank in between. That means no Mexican credit history, no bank appraisal and no months waiting for an answer that may be no.",
      },
    },
    {
      icono: "conversacion",
      duda: { es: "“Pregunto el precio y me pasan con otra persona”", en: "“I ask the price and get handed to someone else”" },
      respuesta: {
        es: "El precio de lista está publicado en la ficha, no detrás de un formulario. Y la conversación es conmigo de principio a fin: quien te enseña el lote es quien te acompaña a la notaría.",
        en: "List prices are published on the listing, not behind a form. And the conversation is with me from start to finish: whoever shows you the lot is whoever walks you to the notary.",
      },
    },
    {
      icono: "visita",
      duda: { es: "“Vivo lejos y no puedo venir cada fin de semana”", en: "“I live far away and can't come every weekend”" },
      respuesta: {
        es: "La mayoría de mis compradores está del otro lado de la frontera. El recorrido se hace en video con el levantamiento completo del lote, y el avance de obra te llega sin que tengas que cruzar cada vez.",
        en: "Most of my buyers are on the other side of the border. The tour happens on video with a full walkthrough of the lot, and construction updates reach you without crossing every time.",
      },
    },
    {
      icono: "posventa",
      duda: { es: "“Firmé, y el vendedor desapareció”", en: "“I signed, and the salesperson vanished”" },
      respuesta: {
        es: "Es la queja más común del gremio y la más fácil de evitar. Sigo disponible después de la escritura, para la entrega, el trámite pendiente y la pregunta de dentro de dos años. La posventa es parte del trato, no un favor.",
        en: "It is the most common complaint in this business and the easiest to avoid. I stay available after closing, for handover, for the pending paperwork and for the question two years from now. After-sale service is part of the deal, not a favor.",
      },
    },
  ],
} as const;

export const PERSONAS = {
  /** Encabeza la lista de propiedades recomendadas de cada perfil. */
  recomiendo: { es: "Lo que te enseñaría primero", en: "What I'd show you first" },
  titulo: { es: "¿En cuál de estos\nte reconoces?", en: "Which one of these\nis you?" },
  texto: {
    es: "Cuatro maneras distintas de llegar a esta costa, y cuatro problemas de fondo que no se parecen en nada. Dime cuál es el tuyo y la conversación empieza mucho más adelante.",
    en: "Four different ways of arriving at this coast, and four underlying problems that look nothing alike. Tell me which one is yours and the conversation starts much further along.",
  },
  items: [
    {
      icono: "frontera",
      perfil: { es: "Compras desde California", en: "You're buying from California" },
      problema: {
        es: "La costa que quieres en San Diego ya no existe a un precio que tenga sentido, y aquí sí. Lo que te frena no es el dinero: es que no conoces el sistema legal del otro país y nadie te lo explica sin apurarte a firmar.",
        en: "The coastline you want no longer exists in San Diego at a price that makes sense, and here it does. What stops you is not money: it is not knowing the legal system across the border, and nobody explaining it without rushing you to sign.",
      },
      respuesta: {
        es: "Te explico fideicomiso, impuestos y escrituración en inglés, con tiempo y antes de cualquier depósito.",
        en: "I walk you through the bank trust, taxes and closing in English, unhurried and before any deposit.",
      },
      recomienda: [
        {
          slug: "alta-tierra",
          razon: {
            es: "Pago directo con el desarrollo: 20% de enganche y el saldo en 12 o 24 meses sin intereses, sin banco ni historial en México.",
            en: "Direct payment with the development: 20% down and the balance over 12 or 24 interest-free months, no bank or Mexican credit history.",
          },
        },
      ],
    },
    {
      icono: "numeros",
      perfil: { es: "Quieres que tu dinero deje de perder valor", en: "You want your money to stop losing value" },
      problema: {
        es: "Tienes ahorro parado, no quieres un crédito y desconfías de los instrumentos que solo existen en una pantalla. Buscas un activo que puedas ir a pisar y que siga ahí si mañana cambia la tasa.",
        en: "You have savings sitting still, you don't want a loan and you distrust instruments that only exist on a screen. You want an asset you can stand on, one that is still there if rates move tomorrow.",
      },
      respuesta: {
        es: "Te paso números completos por lote, incluidos gastos de escrituración y mantenimiento, para que compares sin sorpresas.",
        en: "I give you complete numbers per lot, closing costs and dues included, so you can compare without surprises.",
      },
      recomienda: [
        {
          slug: "alta-tierra",
          razon: {
            es: "Tierra urbanizada con vista a la bahía. La franja con vista es finita y es la que marca el precio de lo demás.",
            en: "Serviced land with bay views. View land is finite, and it sets the price for everything behind it.",
          },
        },
        {
          slug: "residencial-diamante",
          razon: {
            es: "Casa dentro de la ciudad, a cuadras del Blvd. Costero, que funciona igual para vivirla que para rentarla.",
            en: "A home inside the city, blocks from Blvd. Costero, that works as well for living in as for renting out.",
          },
        },
      ],
    },
    {
      icono: "parque",
      perfil: { es: "Van a construir la casa de la familia", en: "You're building the family home" },
      problema: {
        es: "No buscas un fraccionamiento más. Quieres que tus hijos salgan a la calle sin que nadie tenga que vigilarlos, y quieres los servicios puestos hoy, no prometidos para la etapa que viene.",
        en: "You're not after one more subdivision. You want your kids on the street without anyone having to watch them, and you want services in place today, not promised for the next phase.",
      },
      respuesta: {
        es: "Recorremos el lote a la hora que importa y revisamos accesos, orientación y qué queda construido alrededor.",
        en: "We walk the lot at the hour that matters and check access, orientation and what gets built around you.",
      },
      recomienda: [
        {
          slug: "alta-tierra",
          razon: {
            es: "Lote urbanizado dentro de un fraccionamiento cerrado, con servicios desde hoy, para construir a su medida.",
            en: "A serviced lot inside a gated community, with utilities in place today, to build exactly what you want.",
          },
        },
        {
          slug: "gaia-residencial",
          razon: {
            es: "Si prefieren casa lista: modelo de tres recámaras con roof garden, casa club y clusters privados.",
            en: "If you'd rather move into a finished home: a three-bedroom model with a roof garden, clubhouse and private clusters.",
          },
        },
      ],
    },
    {
      icono: "clima",
      perfil: { es: "Preparas el retiro o la segunda residencia", en: "You're planning retirement or a second home" },
      problema: {
        es: "Quieres clima y calma sin quedarte aislado. Te pesa más la logística que el precio: qué tan cerca está el hospital, el aeropuerto y la frontera el día que haya que volver rápido.",
        en: "You want climate and quiet without being cut off. Logistics weigh more than price: how close the hospital, the airport and the border are on the day you need to get back fast.",
      },
      respuesta: {
        es: "Revisamos esa logística antes que el lote, porque es lo que decide si vas a usar la casa o a rentarla.",
        en: "We go through that logistics before the lot, because it decides whether you'll use the house or rent it out.",
      },
      recomienda: [
        {
          slug: "residencial-diamante",
          razon: {
            es: "Todo a minutos: hospitales, farmacias, supermercados y el malecón, sin depender del coche para lo diario.",
            en: "Everything minutes away: hospitals, pharmacies, supermarkets and the waterfront, without relying on the car for daily life.",
          },
        },
        {
          slug: "gaia-residencial",
          razon: {
            es: "Casa nueva sin obra de por medio, con acceso controlado las 24 horas y casa club.",
            en: "A new home with no construction to manage, 24-hour controlled access and a clubhouse.",
          },
        },
      ],
    },
  ],
} as const;
