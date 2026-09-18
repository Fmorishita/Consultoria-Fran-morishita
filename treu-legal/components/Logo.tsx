import Image from 'next/image';

const WORDMARK = { width: 640, height: 201 };
const ISOTIPO = { width: 320, height: 323 };

/**
 * Wordmark horizontal de la firma: "TREU / LEGAL & BUSINESS".
 * Variante azul sobre fondo claro, blanca sobre azul.
 */
export function Logo({
  variant = 'azul',
  className = 'h-8 w-auto',
  priority = false,
}: {
  variant?: 'azul' | 'blanco';
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/wordmark-${variant}.webp`}
      alt="Treu Legal & Business"
      width={WORDMARK.width}
      height={variant === 'azul' ? 201 : 305}
      className={className}
      priority={priority}
      sizes="240px"
    />
  );
}

/** Isotipo: la "T" con el perfil del león. Decorativo. */
export function Isotipo({
  variant = 'azul',
  className = 'h-8 w-8',
}: {
  variant?: 'azul' | 'blanco';
  className?: string;
}) {
  return (
    <Image
      src={`/brand/isotipo-${variant}.webp`}
      alt=""
      aria-hidden="true"
      width={ISOTIPO.width}
      height={ISOTIPO.height}
      className={className}
      sizes="160px"
    />
  );
}
