import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { INICIO } from "@contenido/paginas/inicio";

export function Frentes({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion>
      <EncabezadoSeccion titulo={t(INICIO.frentes.titulo, idioma)} />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {INICIO.frentes.items.map((item, indice) => (
          <Revelar key={item.href} retraso={indice * 90}>
            <Link
              href={`/${idioma}${item.href}`}
              className="group flex h-full flex-col justify-between border border-borde bg-superficie p-8 transition-colors hover:border-acento md:p-10"
            >
              <div>
                <h3 className="titular titular-md">{t(item.titulo, idioma)}</h3>
                <p className="cuerpo mt-5">{t(item.texto, idioma)}</p>
              </div>
              <p className="mt-10 flex items-center gap-2 text-sm text-acento-suave">
                {t(item.cta, idioma)}
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </Revelar>
        ))}
      </div>
    </Seccion>
  );
}
