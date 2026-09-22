import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { t, type Idioma } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { OBJECIONES } from "@contenido/paginas/compradores";

/**
 * Lo que frena la compra, en pares de duda y respuesta. La duda va entre
 * comillas y en serif porque es la voz del comprador, no la nuestra; la
 * respuesta va en sans, que es como suena alguien contestando.
 */
export function Objeciones({ idioma, className }: { idioma: Idioma; className?: string }) {
  return (
    <Seccion className={className}>
      <Revelar className="max-w-3xl">
        <p className="antetitulo mb-6">{t(OBJECIONES.antetitulo, idioma)}</p>
        <h2 className="titular titular-lg">
          <TitularMultilinea texto={t(OBJECIONES.titulo, idioma)} />
        </h2>
        <p className="cuerpo mt-7 max-w-xl">{t(OBJECIONES.texto, idioma)}</p>
      </Revelar>

      <ol className="mt-16 divide-y divide-borde border-y border-borde">
        {OBJECIONES.items.map((item, indice) => {
          const Icono = icono(item.icono);
          return (
            <Revelar
              key={item.duda.es}
              retraso={indice * 60}
              como="li"
              className="grid gap-5 py-9 lg:grid-cols-[auto_0.9fr_1.1fr] lg:items-start lg:gap-12"
            >
              <span className="flex items-center gap-4 lg:pt-1">
                <Icono aria-hidden className="size-5 text-acento" strokeWidth={1.5} />
                <span className="indice-seccion">{String(indice + 1).padStart(2, "0")}</span>
              </span>
              <p className="titular titular-sm text-texto">{t(item.duda, idioma)}</p>
              <p className="cuerpo text-base">{t(item.respuesta, idioma)}</p>
            </Revelar>
          );
        })}
      </ol>
    </Seccion>
  );
}
