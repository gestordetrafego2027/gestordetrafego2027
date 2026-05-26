import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Toaster} from 'sonner';

// Todas as páginas sob [locale] são dinâmicas porque o middleware do
// Supabase (updateSession) lê/escreve cookies em cada request.
// Sem isso, o Next.js falha no "Generating static pages" com
// DYNAMIC_SERVER_USAGE durante o build.
export const dynamic = 'force-dynamic';

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale)) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </NextIntlClientProvider>
  );
}
