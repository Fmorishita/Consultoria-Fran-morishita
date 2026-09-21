import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full bg-superficie border border-borde rounded-xs px-4 text-texto placeholder:text-texto-suave/70 transition-colors focus:border-acento outline-none";

export function Etiqueta({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("block text-sm font-medium text-texto-suave mb-2", className)} {...props} />;
}

export function Entrada({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(base, "h-13 py-3", className)} {...props} />;
}

export function AreaTexto({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(base, "py-3 min-h-28 resize-y", className)} {...props} />;
}

export function Seleccion({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(base, "h-13 py-3 appearance-none cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
}

export function Casilla({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "mt-1 size-5 shrink-0 cursor-pointer appearance-none rounded-xs border border-borde bg-superficie",
        "checked:bg-acento checked:border-acento",
        "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222.5%22><path d=%22M3 8.5l3.2 3.2L13 5%22/></svg>')] checked:bg-center checked:bg-no-repeat",
        className,
      )}
      {...props}
    />
  );
}

export function Error({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm text-acento-suave">{children}</p>;
}
