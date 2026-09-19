import type { Config } from 'tailwindcss';

/**
 * Sistema de diseño de Treu Legal & Business.
 * Concepto rector: arquitectura jurídica. Retícula precisa, trazos finos
 * de construcción y cotas en el azul de marca.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 6 tokens con rol definido. Parten del azul del logo y del gris del isotipo.
        ink: '#0B1B2B', // texto principal — 15.9:1 sobre blanco
        blue: {
          DEFAULT: '#0F4C81', // azul del wordmark — 8.9:1 sobre blanco
          deep: '#0A3558', // estados activos y fondos densos
        },
        slate: '#5A6B7B', // texto secundario (gris del isotipo) — 5.5:1 sobre blanco
        line: '#D7DDE4', // trazos de construcción y separadores
        paper: '#F6F8FA', // fondo alterno
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Escala definida. Cuerpo mínimo 16px en móvil, 18px en artículos.
        'step--1': ['0.875rem', { lineHeight: '1.5' }],
        'step-0': ['1rem', { lineHeight: '1.65' }],
        'step-1': ['1.125rem', { lineHeight: '1.6' }],
        'step-2': ['clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)', { lineHeight: '1.4' }],
        'step-3': ['clamp(1.5rem, 1.25rem + 1.2vw, 2rem)', { lineHeight: '1.28' }],
        'step-4': ['clamp(1.875rem, 1.4rem + 2.2vw, 2.75rem)', { lineHeight: '1.16' }],
        'step-5': ['clamp(2.25rem, 1.5rem + 3.6vw, 4rem)', { lineHeight: '1.05' }],
      },
      maxWidth: {
        prose: '68ch', // menos de 75 caracteres por línea
        shell: '76rem',
      },
      spacing: {
        gutter: '1rem', // 16px de margen lateral en móvil
        section: 'clamp(3.5rem, 8vw, 7rem)',
      },
      borderRadius: { none: '0', sm: '2px', DEFAULT: '3px' },
      transitionTimingFunction: { plan: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        // Único momento de movimiento orquestado: el trazado del plano.
        'draw-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'rule-grow': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        'draw-in': 'draw-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rule-grow': 'rule-grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
