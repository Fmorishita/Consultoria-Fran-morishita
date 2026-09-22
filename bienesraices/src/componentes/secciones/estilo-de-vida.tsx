import Image from "next/image";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { ENSENADA } from "@contenido/paginas/ensenada";

/** Qué se compra además del lote. Composición partida con foto real. */
export function EstiloDeVida({
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
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Revelar>
          <h2 className="titular titular-lg">{t(ENSENADA.estilo.titulo, idioma)}</h2>
          <p className="cuerpo mt-6 max-w-md">{t(ENSENADA.estilo.texto, idioma)}</p>
          {imagen ? (
            <div className="relative mt-10 hidden aspect-[4/3] w-full overflow-hidden border border-borde lg:block">
              <Image src={imagen} alt={altImagen ?? ""} fill sizes="520px" className="object-cover" />
            </div>
          ) : null}
        </Revelar>

        <Revelar retraso={90}>
          <ul className="divide-y divide-borde border-y border-borde">
            {ENSENADA.estilo.items.map((item) => (
              <li key={item.titulo.es} className="py-6">
                <h3 className="titular titular-sm">{t(item.titulo, idioma)}</h3>
                <p className="cuerpo mt-2 text-base">{t(item.texto, idioma)}</p>
              </li>
            ))}
          </ul>
        </Revelar>
      </div>
    </Seccion>
  );
}
