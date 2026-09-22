import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Cierre } from "@/componentes/secciones/cierre";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { JsonLd, migasJsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { casosActivos } from "@contenido/casos";
import { DESARROLLADORES } from "@contenido/paginas/desarrolladores";
import { PAGINA_PORTAFOLIO } from "@contenido/paginas/proyectos";
import { UI } from "@contenido/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(PAGINA_PORTAFOLIO.seo.title, idioma),
    description: t(PAGINA_PORTAFOLIO.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).portafolio,
      languages: { es: "/es/portafolio", en: "/en/portafolio", "x-default": "/es/portafolio" },
    },
  };
}

export default async function PaginaPortafolio({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);
  const r = rutas(idioma);
  const casos = casosActivos();

  return (
    <>
      <JsonLd
        datos={migasJsonLd([
          { nombre: t(UI.nav.inicio, idioma), url: r.inicio },
          { nombre: t(UI.nav.portafolio, idioma), url: r.portafolio },
        ])}
      />
      <Seccion className="pt-28 md:pt-36">
        <EncabezadoSeccion
          antetitulo={t(PAGINA_PORTAFOLIO.antetitulo, idioma)}
          titulo={t(PAGINA_PORTAFOLIO.titulo, idioma)}
          texto={t(PAGINA_PORTAFOLIO.texto, idioma)}
        />

        <div className="mt-16 divide-y divide-borde border-y border-borde">
          {casos.map((caso, indice) => (
            <Revelar key={caso.slug} retraso={indice * 80}>
              <Link href={r.caso(caso.slug)} className="group grid gap-6 py-10 md:grid-cols-[1fr_2fr] md:gap-12">
                <div>
                  <p className="antetitulo">{t(caso.sector, idioma)}</p>
                  {caso.periodo ? <p className="mt-2 text-sm text-texto-suave">{caso.periodo}</p> : null}
                </div>
                <div>
                  <h2 className="titular titular-md flex items-start gap-3">
                    {t(caso.titulo, idioma)}
                    <ArrowUpRight
                      aria-hidden
                      className="mt-2 size-5 shrink-0 text-acento-suave transition-transform group-hover:translate-x-1"
                    />
                  </h2>
                  <p className="cuerpo mt-4">{t(caso.resumen, idioma)}</p>
                  {caso.resultados.length > 0 ? (
                    <p className="titular titular-sm mt-6 text-acento-suave">
                      {caso.resultados[0].cifra} · {t(caso.resultados[0].etiqueta, idioma)}
                    </p>
                  ) : null}
                </div>
              </Link>
            </Revelar>
          ))}
        </div>
      </Seccion>

      <Cierre
        idioma={idioma}
        titulo={t(DESARROLLADORES.cierre.titulo, idioma)}
        texto={t(DESARROLLADORES.cierre.texto, idioma)}
        contexto="portafolio-cierre"
       
      />
    </>
  );
}
