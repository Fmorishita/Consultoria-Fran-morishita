import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { t, type Idioma } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { ENSENADA } from "@contenido/paginas/ensenada";

/** El argumento de inversión de la plaza: rejilla de filetes, sin tarjetas. */
export function PorQueEnsenada({
  idioma,
  antetitulo,
  className,
}: {
  idioma: Idioma;
  antetitulo?: string;
  className?: string;
}) {
  return (
    <Seccion className={className}>
      <Revelar className="max-w-3xl">
        {antetitulo ? <p className="antetitulo mb-6">{antetitulo}</p> : null}
        <h2 className="titular titular-lg">
          <TitularMultilinea texto={t(ENSENADA.inversion.titulo, idioma)} />
        </h2>
        <p className="cuerpo mt-6 max-w-xl">{t(ENSENADA.inversion.texto, idioma)}</p>
      </Revelar>

      <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
        {ENSENADA.inversion.razones.map((razon, indice) => {
          const Icono = icono(razon.icono);
          return (
            <Revelar key={razon.titulo.es} retraso={indice * 70} className="border-t border-borde pt-7">
              <Icono aria-hidden className="size-6 text-acento" strokeWidth={1.5} />
              <h3 className="titular titular-sm mt-5">{t(razon.titulo, idioma)}</h3>
              <p className="cuerpo mt-3 text-base">{t(razon.texto, idioma)}</p>
            </Revelar>
          );
        })}
      </div>
    </Seccion>
  );
}
