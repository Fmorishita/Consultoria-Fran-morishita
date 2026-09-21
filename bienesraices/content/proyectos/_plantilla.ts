import { esquemaProyecto, type Proyecto } from "@contenido/esquemas";
import { SITIO } from "@contenido/sitio";

/**
 * PLANTILLA — copia este archivo como `<slug>.ts`, llénalo y agrégalo
 * a la lista de `content/proyectos/index.ts`. Eso es todo: la landing
 * `/es/proyectos/<slug>` y `/en/proyectos/<slug>` se generan solas.
 *
 * Las secciones sin datos simplemente no se pintan. Para lo que falte,
 * usa `pendiente("qué falta")` en vez de inventar un dato.
 */
export const plantilla: Proyecto = esquemaProyecto.parse({
  slug: "mi-proyecto",
  activo: false,
  autorizado: false,
  nombre: "Mi proyecto",
  desarrollador: "Desarrolladora X",
  ciudad: "Ensenada, Baja California",
  tipo: "casas", // lotes | casas | departamentos | preventa | comercial
  estado: "preventa", // preventa | entrega-inmediata | en-construccion
  hero: {
    imagen: "/proyectos/mi-proyecto/hero.jpg",
    titulo: { es: "Titular de la landing", en: "Landing headline" },
    subtitulo: { es: "Una línea de apoyo", en: "One supporting line" },
  },
  pitch: [
    { es: "Primer párrafo.", en: "First paragraph." },
    { es: "Segundo párrafo.", en: "Second paragraph." },
  ],
  ubicacion: {
    direccion: "Calle y número, Ensenada, B.C.",
    coords: [31.8667, -116.5964],
    tiemposClave: [{ destino: { es: "Valle de Guadalupe", en: "Guadalupe Valley" }, minutos: 15 }],
  },
  amenidades: [{ icono: "agua", texto: { es: "Agua propia", en: "Own water supply" } }],
  inventario: {
    etiqueta: { es: "Casas de 2 recámaras", en: "2-bedroom homes" },
    superficieMin: 120,
    superficieMax: 240,
    precioDesde: 2400000,
    moneda: "MXN",
    notaLegal: SITIO.legal.leyendaProyectos,
  },
  financiamiento: {
    engancheMinPct: 20,
    plazosMeses: [12, 24, 36],
    tasaAnualPct: 0,
  },
  galeria: [{ src: "/proyectos/mi-proyecto/1.jpg", alt: { es: "Fachada", en: "Facade" } }],
  faq: [{ p: { es: "¿Cómo aparto?", en: "How do I reserve?" }, r: { es: "Respuesta.", en: "Answer." } }],
  whatsapp: {
    keyword: "MI-PROYECTO",
    mensajePrefill: { es: "Hola Fran, me interesa Mi Proyecto.", en: "Hi Fran, I'm interested in Mi Proyecto." },
  },
  seo: {
    title: { es: "Mi proyecto · Ensenada", en: "Mi proyecto · Ensenada" },
    description: { es: "Descripción para buscadores.", en: "Search description." },
  },
});
