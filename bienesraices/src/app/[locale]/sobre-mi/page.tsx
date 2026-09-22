import Image from "next/image";
import type { Metadata } from "next";
import { Cierre } from "@/componentes/secciones/cierre";
import { Equipo } from "@/componentes/secciones/equipo";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { JsonLd, personaJsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { SOBRE_MI } from "@contenido/paginas/sobre-mi";
import { SITIO } from "@contenido/sitio";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(SOBRE_MI.seo.title, idioma),
    description: t(SOBRE_MI.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).sobreMi,
      languages: { es: "/es/sobre-mi", en: "/en/sobre-mi", "x-default": "/es/sobre-mi" },
    },
  };
}

export default async function PaginaSobreMi({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);

  return (
    <>
      <JsonLd datos={personaJsonLd(idioma)} />
      <Seccion className="pt-28 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
          <Revelar>
            <p className="antetitulo">{t(SOBRE_MI.antetitulo, idioma)}</p>
            <h1 className="titular titular-lg mt-8">
              <TitularMultilinea texto={t(SOBRE_MI.titulo, idioma)} />
            </h1>
            <div className="mt-10 space-y-6">
              {SOBRE_MI.parrafos.map((parrafo) => (
                <p key={parrafo.es} className="cuerpo text-lg">
                  {t(parrafo, idioma)}
                </p>
              ))}
            </div>
          </Revelar>

          {SITIO.retrato ? (
            <Revelar retraso={120} className="relative aspect-4/5 w-full overflow-hidden border border-borde lg:sticky lg:top-28">
              <Image
                src={SITIO.retrato}
                alt={`${SITIO.nombre}, ${t(SITIO.rol, idioma)}`}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top"
                priority
              />
            </Revelar>
          ) : null}
        </div>
      </Seccion>

      <Seccion className="border-t border-borde bg-superficie">
        <h2 className="titular titular-md max-w-xl">{t(SOBRE_MI.principios.titulo, idioma)}</h2>
        <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {SOBRE_MI.principios.items.map((item, indice) => {
            const Icono = icono(item.icono);
            return (
              <Revelar key={item.titulo.es} retraso={indice * 70} className="border-t border-borde pt-7">
                <Icono aria-hidden className="size-6 text-acento" strokeWidth={1.5} />
                <h3 className="titular titular-sm mt-5">{t(item.titulo, idioma)}</h3>
                <p className="cuerpo mt-3 text-base">{t(item.texto, idioma)}</p>
              </Revelar>
            );
          })}
        </div>
      </Seccion>

      <Equipo idioma={idioma} className="border-t border-borde" />

      <Cierre
        idioma={idioma}
        titulo={t(SOBRE_MI.cierre.titulo, idioma)}
        texto={t(SOBRE_MI.cierre.texto, idioma)}
        contexto="sobre-mi-cierre"
      />
    </>
  );
}
