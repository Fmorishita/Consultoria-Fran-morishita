import localFont from 'next/font/local';

/**
 * Tipografías autohospedadas, subconjunto latino (cubre acentos y ñ).
 *
 * Archivo: grotesca de rasgos geométricos y caja alta ancha. Dialoga con el
 * wordmark de TREU, que es geométrico y de tracking amplio.
 * Source Serif 4: serif de pantalla para la lectura larga de los Insights y
 * de los textos legales. Dos familias, no más.
 */
export const archivo = localFont({
  src: [{ path: './fonts/archivo-latin.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-archivo',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const sourceSerif = localFont({
  src: [
    { path: './fonts/source-serif-4-latin.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/source-serif-4-latin-italic.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});
