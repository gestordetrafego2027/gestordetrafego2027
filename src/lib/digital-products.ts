/**
 * Catálogo de produtos digitais com URL de download.
 *
 * O webhook checkout-completed olha o `metadata.slug` do produto Stripe
 * e cruza com este map pra resolver o download. Quando o Supabase Storage
 * estiver disponível, trocar `downloadUrl` por uma função que gera signed URL.
 *
 * IMPORTANTE: enquanto o download for via `/downloads/` estático no `public/`,
 * mantenha os nomes de arquivo NÃO-ÓBVIOS (UUID, hash) pra não vazar.
 */

export interface DigitalProduct {
  slug: string
  name: string
  /** URL absoluta ou relativa pro arquivo. */
  downloadUrl: string
  /** Texto de validade (apenas display no email). */
  expiresIn?: string
}

export const DIGITAL_PRODUCTS: Record<string, DigitalProduct> = {
  'marketing-para-modelos': {
    slug: 'marketing-para-modelos',
    name: 'Marketing para Modelos · Vol. 01',
    downloadUrl:
      process.env.DOWNLOAD_URL_MARKETING_PARA_MODELOS ??
      '/downloads/marketing-para-modelos-hmzt-vol-01.pdf',
    expiresIn: '7 dias',
  },
  'preco-da-relevancia': {
    slug: 'preco-da-relevancia',
    name: 'O Preço da Relevância · Vol. 02',
    downloadUrl:
      process.env.DOWNLOAD_URL_PRECO_DA_RELEVANCIA ??
      '/downloads/preco-da-relevancia-hmzt-vol-02.pdf',
    expiresIn: '7 dias',
  },
}

export function resolveDigitalProduct(slug: string | null | undefined): DigitalProduct | null {
  if (!slug) return null
  return DIGITAL_PRODUCTS[slug] ?? null
}

/**
 * Resolve download URL absoluta a partir de uma URL relativa.
 * Usa NEXT_PUBLIC_SITE_URL como base.
 */
export function absoluteDownloadUrl(url: string): string {
  if (url.startsWith('http')) return url
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://housemazzutti.com'
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`
}
