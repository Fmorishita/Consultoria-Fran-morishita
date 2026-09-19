import { TrackedLink } from './TrackedLink';
import { session } from '@/content/facts';

/**
 * CTA discreto para insertar a mitad del artículo. No interrumpe la lectura:
 * es un bloque de una línea con el filete de marca.
 */
export function ArticleCta({ location }: { location: string }) {
  return (
    <aside className="my-12 border-l-2 border-blue bg-paper p-5 font-sans">
      <p className="text-step-0 leading-relaxed text-ink">
        ¿Necesita criterio jurídico aplicado a la situación de su empresa? La{' '}
        <TrackedLink
          href={session.path}
          event="cta_click"
          location={location}
          className="font-semibold text-blue underline underline-offset-2"
        >
          {session.name}
        </TrackedLink>{' '}
        dura {session.duration}, es con el Principal Counsel del despacho y su honorario es acreditable
        al proyecto.
      </p>
    </aside>
  );
}
