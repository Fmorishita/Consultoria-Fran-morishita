import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const estilos = cva(
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-[colors,transform] duration-200 active:translate-y-px disabled:opacity-60 disabled:pointer-events-none rounded-xs",
  {
    variants: {
      variante: {
        primario: "bg-acento text-acento-contraste hover:bg-acento-suave",
        secundario: "border border-borde text-texto hover:border-acento hover:text-acento-suave",
        fantasma: "text-texto-suave hover:text-texto",
      },
      tamano: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variante: "primario", tamano: "md" },
  },
);

type Props = ComponentProps<"button"> & VariantProps<typeof estilos> & { asChild?: boolean };

export function Boton({ className, variante, tamano, asChild = false, ...props }: Props) {
  const Componente = asChild ? Slot : "button";
  return <Componente className={cn(estilos({ variante, tamano }), className)} {...props} />;
}

export { estilos as estilosBoton };
