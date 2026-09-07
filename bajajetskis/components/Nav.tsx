'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Wordmark } from './Brand'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './icons'
import { t, type Lang } from '@/content/copy'
import { r, rutaAlterna } from '@/lib/routes'

type Pagina = 'home' | 'inventario' | 'taller' | 'contacto' | 'unidad'

export function Nav({ lang, pagina, slug }: { lang: Lang; pagina: Pagina; slug?: string }) {
  const c = t(lang)
  const rutas = r(lang)
  const [abierto, setAbierto] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setAbierto(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  const enlaces: { href: string; label: string; activo: boolean }[] = [
    { href: rutas.inventario, label: c.nav.inventario, activo: pagina === 'inventario' || pagina === 'unidad' },
    { href: rutas.taller, label: c.nav.taller, activo: pagina === 'taller' },
    { href: rutas.contacto, label: c.nav.contacto, activo: pagina === 'contacto' },
  ]

  const alterna = rutaAlterna(lang, pagina === 'unidad' ? 'unidad' : pagina, slug)

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-navy">
      <a
        href="#contenido"
        className="sr-only rounded-xs bg-gold px-4 py-2 text-sm font-bold text-navy focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        {c.nav.saltarAlContenido}
      </a>

      <div className="shell flex h-18 items-center justify-between gap-4 py-3">
        <Wordmark lang={lang} />

        <nav aria-label={c.meta.siteName} className="hidden items-center gap-8 md:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              aria-current={e.activo ? 'page' : undefined}
              className={`text-[0.8125rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                e.activo ? 'text-gold' : 'text-parchment hover:text-gold'
              }`}
            >
              {e.label}
            </Link>
          ))}
          <Link
            href={alterna}
            hrefLang={lang === 'es' ? 'en' : 'es'}
            className="border border-gold/45 px-3 py-1.5 text-[0.6875rem] font-bold tracking-[0.14em] text-parchment uppercase transition-colors hover:border-gold hover:text-gold"
          >
            {c.nav.idioma}
          </Link>
          <WhatsAppLink
            ctx={{ seccion: 'hero', lang }}
            className="btn btn-gold !min-h-11 !px-5 !py-2.5 text-[0.75rem]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {c.nav.cta}
          </WhatsAppLink>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? c.nav.cerrar : c.nav.menu}
          className="flex h-11 w-11 items-center justify-center border border-gold/45 text-parchment md:hidden"
        >
          <span className="sr-only">{abierto ? c.nav.cerrar : c.nav.menu}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            {abierto ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {abierto && (
        <div id="menu-movil" className="border-t border-gold/25 bg-navy md:hidden">
          <nav className="shell flex flex-col py-4" aria-label={c.meta.siteName}>
            {enlaces.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                aria-current={e.activo ? 'page' : undefined}
                className={`border-b border-parchment/10 py-4 text-base font-semibold tracking-[0.12em] uppercase ${
                  e.activo ? 'text-gold' : 'text-parchment'
                }`}
              >
                {e.label}
              </Link>
            ))}
            <Link
              href={alterna}
              hrefLang={lang === 'es' ? 'en' : 'es'}
              className="border-b border-parchment/10 py-4 text-base font-semibold tracking-[0.12em] text-parchment uppercase"
            >
              {c.nav.idioma}
            </Link>
            <WhatsAppLink ctx={{ seccion: 'hero', lang }} className="btn btn-gold mt-5">
              <WhatsAppIcon />
              {c.nav.cta}
            </WhatsAppLink>
          </nav>
        </div>
      )}
    </header>
  )
}
