'use client'

import { useEffect, useState } from 'react'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './icons'
import { t, type Lang } from '@/content/copy'
import type { WhatsAppContext } from '@/lib/whatsapp'

/**
 * Botón flotante permanente. Si la página le pasa una unidad, el mensaje sale
 * con los datos de esa unidad; si no, sale el mensaje genérico.
 * Aparece después de 240 px de scroll para no tapar el hero en móvil.
 */
export function WhatsAppFloat({ lang, ctx }: { lang: Lang; ctx?: WhatsAppContext }) {
  const c = t(lang)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > 240)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 transition-all duration-300 md:right-6 md:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <WhatsAppLink
        ctx={{ seccion: 'flotante', lang, ...ctx }}
        aria-label={c.whatsapp.aria}
        className="flex h-14 items-center gap-3 rounded-pill bg-gold px-5 text-navy shadow-lift transition-transform hover:scale-[1.03] md:h-15"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="hidden text-[0.8125rem] font-bold tracking-[0.08em] uppercase sm:inline">
          {c.whatsapp.flotante}
        </span>
      </WhatsAppLink>
    </div>
  )
}
