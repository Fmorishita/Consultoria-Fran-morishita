/**
 * Formulario único del sitio.
 *
 * Unifica los dos formularios que hoy conviven en /contacto/: se toman los
 * campos del formulario de solicitud de sesión, con la misma obligatoriedad,
 * y sus mismas opciones de asunto. La diferencia es que aquí los encabezados
 * ("1. NEGOCIOS Y CORPORATIVO") son <optgroup> reales y no opciones
 * seleccionables, y las sangrías no se hacen con espacios.
 */

export const subjectGroups = [
  {
    label: 'Negocios y corporativo',
    options: [
      'Estructuración corporativa',
      'Gobierno corporativo',
      'Empresa familiar – profesionalización y sucesión',
      'Contratos comerciales',
    ],
  },
  {
    label: 'Laboral',
    options: ['Cumplimiento laboral', 'Estructura de contratación', 'Riesgo de o contingencia laboral activa'],
  },
  {
    label: 'Compliance',
    options: ['Programa de compliance', 'Prevención de lavado de dinero (PLD)', 'Protección de datos personales'],
  },
  {
    label: 'Proyectos',
    options: [
      'Proyecto de construcción o desarrollo inmobiliario',
      'Empresa internacional operando o entrando a México',
    ],
  },
  {
    label: 'Diagnóstico',
    options: ['Diagnóstico general – no sé por dónde empezar', 'Otro asunto'],
  },
] as const;

export const subjectValues = subjectGroups.flatMap((g) => g.options.map((o) => `${g.label}: ${o}`));

/** Texto de consentimiento, literal del formulario actual. */
export const consentText =
  'He leído el Aviso y Política de Privacidad de Treu Legal & Business y consiento el tratamiento de mis datos personales para atender esta solicitud.';

/** Mensaje de éxito, literal del que ya usa el sitio. */
export const successMessage =
  'Gracias por tu información, en breve recibirás respuesta de Treu Legal & Business';

export const formSource = 'https://treulegal.solutions/contacto/';
