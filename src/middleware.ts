import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

// Rotas fora do i18n (sem prefixo de locale)
const NON_I18N = ['/crm', '/login', '/logout', '/api', '/academy', '/auth', '/downloads', '/lp', '/sitemap.xml', '/robots.txt'];

// Academy: páginas de CONTEÚDO sem locale → versão /pt canônica (consolidação SEO).
// Precisa ser tratado no middleware (não em next.config redirects): /academy está em
// NON_I18N e a rota não-i18n responde antes do redirect do next.config, devolvendo 404.
// Ficam de fora (continuam não-i18n): checkout, dashboard, certificado, curso,
// comunidade e os workshop-* (fluxo de pagamento).
const ACADEMY_I18N_REDIRECTS: Record<string, string> = {
  '/academy': '/pt/academy/',
  '/academy/marketing-para-modelos': '/pt/academy/marketing-para-modelos/',
  '/academy/preco-da-relevancia': '/pt/academy/preco-da-relevancia/',
  '/academy/casos-da-producao': '/pt/academy/casos-da-producao/',
  '/academy/inside-out': '/pt/academy/inside-out/',
};

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // WordPress legacy (WooCommerce): ?add-to-cart=NNN → loja
  if (searchParams.has('add-to-cart')) {
    return NextResponse.redirect(new URL('/pt/loja/', request.url), { status: 301 });
  }

  // WordPress legacy: ?p=NNN, ?page_id=NNN, ?cat=NNN, ?s=, ?replytocom=, ?attachment_id= → blog
  if (
    searchParams.has('p') ||
    searchParams.has('page_id') ||
    searchParams.has('cat') ||
    searchParams.has('s') ||
    searchParams.has('replytocom') ||
    searchParams.has('attachment_id')
  ) {
    const dest = searchParams.has('s')
      ? `/pt/blog/?q=${encodeURIComponent(searchParams.get('s') ?? '')}`
      : '/pt/blog/';
    return NextResponse.redirect(new URL(dest, request.url), { status: 301 });
  }

  // Academy: páginas de conteúdo sem locale → /pt/academy (consolidação SEO).
  // Roda ANTES do short-circuit NON_I18N para garantir o 301 (ver nota acima).
  const academyTarget = ACADEMY_I18N_REDIRECTS[pathname.replace(/\/+$/, '') || '/'];
  if (academyTarget) {
    return NextResponse.redirect(new URL(academyTarget, request.url), { status: 301 });
  }

  // Rotas sem i18n: só Supabase auth
  if (NON_I18N.some(prefix => pathname.startsWith(prefix))) {
    return await updateSession(request);
  }

  // next-intl: detecta locale, redireciona / → /pt/, etc.
  const intlResponse = intlMiddleware(request);

  // Redirect/rewrite do intl (ex: / → /pt/) — retorna direto
  if (intlResponse && intlResponse.status !== 200) return intlResponse;

  // Para respostas 200: roda o Supabase E preserva as headers de locale
  // que o next-intl definiu (x-next-intl-locale, etc.)
  const supabaseResponse = await updateSession(request);

  // Copia headers do intlResponse para o supabaseResponse
  // sem isso, requestLocale em request.ts nunca recebe o locale correto
  if (intlResponse) {
    intlResponse.headers.forEach((value, key) => {
      supabaseResponse.headers.set(key, value);
    });
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|downloads/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|woff|woff2|ttf|otf|ico|xml|txt|pdf|epub)$).*)',
  ],
};
