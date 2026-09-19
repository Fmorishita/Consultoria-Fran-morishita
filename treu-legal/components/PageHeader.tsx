import { Breadcrumbs } from './Breadcrumbs';
import { Isotipo } from './Logo';
import { SectionImage } from './SectionImage';

/**
 * Cabecera de página interior.
 *
 * Sin imagen es sobria: la audacia del hero se gasta una sola vez, en la home.
 * Con imagen (áreas de práctica e industrias, que en el sitio actual tienen la
 * suya) pasa a fondo oscuro y la imagen ocupa la mitad derecha en escritorio y
 * el fondo completo en móvil, siempre bajo un degradado que mantiene el
 * contraste del texto. Es lo que le da a cada una de esas diez páginas una
 * identidad propia en lugar de repetir la misma banda pálida.
 */
export function PageHeader({
  title,
  lead,
  eyebrow,
  trail,
  tone = 'paper',
  image,
}: {
  title: string;
  lead?: string | null;
  eyebrow?: string;
  trail?: { name: string; path: string }[];
  tone?: 'paper' | 'blue';
  /** Nombre base en public/img/. Su presencia impone el fondo oscuro. */
  image?: string;
}) {
  const isDark = tone === 'blue' || Boolean(image);
  return (
    <header
      className={`relative isolate overflow-hidden border-b ${
        isDark ? 'border-blue-deep bg-blue-deep text-white' : 'border-line bg-paper text-ink'
      }`}
    >
      {image && (
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <SectionImage
            name={image}
            loading="eager"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-full w-full object-cover lg:ml-auto lg:w-[55%]"
          />
          {/* Degradado sobre la imagen: sin él el texto blanco pierde contraste
              contra las zonas claras de la fotografía. */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-deep via-blue-deep/85 to-blue-deep/60 lg:bg-gradient-to-r lg:from-blue-deep lg:via-blue-deep/90 lg:to-transparent" />
        </div>
      )}
      <div
        aria-hidden="true"
        // Muy tenue: en una página interior la retícula sitúa, no compite con
        // el texto. La versión audaz del hero se gasta una sola vez.
        className={`plan-grid absolute inset-0 -z-10 ${isDark ? 'opacity-30' : 'opacity-40'}`}
      />
      {!image && (
        <Isotipo
          variant={isDark ? 'blanco' : 'azul'}
          className="absolute -right-8 -top-10 -z-10 hidden h-64 w-64 opacity-[0.06] lg:block"
        />
      )}
      <div className={`shell ${image ? 'py-14 sm:py-20 lg:py-24' : 'py-10 sm:py-14'}`}>
        {trail && <Breadcrumbs trail={trail} />}
        {eyebrow && (
          <p className={`mt-6 text-step--1 ${isDark ? 'text-white/70' : 'text-slate'}`}>{eyebrow}</p>
        )}
        <h1 className={`${eyebrow ? 'mt-1.5' : 'mt-6'} ${image ? 'max-w-2xl' : 'max-w-4xl'} text-step-5`}>
          {title}
        </h1>
        {lead && (
          <p
            className={`mt-5 max-w-prose text-step-1 leading-relaxed ${
              isDark ? 'text-white/80' : 'text-slate'
            } ${image ? 'lg:max-w-xl' : ''}`}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
