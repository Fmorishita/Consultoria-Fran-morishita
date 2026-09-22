import type { Caso } from "@contenido/esquemas";
import { direccionComercialSanPedro } from "@contenido/casos/direccion-comercial-san-pedro";

/** Un caso nuevo = un archivo más en esta carpeta y una línea aquí. */
export const CASOS: Caso[] = [direccionComercialSanPedro];

export function casosActivos(): Caso[] {
  return CASOS.filter((c) => c.activo);
}

export function casoPorSlug(slug: string): Caso | undefined {
  return CASOS.find((c) => c.slug === slug);
}
