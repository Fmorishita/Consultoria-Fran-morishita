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
