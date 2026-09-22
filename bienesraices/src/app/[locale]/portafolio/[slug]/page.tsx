import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cierre } from "@/componentes/secciones/cierre";
import { VideoTestimonio } from "@/componentes/video-testimonio";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { JsonLd, migasJsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { queFalta, texto } from "@/lib/pendiente";
import { CASOS, casoPorSlug } from "@contenido/casos";
import { DESARROLLADORES } from "@contenido/paginas/desarrolladores";
import { testimonioPorSlug } from "@contenido/testimonios";
import { UI } from "@contenido/ui";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return CASOS.map((caso) => ({ slug: caso.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const idioma = normalizaIdioma(locale);
  const caso = casoPorSlug(slug);
  if (!caso) return {};
  return {
    title: t(caso.seo.title, idioma),
    description: t(caso.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).caso(slug),
      languages: {
        es: `/es/portafolio/${slug}`,
        en: `/en/portafolio/${slug}`,
        "x-default": `/es/portafolio/${slug}`,
      },
    },
  };
}

export default async function PaginaCaso({ params }: Props) {
  const { locale, slug } = await params;
  const idioma = normalizaIdioma(locale);
  const caso = casoPorSlug(slug);
  if (!caso || !caso.activo) notFound();

  const r = rutas(idioma);
  const testimonio = testimonioPorSlug(caso.testimonioSlug);
  const reto = caso.reto.map((parrafo) => texto(parrafo, idioma)).filter(Boolean) as string[];
  const retoPendiente = caso.reto.map(queFalta).filter(Boolean) as string[];

  return (
    <>
      <JsonLd
        datos={migasJsonLd([
          { nombre: t(UI.nav.inicio, idioma), url: r.inicio },
          { nombre: t(UI.nav.portafolio, idioma), url: r.portafolio },
          { nombre: t(caso.titulo, idioma), url: r.caso(caso.slug) },
        ])}
      />

      <Seccion className="pt-28 md:pt-36">
        <Revelar className="max-w-4xl">
          <p className="antetitulo">{t(caso.sector, idioma)}</p>
          <h1 className="titular titular-xl mt-6">{t(caso.titulo, idioma)}</h1>
          <p className="cuerpo mt-8 max-w-2xl text-lg">{t(caso.resumen, idioma)}</p>
        </Revelar>

        {caso.resultados.length > 0 ? (
          <dl className="mt-16 grid gap-10 border-t border-borde pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {caso.resultados.map((resultado) => (
              <div key={resultado.cifra}>
                <dt className="titular text-[clamp(2.25rem,6vw,3.5rem)] text-acento-suave">{resultado.cifra}</dt>
                <dd className="mt-3 max-w-xs text-sm text-texto-suave">{t(resultado.etiqueta, idioma)}</dd>
                {resultado.nota ? (
                  <dd className="mt-2 max-w-xs text-xs text-texto-suave/70">{t(resultado.nota, idioma)}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        ) : null}
      </Seccion>

      <Seccion className="bg-superficie">
        <div className="grid gap-12 lg:grid-cols-2">
          <Revelar>
            <h2 className="titular titular-md">{t(UI.secciones.reto, idioma)}</h2>
            <div className="mt-6 space-y-5">
              {reto.length > 0 ? (
                reto.map((parrafo, indice) => (
                  <p key={indice} className="cuerpo">
                    {parrafo}
                  </p>
                ))
              ) : (
                <div className="flex flex-col gap-2">
                  {retoPendiente.map((falta, indice) => (
                    <ChipPendiente key={indice}>{falta}</ChipPendiente>
                  ))}
                </div>
              )}
            </div>
          </Revelar>

          <Revelar retraso={90}>
            <h2 className="titular titular-md">{t(UI.secciones.sistema, idioma)}</h2>
            <ol className="mt-6 divide-y divide-borde border-y border-borde">
              {caso.sistema.map((pieza) => (
                <li key={pieza.titulo.es} className="py-6">
                  <h3 className="titular titular-sm">{t(pieza.titulo, idioma)}</h3>
                  <p className="cuerpo mt-3 text-base">{t(pieza.detalle, idioma)}</p>
                </li>
              ))}
            </ol>
          </Revelar>
        </div>
      </Seccion>

      {testimonio?.video ? (
        <Seccion>
          <div className="max-w-3xl">
            <VideoTestimonio
              video={testimonio.video}
              poster={testimonio.videoPoster}
              nombre={testimonio.nombre}
              cargo={t(testimonio.cargo, idioma)}
              empresa={texto(testimonio.empresa, idioma)}
              etiquetaReproducir={t(UI.cta.reproducir, idioma)}
              altPoster={`${testimonio.nombre}, ${t(testimonio.cargo, idioma)}`}
            />
          </div>
        </Seccion>
      ) : null}

      <Cierre
        idioma={idioma}
        titulo={t(DESARROLLADORES.cierre.titulo, idioma)}
        texto={t(DESARROLLADORES.cierre.texto, idioma)}
        contexto={`caso-${caso.slug}`}
       
      />
    </>
  );
}
