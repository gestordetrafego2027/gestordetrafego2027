// Helpers para construir Metadata canônica + hreflang em cada rota.
// Versão canônica do site: /pt. Outros idiomas adicionados aqui quando existirem.

import { brand } from '@/config/site'

export const SITE_URL = brand.url
export const DEFAULT_LOCALE = 'pt'

export function buildAlternates(path = '', locale = DEFAULT_LOCALE) {
  const clean = path.startsWith('/') ? path : `/${path}`
  const withSlash = clean.endsWith('/') || clean === '/' ? clean : `${clean}/`
  const seg = withSlash === '/' ? '' : withSlash
  return {
    canonical: `${SITE_URL}/${locale}${seg}` || `${SITE_URL}/${locale}/`,
    languages: {
      'pt-BR': `${SITE_URL}/pt${seg}` || `${SITE_URL}/pt/`,
      'x-default': `${SITE_URL}/pt${seg}` || `${SITE_URL}/pt/`,
    },
  }
}

export function pageMetadata({ path, locale = DEFAULT_LOCALE, title, description }) {
  const alternates = buildAlternates(path, locale)
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: 'website',
      siteName: brand.name,
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
