import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Los previews no deben indexarse: sólo el dominio de producción.
  const isProduction = SITE_URL.includes('treulegal.solutions');

  return {
    rules: isProduction
      ? [{ userAgent: '*', allow: '/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // `host` se omite a propósito: es una directiva no estándar y, con una URL
    // completa en lugar de un nombre de host, los validadores la marcan como
    // inválida.
  };
}
