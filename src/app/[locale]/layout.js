import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {globalJsonLd} from '@/lib/seo/jsonld';
import {pageMetadata, SITE_URL} from '@/lib/seo/metadata';
import {ConsentProvider} from '@/components/consent/ConsentProvider';
import CookieBanner from '@/components/consent/CookieBanner';
import Tracking from '@/components/analytics/Tracking';

// Gera estaticamente os 3 locales no build — páginas protegidas
// (academy, verify, obrigado) adicionam seu próprio force-dynamic.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({params}) {
  const {locale} = await params;
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({
      path: '',
      locale,
      title: 'House Mazzutti — Direção Criativa e Branding em São Paulo',
      description:
        'Casa criativa de São Paulo: branding, direção criativa e produção de imagem sob uma só direção. Sua imagem, com intenção.',
    }),
    // OG image padrão global — substituída por imagens específicas em cada rota
    openGraph: {
      images: [
        {
          url: `${SITE_URL}/images/og-default.webp`,
          width: 1200,
          height: 630,
          alt: 'House Mazzutti — Casa Criativa em São Paulo',
        },
      ],
    },
  };
}

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale)) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(globalJsonLd)}}
      />
      <ConsentProvider>
        {children}
        <Tracking />
        <CookieBanner />
      </ConsentProvider>
    </NextIntlClientProvider>
  );
}
