import type { Metadata } from 'next'
import { t, type Lang } from '@/content/copy'
import { SITE_URL, rutas } from '@/lib/routes'

type Pagina = 'home' | 'inventario' | 'taller' | 'contacto'

const CLAVE_META: Record<Pagina, 'home' | 'inventario' | 'taller' | 'contacto'> = {
  home: 'home',
  inventario: 'inventario',
  taller: 'taller',
  contacto: 'contacto',
}

/** Metadatos por página, con canónica y hreflang de las dos versiones. */
export function metaDePagina(lang: Lang, pagina: Pagina): Metadata {
  const c = t(lang)
  const meta = c.meta[CLAVE_META[pagina]]
  const ruta = rutas[lang][pagina]
  const rutaEs = rutas.es[pagina]
  const rutaEn = rutas.en[pagina]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}${ruta}`,
      languages: {
        'es-MX': `${SITE_URL}${rutaEs}`,
        'en-US': `${SITE_URL}${rutaEn}`,
        'x-default': `${SITE_URL}${rutaEs}`,
      },
    },
    openGraph: {
      type: 'website',
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${ruta}`,
      siteName: c.meta.siteName,
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      images: [{ url: `${SITE_URL}/assets/og-baja-jetskis.jpg`, width: 1200, height: 630, alt: c.meta.tagline }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/assets/og-baja-jetskis.jpg`],
    },
  }
}
