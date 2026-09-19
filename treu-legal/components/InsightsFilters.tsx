'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { ui } from '@/content/microcopy';
import type { Category } from '@/lib/wordpress';

/**
 * Filtros del hub de Insights. Escriben el estado en la URL, de modo que
 * cualquier combinación de categoría, búsqueda y página es compartible.
 */
export function InsightsFilters({
  categories,
  activeCategory,
  activeSearch,
  total,
}: {
  categories: Category[];
  activeCategory?: string;
  activeSearch?: string;
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [term, setTerm] = useState(activeSearch ?? '');

  useEffect(() => setTerm(activeSearch ?? ''), [activeSearch]);

  const hrefFor = (slug?: string) => {
    const next = new URLSearchParams(params.toString());
    if (slug) next.set('categoria', slug);
    else next.delete('categoria');
    next.delete('pagina');
    const qs = next.toString();
    return `/insights/${qs ? `?${qs}` : ''}`;
  };

  function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = new URLSearchParams(params.toString());
    const value = term.trim();
    if (value) next.set('q', value);
    else next.delete('q');
    next.delete('pagina');
    const qs = next.toString();
    router.push(`/insights/${qs ? `?${qs}` : ''}`);
  }

  return (
    <div className="mt-10 space-y-6">
      <form onSubmit={onSearch} role="search" className="flex gap-2">
        <label htmlFor="insights-q" className="sr-only">
          {ui.searchPlaceholder}
        </label>
        <input
          id="insights-q"
          type="search"
          name="q"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={ui.searchPlaceholder}
          className="min-h-[48px] w-full max-w-sm border border-line bg-white px-3 py-3 text-step-0"
        />
        <button type="submit" className="btn-secondary">
          <Icon name="search" className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">{ui.search}</span>
        </button>
      </form>

      <nav aria-label={ui.categories}>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href={hrefFor()}
              aria-current={!activeCategory ? 'page' : undefined}
              className={`inline-flex min-h-[40px] items-center border px-3 py-2 text-step--1 transition-colors ${
                !activeCategory
                  ? 'border-blue bg-blue text-white'
                  : 'border-line bg-white text-ink hover:border-blue hover:text-blue'
              }`}
            >
              {ui.allCategories} <span className="ml-1.5 opacity-70">{total}</span>
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={hrefFor(c.slug)}
                aria-current={activeCategory === c.slug ? 'page' : undefined}
                className={`inline-flex min-h-[40px] items-center border px-3 py-2 text-step--1 transition-colors ${
                  activeCategory === c.slug
                    ? 'border-blue bg-blue text-white'
                    : 'border-line bg-white text-ink hover:border-blue hover:text-blue'
                }`}
              >
                {c.name} <span className="ml-1.5 opacity-70">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
