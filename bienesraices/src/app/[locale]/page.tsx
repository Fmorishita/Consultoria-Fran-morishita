import Link from "next/link";
import type { Metadata } from "next";
import { Cierre } from "@/componentes/secciones/cierre";
import { Frentes } from "@/componentes/secciones/frentes";
import { HeroInicio } from "@/componentes/secciones/hero-inicio";
import { Metodo } from "@/componentes/secciones/metodo";
import { TarjetaProyecto } from "@/componentes/secciones/tarjeta-proyecto";
import { TestimonioDestacado } from "@/componentes/secciones/testimonio-destacado";
import { TrackRecord } from "@/componentes/track-record";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { JsonLd, personaJsonLd } from "@/lib/json-ld";
import { numero, queFalta, texto } from "@/lib/pendiente";
import { INICIO } from "@contenido/paginas/inicio";
import { proyectosListables } from "@contenido/proyectos";
import { TRACK_RECORD } from "@contenido/track-record";
import { UI } from "@contenido/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    alternates: { canonical: `/${idioma}`, languages: { es: "/es", en: "/en", "x-default": "/es" } },
  };
}

export default async function PaginaInicio({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);
  const r = rutas(idioma);
  const proyectos = proyectosListables();

  const cifras = TRACK_RECORD.map((cifra) => ({
    valor: numero(cifra.valor),
    prefijo: cifra.prefijo,
    sufijo: cifra.sufijo,
    etiqueta: t(cifra.etiqueta, idioma),
    respaldo: texto(cifra.respaldo, idioma),
    pendiente: queFalta(cifra.respaldo),
  }));

  return (
    <>
      <JsonLd datos={personaJsonLd(idioma)} />
      <HeroInicio idioma={idioma} />
      <TestimonioDestacado idioma={idioma} />

      <Seccion>
        <EncabezadoSeccion titulo={t(INICIO.trackRecord.titulo, idioma)} />
        <div className="mt-14">
          <TrackRecord cifras={cifras} />
        </div>
      </Seccion>

      <Frentes idioma={idioma} />

      <Seccion className="bg-superficie">
        <EncabezadoSeccion
          antetitulo={t(INICIO.proyectos.antetitulo, idioma)}
          titulo={t(INICIO.proyectos.titulo, idioma)}
        />
        {proyectos.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.slice(0, 3).map((proyecto) => (
              <Revelar key={proyecto.slug}>
                <TarjetaProyecto proyecto={proyecto} idioma={idioma} />
              </Revelar>
            ))}
          </div>
        ) : (
          <p className="cuerpo mt-10 max-w-xl">{t(UI.etiquetas.sinProyectos, idioma)}</p>
        )}
        <div className="mt-12">
          <Boton asChild variante="secundario">
            <Link href={r.proyectos}>{t(UI.cta.verProyectos, idioma)}</Link>
          </Boton>
        </div>
      </Seccion>

      <Metodo idioma={idioma} />

      <Cierre
        idioma={idioma}
        titulo={t(INICIO.cierre.titulo, idioma)}
        texto={t(INICIO.cierre.texto, idioma)}
        contexto="inicio-cierre"
        conAgenda
      />
    </>
  );
}
