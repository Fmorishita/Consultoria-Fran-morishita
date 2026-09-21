"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { useScrollPasado } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/lib/i18n";
import { rutaEnIdioma } from "@/lib/i18n";

export type EnlaceNav = { href: string; texto: string };

export type PropsEncabezado = {
  idioma: Idioma;
  enlaces: EnlaceNav[];
  marca: { linea1: string; linea2: string };
  textos: { abrirMenu: string; cerrarMenu: string; cambiarIdioma: string; whatsapp: string };
  whatsapp: { numero: string; mensaje: string };
};

export function Encabezado({ idioma, enlaces, marca, textos, whatsapp }: PropsEncabezado) {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  const condensado = useScrollPasado(24);
  const otroIdioma: Idioma = idioma === "es" ? "en" : "es";

  // Al cambiar de ruta se cierra el menú (ajuste de estado en render,
  // que es lo recomendado en vez de un efecto).
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setAbierto(false);
  }

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        condensado || abierto ? "border-b border-borde bg-fondo/95 backdrop-blur" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href={`/${idioma}`} className="titular text-lg leading-none tracking-tight md:text-xl">
          {marca.linea1} <span className="text-acento-suave">{marca.linea2}</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={cn(
                "text-sm text-texto-suave transition-colors hover:text-texto",
                ruta === enlace.href && "text-texto",
              )}
            >
              {enlace.texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={rutaEnIdioma(ruta, otroIdioma)}
            hrefLang={otroIdioma}
            className="hidden text-sm text-texto-suave transition-colors hover:text-texto sm:block"
          >
            {textos.cambiarIdioma}
          </Link>
          <div className="hidden md:block">
            <CtaWhatsApp
              numero={whatsapp.numero}
              mensaje={whatsapp.mensaje}
              etiqueta={textos.whatsapp}
              contexto="nav"
              tamano="sm"
              variante="secundario"
            />
          </div>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-label={abierto ? textos.cerrarMenu : textos.abrirMenu}
            className="flex size-10 items-center justify-center text-texto lg:hidden"
          >
            {abierto ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </div>

      {abierto ? (
        <div className="border-t border-borde bg-fondo lg:hidden">
          <nav aria-label="Principal móvil" className="mx-auto flex max-w-6xl flex-col px-5 py-4 md:px-8">
            {enlaces.map((enlace) => (
              <Link key={enlace.href} href={enlace.href} className="titular titular-sm border-b border-borde py-4">
                {enlace.texto}
              </Link>
            ))}
            <Link href={rutaEnIdioma(ruta, otroIdioma)} hrefLang={otroIdioma} className="py-4 text-sm text-texto-suave">
              {textos.cambiarIdioma}
            </Link>
            <div className="pb-4 pt-2">
              <CtaWhatsApp
                numero={whatsapp.numero}
                mensaje={whatsapp.mensaje}
                etiqueta={textos.whatsapp}
                contexto="menu-movil"
                className="w-full"
              />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
