import { ui } from '@/content/microcopy';

/**
 * La estructura 15/30/15 de la Strategic Legal Session.
 *
 * Es una secuencia en el tiempo, no tres cosas equivalentes, así que se dibuja
 * como una línea con tres marcas y no como tres tarjetas iguales —que además
 * repetirían el patrón de otras secciones de la página.
 *
 * El ancho de cada tramo es proporcional a sus minutos (15/30/15), así que la
 * línea informa además de decorar: el bloque del medio se ve el doble de largo
 * porque dura el doble.
 */
export function SessionTimeline({
  steps,
}: {
  steps: readonly { step: number; minutes: string; title: string; text: string }[];
}) {
  // Los minutos salen del propio dato ("15 min" → 15) para no fijar la
  // proporción a mano y que deje de cuadrar si el contenido cambia.
  const weights = steps.map((s) => Number.parseInt(s.minutes, 10) || 1);

  return (
    <ol className="mt-12 grid gap-y-10 aparece-escalonado lg:grid-cols-[var(--tramos)] lg:gap-x-8" style={{ ['--tramos' as string]: weights.map((w) => `${w}fr`).join(' ') }}>
      {steps.map((s, i) => (
        <li key={s.step} className="relative">
          {/* La marca y su tramo de línea. En móvil no hay línea: las fases se
              leen en vertical y el filete superior ya las separa. */}
          <div aria-hidden="true" className="hidden items-center lg:flex">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue" />
            <span className={`h-px flex-1 ${i === steps.length - 1 ? 'bg-line' : 'bg-blue/35'}`} />
          </div>
          <div className="border-t border-line pt-5 text-center lg:border-t-0 lg:pt-6">
            <p className="text-step--1 font-medium uppercase tracking-[0.12em] text-blue">
              {s.minutes}
              <span className="sr-only"> — {ui.sessionPhase(i + 1, steps.length)}</span>
            </p>
            <h3 className="mt-2 text-step-2 leading-tight">{s.title}</h3>
            <p className="mx-auto mt-3 max-w-prose text-step--1 leading-relaxed text-slate">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
