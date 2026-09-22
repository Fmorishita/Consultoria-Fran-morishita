import { esquemaCifra, type Cifra } from "@contenido/esquemas";

/**
 * Lo que respalda el trabajo, en cifras. Cada una acepta una nota con su
 * origen. Se leen como resultado de comercialización, no como métricas
 * de campaña: el comprador no compra publicidad.
 */
export const TRACK_RECORD: Cifra[] = [
  {
    valor: 70,
    prefijo: "+$",
    sufijo: " MDP",
    etiqueta: {
      es: "colocados dirigiendo la comercialización de desarrollos, en dos años",
      en: "placed while directing development sales, over two years",
    },
    respaldo: {
      es: "Validado en video por Gus Marcos, desarrollador en San Pedro Garza García, N.L.",
      en: "Validated on video by Gus Marcos, a developer in San Pedro Garza García, N.L.",
    },
  },
  {
    valor: 10,
    prefijo: "+",
    sufijo: "",
    etiqueta: {
      es: "años al frente de la venta de proyectos propios y de clientes",
      en: "years running sales for my own projects and my clients'",
    },
  },
  {
    valor: 13,
    prefijo: "+$",
    sufijo: " MDD",
    etiqueta: {
      es: "facturados entre proyectos propios y de clientes",
      en: "billed across my own projects and my clients'",
    },
    soloDesarrolladores: true,
  },
].map((cifra) => esquemaCifra.parse(cifra));
