import type { I18n } from "@/lib/i18n";

/**
 * Microcopy de interfaz. El contenido comercial va en sus propios archivos.
 * Los CTA están agrupados por intención: cada intención tiene un solo rótulo
 * en todo el sitio, y las intenciones no se mezclan en la misma pantalla.
 */
export const UI = {
  nav: {
    giro: { es: "Bienes raíces", en: "Real estate" },
    inicio: { es: "Inicio", en: "Home" },
    proyectos: { es: "Propiedades", en: "Properties" },
    portafolio: { es: "Portafolio", en: "Portfolio" },
    desarrolladores: { es: "Desarrolladores", en: "Developers" },
    sobreMi: { es: "Sobre mí", en: "About" },
    contacto: { es: "Contacto", en: "Contact" },
    abrirMenu: { es: "Abrir menú", en: "Open menu" },
    cerrarMenu: { es: "Cerrar menú", en: "Close menu" },
    cambiarIdioma: { es: "English", en: "Español" },
  },
  cta: {
    /** Intención: abrir conversación directa. */
    whatsapp: { es: "Escríbeme por WhatsApp", en: "Message me on WhatsApp" },
    whatsappCorto: { es: "WhatsApp", en: "WhatsApp" },
    /** Intención: reservar tiempo en agenda. */
    agendarVisita: { es: "Agendar una visita", en: "Book a visit" },
    agendar: { es: "Agendar una llamada", en: "Book a call" },
    /** Intención: pedir material comercial. */
    solicitarInformacion: { es: "Solicitar la información completa", en: "Request the full information" },
    solicitarPrecios: { es: "Pedir lista de precios", en: "Ask for the price list" },
    /** Intención: navegar dentro del sitio. */
    conocerDesarrollo: { es: "Conocer el desarrollo", en: "Explore the development" },
    verProyecto: { es: "Ver la propiedad", en: "View the property" },
    verProyectos: { es: "Ver el inventario", en: "See the inventory" },
    busquedaPrivada: { es: "Dime qué buscas", en: "Tell me what you want" },
    verCaso: { es: "Ver el caso", en: "Read the case" },
    verPortafolio: { es: "Ver portafolio", en: "View portfolio" },
    volver: { es: "Volver", en: "Back" },
    verEnMapa: { es: "Abrir en Google Maps", en: "Open in Google Maps" },
    reproducir: { es: "Reproducir video", en: "Play video" },
  },
  secciones: {
    ubicacion: { es: "Dónde está", en: "Where it is" },
    amenidades: { es: "Lo que incluye el fraccionamiento", en: "What the community includes" },
    inventario: { es: "Disponibilidad", en: "Availability" },
    galeria: { es: "El lugar", en: "The place" },
    faq: { es: "Lo que suelen preguntarme", en: "What buyers usually ask me" },
    financiamiento: { es: "Formas de pago", en: "Payment terms" },
    precios: { es: "Precios y disponibilidad", en: "Pricing and availability" },
    vocesAntetitulo: { es: "Quienes ya compraron", en: "People who already bought" },
    voces: { es: "Lo que dicen los que ya firmaron", en: "What the people who signed have to say" },
    fichaTecnica: { es: "Ficha técnica", en: "Fact sheet" },
    resultados: { es: "Resultados", en: "Results" },
    reto: { es: "El reto", en: "The challenge" },
    sistema: { es: "El sistema que implementé", en: "The system I built" },
    otrosProyectos: { es: "Otras propiedades", en: "More properties" },
  },
  etiquetas: {
    desde: { es: "Desde", en: "From" },
    superficie: { es: "Superficie de lote", en: "Lot size" },
    tipo: { es: "Tipo", en: "Type" },
    estado: { es: "Estado", en: "Status" },
    desarrollador: { es: "Desarrollador", en: "Developer" },
    direccion: { es: "Dirección", en: "Address" },
    plazos: { es: "Plazos", en: "Terms" },
    rango: { es: "a", en: "to" },
    meses: { es: "meses", en: "months" },
    minutos: { es: "min", en: "min" },
    consultarPrecio: { es: "Precio a consultar", en: "Price on request" },
    sinProyectos: {
      es: "Estoy cerrando la siguiente tanda de representaciones. Déjame lo que buscas y te escribo antes de que salga al mercado.",
      en: "I'm closing the next round of representations. Tell me what you're after and I'll write to you before it reaches the market.",
    },
  },
  tabla: {
    tipo: { es: "Categoría de lote", en: "Lot category" },
    superficie: { es: "Superficie", en: "Size" },
    precio: { es: "Precio de lista", en: "List price" },
    enganche: { es: "Enganche", en: "Down payment" },
  },
  tipos: {
    lotes: { es: "Lotes", en: "Lots" },
    casas: { es: "Casas", en: "Homes" },
    departamentos: { es: "Departamentos", en: "Condos" },
    preventa: { es: "Preventa", en: "Pre-sale" },
    comercial: { es: "Comercial", en: "Commercial" },
  },
  estados: {
    preventa: { es: "Preventa", en: "Pre-sale" },
    "entrega-inmediata": { es: "Entrega inmediata", en: "Move-in ready" },
    "en-construccion": { es: "En construcción", en: "Under construction" },
  },
  calculadora: {
    titulo: { es: "Calcula tu mensualidad", en: "Estimate your monthly payment" },
    precio: { es: "Precio de la propiedad", en: "Property price" },
    enganche: { es: "Enganche", en: "Down payment" },
    plazo: { es: "Plazo", en: "Term" },
    meses: { es: "meses", en: "months" },
    engancheResultado: { es: "Enganche", en: "Down payment" },
    mensualidadResultado: { es: "Mensualidad estimada", en: "Estimated monthly payment" },
    financiar: { es: "Monto a financiar", en: "Amount financed" },
    sinIntereses: { es: "Sin intereses", en: "Interest free" },
    tasa: { es: "Tasa anual", en: "Annual rate" },
    plazosDisponibles: { es: "Plazos disponibles", en: "Available terms" },
    leyenda: {
      es: "Cálculo estimado con fines informativos. No constituye una oferta de crédito ni una cotización formal.",
      en: "Estimate for informational purposes only. It is not a credit offer or a formal quote.",
    },
    cta: { es: "Quiero esta mensualidad", en: "I want this payment plan" },
  },
  formulario: {
    nombre: { es: "Nombre", en: "Name" },
    telefono: { es: "Teléfono / WhatsApp", en: "Phone / WhatsApp" },
    email: { es: "Email", en: "Email" },
    interes: { es: "¿Qué estás buscando?", en: "What are you looking for?" },
    mensaje: { es: "Cuéntame un poco más", en: "Tell me a little more" },
    opcional: { es: "opcional", en: "optional" },
    enviar: { es: "Solicitar la información", en: "Request the information" },
    enviando: { es: "Enviando…", en: "Sending…" },
    consentimiento: {
      es: "Acepto el aviso de privacidad y que Fran Morishita me contacte por WhatsApp, teléfono o email.",
      en: "I accept the privacy notice and agree to be contacted by Fran Morishita via WhatsApp, phone or email.",
    },
    errorGeneral: {
      es: "No se pudo enviar. Escríbeme por WhatsApp y lo resolvemos al instante.",
      en: "It couldn't be sent. Message me on WhatsApp and we'll solve it right away.",
    },
    errores: {
      nombre: { es: "Escribe tu nombre.", en: "Please enter your name." },
      telefono: { es: "Escribe un teléfono de 10 dígitos.", en: "Enter a valid phone number." },
      email: { es: "Escribe un email válido.", en: "Enter a valid email." },
      consentimiento: { es: "Necesito tu consentimiento para contactarte.", en: "I need your consent to contact you." },
    },
    intereses: [
      { valor: "comprar", texto: { es: "Comprar para vivirla", en: "Buying to live in it" } },
      { valor: "invertir", texto: { es: "Invertir en tierra o preventa", en: "Investing in land or pre-sale" } },
      { valor: "segunda-residencia", texto: { es: "Segunda residencia o retiro", en: "Second home or retirement" } },
      { valor: "desarrollador", texto: { es: "Soy desarrollador", en: "I'm a developer" } },
    ],
  },
  pendiente: {
    etiqueta: { es: "Falta dato", en: "Missing data" },
    aviso: {
      es: "Solo visible en preview: datos que necesito de ti.",
      en: "Preview only: data still needed.",
    },
  },
  footer: {
    derechos: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    privacidad: { es: "Aviso de privacidad", en: "Privacy notice" },
    registro: { es: "Registro estatal de agente inmobiliario", en: "State real estate agent registry" },
    navegacion: { es: "Navegación", en: "Navigation" },
    contacto: { es: "Contacto", en: "Contact" },
  },
} satisfies Record<string, unknown>;

export type TextoUI = I18n;
