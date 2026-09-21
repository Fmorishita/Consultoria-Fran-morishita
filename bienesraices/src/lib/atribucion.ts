/**
 * Captura de UTMs. Sin esto no sabemos qué anuncio vendió.
 * - Cookie de primera parte (90 días): primer contacto, nunca se pisa.
 * - sessionStorage: contacto actual, se actualiza con cada clic de anuncio.
 * Ambos viajan en el lead y en el mensaje de WhatsApp.
 */
export const CLAVES_ATRIBUCION = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type ClaveAtribucion = (typeof CLAVES_ATRIBUCION)[number];

export type Atribucion = Partial<Record<ClaveAtribucion, string>> & {
  landing?: string;
  referrer?: string;
  primer_contacto?: string;
};

export const COOKIE_ATRIBUCION = "fm_atribucion";
export const CLAVE_SESION = "fm_atribucion_actual";
const DIAS_COOKIE = 90;

function leerCookie(nombre: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const parte = document.cookie.split("; ").find((c) => c.startsWith(`${nombre}=`));
  return parte ? decodeURIComponent(parte.slice(nombre.length + 1)) : undefined;
}

function escribirCookie(nombre: string, valor: string) {
  if (typeof document === "undefined") return;
  const vence = new Date(Date.now() + DIAS_COOKIE * 864e5).toUTCString();
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${vence}; path=/; SameSite=Lax`;
}

function parsea(crudo: string | undefined | null): Atribucion {
  if (!crudo) return {};
  try {
    const datos: unknown = JSON.parse(crudo);
    return typeof datos === "object" && datos !== null ? (datos as Atribucion) : {};
  } catch {
    return {};
  }
}

function deLaUrl(): Atribucion {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const encontrados: Atribucion = {};
  for (const clave of CLAVES_ATRIBUCION) {
    const valor = params.get(clave);
    if (valor) encontrados[clave] = valor.slice(0, 200);
  }
  return encontrados;
}

/** Se llama una vez por carga, desde el layout. */
export function capturarAtribucion(): Atribucion {
  if (typeof window === "undefined") return {};
  const enUrl = deLaUrl();
  const hayNuevos = Object.keys(enUrl).length > 0;

  const actual: Atribucion = hayNuevos
    ? { ...enUrl, landing: window.location.pathname, referrer: document.referrer || undefined }
    : parsea(window.sessionStorage.getItem(CLAVE_SESION));

  if (hayNuevos) {
    try {
      window.sessionStorage.setItem(CLAVE_SESION, JSON.stringify(actual));
    } catch {
      /* Safari en modo privado: seguimos con la cookie. */
    }
  }

  const primero = parsea(leerCookie(COOKIE_ATRIBUCION));
  if (Object.keys(primero).length === 0 && hayNuevos) {
    escribirCookie(
      COOKIE_ATRIBUCION,
      JSON.stringify({ ...actual, primer_contacto: new Date().toISOString() }),
    );
  }

  return leerAtribucion();
}

/** Lo que se adjunta a cada lead y a cada mensaje de WhatsApp. */
export function leerAtribucion(): Atribucion {
  if (typeof window === "undefined") return {};
  const primero = parsea(leerCookie(COOKIE_ATRIBUCION));
  let actual: Atribucion = {};
  try {
    actual = parsea(window.sessionStorage.getItem(CLAVE_SESION));
  } catch {
    actual = {};
  }
  return { ...primero, ...actual, primer_contacto: primero.primer_contacto };
}

/** Resumen corto para meterlo en el texto de WhatsApp. */
export function resumenAtribucion(atribucion: Atribucion): string | undefined {
  const fuente = atribucion.utm_source ?? (atribucion.fbclid ? "facebook" : atribucion.gclid ? "google" : undefined);
  if (!fuente) return undefined;
  return [fuente, atribucion.utm_campaign, atribucion.utm_content].filter(Boolean).join(" / ");
}
