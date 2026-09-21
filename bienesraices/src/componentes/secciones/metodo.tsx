import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { INICIO } from "@contenido/paginas/inicio";

export function Metodo({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion className="bg-superficie">
      <EncabezadoSeccion antetitulo={t(INICIO.metodo.antetitulo, idioma)} titulo={t(INICIO.metodo.titulo, idioma)} />
      <ol className="mt-14 grid gap-10 md:grid-cols-3">
        {INICIO.metodo.pasos.map((paso, indice) => (
          <Revelar key={paso.titulo.es} retraso={indice * 90} como="li" className="border-t border-borde pt-6">
            <p className="antetitulo text-acento-suave">0{indice + 1}</p>
            <h3 className="titular titular-sm mt-4">{t(paso.titulo, idioma)}</h3>
            <p className="cuerpo mt-4 text-base">{t(paso.texto, idioma)}</p>
          </Revelar>
        ))}
      </ol>
    </Seccion>
  );
}
