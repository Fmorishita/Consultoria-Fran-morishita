import "server-only";

/**
 * Un lead perdido por un 500 es dinero tirado: si algo falla en el guardado,
 * el usuario ve éxito y aquí sale la alerta.
 */
export async function alertar(asunto: string, detalle: unknown): Promise<void> {
  console.error(`[alerta] ${asunto}`, detalle);
  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        asunto,
        detalle: detalle instanceof Error ? detalle.message : detalle,
        sitio: process.env.NEXT_PUBLIC_SITE_URL ?? "bienes-raices",
        fecha: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("[alerta] no se pudo avisar al webhook de alertas", error);
  }
}
