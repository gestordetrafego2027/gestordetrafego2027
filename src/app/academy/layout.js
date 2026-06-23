import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {brand} from '@/config/site';

const SITE = brand.url;

// Canonical aponta para /pt/academy/ — versão com locale é a canônica indexável.
// As páginas de workshop (/academy/workshop-*) sobrescrevem via export metadata próprio.
export const metadata = {
  alternates: {
    canonical: `${SITE}/pt/academy/`,
    languages: {
      'pt-BR': `${SITE}/pt/academy/`,
      'x-default': `${SITE}/pt/academy/`,
    },
  },
};

export default async function AcademyLayout({children}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
