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
    canonical: `${SITE_URL}/${locale}${seg}`,
    languages: {
      'pt-BR': `${SITE_URL}/pt${seg}`,
      'en': `${SITE_URL}/en${seg}`,
      'es': `${SITE_URL}/es${seg}`,
      'x-default': `${SITE_URL}/pt${seg}`,
    },
  }
}

export function pageMetadata({ path, locale = DEFAULT_LOCALE, title, description, image }) {
  const alternates = buildAlternates(path, locale)
  const ogImage = image
    ? [{ url: `${SITE_URL}${image.src}`, width: image.width ?? 1200, height: image.height ?? 630, alt: image.alt ?? title }]
    : [{ url: `${SITE_URL}/images/og-default.webp`, width: 1200, height: 630, alt: title }]
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
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage,
    },
  }
}
