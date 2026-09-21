import type { Proyecto } from "@contenido/esquemas";
import { MOSTRAR_PENDIENTES } from "@/lib/pendiente";
import { altaTierra } from "@contenido/proyectos/alta-tierra";

/**
 * Publicar un proyecto nuevo = crear su archivo y agregarlo a esta lista.
 * Ningún componente se toca. Ver `_plantilla.ts`.
 */
export const PROYECTOS: Proyecto[] = [altaTierra];

/** Se puede enseñar públicamente: activo y con autorización del desarrollador. */
export function esPublicable(proyecto: Proyecto): boolean {
  return proyecto.activo && (proyecto.autorizado || MOSTRAR_PENDIENTES);
}

export function proyectosListables(): Proyecto[] {
  return PROYECTOS.filter(esPublicable);
}

export function proyectoPorSlug(slug: string): Proyecto | undefined {
  return PROYECTOS.find((p) => p.slug === slug);
}

/** Solo estos entran al sitemap y se dejan indexar. */
export function proyectosIndexables(): Proyecto[] {
  return PROYECTOS.filter((p) => p.activo && p.autorizado);
}
