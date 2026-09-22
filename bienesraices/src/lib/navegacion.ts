import { UI } from "@contenido/ui";
import { t, type Idioma } from "@/lib/i18n";

/** Todas las rutas del sitio en un solo lugar. */
export function rutas(idioma: Idioma) {
  const base = `/${idioma}`;
  return {
    inicio: base,
    propiedades: `${base}/propiedades`,
    propiedad: (slug: string) => `${base}/propiedades/${slug}`,
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

/** Nav principal: corto y enfocado en la venta. */
export function enlacesPrincipales(idioma: Idioma) {
  const r = rutas(idioma);
  return [
    { href: r.propiedades, texto: t(UI.nav.proyectos, idioma) },
    { href: r.sobreMi, texto: t(UI.nav.sobreMi, idioma) },
    { href: r.contacto, texto: t(UI.nav.contacto, idioma) },
  ];
}

/** El pie sí lleva las páginas de la parte B2B. */
export function enlacesPie(idioma: Idioma) {
  const r = rutas(idioma);
  return [
    ...enlacesPrincipales(idioma),
    { href: r.portafolio, texto: t(UI.nav.portafolio, idioma) },
    { href: r.desarrolladores, texto: t(UI.nav.desarrolladores, idioma) },
  ];
}
