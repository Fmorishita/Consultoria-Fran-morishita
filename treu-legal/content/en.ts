/**
 * Páginas en inglés existentes bajo /en/.
 *
 * No se traduce nada nuevo: sólo se estructura el contenido que ya existe.
 * Las etiquetas del menú y el hub se construyen únicamente con este material.
 * La traducción completa del sitio está anotada en docs/PENDIENTES-CLIENTE.md.
 */
export const enPages = [
  {
    slug: 'corporate-law-mexico',
    source: 'en--corporate-law-mexico',
    title: 'Corporate Lawyer in Mexico',
    /** Equivalente en español, si existe, para el hreflang y el selector. */
    esEquivalent: '/areas-de-practica/corporate-business-law/',
  },
  {
    slug: 'labor-lawyer-mexico',
    source: 'en--labor-lawyer-mexico',
    title: 'Labor Lawyer in Mexico for Companies',
    esEquivalent: '/areas-de-practica/labor-employment/',
  },
  {
    slug: 'construction-lawyer-mexico',
    source: 'en--construction-lawyer-mexico',
    title: 'Construction Lawyer in Mexico',
    esEquivalent: '/industrias/construccion-infraestructura/',
  },
  {
    slug: 'doing-business-in-mexico-lawyer',
    source: 'en--doing-business-in-mexico-lawyer',
    title: 'Doing Business in Mexico: Legal Advisory for Foreign Companies',
    esEquivalent: '/industrias/empresas-binacionales/',
  },
  {
    slug: 'legal-intelligence-for-business-corporate-lawyer-in-mexico-english',
    source: 'en--legal-intelligence-for-business-corporate-lawyer-in-mexico-english',
    title: 'Legal Intelligence for Business',
    esEquivalent: '/',
  },
] as const;

export type EnPage = (typeof enPages)[number];
