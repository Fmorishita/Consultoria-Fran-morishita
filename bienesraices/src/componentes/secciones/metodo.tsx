import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { INICIO } from "@contenido/paginas/inicio";

/** Pila numerada, no tres tarjetas iguales. */
export function Metodo({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion className="bg-superficie">
      <EncabezadoSeccion titulo={t(INICIO.metodo.titulo, idioma)} />
      <ol className="mt-12 border-t border-borde">
        {INICIO.metodo.pasos.map((paso, indice) => (
          <Revelar
            key={paso.titulo.es}
            retraso={indice * 80}
            como="li"
            className="grid gap-4 border-b border-borde py-8 md:grid-cols-[6rem_1fr_1.1fr] md:items-baseline md:gap-10 md:py-10"
          >
            <span className="titular text-4xl text-acento-suave md:text-5xl">0{indice + 1}</span>
            <h3 className="titular titular-md">{t(paso.titulo, idioma)}</h3>
            <p className="cuerpo text-base">{t(paso.texto, idioma)}</p>
          </Revelar>
        ))}
      </ol>
    </Seccion>
  );
}
