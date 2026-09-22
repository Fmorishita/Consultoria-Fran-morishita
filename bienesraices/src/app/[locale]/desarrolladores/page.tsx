import type { Metadata } from "next";
import { Cierre } from "@/componentes/secciones/cierre";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { Boton } from "@/componentes/ui/boton";
import { normalizaIdioma, t } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { rutas } from "@/lib/navegacion";
import { DESARROLLADORES } from "@contenido/paginas/desarrolladores";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(DESARROLLADORES.seo.title, idioma),
    description: t(DESARROLLADORES.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).desarrolladores,
      languages: { es: "/es/desarrolladores", en: "/en/desarrolladores", "x-default": "/es/desarrolladores" },
    },
  };
}

export default async function PaginaDesarrolladores({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);

  return (
    <>
      <Seccion className="pt-28 md:pt-36">
        <Revelar className="max-w-4xl">
          <p className="antetitulo">{t(DESARROLLADORES.hero.antetitulo, idioma)}</p>
          <h1 className="titular titular-xl mt-8">
            <TitularMultilinea texto={t(DESARROLLADORES.hero.titulo, idioma)} />
          </h1>
          <p className="cuerpo mt-8 max-w-2xl text-lg">{t(DESARROLLADORES.hero.subtitulo, idioma)}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {SITIO.calendario ? (
              <Boton asChild tamano="lg">
                <a href={SITIO.calendario} target="_blank" rel="noopener noreferrer">
                  {t(UI.cta.agendar, idioma)}
                </a>
              </Boton>
            ) : null}
            <CtaWhatsApp
              numero={SITIO.whatsapp.numero}
              mensaje={t(SITIO.whatsapp.mensajeGeneral, idioma)}
              etiqueta={t(UI.cta.whatsapp, idioma)}
              contexto="desarrolladores-hero"
              variante="secundario"
              tamano="lg"
            />
          </div>
        </Revelar>
      </Seccion>

      <Seccion className="bg-superficie">
        <EncabezadoSeccion titulo={t(DESARROLLADORES.problema.titulo, idioma)} />
        <ul className="mt-14 grid gap-8 md:grid-cols-2">
          {DESARROLLADORES.problema.items.map((item, indice) => (
            <Revelar key={item.es} retraso={indice * 70} como="li" className="border-t border-borde pt-6">
              <p className="cuerpo text-base">{t(item, idioma)}</p>
            </Revelar>
          ))}
        </ul>
      </Seccion>

      <Seccion>
        <EncabezadoSeccion
          antetitulo={t(DESARROLLADORES.entrega.antetitulo, idioma)}
          titulo={t(DESARROLLADORES.entrega.titulo, idioma)}
        />
        <ol className="mt-14 divide-y divide-borde border-y border-borde">
          {DESARROLLADORES.entrega.items.map((item, indice) => {
            const Icono = icono(item.icono);
            return (
              <Revelar key={item.titulo.es} como="li" className="grid gap-4 py-8 md:grid-cols-[auto_1fr] md:gap-12">
                <span className="flex items-center gap-4">
                  <Icono aria-hidden className="size-5 text-acento" strokeWidth={1.5} />
                  <span className="indice-seccion">{String(indice + 1).padStart(2, "0")}</span>
                </span>
                <div>
                  <h3 className="titular titular-sm">{t(item.titulo, idioma)}</h3>
                  <p className="cuerpo mt-3 max-w-2xl text-base">{t(item.texto, idioma)}</p>
                </div>
              </Revelar>
            );
          })}
        </ol>
      </Seccion>

      <Seccion className="bg-superficie">
        <div className="grid gap-12 lg:grid-cols-2">
          <Revelar>
            <h2 className="titular titular-md">{t(DESARROLLADORES.paraQuien.titulo, idioma)}</h2>
            <ul className="mt-8 space-y-5">
              {DESARROLLADORES.paraQuien.items.map((item) => (
                <li key={item.es} className="flex gap-4 text-texto-suave">
                  <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-acento" />
                  <span>{t(item, idioma)}</span>
                </li>
              ))}
            </ul>
          </Revelar>

          <Revelar retraso={90}>
            <h2 className="titular titular-md">{t(DESARROLLADORES.proceso.titulo, idioma)}</h2>
            <ol className="mt-8 divide-y divide-borde border-y border-borde">
              {DESARROLLADORES.proceso.pasos.map((paso, indice) => (
                <li key={paso.titulo.es} className="py-6">
                  <h3 className="titular titular-sm">
                    <span className="text-acento">{String(indice + 1).padStart(2, "0")}</span> {t(paso.titulo, idioma)}
                  </h3>
                  <p className="cuerpo mt-3 text-base">{t(paso.texto, idioma)}</p>
                </li>
              ))}
            </ol>
          </Revelar>
        </div>
      </Seccion>

      <Cierre
        idioma={idioma}
        titulo={t(DESARROLLADORES.cierre.titulo, idioma)}
        texto={t(DESARROLLADORES.cierre.texto, idioma)}
        contexto="desarrolladores-cierre"
       
      />
    </>
  );
}
