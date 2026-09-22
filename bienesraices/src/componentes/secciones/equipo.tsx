import Image from "next/image";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { EQUIPO, SECCION_EQUIPO } from "@contenido/equipo";

/**
 * Quién atiende. Cuando todavía no hay retrato de alguien se pinta su
 * monograma en el mismo marco: un marcador que se lee como decisión de
 * diseño y no como un hueco, y que nunca pone la cara de otra persona.
 */
export function Equipo({ idioma, className }: { idioma: Idioma; className?: string }) {
  return (
    <Seccion className={className}>
      <Revelar className="max-w-3xl">
        <h2 className="titular titular-lg">{t(SECCION_EQUIPO.titulo, idioma)}</h2>
        <p className="cuerpo mt-7 max-w-xl">{t(SECCION_EQUIPO.texto, idioma)}</p>
      </Revelar>

      <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {EQUIPO.map((persona, indice) => (
          <Revelar key={persona.nombre} retraso={indice * 80} como="li">
            <div
              className={cn(
                "relative aspect-4/5 w-full overflow-hidden border border-borde",
                persona.foto ? "bg-superficie" : "topografia",
              )}
            >
              {persona.foto ? (
                <Image
                  src={persona.foto}
                  alt={`${persona.nombre}, ${t(persona.puesto, idioma)}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover object-top"
                />
              ) : (
                <span
                  aria-hidden
                  className="cifra absolute inset-0 flex items-center justify-center text-[clamp(3rem,7vw,4.5rem)] text-borde-fuerte"
                >
                  {persona.iniciales}
                </span>
              )}
            </div>

            <h3 className="titular titular-sm mt-6">{persona.nombre}</h3>
            <p className="mt-2 text-sm text-acento">{t(persona.puesto, idioma)}</p>
            {persona.nota ? <p className="cuerpo mt-4 text-base">{t(persona.nota, idioma)}</p> : null}
          </Revelar>
        ))}
      </ul>
    </Seccion>
  );
}
