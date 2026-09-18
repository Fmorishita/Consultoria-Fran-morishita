import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { SessionCta } from '@/components/SessionCta';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata, personSchema } from '@/lib/seo';
import { getPage, section, sectionParagraphs, subsections } from '@/content/pages';
import { founder } from '@/content/facts';
import { ui } from '@/content/microcopy';

const SLUG = 'la-firma';
const PATH = '/la-firma/';

export function generateMetadata(): Metadata {
  const page = getPage(SLUG);
  return pageMetadata({
    title: 'La Firma',
    description: page?.meta.description || sectionParagraphs(page!, 'Quienes somos')[0],
    path: PATH,
  });
}

export default function Page() {
  const page = getPage(SLUG);
  if (!page) return null;

  const about = sectionParagraphs(page, 'Quienes somos');
  const principles = subsections(page, 'Nuestra Filosofía');
  // El sitio parte la filosofía en dos bloques; el segundo no tiene título.
  const extraPrinciples = page.blocks
    .filter((b, i, arr) => {
      if (b.type !== 'heading' || b.level !== 3) return false;
      return !principles.some((p) => p.title === b.text) && arr.slice(0, i).some(
        (x) => x.type === 'heading' && x.text.includes('Filosofía'),
      ) && !arr.slice(0, i).some((x) => x.type === 'heading' && x.text.includes('Manifiesto'));
    })
    .map((b) => {
      const idx = page.blocks.indexOf(b);
      const next = page.blocks[idx + 1];
      return { title: (b as { text: string }).text, body: next?.type === 'paragraph' ? [next.text] : [] };
    })
    .filter((p) => p.body.length);

  const manifesto = sectionParagraphs(page, 'Manifiesto');
  const collaboration = sectionParagraphs(page, 'Colaboración multidisciplinaria');
  const portrait = section(page, 'Perfil profesional').find((b) => b.type === 'image');

  const allPrinciples = [...principles, ...extraPrinciples];
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'La Firma', path: PATH },
  ];

  return (
    <>
      <PageHeader title="La Firma" lead={about[0]} trail={trail} />

      {about.length > 1 && (
        <Section title="Quiénes somos">
          <div className="prose-treu mt-8">
            {about.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>
      )}

      {allPrinciples.length > 0 && (
        <Section
          title="Nuestra Filosofía"
          lead="Los siguientes principios definen nuestra práctica"
          tone="paper"
        >
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {allPrinciples.map((p) => (
              <li key={p.title} className="bg-white p-6">
                <h3 className="text-step-1 font-semibold leading-snug text-ink">{p.title}</h3>
                {p.body.map((t) => (
                  <p key={t} className="mt-3 text-step--1 leading-relaxed text-slate">
                    {t}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {manifesto.length > 0 && (
        <Section title="Manifiesto">
          <div className="prose-treu mt-8">
            {manifesto.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>
      )}

      {/* Perfil profesional. El retrato se conserva en la misma posición que
          hoy ocupa en el sitio. El despacho confirmó que es Marco Polo
          Hernández Alvarado (docs/PENDIENTES-CLIENTE.md). */}
      <Section title="Perfil profesional" tone="paper" id="perfil">
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="prose-treu">
            <p>
              <strong>{founder.name}</strong> es el Fundador y Principal Counsel de Treu Legal &amp;
              Business. {founder.focus}
            </p>
            <p>{founder.experience}</p>
            <p>
              Su formación incluye la Licenciatura en Derecho por la Universidad Autónoma de Baja
              California, especialización en Gestión y Sucesión de Empresa Familiar por ESADE Business
              and Law School, Propiedad Intelectual y Comercio Electrónico por la Organización Mundial
              de la Propiedad Intelectual, y FinTech Law and Policy por Duke University.
            </p>
            <p>
              Adicionalmente cuenta con formación en Responsabilidad Social Empresarial por el
              Tecnológico de Monterrey, protección de datos personales y cumplimiento antilavado para
              actividades vulnerables.
            </p>
            <p>{founder.crossBorder}</p>
          </div>

          <div>
            {portrait?.type === 'image' && (
              <picture>
                <source
                  type="image/avif"
                  srcSet="/img/retrato-la-firma-480.avif 480w, /img/retrato-la-firma-800.avif 800w"
                  sizes="(min-width: 1024px) 24rem, 100vw"
                />
                <img
                  src="/img/retrato-la-firma-800.webp"
                  srcSet="/img/retrato-la-firma-480.webp 480w, /img/retrato-la-firma-800.webp 800w"
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  alt={`Retrato de ${founder.name}, fundador y Principal Counsel de Treu Legal & Business.`}
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full border border-line"
                />
              </picture>
            )}
            <h3 className="mt-8 text-step-1 font-semibold">{ui.credentials}</h3>
            <ul className="mt-4 space-y-3 border-t border-line pt-4">
              {founder.credentials.map((c) => (
                <li key={c.program} className="flex gap-3 text-step--1 leading-relaxed">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-blue" strokeWidth={2.25} />
                  <span>
                    <span className="text-ink">{c.program}</span>
                    {c.institution && <span className="block text-slate">{c.institution}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {collaboration.length > 0 && (
        <Section title="Colaboración multidisciplinaria">
          <div className="prose-treu mt-8">
            {collaboration.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>
      )}

      <SessionCta location="la_firma" />
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd data={personSchema()} />
    </>
  );
}
