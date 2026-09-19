/**
 * Banda fotográfica de página interior. Se usa sólo donde la fotografía
 * aporta contexto real: las páginas transfronterizas llevan la imagen de la
 * conurbación Tijuana–San Diego, donde se lee la retícula urbana y la línea
 * de la frontera.
 */
export function PageBand({
  name,
  alt,
  widths,
  tall = false,
}: {
  name: string;
  alt: string;
  widths: number[];
  /** Para imágenes con contenido —personas, una pantalla— que una banda baja
      recortaría hasta dejarlas ilegibles. */
  tall?: boolean;
}) {
  const srcSet = (ext: string) => widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `/img/${name}-${widths[widths.length - 1]}.webp`;

  if (tall) {
    // Sin recorte: la imagen se muestra entera dentro del ancho de lectura.
    // A sangre completa, el alto fijo cortaba la pantalla del plan y la cabeza
    // de las personas, que es justo lo que había que ver.
    return (
      <div className="border-b border-line bg-paper">
        <div className="shell py-10 sm:py-14">
          <figure className="relative mx-auto max-w-4xl overflow-hidden">
            <picture>
              <source type="image/avif" srcSet={srcSet('avif')} sizes="(min-width: 1024px) 56rem, 100vw" />
              <img
                src={fallback}
                srcSet={srcSet('webp')}
                sizes="(min-width: 1024px) 56rem, 100vw"
                alt={alt}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </picture>
            <div aria-hidden="true" className="plan-grid absolute inset-0 opacity-40 mix-blend-multiply" />
          </figure>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-40 overflow-hidden border-b border-line sm:h-56">
      <picture>
        <source type="image/avif" srcSet={srcSet('avif')} sizes="100vw" />
        <img
          src={fallback}
          srcSet={srcSet('webp')}
          sizes="100vw"
          alt={alt}
          width={1440}
          height={958}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>
      {/* La retícula continúa sobre la fotografía. */}
      <div aria-hidden="true" className="plan-grid absolute inset-0 opacity-60 mix-blend-multiply" />
    </div>
  );
}
