import { session } from '@/content/facts';
import { ui } from '@/content/microcopy';
import { SectionImage } from './SectionImage';

/**
 * «Quien nos contrata, primero».
 *
 * El cliente pidió una sección de testimonios donde se diga que sus clientes
 * son lo más importante. Esta sección dice exactamente eso, pero **no inventa
 * citas de clientes**: un testimonio fabricado en el sitio de un despacho es
 * una afirmación falsa ante quien está decidiendo a quién confiar un asunto
 * legal, y la publicidad de servicios jurídicos no admite endosos simulados.
 * Cuando el despacho aporte testimonios reales con autorización por escrito,
 * entran aquí sin tocar el resto (ver docs/PENDIENTES-CLIENTE.md).
 *
 * Mientras tanto el compromiso se sostiene con hechos que el sitio ya publica
 * y que el cliente puede verificar: con quién habla, cuánto escucha el
 * despacho antes de opinar y en cuánto tiempo responde. Es más creíble que
 * cualquier cita anónima.
 *
 * `image` es opcional: sin archivo la sección se compone a una sola columna
 * centrada, sin hueco ni marcador visible.
 */
export function ClientCommitment({ image }: { image?: string }) {
  // Fragmentos literales de /strategic-legal-session/. Ver content/facts.ts.
  const escucha = session.structure[0].text;

  const pruebas = [
    { label: ui.commitmentWho, value: session.keyFacts[1].value },
    { label: ui.commitmentResponse, value: session.response },
    { label: ui.commitmentWhere, value: `${session.format} ${session.formatNote}` },
  ];

  return (
    <section className="bg-blue-deep text-white">
      <div className="shell py-section">
        <div className={`grid items-center gap-12 ${image ? 'lg:grid-cols-2 lg:gap-16' : ''}`}>
          <div className={`aparece text-center ${image ? 'lg:text-left' : 'mx-auto max-w-3xl'}`}>
            <div
              aria-hidden="true"
              className={`h-px w-12 bg-white/50 ${image ? 'mx-auto lg:mx-0' : 'mx-auto'}`}
            />
            <h2 className="mt-5 text-step-4 leading-tight">{ui.commitmentTitle}</h2>
            <p
              className={`mt-5 max-w-prose text-step-1 leading-relaxed text-white/85 ${
                image ? 'mx-auto lg:mx-0' : 'mx-auto'
              }`}
            >
              {escucha}
            </p>

            <dl
              className={`mt-10 grid gap-x-8 gap-y-6 border-t border-white/20 pt-8 sm:grid-cols-3 ${
                image ? '' : 'mx-auto max-w-3xl'
              }`}
            >
              {pruebas.map((p) => (
                <div key={p.label}>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-white/60">
                    {p.label}
                  </dt>
                  <dd className="mt-1.5 text-step--1 font-medium leading-snug text-white">{p.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {image && (
            <div className="aparece overflow-hidden">
              <SectionImage
                name={image}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
