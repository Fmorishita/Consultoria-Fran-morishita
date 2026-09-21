import Link from "next/link";
import type { Metadata } from "next";
import { FormularioLead } from "@/componentes/formulario-lead";
import { Cierre } from "@/componentes/secciones/cierre";
import { HeroInicio } from "@/componentes/secciones/hero-inicio";
import { PropiedadDestacada } from "@/componentes/secciones/propiedad-destacada";
import { PruebaSocial } from "@/componentes/secciones/prueba-social";
import { TarjetaProyecto } from "@/componentes/secciones/tarjeta-proyecto";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { interesesFormulario, textosFormulario } from "@/lib/textos";
import { JsonLd, personaJsonLd } from "@/lib/json-ld";
import { numero, queFalta, texto } from "@/lib/pendiente";
import { INICIO } from "@contenido/paginas/inicio";
import { proyectoDestacado, proyectosSecundarios } from "@contenido/proyectos";
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
  const destacado = proyectoDestacado();
  const secundarios = proyectosSecundarios();

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

      {destacado ? <PropiedadDestacada proyecto={destacado} idioma={idioma} /> : null}

      <Seccion>
        <EncabezadoSeccion
          titulo={t(INICIO.propiedades.titulo, idioma)}
          texto={t(INICIO.propiedades.texto, idioma)}
        />
        {secundarios.length > 0 ? (
          <>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {secundarios.slice(0, 6).map((proyecto, indice) => (
                <Revelar key={proyecto.slug} retraso={indice * 70}>
                  <TarjetaProyecto proyecto={proyecto} idioma={idioma} />
                </Revelar>
              ))}
            </div>
            <div className="mt-12">
              <Boton asChild variante="secundario">
                <Link href={r.propiedades}>{t(UI.cta.verProyectos, idioma)}</Link>
              </Boton>
            </div>
          </>
        ) : (
          <p className="cuerpo mt-10 max-w-xl">{t(UI.etiquetas.sinProyectos, idioma)}</p>
        )}
      </Seccion>

      <PruebaSocial idioma={idioma} cifras={cifras} />

      <Seccion className="bg-superficie">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Revelar>
            <h2 className="titular titular-lg">{t(INICIO.captura.titulo, idioma)}</h2>
            <p className="cuerpo mt-6 max-w-md">{t(INICIO.captura.texto, idioma)}</p>
          </Revelar>
          <Revelar retraso={90}>
            <FormularioLead
              idioma={idioma}
              hrefPrivacidad={r.privacidad}
              intereses={interesesFormulario(idioma)}
              textos={textosFormulario(idioma)}
            />
          </Revelar>
        </div>
      </Seccion>

      <Cierre
        idioma={idioma}
        titulo={t(INICIO.cierre.titulo, idioma)}
        texto={t(INICIO.cierre.texto, idioma)}
        contexto="inicio-cierre"
      />
    </>
  );
}
