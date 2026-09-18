import { Breadcrumbs } from './Breadcrumbs';
import { Isotipo } from './Logo';

/**
 * Cabecera de página interior. Sobria: la audacia del hero se gasta una sola
 * vez, en la home. Aquí sólo la retícula muy tenue y el isotipo como marca de agua.
 */
export function PageHeader({
  title,
  lead,
  eyebrow,
  trail,
  tone = 'paper',
}: {
  title: string;
  lead?: string | null;
  eyebrow?: string;
  trail?: { name: string; path: string }[];
  tone?: 'paper' | 'blue';
}) {
  const isBlue = tone === 'blue';
  return (
    <header
      className={`relative isolate overflow-hidden border-b ${
        isBlue ? 'border-blue-deep bg-blue-deep text-white' : 'border-line bg-paper text-ink'
      }`}
    >
      <div
        aria-hidden="true"
        // Muy tenue: en una página interior la retícula sitúa, no compite con
        // el texto. La versión audaz del hero se gasta una sola vez.
        className={`plan-grid absolute inset-0 -z-10 ${isBlue ? 'opacity-30' : 'opacity-40'}`}
      />
      <Isotipo
        variant={isBlue ? 'blanco' : 'azul'}
        className="absolute -right-8 -top-10 -z-10 hidden h-64 w-64 opacity-[0.06] lg:block"
      />
      <div className="shell py-10 sm:py-14">
        {trail && <Breadcrumbs trail={trail} />}
        {eyebrow && (
          <p className={`mt-6 text-step--1 ${isBlue ? 'text-white/70' : 'text-slate'}`}>{eyebrow}</p>
        )}
        <h1 className={`${eyebrow ? 'mt-1.5' : 'mt-6'} max-w-4xl text-step-5`}>{title}</h1>
        {lead && (
          <p
            className={`mt-5 max-w-prose text-step-1 leading-relaxed ${
              isBlue ? 'text-white/80' : 'text-slate'
            }`}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
