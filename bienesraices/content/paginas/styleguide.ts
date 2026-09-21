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
        es: "Base oscura cálida, acento terracota, serif Playfair Display. La fotografía manda y el texto flota encima. Se siente caro y nocturno; ideal para renders y tomas de atardecer.",
        en: "Warm dark base, terracotta accent, Playfair Display serif. Photography leads and type floats over it. Feels expensive and nocturnal; ideal for renders and sunset shots.",
      },
      tipografia: "Playfair Display + Geist",
    },
    {
      clave: "b",
      nombre: { es: "B · Piedra clara", en: "B · Light stone" },
      descripcion: {
        es: "Fondo piedra fría, acento verde profundo, serif EB Garamond. Más editorial y de galería, con mucho aire. Perfecto si la foto es poca y el texto tiene que sostener la página.",
        en: "Cool stone background, deep green accent, EB Garamond serif. More editorial and gallery-like, with a lot of air. Perfect when photos are scarce and type has to carry the page.",
      },
      tipografia: "EB Garamond + Geist",
    },
  ],
  muestra: {
    antetitulo: { es: "Ensenada, Baja California", en: "Ensenada, Baja California" },
    titular: { es: "Yo no espero al comprador.", en: "I don't wait for the buyer." },
    cuerpo: {
      es: "Genero demanda con Meta Ads, la califico con IA y CRM, y cierro por videollamada.",
      en: "I generate demand with Meta Ads, qualify it with AI and CRM, and close over video call.",
    },
    boton: { es: "Escríbeme por WhatsApp", en: "Message me on WhatsApp" },
    secundario: { es: "Ver proyectos", en: "View properties" },
  },
} as const;
