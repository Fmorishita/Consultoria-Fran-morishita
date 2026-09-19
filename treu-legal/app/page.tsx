import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section, SectionLink } from '@/components/Section';
import { AreaMosaic } from '@/components/AreaMosaic';
import { ProductIndex } from '@/components/ProductIndex';
import { Pillars } from '@/components/Pillars';
import { SessionTimeline } from '@/components/SessionTimeline';
import { ClientCommitment } from '@/components/ClientCommitment';
import { IndustryRows } from '@/components/IndustryRows';
import { SessionCta } from '@/components/SessionCta';
import { PostGrid } from '@/components/PostCard';
import { Icon } from '@/components/Icon';
import { legalProducts, practiceAreas } from '@/content/site';
import { founder, pillars, session } from '@/content/facts';
import { ui } from '@/content/microcopy';
import { getPosts } from '@/lib/wordpress';
import { sessionOfferSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export const revalidate = 900;

/** Textos literales de la home actual. */
const HOME = {
  tagline: 'Legal Intelligence for Business',
  proposition:
    'Arquitectura jurídica empresarial y prevención de contingencias legales para empresas que requieren más que asesoría legal tradicional: necesitan estructura jurídica sólida para operar, crecer y proteger sus intereses',
  whyEyebrow: 'Nuestro enfoque',
  whyTitle: '¿Por qué Treu Legal & Business?',
  whyLead:
    'Somos una firma boutique enfocada en arquitectura jurídica empresarial estratégica, diseñada para empresas que requieren algo más que representación legal tradicional',
  industriesTitle: 'Industrias que asesoramos',
  productsTitle: 'Legal Products',
  productsLead:
    'Servicios jurídicos estructurados diseñados para solucionar necesidades estratégicas en las empresas',
  insightsTitle: 'Insights',
  insightsLead:
    'Análisis y comentarios sobre temas legales que impactan a empresas que operan en México',
  closingTitle: 'Inteligencia Legal con Visión Empresarial',
  closingBody:
    'En Treu Legal & Business entendemos que el derecho debe funcionar como una infraestructura estratégica para la empresa, no únicamente como un mecanismo reactivo frente a conflictos.',
  closingIntro: 'Nuestro trabajo consiste en ayudar a las empresas a:',
  closingList: [
    'Estructurar relaciones jurídicas sólidas',
    'Anticipar riesgos regulatorios',
    'Fortalecer su gobernanza corporativa',
    'Operar con seguridad jurídica',
  ],
  closingOutro: 'Todo ello mediante soluciones y productos legales claros, estratégicos y operativos.',
} as const;

export default async function HomePage() {
  const { posts } = await getPosts({ perPage: 3 });

  return (
    <>
      <Hero tagline={HOME.tagline} proposition={HOME.proposition} />

      {/* Franja de confianza: hechos reales que hoy viven enterrados en subpáginas. */}
      <section className="border-b border-line bg-paper">
        <div className="shell py-10">
          {/* Fragmentos literales del perfil de /la-firma/. Ver content/facts.ts. */}
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {founder.highlights.map((h) => (
              <TrustFact key={h.label} label={h.label} value={h.value} />
            ))}
          </dl>
        </div>
      </section>

      {/* ¿Por qué Treu? Los cuatro pilares, tal como los publica el sitio. */}
      <Section eyebrow={HOME.whyEyebrow} title={HOME.whyTitle} lead={HOME.whyLead}>
        {/* Los cuatro pilares no son una secuencia, así que no van numerados.
            Tampoco llevan icono: el sitio los publica sin texto de apoyo y una
            caja con icono por pilar es el tic de plantilla. */}
        <Pillars items={pillars} />
      </Section>

      <Section title={ui.practiceAreas} tone="paper">
        <AreaMosaic items={practiceAreas} />
        <div className="mt-8">
          <SectionLink href="/areas-de-practica/">{ui.viewAllAreas}</SectionLink>
        </div>
      </Section>

      <Section title={HOME.industriesTitle}>
        <IndustryRows />
      </Section>

      <Section title={HOME.productsTitle} lead={HOME.productsLead} tone="paper">
        <ProductIndex items={legalProducts} />
      </Section>

      {/* Cómo funciona la sesión: la estructura 15/30/15 es una secuencia real. */}
      <Section
        title="Qué ocurre en los 60 minutos"
        lead="La sesión tiene una estructura definida. No improvisa. Cada bloque de tiempo tiene un propósito específico."
      >
        <SessionTimeline steps={session.structure} />
        <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <TrustFact label="Formato" value={`${session.format} ${session.formatNote}`} />
          <TrustFact label="Inversión" value={`${session.price}. ${session.priceNote}`} />
          <TrustFact label="Con quién" value={`${session.withWhom}, ${founder.role}`} />
          <TrustFact label="Respuesta" value={session.response} />
        </dl>
        <div className="mt-8">
          <SectionLink href={session.path}>{ui.viewSessionDetail}</SectionLink>
        </div>
      </Section>

      <ClientCommitment />

      {/* El fundador. Extractos literales de /la-firma/. */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <div aria-hidden="true" className="h-px w-12 bg-blue" />
            <h2 className="mt-5 text-step-4">{founder.name}</h2>
            <p className="mt-2 text-step-0 text-slate">{founder.role}</p>
            {/* El retrato que el sitio actual publica en /la-firma/. El despacho
                confirmó que es él, así que puede usarse aquí como retrato del
                fundador (ver docs/PENDIENTES-CLIENTE.md). */}
            <picture>
              <source
                type="image/avif"
                srcSet="/img/retrato-la-firma-480.avif 480w, /img/retrato-la-firma-800.avif 800w"
                sizes="(min-width: 1024px) 22rem, 100vw"
              />
              <img
                src="/img/retrato-la-firma-800.webp"
                srcSet="/img/retrato-la-firma-480.webp 480w, /img/retrato-la-firma-800.webp 800w"
                sizes="(min-width: 1024px) 22rem, 100vw"
                alt={`Retrato de ${founder.name}, ${founder.role} de Treu Legal & Business.`}
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="mt-8 h-auto w-full border border-line"
              />
            </picture>
          </div>
          <div className="prose-treu">
            <p>{founder.focus}</p>
            <p>{founder.experience}</p>
            <h3 className="font-sans text-step-1">{ui.credentials}</h3>
            <ul>
              {founder.credentials.map((c) => (
                <li key={c.program}>
                  {c.program}
                  {c.institution ? ` — ${c.institution}` : ''}
                </li>
              ))}
            </ul>
            <p>
              <Link href="/la-firma/">{ui.viewFirm}</Link>
            </p>
          </div>
        </div>
      </Section>

      {posts.length > 0 && (
        <Section title={HOME.insightsTitle} lead={HOME.insightsLead}>
          <PostGrid posts={posts} />
          <div className="mt-8">
            <SectionLink href="/insights/">{ui.viewAllInsights}</SectionLink>
          </div>
        </Section>
      )}

      {/* Cierre: el bloque que ya existe en la home actual. */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <div aria-hidden="true" className="h-px w-12 bg-blue" />
            <h2 className="mt-5 text-step-4">{HOME.closingTitle}</h2>
          </div>
          <div className="prose-treu">
            <p>{HOME.closingBody}</p>
            <p>{HOME.closingIntro}</p>
            <ul>
              {HOME.closingList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{HOME.closingOutro}</p>
          </div>
        </div>
      </Section>

      <SessionCta location="home_cierre" />
      <JsonLd data={sessionOfferSchema()} />
    </>
  );
}

function TrustFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
        <Icon name="check" className="h-3.5 w-3.5 text-blue" strokeWidth={2.25} />
        {label}
      </dt>
      <dd className="mt-1.5 text-step--1 leading-relaxed text-ink">{value}</dd>
    </div>
  );
}
