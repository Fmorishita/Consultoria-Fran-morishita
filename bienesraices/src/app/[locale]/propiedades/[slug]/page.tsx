import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalculadoraFinanciamiento } from "@/componentes/calculadora-financiamiento";
import { Mapa } from "@/componentes/mapa";
import { VistaProyecto } from "@/componentes/vista-proyecto";
import { Acordeon } from "@/componentes/ui/acordeon";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { FormularioLead } from "@/componentes/formulario-lead";
import { Cierre } from "@/componentes/secciones/cierre";
import { DatosProyecto } from "@/componentes/secciones/datos-proyecto";
import { EstiloDeVida } from "@/componentes/secciones/estilo-de-vida";
import { PorQueEnsenada } from "@/componentes/secciones/por-que-ensenada";
import { HeroProyecto } from "@/componentes/secciones/hero-proyecto";
import { normalizaIdioma, t } from "@/lib/i18n";
import { JsonLd, migasJsonLd, proyectoJsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { MOSTRAR_PENDIENTES, numero, queFalta, texto } from "@/lib/pendiente";
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
  const pitchPendiente = proyecto.pitch.map(queFalta).filter(Boolean) as string[];
  const direccion = texto(proyecto.ubicacion.direccion, idioma);
  const tiempos = proyecto.ubicacion.tiemposClave
    .map((tiempo) => ({ destino: t(tiempo.destino, idioma), minutos: numero(tiempo.minutos) }))
    .filter((tiempo) => tiempo.minutos !== undefined);
  const faq = proyecto.faq
    .map((item) => ({ p: texto(item.p, idioma), r: texto(item.r, idioma) }))
    .filter((item): item is { p: string; r: string } => Boolean(item.p && item.r));
  const mostrarPrecios = proyecto.autorizado || MOSTRAR_PENDIENTES;
  const enganchePct = numero(proyecto.financiamiento?.engancheMinPct);
  const tasaAnual = numero(proyecto.financiamiento?.tasaAnualPct);
  const esquemaFinanciamiento = texto(proyecto.financiamiento?.esquema, idioma);

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
        {pitch.length > 0 ? (
          <Revelar className="max-w-3xl space-y-6">
            {pitch.map((parrafo, indice) => (
              <p key={indice} className="cuerpo text-lg">
                {parrafo}
              </p>
            ))}
          </Revelar>
        ) : (
          <div className="flex flex-col gap-2">
            {pitchPendiente.map((falta, indice) => (
              <ChipPendiente key={indice}>{falta}</ChipPendiente>
            ))}
          </div>
        )}

        <div className="mt-16">
          <DatosProyecto proyecto={proyecto} idioma={idioma} />
        </div>
      </Seccion>

      {(direccion || tiempos.length > 0 || MOSTRAR_PENDIENTES) && (
        <Seccion className="bg-superficie">
          <h2 className="titular titular-lg">{t(UI.secciones.ubicacion, idioma)}</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Revelar>
              <Mapa
                direccion={direccion}
                coords={proyecto.ubicacion.coords}
                imagen={proyecto.ubicacion.mapaEstatico}
                etiquetaBoton={t(UI.cta.verEnMapa, idioma)}
                alt={`${proyecto.nombre}, ${proyecto.ciudad}`}
              />
              <ChipPendiente>{queFalta(proyecto.ubicacion.direccion)}</ChipPendiente>
            </Revelar>
            <Revelar retraso={80}>
              {tiempos.length > 0 ? (
                <ul className="divide-y divide-borde border-y border-borde">
                  {tiempos.map((tiempo) => (
                    <li key={tiempo.destino} className="flex items-baseline justify-between gap-6 py-5">
                      <span className="text-texto-suave">{tiempo.destino}</span>
                      <span className="titular titular-sm text-acento-suave">
                        {tiempo.minutos} {t(UI.etiquetas.minutos, idioma)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ChipPendiente>tiempos clave a destinos (ej. minutos al Valle de Guadalupe)</ChipPendiente>
              )}
            </Revelar>
          </div>
        </Seccion>
      )}

      {(proyecto.amenidades.length > 0 || MOSTRAR_PENDIENTES) && (
        <Seccion>
          <h2 className="titular titular-lg">{t(UI.secciones.amenidades, idioma)}</h2>
          {proyecto.amenidades.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-borde pt-8">
              {proyecto.amenidades.map((amenidad) => (
                <li key={amenidad.texto.es} className="flex items-baseline gap-3 text-texto-suave">
                  <span aria-hidden className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-acento" />
                  <span className="max-w-xs">{t(amenidad.texto, idioma)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8">
              <ChipPendiente>lista de amenidades del desarrollo</ChipPendiente>
            </div>
          )}
        </Seccion>
      )}

      <EstiloDeVida
        idioma={idioma}
        imagen={proyecto.galeria[0]?.src}
        altImagen={proyecto.galeria[0] ? t(proyecto.galeria[0].alt, idioma) : undefined}
        className="bg-superficie"
      />

      <PorQueEnsenada idioma={idioma} />

      {proyecto.galeria.length > 0 && mostrarPrecios ? (
        <Seccion className="bg-superficie">
          <h2 className="titular titular-lg">{t(UI.secciones.galeria, idioma)}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proyecto.galeria.map((imagen) => (
              <div key={imagen.src} className="relative aspect-[4/3] overflow-hidden border border-borde">
                <Image
                  src={imagen.src}
                  alt={t(imagen.alt, idioma)}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Seccion>
      ) : (
        <Seccion className="bg-superficie py-12">
          <ChipPendiente>fotos y renders autorizados para la galería</ChipPendiente>
        </Seccion>
      )}

      {proyecto.financiamiento && mostrarPrecios ? (
        <Seccion>
          <h2 className="titular titular-lg">{t(UI.secciones.financiamiento, idioma)}</h2>

          <div className="mt-8 flex flex-col gap-4 border-t border-borde pt-8 sm:flex-row sm:items-baseline sm:gap-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-texto-suave">
                {t(UI.calculadora.plazosDisponibles, idioma)}
              </p>
              <p className="titular titular-sm mt-2">
                {proyecto.financiamiento.plazosMeses.join(" / ")} {t(UI.calculadora.meses, idioma)}
              </p>
            </div>
            {esquemaFinanciamiento ? <p className="cuerpo max-w-md text-base">{esquemaFinanciamiento}</p> : null}
          </div>

          <div className="mt-10">
            <ChipPendiente>{queFalta(proyecto.financiamiento.engancheMinPct)}</ChipPendiente>
            <ChipPendiente>{queFalta(proyecto.financiamiento.tasaAnualPct)}</ChipPendiente>
            <ChipPendiente>{queFalta(proyecto.financiamiento.nota)}</ChipPendiente>
          </div>

          {enganchePct !== undefined && tasaAnual !== undefined ? (
            <div className="mt-6">
              <CalculadoraFinanciamiento
                idioma={idioma}
                moneda={proyecto.inventario.moneda}
                engancheMinPct={enganchePct}
                plazosMeses={proyecto.financiamiento.plazosMeses}
                tasaAnualPct={tasaAnual}
                precioInicial={proyecto.autorizado ? numero(proyecto.inventario.precioDesde) : undefined}
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
                  mensajeBase: t(proyecto.whatsapp.mensajePrefill, idioma),
                  keyword: proyecto.whatsapp.keyword,
                }}
              />
            </div>
          ) : null}
        </Seccion>
      ) : null}

      {faq.length > 0 ? (
        <Seccion className="bg-superficie">
          <h2 className="titular titular-lg mb-10">{t(UI.secciones.faq, idioma)}</h2>
          <Acordeon items={faq} />
        </Seccion>
      ) : (
        <Seccion className="bg-superficie py-12">
          <ChipPendiente>preguntas frecuentes del proyecto (con respuestas)</ChipPendiente>
        </Seccion>
      )}

      <Seccion>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Revelar>
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
        mensaje={t(proyecto.whatsapp.mensajePrefill, idioma)}
      />
    </>
  );
}
