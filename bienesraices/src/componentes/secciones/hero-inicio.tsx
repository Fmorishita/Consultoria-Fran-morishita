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

export function HeroInicio({ idioma }: { idioma: Idioma }) {
  const r = rutas(idioma);

  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden border-b border-borde">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 size-[38rem] rounded-full bg-acento/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
        <Revelar>
          <p className="antetitulo">{t(INICIO.hero.antetitulo, idioma)}</p>
        </Revelar>

        <Revelar retraso={80}>
          <h1 className="titular titular-xl mt-8">
            <TitularMultilinea texto={t(INICIO.hero.titulo, idioma)} />
          </h1>
        </Revelar>

        <Revelar retraso={160}>
          <p className="cuerpo mt-8 max-w-2xl">{t(INICIO.hero.subtitulo, idioma)}</p>
        </Revelar>

        <Revelar retraso={240} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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

        <div className="mt-8">
          <ChipPendiente>{queFalta(NOTA_INICIO)}</ChipPendiente>
        </div>
      </div>
    </section>
  );
}
