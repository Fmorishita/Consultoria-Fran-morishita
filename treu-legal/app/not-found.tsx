import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Icon } from '@/components/Icon';
import { practiceAreas } from '@/content/site';
import { session } from '@/content/facts';
import { ui } from '@/content/microcopy';

/** 404 útil: búsqueda en Insights, rutas principales y el CTA. */
export default function NotFound() {
  return (
    <>
      <PageHeader title={ui.notFoundTitle} lead={ui.notFoundText} />
      <div className="shell py-section">
        <form action="/insights/" role="search" className="flex max-w-md gap-2">
          <label htmlFor="nf-q" className="sr-only">
            {ui.searchPlaceholder}
          </label>
          <input
            id="nf-q"
            type="search"
            name="q"
            placeholder={ui.searchPlaceholder}
            className="min-h-[48px] w-full border border-line bg-white px-3 py-3 text-step-0"
          />
          <button type="submit" className="btn-secondary">
            <Icon name="search" className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">{ui.search}</span>
          </button>
        </form>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={session.path} className="btn-primary">
            {session.name}
          </Link>
          <Link href="/" className="btn-secondary">
            {ui.goHome}
          </Link>
        </div>

        <nav aria-label={ui.practiceAreas} className="mt-14 border-t border-line pt-8">
          <h2 className="text-step-1 font-semibold">{ui.practiceAreas}</h2>
          <ul className="mt-4 grid gap-y-1 sm:grid-cols-2">
            {practiceAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas-de-practica/${a.slug}/`}
                  className="flex min-h-[44px] items-center text-step-0 text-blue hover:underline"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
