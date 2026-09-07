import { NEGOCIO, type Unidad } from '@/data/inventario'
import { SITE_URL, r } from '@/lib/routes'
import { WHATSAPP_E164 } from '@/lib/whatsapp'
import { t, pick, type Lang } from '@/content/copy'

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro y estático: no viene de entrada del usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function LocalBusinessJsonLd({ lang }: { lang: Lang }) {
  const c = t(lang)
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'AutoDealer',
        '@id': `${SITE_URL}/#negocio`,
        name: NEGOCIO.nombre,
        description: c.meta.home.description,
        url: `${SITE_URL}${r(lang).home}`,
        telephone: NEGOCIO.telefono,
        image: `${SITE_URL}/assets/logo-baja-jetskis.png`,
        logo: `${SITE_URL}/assets/logo-baja-jetskis.png`,
        priceRange: '$$$',
        currenciesAccepted: 'USD, MXN',
        address: {
          '@type': 'PostalAddress',
          streetAddress: NEGOCIO.direccion,
          addressLocality: NEGOCIO.ciudad,
          addressRegion: NEGOCIO.estado,
          postalCode: NEGOCIO.codigoPostal,
          addressCountry: 'MX',
        },
        geo: { '@type': 'GeoCoordinates', latitude: NEGOCIO.lat, longitude: NEGOCIO.lng },
        areaServed: ['Ensenada', 'Rosarito', 'Tijuana', 'Mexicali', 'San Felipe'].map((n) => ({
          '@type': 'City',
          name: n,
        })),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:00',
            closes: '15:00',
          },
        ],
        sameAs: [NEGOCIO.instagram, NEGOCIO.facebook],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: `+${WHATSAPP_E164}`,
          availableLanguage: ['es-MX', 'en-US'],
        },
      }}
    />
  )
}

export function ProductJsonLd({ unidad, lang }: { unidad: Unidad; lang: Lang }) {
  const disponibilidad =
    unidad.estado === 'disponible'
      ? 'https://schema.org/InStock'
      : unidad.estado === 'apartada'
        ? 'https://schema.org/LimitedAvailability'
        : 'https://schema.org/SoldOut'

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${unidad.marca} ${unidad.modelo} ${unidad.anio}`,
        sku: unidad.slug,
        description: pick(unidad.resumen, lang),
        brand: { '@type': 'Brand', name: unidad.marca },
        model: unidad.modelo,
        productionDate: String(unidad.anio),
        itemCondition: 'https://schema.org/RefurbishedCondition',
        image: unidad.fotos.map((f) => `${SITE_URL}${f.src}`),
        url: `${SITE_URL}${r(lang).unidad(unidad.slug)}`,
        offers: {
          '@type': 'Offer',
          price: unidad.precioUSD,
          priceCurrency: 'USD',
          availability: disponibilidad,
          itemCondition: 'https://schema.org/RefurbishedCondition',
          url: `${SITE_URL}${r(lang).unidad(unidad.slug)}`,
          seller: { '@id': `${SITE_URL}/#negocio` },
          areaServed: 'MX',
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Horas de motor', value: unidad.horas },
          { '@type': 'PropertyValue', name: 'Potencia', value: unidad.potencia },
          { '@type': 'PropertyValue', name: 'Plazas', value: unidad.plazas },
          { '@type': 'PropertyValue', name: 'Motor', value: pick(unidad.motor, lang) },
        ],
      }}
    />
  )
}

export function FaqJsonLd({ lang }: { lang: Lang }) {
  const c = t(lang)
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: c.faq.preguntas.map((q) => ({
          '@type': 'Question',
          name: q.p,
          acceptedAnswer: { '@type': 'Answer', text: q.r },
        })),
      }}
    />
  )
}
