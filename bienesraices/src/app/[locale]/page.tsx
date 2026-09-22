import Link from "next/link";
import type { Metadata } from "next";
import { FormularioLead } from "@/componentes/formulario-lead";
import { Cierre } from "@/componentes/secciones/cierre";
import { Compradores } from "@/componentes/secciones/compradores";
import { Equipo } from "@/componentes/secciones/equipo";
import { EstiloDeVida } from "@/componentes/secciones/estilo-de-vida";
import { Objeciones } from "@/componentes/secciones/objeciones";
import { HeroInicio } from "@/componentes/secciones/hero-inicio";
import { PorQueEnsenada } from "@/componentes/secciones/por-que-ensenada";
import { Proceso } from "@/componentes/secciones/proceso";
import { PropiedadDestacada } from "@/componentes/secciones/propiedad-destacada";
import { PruebaSocial } from "@/componentes/secciones/prueba-social";
import { VocesClientes } from "@/componentes/secciones/voces-clientes";
import { TarjetaProyecto } from "@/componentes/secciones/tarjeta-proyecto";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { interesesFormulario, textosFormulario } from "@/lib/textos";
import { JsonLd, personaJsonLd } from "@/lib/json-ld";
import { numero, texto } from "@/lib/pendiente";
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
  }));

  // El orden de la galería es intencional: [0] es la foto de ambiente y
  // [1] la que sostiene la banda de cierre. Ver content/proyectos/_plantilla.ts.
  const ambiente = destacado?.galeria[0];
  const cierre = destacado?.galeria[1];

  return (
    <>
      <JsonLd datos={personaJsonLd(idioma)} />
      <HeroInicio idioma={idioma} />

      <Objeciones idioma={idioma} className="border-t border-borde bg-superficie" />

      {destacado ? <PropiedadDestacada proyecto={destacado} idioma={idioma} /> : null}

      <Seccion className="border-t border-borde">
        <EncabezadoSeccion
          antetitulo={t(INICIO.propiedades.antetitulo, idioma)}
          titulo={t(INICIO.propiedades.titulo, idioma)}
          texto={t(INICIO.propiedades.texto, idioma)}
        />
        {secundarios.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secundarios.slice(0, 6).map((proyecto, indice) => (
              <Revelar key={proyecto.slug} retraso={indice * 70}>
                <TarjetaProyecto proyecto={proyecto} idioma={idioma} />
              </Revelar>
            ))}
          </div>
        ) : (
          <Revelar retraso={80}>
            <p className="cuerpo mt-12 max-w-xl">{t(UI.etiquetas.sinProyectos, idioma)}</p>
          </Revelar>
        )}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Boton asChild variante="secundario">
            <Link href={r.propiedades}>{t(UI.cta.verProyectos, idioma)}</Link>
          </Boton>
          <Boton asChild variante="fantasma">
            <a href="#busqueda">{t(UI.cta.busquedaPrivada, idioma)}</a>
          </Boton>
        </div>
      </Seccion>

      <PorQueEnsenada idioma={idioma} antetitulo={t(INICIO.plaza.antetitulo, idioma)} className="bg-superficie" />

      <EstiloDeVida idioma={idioma} imagen={ambiente?.src} altImagen={ambiente ? t(ambiente.alt, idioma) : undefined} />

      <Proceso idioma={idioma} antetitulo={t(INICIO.proceso.antetitulo, idioma)} />

      <PruebaSocial idioma={idioma} cifras={cifras} />

      <VocesClientes idioma={idioma} className="border-b border-borde" />

      <Equipo idioma={idioma} />

      <Compradores idioma={idioma} className="border-t border-borde bg-superficie" />

      <Seccion id="busqueda" className="border-t border-borde bg-superficie">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Revelar>
            <p className="antetitulo mb-6">{t(INICIO.captura.antetitulo, idioma)}</p>
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
        imagen={cierre?.src}
        altImagen={cierre ? t(cierre.alt, idioma) : undefined}
      />
    </>
  );
}
