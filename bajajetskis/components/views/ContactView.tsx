import Image from 'next/image'
import { PageShell } from '../PageShell'
import { PageHeader } from '../PageHeader'
import { WhatsAppLink } from '../WhatsAppLink'
import { WhatsAppIcon, PinIcon, ClockIcon, ArrowIcon } from '../icons'
import { t, pick, type Lang } from '@/content/copy'
import { NEGOCIO } from '@/data/inventario'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'
import { FOTOS_PLACEHOLDER } from '@/data/placeholder-content'

const MAPA_URL = `https://www.google.com/maps/search/?api=1&query=${NEGOCIO.lat},${NEGOCIO.lng}`

export function ContactView({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <PageShell lang={lang} pagina="contacto">
      <PageHeader eyebrow={c.contacto.eyebrow} titulo={c.contacto.titulo} parrafo={c.contacto.parrafo} />

      <section className="bg-parchment py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="space-y-6">
            <div className="border-l-2 border-gold bg-white p-7">
              <h2 className="text-h3 font-bold tracking-[0.14em] text-navy uppercase">
                {c.contacto.whatsappTitulo}
              </h2>
              <p className="mt-3 text-body leading-relaxed text-ink">{c.contacto.whatsappTexto}</p>
              <p className="mt-5 font-display text-2xl font-bold text-navy">{WHATSAPP_DISPLAY}</p>
              <WhatsAppLink ctx={{ seccion: 'contacto', lang }} className="btn btn-primary mt-5">
                <WhatsAppIcon className="h-4 w-4" />
                {c.contacto.cta}
              </WhatsAppLink>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card p-6">
                <h2 className="flex items-center gap-2 text-h3 font-bold tracking-[0.14em] text-navy uppercase">
                  <PinIcon className="h-4 w-4 text-navy" />
                  {c.contacto.ubicacionTitulo}
                </h2>
                <address className="mt-4 text-body leading-relaxed text-ink not-italic">
                  {NEGOCIO.direccion}
                  <br />
                  {NEGOCIO.ciudad}, {NEGOCIO.estado}
                  <br />
                  {NEGOCIO.pais}
                </address>
                <a
                  href={MAPA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                >
                  {c.contacto.mapaTitulo}
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="card p-6">
                <h2 className="flex items-center gap-2 text-h3 font-bold tracking-[0.14em] text-navy uppercase">
                  <ClockIcon className="h-4 w-4 text-navy" />
                  {c.contacto.horarioTitulo}
                </h2>
                <dl className="mt-4 space-y-2 text-body text-ink">
                  {NEGOCIO.horario.map((h) => (
                    <div key={pick(h.dias, lang)} className="flex justify-between gap-4">
                      <dt>{pick(h.dias, lang)}</dt>
                      <dd className="font-semibold text-navy">
                        {typeof h.horas === 'string' ? h.horas : pick(h.horas, lang)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="card p-7">
              <h2 className="text-h3 font-bold tracking-[0.14em] text-navy uppercase">
                {c.contacto.coberturaTitulo}
              </h2>
              <p className="mt-3 text-body leading-relaxed text-ink">{c.contacto.coberturaTexto}</p>
            </div>
          </div>

          <div>
            <a
              href={MAPA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-3/4 overflow-hidden border border-navy/12 bg-navy"
              aria-label={c.contacto.mapaTitulo}
            >
              {/* PLACEHOLDER — sustituir por foto real del punto de entrega en el Estero */}
              <Image
                src={FOTOS_PLACEHOLDER.estero}
                alt={c.contacto.mapaAlt}
                fill
                sizes="(min-width: 1024px) 500px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-navy/90 px-5 py-4">
                <span className="text-h3 font-bold tracking-[0.12em] text-gold uppercase">
                  {NEGOCIO.ciudad}, {NEGOCIO.estado}
                </span>
                <ArrowIcon className="h-4 w-4 text-parchment" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
