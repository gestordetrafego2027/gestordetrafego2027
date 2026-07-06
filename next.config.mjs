import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Fix: next-intl v4 + Next.js 15 edge runtime re-export issue no dev server
  transpilePackages: ['next-intl'],

  // 1. Standalone Output: Otimiza para deploy em containers (Coolify)
  output: 'standalone',

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // 2. Otimização de Imagens
  images: {
    remotePatterns: [
      // Supabase Storage (prod + dev) — capas de cursos, avatares, produtos digitais
      { protocol: 'https', hostname: 'ohmnzalkfbhdivtttzsa.supabase.co', pathname: '/storage/v1/object/**' },
      { protocol: 'https', hostname: 'urfrxirqkkrosyrvvtdo.supabase.co', pathname: '/storage/v1/object/**' },
      // Próprio domínio — imagens armazenadas com URL absoluta no banco (legado dev/prod)
      { protocol: 'https', hostname: 'housemazzutti.com', pathname: '/images/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 82, 85, 90],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
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

      // ── Academy sem locale → /pt/academy ──
      // MOVIDO para src/middleware.ts: /academy está em NON_I18N e a rota não-i18n
      // responde ANTES dos redirects do next.config (devolvia 404). O middleware roda
      // primeiro e garante o 301. Não recolocar estes redirects aqui (são inertes).

      // ── Obras de portfólio: /pt/portfolio/[slug] → unidade correta (fix 404 SEO) ──
      // Produtora
      { source: '/:locale/portfolio/alletto-still',      destination: '/:locale/portfolio-produtora/alletto-still/',      permanent: true },
      { source: '/:locale/portfolio/barbara-porto',      destination: '/:locale/portfolio-produtora/barbara-porto/',      permanent: true },
      { source: '/:locale/portfolio/beatco',             destination: '/:locale/portfolio-produtora/beatco/',             permanent: true },
      { source: '/:locale/portfolio/beatco-2',           destination: '/:locale/portfolio-produtora/beatco-2/',           permanent: true },
      { source: '/:locale/portfolio/bia',                destination: '/:locale/portfolio-produtora/bia/',                permanent: true },
      { source: '/:locale/portfolio/camila-scarpa',      destination: '/:locale/portfolio-produtora/camila-scarpa/',      permanent: true },
      { source: '/:locale/portfolio/dumond',             destination: '/:locale/portfolio-produtora/dumond/',             permanent: true },
      { source: '/:locale/portfolio/elyah',              destination: '/:locale/portfolio-produtora/elyah/',              permanent: true },
      { source: '/:locale/portfolio/festiva',            destination: '/:locale/portfolio-produtora/festiva/',            permanent: true },
      { source: '/:locale/portfolio/idrissi',            destination: '/:locale/portfolio-produtora/idrissi/',            permanent: true },
      { source: '/:locale/portfolio/jequiti-ana-castela',destination: '/:locale/portfolio-produtora/jequiti-ana-castela/',permanent: true },
      { source: '/:locale/portfolio/jequiti-galisteu',   destination: '/:locale/portfolio-produtora/jequiti-galisteu/',   permanent: true },
      { source: '/:locale/portfolio/jequiti-larissa-manoela', destination: '/:locale/portfolio-produtora/jequiti-larissa-manoela/', permanent: true },
      { source: '/:locale/portfolio/jequiti-sense',      destination: '/:locale/portfolio-produtora/jequiti-sense/',      permanent: true },
      { source: '/:locale/portfolio/monica-costa-jewerly',destination: '/:locale/portfolio-produtora/monica-costa-jewerly/',permanent: true },
      { source: '/:locale/portfolio/natalia-beauty',     destination: '/:locale/portfolio-produtora/natalia-beauty/',     permanent: true },
      { source: '/:locale/portfolio/oceane',             destination: '/:locale/portfolio-produtora/oceane/',             permanent: true },
      { source: '/:locale/portfolio/poema-paris',        destination: '/:locale/portfolio-produtora/poema-paris/',        permanent: true },
      { source: '/:locale/portfolio/pontok',             destination: '/:locale/portfolio-produtora/pontok/',             permanent: true },
      { source: '/:locale/portfolio/pous',               destination: '/:locale/portfolio-produtora/pous/',               permanent: true },
      { source: '/:locale/portfolio/sense-hotel',        destination: '/:locale/portfolio-produtora/sense-hotel/',        permanent: true },
      { source: '/:locale/portfolio/signus',             destination: '/:locale/portfolio-produtora/signus/',             permanent: true },
      { source: '/:locale/portfolio/signus-fiamma',      destination: '/:locale/portfolio-produtora/signus-fiamma/',      permanent: true },
      { source: '/:locale/portfolio/signus-jean-pierre', destination: '/:locale/portfolio-produtora/signus-jean-pierre/', permanent: true },
      { source: '/:locale/portfolio/signus-lavorato',    destination: '/:locale/portfolio-produtora/signus-lavorato/',    permanent: true },
      { source: '/:locale/portfolio/signus-versolato01', destination: '/:locale/portfolio-produtora/signus-versolato01/', permanent: true },
      { source: '/:locale/portfolio/signus-versolato02', destination: '/:locale/portfolio-produtora/signus-versolato02/', permanent: true },
      { source: '/:locale/portfolio/signus-vertz',       destination: '/:locale/portfolio-produtora/signus-vertz/',       permanent: true },
      { source: '/:locale/portfolio/simony-marca',       destination: '/:locale/portfolio-produtora/simony-marca/',       permanent: true },
      { source: '/:locale/portfolio/splash-boutique',    destination: '/:locale/portfolio-produtora/splash-boutique/',    permanent: true },
      { source: '/:locale/portfolio/superbia',           destination: '/:locale/portfolio-produtora/superbia/',           permanent: true },
      { source: '/:locale/portfolio/tf',                 destination: '/:locale/portfolio-produtora/tf/',                 permanent: true },
      { source: '/:locale/portfolio/toli',               destination: '/:locale/portfolio-produtora/toli/',               permanent: true },
      { source: '/:locale/portfolio/unique-chic',        destination: '/:locale/portfolio-produtora/unique-chic/',        permanent: true },
      { source: '/:locale/portfolio/we-pink-01',         destination: '/:locale/portfolio-produtora/we-pink-01/',         permanent: true },
      { source: '/:locale/portfolio/we-pink-ze-felipe',  destination: '/:locale/portfolio-produtora/we-pink-ze-felipe/',  permanent: true },
      // Agência
      { source: '/:locale/portfolio/alletto',            destination: '/:locale/portfolio-agencia/alletto/',              permanent: true },
      { source: '/:locale/portfolio/dra-ariadne-barbosa',destination: '/:locale/portfolio-agencia/dra-ariadne-barbosa/',  permanent: true },
      { source: '/:locale/portfolio/fort',               destination: '/:locale/portfolio-agencia/fort/',                 permanent: true },
      { source: '/:locale/portfolio/house-mazzutti',     destination: '/:locale/portfolio-agencia/house-mazzutti/',       permanent: true },
      { source: '/:locale/portfolio/jucileia-soares',    destination: '/:locale/portfolio-agencia/jucileia-soares/',      permanent: true },
      { source: '/:locale/portfolio/knowhol',            destination: '/:locale/portfolio-agencia/knowhol/',              permanent: true },
      { source: '/:locale/portfolio/lbo',                destination: '/:locale/portfolio-agencia/lbo/',                  permanent: true },
      { source: '/:locale/portfolio/luiz-jr',            destination: '/:locale/portfolio-agencia/luiz-jr/',              permanent: true },
      { source: '/:locale/portfolio/mabdo',              destination: '/:locale/portfolio-agencia/mabdo/',                permanent: true },
      { source: '/:locale/portfolio/on-take',            destination: '/:locale/portfolio-agencia/on-take/',              permanent: true },
      { source: '/:locale/portfolio/samrat',             destination: '/:locale/portfolio-agencia/samrat/',               permanent: true },

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
      { source: '/wp-json/:path*',     destination: '/',         permanent: true },
      { source: '/comments/feed',      destination: '/pt/blog/', permanent: true },
      { source: '/comments/feed/',     destination: '/pt/blog/', permanent: true },
      // WooCommerce legacy: páginas de produto → loja
      { source: '/produto/:path*',     destination: '/pt/loja/', permanent: true },
      // Arquivos de data do WordPress (/AAAA/, /AAAA/MM/, /AAAA/MM/DD/...) → blog.
      // Nenhuma rota legítima começa com 4 dígitos, então o regex é seguro.
      { source: '/:year(\\d{4})/:path*', destination: '/pt/blog/', permanent: true },
      { source: '/:year(\\d{4})',        destination: '/pt/blog/', permanent: true },
      // /?p=NNN, /?add-to-cart=NNN etc. são tratados no middleware (query params)
    ];
  },
};

export default withNextIntl(nextConfig);