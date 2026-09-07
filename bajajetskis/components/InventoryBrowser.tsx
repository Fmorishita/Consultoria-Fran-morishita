'use client'

import { useMemo, useState } from 'react'
import { UnitCard } from './UnitCard'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './icons'
import { t, type Lang } from '@/content/copy'
import type { Unidad } from '@/data/inventario'

type RangoId = 'todos' | 'bajo' | 'medio' | 'alto'

const RANGOS: Record<RangoId, (precio: number) => boolean> = {
  todos: () => true,
  bajo: (p) => p < 10000,
  medio: (p) => p >= 10000 && p <= 13000,
  alto: (p) => p > 13000,
}

function Selector({
  etiqueta,
  valor,
  opciones,
  onChange,
}: {
  etiqueta: string
  valor: string
  opciones: { valor: string; texto: string }[]
  onChange: (v: string) => void
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.625rem] font-bold tracking-[0.16em] text-navy uppercase">
        {etiqueta}
      </span>
      <select
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full appearance-none border border-navy/25 bg-white px-4 py-2.5 pr-9 text-sm text-navy transition-colors hover:border-navy focus:border-navy"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%230B1D33' stroke-width='1.5'%3E%3Cpath d='m5 8 5 5 5-5'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.65rem center',
          backgroundSize: '1.1rem',
        }}
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.texto}
          </option>
        ))}
      </select>
    </label>
  )
}

export function InventoryBrowser({ unidades, lang }: { unidades: Unidad[]; lang: Lang }) {
  const c = t(lang)
  const [marca, setMarca] = useState('todas')
  const [anio, setAnio] = useState('todos')
  const [rango, setRango] = useState<RangoId>('todos')

  const marcas = useMemo(
    () => Array.from(new Set(unidades.map((u) => u.marca))).sort(),
    [unidades],
  )
  const anios = useMemo(
    () => Array.from(new Set(unidades.map((u) => u.anio))).sort((a, b) => b - a),
    [unidades],
  )

  const filtradas = useMemo(
    () =>
      unidades.filter(
        (u) =>
          (marca === 'todas' || u.marca === marca) &&
          (anio === 'todos' || String(u.anio) === anio) &&
          RANGOS[rango](u.precioUSD),
      ),
    [unidades, marca, anio, rango],
  )

  const hayFiltro = marca !== 'todas' || anio !== 'todos' || rango !== 'todos'

  const limpiar = () => {
    setMarca('todas')
    setAnio('todos')
    setRango('todos')
  }

  return (
    <div>
      <div className="border border-navy/15 bg-white p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Selector
            etiqueta={c.inventario.filtros.marca}
            valor={marca}
            onChange={setMarca}
            opciones={[
              { valor: 'todas', texto: c.inventario.filtros.todas },
              ...marcas.map((m) => ({ valor: m, texto: m })),
            ]}
          />
          <Selector
            etiqueta={c.inventario.filtros.anio}
            valor={anio}
            onChange={setAnio}
            opciones={[
              { valor: 'todos', texto: c.inventario.filtros.todos },
              ...anios.map((a) => ({ valor: String(a), texto: String(a) })),
            ]}
          />
          <Selector
            etiqueta={c.inventario.filtros.precio}
            valor={rango}
            onChange={(v) => setRango(v as RangoId)}
            opciones={c.inventario.filtros.rangos.map((r) => ({
              valor: r.id,
              texto: r.etiqueta,
            }))}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-4">
          <p aria-live="polite" className="text-sm font-semibold text-navy">
            {c.inventario.filtros.resultados(filtradas.length)}
          </p>
          {hayFiltro && (
            <button
              type="button"
              onClick={limpiar}
              className="min-h-11 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-deep"
            >
              {c.inventario.filtros.limpiar}
            </button>
          )}
        </div>
      </div>

      {filtradas.length === 0 ? (
        <div className="mt-10 border border-navy/15 bg-white p-10 text-center">
          <p className="font-display text-xl font-bold text-navy uppercase">
            {c.inventario.filtros.vacio}
          </p>
          <p className="mx-auto mt-4 max-w-md text-body leading-relaxed text-ink/80">
            {c.inventario.filtros.vacioAyuda}
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button type="button" onClick={limpiar} className="btn btn-ghost">
              {c.inventario.filtros.limpiar}
            </button>
            <WhatsAppLink ctx={{ seccion: 'sin-stock', lang }} className="btn btn-primary">
              <WhatsAppIcon className="h-4 w-4" />
              {c.inventario.filtros.vacioCta}
            </WhatsAppLink>
          </div>
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((u) => (
            <li key={u.slug}>
              <UnitCard unidad={u} lang={lang} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
