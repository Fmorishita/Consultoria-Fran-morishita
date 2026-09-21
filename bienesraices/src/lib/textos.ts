import { t, type Idioma } from "@/lib/i18n";
import { UI } from "@contenido/ui";
import type { TextosFormulario } from "@/componentes/formulario-lead";

/** Microcopy del formulario resuelto en un idioma, para no repetirlo en cada página. */
export function textosFormulario(idioma: Idioma): TextosFormulario {
  return {
    nombre: t(UI.formulario.nombre, idioma),
    telefono: t(UI.formulario.telefono, idioma),
    email: t(UI.formulario.email, idioma),
    interes: t(UI.formulario.interes, idioma),
    mensaje: t(UI.formulario.mensaje, idioma),
    opcional: t(UI.formulario.opcional, idioma),
    enviar: t(UI.formulario.enviar, idioma),
    enviando: t(UI.formulario.enviando, idioma),
    consentimiento: t(UI.formulario.consentimiento, idioma),
    privacidad: t(UI.footer.privacidad, idioma),
    errorGeneral: t(UI.formulario.errorGeneral, idioma),
    errores: {
      nombre: t(UI.formulario.errores.nombre, idioma),
      telefono: t(UI.formulario.errores.telefono, idioma),
      email: t(UI.formulario.errores.email, idioma),
      consentimiento: t(UI.formulario.errores.consentimiento, idioma),
    },
  };
}

export function interesesFormulario(idioma: Idioma) {
  return UI.formulario.intereses.map((opcion) => ({
    valor: opcion.valor,
    texto: t(opcion.texto, idioma),
  }));
}
