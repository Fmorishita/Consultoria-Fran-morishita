import { SITIO } from "@contenido/sitio";

/** URL base canónica: env en producción, dominio del contenido como respaldo. */
export function urlSitio(): string {
  const explicita = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicita) return explicita.replace(/\/$/, "");
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return SITIO.dominio;
}

/** En preview y en deploys sin dominio definitivo no queremos indexación. */
export function permitirIndexacion(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.PERMITIR_INDEXACION === "1";
}
