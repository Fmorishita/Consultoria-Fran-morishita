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

  return (
    <div className={`relative overflow-hidden border-b border-line ${tall ? 'h-64 sm:h-80 lg:h-[26rem]' : 'h-40 sm:h-56'}`}>
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
          // En la banda alta el encuadre se desplaza hacia arriba: centrado
          // recortaba el título de la pantalla y dejaba la imagen sin sentido.
          className={`h-full w-full object-cover ${tall ? 'object-[center_28%]' : ''}`}
        />
      </picture>
      {/* La retícula continúa sobre la fotografía. */}
      <div aria-hidden="true" className="plan-grid absolute inset-0 opacity-60 mix-blend-multiply" />
    </div>
  );
}
