import type { Lang } from '@/content/copy'

/**
 * Rutas por idioma. El español vive en la raíz (es el mercado principal) y el
 * inglés cuelga de /en con sus propios slugs, para que Google indexe las dos
 * versiones por separado.
 */
export const rutas = {
  es: {
    home: '/',
    inventario: '/inventario',
    unidad: (slug: string) => `/inventario/${slug}`,
    taller: '/taller',
    contacto: '/contacto',
  },
  en: {
    home: '/en',
    inventario: '/en/inventory',
    unidad: (slug: string) => `/en/inventory/${slug}`,
    taller: '/en/workshop',
    contacto: '/en/contact',
  },
} as const

export function r(lang: Lang) {
  return rutas[lang]
}

/** El mismo contenido en el otro idioma, para el toggle y para hreflang. */
export function rutaAlterna(lang: Lang, pagina: keyof typeof rutas.es, slug?: string): string {
  const otro: Lang = lang === 'es' ? 'en' : 'es'
  const destino = rutas[otro][pagina]
  return typeof destino === 'function' ? destino(slug ?? '') : destino
}

export const SITE_URL = 'https://bajajetskis.com'
