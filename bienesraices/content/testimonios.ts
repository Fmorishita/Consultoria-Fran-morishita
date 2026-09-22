import { esquemaTestimonio, type Testimonio } from "@contenido/esquemas";

const ALMACEN = "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio";

export const TESTIMONIOS: Testimonio[] = [
  {
    slug: "gus-marcos",
    destacado: true,
    nombre: "Gus Marcos",
    cargo: {
      es: "Desarrollador inmobiliario · San Pedro Garza García, N.L.",
      en: "Real estate developer · San Pedro Garza García, N.L.",
    },
    foto: `${ALMACEN}/imagenes/1781439262907-TESTIMONIO_GUS_MARCOS.jpg`,
    video: `${ALMACEN}/videos/1781439108055-TESTIMONIO_GUS_MARCOS_-_FRAN_MORISHITA.mp4`,
    videoPoster: `${ALMACEN}/imagenes/1781508583168-Screen_Shot_2026-06-15_at_12_29_32_a_m_.jpg`,
    orientacion: "vertical",
  },
].map((testimonio) => esquemaTestimonio.parse(testimonio));

export const TESTIMONIO_DESTACADO = TESTIMONIOS.find((t) => t.destacado);

export function testimonioPorSlug(slug: string | undefined): Testimonio | undefined {
  return slug ? TESTIMONIOS.find((t) => t.slug === slug) : undefined;
}

/**
 * Voces de compradores.
 *
 * Va vacío a propósito. Un testimonio de cliente no se redacta: se pide, se
 * transcribe textual y se publica con permiso. Inventar uno sería exactamente
 * la práctica que esta página le reprocha al gremio en la sección de dudas,
 * y bastaría con que un prospecto preguntara por ese comprador para tirar la
 * credibilidad de todo lo demás.
 *
 * Para publicar uno hacen falta cuatro cosas por cliente: nombre tal como
 * quiere aparecer, ciudad, qué compró y la frase textual, más su permiso por
 * escrito. Con eso se agrega aquí y la sección aparece sola.
 *
 * Ejemplo de la forma que toma cada entrada:
 *
 *   {
 *     slug: "nombre-apellido",
 *     nombre: "Nombre Apellido",
 *     cargo: { es: "Compradora", en: "Buyer" },
 *     ciudad: "San Diego, California",
 *     compro: { es: "Lote con vista en Alta Tierra", en: "View lot at Alta Tierra" },
 *     cita: { es: "Frase textual del cliente.", en: "The client's exact words." },
 *   }
 */
export const TESTIMONIOS_CLIENTES: Testimonio[] = [].map((testimonio) =>
  esquemaTestimonio.parse(testimonio),
);
