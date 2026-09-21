import { resumenAtribucion, type Atribucion } from "@/lib/atribucion";

export type OpcionesWhatsApp = {
  numero: string;
  mensaje: string;
  keyword?: string;
  atribucion?: Atribucion;
};

/** Deep link wa.me con mensaje prellenado + keyword + origen de la pauta. */
export function enlaceWhatsApp({ numero, mensaje, keyword, atribucion }: OpcionesWhatsApp): string {
  const lineas = [mensaje];
  if (keyword) lineas.push(`Ref: ${keyword}`);
  const origen = atribucion ? resumenAtribucion(atribucion) : undefined;
  if (origen) lineas.push(`Origen: ${origen}`);
  const texto = lineas.join("\n\n");
  return `https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;
}
