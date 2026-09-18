/**
 * Correcciones de contenido aplicadas al texto del sitio actual.
 * Cada entrada queda registrada en docs/CAMBIOS-DE-CONTENIDO.md.
 *
 * Sólo se permiten: erratas evidentes y unificación de un nombre propio con
 * el que ya usa su propia página. Nunca reescritura de estilo.
 */
export const textCorrections: { from: string; to: string; reason: string }[] = [
  { from: 'Construción', to: 'Construcción', reason: 'Errata ortográfica.' },
  { from: 'CONSTRUCIÓN', to: 'CONSTRUCCIÓN', reason: 'Errata ortográfica.' },
  { from: 'para operara en México', to: 'para operar en México', reason: 'Errata de conjugación.' },
  { from: 'necesaria para operara', to: 'necesaria para operar', reason: 'Errata de conjugación.' },
  { from: 'para empresas, son especialización', to: 'para empresas, con especialización', reason: 'Errata: "son" por "con".' },
  { from: 'aliados estratégicos de las empresas..', to: 'aliados estratégicos de las empresas.', reason: 'Punto duplicado.' },
  { from: 'Quienes somos', to: 'Quiénes somos', reason: 'Falta la tilde del interrogativo indirecto.' },
  {
    from: 'Litigation Strategy & Corporate Disputes',
    to: 'Strategic Litigation & Dispute Resolution',
    reason: 'Unificación con el nombre de su propia página y del menú.',
  },
];

/** Residuos de plantilla y medios de demostración que deben desaparecer. */
export const blockedImageHosts = ['s0.wp.com', 's1.wp.com', 's2.wp.com', 'dotcompatterns.wordpress.com'];

/** Textos de la plantilla StartAce que no son contenido del despacho. */
export const blockedText = [
  'Brought to you by the creators of',
  'Este sitio usa cookies. Al utilizar este sitio web',
];

export function applyCorrections(text: string): string {
  let out = text;
  for (const c of textCorrections) out = out.split(c.from).join(c.to);
  return out;
}

/** Tokens que conservan su forma al deshacer las MAYÚSCULAS sostenidas. */
const KEEP = new Set([
  'TREU', 'CRSS', 'PLD', 'RNIE', 'HR', 'IVA', 'IMSS', 'SAT', 'UABC', 'ESADE', 'OMPI',
  'EE.UU.', 'EEUU', 'USD', 'B.C.', 'LFT', 'NOM', 'SA', 'CV', 'ONU', 'PYME', 'PYMES',
  'FinTech', 'I', 'II', 'III', 'IV', 'V', 'VI',
]);

/**
 * Convierte un título en MAYÚSCULAS sostenidas a formato normal.
 * Preserva siglas y nombres propios conocidos. Si el texto no está
 * completamente en mayúsculas, se devuelve intacto.
 */
export function unshout(text: string): string {
  const letters = text.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '');
  if (!letters || letters !== letters.toUpperCase()) return text;

  return text
    .split(/(\s+)/)
    .map((word) => {
      if (/^\s+$/.test(word)) return word;
      const bare = word.replace(/[^\wÁÉÍÓÚÜÑ.&]/gi, '');
      if (KEEP.has(bare) || KEEP.has(word)) return word;
      // Une palabras cortas funcionales en minúscula.
      return word.charAt(0) + word.slice(1).toLowerCase();
    })
    .join('')
    .replace(/\b(Y|E|O|U|De|Del|La|El|Los|Las|En|Con|Para|Por|A|Al|Que|Su|Sus)\b/g, (m, _g, off) =>
      off === 0 ? m : m.toLowerCase(),
    );
}
