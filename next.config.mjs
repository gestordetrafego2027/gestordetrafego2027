import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// ──────────────────────────────────────────────────────────────
// Security Headers (Sprint 7)
// CSP configurado para:
//   - Stripe Checkout (js.stripe.com, hooks.stripe.com)
//   - Supabase (*.supabase.co)
//   - Google reCAPTCHA v3 (www.google.com, www.gstatic.com)
//   - PostHog analytics (app.posthog.com)
//   - Resend tracking pixel (opcional, omitido por padrão)
// ──────────────────────────────────────────────────────────────
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.google.com https://www.gstatic.com https://app.posthog.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.supabase.co https://lh3.googleusercontent.com https://*.stripe.com https://www.google.com https://www.gstatic.com",
  "connect-src 'self' https://*.supabase.co https://api.stripe.com https://hooks.stripe.com https://app.posthog.com https://api.resend.com https://api.nfe.io",
  "frame-src https://js.stripe.com https://hooks.stripe.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ')

const SECURITY_HEADERS = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security',value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy',  value: CSP },
]

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
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 2592000,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // 3. SEO e Consistência
  trailingSlash: true,

  // 4. Headers de Segurança + Cache de Estáticos
  async headers() {
    return [
      // Security headers em todas as rotas
      {
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
      // Cache longo para assets estáticos
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4|webm|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
