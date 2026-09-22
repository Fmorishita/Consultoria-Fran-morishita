/**
 * Tipo y estado inicial del envío de leads.
 *
 * Viven fuera de `enviar-lead.ts` a propósito: un archivo marcado con
 * "use server" solo puede exportar funciones async. Exportar aquí el objeto
 * inicial desde la acción compilaba sin quejarse, pero el módulo reventaba al
 * ejecutarse y cada envío del formulario terminaba en un 500.
 */
export type EstadoLead = {
  ok: boolean;
  errores?: Partial<Record<"nombre" | "telefono" | "email" | "consentimiento" | "general", true>>;
  destino?: string;
};

export const ESTADO_INICIAL: EstadoLead = { ok: false };
