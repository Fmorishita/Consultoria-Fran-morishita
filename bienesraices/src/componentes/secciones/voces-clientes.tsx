import { Quote } from "lucide-react";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { texto } from "@/lib/pendiente";
import { TESTIMONIOS_CLIENTES } from "@contenido/testimonios";
import { UI } from "@contenido/ui";

/**
 * Lo que dicen quienes ya compraron. Si todavía no hay testimonios reales
 * recogidos y autorizados, la sección no se pinta: un bloque de citas
 * inventadas vale menos que no tener bloque.
 */
export function VocesClientes({ idioma, className }: { idioma: Idioma; className?: string }) {
  const voces = TESTIMONIOS_CLIENTES.filter((v) => texto(v.cita, idioma));
  if (voces.length === 0) return null;

  return (
    <Seccion className={className}>
      <Revelar className="max-w-3xl">
        <p className="antetitulo mb-6">{t(UI.secciones.vocesAntetitulo, idioma)}</p>
        <h2 className="titular titular-lg">{t(UI.secciones.voces, idioma)}</h2>
      </Revelar>

      <ul className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
        {voces.map((voz, indice) => (
          <Revelar key={voz.slug} retraso={indice * 70} como="li" className="border-t border-borde pt-8">
            <Quote aria-hidden className="size-6 text-acento" strokeWidth={1.5} />
            <blockquote className="titular titular-sm mt-6 text-texto">{texto(voz.cita, idioma)}</blockquote>
            <figcaption className="mt-6 text-sm text-texto-suave">
              <span className="text-texto">{voz.nombre}</span>
              {voz.ciudad ? <span> · {voz.ciudad}</span> : null}
              {voz.compro ? <span className="mt-1 block">{t(voz.compro, idioma)}</span> : null}
            </figcaption>
          </Revelar>
        ))}
      </ul>
    </Seccion>
  );
}
