import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { t, type Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { INICIO } from "@contenido/paginas/inicio";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

/**
 * Composición partida: el problema del comprador manda a la izquierda y el
 * retrato de Fran sostiene la derecha. El retrato va como pieza, nunca de
 * fondo: la marca es una persona con nombre, no una fotografía de paisaje.
 */
export function HeroInicio({ idioma }: { idioma: Idioma }) {
  const r = rutas(idioma);

  return (
    <section className="border-b border-borde">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-14 pt-8 md:gap-12 md:px-8 md:pb-20 md:pt-14 lg:min-h-[78svh] lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:pt-16">
        <div>
          <Revelar>
            <p className="antetitulo">{t(INICIO.hero.antetitulo, idioma)}</p>
          </Revelar>

          <Revelar retraso={80}>
            <h1 className="titular titular-xl mt-6">
              <TitularMultilinea texto={t(INICIO.hero.titulo, idioma)} />
            </h1>
          </Revelar>

          <Revelar retraso={160}>
            <p className="cuerpo mt-7 max-w-xl">{t(INICIO.hero.subtitulo, idioma)}</p>
          </Revelar>

          <Revelar retraso={240} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Boton asChild tamano="lg">
              <Link href={r.propiedades}>
                {t(UI.cta.verProyectos, idioma)}
                <ArrowDownRight aria-hidden className="size-[1.1em]" />
              </Link>
            </Boton>
            {SITIO.calendario ? (
              <Boton asChild variante="secundario" tamano="lg">
                <a href={SITIO.calendario} target="_blank" rel="noopener noreferrer">
                  {t(UI.cta.agendarVisita, idioma)}
                </a>
              </Boton>
            ) : null}
          </Revelar>

          <Revelar retraso={320}>
            <p className="mt-10 max-w-md text-sm text-texto-suave">{t(INICIO.hero.pie, idioma)}</p>
          </Revelar>
        </div>

        {SITIO.retrato ? (
          <Revelar retraso={120}>
            <figure>
              <div className="relative aspect-4/5 w-full overflow-hidden border border-borde bg-superficie">
                <Image
                  src={SITIO.retrato}
                  alt={`${SITIO.nombre}, ${t(SITIO.rol, idioma)}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-5 flex items-start gap-3 text-sm text-texto-suave">
                <span aria-hidden className="mt-2.5 h-px w-6 flex-none bg-acento" />
                {t(INICIO.hero.firma, idioma)}
              </figcaption>
            </figure>
          </Revelar>
        ) : null}
      </div>
    </section>
  );
}
