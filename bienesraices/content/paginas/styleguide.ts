export const STYLEGUIDE = {
  titulo: { es: "Dos direcciones visuales", en: "Two visual directions" },
  texto: {
    es: "Elige una y la aplico a todo el sitio cambiando `direccionVisual` en content/sitio.ts. Esta página no se indexa.",
    en: "Pick one and I'll apply it site-wide by changing `direccionVisual` in content/sitio.ts. This page is not indexed.",
  },
  direcciones: [
    {
      clave: "a",
      nombre: { es: "A · Marea nocturna", en: "A · Night tide" },
      descripcion: {
        es: "Tinta de mar profundo con latón como único color saturado. La fotografía manda y el texto flota encima. Es el registro de las casas de subasta: caro, sobrio y difícil de confundir con una agencia.",
        en: "Deep sea ink with brass as the only saturated color. Photography leads and type floats over it. This is auction-house register: expensive, sober and hard to mistake for an agency.",
      },
      tipografia: "Cormorant Garamond + Geist",
    },
    {
      clave: "b",
      nombre: { es: "B · Luz de sal", en: "B · Salt light" },
      descripcion: {
        es: "Alabastro cálido, tinta y latón oscuro. Más editorial y de galería, con mucho aire. Funciona mejor si la fotografía es poca y el texto tiene que sostener la página.",
        en: "Warm alabaster, ink and dark brass. More editorial and gallery-like, with a lot of air. It works better when photography is scarce and type has to carry the page.",
      },
      tipografia: "Cormorant Garamond + Geist",
    },
  ],
  muestra: {
    antetitulo: { es: "Ensenada, Baja California", en: "Ensenada, Baja California" },
    titular: { es: "Comprar la vista antes que la casa.", en: "Buy the view before the house." },
    cuerpo: {
      es: "Lotes urbanizados con vista permanente al Pacífico, dentro de un fraccionamiento cerrado.",
      en: "Urbanized lots with permanent Pacific views, inside a gated community.",
    },
    boton: { es: "Conocer el desarrollo", en: "Explore the development" },
    secundario: { es: "Agendar una visita", en: "Book a visit" },
  },
} as const;
