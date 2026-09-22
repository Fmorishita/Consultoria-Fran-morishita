import { SITIO } from "@contenido/sitio";

/** URL base canónica: env en producción, dominio del contenido como respaldo. */
export function urlSitio(): string {
  const explicita = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicita) return explicita.replace(/\/$/, "");
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return SITIO.dominio;
}

/**
 * Indexación: los preview nunca se indexan. Producción sí, salvo que
 * `PERMITIR_INDEXACION=0` lo apague (útil mientras el sitio vive en el
 * subdominio de Vercel y todavía faltan datos y fotos).
 */
export function permitirIndexacion(): boolean {
  const bandera = process.env.PERMITIR_INDEXACION;
  if (bandera === "1") return true;
  if (bandera === "0") return false;
  return process.env.VERCEL_ENV === "production";
}
