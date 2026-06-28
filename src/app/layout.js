import "./globals.css";
import Script from 'next/script';
import NonBlockingStyles from '@/app/components/NonBlockingStyles';
import SkipLink from '@/app/components/SkipLink';

export const metadata = {
  metadataBase: new URL('https://housemazzutti.com'),
  title: {
    default: 'House Mazzutti — Direção Criativa e Branding em São Paulo',
    template: '%s',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para domínios externos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload das fontes WOFF2 mais usadas (RocGrotesk 400 e 300) */}
        <link rel="preload" href="/fonts/fonnts.com-Roc_Grotesk_Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/fonnts.com-Roc_Grotesk_Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preload do poster do hero para LCP mais rápido na home */}
        <link rel="preload" href="/images/hero-poster.webp" as="image" />

        {/* Material Symbols — carregado de forma não-bloqueante via Client Component */}
        <NonBlockingStyles />

        {/* Google tag (gtag.js) — GA4 + Google Ads com Consent Mode v2 (LGPD/GDPR) */}
        {/* Consent Mode v2: defaults negados até o usuário decidir no banner LGPD.       */}
        {/* Deve estar ANTES de qualquer gtag('config',...) para que o consentimento       */}
        {/* seja respeitado desde o primeiro hit — requisito do Google para Smart Bidding. */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R61KK25PBK"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`gtag('js', new Date());
gtag('config', 'G-R61KK25PBK', { send_page_view: false });
gtag('config', 'AW-16938050518');`}
        </Script>
      </head>
      <body className="font-body">
        <SkipLink />
        <main id="conteudo">
          {children}
        </main>
      </body>
    </html>
  );
}
