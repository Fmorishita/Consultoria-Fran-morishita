import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { ArrowIcon } from '@/components/icons'
import { t } from '@/content/copy'
import { r } from '@/lib/routes'

export default function NoEncontrado() {
  const c = t('es')
  return (
    <PageShell lang="es" pagina="home">
      <section className="bg-navy py-24 text-center md:py-32">
        <div className="shell">
          <h1 className="font-display text-h1 font-bold text-parchment uppercase">
            {c.general.error404Titulo}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-parchment/80">
            {c.general.error404Texto}
          </p>
          <Link href={r('es').inventario} className="btn btn-gold mt-10">
            {c.general.error404Cta}
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
