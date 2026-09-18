import Link from 'next/link';
import { Icon } from './Icon';
import { ui } from '@/content/microcopy';

/** Paginación real con URL compartible. */
export function Pagination({
  page,
  totalPages,
  basePath,
  query = {},
}: {
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const href = (n: number) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) if (v) params.set(k, v);
    if (n > 1) params.set('pagina', String(n));
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ''}`;
  };

  // Ventana de páginas alrededor de la actual, con primera y última siempre.
  const window = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const pages = [...window].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);

  return (
    <nav aria-label={ui.page} className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className="btn-secondary">
          <Icon name="chevronRight" className="h-4 w-4 rotate-180" />
          {ui.previous}
        </Link>
      ) : (
        <span />
      )}

      <ol className="hidden items-center gap-1 sm:flex">
        {pages.map((n, i) => (
          <li key={n} className="flex items-center gap-1">
            {i > 0 && pages[i - 1] !== n - 1 && (
              <span aria-hidden="true" className="px-1 text-slate">
                …
              </span>
            )}
            {n === page ? (
              <span
                aria-current="page"
                className="flex h-11 min-w-11 items-center justify-center border border-blue bg-blue px-2 text-step--1 font-semibold text-white"
              >
                {n}
              </span>
            ) : (
              <Link
                href={href(n)}
                className="flex h-11 min-w-11 items-center justify-center border border-line px-2 text-step--1 text-ink transition-colors hover:border-blue hover:text-blue"
              >
                {n}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <p className="text-step--1 text-slate sm:hidden">
        {ui.page} {page} / {totalPages}
      </p>

      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" className="btn-secondary">
          {ui.next}
          <Icon name="chevronRight" className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
