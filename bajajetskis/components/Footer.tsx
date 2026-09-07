import Link from 'next/link'
import { Emblem } from './Brand'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon, SunburstRule } from './icons'
import { t, pick, type Lang } from '@/content/copy'
import { r } from '@/lib/routes'
import { NEGOCIO } from '@/data/inventario'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'

export function Footer({ lang }: { lang: Lang }) {
  const c = t(lang)
  const rutas = r(lang)
  const anio = new Date().getFullYear()

  return (
    <footer className="bg-navy text-parchment">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-10">
          <div className="max-w-xs">
            <Emblem size={120} />
            <p className="mt-5 text-sm leading-relaxed text-parchment/75">{c.footer.descripcion}</p>
          </div>

          <nav aria-label={c.footer.navTitulo}>
            <h2 className="text-h3 font-bold tracking-[0.18em] text-gold uppercase">
              {c.footer.navTitulo}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: rutas.home, label: c.nav.inicio },
                { href: rutas.inventario, label: c.nav.inventario },
                { href: rutas.taller, label: c.nav.taller },
                { href: rutas.contacto, label: c.nav.contacto },
              ].map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-parchment/80 transition-colors hover:text-gold">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-h3 font-bold tracking-[0.18em] text-gold uppercase">
              {c.footer.contactoTitulo}
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-parchment/80">
              <li>
                <WhatsAppLink
                  ctx={{ seccion: 'contacto', lang }}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {WHATSAPP_DISPLAY}
                </WhatsAppLink>
              </li>
              <li>{NEGOCIO.direccion}</li>
              <li>
                {NEGOCIO.ciudad}, {NEGOCIO.estado}
              </li>
              <li>{c.ctaFinal.horario}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h3 font-bold tracking-[0.18em] text-gold uppercase">
              {c.footer.zonaTitulo}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-parchment/80">{c.footer.zonas}</p>
            <p className="mt-4 text-sm text-parchment/80">
              {pick({ es: 'Horario', en: 'Hours' }, lang)}:{' '}
              {NEGOCIO.horario
                .map((h) => `${pick(h.dias, lang)} ${typeof h.horas === 'string' ? h.horas : pick(h.horas, lang)}`)
                .join(' · ')}
            </p>
          </div>
        </div>

        <SunburstRule className="mt-14 w-full max-w-60 text-gold/60" />

        <div className="mt-6 space-y-4 text-xs leading-relaxed text-parchment/55">
          <p>{c.footer.marcas}</p>
          <p>
            © {anio} {c.meta.siteName}. {c.footer.derechos} {NEGOCIO.ciudad}, {NEGOCIO.estado},{' '}
            {NEGOCIO.pais}.
          </p>
        </div>
      </div>
    </footer>
  )
}
