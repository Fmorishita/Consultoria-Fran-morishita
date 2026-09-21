import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { Boton } from "@/componentes/ui/boton";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Revelar } from "@/componentes/ui/revelar";
import { formatoMoneda, formatoSuperficie } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { numero, queFalta, texto } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { INICIO } from "@contenido/paginas/inicio";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

/**
 * Bloque de apertura del inventario: una sola propiedad, a tamaño grande,
 * con el botón de WhatsApp que arranca la conversación.
 */
export function PropiedadDestacada({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const r = rutas(idioma);
  const imagen = texto(proyecto.hero.imagen, idioma);
  const precio = proyecto.autorizado ? numero(proyecto.inventario.precioDesde) : undefined;
  const superficieMin = numero(proyecto.inventario.superficieMin);

  return (
    <section className="border-b border-borde bg-superficie">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Revelar className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="titular titular-lg">{t(INICIO.destacado.titulo, idioma)}</h2>
          <p className="cuerpo max-w-md text-base sm:text-right">{t(INICIO.destacado.texto, idioma)}</p>
        </Revelar>

        <Revelar retraso={80} className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-stretch lg:gap-14">
          <div className="relative min-h-[18rem] overflow-hidden border border-borde bg-superficie-alta lg:min-h-[26rem]">
            {imagen ? (
              <Image
                src={imagen}
                alt={`${proyecto.nombre}, ${proyecto.ciudad}`}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col justify-end gap-3 p-8">
                <span className="titular text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-texto-suave/40">
                  {proyecto.nombre}
                </span>
                <ChipPendiente>{queFalta(proyecto.hero.imagen)}</ChipPendiente>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="antetitulo">{proyecto.ciudad}</p>
              <h3 className="titular titular-md mt-4">{proyecto.nombre}</h3>
              <p className="cuerpo mt-4 max-w-md">{t(proyecto.hero.subtitulo, idioma)}</p>

              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-borde pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-texto-suave">
                    {t(UI.secciones.inventario, idioma)}
                  </dt>
                  <dd className="titular titular-sm mt-2">{t(proyecto.inventario.etiqueta, idioma)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-texto-suave">
                    {t(UI.etiquetas.desde, idioma)}
                  </dt>
                  <dd className="titular titular-sm mt-2 text-acento-suave">
                    {precio ? (
                      formatoMoneda(precio, proyecto.inventario.moneda, idioma)
                    ) : superficieMin ? (
                      formatoSuperficie(superficieMin, idioma)
                    ) : (
                      <ChipPendiente>{queFalta(proyecto.inventario.precioDesde)}</ChipPendiente>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CtaWhatsApp
                numero={SITIO.whatsapp.numero}
                mensaje={t(proyecto.whatsapp.mensajePrefill, idioma)}
                keyword={proyecto.whatsapp.keyword}
                contexto={`${proyecto.slug}-destacado`}
                etiqueta={t(UI.cta.whatsapp, idioma)}
                tamano="lg"
              />
              <Boton asChild variante="secundario" tamano="lg">
                <Link href={r.propiedad(proyecto.slug)}>
                  {t(UI.cta.verProyecto, idioma)}
                  <ArrowUpRight aria-hidden className="size-[1.1em]" />
                </Link>
              </Boton>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
