export const IDIOMAS = ["es", "en"] as const;

export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = "es";

/** Texto con sus dos versiones. Nada se traduce automáticamente. */
export type I18n = { es: string; en: string };

export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}

export function normalizaIdioma(valor: string | undefined): Idioma {
  return valor && esIdioma(valor) ? valor : IDIOMA_POR_DEFECTO;
}

/** Devuelve el texto del idioma pedido. */
export function t(valor: I18n, idioma: Idioma): string {
  return valor[idioma];
}

/** Locale completo, para Intl y para la etiqueta `lang`. */
export function localeCompleto(idioma: Idioma): string {
  return idioma === "es" ? "es-MX" : "en-US";
}

/** Misma ruta en el otro idioma. */
export function rutaEnIdioma(ruta: string, idioma: Idioma): string {
  const limpia = ruta.replace(/^\/(es|en)(?=\/|$)/, "");
  return `/${idioma}${limpia || ""}`;
}
