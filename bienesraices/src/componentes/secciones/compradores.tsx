import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { t, type Idioma } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { rutas } from "@/lib/navegacion";
import { PERSONAS } from "@contenido/paginas/compradores";
import { esPublicable, proyectoPorSlug } from "@contenido/proyectos";

/**
 * Cierre argumental: cuatro perfiles con su problema de fondo y, debajo de
 * cada uno, qué desarrollo del portafolio le enseñaría primero y por qué.
 * Convierte la empatía en ruta: el visitante se reconoce y sale directo a
 * la ficha que le toca. Una recomendación a un desarrollo que no se puede
 * publicar simplemente no se pinta.
 */
export function Compradores({ idioma, className }: { idioma: Idioma; className?: string }) {
  const r = rutas(idioma);

  return (
    <Seccion className={className}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Revelar className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="titular titular-lg">
            <TitularMultilinea texto={t(PERSONAS.titulo, idioma)} />
          </h2>
          <p className="cuerpo mt-7 max-w-md">{t(PERSONAS.texto, idioma)}</p>
        </Revelar>

        <ul className="divide-y divide-borde border-y border-borde">
          {PERSONAS.items.map((item, indice) => {
            const Icono = icono(item.icono);
            const recomendados = item.recomienda
              .map((rec) => ({ rec, proyecto: proyectoPorSlug(rec.slug) }))
              .filter(({ proyecto }) => proyecto && esPublicable(proyecto));

            return (
              <Revelar key={item.perfil.es} retraso={indice * 70} como="li" className="py-10">
                <div className="flex items-center gap-4">
                  <Icono aria-hidden className="size-5 flex-none text-acento" strokeWidth={1.5} />
                  <h3 className="titular titular-sm">{t(item.perfil, idioma)}</h3>
                </div>
                <p className="cuerpo mt-4 text-base">{t(item.problema, idioma)}</p>
                <p className="mt-5 border-l-2 border-acento pl-5 text-base leading-relaxed text-texto">
                  {t(item.respuesta, idioma)}
                </p>

                {recomendados.length > 0 ? (
                  <div className="mt-7">
                    <p className="etiqueta-dato">{t(PERSONAS.recomiendo, idioma)}</p>
                    <ul className="mt-3 space-y-3">
                      {recomendados.map(({ rec, proyecto }) => (
                        <li key={rec.slug}>
                          <Link
                            href={r.propiedad(rec.slug)}
                            className="group flex items-start justify-between gap-5 border border-borde bg-superficie p-5 transition-colors hover:border-acento"
                          >
                            <span>
                              <span className="titular block text-[1.3rem] leading-tight text-texto">
                                {proyecto?.nombre}
                              </span>
                              <span className="mt-2 block text-sm leading-relaxed text-texto-suave">
                                {t(rec.razon, idioma)}
                              </span>
                            </span>
                            <ArrowUpRight
                              aria-hidden
                              className="mt-1 size-5 flex-none text-acento transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Revelar>
            );
          })}
        </ul>
      </div>
    </Seccion>
  );
}
