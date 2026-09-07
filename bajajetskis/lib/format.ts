import { TIPO_DE_CAMBIO_MXN } from '@/data/inventario'
import type { Lang } from '@/content/copy'

const LOCALE: Record<Lang, string> = { es: 'es-MX', en: 'en-US' }

/**
 * "$11,800 USD" — el precio de lista, siempre en dólares.
 * El símbolo se pone a mano: `style: 'currency'` en es-MX escribe "USD 11,800",
 * y al añadir el sufijo quedaba "USD 11,800 USD".
 */
export function precioUSD(valor: number, lang: Lang = 'es'): string {
  const n = new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 0 }).format(valor)
  return `$${n} USD`
}

/** "$218,300" — referencia informativa en pesos al tipo de cambio del archivo de datos. */
export function precioMXN(valorUSD: number, lang: Lang = 'es'): string {
  const pesos = Math.round((valorUSD * TIPO_DE_CAMBIO_MXN) / 100) * 100
  return new Intl.NumberFormat(LOCALE[lang], {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(pesos)
}

/** Precio tal como se lee en la ficha, para que el mensaje coincida con la página. */
export function precioParaMensaje(valor: number): string {
  return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(valor)} USD`
}

export function numero(valor: number, lang: Lang = 'es'): string {
  return new Intl.NumberFormat(LOCALE[lang]).format(valor)
}
