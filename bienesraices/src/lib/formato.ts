import { localeCompleto, type Idioma } from "@/lib/i18n";

export type Moneda = "MXN" | "USD";

export function formatoMoneda(valor: number, moneda: Moneda, idioma: Idioma): string {
  return new Intl.NumberFormat(localeCompleto(idioma), {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(valor);
}

export function formatoNumero(valor: number, idioma: Idioma, decimales = 0): string {
  return new Intl.NumberFormat(localeCompleto(idioma), {
    maximumFractionDigits: decimales,
    minimumFractionDigits: decimales,
  }).format(valor);
}

export function formatoSuperficie(valor: number, idioma: Idioma): string {
  return `${formatoNumero(valor, idioma)} m²`;
}

/** Mensualidad con amortización simple. Tasa 0 = división directa. */
export function mensualidad(monto: number, tasaAnualPct: number, plazoMeses: number): number {
  if (plazoMeses <= 0) return 0;
  if (tasaAnualPct <= 0) return monto / plazoMeses;
  const i = tasaAnualPct / 100 / 12;
  const factor = Math.pow(1 + i, plazoMeses);
  return (monto * i * factor) / (factor - 1);
}
