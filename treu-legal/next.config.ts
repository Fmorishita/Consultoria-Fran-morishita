import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'treulegal.solutions' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'i1.wp.com' },
      { protocol: 'https', hostname: 'i2.wp.com' },
    ],
  },
  /**
   * Redirecciones 301. El sitio nuevo conserva todas las rutas existentes;
   * estas entradas sólo normalizan las variantes con las que WordPress
   * también responde hoy. Registradas en docs/REDIRECCIONES.md.
   */
  async redirects() {
    return [
      // `trailingSlash: true` ya normaliza /en -> /en/, así que no hace falta
      // una redirección propia (y añadirla provocaba un bucle).
      // Enlace del footer actual que responde 404.
      {
        source: '/colaboracion-profesional',
        destination: '/la-firma/',
        permanent: true,
      },
      // Rutas de WordPress que no tienen equivalente en el sitio nuevo.
      { source: '/wp-admin/:path*', destination: '/', permanent: false },
      { source: '/author/:slug/feed', destination: '/feed/', permanent: true },
      { source: '/category/:slug/feed', destination: '/feed/', permanent: true },
      { source: '/comments/feed', destination: '/feed/', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Activos propios con huella estable: caché larga e inmutable.
        source: '/:path(brand|img|fonts)/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
