'use client'

import Image from 'next/image'
import { useState } from 'react'
import { t, pick, type Lang } from '@/content/copy'
import type { Foto } from '@/data/inventario'

export function Gallery({ fotos, lang }: { fotos: Foto[]; lang: Lang }) {
  const c = t(lang)
  const [activa, setActiva] = useState(0)
  const foto = fotos[activa]

  return (
    <div>
      <figure>
        <div className="relative aspect-4/3 overflow-hidden border border-navy/12 bg-navy">
          <Image
            src={foto.src}
            alt={pick(foto.alt, lang)}
            fill
            priority
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 bg-navy/85 px-3 py-1.5 text-[0.625rem] font-bold tracking-[0.16em] text-gold uppercase">
            {pick(foto.toma, lang)}
          </span>
        </div>
        {foto.placeholder && (
          /* PLACEHOLDER — imagen de referencia mientras llega la sesión de fotos */
          <figcaption className="mt-3 text-caption text-ink">
            {c.unidad.fotosPlaceholder}
          </figcaption>
        )}
      </figure>

      {fotos.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-2">
          {fotos.map((f, i) => (
            <li key={f.src}>
              <button
                type="button"
                onClick={() => setActiva(i)}
                aria-current={i === activa}
                aria-label={pick(f.toma, lang)}
                className={`relative block aspect-4/3 w-full overflow-hidden border transition-colors ${
                  i === activa ? 'border-gold' : 'border-navy/15 hover:border-navy/40'
                }`}
              >
                <Image
                  src={f.src}
                  alt=""
                  fill
                  sizes="120px"
                  className={`object-cover ${i === activa ? '' : 'opacity-75'}`}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
