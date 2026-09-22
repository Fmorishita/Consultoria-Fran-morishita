"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { Entrada, Etiqueta, Seleccion } from "@/componentes/ui/campo";
import { formatoMoneda, mensualidad, type Moneda } from "@/lib/formato";
import type { Idioma } from "@/lib/i18n";
import { rastrear } from "@/lib/tracking";

export type TextosCalculadora = {
  titulo: string;
  precio: string;
  enganche: string;
  plazo: string;
  meses: string;
  engancheResultado: string;
  mensualidadResultado: string;
  financiar: string;
  leyenda: string;
  cta: string;
  sinIntereses: string;
  tasa: string;
};

export type PropsCalculadora = {
  idioma: Idioma;
  moneda: Moneda;
  engancheMinPct: number;
  plazosMeses: number[];
  tasaAnualPct: number;
  precioInicial?: number;
  textos: TextosCalculadora;
  whatsapp: { numero: string; mensajeBase: string; keyword: string };
  contexto?: string;
};

export function CalculadoraFinanciamiento({
  idioma,
  moneda,
  engancheMinPct,
  plazosMeses,
  tasaAnualPct,
  precioInicial,
  textos,
  whatsapp,
  contexto,
}: PropsCalculadora) {
  const [precio, setPrecio] = useState<number | undefined>(precioInicial);
  const [enganchePct, setEnganchePct] = useState(engancheMinPct);
  const [plazo, setPlazo] = useState(plazosMeses[0] ?? 12);
  const yaRastreado = useRef(false);

  const calculo = useMemo(() => {
    if (!precio || precio <= 0) return undefined;
    const enganche = (precio * enganchePct) / 100;
    const financiado = precio - enganche;
    return { enganche, financiado, pago: mensualidad(financiado, tasaAnualPct, plazo) };
  }, [precio, enganchePct, plazo, tasaAnualPct]);

  useEffect(() => {
    if (yaRastreado.current || !calculo) return;
    yaRastreado.current = true;
    rastrear("calculadora_usada", { content_name: contexto ?? whatsapp.keyword, plazo, enganche_pct: enganchePct });
  }, [calculo, contexto, enganchePct, plazo, whatsapp.keyword]);

  const mensaje = calculo
    ? `${whatsapp.mensajeBase}\n\n${textos.mensualidadResultado}: ${formatoMoneda(calculo.pago, moneda, idioma)} · ${textos.plazo}: ${plazo} ${textos.meses} · ${textos.enganche}: ${enganchePct}%`
    : whatsapp.mensajeBase;

  return (
    <div className="border border-borde bg-superficie p-6 md:p-10">
      <h3 className="titular titular-md">{textos.titulo}</h3>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div>
          <Etiqueta htmlFor="calc-precio">{textos.precio}</Etiqueta>
          <Entrada
            id="calc-precio"
            inputMode="numeric"
            value={precio ?? ""}
            onChange={(e) => {
              const limpio = e.target.value.replace(/\D/g, "");
              setPrecio(limpio ? Number(limpio) : undefined);
            }}
            placeholder={moneda === "MXN" ? "2,500,000" : "150,000"}
          />
        </div>

        <div>
          <Etiqueta htmlFor="calc-enganche">
            {textos.enganche}: <span className="text-texto">{enganchePct}%</span>
          </Etiqueta>
          <input
            id="calc-enganche"
            type="range"
            min={engancheMinPct}
            max={90}
            step={5}
            value={enganchePct}
            onChange={(e) => setEnganchePct(Number(e.target.value))}
            className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-borde accent-[var(--acento)]"
          />
        </div>

        <div>
          <Etiqueta htmlFor="calc-plazo">{textos.plazo}</Etiqueta>
          <Seleccion id="calc-plazo" value={plazo} onChange={(e) => setPlazo(Number(e.target.value))}>
            {plazosMeses.map((meses) => (
              <option key={meses} value={meses}>
                {meses} {textos.meses}
              </option>
            ))}
          </Seleccion>
        </div>
      </div>

      <dl className="mt-10 grid gap-6 border-t border-borde pt-8 sm:grid-cols-3">
        <div>
          <dt className="antetitulo">{textos.engancheResultado}</dt>
          <dd className="titular titular-sm mt-2">
            {calculo ? formatoMoneda(calculo.enganche, moneda, idioma) : "-"}
          </dd>
        </div>
        <div>
          <dt className="antetitulo">{textos.financiar}</dt>
          <dd className="titular titular-sm mt-2">
            {calculo ? formatoMoneda(calculo.financiado, moneda, idioma) : "-"}
          </dd>
        </div>
        <div>
          <dt className="antetitulo text-acento-suave">{textos.mensualidadResultado}</dt>
          <dd className="titular titular-md mt-2 text-acento-suave">
            {calculo ? formatoMoneda(calculo.pago, moneda, idioma) : "-"}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-texto-suave">
        {tasaAnualPct > 0 ? `${textos.tasa}: ${tasaAnualPct}%` : textos.sinIntereses}
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <CtaWhatsApp
          numero={whatsapp.numero}
          mensaje={mensaje}
          keyword={whatsapp.keyword}
          contexto={contexto}
          etiqueta={textos.cta}
          tamano="lg"
        />
      </div>

      <p className="mt-6 max-w-xl text-xs leading-relaxed text-texto-suave/80">{textos.leyenda}</p>
    </div>
  );
}
