import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { formatoMoneda, formatoNumero } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { numero, texto } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { COMPARADOR } from "@contenido/paginas/proyectos";
import { UI } from "@contenido/ui";

type Fila = {
  slug: string;
  nombre: string;
  tipo: string;
  zona: string;
  superficie: string;
  precio?: string;
  pago?: string;
  estado: string;
};

function fila(proyecto: Proyecto, idioma: Idioma): Fila {
  const min = numero(proyecto.inventario.superficieMin);
  const max = numero(proyecto.inventario.superficieMax);
  const precio = proyecto.autorizado ? numero(proyecto.inventario.precioDesde) : undefined;
  const pago = proyecto.financiamiento?.resumen;

  let superficie = "";
  if (min && max) {
    superficie = `${formatoNumero(min, idioma)} ${t(UI.etiquetas.rango, idioma)} ${formatoNumero(max, idioma)} m²`;
  } else if (min) {
    superficie = `${t(UI.etiquetas.desde, idioma)} ${formatoNumero(min, idioma)} m²`;
  }

  return {
    slug: proyecto.slug,
    nombre: proyecto.nombre,
    tipo: t(proyecto.inventario.etiqueta, idioma),
    zona: proyecto.ubicacion.zona ?? proyecto.ciudad.split(",")[0],
    superficie,
    precio: precio ? formatoMoneda(precio, proyecto.inventario.moneda, idioma) : undefined,
    pago: pago ? texto(pago, idioma) : undefined,
    estado: t(UI.estados[proyecto.estado], idioma),
  };
}

/**
 * El portafolio en una sola lectura: precio de entrada, forma de pago y etapa
 * de cada desarrollo. Tabla en pantalla ancha, lista apilada en móvil (un
 * precio escondido tras un scroll horizontal no se lee). Lo que no está
 * confirmado se dice "a consultar", nunca se estima.
 */
export function Comparador({
  proyectos,
  idioma,
  className,
}: {
  proyectos: Proyecto[];
  idioma: Idioma;
  className?: string;
}) {
  if (proyectos.length < 2) return null;

  const r = rutas(idioma);
  const filas = proyectos.map((p) => fila(p, idioma));
  const aConsultar = t(UI.comparador.aConsultar, idioma);

  const columnas = [
    t(UI.comparador.desarrollo, idioma),
    t(UI.etiquetas.tipo, idioma),
    t(UI.comparador.zona, idioma),
    t(UI.tabla.superficie, idioma),
    t(UI.etiquetas.desde, idioma),
    t(UI.comparador.pago, idioma),
    t(UI.etiquetas.estado, idioma),
  ];

  return (
    <Seccion className={className}>
      <EncabezadoSeccion
        antetitulo={t(COMPARADOR.antetitulo, idioma)}
        titulo={t(COMPARADOR.titulo, idioma)}
        texto={t(COMPARADOR.texto, idioma)}
      />

      <Revelar retraso={80}>
        {/* Apilado en móvil */}
        <ul className="mt-12 divide-y divide-borde border-y border-borde lg:hidden">
          {filas.map((f) => (
            <li key={f.slug} className="py-7">
              <Link href={r.propiedad(f.slug)} className="group flex items-baseline justify-between gap-4">
                <span className="titular text-[1.5rem] leading-tight text-texto">{f.nombre}</span>
                <ArrowUpRight aria-hidden className="size-4 flex-none text-acento" />
              </Link>
              <p className="mt-1 text-sm text-texto-suave">
                {f.tipo} · {f.zona}
              </p>
              <p className="cifra mt-4 text-2xl text-acento">{f.precio ? `${columnas[4]} ${f.precio}` : aConsultar}</p>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
                {f.superficie ? (
                  <>
                    <dt className="text-texto-suave">{columnas[3]}</dt>
                    <dd className="text-texto">{f.superficie}</dd>
                  </>
                ) : null}
                <dt className="text-texto-suave">{columnas[5]}</dt>
                <dd className="text-texto">{f.pago ?? aConsultar}</dd>
                <dt className="text-texto-suave">{columnas[6]}</dt>
                <dd className="text-texto">{f.estado}</dd>
              </dl>
            </li>
          ))}
        </ul>

        {/* Tabla en escritorio */}
        <table className="mt-12 hidden w-full border-collapse text-left lg:table">
          <thead>
            <tr className="border-y border-borde">
              {columnas.map((columna) => (
                <th key={columna} scope="col" className="etiqueta-dato py-4 pr-6 font-medium last:pr-0">
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-borde border-b border-borde">
            {filas.map((f) => (
              <tr key={f.slug} className="align-top">
                <th scope="row" className="py-6 pr-6 font-normal">
                  <Link href={r.propiedad(f.slug)} className="group inline-flex items-center gap-2">
                    <span className="titular text-[1.35rem] leading-tight text-texto group-hover:text-acento">
                      {f.nombre}
                    </span>
                    <ArrowUpRight aria-hidden className="size-4 text-acento" />
                  </Link>
                </th>
                <td className="py-6 pr-6 text-sm text-texto">{f.tipo}</td>
                <td className="py-6 pr-6 text-sm text-texto">{f.zona}</td>
                <td className="py-6 pr-6 text-sm whitespace-nowrap text-texto">{f.superficie || aConsultar}</td>
                <td className="cifra py-6 pr-6 text-xl whitespace-nowrap text-acento">{f.precio ?? aConsultar}</td>
                <td className="max-w-[16rem] py-6 pr-6 text-sm leading-relaxed text-texto-suave">{f.pago ?? aConsultar}</td>
                <td className="py-6 text-sm whitespace-nowrap text-texto">{f.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Revelar>
    </Seccion>
  );
}
