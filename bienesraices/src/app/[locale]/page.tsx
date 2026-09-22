import Link from "next/link";
import type { Metadata } from "next";
import { FormularioLead } from "@/componentes/formulario-lead";
import { Cierre } from "@/componentes/secciones/cierre";
import { Compradores } from "@/componentes/secciones/compradores";
import { Equipo } from "@/componentes/secciones/equipo";
import { HeroInicio, type DatoFranja } from "@/componentes/secciones/hero-inicio";
import { LaPlaza } from "@/componentes/secciones/la-plaza";
import { Objeciones } from "@/componentes/secciones/objeciones";
import { PropiedadDestacada } from "@/componentes/secciones/propiedad-destacada";
import { PruebaSocial } from "@/componentes/secciones/prueba-social";
import { TarjetaProyecto } from "@/componentes/secciones/tarjeta-proyecto";
import { VocesClientes } from "@/componentes/secciones/voces-clientes";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { cifrasTrackRecord } from "@/lib/cifras";
import { formatoMoneda } from "@/lib/formato";
import { normalizaIdioma, t, type Idioma } from "@/lib/i18n";
import { JsonLd, personaJsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { cn } from "@/lib/utils";
import { numero } from "@/lib/pendiente";
import { interesesFormulario, textosFormulario } from "@/lib/textos";
import type { Proyecto } from "@contenido/esquemas";
import { INICIO } from "@contenido/paginas/inicio";
import { proyectoDestacado, proyectosListables, proyectosSecundarios } from "@contenido/proyectos";
import { UI } from "@contenido/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    alternates: { canonical: `/${idioma}`, languages: { es: "/es", en: "/en", "x-default": "/es" } },
  };
}

/**
 * Los datos de la franja del hero salen del inventario publicado, nunca se
 * teclean: si cambia un precio o se suma un desarrollo, la franja lo refleja.
 */
function franjaHero(proyectos: Proyecto[], idioma: Idioma): DatoFranja[] {
  const rotulos = INICIO.hero.franja;
  const datos: DatoFranja[] = [];

  if (proyectos.length > 1) {
    datos.push({ valor: String(proyectos.length), etiqueta: t(rotulos.desarrollos, idioma) });
  }

  const conPrecio = proyectos
    .filter((p) => p.autorizado)
    .map((p) => ({ precio: numero(p.inventario.precioDesde), moneda: p.inventario.moneda }))
    .filter((p): p is { precio: number; moneda: Proyecto["inventario"]["moneda"] } => p.precio !== undefined)
    .sort((a, b) => a.precio - b.precio);
  if (conPrecio[0]) {
    datos.push({
      valor: formatoMoneda(conPrecio[0].precio, conPrecio[0].moneda, idioma),
      etiqueta: t(rotulos.desde, idioma),
    });
  }

  const sinInteres = proyectos.find((p) => p.financiamiento?.tasaAnualPct === 0);
  if (sinInteres) {
    datos.push({ valor: "0%", etiqueta: t(rotulos.sinInteres, idioma).replace("{nombre}", sinInteres.nombre) });
  }

  return datos;
}

export default async function PaginaInicio({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);
  const r = rutas(idioma);
  const destacado = proyectoDestacado();
  const secundarios = proyectosSecundarios();

  // El orden de la galería es intencional: [1] sostiene la banda de cierre y
  // la ficha destacada usa las demás, para que ninguna foto se repita.
  const cierre = destacado?.galeria[1];

  return (
    <>
      <JsonLd datos={personaJsonLd(idioma)} />
      <HeroInicio idioma={idioma} franja={franjaHero(proyectosListables(), idioma)} />

      <Objeciones idioma={idioma} className="seccion-clara" />

      {destacado ? <PropiedadDestacada proyecto={destacado} idioma={idioma} /> : null}

      <Seccion className="border-t border-borde">
        <EncabezadoSeccion titulo={t(INICIO.propiedades.titulo, idioma)} texto={t(INICIO.propiedades.texto, idioma)} />
        {secundarios.length > 0 ? (
          // Con dos tarjetas la rejilla va a dos columnas: una tercera vacía se lee como hueco.
          <div className={cn("mt-14 grid gap-6 sm:grid-cols-2", secundarios.length > 2 && "lg:grid-cols-3")}>
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

      <LaPlaza idioma={idioma} className="seccion-clara" />

      <PruebaSocial idioma={idioma} cifras={cifrasTrackRecord(idioma)} />

      <VocesClientes idioma={idioma} className="border-b border-borde" />

      <Compradores idioma={idioma} />

      <Equipo idioma={idioma} className="seccion-clara" />

      <Seccion id="busqueda" className="border-t border-borde bg-superficie">
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
        imagen={cierre?.src}
        altImagen={cierre ? t(cierre.alt, idioma) : undefined}
      />
    </>
  );
}
