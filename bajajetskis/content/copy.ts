import { es } from './copy.es'
import { en } from './copy.en'

export type Lang = 'es' | 'en'

export type { Copy, RangoPrecioId } from './copy.es'

export const LANGS: Lang[] = ['es', 'en']

export const copy = { es, en } as const

export function t(lang: Lang) {
  return copy[lang]
}

/** Texto bilingüe que vive en los datos (inventario, testimonios). */
export function pick(texto: { es: string; en: string }, lang: Lang): string {
  return texto[lang]
}

/** Rellena {llaves} en las cadenas de copy que dependen de datos. */
export function fill(plantilla: string, valores: Record<string, string | number>): string {
  return plantilla.replace(/\{(\w+)\}/g, (_, k: string) =>
    k in valores ? String(valores[k]) : `{${k}}`,
  )
}
