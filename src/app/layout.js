import "./globals.css";
import NonBlockingStyles from '@/app/components/NonBlockingStyles';

export const metadata = {
  metadataBase: new URL('https://housemazzutti.com'),
  title: {
    default: 'House Mazzutti — Direção Criativa e Branding em São Paulo',
    template: '%s',
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
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
