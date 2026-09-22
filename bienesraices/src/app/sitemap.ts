import type { MetadataRoute } from "next";
import { IDIOMAS } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { urlSitio } from "@/lib/url-sitio";
import { casosActivos } from "@contenido/casos";
import { proyectosIndexables } from "@contenido/proyectos";

/** Se genera desde el contenido: si un proyecto no está autorizado, no entra. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlSitio();
  const entradas: MetadataRoute.Sitemap = [];

  for (const idioma of IDIOMAS) {
    const r = rutas(idioma);
    const fijas = [r.inicio, r.propiedades, r.portafolio, r.desarrolladores, r.sobreMi, r.contacto, r.privacidad];

    for (const ruta of fijas) {
      entradas.push({
        url: `${base}${ruta}`,
        lastModified: new Date(),
        changeFrequency: ruta === r.inicio ? "weekly" : "monthly",
        priority: ruta === r.inicio ? 1 : 0.7,
      });
    }

    for (const proyecto of proyectosIndexables()) {
      entradas.push({ url: `${base}${r.propiedad(proyecto.slug)}`, lastModified: new Date(), priority: 0.9 });
    }

    for (const caso of casosActivos()) {
      entradas.push({ url: `${base}${r.caso(caso.slug)}`, lastModified: new Date(), priority: 0.6 });
    }
  }

  return entradas;
}
