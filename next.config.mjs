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
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 2592000,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // 3. SEO e Consistência
  trailingSlash: true,

  // 4. Headers de segurança (todas as rotas) + cache de estáticos
  async headers() {
    // CSP em modo ENFORCE: bloqueia recursos fora da allowlist abaixo.
    // Allowlist derivada de auditoria do código (todos os domínios externos
    // realmente usados). Mantém 'unsafe-inline'/'unsafe-eval' nos scripts —
    // próxima evolução é trocar por nonces para fechar o vetor de XSS inline.
    // Domínios:
    //   Scripts/iframes: Google reCAPTCHA, GA/Tag Manager, Meta Pixel, Stripe, PostHog
    //   Embeds: YouTube, Vimeo, Google Maps
    //   Fontes: Google Fonts, Fontshare | Imagens: qualquer https
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://js.stripe.com https://app.posthog.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
      "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https: data: blob:",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://region1.google-analytics.com https://*.analytics.google.com https://*.facebook.com https://connect.facebook.net https://api.stripe.com https://app.posthog.com",
      // iframes/embeds legítimos: reCAPTCHA, Stripe, Meta, YouTube, Vimeo, Google Maps.
      "frame-src https://www.google.com https://recaptcha.google.com https://maps.google.com https://js.stripe.com https://hooks.stripe.com https://www.facebook.com https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join('; ');

    const securityHeaders = [
      // CSP em modo ENFORCE (bloqueia recursos fora da allowlist).
      { key: 'Content-Security-Policy', value: csp },
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

  async redirects() {
    return [
      // URL antiga do workshop → nova landing page
      {
        source: '/academy/workshop/direcao-criativa-producao-executiva',
        destination: '/academy/workshop-producao-direcao-01',
        permanent: true,
      },

      // ── WordPress legacy (URLs indexadas / linkadas externamente) ──
      { source: '/wp-content/:path*',  destination: '/',         permanent: true },
      { source: '/wp-admin/:path*',    destination: '/',         permanent: true },
      { source: '/wp-login.php',       destination: '/',         permanent: true },
      { source: '/feed',               destination: '/pt/blog/', permanent: true },
      { source: '/feed/',              destination: '/pt/blog/', permanent: true },
      { source: '/category/:path*',    destination: '/pt/blog/', permanent: true },
      { source: '/tag/:path*',         destination: '/pt/blog/', permanent: true },
      { source: '/author/:path*',      destination: '/pt/blog/', permanent: true },
      { source: '/page/:path*',        destination: '/pt/blog/', permanent: true },
      // /?p=NNN é tratado no middleware (Next não filtra query params aqui)
    ];
  },
};

export default withNextIntl(nextConfig);