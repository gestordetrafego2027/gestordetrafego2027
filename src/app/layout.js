import "./globals.css";
import Script from 'next/script';
import NonBlockingStyles from '@/app/components/NonBlockingStyles';

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

        {/* Google tag (gtag.js) — GA4 G-R61KK25PBK + Google Ads AW-16938050518 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R61KK25PBK"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-R61KK25PBK');
gtag('config', 'AW-16938050518');`}
        </Script>
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
