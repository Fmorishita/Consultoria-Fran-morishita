/**
 * Imagen de sección servida desde public/img/ en AVIF y WebP a dos anchos.
 *
 * Son las mismas imágenes que treulegal.solutions publica hoy en cada área de
 * práctica y en cada industria; la correspondencia sale de content/_source/ y
 * queda anotada en el dato (`imageSource`), no aquí.
 *
 * El `alt` va vacío a propósito: en todos los usos la imagen acompaña a un
 * título que ya nombra la sección, así que describirla otra vez sería ruido
 * para quien navega con lector de pantalla.
 */
export function SectionImage({
  name,
  className = '',
  sizes,
  loading = 'lazy',
}: {
  name: string;
  className?: string;
  sizes: string;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/img/${name}-640.avif 640w, /img/${name}-1024.avif 1024w`} sizes={sizes} />
      <img
        src={`/img/${name}-1024.webp`}
        srcSet={`/img/${name}-640.webp 640w, /img/${name}-1024.webp 1024w`}
        sizes={sizes}
        alt=""
        width={1024}
        height={576}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
