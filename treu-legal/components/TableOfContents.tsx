import { ui } from '@/content/microcopy';

/** Índice de contenidos. Sólo aparece en artículos largos. */
export function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  if (headings.length < 3) return null;
  return (
    <nav aria-labelledby="indice" className="border border-line bg-paper p-5">
      <h2 id="indice" className="text-step--1 font-semibold uppercase tracking-[0.12em] text-slate">
        {ui.onThisPage}
      </h2>
      <ol className="mt-3 space-y-1.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="block py-1 text-step--1 leading-snug text-ink transition-colors hover:text-blue"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
