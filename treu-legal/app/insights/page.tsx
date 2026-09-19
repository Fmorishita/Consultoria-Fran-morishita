import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { PostGrid } from '@/components/PostCard';
import { InsightsFilters } from '@/components/InsightsFilters';
import { Pagination } from '@/components/Pagination';
import { SessionCta } from '@/components/SessionCta';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { getCategories, getPosts } from '@/lib/wordpress';
import { getPage, leadParagraph } from '@/content/pages';
import { guides } from '@/content/site';
import { ui } from '@/content/microcopy';

const PATH = '/insights/';
const PER_PAGE = 12;

export const revalidate = 900;

export function generateMetadata(): Metadata {
  const page = getPage('insights');
  return pageMetadata({
    title: 'Insights',
    description:
      page?.meta.description ||
      'Análisis y comentarios sobre temas legales que impactan a empresas que operan en México',
    path: PATH,
  });
}

type Search = { categoria?: string; q?: string; pagina?: string };

export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.pagina ?? 1) || 1);

  const categories = await getCategories();
  const active = sp.categoria ? categories.find((c) => c.slug === sp.categoria) : undefined;

  const { posts, total, totalPages } = await getPosts({
    perPage: PER_PAGE,
    page,
    category: active?.id,
    search: sp.q,
  });

  const source = getPage('insights');
  // Total de artículos publicados, para la pastilla "Todas".
  const totalAll = categories.reduce((n, c) => n + c.count, 0);
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'Insights', path: PATH },
  ];

  return (
    <>
      <PageHeader
        title="Insights"
        lead={
          source?.meta.description ||
          'Análisis y comentarios sobre temas legales que impactan a empresas que operan en México'
        }
        trail={trail}
      />

      <div className="shell py-section">
        <InsightsFilters
          categories={categories}
          activeCategory={active?.slug}
          activeSearch={sp.q}
          total={total || totalAll}
        />

        {active?.description && (
          <p className="mt-8 max-w-prose font-serif text-step-1 leading-relaxed text-ink/90">
            {active.description}
          </p>
        )}

        {posts.length > 0 ? (
          <>
            <PostGrid posts={posts} priorityFirst={page === 1} headingLevel={2} />
            <Pagination
              page={page}
              totalPages={totalPages}
              basePath={PATH}
              query={{ categoria: sp.categoria, q: sp.q }}
            />
          </>
        ) : (
          <p className="mt-12 border border-line bg-paper p-6 text-step-0 text-slate">{ui.noResults}</p>
        )}

        {/* Guías y checklists publicadas bajo /insights/ */}
        {page === 1 && !sp.categoria && !sp.q && <GuidesList />}
      </div>

      <SessionCta location="insights_hub" />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

function GuidesList() {
  const items = guides
    .map((g) => {
      const p = getPage(`insights--${g.slug}`);
      return p ? { slug: g.slug, title: p.title, lead: leadParagraph(p, 20) } : null;
    })
    .filter(Boolean);

  if (!items.length) return null;

  return (
    <section className="mt-20 border-t border-line pt-12">
      <div aria-hidden="true" className="h-px w-12 bg-blue" />
      <h2 className="mt-5 text-step-3">Guías y checklists</h2>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {items.map((g) => (
          <li key={g!.slug}>
            <Link
              href={`/insights/${g!.slug}/`}
              className="group flex items-start gap-4 py-5 transition-colors hover:bg-paper"
            >
              <Icon name="fileText" className="mt-1 h-5 w-5 shrink-0 text-blue" />
              <span>
                <span className="block text-step-1 font-semibold leading-snug text-ink group-hover:text-blue">
                  {g!.title}
                </span>
                {g!.lead && (
                  <span className="mt-1 block text-step--1 leading-relaxed text-slate">{g!.lead}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
