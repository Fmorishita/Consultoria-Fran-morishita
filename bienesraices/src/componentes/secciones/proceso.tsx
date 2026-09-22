import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { t, type Idioma } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { cn } from "@/lib/utils";
import { PROCESO } from "@contenido/paginas/proceso";

/**
 * Riel vertical numerado: el recorrido de compra, de la primera llamada a la
 * escritura. Es la sección que responde "¿y luego qué pasa?" sin depender de
 * ningún dato que todavía no tengamos.
 */
export function Proceso({
  idioma,
  antetitulo,
  className,
  children,
}: {
  idioma: Idioma;
  antetitulo?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Seccion className={cn("bg-superficie", className)}>
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Revelar className="lg:sticky lg:top-28 lg:self-start">
          {antetitulo ? <p className="antetitulo mb-6">{antetitulo}</p> : null}
          <h2 className="titular titular-lg">
            <TitularMultilinea texto={t(PROCESO.titulo, idioma)} />
          </h2>
          <p className="cuerpo mt-6 max-w-md">{t(PROCESO.texto, idioma)}</p>
          {children ? <div className="mt-10">{children}</div> : null}
        </Revelar>

        <ol className="relative">
          {/* El riel se pinta detrás de los números y se corta en el último paso. */}
          <span
            aria-hidden
            className="absolute left-[1.375rem] top-3 bottom-12 w-px bg-borde md:left-[1.625rem]"
          />
          {PROCESO.pasos.map((paso, indice) => {
            const Icono = icono(paso.icono);
            return (
              <Revelar
                key={paso.titulo.es}
                retraso={indice * 80}
                className="relative flex gap-6 pb-12 last:pb-0 md:gap-8"
              >
                <span className="relative z-10 flex size-11 flex-none items-center justify-center rounded-full border border-borde-fuerte bg-fondo text-acento md:size-13">
                  <Icono aria-hidden className="size-5 md:size-6" strokeWidth={1.5} />
                </span>
                <div className="pt-1.5">
                  <p className="indice-seccion">
                    {String(indice + 1).padStart(2, "0")}
                  </p>
                  <h3 className="titular titular-sm mt-2">{t(paso.titulo, idioma)}</h3>
                  <p className="cuerpo mt-3 max-w-lg text-base">{t(paso.texto, idioma)}</p>
                </div>
              </Revelar>
            );
          })}
        </ol>
      </div>
    </Seccion>
  );
}
