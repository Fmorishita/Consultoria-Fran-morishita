import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Revelar } from "@/componentes/ui/revelar";

export function Seccion({
  children,
  className,
  id,
  contenedor = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  contenedor?: boolean;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)}>
      {contenedor ? <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div> : children}
    </section>
  );
}

export function EncabezadoSeccion({
  antetitulo,
  titulo,
  texto,
  className,
}: {
  antetitulo?: string;
  titulo: string;
  texto?: string;
  className?: string;
}) {
  return (
    <Revelar className={cn("max-w-3xl", className)}>
      {antetitulo ? <p className="antetitulo mb-5">{antetitulo}</p> : null}
      <h2 className="titular titular-lg">{titulo}</h2>
      {texto ? <p className="cuerpo mt-6 max-w-2xl">{texto}</p> : null}
    </Revelar>
  );
}
