/**
 * Marcas de plano arquitectónico. Es el único gesto gráfico audaz del sitio
 * y se usa con moderación: el hero y uno o dos momentos más.
 */

/** Curvas topográficas de la península de Baja California. */
export function TopoLines({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 400 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.5">
        <path d="M150 0c22 62-14 96 6 158 21 63 68 84 54 150-13 63-72 74-64 140 7 62 54 78 40 152" />
        <path d="M186 0c24 66-16 104 7 172 24 68 74 90 58 162-14 68-78 80-69 152 8 67 58 84 43 164" />
        <path d="M222 0c26 70-18 112 8 186 26 74 80 98 63 176-15 74-84 87-75 165 9 73 63 91 47 178" />
        <path d="M258 0c28 74-20 120 9 200 28 80 86 105 68 189-16 80-90 93-80 177 9 79 67 98 50 191" />
        <path d="M294 0c30 78-22 128 10 214 30 86 92 112 72 202-17 85-96 100-86 190 10 84 72 105 54 204" />
      </g>
    </svg>
  );
}

/**
 * Cota: la línea con remates que mide una distancia en un plano.
 * Se usa para etiquetar un dato real, nunca como adorno vacío.
 */
export function Cota({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className="flex items-center" >
        <span className="h-2.5 w-px bg-current opacity-60" />
        <span className="h-px w-5 bg-current opacity-60" />
      </span>
      {children}
    </span>
  );
}

/** Esquina de referencia del plano: dos trazos finos que cruzan. */
export function PlanCorner({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 48 48" fill="none">
      <path d="M0 12h48M12 0v48" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}
