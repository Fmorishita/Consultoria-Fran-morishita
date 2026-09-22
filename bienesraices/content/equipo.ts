import { esquemaPersona, type Persona } from "@contenido/esquemas";
import { SITIO } from "@contenido/sitio";

/**
 * Quién atiende. `foto` se queda vacía hasta que exista un retrato real de
 * cada quien: el componente pinta el monograma con las iniciales, que es un
 * marcador honesto. Nunca se pone la cara de otra persona de relleno.
 */
export const EQUIPO: Persona[] = [
  {
    nombre: "Fran Morishita",
    iniciales: "FM",
    puesto: { es: "Representación y dirección comercial", en: "Representation and sales direction" },
    nota: {
      es: "Lleva la relación con los desarrollos, la negociación y el cierre. Es quien responde cuando la pregunta es difícil.",
      en: "Handles the relationship with the developments, the negotiation and the closing. He is the one who answers when the question is a hard one.",
    },
    foto: SITIO.retrato,
    whatsapp: SITIO.whatsapp.numero,
  },
  {
    nombre: "Diego Talamantes",
    iniciales: "DT",
    puesto: { es: "Asesor de ventas", en: "Sales advisor" },
    nota: {
      es: "Acompaña visitas en sitio y da seguimiento a cada expediente hasta la firma.",
      en: "Runs on-site visits and follows each file through to signing.",
    },
  },
  {
    nombre: "Omar Maldonado",
    iniciales: "OM",
    puesto: { es: "Asesor de ventas", en: "Sales advisor" },
    nota: {
      es: "Atiende a compradores que consultan desde fuera de Ensenada y coordina los recorridos en video.",
      en: "Works with buyers enquiring from outside Ensenada and coordinates the video walkthroughs.",
    },
  },
].map((persona) => esquemaPersona.parse(persona));

export const SECCION_EQUIPO = {
  titulo: { es: "Quién te va a atender", en: "Who you'll be dealing with" },
  texto: {
    es: "Somos tres y nos conocemos las propiedades una por una. Eso significa que puedes preguntar por un lote específico y recibir una respuesta específica, no un folleto.",
    en: "There are three of us and we know the properties one by one. That means you can ask about a specific lot and get a specific answer, not a brochure.",
  },
} as const;
