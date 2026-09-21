import { t, type Idioma } from "@/lib/i18n";
import { numero, texto } from "@/lib/pendiente";
import { rutas } from "@/lib/navegacion";
import { urlSitio } from "@/lib/url-sitio";
import type { Proyecto } from "@contenido/esquemas";
import { SITIO } from "@contenido/sitio";

type Datos = Record<string, unknown>;

export function JsonLd({ datos }: { datos: Datos }) {
  return (
    <script
      type="application/ld+json"
      // El contenido viene de archivos propios, no de entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}

export function personaJsonLd(idioma: Idioma): Datos {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITIO.nombre,
    jobTitle: t(SITIO.rol, idioma),
    url: `${urlSitio()}/${idioma}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ensenada",
      addressRegion: "Baja California",
      addressCountry: "MX",
    },
    knowsAbout: ["Real estate marketing", "Meta Ads", "CRM", "Sales systems"],
    sameAs: SITIO.redes.map((red) => red.url),
  };
}

export function proyectoJsonLd(proyecto: Proyecto, idioma: Idioma): Datos {
  const precio = proyecto.autorizado ? numero(proyecto.inventario.precioDesde) : undefined;
  const direccion = texto(proyecto.ubicacion.direccion, idioma);
  const imagen = texto(proyecto.hero.imagen, idioma);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: proyecto.nombre,
    url: `${urlSitio()}${rutas(idioma).propiedad(proyecto.slug)}`,
    description: t(proyecto.seo.description, idioma),
    ...(imagen ? { image: imagen } : {}),
    address: {
      "@type": "PostalAddress",
      ...(direccion ? { streetAddress: direccion } : {}),
      addressLocality: proyecto.ciudad,
      addressCountry: "MX",
    },
    ...(proyecto.ubicacion.coords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: proyecto.ubicacion.coords[0],
            longitude: proyecto.ubicacion.coords[1],
          },
        }
      : {}),
    ...(precio
      ? {
          offers: {
            "@type": "Offer",
            price: precio,
            priceCurrency: proyecto.inventario.moneda,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function migasJsonLd(items: { nombre: string; url: string }[]): Datos {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: item.nombre,
      item: `${urlSitio()}${item.url}`,
    })),
  };
}
