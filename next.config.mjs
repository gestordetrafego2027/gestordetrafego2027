import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 1. Standalone Output: Otimiza para deploy em containers (Coolify)
  output: 'standalone',

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // 2. Otimização de Imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/aida-public/**',
      },
    ],
    // Serve WebP / AVIF automaticamente para todos os navegadores modernos
    formats: ['image/avif', 'image/webp'],
    // Breakpoints de largura usados no srcset (px)
    deviceSizes: [640, 828, 1080, 1280, 1920],
    // Tamanhos para imagens com width/height fixos
    imageSizes: [64, 128, 256, 384, 512],
    // Cache de 30 dias para imagens otimizadas
    minimumCacheTTL: 2592000,
    // Desabilita varredura de domínios desnecessários
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // 3. SEO e Consistência
  trailingSlash: true,

  // 4. Headers de segurança (todas as rotas) + cache de estáticos
  async headers() {
    const securityHeaders = [
      // Força HTTPS por 2 anos, incluindo subdomínios.
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      // Impede que o site seja embutido em <iframe> de terceiros (clickjacking).
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      // Impede MIME-sniffing.
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // Não vaza a URL completa para outros sites.
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Desliga APIs sensíveis que o site não usa.
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()',
      },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ];

    return [
      {
        // Aplica os headers de segurança a todas as rotas.
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4|webm|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);