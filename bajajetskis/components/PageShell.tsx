import type { ReactNode } from 'react'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import type { Lang } from '@/content/copy'
import type { WhatsAppContext } from '@/lib/whatsapp'

type Pagina = 'home' | 'inventario' | 'taller' | 'contacto' | 'unidad'

export function PageShell({
  lang,
  pagina,
  slug,
  children,
  flotante = true,
  ctxFlotante,
}: {
  lang: Lang
  pagina: Pagina
  slug?: string
  children: ReactNode
  /** La ficha de producto usa su barra fija en móvil en lugar del botón redondo. */
  flotante?: boolean
  ctxFlotante?: WhatsAppContext
}) {
  return (
    <>
      <Nav lang={lang} pagina={pagina} slug={slug} />
      <main id="contenido">{children}</main>
      <Footer lang={lang} />
      {flotante && <WhatsAppFloat lang={lang} ctx={ctxFlotante} />}
    </>
  )
}
