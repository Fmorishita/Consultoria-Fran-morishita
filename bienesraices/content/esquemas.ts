import { z } from "zod";
import { REGEX_PENDIENTE, type Pendiente } from "@/lib/pendiente";

/**
 * Todo el contenido comercial vive en archivos tipados y validados aquí.
 * Ningún componente trae texto de contenido dentro.
 */

export const esquemaI18n = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

export const esquemaPendiente = z.custom<Pendiente>(
  (v) => typeof v === "string" && REGEX_PENDIENTE.test(v.trim()),
  { message: "Debe tener la forma [CONFIRMAR: qué falta]" },
);

/** Número confirmado o marcador de dato pendiente. */
export const numeroQuiza = z.union([z.number(), esquemaPendiente]);

export const esquemaImagen = z.object({
  src: z.string().min(1),
  alt: esquemaI18n,
  ancho: z.number().optional(),
  alto: z.number().optional(),
});

export const esquemaSeo = z.object({
  title: esquemaI18n,
  description: esquemaI18n,
  ogImage: z.string().optional(),
});

export const esquemaCtaWhatsApp = z.object({
  keyword: z.string().min(1),
  mensajePrefill: esquemaI18n,
});

export const TIPOS_PROYECTO = ["lotes", "casas", "departamentos", "preventa", "comercial"] as const;
export const ESTADOS_PROYECTO = ["preventa", "entrega-inmediata", "en-construccion"] as const;
export const MONEDAS = ["MXN", "USD"] as const;

export const esquemaProyecto = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Si es false: no se lista, no entra al sitemap y se marca noindex. */
  activo: z.boolean(),
  /** Requiere autorización por escrito del desarrollador antes de publicar. */
  autorizado: z.boolean(),
  nombre: z.string().min(1),
  desarrollador: z.string().optional(),
  ciudad: z.string().min(1),
  tipo: z.enum(TIPOS_PROYECTO),
  estado: z.enum(ESTADOS_PROYECTO),
  hero: z.object({
    imagen: z.string().optional(),
    video: z.string().optional(),
    titulo: esquemaI18n,
    subtitulo: esquemaI18n,
  }),
  pitch: z.array(esquemaI18n).min(1),
  ubicacion: z.object({
    direccion: z.string().min(1),
    coords: z.tuple([z.number(), z.number()]).optional(),
    mapaEstatico: z.string().optional(),
    tiemposClave: z.array(z.object({ destino: esquemaI18n, minutos: numeroQuiza })).default([]),
  }),
  amenidades: z.array(z.object({ icono: z.string(), texto: esquemaI18n })).default([]),
  inventario: z.object({
    etiqueta: esquemaI18n,
    superficieMin: numeroQuiza.optional(),
    superficieMax: numeroQuiza.optional(),
    precioDesde: numeroQuiza.optional(),
    moneda: z.enum(MONEDAS),
    notaLegal: esquemaI18n.optional(),
  }),
  financiamiento: z
    .object({
      engancheMinPct: z.number().min(0).max(100),
      plazosMeses: z.array(z.number().int().positive()).min(1),
      /** 0 = sin intereses. */
      tasaAnualPct: z.number().min(0),
      nota: esquemaI18n.optional(),
    })
    .optional(),
  galeria: z.array(esquemaImagen).default([]),
  faq: z.array(z.object({ p: esquemaI18n, r: esquemaI18n })).default([]),
  whatsapp: esquemaCtaWhatsApp,
  seo: esquemaSeo,
});

export type Proyecto = z.infer<typeof esquemaProyecto>;

export const esquemaCaso = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  activo: z.boolean(),
  cliente: z.string().min(1),
  anonimo: z.boolean().default(false),
  sector: esquemaI18n,
  periodo: z.string().optional(),
  portada: z.string().optional(),
  titulo: esquemaI18n,
  resumen: esquemaI18n,
  reto: z.array(esquemaI18n).min(1),
  sistema: z.array(z.object({ titulo: esquemaI18n, detalle: esquemaI18n })).min(1),
  resultados: z
    .array(z.object({ cifra: z.string(), etiqueta: esquemaI18n, nota: esquemaI18n.optional() }))
    .default([]),
  testimonioSlug: z.string().optional(),
  seo: esquemaSeo,
});

export type Caso = z.infer<typeof esquemaCaso>;

export const esquemaTestimonio = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  destacado: z.boolean().default(false),
  nombre: z.string().min(1),
  cargo: esquemaI18n,
  empresa: z.string().optional(),
  foto: z.string().optional(),
  /** Archivo mp4 propio o embed. Nunca se carga el player en el primer render. */
  video: z.string().optional(),
  videoPoster: z.string().optional(),
  cita: esquemaI18n.optional(),
});

export type Testimonio = z.infer<typeof esquemaTestimonio>;

export const esquemaCifra = z.object({
  valor: numeroQuiza,
  prefijo: z.string().default(""),
  sufijo: z.string().default(""),
  etiqueta: esquemaI18n,
  /** De dónde sale la cifra. Si está pendiente, la nota no se pinta. */
  respaldo: esquemaI18n.optional(),
});

export type Cifra = z.infer<typeof esquemaCifra>;

export const esquemaSitio = z.object({
  nombre: z.string(),
  rol: esquemaI18n,
  ciudad: esquemaI18n,
  dominio: z.string().url(),
  direccionVisual: z.enum(["a", "b"]),
  whatsapp: z.object({
    numero: z.string(),
    mensajeGeneral: esquemaI18n,
  }),
  email: z.string().optional(),
  calendario: z.string().optional(),
  redes: z.array(z.object({ nombre: z.string(), url: z.string() })).default([]),
  legal: z.object({
    registroEstatal: z.string().optional(),
    razonSocial: z.string().optional(),
    domicilio: z.string().optional(),
    leyendaProyectos: esquemaI18n,
  }),
});

export type Sitio = z.infer<typeof esquemaSitio>;
