import type { MetadataRoute } from 'next'
import { INVENTARIO } from '@/data/inventario'
import { SITE_URL, rutas } from '@/lib/routes'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date()

  const paginas = (['home', 'inventario', 'taller', 'contacto'] as const).map((pagina) => ({
    url: `${SITE_URL}${rutas.es[pagina]}`,
    lastModified: ahora,
    changeFrequency: 'weekly' as const,
    priority: pagina === 'home' ? 1 : 0.8,
    alternates: {
      languages: {
        'es-MX': `${SITE_URL}${rutas.es[pagina]}`,
        'en-US': `${SITE_URL}${rutas.en[pagina]}`,
      },
    },
  }))

  const paginasEn = (['home', 'inventario', 'taller', 'contacto'] as const).map((pagina) => ({
    url: `${SITE_URL}${rutas.en[pagina]}`,
    lastModified: ahora,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const unidades = INVENTARIO.filter((u) => u.estado !== 'vendida').flatMap((u) => [
    {
      url: `${SITE_URL}${rutas.es.unidad(u.slug)}`,
      lastModified: ahora,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          'es-MX': `${SITE_URL}${rutas.es.unidad(u.slug)}`,
          'en-US': `${SITE_URL}${rutas.en.unidad(u.slug)}`,
        },
      },
    },
    {
      url: `${SITE_URL}${rutas.en.unidad(u.slug)}`,
      lastModified: ahora,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ])

  return [...paginas, ...paginasEn, ...unidades]
}
