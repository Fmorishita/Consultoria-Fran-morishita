import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { esLandings, guides, industries, legalProducts, practiceAreas } from '@/content/site';
import { enPages } from '@/content/en';
import { getAllPostSlugs, getCategories } from '@/lib/wordpress';

export const revalidate = 900;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE_URL}${path}`;
  const now = new Date();

  const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/strategic-legal-session/', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/la-firma/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/areas-de-practica/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/industrias/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/legal-products/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/insights/', priority: 0.8, changeFrequency: 'daily' },
    { path: '/contacto/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/en/', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacidad/', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/condiciones-de-uso/', priority: 0.2, changeFrequency: 'yearly' },
  ];

  const collections = [
    ...practiceAreas.map((a) => `/areas-de-practica/${a.slug}/`),
    ...industries.map((i) => `/industrias/${i.slug}/`),
    ...legalProducts.map((p) => `/legal-products/${p.slug}/`),
    ...guides.map((g) => `/insights/${g.slug}/`),
    ...esLandings.map((l) => `/${l.slug}/`),
    ...enPages.map((p) => `/en/${p.slug}/`),
  ];

  const [posts, categories] = await Promise.all([getAllPostSlugs(), getCategories()]);

  return [
    ...staticPaths.map((p) => ({
      url: url(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...collections.map((path) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: url(c.path),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...posts.map((p) => {
      const d = new Date(p.date);
      const pad = (n: number) => String(n).padStart(2, '0');
      return {
        url: url(`/${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${p.slug}/`),
        lastModified: new Date(p.modified),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      };
    }),
  ];
}
