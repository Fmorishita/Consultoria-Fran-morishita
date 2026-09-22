import Image from "next/image";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { t, type Idioma } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { ENSENADA } from "@contenido/paginas/ensenada";

type Item = (typeof ENSENADA.inversion.razones)[number] | (typeof ENSENADA.estilo.items)[number];

function Columna({ etiqueta, items, idioma }: { etiqueta: string; items: readonly Item[]; idioma: Idioma }) {
  return (
    <div>
      <p className="etiqueta-dato border-b border-borde pb-4">{etiqueta}</p>
      <ul className="divide-y divide-borde">
        {items.map((item) => {
          const Icono = icono(item.icono);
          return (
            <li key={item.titulo.es} className="flex gap-5 py-6">
              <Icono aria-hidden className="mt-1 size-5 flex-none text-acento" strokeWidth={1.5} />
              <div>
                <h3 className="titular text-[1.35rem] leading-tight">{t(item.titulo, idioma)}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-texto-suave">{t(item.texto, idioma)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * La plaza en una sola pieza: por qué invertir aquí y cómo se vive aquí, a
 * dos columnas bajo una fotografía real de la bahía. Sustituye en el home a
 * las dos secciones que antes decían casi lo mismo por separado.
 */
export function LaPlaza({
  idioma,
  imagen,
  altImagen,
  className,
}: {
  idioma: Idioma;
  imagen?: string;
  altImagen?: string;
  className?: string;
}) {
  return (
    <Seccion className={className}>
      <Revelar className="max-w-3xl">
        <h2 className="titular titular-lg">
          <TitularMultilinea texto={t(ENSENADA.inversion.titulo, idioma)} />
        </h2>
        <p className="cuerpo mt-6 max-w-xl">{t(ENSENADA.inversion.texto, idioma)}</p>
      </Revelar>

      {imagen ? (
        <Revelar retraso={80} className="relative mt-14 aspect-4/3 w-full overflow-hidden border border-borde sm:aspect-21/9">
          <Image src={imagen} alt={altImagen ?? ""} fill sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover" />
        </Revelar>
      ) : null}

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Revelar>
          <Columna etiqueta={t(ENSENADA.inversion.etiqueta, idioma)} items={ENSENADA.inversion.razones} idioma={idioma} />
        </Revelar>
        <Revelar retraso={90}>
          <Columna etiqueta={t(ENSENADA.estilo.etiqueta, idioma)} items={ENSENADA.estilo.items} idioma={idioma} />
        </Revelar>
      </div>
    </Seccion>
  );
}
