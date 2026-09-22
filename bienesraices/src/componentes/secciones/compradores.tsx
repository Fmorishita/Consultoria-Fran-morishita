import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { t, type Idioma } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { PERSONAS } from "@contenido/paginas/compradores";

/**
 * Cierre argumental: cuatro perfiles con su problema de fondo. Va justo antes
 * del formulario para que el visitante llegue sabiendo cuál es su caso y lo
 * escriba en el mensaje.
 */
export function Compradores({ idioma, className }: { idioma: Idioma; className?: string }) {
  return (
    <Seccion className={className}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Revelar className="lg:sticky lg:top-28 lg:self-start">
          <p className="antetitulo mb-6">{t(PERSONAS.antetitulo, idioma)}</p>
          <h2 className="titular titular-lg">
            <TitularMultilinea texto={t(PERSONAS.titulo, idioma)} />
          </h2>
          <p className="cuerpo mt-7 max-w-md">{t(PERSONAS.texto, idioma)}</p>
        </Revelar>

        <ul className="divide-y divide-borde border-y border-borde">
          {PERSONAS.items.map((item, indice) => {
            const Icono = icono(item.icono);
            return (
              <Revelar key={item.perfil.es} retraso={indice * 70} como="li" className="py-9 first:pt-0 lg:first:pt-9">
                <div className="flex items-center gap-4">
                  <Icono aria-hidden className="size-5 flex-none text-acento" strokeWidth={1.5} />
                  <h3 className="titular titular-sm">{t(item.perfil, idioma)}</h3>
                </div>
                <p className="cuerpo mt-4 text-base">{t(item.problema, idioma)}</p>
                <p className="mt-5 border-l-2 border-acento pl-5 text-base leading-relaxed text-texto">
                  {t(item.respuesta, idioma)}
                </p>
              </Revelar>
            );
          })}
        </ul>
      </div>
    </Seccion>
  );
}
