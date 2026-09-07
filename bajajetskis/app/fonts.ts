import { Cinzel_Decorative, Montserrat } from 'next/font/google'

/**
 * Las dos familias del manual (§04):
 *   Primaria display  → Cinzel Decorative (fallback impreso: Georgia Bold)
 *   Secundaria lectura → Montserrat (fallback: Helvetica Neue)
 */
export const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-cinzel',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})

export const fontVariables = `${cinzel.variable} ${montserrat.variable}`
