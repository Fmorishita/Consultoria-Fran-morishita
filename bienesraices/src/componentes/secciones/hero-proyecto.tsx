import Image from "next/image";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Revelar } from "@/componentes/ui/revelar";
import { t, type Idioma } from "@/lib/i18n";
import { queFalta, texto } from "@/lib/pendiente";
import { cn } from "@/lib/utils";
import type { Proyecto } from "@contenido/esquemas";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

export function HeroProyecto({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const imagen = texto(proyecto.hero.imagen, idioma);
  const desarrollador = texto(proyecto.desarrollador, idioma);

  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden border-b border-borde",
        imagen ? "min-h-[80svh]" : "min-h-[60svh]",
      )}
    >
      {imagen ? (
        <>
          <Image
            src={imagen}
            alt={t(proyecto.hero.titulo, idioma)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 overlay-foto" />
        </>
      ) : null}

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
        <Revelar>
          <div className="flex flex-wrap items-center gap-3 text-xs tracking-wide">
            <span className="border border-borde bg-fondo/70 px-3 py-1">{t(UI.tipos[proyecto.tipo], idioma)}</span>
            <span className="border border-borde bg-fondo/70 px-3 py-1">{t(UI.estados[proyecto.estado], idioma)}</span>
            <span className="text-texto-suave">{proyecto.ciudad}</span>
          </div>
          <h1 className="titular titular-xl mt-6">{t(proyecto.hero.titulo, idioma)}</h1>
          <p className="cuerpo mt-6 max-w-2xl text-texto">{t(proyecto.hero.subtitulo, idioma)}</p>

          {desarrollador ? (
            <p className="mt-4 text-sm text-texto-suave">
              {t(UI.etiquetas.desarrollador, idioma)}: {desarrollador}
            </p>
          ) : (
            <div className="mt-4">
              <ChipPendiente>{queFalta(proyecto.desarrollador)}</ChipPendiente>
            </div>
          )}

          <div className="mt-10">
            <CtaWhatsApp
              numero={SITIO.whatsapp.numero}
              mensaje={t(proyecto.whatsapp.mensajePrefill, idioma)}
              keyword={proyecto.whatsapp.keyword}
              contexto={proyecto.slug}
              etiqueta={t(UI.cta.whatsapp, idioma)}
              tamano="lg"
            />
          </div>
          <div className="mt-6">
            <ChipPendiente>{queFalta(proyecto.hero.imagen)}</ChipPendiente>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
