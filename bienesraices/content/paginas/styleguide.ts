export const STYLEGUIDE = {
  titulo: { es: "Dos direcciones visuales", en: "Two visual directions" },
  texto: {
    es: "Elige una y la aplico a todo el sitio cambiando `direccionVisual` en content/sitio.ts. Esta página no se indexa.",
    en: "Pick one and I'll apply it site-wide by changing `direccionVisual` in content/sitio.ts. This page is not indexed.",
  },
  direcciones: [
    {
      clave: "a",
      nombre: { es: "A · Tierra nocturna", en: "A · Night earth" },
      descripcion: {
        es: "Base oscura cálida, acento terracota, serif Fraunces. La fotografía manda y el texto flota encima. Se siente caro y nocturno; ideal para renders y tomas de atardecer.",
        en: "Warm dark base, terracotta accent, Fraunces serif. Photography leads and type floats over it. Feels expensive and nocturnal; ideal for renders and sunset shots.",
      },
      tipografia: "Fraunces + Inter",
    },
    {
      clave: "b",
      nombre: { es: "B · Crema profundo", en: "B · Deep cream" },
      descripcion: {
        es: "Fondo crema cálido, acento vino, serif Instrument. Más editorial y de galería, con mucho aire. Perfecto si la foto es poca y el texto tiene que sostener la página.",
        en: "Warm cream background, wine accent, Instrument serif. More editorial and gallery-like, with a lot of air. Perfect when photos are scarce and type has to carry the page.",
      },
      tipografia: "Instrument Serif + Inter",
    },
  ],
  muestra: {
    antetitulo: { es: "Ensenada, Baja California", en: "Ensenada, Baja California" },
    titular: { es: "Yo no espero al comprador.", en: "I don't wait for the buyer." },
    cuerpo: {
      es: "Genero demanda con Meta Ads, la califico con IA y CRM, y cierro por videollamada.",
      en: "I generate demand with Meta Ads, qualify it with AI and CRM, and close over video call.",
    },
    boton: { es: "Hablemos por WhatsApp", en: "Chat on WhatsApp" },
    secundario: { es: "Ver proyectos", en: "View properties" },
  },
} as const;
