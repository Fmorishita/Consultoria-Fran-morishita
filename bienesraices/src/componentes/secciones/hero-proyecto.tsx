import Image from "next/image";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { t, type Idioma } from "@/lib/i18n";
import { texto } from "@/lib/pendiente";
import { cn } from "@/lib/utils";
import type { Proyecto } from "@contenido/esquemas";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

/**
 * Portada de ficha: fotografía a sangre, rótulos en filete y dos salidas,
 * pedir el expediente o reservar la visita. El WhatsApp vive más abajo.
 */
export function HeroProyecto({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const imagen = texto(proyecto.hero.imagen, idioma);
  const desarrollador = texto(proyecto.desarrollador, idioma);

  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden border-b border-borde",
        // Sin fotografía, la portada es la lámina topográfica: nunca un fondo vacío.
        imagen ? "min-h-[85svh]" : "topografia min-h-[70svh]",
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
          <span aria-hidden className="absolute inset-0 overlay-foto" />
        </>
      ) : null}

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
        <Revelar>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.2em] text-texto/85">
            <span>{t(UI.tipos[proyecto.tipo], idioma)}</span>
            <span aria-hidden className="h-px w-6 bg-acento" />
            <span>{t(UI.estados[proyecto.estado], idioma)}</span>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-texto/60">{proyecto.ciudad}</p>

          <h1 className="titular titular-xl mt-7">{t(proyecto.hero.titulo, idioma)}</h1>
          <p className="cuerpo mt-6 max-w-2xl text-texto/85">{t(proyecto.hero.subtitulo, idioma)}</p>

          {desarrollador ? (
            <p className="mt-5 text-sm text-texto/70">
              {t(UI.etiquetas.desarrollador, idioma)}: {desarrollador}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Boton asChild tamano="lg">
              <a href="#expediente">{t(UI.cta.solicitarInformacion, idioma)}</a>
            </Boton>
            {SITIO.calendario ? (
              <Boton asChild variante="secundario" tamano="lg">
                <a href={SITIO.calendario} target="_blank" rel="noopener noreferrer">
                  {t(UI.cta.agendarVisita, idioma)}
                </a>
              </Boton>
            ) : null}
          </div>
        </Revelar>
      </div>
    </section>
  );
}
