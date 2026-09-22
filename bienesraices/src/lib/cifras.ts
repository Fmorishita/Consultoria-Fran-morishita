import type { CifraLista } from "@/componentes/track-record";
import { t, type Idioma } from "@/lib/i18n";
import { numero, texto } from "@/lib/pendiente";
import { TRACK_RECORD } from "@contenido/track-record";

/**
 * Las cifras del track record listas para pintar. Al comprador solo le llegan
 * las que le importan; las marcadas `soloDesarrolladores` (volumen facturado)
 * se quedan en /desarrolladores.
 */
export function cifrasTrackRecord(idioma: Idioma, { paraDesarrolladores = false } = {}): CifraLista[] {
  return TRACK_RECORD.filter((cifra) => paraDesarrolladores || !cifra.soloDesarrolladores).map((cifra) => ({
    valor: numero(cifra.valor),
    prefijo: cifra.prefijo,
    sufijo: cifra.sufijo,
    etiqueta: t(cifra.etiqueta, idioma),
    respaldo: texto(cifra.respaldo, idioma),
  }));
}
