import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { ENSENADA } from "@contenido/paginas/ensenada";

/** El argumento de inversión de la plaza, en hairlines y no en tarjetas. */
export function PorQueEnsenada({ idioma, className }: { idioma: Idioma; className?: string }) {
  return (
    <Seccion className={className}>
      <EncabezadoSeccion
        titulo={t(ENSENADA.inversion.titulo, idioma)}
        texto={t(ENSENADA.inversion.texto, idioma)}
      />
      <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {ENSENADA.inversion.razones.map((razon, indice) => (
          <Revelar key={razon.titulo.es} retraso={indice * 70} className="border-t border-borde pt-6">
            <h3 className="titular titular-sm">{t(razon.titulo, idioma)}</h3>
            <p className="cuerpo mt-3 text-base">{t(razon.texto, idioma)}</p>
          </Revelar>
        ))}
      </div>
    </Seccion>
  );
}
