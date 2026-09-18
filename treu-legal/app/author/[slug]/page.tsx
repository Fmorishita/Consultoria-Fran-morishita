import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { PostGrid } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';
import { SessionCta } from '@/components/SessionCta';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata, personSchema } from '@/lib/seo';
import { getAuthor, getPosts } from '@/lib/wordpress';
import { founder } from '@/content/facts';

export const revalidate = 900;
export const dynamicParams = true;

const PER_PAGE = 12;

/** El sitio tiene un único autor: el fundador. */
async function resolveAuthor(slug: string) {
  const { posts } = await getPosts({ perPage: 1 });
  if (!posts.length) return null;
  const author = await getAuthor(posts[0].authorId);
  if (!author || author.slug !== slug) return null;
  return author;
}

export async function generateStaticParams() {
  const { posts } = await getPosts({ perPage: 1 });
  if (!posts.length) return [];
  const author = await getAuthor(posts[0].authorId);
  return author ? [{ slug: author.slug }] : [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = await resolveAuthor(slug);
  if (!author) return {};
  return pageMetadata({
    title: author.name,
    description: author.description || `Publicaciones de ${author.name} en Treu Legal & Business.`,
    path: `/author/${slug}/`,
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { slug } = await params;
  const { pagina } = await searchParams;
  const page = Math.max(1, Number(pagina ?? 1) || 1);

  const author = await resolveAuthor(slug);
  if (!author) notFound();

  const { posts, totalPages } = await getPosts({ perPage: PER_PAGE, page });
  const path = `/author/${slug}/`;
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'Insights', path: '/insights/' },
    { name: author.name, path },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Autor"
        title={author.name}
        lead={author.description || founder.focus}
        trail={trail}
      />
      <div className="shell py-section">
        <PostGrid posts={posts} priorityFirst={page === 1} headingLevel={2} />
        <Pagination page={page} totalPages={totalPages} basePath={path} />
      </div>
      <SessionCta location={`autor_${slug}`} />
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd data={personSchema()} />
    </>
  );
}
