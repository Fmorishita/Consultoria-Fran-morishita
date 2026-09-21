import { MOSTRAR_PENDIENTES } from "@/lib/pendiente";

/**
 * Solo aparece en los deploys de preview. En producción devuelve null,
 * así ningún [CONFIRMAR] llega al público.
 */
export function ChipPendiente({ children }: { children?: string }) {
  if (!MOSTRAR_PENDIENTES || !children) return null;
  return (
    <span className="my-1 inline-flex items-start gap-2 border border-dashed border-pendiente/60 bg-pendiente/10 px-3 py-1.5 text-left text-xs leading-snug text-pendiente">
      <span aria-hidden>▲</span>
      <span>{children}</span>
    </span>
  );
}
