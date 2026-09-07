import Link from 'next/link'
import { PageShell } from '../PageShell'
import { Gallery } from '../Gallery'
import { UnitCard } from '../UnitCard'
import { WhatsAppLink } from '../WhatsAppLink'
import { StickyUnitCta } from '../StickyUnitCta'
import { ProductJsonLd } from '../JsonLd'
import { WhatsAppIcon, CheckIcon, ArrowIcon, CrossIcon } from '../icons'
import { t, pick, type Lang } from '@/content/copy'
import { r } from '@/lib/routes'
import { precioUSD, precioMXN, precioParaMensaje, numero } from '@/lib/format'
import { unidadGemela, unidadesALaVenta, type Unidad } from '@/data/inventario'

export function UnitView({ unidad, lang }: { unidad: Unidad; lang: Lang }) {
  const c = t(lang)
  const rutas = r(lang)
  const titulo = `${unidad.marca} ${unidad.modelo} ${unidad.anio}`
  const gemela = unidadGemela(unidad)
  const vendida = unidad.estado === 'vendida'
  const precio = precioParaMensaje(unidad.precioUSD)

  const ctx = {
    marca: unidad.marca,
    modelo: unidad.modelo,
    anio: unidad.anio,
    precio,
    seccion: 'ficha' as const,
    lang,
  }

  const otras = unidadesALaVenta()
    .filter((u) => u.slug !== unidad.slug)
    .slice(0, 3)

  const especificaciones: { etiqueta: string; valor: string }[] = [
    { etiqueta: c.unidad.anio, valor: String(unidad.anio) },
    { etiqueta: c.unidad.horas, valor: `${numero(unidad.horas, lang)} ${c.general.hrs}` },
    { etiqueta: c.unidad.motor, valor: pick(unidad.motor, lang) },
    { etiqueta: c.unidad.potencia, valor: unidad.potencia },
    { etiqueta: c.unidad.admision, valor: pick(unidad.admision, lang) },
    { etiqueta: c.unidad.plazas, valor: String(unidad.plazas) },
    { etiqueta: c.unidad.tanque, valor: unidad.tanque },
    { etiqueta: c.unidad.peso, valor: unidad.peso },
    {
      etiqueta: c.unidad.remolque,
      valor: unidad.remolque ? pick(unidad.remolque, lang) : c.unidad.sinRemolque,
    },
    { etiqueta: c.unidad.garantia, valor: c.unidad.meses(unidad.garantiaMeses) },
  ]

  return (
    <PageShell lang={lang} pagina="unidad" slug={unidad.slug} flotante={false}>
      <div className="border-b border-navy/10 bg-white">
        <div className="shell py-4">
          <Link
            href={rutas.inventario}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-deep"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
            {c.unidad.volver}
          </Link>
        </div>
      </div>

      <article className="bg-parchment pb-24 md:pb-16">
        <div className="shell grid gap-10 py-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:py-14">
          <div>
            <Gallery fotos={unidad.fotos} lang={lang} />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-ink uppercase">
              {unidad.marca} · {unidad.anio}
              {unidad.estado !== 'disponible' && (
                <span className="ml-3 bg-navy px-2 py-1 text-parchment">
                  {vendida ? c.estados.vendida : c.estados.apartada}
                </span>
              )}
            </p>
            <h1 className="mt-3 font-display text-[1.9rem] leading-tight font-bold text-navy uppercase sm:text-[2.25rem]">
              {unidad.modelo}
            </h1>

            <p className="mt-6 font-display text-3xl font-bold text-navy">
              {precioUSD(unidad.precioUSD, lang)}
            </p>
            <p className="mt-1 text-caption text-ink">
              {c.unidad.aproxMXN(precioMXN(unidad.precioUSD, lang))} · {c.unidad.precioNota}
            </p>

            <p className="mt-6 text-body leading-relaxed text-ink">{pick(unidad.resumen, lang)}</p>

            {unidad.estado === 'disponible' ? (
              <div className="mt-8 flex flex-col gap-3">
                <WhatsAppLink ctx={ctx} className="btn btn-primary w-full">
                  <WhatsAppIcon />
                  {c.unidad.cta}
                </WhatsAppLink>
                <WhatsAppLink
                  ctx={{ ...ctx, seccion: 'pago' }}
                  className="btn btn-ghost w-full"
                >
                  {c.unidad.ctaPago}
                </WhatsAppLink>
              </div>
            ) : (
              <div className="mt-8 border border-navy/15 bg-white p-5">
                <p className="text-body text-ink">
                  {vendida ? c.estados.vendidaNota : c.estados.apartadaNota}
                </p>
                <WhatsAppLink
                  ctx={{ ...ctx, seccion: 'sin-stock' }}
                  className="btn btn-primary mt-5 w-full"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {c.destacadas.vacioCta}
                </WhatsAppLink>
              </div>
            )}

            <ul className="mt-8 space-y-2.5 border-t border-navy/12 pt-6">
              {c.confianza.items.map((item) => (
                <li key={item.titulo} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold text-navy">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>
                    <strong className="font-semibold text-navy">{item.titulo}</strong> — {item.detalle}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Qué se le reemplazó: la sección que justifica el precio */}
        <section className="bg-navy py-16 text-parchment md:py-20">
          <div className="shell grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
            <div>
              <p className="eyebrow eyebrow-on-dark">{c.proceso.eyebrow}</p>
              <h2 className="mt-5 font-display text-[1.6rem] leading-tight font-bold text-parchment uppercase sm:text-h2">
                {c.unidad.reconstruccionTitulo}
              </h2>
              <p className="mt-5 text-body leading-relaxed text-parchment/80">
                {c.unidad.reconstruccionTexto}
              </p>
            </div>
            <ul className="space-y-3">
              {unidad.reconstruccion.map((item) => (
                <li
                  key={item.es}
                  className="flex items-start gap-3 border-b border-parchment/12 pb-3 text-body text-parchment/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold text-gold">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {pick(item, lang)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="shell grid gap-12 md:grid-cols-2 md:gap-14">
            <div>
              <h2 className="font-display text-[1.4rem] leading-tight font-bold text-navy uppercase sm:text-h2">
                {c.unidad.especificaciones}
              </h2>
              <dl className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
                {especificaciones.map((e) => (
                  <div key={e.etiqueta} className="flex justify-between gap-6 py-3.5">
                    <dt className="text-h3 font-bold tracking-[0.08em] text-ink/70 uppercase">
                      {e.etiqueta}
                    </dt>
                    <dd className="text-right text-body font-semibold text-navy">{e.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="font-display text-[1.4rem] leading-tight font-bold text-navy uppercase sm:text-h2">
                {c.unidad.papelesTitulo}
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  { ok: unidad.papeles.matricula, texto: c.unidad.papelesMatricula },
                  { ok: unidad.papeles.factura, texto: c.unidad.papelesFactura },
                  { ok: unidad.papeles.verificacionSEMAR, texto: c.unidad.papelesVerificacion },
                ].map((p) => (
                  <li key={p.texto} className="flex items-start gap-3 text-body text-ink">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${
                        p.ok ? 'border-gold text-navy' : 'border-ochre/60 text-ochre'
                      }`}
                    >
                      {p.ok ? <CheckIcon className="h-3 w-3" /> : <CrossIcon className="h-3 w-3" />}
                    </span>
                    {p.texto}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-gold bg-parchment p-5 text-body leading-relaxed text-ink">
                {pick(unidad.papeles.nota, lang)}
              </p>

              <h3 className="mt-10 text-h3 font-bold tracking-[0.14em] text-navy uppercase">
                {c.unidad.entregaTitulo}
              </h3>
              <p className="mt-3 text-body leading-relaxed text-ink">{pick(unidad.entrega, lang)}</p>
            </div>
          </div>
        </section>

        {gemela && (
          <section className="bg-parchment py-14">
            <div className="shell">
              <div className="flex flex-col gap-6 border border-gold bg-white p-7 md:flex-row md:items-center md:justify-between md:p-8">
                <div>
                  <h2 className="text-h3 font-bold tracking-[0.14em] text-navy uppercase">
                    {c.unidad.parTitulo}
                  </h2>
                  <p className="mt-3 max-w-xl text-body leading-relaxed text-ink">
                    {c.unidad.parTexto}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                  <WhatsAppLink
                    ctx={{
                      marca: unidad.marca,
                      modelo: unidad.modelo,
                      anio: unidad.anio,
                      seccion: 'par',
                      lang,
                    }}
                    className="btn btn-gold"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {c.unidad.ctaPar}
                  </WhatsAppLink>
                  <Link href={rutas.unidad(gemela.slug)} className="btn btn-ghost">
                    {c.unidad.verGemela}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {otras.length > 0 && (
          <section className="bg-parchment pt-10 pb-16 md:pb-20">
            <div className="shell">
              <h2 className="font-display text-[1.4rem] leading-tight font-bold text-navy uppercase sm:text-h2">
                {c.unidad.otrasUnidades}
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otras.map((u) => (
                  <li key={u.slug}>
                    <UnitCard unidad={u} lang={lang} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>

      {!vendida && (
        <StickyUnitCta lang={lang} ctx={ctx} precio={precioUSD(unidad.precioUSD, lang)} titulo={titulo} />
      )}
      <ProductJsonLd unidad={unidad} lang={lang} />
    </PageShell>
  )
}
