import { UI } from "@contenido/ui";
import { t, type Idioma } from "@/lib/i18n";

/** Todas las rutas del sitio en un solo lugar. */
export function rutas(idioma: Idioma) {
  const base = `/${idioma}`;
  return {
    inicio: base,
    proyectos: `${base}/proyectos`,
    proyecto: (slug: string) => `${base}/proyectos/${slug}`,
    portafolio: `${base}/portafolio`,
    caso: (slug: string) => `${base}/portafolio/${slug}`,
    desarrolladores: `${base}/desarrolladores`,
    sobreMi: `${base}/sobre-mi`,
    contacto: `${base}/contacto`,
    gracias: `${base}/gracias`,
    privacidad: `${base}/aviso-de-privacidad`,
    styleguide: `${base}/styleguide`,
  };
}

export function enlacesPrincipales(idioma: Idioma) {
  const r = rutas(idioma);
  return [
    { href: r.proyectos, texto: t(UI.nav.proyectos, idioma) },
    { href: r.portafolio, texto: t(UI.nav.portafolio, idioma) },
    { href: r.desarrolladores, texto: t(UI.nav.desarrolladores, idioma) },
    { href: r.sobreMi, texto: t(UI.nav.sobreMi, idioma) },
    { href: r.contacto, texto: t(UI.nav.contacto, idioma) },
  ];
}
