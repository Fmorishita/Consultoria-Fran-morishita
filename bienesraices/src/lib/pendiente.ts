import type { I18n, Idioma } from "@/lib/i18n";

/**
 * Marcador para datos que Fran todavía no confirma.
 * Regla del brief: nunca inventar cifras. Si falta un dato se escribe
 * `pendiente("descripción")` en el archivo de contenido y la sección
 * correspondiente simplemente no se pinta en producción.
 */
export type Pendiente = `[CONFIRMAR: ${string}]`;

/** Valor de contenido que puede estar confirmado o pendiente. */
export type Quiza<T> = T | Pendiente | undefined;

export const REGEX_PENDIENTE = /^\[CONFIRMAR:\s*[\s\S]+\]$/;

export function pendiente(descripcion: string): Pendiente {
  return `[CONFIRMAR: ${descripcion}]`;
}

export function pendienteI18n(descripcion: string): I18n {
  const marca = pendiente(descripcion);
  return { es: marca, en: marca };
}

export function esPendiente(valor: unknown): valor is Pendiente {
  return typeof valor === "string" && REGEX_PENDIENTE.test(valor.trim());
}

/** Descripción legible de lo que falta, o undefined si el dato está listo. */
export function queFalta(valor: Quiza<I18n | string | number>): string | undefined {
  const crudo = typeof valor === "object" && valor !== null ? valor.es : valor;
  if (!esPendiente(crudo)) return undefined;
  return crudo.trim().replace(/^\[CONFIRMAR:\s*/, "").replace(/\]$/, "");
}

/** Texto listo para pintar, o undefined si está pendiente. */
export function texto(valor: Quiza<I18n | string>, idioma: Idioma): string | undefined {
  if (valor === undefined) return undefined;
  if (typeof valor === "string") return esPendiente(valor) ? undefined : valor;
  const elegido = valor[idioma];
  return esPendiente(elegido) ? undefined : elegido;
}

/** Número listo para pintar, o undefined si está pendiente. */
export function numero(valor: Quiza<number>): number | undefined {
  return typeof valor === "number" ? valor : undefined;
}

/** Lista sin los elementos que siguen pendientes. */
export function soloListos<T>(lista: readonly T[] | undefined, listo: (item: T) => boolean): T[] {
  return (lista ?? []).filter(listo);
}

/**
 * En los deploys de preview se pintan chips ámbar con lo que falta,
 * para que Fran vea de un vistazo qué datos tiene que pasarme.
 * En producción (`NEXT_PUBLIC_MOSTRAR_PENDIENTES` sin valor) no se pinta nada.
 */
export const MOSTRAR_PENDIENTES = process.env.NEXT_PUBLIC_MOSTRAR_PENDIENTES === "1";

/** ¿Hay algo que enseñar en esta sección? */
export function haySeccion(...valores: Array<string | number | undefined | unknown[]>): boolean {
  const hayDato = valores.some((v) => (Array.isArray(v) ? v.length > 0 : v !== undefined));
  return hayDato || MOSTRAR_PENDIENTES;
}
