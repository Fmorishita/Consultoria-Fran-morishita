"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { ESTADO_INICIAL, enviarLead } from "@/acciones/enviar-lead";
import { Boton } from "@/componentes/ui/boton";
import { AreaTexto, Casilla, Entrada, Error as ErrorCampo, Etiqueta, Seleccion } from "@/componentes/ui/campo";
import { leerAtribucion } from "@/lib/atribucion";
import type { Idioma } from "@/lib/i18n";
import { nuevoEventId, rastrear } from "@/lib/tracking";

export type TextosFormulario = {
  nombre: string;
  telefono: string;
  email: string;
  interes: string;
  mensaje: string;
  opcional: string;
  enviar: string;
  enviando: string;
  consentimiento: string;
  privacidad: string;
  errorGeneral: string;
  errores: { nombre: string; telefono: string; email: string; consentimiento: string };
};

export type PropsFormulario = {
  idioma: Idioma;
  textos: TextosFormulario;
  intereses: { valor: string; texto: string }[];
  interesPorDefecto?: string;
  proyectoSlug?: string;
  tipo?: "lead" | "proyecto" | "desarrollador";
  hrefPrivacidad: string;
};

export function FormularioLead({
  idioma,
  textos,
  intereses,
  interesPorDefecto,
  proyectoSlug,
  tipo = "lead",
  hrefPrivacidad,
}: PropsFormulario) {
  const router = useRouter();
  const [estado, accion, enviando] = useActionState(enviarLead, ESTADO_INICIAL);
  const campoAtribucion = useRef<HTMLInputElement>(null);
  const campoEventId = useRef<HTMLInputElement>(null);

  // Datos que solo existen en el navegador: se escriben directo en el DOM.
  useEffect(() => {
    if (campoAtribucion.current) campoAtribucion.current.value = JSON.stringify(leerAtribucion());
    if (campoEventId.current && !campoEventId.current.value) campoEventId.current.value = nuevoEventId();
  }, []);

  useEffect(() => {
    if (!estado.ok) return;
    // El servidor ya mandó el evento por CAPI con este mismo id: Meta deduplica.
    rastrear("Lead", { content_name: proyectoSlug ?? tipo }, campoEventId.current?.value || undefined);
    router.push(`/${idioma}/gracias?tipo=${estado.destino ?? tipo}`);
  }, [estado, idioma, proyectoSlug, router, tipo]);

  const errores = estado.errores;

  return (
    <form action={accion} className="grid gap-6" noValidate>
      <input type="hidden" name="atribucion" ref={campoAtribucion} defaultValue="{}" />
      <input type="hidden" name="proyecto_slug" value={proyectoSlug ?? ""} />
      <input type="hidden" name="tipo" value={tipo} />
      <input type="hidden" name="idioma" value={idioma} />
      <input type="hidden" name="event_id" ref={campoEventId} defaultValue="" />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="empresa">Empresa</label>
        <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Etiqueta htmlFor="nombre">{textos.nombre}</Etiqueta>
          <Entrada id="nombre" name="nombre" autoComplete="name" required aria-invalid={errores?.nombre} />
          {errores?.nombre ? <ErrorCampo>{textos.errores.nombre}</ErrorCampo> : null}
        </div>
        <div>
          <Etiqueta htmlFor="telefono">{textos.telefono}</Etiqueta>
          <Entrada
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={errores?.telefono}
          />
          {errores?.telefono ? <ErrorCampo>{textos.errores.telefono}</ErrorCampo> : null}
        </div>
      </div>

      <div>
        <Etiqueta htmlFor="email">{textos.email}</Etiqueta>
        <Entrada id="email" name="email" type="email" autoComplete="email" required aria-invalid={errores?.email} />
        {errores?.email ? <ErrorCampo>{textos.errores.email}</ErrorCampo> : null}
      </div>

      <div>
        <Etiqueta htmlFor="interes">{textos.interes}</Etiqueta>
        <Seleccion id="interes" name="interes" defaultValue={interesPorDefecto ?? intereses[0]?.valor}>
          {intereses.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </Seleccion>
      </div>

      <div>
        <Etiqueta htmlFor="mensaje">
          {textos.mensaje} <span className="text-texto-suave/70">({textos.opcional})</span>
        </Etiqueta>
        <AreaTexto id="mensaje" name="mensaje" rows={4} />
      </div>

      <div className="flex items-start gap-3">
        <Casilla id="consentimiento" name="consentimiento" required aria-invalid={errores?.consentimiento} />
        <label htmlFor="consentimiento" className="text-sm leading-relaxed text-texto-suave">
          {textos.consentimiento}{" "}
          <Link href={hrefPrivacidad} className="text-acento-suave underline underline-offset-4">
            {textos.privacidad}
          </Link>
        </label>
      </div>
      {errores?.consentimiento ? <ErrorCampo>{textos.errores.consentimiento}</ErrorCampo> : null}
      {errores?.general ? <ErrorCampo>{textos.errorGeneral}</ErrorCampo> : null}

      <div>
        <Boton type="submit" tamano="lg" disabled={enviando}>
          {enviando ? textos.enviando : textos.enviar}
        </Boton>
      </div>
    </form>
  );
}
