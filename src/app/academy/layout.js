import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

/**
 * Layout das rotas /academy (fora do segmento [locale]).
 *
 * O <Header> e o rodapé usam useTranslations(), que exige um
 * NextIntlClientProvider no entorno. Como /academy não passa pelo
 * [locale]/layout, fornecemos o provider aqui. O locale cai no padrão
 * (pt) via i18n/request.ts quando não há prefixo de idioma na URL.
 */
export default async function AcademyLayout({children}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
