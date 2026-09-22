import { pendienteI18n } from "@/lib/pendiente";
import { SITIO } from "@contenido/sitio";
import type { I18n } from "@/lib/i18n";

type Bloque = { titulo: I18n; parrafos: I18n[]; lista?: I18n[] };

/**
 * Estructura conforme a la LFPDPPP. Los datos personales del responsable
 * están pendientes: mientras lo estén, esas líneas no se pintan.
 * El sitio NO debe salir a producción sin ellos.
 */
export const PRIVACIDAD = {
  antetitulo: { es: "Legal", en: "Legal" },
  titulo: { es: "Aviso de privacidad", en: "Privacy notice" },
  actualizacion: { es: "Última actualización", en: "Last updated" },
  fecha: "2026-09-21",
  bloques: [
    {
      titulo: { es: "1. Responsable del tratamiento", en: "1. Data controller" },
      parrafos: [
        {
          es: `${SITIO.nombre}, con domicilio en el que se indica a continuación, es responsable del uso y protección de sus datos personales, en términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).`,
          en: `${SITIO.nombre}, at the address indicated below, is responsible for the use and protection of your personal data under Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP).`,
        },
        pendienteI18n("razón social completa, domicilio fiscal y correo de contacto para el aviso de privacidad"),
      ],
    },
    {
      titulo: { es: "2. Datos personales que se recaban", en: "2. Personal data collected" },
      parrafos: [
        {
          es: "Para las finalidades de este aviso se recaban datos de identificación y contacto que usted proporciona de forma directa en los formularios del sitio o por WhatsApp.",
          en: "For the purposes of this notice, identification and contact data that you provide directly through the site's forms or via WhatsApp is collected.",
        },
      ],
      lista: [
        { es: "Nombre.", en: "Name." },
        { es: "Teléfono y/o número de WhatsApp.", en: "Phone and/or WhatsApp number." },
        { es: "Correo electrónico.", en: "Email address." },
        { es: "Interés declarado y mensaje que usted escriba.", en: "Stated interest and any message you write." },
        {
          es: "Datos de navegación y origen de campaña (cookies, parámetros UTM, identificadores de anuncios).",
          en: "Browsing and campaign-origin data (cookies, UTM parameters, ad identifiers).",
        },
      ],
    },
    {
      titulo: { es: "3. Finalidades primarias", en: "3. Primary purposes" },
      parrafos: [
        {
          es: "Sus datos se utilizan para atender su solicitud, darle información de propiedades o servicios, dar seguimiento comercial y, en su caso, formalizar una operación inmobiliaria.",
          en: "Your data is used to respond to your request, provide information about properties or services, follow up commercially and, where applicable, formalize a real estate transaction.",
        },
      ],
    },
    {
      titulo: { es: "4. Finalidades secundarias", en: "4. Secondary purposes" },
      parrafos: [
        {
          es: "De manera adicional, y siempre que usted no manifieste su oposición, sus datos pueden usarse para enviarle novedades de proyectos, invitaciones y contenido comercial. La negativa a estas finalidades no condiciona la atención de su solicitud.",
          en: "Additionally, and unless you object, your data may be used to send you project news, invitations and commercial content. Refusing these purposes does not affect the handling of your request.",
        },
      ],
    },
    {
      titulo: { es: "5. Transferencias", en: "5. Transfers" },
      parrafos: [
        {
          es: "Sus datos pueden compartirse con el desarrollador o propietario del inmueble de su interés para atender su solicitud, y se almacenan en proveedores tecnológicos (alojamiento, CRM y analítica) que actúan como encargados. No se realizan transferencias distintas a las señaladas sin su consentimiento.",
          en: "Your data may be shared with the developer or owner of the property you are interested in, in order to serve your request, and is stored with technology providers (hosting, CRM and analytics) acting as processors. No transfers other than those indicated are made without your consent.",
        },
      ],
    },
    {
      titulo: { es: "6. Derechos ARCO", en: "6. ARCO rights" },
      parrafos: [
        {
          es: "Usted puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos, así como revocar su consentimiento, enviando su solicitud al correo de contacto del responsable. La solicitud debe indicar su nombre, medio para comunicarle la respuesta, documento que acredite su identidad y la descripción clara de los datos sobre los que ejerce el derecho.",
          en: "You may access, rectify, cancel or object to the processing of your data, and revoke your consent, by sending a request to the controller's contact email. The request must state your name, a means to reply to you, identity documentation and a clear description of the data involved.",
        },
        pendienteI18n("correo electrónico oficial para solicitudes ARCO"),
      ],
    },
    {
      titulo: { es: "7. Cookies y tecnologías de rastreo", en: "7. Cookies and tracking technologies" },
      parrafos: [
        {
          es: "Este sitio usa cookies de primera parte para conservar el origen de campaña por 90 días, así como el píxel de Meta y Google Analytics para medir el desempeño de la publicidad. Puede deshabilitar las cookies desde su navegador; algunas funciones pueden verse afectadas.",
          en: "This site uses first-party cookies to keep campaign origin for 90 days, as well as the Meta pixel and Google Analytics to measure advertising performance. You can disable cookies in your browser; some features may be affected.",
        },
      ],
    },
    {
      titulo: { es: "8. Cambios al aviso", en: "8. Changes to this notice" },
      parrafos: [
        {
          es: "Cualquier modificación a este aviso se publicará en esta misma página, indicando la fecha de última actualización.",
          en: "Any change to this notice will be published on this same page, stating the last update date.",
        },
      ],
    },
  ] satisfies Bloque[],
  seo: {
    title: { es: "Aviso de privacidad", en: "Privacy notice" },
    description: {
      es: "Aviso de privacidad conforme a la LFPDPPP para el sitio de Fran Morishita.",
      en: "Privacy notice under Mexico's LFPDPPP for Fran Morishita's site.",
    },
  },
} as const;
