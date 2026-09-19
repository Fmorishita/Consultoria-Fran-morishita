import Link from 'next/link';

/**
 * Sección estándar. El filete azul abre el bloque; el "eyebrow" sólo se usa
 * donde el sitio original ya tiene una etiqueta de sección, en formato normal.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = 'white',
  titleAs: Title = 'h2',
  className = '',
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: React.ReactNode;
  tone?: 'white' | 'paper' | 'blue';
  titleAs?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  const tones = {
    white: 'bg-white text-ink',
    paper: 'bg-paper text-ink',
    blue: 'bg-blue-deep text-white',
  } as const;

  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="shell py-section">
        {(eyebrow || title || lead) && (
          // Centrada. Antes iba pegada al margen izquierdo con todo el ancho
          // libre a la derecha, y esa asimetría es lo que hacía que la página
          // se leyera desordenada. El filete también se centra.
          <header className="mx-auto max-w-prose text-center aparece">
            <div
              aria-hidden="true"
              className={`mx-auto h-px w-12 ${tone === 'blue' ? 'bg-white/50' : 'bg-blue'}`}
            />
            {eyebrow && (
              <p className={`mt-5 text-step--1 ${tone === 'blue' ? 'text-white/70' : 'text-slate'}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <Title className={`${eyebrow ? 'mt-1.5' : 'mt-5'} text-step-4`}>{title}</Title>
            )}
            {lead && (
              <p
                className={`mx-auto mt-4 max-w-prose text-step-1 leading-relaxed ${
                  tone === 'blue' ? 'text-white/80' : 'text-slate'
                }`}
              >
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/** Enlace de sección: "Ver todos". Sin flechas decorativas en cada botón. */
export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[44px] items-center text-step-0 font-semibold text-blue underline decoration-blue/30 underline-offset-4 transition-colors hover:decoration-blue"
    >
      {children}
    </Link>
  );
}
