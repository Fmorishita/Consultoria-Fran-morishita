/**
 * HECHOS. Fuente única de verdad.
 *
 * Regla no negociable: todo dato de este archivo está publicado hoy en
 * treulegal.solutions. Cada entrada lleva el campo `source` con su URL de
 * origen. Si un dato no está en el sitio, no existe: no se agrega aquí.
 */

export const firm = {
  name: 'Treu Legal & Business',
  tagline: 'Legal Intelligence for Business',
  city: 'Ensenada',
  state: 'B.C.',
  source: 'https://treulegal.solutions/',
} as const;

export const contact = {
  email: 'info@treulegal.solutions',
  /** Tal como aparece en el sitio. */
  phoneDisplay: '+52 (646) 495-02-12',
  /** Formato internacional para el enlace tel:. El sitio actual omite el "+". */
  phoneHref: 'tel:+526464950212',
  /** Hoy sólo aparece en /strategic-legal-session/. */
  whatsappDisplay: '+52 646 185 8483',
  whatsappNumber: '5216461858483',
  linkedin: 'https://www.linkedin.com/company/treulegal',
  geo: { lat: 31.879155, lng: -116.60361 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=31.879155,-116.60361',
  sources: {
    email: 'https://treulegal.solutions/contacto/',
    phone: 'https://treulegal.solutions/contacto/',
    whatsapp: 'https://treulegal.solutions/strategic-legal-session/',
    linkedin: 'https://treulegal.solutions/',
  },
} as const;

/** Mensaje neutro prellenado de WhatsApp. Microcopy de interfaz. */
export const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  'Hola, escribo desde el sitio de Treu Legal & Business.',
)}`;

export const founder = {
  name: 'Marco Polo Hernández Alvarado',
  role: 'Founder & Principal Counsel',
  source: 'https://treulegal.solutions/la-firma/',
  /** Extractos literales de /la-firma/. */
  experience:
    'Cuenta con más de 18 años de experiencia en práctica jurídica de alto nivel, incluyendo 15 años de formación notarial corporativa en la Notaría Pública No. 1 de Ensenada, donde desarrolló expertise profundo en operaciones corporativas, negocios fiduciarios, inversión extranjera y estructuración de personas morales.',
  focus:
    'Su práctica se centra en asesoría jurídica corporativa para empresas, con especialización en estructuración corporativa, estrategia laboral empresarial y gestión de riesgos regulatorios en México.',
  crossBorder:
    'Asesora regularmente a empresas en los sectores de construcción e infraestructura, manufactura, desarrollo inmobiliario y operaciones internacionales, con particular enfoque en el entorno empresarial transfronterizo México–California, acompañando a las empresas en la construcción de estructuras jurídicas sólidas, la prevención de contingencias legales y la gestión estratégica de disputas',
  /** Credenciales como texto. Sin logos de instituciones (regla 6). */
  credentials: [
    { program: 'Licenciatura en Derecho', institution: 'Universidad Autónoma de Baja California' },
    { program: 'Gestión y Sucesión de Empresa Familiar', institution: 'ESADE Business and Law School' },
    { program: 'Propiedad Intelectual y Comercio Electrónico', institution: 'Organización Mundial de la Propiedad Intelectual' },
    { program: 'FinTech Law and Policy', institution: 'Duke University' },
    { program: 'Responsabilidad Social Empresarial', institution: 'Tecnológico de Monterrey' },
    { program: 'Protección de datos personales y cumplimiento antilavado para actividades vulnerables', institution: null },
  ],
} as const;

/** Datos de la conversión principal. Fuente: /strategic-legal-session/ */
export const session = {
  name: 'Strategic Legal Session',
  path: '/strategic-legal-session/',
  source: 'https://treulegal.solutions/strategic-legal-session/',
  duration: '60 minutos',
  format: 'Presencial en Ensenada, B.C.',
  formatNote: 'o videoconferencia para clientes fuera de la región o atención prioritaria',
  price: 'USD $150',
  priceNote: 'Acreditable al 100% si contrata el proyecto dentro de los 30 días siguientes',
  withWhom: founder.name,
  withWhomRole: 'Founder & Principal Counsel · Treu Legal & Business',
  response: 'Menos de 24 horas hábiles',
  capacityNote: 'Capacidad limitada · Respuesta en menos de 24 horas hábiles',
  /** Los cuatro datos que responden las dudas que frenan el clic. */
  keyFacts: [
    { label: 'Duración', value: '60 minutos' },
    { label: 'Con quién', value: 'El Principal Counsel del despacho' },
    { label: 'Honorario', value: 'USD $150, acreditable al proyecto' },
    { label: 'Respuesta', value: 'Menos de 24 horas hábiles' },
  ],
  /** Estructura 15/30/15. Es una secuencia real, por eso va numerada. */
  structure: [
    {
      step: 1,
      title: 'Diagnóstico inicial',
      minutes: '15 min',
      text: 'El Fundador escucha. El empresario describe su situación, su operación actual y el problema o duda que lo trae a la sesión. Sin interrupciones, sin juicios.',
    },
    {
      step: 2,
      title: 'Análisis aplicado',
      minutes: '30 min',
      text: 'Análisis jurídico directo sobre la situación descrita: dónde está la exposición, qué tiene solución inmediata, qué requiere estructura de mediano plazo y por qué.',
    },
    {
      step: 3,
      title: 'Recomendación y siguientes pasos',
      minutes: '15 min',
      text: 'Al menos una acción concreta recomendada para implementar de inmediato y una orientación sobre el camino más efectivo para la situación específica de la empresa.',
    },
  ],
} as const;

/** El sitio presenta estos cuatro pilares sin texto de apoyo. No se inventa. */
export const pillars = [
  'Consultoría jurídica corporativa',
  'Entendimiento operativo de negocios',
  'Prevención de riesgos legales',
  'Visión cross-border México-EE.UU.',
] as const;

export const pillarsSource = 'https://treulegal.solutions/';
