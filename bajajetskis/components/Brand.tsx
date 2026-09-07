import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '@/content/copy'
import { r } from '@/lib/routes'

/**
 * El emblema completo solo se usa a partir de 120 px, que es la dimensión
 * mínima de reproducción digital que fija el manual (§02). Por debajo de eso
 * el grabado del sol y los rostros se empastan, así que en la barra de
 * navegación va el bloque tipográfico y no el medallón.
 */
export function Emblem({ size = 132, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <Image
      src="/assets/logo-baja-jetskis.png"
      alt="Baja Jetskis"
      width={size}
      height={size}
      priority={priority}
      className="h-auto w-auto"
      style={{ width: size, height: size }}
      sizes={`${size}px`}
    />
  )
}

/** Bloque tipográfico del logotipo: BAJA sobre JETSKIS con quillas doradas. */
export function Wordmark({
  lang,
  tone = 'light',
}: {
  lang: Lang
  tone?: 'light' | 'dark'
}) {
  const principal = tone === 'light' ? 'text-parchment' : 'text-navy'
  return (
    <Link
      href={r(lang).home}
      className="group inline-flex flex-col leading-none"
      aria-label="Baja Jetskis"
    >
      <span
        className={`font-display text-[1.35rem] font-bold tracking-emblem ${principal} transition-colors`}
      >
        BAJA
      </span>
      <span className="mt-1 flex items-center gap-2">
        <span className="h-px w-3 bg-gold" aria-hidden="true" />
        <span className="text-[0.6rem] font-bold tracking-[0.42em] text-gold">JETSKIS</span>
        <span className="h-px w-3 bg-gold" aria-hidden="true" />
      </span>
    </Link>
  )
}
