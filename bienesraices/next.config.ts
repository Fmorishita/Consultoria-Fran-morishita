import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lpdqksuvccsocntditik.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // La raíz manda a español conservando los UTMs del anuncio.
      { source: "/", destination: "/es", permanent: false },
      // La sección se llamaba /proyectos antes de enfocar el sitio en propiedades.
      { source: "/:locale(es|en)/proyectos", destination: "/:locale/propiedades", permanent: true },
      { source: "/:locale(es|en)/proyectos/:slug", destination: "/:locale/propiedades/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
