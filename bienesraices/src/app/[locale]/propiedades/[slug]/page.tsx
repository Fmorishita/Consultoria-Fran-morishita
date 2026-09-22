import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalculadoraFinanciamiento } from "@/componentes/calculadora-financiamiento";
import { Mapa } from "@/componentes/mapa";
import { VistaProyecto } from "@/componentes/vista-proyecto";
import { Acordeon } from "@/componentes/ui/acordeon";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { FormularioLead } from "@/componentes/formulario-lead";
import { Cierre } from "@/componentes/secciones/cierre";
import { DatosProyecto } from "@/componentes/secciones/datos-proyecto";
import { EstiloDeVida } from "@/componentes/secciones/estilo-de-vida";
import { PorQueEnsenada } from "@/componentes/secciones/por-que-ensenada";
import { Proceso } from "@/componentes/secciones/proceso";
import { TablaPrecios } from "@/componentes/secciones/tabla-precios";
import { HeroProyecto } from "@/componentes/secciones/hero-proyecto";
import { normalizaIdioma, t } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { JsonLd, migasJsonLd, proyectoJsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { numero, texto } from "@/lib/pendiente";
import { interesesFormulario, textosFormulario } from "@/lib/textos";
import { permitirIndexacion } from "@/lib/url-sitio";
import { CAPTURA_PROPIEDAD, CIERRE_PROYECTO } from "@contenido/paginas/proyectos";
import { esPublicable, PROYECTOS, proyectoPorSlug } from "@contenido/proyectos";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return PROYECTOS.map((proyecto) => ({ slug: proyecto.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const idioma = normalizaIdioma(locale);
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto) return {};
  const indexable = proyecto.activo && proyecto.autorizado && permitirIndexacion();

  return {
    title: t(proyecto.seo.title, idioma),
    description: t(proyecto.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).propiedad(slug),
      languages: {
        es: `/es/propiedades/${slug}`,
        en: `/en/propiedades/${slug}`,
        "x-default": `/es/propiedades/${slug}`,
      },
    },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function PaginaProyecto({ params }: Props) {
  const { locale, slug } = await params;
  const idioma = normalizaIdioma(locale);
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto || !esPublicable(proyecto)) notFound();

  const r = rutas(idioma);
  const pitch = proyecto.pitch.map((parrafo) => texto(parrafo, idioma)).filter(Boolean) as string[];
  const direccion = texto(proyecto.ubicacion.direccion, idioma);
  const tiempos = proyecto.ubicacion.tiemposClave
    .map((tiempo) => ({ destino: t(tiempo.destino, idioma), minutos: numero(tiempo.minutos) }))
    .filter((tiempo) => tiempo.minutos !== undefined);
  const faq = proyecto.faq
    .map((item) => ({ p: texto(item.p, idioma), r: texto(item.r, idioma) }))
    .filter((item): item is { p: string; r: string } => Boolean(item.p && item.r));
  const enganchePct = numero(proyecto.financiamiento?.engancheMinPct);
  const tasaAnual = numero(proyecto.financiamiento?.tasaAnualPct);
  const esquemaFinanciamiento = texto(proyecto.financiamiento?.esquema, idioma);
  const notaFinanciamiento = texto(proyecto.financiamiento?.nota, idioma);
  const mensajeProyecto = t(proyecto.whatsapp.mensajePrefill, idioma);

  return (
    <>
      <VistaProyecto slug={proyecto.slug} nombre={proyecto.nombre} />
      <JsonLd datos={proyectoJsonLd(proyecto, idioma)} />
      <JsonLd
        datos={migasJsonLd([
          { nombre: t(UI.nav.inicio, idioma), url: r.inicio },
          { nombre: t(UI.nav.proyectos, idioma), url: r.propiedades },
          { nombre: proyecto.nombre, url: r.propiedad(proyecto.slug) },
        ])}
      />

      <HeroProyecto proyecto={proyecto} idioma={idioma} />

      <Seccion>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {pitch.length > 0 ? (
            <Revelar className="space-y-6">
              {pitch.map((parrafo) => (
                <p key={parrafo} className="cuerpo text-lg">
                  {parrafo}
                </p>
              ))}
            </Revelar>
          ) : null}
          <Revelar retraso={80}>
            <p className="etiqueta-dato">{t(UI.secciones.fichaTecnica, idioma)}</p>
            <div className="mt-6">
              <DatosProyecto proyecto={proyecto} idioma={idioma} />
            </div>
          </Revelar>
        </div>
      </Seccion>

      {proyecto.amenidades.length > 0 ? (
        <Seccion className="border-y border-borde bg-superficie">
          <h2 className="titular titular-lg max-w-2xl">{t(UI.secciones.amenidades, idioma)}</h2>
          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {proyecto.amenidades.map((amenidad) => {
              const Icono = icono(amenidad.icono);
              return (
                <li key={amenidad.texto.es} className="border-t border-borde pt-6">
                  <Icono aria-hidden className="size-6 text-acento" strokeWidth={1.5} />
                  <p className="mt-4 leading-relaxed text-texto">{t(amenidad.texto, idioma)}</p>
                </li>
              );
            })}
          </ul>
        </Seccion>
      ) : null}

      {proyecto.galeria.length > 0 ? (
        <Seccion>
          <h2 className="titular titular-lg">{t(UI.secciones.galeria, idioma)}</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {proyecto.galeria.map((imagen, indice) => (
              <div
                key={imagen.src}
                className={`relative overflow-hidden border border-borde bg-superficie ${
                  indice === 0
                    ? "aspect-16/10 md:col-span-4"
                    : indice === 1
                      ? "aspect-4/3 md:col-span-2"
                      : "aspect-16/9 md:col-span-6"
                }`}
              >
                <Image
                  src={imagen.src}
                  alt={t(imagen.alt, idioma)}
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Seccion>
      ) : null}

      {direccion ? (
        <Seccion className="border-t border-borde bg-superficie">
          <h2 className="titular titular-lg">{t(UI.secciones.ubicacion, idioma)}</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Revelar>
              <Mapa
                direccion={direccion}
                coords={proyecto.ubicacion.coords}
                imagen={proyecto.ubicacion.mapaEstatico}
                etiquetaBoton={t(UI.cta.verEnMapa, idioma)}
                etiquetaDireccion={t(UI.etiquetas.direccion, idioma)}
                alt={`${proyecto.nombre}, ${proyecto.ciudad}`}
              />
            </Revelar>
            {tiempos.length > 0 ? (
              <Revelar retraso={80}>
                <ul className="divide-y divide-borde border-y border-borde">
                  {tiempos.map((tiempo) => (
                    <li key={tiempo.destino} className="flex items-baseline justify-between gap-6 py-5">
                      <span className="text-texto-suave">{tiempo.destino}</span>
                      <span className="titular titular-sm text-acento">
                        {tiempo.minutos} {t(UI.etiquetas.minutos, idioma)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Revelar>
            ) : null}
          </div>
        </Seccion>
      ) : null}

      {proyecto.listaPrecios ? (
        <Seccion id="precios">
          <h2 className="titular titular-lg max-w-2xl">{t(UI.secciones.precios, idioma)}</h2>
          <TablaPrecios
            lista={proyecto.listaPrecios}
            moneda={proyecto.inventario.moneda}
            enganchePct={enganchePct}
            idioma={idioma}
          />
        </Seccion>
      ) : null}

      {proyecto.financiamiento ? (
        <Seccion className={proyecto.listaPrecios ? "border-t border-borde bg-superficie" : undefined}>
          <h2 className="titular titular-lg">{t(UI.secciones.financiamiento, idioma)}</h2>

          <div className="mt-10 flex flex-col gap-6 border-t border-borde pt-8 sm:flex-row sm:items-baseline sm:gap-14">
            <div className="flex-none">
              <p className="etiqueta-dato">{t(UI.calculadora.plazosDisponibles, idioma)}</p>
              <p className="cifra mt-3 text-[clamp(2rem,5vw,3rem)] text-acento">
                {proyecto.financiamiento.plazosMeses.join(" / ")}
              </p>
              <p className="mt-2 text-sm text-texto-suave">{t(UI.calculadora.meses, idioma)}</p>
            </div>
            {esquemaFinanciamiento ? <p className="cuerpo max-w-md text-base">{esquemaFinanciamiento}</p> : null}
          </div>

          {notaFinanciamiento ? (
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-texto-suave">{notaFinanciamiento}</p>
          ) : null}

          {enganchePct !== undefined && tasaAnual !== undefined ? (
            <div className="mt-12">
              <CalculadoraFinanciamiento
                idioma={idioma}
                moneda={proyecto.inventario.moneda}
                engancheMinPct={enganchePct}
                plazosMeses={proyecto.financiamiento.plazosMeses}
                tasaAnualPct={tasaAnual}
                precioInicial={numero(proyecto.inventario.precioDesde)}
                contexto={proyecto.slug}
                textos={{
                  titulo: t(UI.calculadora.titulo, idioma),
                  precio: t(UI.calculadora.precio, idioma),
                  enganche: t(UI.calculadora.enganche, idioma),
                  plazo: t(UI.calculadora.plazo, idioma),
                  meses: t(UI.calculadora.meses, idioma),
                  engancheResultado: t(UI.calculadora.engancheResultado, idioma),
                  mensualidadResultado: t(UI.calculadora.mensualidadResultado, idioma),
                  financiar: t(UI.calculadora.financiar, idioma),
                  leyenda: t(UI.calculadora.leyenda, idioma),
                  cta: t(UI.calculadora.cta, idioma),
                  sinIntereses: t(UI.calculadora.sinIntereses, idioma),
                  tasa: t(UI.calculadora.tasa, idioma),
                }}
                whatsapp={{
                  numero: SITIO.whatsapp.numero,
                  mensajeBase: mensajeProyecto,
                  keyword: proyecto.whatsapp.keyword,
                }}
              />
            </div>
          ) : (
            <Revelar className="mt-10">
              <Boton asChild variante="secundario" tamano="lg">
                <a href="#expediente">{t(UI.cta.solicitarPrecios, idioma)}</a>
              </Boton>
            </Revelar>
          )}
        </Seccion>
      ) : null}

      <PorQueEnsenada idioma={idioma} className="border-t border-borde bg-superficie" />

      <EstiloDeVida
        idioma={idioma}
        imagen={proyecto.galeria[0]?.src}
        altImagen={proyecto.galeria[0] ? t(proyecto.galeria[0].alt, idioma) : undefined}
      />

      <Proceso idioma={idioma}>
        <Boton asChild variante="secundario" tamano="lg">
          <a href="#expediente">{t(UI.cta.solicitarInformacion, idioma)}</a>
        </Boton>
      </Proceso>

      {faq.length > 0 ? (
        <Seccion>
          <h2 className="titular titular-lg mb-12 max-w-2xl">{t(UI.secciones.faq, idioma)}</h2>
          <Acordeon items={faq} />
        </Seccion>
      ) : null}

      <Seccion id="expediente" className="border-t border-borde bg-superficie">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Revelar>
            <p className="antetitulo mb-6">{t(CAPTURA_PROPIEDAD.antetitulo, idioma)}</p>
            <h2 className="titular titular-lg">{t(CAPTURA_PROPIEDAD.titulo, idioma)}</h2>
            <p className="cuerpo mt-6 max-w-md">{t(CAPTURA_PROPIEDAD.texto, idioma)}</p>
          </Revelar>
          <Revelar retraso={90}>
            <FormularioLead
              idioma={idioma}
              hrefPrivacidad={r.privacidad}
              proyectoSlug={proyecto.slug}
              tipo="proyecto"
              interesPorDefecto="comprar"
              intereses={interesesFormulario(idioma)}
              textos={textosFormulario(idioma)}
            />
          </Revelar>
        </div>
      </Seccion>

      <Cierre
        idioma={idioma}
        titulo={t(CIERRE_PROYECTO.titulo, idioma)}
        texto={t(CIERRE_PROYECTO.texto, idioma)}
        contexto={`${proyecto.slug}-cierre`}
        mensaje={mensajeProyecto}
        imagen={proyecto.galeria[1]?.src}
        altImagen={proyecto.galeria[1] ? t(proyecto.galeria[1].alt, idioma) : undefined}
      />
    </>
  );
}
