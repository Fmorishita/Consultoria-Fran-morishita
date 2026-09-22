import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { formatoSuperficie } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { numero } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { INICIO } from "@contenido/paginas/inicio";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

/**
 * Apertura a sangre con la fotografía del producto. El texto va a la izquierda
 * sobre un degradado lateral, y el pie de la imagen lleva la ficha corta del
 * desarrollo que encabeza el sitio. Sin retrato: la marca es la costa.
 */
export function HeroInicio({ idioma, destacado }: { idioma: Idioma; destacado?: Proyecto }) {
  const r = rutas(idioma);
  const imagen = destacado?.hero.imagen;
  const superficieMin = numero(destacado?.inventario.superficieMin);
  const superficieMax = numero(destacado?.inventario.superficieMax);
  const plazos = destacado?.financiamiento?.plazosMeses;

  const ficha = [
    { etiqueta: t(UI.etiquetas.estado, idioma), valor: destacado ? t(UI.estados[destacado.estado], idioma) : undefined },
    {
      etiqueta: t(UI.etiquetas.superficie, idioma),
      valor:
        superficieMin && superficieMax
          ? `${superficieMin} ${t(UI.etiquetas.rango, idioma)} ${formatoSuperficie(superficieMax, idioma)}`
          : undefined,
    },
    {
      etiqueta: t(UI.etiquetas.plazos, idioma),
      valor: plazos?.length ? `${plazos.join(" / ")} ${t(UI.etiquetas.meses, idioma)}` : undefined,
    },
  ].filter((dato): dato is { etiqueta: string; valor: string } => Boolean(dato.valor));

  return (
    <section className="relative border-b border-borde">
      <div className="relative min-h-[88svh] w-full overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${destacado?.nombre}, ${destacado?.ciudad}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 bg-superficie" />
        )}
        <span aria-hidden className="absolute inset-0 overlay-foto lg:hidden" />
        <span aria-hidden className="absolute inset-0 hidden overlay-lateral lg:block" />

        <div className="relative mx-auto flex min-h-[88svh] w-full max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-16 lg:justify-center lg:pb-24 lg:pt-32">
          <Revelar className="max-w-2xl">
            <p className="antetitulo antetitulo-sobre-foto">{t(INICIO.hero.antetitulo, idioma)}</p>
          </Revelar>

          <Revelar retraso={80} className="max-w-2xl">
            <h1 className="titular titular-xl mt-7 text-texto">
              <TitularMultilinea texto={t(INICIO.hero.titulo, idioma)} />
            </h1>
          </Revelar>

          <Revelar retraso={160} className="max-w-xl">
            <p className="cuerpo mt-7 text-texto/85">{t(INICIO.hero.subtitulo, idioma)}</p>
          </Revelar>

          <Revelar retraso={240} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Boton asChild tamano="lg">
              <Link href={destacado ? r.propiedad(destacado.slug) : r.propiedades}>
                {t(UI.cta.conocerDesarrollo, idioma)}
                <ArrowUpRight aria-hidden className="size-[1.1em]" />
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
            <p className="mt-10 max-w-md text-sm text-texto/70">{t(INICIO.hero.pie, idioma)}</p>
          </Revelar>
        </div>
      </div>

      {ficha.length > 0 ? (
        <dl className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-borde px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
          {ficha.map((dato) => (
            <div key={dato.etiqueta} className="py-6 md:px-8 md:first:pl-0 md:last:pr-0">
              <dt className="etiqueta-dato">{dato.etiqueta}</dt>
              <dd className="titular titular-sm mt-2">{dato.valor}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
