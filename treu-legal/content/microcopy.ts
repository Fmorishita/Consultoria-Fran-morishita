/**
 * MICROCOPY. Todo el texto nuevo de interfaz vive aquí para revisarlo en bloque.
 *
 * Regla: sólo microcopy neutro de interfaz. Nada de afirmaciones sobre la
 * firma, sus resultados o sus clientes. Trato de usted, como el resto del sitio.
 */
export const ui = {
  // Navegación
  menu: 'Menú',
  closeMenu: 'Cerrar menú',
  openMenu: 'Abrir menú',
  skipToContent: 'Saltar al contenido',
  mainNav: 'Navegación principal',
  breadcrumb: 'Ruta de navegación',
  backToTop: 'Volver arriba',

  // Acciones
  session: 'Strategic Legal Session',
  sessionShort: 'Sesión',
  call: 'Llamar',
  whatsapp: 'WhatsApp',
  writeWhatsapp: 'Escribir por WhatsApp',
  email: 'Correo',
  sendRequest: 'Enviar solicitud',
  sending: 'Enviando…',
  readArticle: 'Leer artículo',
  viewAll: 'Ver todos',
  viewMore: 'Ver más',
  seeDetail: 'Ver detalle',
  copyLink: 'Copiar enlace',
  linkCopied: 'Enlace copiado',
  share: 'Compartir',

  // Secciones
  practiceAreas: 'Áreas de práctica',
  industries: 'Industrias',
  legalProducts: 'Legal Products',
  insights: 'Insights',
  theFirm: 'La Firma',
  contact: 'Contacto',
  related: 'Relacionados',
  relatedArticles: 'Artículos relacionados',
  onThisPage: 'En esta página',
  credentials: 'Formación',
  categories: 'Categorías',
  allCategories: 'Todas',
  searchPlaceholder: 'Buscar en Insights',
  search: 'Buscar',
  noResults: 'No hay artículos que coincidan con esa búsqueda.',
  readingTime: 'min de lectura',
  publishedOn: 'Publicado el',
  page: 'Página',
  previous: 'Anterior',
  next: 'Siguiente',

  // Formulario
  formTitle: 'Solicitud de sesión',
  fieldName: 'Nombre completo',
  fieldCompany: 'Empresa',
  fieldRole: 'Cargo',
  fieldEmail: 'Correo electrónico',
  fieldPhone: 'Teléfono',
  fieldSubject: 'Área principal del asunto',
  fieldSubjectPlaceholder: 'Seleccionar área',
  fieldMessage: 'Breve descripción del asunto',
  required: 'obligatorio',
  optional: 'opcional',
  errorRequired: 'Este campo es obligatorio.',
  errorEmail: 'Escriba un correo electrónico válido.',
  errorPhone: 'Escriba un teléfono válido.',
  errorConsent: 'Es necesario aceptar el tratamiento de datos para enviar la solicitud.',
  errorSubject: 'Seleccione el área principal del asunto.',
  formErrorTitle: 'No fue posible enviar la solicitud',
  formErrorHelp: 'Su información no se ha perdido. Puede reintentar o escribirnos por estos medios:',

  // Estados
  notFoundTitle: 'Esta página no existe',
  notFoundText: 'Puede buscar en Insights o ir directamente a la sesión.',
  goHome: 'Ir al inicio',

  // Idioma
  languageEn: 'English',
  languageEs: 'Español',
  switchToEn: 'Ver esta página en inglés',
  switchToEs: 'Ver esta página en español',
} as const;

/** Etiquetas de interfaz en inglés, sólo para las páginas de /en/. */
export const uiEn = {
  menu: 'Menu',
  closeMenu: 'Close menu',
  skipToContent: 'Skip to content',
  session: 'Strategic Legal Session',
  call: 'Call',
  whatsapp: 'WhatsApp',
  readArticle: 'Read article',
  viewAll: 'View all',
  contact: 'Contact',
  onThisPage: 'On this page',
  languageEs: 'Español',
} as const;
