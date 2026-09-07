'use client'

import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './icons'
import { t, type Lang } from '@/content/copy'
import type { WhatsAppContext } from '@/lib/whatsapp'

/**
 * Barra fija de la ficha de producto en móvil: precio siempre a la vista y el
 * CTA al alcance del pulgar. En escritorio no aparece porque el CTA lateral
 * de la ficha ya está visible.
 */
export function StickyUnitCta({
  lang,
  ctx,
  precio,
  titulo,
}: {
  lang: Lang
  ctx: WhatsAppContext
  precio: string
  titulo: string
}) {
  const c = t(lang)
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/35 bg-navy/97 backdrop-blur-sm md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <p className="shrink-0 font-display text-base leading-none font-bold whitespace-nowrap text-gold">
          <span className="sr-only">{titulo} — </span>
          {precio}
        </p>
        <WhatsAppLink
          ctx={ctx}
          className="btn btn-gold !min-h-12 flex-1 !px-3 text-[0.625rem] whitespace-nowrap"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {c.unidad.ctaSticky}
        </WhatsAppLink>
      </div>
    </div>
  )
}
