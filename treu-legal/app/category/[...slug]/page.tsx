import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { PostGrid } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';
import { SessionCta } from '@/components/SessionCta';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { categorySegments, getCategories, getPosts } from '@/lib/wordpress';
import { ui } from '@/content/microcopy';

export const revalidate = 900;
export const dynamicParams = true;

const PER_PAGE = 12;

/**
 * Las categorías de WordPress son jerárquicas: su URL puede llevar la
 * categoría madre (/category/corporate-law-governance/corporate-governance/).
 * La ruta es catch-all y se resuelve por el último segmento.
 */
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: categorySegments(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await resolveCategory(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.name,
    description: category.description || `Insights de Treu Legal & Business en ${category.name}.`,
    path: category.path,
  });
}

/** Resuelve la categoría por el último segmento de la ruta. */
async function resolveCategory(segments: string[]) {
  const leaf = segments[segments.length - 1];
  const categories = await getCategories();
  const found = categories.find((c) => c.slug === leaf);
  if (!found) return null;
  // La ruta pedida debe coincidir con la que publica WordPress.
  if (categorySegments(found).join('/') !== segments.join('/')) return null;
  return found;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { slug } = await params;
  const { pagina } = await searchParams;
  const page = Math.max(1, Number(pagina ?? 1) || 1);

  const category = await resolveCategory(slug);
  if (!category) notFound();

  const { posts, totalPages } = await getPosts({ perPage: PER_PAGE, page, category: category.id });
  const path = category.path;
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'Insights', path: '/insights/' },
    { name: category.name, path },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Categoría"
        title={category.name}
        lead={category.description || null}
        trail={trail}
      />
      <div className="shell py-section">
        {posts.length > 0 ? (
          <>
            <PostGrid posts={posts} priorityFirst={page === 1} headingLevel={2} />
            <Pagination page={page} totalPages={totalPages} basePath={path} />
          </>
        ) : (
          <p className="text-step-0 text-slate">{ui.noResults}</p>
        )}
      </div>
      <SessionCta location={`categoria_${category.slug}`} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
