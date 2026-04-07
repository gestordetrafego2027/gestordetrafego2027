/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 1. Standalone Output: Otimiza para deploy em containers (Coolify)
  output: 'standalone',

  // 2. Otimização de Imagens Externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/aida-public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // 3. SEO e Consistência
  trailingSlash: true,
};

export default nextConfig;