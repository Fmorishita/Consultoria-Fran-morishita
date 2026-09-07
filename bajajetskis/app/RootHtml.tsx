import type { ReactNode } from 'react'
import { fontVariables } from './fonts'
import { LocalBusinessJsonLd } from '@/components/JsonLd'
import type { Lang } from '@/content/copy'

/**
 * Cada idioma tiene su propio layout raíz para que el atributo `lang` del
 * <html> sea correcto desde el HTML servido, no parchado en el navegador.
 */
export function RootHtml({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang === 'es' ? 'es-MX' : 'en-US'} className={fontVariables}>
      <body className="min-h-dvh bg-parchment antialiased">
        {children}
        <LocalBusinessJsonLd lang={lang} />
      </body>
    </html>
  )
}
