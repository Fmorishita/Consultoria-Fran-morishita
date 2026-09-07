import { PageShell } from '../PageShell'
import { PageHeader } from '../PageHeader'
import { InventoryBrowser } from '../InventoryBrowser'
import { FinalCta } from '../FinalCta'
import { t, type Lang } from '@/content/copy'
import { INVENTARIO } from '@/data/inventario'

export function InventoryView({ lang }: { lang: Lang }) {
  const c = t(lang)
  // Se publican también las vendidas: el historial es parte del argumento.
  const unidades = [...INVENTARIO].sort((a, b) => {
    const orden = { disponible: 0, apartada: 1, vendida: 2 }
    return orden[a.estado] - orden[b.estado] || b.precioUSD - a.precioUSD
  })

  return (
    <PageShell lang={lang} pagina="inventario">
      <PageHeader
        eyebrow={c.inventario.eyebrow}
        titulo={c.inventario.titulo}
        parrafo={c.inventario.parrafo}
      />
      <section className="bg-parchment py-14 md:py-20">
        <div className="shell">
          <InventoryBrowser unidades={unidades} lang={lang} />
        </div>
      </section>
      <FinalCta lang={lang} />
    </PageShell>
  )
}
