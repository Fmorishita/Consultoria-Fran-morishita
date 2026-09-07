import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { UnitView } from '@/components/views/UnitView'
import { INVENTARIO, buscarUnidad } from '@/data/inventario'
import { SITE_URL, rutas } from '@/lib/routes'
import { precioUSD } from '@/lib/format'
import { pick } from '@/content/copy'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return INVENTARIO.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const unidad = buscarUnidad(slug)
  if (!unidad) return {}

  const titulo = `${unidad.marca} ${unidad.modelo} ${unidad.anio} — ${precioUSD(unidad.precioUSD, 'es')} | Baja Jetskis`
  const descripcion = `${unidad.horas} horas de motor, ${unidad.potencia}. ${pick(unidad.resumen, 'es').slice(0, 130)}…`

  return {
    title: titulo,
    description: descripcion,
    alternates: {
      canonical: `${SITE_URL}${rutas.es.unidad(unidad.slug)}`,
      languages: {
        'es-MX': `${SITE_URL}${rutas.es.unidad(unidad.slug)}`,
        'en-US': `${SITE_URL}${rutas.en.unidad(unidad.slug)}`,
        'x-default': `${SITE_URL}${rutas.es.unidad(unidad.slug)}`,
      },
    },
    openGraph: {
      type: 'website',
      title: titulo,
      description: descripcion,
      url: `${SITE_URL}${rutas.es.unidad(unidad.slug)}`,
      locale: 'es_MX',
      images: [{ url: `${SITE_URL}${unidad.fotos[0].src}`, width: 1600, height: 1200, alt: pick(unidad.fotos[0].alt, 'es') }],
    },
    twitter: { card: 'summary_large_image', title: titulo, description: descripcion },
  }
}

export default async function FichaUnidad({ params }: Props) {
  const { slug } = await params
  const unidad = buscarUnidad(slug)
  if (!unidad) notFound()
  return <UnitView unidad={unidad} lang="es" />
}
