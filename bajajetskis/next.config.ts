import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Las fotos del inventario viven en /public/assets. Cuando lleguen las
    // fotografías reales, basta con sustituir los archivos con el mismo nombre.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
