/**
 * Estructura del sitio: rutas, áreas, industrias y Legal Products.
 *
 * Los `blurb` son los extractos literales de las tarjetas de la home actual.
 * Cada grupo declara su `source`. Las correcciones de erratas están
 * registradas en docs/CAMBIOS-DE-CONTENIDO.md.
 */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const practiceAreas = [
  {
    slug: 'corporate-business-law',
    name: 'Corporate & Business Law',
    blurb: 'Estructuración corporativa y contratos comerciales',
    icon: 'building2',
    source: 'https://treulegal.solutions/areas-de-practica/corporate-business-law/',
  },
  {
    slug: 'compliance-risk-prevention',
    name: 'Compliance & Risk Prevention',
    blurb: 'Prevención de riesgos regulatorios y corporativos',
    icon: 'shieldCheck',
    source: 'https://treulegal.solutions/areas-de-practica/compliance-risk-prevention/',
  },
  {
    slug: 'labor-employment',
    name: 'Labor & Employment Strategy',
    blurb: 'Cumplimiento laboral y estrategias empresariales',
    icon: 'users',
    source: 'https://treulegal.solutions/areas-de-practica/labor-employment/',
  },
  {
    slug: 'corporate-governance-family-business',
    name: 'Corporate Governance & Family Business',
    blurb: 'Gobierno corporativo e institucionalización de empresas familiares',
    icon: 'network',
    source: 'https://treulegal.solutions/areas-de-practica/corporate-governance-family-business/',
  },
  {
    slug: 'cross-border-advisory',
    name: 'Cross-Border Advisory',
    blurb: 'Asesoría para empresas que operan entre México y Estados Unidos',
    icon: 'arrowLeftRight',
    source: 'https://treulegal.solutions/areas-de-practica/cross-border-advisory/',
  },
  {
    // La home actual llama a esta área "Litigation Strategy & Corporate Disputes".
    // Se unifica con el nombre de su página y del menú. Ver CAMBIOS-DE-CONTENIDO.
    slug: 'strategic-litigation-dispute-resolution',
    name: 'Strategic Litigation & Dispute Resolution',
    blurb: 'Estrategias de resolución de controversias',
    icon: 'split',
    source: 'https://treulegal.solutions/areas-de-practica/strategic-litigation-dispute-resolution/',
  },
] as const;

export const industries = [
  {
    slug: 'desarrollo-inmobiliario',
    name: 'Desarrollo Inmobiliario',
    blurb:
      'Estructuración legal de proyectos, due diligence inmobiliario y contratos para desarrollos inmobiliarios, con acompañamiento en operaciones de financiamiento',
    icon: 'landPlot',
    source: 'https://treulegal.solutions/industrias/desarrollo-inmobiliario/',
  },
  {
    // La home actual escribe "Construción". Errata corregida.
    slug: 'construccion-infraestructura',
    name: 'Construcción e Infraestructura',
    blurb:
      'Optimización y creación de sistemas profesionales de contratación a nivel de obra alineados a prácticas internacionales, contratos de subcontratación profesionales y gestión de riesgos contractuales',
    icon: 'hardHat',
    source: 'https://treulegal.solutions/industrias/construccion-infraestructura/',
  },
  {
    slug: 'comercio-servicios-manufactura',
    name: 'Comercio, Servicios y Manufactura',
    blurb:
      'Cumplimiento laboral a través de la profesionalización de sistemas de contratación laboral, contratos comerciales complejos, cumplimiento normativo para la prevención de riesgos legales y estructura corporativa',
    icon: 'factory',
    source: 'https://treulegal.solutions/industrias/comercio-servicios-manufactura/',
  },
  {
    slug: 'empresas-binacionales',
    name: 'Empresas Binacionales',
    blurb:
      'Asesoría legal para emprendedores y empresas extranjeras que requieren operar en México con estructuras sólidas y simplificando su proceso de constitución y consolidación',
    icon: 'globe',
    source: 'https://treulegal.solutions/industrias/empresas-binacionales/',
  },
] as const;

export const legalProducts = [
  {
    slug: 'business-launch-package',
    name: 'Business Launch Package',
    blurb:
      'Una empresa legalmente constituida con la estructura correcta para su etapa, acuerdos de socios que previenen conflictos y contratos base para iniciar operaciones',
    icon: 'milestone',
    source: 'https://treulegal.solutions/legal-products/business-launch-package/',
  },
  {
    slug: 'corporate-health-check',
    name: 'Corporate Health Check™',
    blurb:
      'Auditoría legal preventiva diseñada para empresas que requieren un diagnóstico general del estado de su arquitectura jurídica más esencial',
    icon: 'activity',
    source: 'https://treulegal.solutions/legal-products/corporate-health-check/',
  },
  {
    slug: 'hr-legal-system',
    name: 'HR Legal System™',
    blurb:
      'Sistema integral de arquitectura laboral empresarial completa, documentada y conforme, para eliminar exposición a contingencias laborales',
    icon: 'idCard',
    source: 'https://treulegal.solutions/legal-products/hr-legal-system/',
  },
  {
    slug: 'contract-architecture',
    name: 'Contract Architecture™',
    blurb:
      'Diseño de la arquitectura contractual de la empresa. Un set de contratos diseñados para su modelo de negocio, su industria y sus riesgos particulares',
    icon: 'ruler',
    source: 'https://treulegal.solutions/legal-products/contract-architecture/',
  },
  {
    slug: 'corporate-risk-structure-system',
    name: 'Corporate Risk & Structure System (CRSS)™',
    blurb:
      'Diagnosticamos, diseñamos y trazamos el plan de implementación para adoptar la estructura jurídica que necesita su empresa para operar con certeza, proteger socios y escalar sin que lo legal se convierta en obstáculo',
    icon: 'layers',
    source: 'https://treulegal.solutions/legal-products/corporate-risk-structure-system/',
  },
  {
    // La home actual escribe "operara". Errata corregida.
    slug: 'cross-border-entry-package',
    name: 'Cross-Border Entry Package',
    blurb:
      'Estructura legal mínima necesaria para operar en México con certeza jurídica desde el primer día: entidad constituida, estructura laboral inicial, marco contractual básico y brief regulatorio del sector con normativa RNIE',
    icon: 'doorOpen',
    source: 'https://treulegal.solutions/legal-products/cross-border-entry-package/',
  },
] as const;

/** Navegación principal: 6 elementos más el botón principal. */
export const mainNav: NavItem[] = [
  { label: 'La Firma', href: '/la-firma/' },
  {
    label: 'Áreas de práctica',
    href: '/areas-de-practica/',
    children: practiceAreas.map((a) => ({ label: a.name, href: `/areas-de-practica/${a.slug}/` })),
  },
  {
    label: 'Industrias',
    href: '/industrias/',
    children: industries.map((i) => ({ label: i.name, href: `/industrias/${i.slug}/` })),
  },
  { label: 'Legal Products', href: '/legal-products/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contacto', href: '/contacto/' },
];

/** Guías y checklists publicadas bajo /insights/. */
export const guides = [
  { slug: 'guia-de-estructuracion-legal-para-empresas-en-crecimiento-2026' },
  { slug: 'guia-arquitectura-contractual-inmobiliaria-mexico' },
  { slug: 'labor-compliance-checklist-para-empresas-mexicanas-2026' },
  { slug: 'guia-certeza-legal-nearshoring-para-empresas-mexicanas' },
  { slug: 'guia-gobierno-familiar-organos-decision-empresa' },
] as const;

/** Páginas en inglés existentes. No se traduce nada nuevo sin aprobación. */
export const enPages = [
  { slug: 'corporate-law-mexico' },
  { slug: 'labor-lawyer-mexico' },
  { slug: 'construction-lawyer-mexico' },
  { slug: 'doing-business-in-mexico-lawyer' },
  { slug: 'legal-intelligence-for-business-corporate-lawyer-in-mexico-english' },
] as const;

/** Landings SEO en español. */
export const esLandings = [
  { slug: 'corporate-lawyer-baja-california' },
  { slug: 'corporate-compliance-mexico' },
] as const;

/**
 * Relaciones entre área, industria y Legal Product.
 * Sólo las que el sitio ya hace explícitas o se desprenden de sus textos.
 */
export const relations: Record<
  string,
  { areas?: string[]; industries?: string[]; products?: string[] }
> = {
  'corporate-business-law': {
    industries: ['desarrollo-inmobiliario', 'comercio-servicios-manufactura'],
    products: ['business-launch-package', 'contract-architecture', 'corporate-risk-structure-system'],
  },
  'compliance-risk-prevention': {
    industries: ['comercio-servicios-manufactura'],
    products: ['corporate-health-check'],
  },
  'labor-employment': {
    industries: ['construccion-infraestructura', 'comercio-servicios-manufactura'],
    products: ['hr-legal-system'],
  },
  'corporate-governance-family-business': {
    products: ['corporate-risk-structure-system'],
  },
  'cross-border-advisory': {
    industries: ['empresas-binacionales'],
    products: ['cross-border-entry-package'],
  },
  'strategic-litigation-dispute-resolution': {
    industries: ['construccion-infraestructura'],
    products: ['contract-architecture'],
  },
  'desarrollo-inmobiliario': {
    areas: ['corporate-business-law'],
    products: ['contract-architecture'],
  },
  'construccion-infraestructura': {
    areas: ['labor-employment', 'strategic-litigation-dispute-resolution'],
    products: ['contract-architecture', 'hr-legal-system'],
  },
  'comercio-servicios-manufactura': {
    areas: ['labor-employment', 'compliance-risk-prevention'],
    products: ['hr-legal-system', 'corporate-health-check'],
  },
  'empresas-binacionales': {
    areas: ['cross-border-advisory'],
    products: ['cross-border-entry-package'],
  },
};
