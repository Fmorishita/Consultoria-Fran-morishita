import type { Metadata } from "next";
import { TarjetaProyecto } from "@/componentes/secciones/tarjeta-proyecto";
import { Cierre } from "@/componentes/secciones/cierre";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { migasJsonLd, JsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { PAGINA_PROYECTOS } from "@contenido/paginas/proyectos";
import { proyectosListables } from "@contenido/proyectos";
import { INICIO } from "@contenido/paginas/inicio";
import { UI } from "@contenido/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(PAGINA_PROYECTOS.seo.title, idioma),
    description: t(PAGINA_PROYECTOS.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).propiedades,
      languages: { es: "/es/propiedades", en: "/en/propiedades", "x-default": "/es/propiedades" },
    },
  };
}

export default async function PaginaProyectos({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);
  const proyectos = proyectosListables();
  const r = rutas(idioma);

  return (
    <>
      <JsonLd
        datos={migasJsonLd([
          { nombre: t(UI.nav.inicio, idioma), url: r.inicio },
          { nombre: t(UI.nav.proyectos, idioma), url: r.propiedades },
        ])}
      />
      <Seccion className="pt-28 md:pt-36">
        <EncabezadoSeccion
          antetitulo={t(PAGINA_PROYECTOS.antetitulo, idioma)}
          titulo={t(PAGINA_PROYECTOS.titulo, idioma)}
          texto={t(PAGINA_PROYECTOS.texto, idioma)}
        />

        {proyectos.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((proyecto, indice) => (
              <Revelar key={proyecto.slug} retraso={indice * 80}>
                <TarjetaProyecto proyecto={proyecto} idioma={idioma} />
              </Revelar>
            ))}
          </div>
        ) : (
          <p className="cuerpo mt-12 max-w-xl">{t(UI.etiquetas.sinProyectos, idioma)}</p>
        )}
      </Seccion>

      <Cierre
        idioma={idioma}
        titulo={t(INICIO.cierre.titulo, idioma)}
        texto={t(INICIO.cierre.texto, idioma)}
        contexto="proyectos-cierre"
      />
    </>
  );
}
