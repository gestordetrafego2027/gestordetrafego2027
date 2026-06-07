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
    // CSP em modo Report-Only: NÃO bloqueia nada, apenas reporta violações
    // no console do navegador. Serve para validar a allowlist com tráfego real
    // antes de promover para Content-Security-Policy (enforce). Domínios:
    //   Google (reCAPTCHA + GA/Tag Manager), Meta Pixel, Stripe, Supabase, Fonts.
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      // inline/eval necessários hoje (GA/fbq/reCAPTCHA/JSON-LD). Numa futura
      // versão enforce, trocar por nonces.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://*.facebook.com https://connect.facebook.net https://api.stripe.com",
      // iframes de terceiros legítimos: reCAPTCHA, Stripe, Meta.
      "frame-src https://www.google.com https://recaptcha.google.com https://js.stripe.com https://hooks.stripe.com https://www.facebook.com",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join('; ');

    const securityHeaders = [
      // CSP só observando (não quebra o site).
      { key: 'Content-Security-Policy-Report-Only', value: csp },
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