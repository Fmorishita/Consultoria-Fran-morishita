import type { ReactNode } from 'react'

export function SectionHead({
  eyebrow,
  titulo,
  parrafo,
  tono = 'claro',
  align = 'left',
  children,
}: {
  eyebrow: string
  titulo: string
  parrafo?: string
  tono?: 'claro' | 'oscuro'
  align?: 'left' | 'center'
  children?: ReactNode
}) {
  const oscuro = tono === 'oscuro'
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${oscuro ? 'eyebrow-on-dark' : ''} ${align === 'center' ? 'justify-center' : ''}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-5 font-display text-[1.75rem] leading-tight font-bold uppercase sm:text-h1 ${
          oscuro ? 'text-parchment' : 'text-navy'
        }`}
      >
        {titulo}
      </h2>
      {parrafo && (
        <p className={`mt-5 text-body-lg leading-relaxed ${oscuro ? 'text-parchment/80' : 'text-ink'}`}>
          {parrafo}
        </p>
      )}
      {children}
    </div>
  )
}
