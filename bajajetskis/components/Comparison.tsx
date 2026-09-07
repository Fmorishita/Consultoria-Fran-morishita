import { SectionHead } from './SectionHead'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './icons'
import { t, type Lang } from '@/content/copy'

export function Comparison({ lang }: { lang: Lang }) {
  const c = t(lang)
  const { columnas, filas } = c.comparativa
  const ultima = columnas.length - 1

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHead
          eyebrow={c.comparativa.eyebrow}
          titulo={c.comparativa.titulo}
          parrafo={c.comparativa.parrafo}
        />

        {/* Escritorio: tabla comparativa completa */}
        <div className="mt-14 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{c.comparativa.titulo}</caption>
            <thead>
              <tr>
                <th scope="col" className="w-40 border-b border-navy/15 pb-4 pr-4 align-bottom">
                  <span className="sr-only">{c.comparativa.eyebrow}</span>
                </th>
                {columnas.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`border-b pb-4 px-4 align-bottom text-h3 font-bold tracking-[0.12em] uppercase ${
                      i === ultima
                        ? 'border-gold bg-navy pt-4 text-gold'
                        : 'border-navy/15 text-ink/70'
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => (
                <tr key={fila.criterio} className="align-top">
                  <th
                    scope="row"
                    className="border-b border-navy/10 py-5 pr-4 text-h3 font-bold tracking-[0.1em] text-navy uppercase"
                  >
                    {fila.criterio}
                  </th>
                  {fila.valores.map((valor, i) => (
                    <td
                      key={`${fila.criterio}-${i}`}
                      className={`border-b py-5 px-4 text-sm leading-relaxed ${
                        i === ultima
                          ? 'border-gold/40 bg-navy font-semibold text-parchment'
                          : 'border-navy/10 text-ink/80'
                      }`}
                    >
                      {valor}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Móvil: una tarjeta por camino, la nuestra al final */}
        <ul className="mt-12 space-y-5 md:hidden">
          {columnas.map((col, i) => (
            <li
              key={col}
              className={`border p-5 ${
                i === ultima ? 'border-gold bg-navy' : 'border-navy/15 bg-parchment'
              }`}
            >
              <h3
                className={`text-h3 font-bold tracking-[0.14em] uppercase ${
                  i === ultima ? 'text-gold' : 'text-navy'
                }`}
              >
                {col}
              </h3>
              <dl className="mt-4 space-y-3">
                {filas.map((fila) => (
                  <div key={fila.criterio}>
                    <dt
                      className={`text-[0.625rem] font-bold tracking-[0.12em] uppercase ${
                        i === ultima ? 'text-parchment/60' : 'text-ink/55'
                      }`}
                    >
                      {fila.criterio}
                    </dt>
                    <dd
                      className={`mt-0.5 text-sm leading-relaxed ${
                        i === ultima ? 'text-parchment' : 'text-ink/85'
                      }`}
                    >
                      {fila.valores[i]}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-l-2 border-gold bg-parchment p-8 md:p-10">
          <h3 className="font-display text-xl font-bold text-navy uppercase md:text-2xl">
            {c.comparativa.cierre.titulo}
          </h3>
          <p className="mt-4 max-w-2xl text-body-lg leading-relaxed text-ink">
            {c.comparativa.cierre.texto}
          </p>
          <WhatsAppLink ctx={{ seccion: 'hero', lang }} className="btn btn-primary mt-7">
            <WhatsAppIcon className="h-4 w-4" />
            {c.comparativa.cierre.cta}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  )
}
