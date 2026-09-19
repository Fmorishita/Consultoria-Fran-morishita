import { session } from '@/content/facts';
import { ui } from '@/content/microcopy';

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
 * Colocación de la imagen: en móvil va justo después del título, no al final
 * de la sección. Con el texto+datos primero y la imagen al fondo, quedaba a
 * un renglón del retrato del Fundador de la sección siguiente —dos
 * fotografías en blanco y negro pegadas una a otra— y el cliente lo señaló
 * como confuso. El orden se controla con `order` por punto de quiebre: tres
 * bloques (título, imagen, cuerpo) en vez de dos, para poder intercalar la
 * imagen entre ellos en móvil y, en escritorio, dejarla ocupando toda la
 * columna derecha como antes.
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
        <div
          className={`grid gap-x-16 gap-y-8 ${
            image ? 'lg:grid-cols-2 lg:items-center' : ''
          }`}
        >
          {/* Título. Primer bloque siempre, en móvil y en escritorio. */}
          <div className={`aparece order-1 text-center ${image ? 'lg:col-start-1 lg:row-start-1 lg:text-left' : 'mx-auto max-w-3xl'}`}>
            <div
              aria-hidden="true"
              className={`h-px w-12 bg-white/50 ${image ? 'mx-auto lg:mx-0' : 'mx-auto'}`}
            />
            <h2 className="mt-5 text-step-4 leading-tight">{ui.commitmentTitle}</h2>
          </div>

          {image && (
            <div className="aparece order-2 overflow-hidden lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <picture>
                <source
                  type="image/avif"
                  srcSet={`/img/${image}-640.avif 640w, /img/${image}-1024.avif 1024w`}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <img
                  src={`/img/${image}-1024.webp`}
                  srcSet={`/img/${image}-640.webp 640w, /img/${image}-1024.webp 1024w`}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  alt={ui.commitmentImageAlt}
                  width={1537}
                  height={1023}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover"
                />
              </picture>
            </div>
          )}

          {/* Cuerpo: párrafo y datos. Tercer bloque, después de la imagen en
              móvil; en escritorio vuelve a la columna izquierda, bajo el
              título. */}
          <div className={`order-3 text-center ${image ? 'lg:col-start-1 lg:row-start-2 lg:text-left' : 'mx-auto max-w-3xl'}`}>
            <p className={`max-w-prose text-step-1 leading-relaxed text-white/85 ${image ? 'mx-auto lg:mx-0' : 'mx-auto'}`}>
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
        </div>
      </div>
    </section>
  );
}
