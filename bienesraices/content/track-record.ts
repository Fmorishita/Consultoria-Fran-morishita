import { esquemaCifra, type Cifra } from "@contenido/esquemas";
import { pendienteI18n } from "@/lib/pendiente";

/** Cifras del home. Cada una acepta una nota con su respaldo. */
export const TRACK_RECORD: Cifra[] = [
  {
    valor: 70,
    prefijo: "+$",
    sufijo: " MDP",
    etiqueta: {
      es: "en ventas dirigidas junto a Gus Marcos en 2 años",
      en: "in sales directed with Gus Marcos over 2 years",
    },
    respaldo: {
      es: "Validado en video por Gus Marcos, desarrollador en San Pedro Garza García, N.L.",
      en: "Validated on video by Gus Marcos, developer in San Pedro Garza García, N.L.",
    },
  },
  {
    valor: 10,
    prefijo: "+",
    sufijo: "",
    etiqueta: {
      es: "años dirigiendo marketing y ventas de negocios propios y de clientes",
      en: "years directing marketing and sales for my own and my clients' businesses",
    },
  },
  {
    valor: 13,
    prefijo: "+$",
    sufijo: " MDD",
    etiqueta: {
      es: "facturados entre negocios propios y de clientes",
      en: "billed across my own businesses and my clients'",
    },
    respaldo: pendienteI18n("respaldo público de la cifra de $13 MDD (¿qué negocios y en qué periodo?)"),
  },
].map((cifra) => esquemaCifra.parse(cifra));
