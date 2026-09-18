import type { Metadata } from 'next';
import { contact, firm, founder, session } from '@/content/facts';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '')}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://treulegal.solutions';

export const abs = (path: string) => new URL(path, SITE_URL).toString();

/** Metadatos por página. Conserva títulos y descripciones actuales. */
export function pageMetadata({
  title,
  description,
  path,
  locale = 'es_MX',
  alternateEn,
  alternateEs,
}: {
  title: string;
  description?: string;
  path: string;
  locale?: 'es_MX' | 'en_US';
  alternateEn?: string;
  alternateEs?: string;
}): Metadata {
  const languages: Record<string, string> = {};
  if (alternateEs) languages['es-MX'] = abs(alternateEs);
  if (alternateEn) languages['en-US'] = abs(alternateEn);

  return {
    title,
    description,
    alternates: {
      canonical: abs(path),
      ...(Object.keys(languages).length ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: abs(path),
      siteName: firm.name,
      locale,
      type: 'website',
      images: [{ url: abs('/api/og?title=' + encodeURIComponent(title)), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** JSON-LD. Sólo datos reales publicados en el sitio. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': abs('/#organization'),
    name: firm.name,
    alternateName: 'Treu Legal',
    slogan: firm.tagline,
    url: SITE_URL,
    logo: abs('/brand/wordmark-azul.webp'),
    email: contact.email,
    telephone: contact.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      addressLocality: firm.city,
      addressRegion: firm.state,
      addressCountry: 'MX',
    },
    geo: { '@type': 'GeoCoordinates', latitude: contact.geo.lat, longitude: contact.geo.lng },
    sameAs: [contact.linkedin],
    founder: { '@id': abs('/la-firma/#founder') },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Baja California' },
      { '@type': 'Country', name: 'México' },
    ],
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': abs('/la-firma/#founder'),
    name: founder.name,
    jobTitle: founder.role,
    worksFor: { '@id': abs('/#organization') },
    alumniOf: founder.credentials
      .filter((c) => c.institution)
      .map((c) => ({ '@type': 'EducationalOrganization', name: c.institution })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    url: SITE_URL,
    name: firm.name,
    inLanguage: 'es-MX',
    publisher: { '@id': abs('/#organization') },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: abs(path),
    provider: { '@id': abs('/#organization') },
    areaServed: { '@type': 'Country', name: 'México' },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

export function sessionOfferSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: session.name,
    serviceType: 'Sesión de diagnóstico jurídico empresarial',
    url: abs(session.path),
    provider: { '@id': abs('/#organization') },
    offers: {
      '@type': 'Offer',
      price: '150',
      priceCurrency: 'USD',
      description: session.priceNote,
    },
  };
}
