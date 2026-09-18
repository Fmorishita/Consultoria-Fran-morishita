import { getPosts } from '@/lib/wordpress';
import { SITE_URL } from '@/lib/seo';
import { firm } from '@/content/facts';

export const revalidate = 900;

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** RSS. Conserva la ruta /feed/ del sitio actual. */
export async function GET() {
  const { posts } = await getPosts({ perPage: 20 });

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE_URL}${p.path}</link>
      <guid isPermaLink="true">${SITE_URL}${p.path}</guid>
      <pubDate>${new Date(p.dateGmt + 'Z').toUTCString()}</pubDate>
      <description>${escape(p.excerpt)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(firm.name)} — Insights</title>
    <link>${SITE_URL}/insights/</link>
    <atom:link href="${SITE_URL}/feed/" rel="self" type="application/rss+xml" />
    <description>Análisis y comentarios sobre temas legales que impactan a empresas que operan en México</description>
    <language>es-MX</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
