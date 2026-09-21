import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { Boton } from "@/componentes/ui/boton";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Revelar } from "@/componentes/ui/revelar";
import { t, type Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { queFalta } from "@/lib/pendiente";
import { INICIO, NOTA_INICIO } from "@contenido/paginas/inicio";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

/**
 * Composición partida: el texto manda a la izquierda y el retrato sostiene
 * la derecha. Nada de héroe centrado sobre un degradado.
 */
export function HeroInicio({ idioma }: { idioma: Idioma }) {
  const r = rutas(idioma);

  return (
    <section className="border-b border-borde">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16 lg:min-h-[80svh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
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
            <p className="cuerpo mt-7 max-w-lg">{t(INICIO.hero.subtitulo, idioma)}</p>
          </Revelar>

          <Revelar retraso={240} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaWhatsApp
              numero={SITIO.whatsapp.numero}
              mensaje={t(SITIO.whatsapp.mensajeGeneral, idioma)}
              etiqueta={t(UI.cta.whatsapp, idioma)}
              contexto="hero-inicio"
              tamano="lg"
            />
            <Boton asChild variante="secundario" tamano="lg">
              <Link href={r.proyectos}>
                {t(UI.cta.verProyectos, idioma)}
                <ArrowDownRight aria-hidden className="size-[1.1em]" />
              </Link>
            </Boton>
          </Revelar>
        </div>

        {SITIO.retrato ? (
          <Revelar retraso={120} className="relative aspect-[4/5] w-full overflow-hidden border border-borde bg-superficie sm:aspect-[3/2] lg:aspect-[4/5]">
            <Image
              src={SITIO.retrato}
              alt={`${SITIO.nombre}, ${t(SITIO.rol, idioma)}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover object-top"
            />
          </Revelar>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-6 md:px-8">
        <ChipPendiente>{queFalta(NOTA_INICIO)}</ChipPendiente>
      </div>
    </section>
  );
}
