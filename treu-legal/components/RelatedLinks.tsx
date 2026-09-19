import Link from 'next/link';
import { Icon } from './Icon';
import { industries, legalProducts, practiceAreas, relations } from '@/content/site';

/**
 * CTA contextual: en áreas e industrias se ofrece el Legal Product
 * relacionado además de la sesión. Sólo relaciones que el sitio ya hace.
 */
export function RelatedLinks({ slug }: { slug: string }) {
  const rel = relations[slug];
  if (!rel) return null;

  const products = (rel.products ?? [])
    .map((s) => legalProducts.find((p) => p.slug === s))
    .filter(Boolean);
  const inds = (rel.industries ?? [])
    .map((s) => industries.find((i) => i.slug === s))
    .filter(Boolean);
  const areas = (rel.areas ?? [])
    .map((s) => practiceAreas.find((a) => a.slug === s))
    .filter(Boolean);

  if (!products.length && !inds.length && !areas.length) return null;

  return (
    <section className="border-t border-line bg-paper">
      <div className="shell py-section">
        <div aria-hidden="true" className="h-px w-12 bg-blue" />
        <h2 className="mt-5 text-step-3">Relacionado</h2>
        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
          {products.map((p) => (
            <RelatedCard
              key={p!.slug}
              href={`/legal-products/${p!.slug}/`}
              kind="Legal Product"
              name={p!.name}
              blurb={p!.blurb}
              icon={p!.icon}
            />
          ))}
          {inds.map((i) => (
            <RelatedCard
              key={i!.slug}
              href={`/industrias/${i!.slug}/`}
              kind="Industria"
              name={i!.name}
              blurb={i!.blurb}
              icon={i!.icon}
            />
          ))}
          {areas.map((a) => (
            <RelatedCard
              key={a!.slug}
              href={`/areas-de-practica/${a!.slug}/`}
              kind="Área de práctica"
              name={a!.name}
              blurb={a!.blurb}
              icon={a!.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCard({
  href,
  kind,
  name,
  blurb,
  icon,
}: {
  href: string;
  kind: string;
  name: string;
  blurb: string;
  icon: string;
}) {
  return (
    <Link href={href} className="group flex flex-col gap-2 bg-white p-6 transition-colors hover:bg-paper">
      <span className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
        <Icon name={icon} className="h-4 w-4 text-blue" />
        {kind}
      </span>
      <h3 className="text-step-2 leading-tight group-hover:text-blue">{name}</h3>
      <p className="line-clamp-3 text-step--1 leading-relaxed text-slate">{blurb}</p>
    </Link>
  );
}
