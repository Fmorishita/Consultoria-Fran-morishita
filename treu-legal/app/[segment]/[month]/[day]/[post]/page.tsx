import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PostGrid } from '@/components/PostCard';
import { SessionCta } from '@/components/SessionCta';
import { ShareLinks } from '@/components/ShareLinks';
import { ArticleCta } from '@/components/ArticleCta';
import { TableOfContents } from '@/components/TableOfContents';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, abs, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { addHeadingIds, extractHeadings, sanitizeWordPressHtml } from '@/lib/sanitize';
import { getAllPostSlugs, getAuthor, getPostBySlug, getRelatedPosts } from '@/lib/wordpress';
import { ui } from '@/content/microcopy';

export const revalidate = 900;
/** Un artículo nuevo se sirve aunque no estuviera en el build. */
export const dynamicParams = true;

/**
 * Ruta original de los artículos: /AAAA/MM/DD/slug/
 * El primer segmento se llama `segment` (el año) porque lo comparte con las
 * páginas de primer nivel; Next.js exige que el nombre coincida.
 */
type Params = { segment: string; month: string; day: string; post: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => {
    const d = new Date(s.date);
    const p = (n: number) => String(n).padStart(2, '0');
    return {
      segment: String(d.getFullYear()),
      month: p(d.getMonth() + 1),
      day: p(d.getDate()),
      post: s.slug,
    };
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { segment: year, month, day, post: slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.excerpt.slice(0, 300),
      path: `/${year}/${month}/${day}/${slug}/`,
    }),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 300),
      url: abs(`/${year}/${month}/${day}/${slug}/`),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featured ? [{ url: post.featured.src, alt: post.featured.alt }] : undefined,
    },
  };
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function Page({ params }: { params: Promise<Params> }) {
  const { segment: year, month, day, post: slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // La ruta debe coincidir con la fecha real del artículo.
  if (post.path !== `/${year}/${month}/${day}/${slug}/`) notFound();

  const [author, related] = await Promise.all([getAuthor(post.authorId), getRelatedPosts(post)]);

  const clean = addHeadingIds(sanitizeWordPressHtml(post.content));
  const headings = extractHeadings(clean);
  const url = `${SITE_URL}${post.path}`;

  // El CTA a mitad del artículo se inserta tras el segundo H2.
  const parts = splitAfterSecondHeading(clean);

  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'Insights', path: '/insights/' },
    { name: post.title, path: post.path },
  ];

  return (
    <>
      <article>
        <header className="border-b border-line bg-paper">
          <div className="shell py-10 sm:py-14">
            <Breadcrumbs trail={trail} />
            <h1 className="mt-6 max-w-4xl text-step-4">{post.title}</h1>
            <p className="mt-4 text-step--1 text-slate">
              <time dateTime={post.date}>{fmtDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {post.readingMinutes} {ui.readingTime}
              {author && (
                <>
                  <span aria-hidden="true"> · </span>
                  <Link href={`/author/${author.slug}/`} className="text-blue hover:underline">
                    {author.name}
                  </Link>
                </>
              )}
            </p>
          </div>
        </header>

        {post.featured && (
          <div className="shell mt-8">
            <Image
              src={post.featured.src}
              alt={post.featured.alt}
              width={post.featured.width ?? 1200}
              height={post.featured.height ?? 675}
              sizes="(min-width: 1024px) 76rem, 100vw"
              priority
              className="h-auto w-full border border-line"
            />
          </div>
        )}

        <div className="shell py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-14">
            <div className="min-w-0">
              {/* Estilos de lectura para el HTML de WordPress, ya saneado. */}
              <div
                className="prose-treu prose-article"
                dangerouslySetInnerHTML={{ __html: parts[0] }}
              />
              {parts[1] && (
                <>
                  <ArticleCta location={`articulo_medio_${slug}`} />
                  <div
                    className="prose-treu prose-article"
                    dangerouslySetInnerHTML={{ __html: parts[1] }}
                  />
                </>
              )}

              <div className="mt-12 border-t border-line pt-6">
                <ShareLinks url={url} title={post.title} />
              </div>

              {author?.description && (
                <div className="mt-10 border border-line bg-paper p-6">
                  <h2 className="text-step-1 font-semibold">{author.name}</h2>
                  <p className="mt-2 text-step--1 leading-relaxed text-slate">{author.description}</p>
                </div>
              )}
            </div>

            {headings.length >= 3 && (
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <TableOfContents headings={headings} />
              </aside>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="shell py-section">
            <div aria-hidden="true" className="h-px w-12 bg-blue" />
            <h2 className="mt-5 text-step-3">{ui.relatedArticles}</h2>
            <PostGrid posts={related} />
          </div>
        </section>
      )}

      <SessionCta location={`articulo_cierre_${slug}`} />

      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt.slice(0, 300),
          datePublished: post.date,
          dateModified: post.modified,
          mainEntityOfPage: url,
          image: post.featured ? [post.featured.src] : undefined,
          author: author ? { '@type': 'Person', name: author.name } : undefined,
          publisher: { '@id': abs('/#organization') },
          inLanguage: 'es-MX',
          wordCount: clean.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
        }}
      />
    </>
  );
}

/** Parte el artículo tras el segundo H2, para insertar el CTA a media lectura. */
function splitAfterSecondHeading(html: string): [string, string?] {
  const positions = [...html.matchAll(/<h2\b/gi)].map((m) => m.index ?? -1).filter((i) => i > 0);
  if (positions.length < 3) return [html];
  const cut = positions[Math.floor(positions.length / 2)];
  return [html.slice(0, cut), html.slice(cut)];
}
