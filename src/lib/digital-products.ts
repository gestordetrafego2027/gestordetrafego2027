/**
 * Catálogo de produtos digitais.
 *
 * Os webhooks (Stripe checkout-completed e Asaas payment-confirmed) cruzam o
 * slug do produto com este map e chamam `createDownloadUrl()` para gerar uma
 * signed URL temporária do bucket privado `digital-products` no Supabase Storage.
 *
 * Os PDFs NÃO ficam mais em `public/` — o bucket é privado e o link expira em
 * SIGNED_URL_TTL_SECONDS. O campo `downloadUrl` é apenas fallback legado.
 */

import type { SupabaseClient } from '@supabase/supabase-js'

/** Bucket privado no Supabase Storage onde os PDFs ficam (não-público). */
export const DIGITAL_PRODUCTS_BUCKET = 'digital-products'

/** Validade da signed URL de download — casa com o texto "7 dias" do email. */
export const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7

export interface DigitalProduct {
  slug: string
  name: string
  /** Stripe Price ID canônico (fonte de verdade do checkout — independe de env/Coolify). */
  stripePriceId?: string
  /** Caminho do PDF dentro do bucket privado (fonte primária de entrega). */
  storagePath?: string
  /** Bucket do Storage; default DIGITAL_PRODUCTS_BUCKET. */
  storageBucket?: string
  /** URL pública legada — usada só como fallback se a signed URL falhar. */
  downloadUrl: string
  /** Texto de validade (apenas display no email). */
  expiresIn?: string
  /** Rótulo do volume para o cabeçalho do email (ex.: "Vol. 02"). */
  volumeLabel?: string
  /** Linha de "o que esperar" no email (ex.: "107 páginas em 10 capítulos"). */
  detail?: string
}

export const DIGITAL_PRODUCTS: Record<string, DigitalProduct> = {
  'inside-out': {
    slug: 'inside-out',
    name: 'Inside Out · Masterclass On-demand',
    // Stripe Price ID — preencher após criar o produto no painel Stripe (prod)
    stripePriceId: process.env.STRIPE_PRICE_ID_INSIDE_OUT ?? '',
    // Vídeos hospedados no Vimeo (privados). Após a compra o aluno recebe
    // um link de acesso ao Showcase privado — não um download de arquivo.
    // storagePath fica vazio; a entrega é feita via downloadUrl (link Vimeo).
    downloadUrl:
      process.env.VIMEO_SHOWCASE_INSIDE_OUT ??
      'https://vimeo.com/showcase/inside-out-hmzt', // substituir pelo link real
    expiresIn: 'vitalício',
    detail: 'Masterclass completa em vídeo — assista quantas vezes quiser, no seu ritmo.',
  },
  'marketing-para-modelos': {
    slug: 'marketing-para-modelos',
    name: 'Marketing para Modelos · Vol. 01',
    stripePriceId: 'price_1TcmbpLcrEu1967n5O39YUoF', // R$ 49,00 · prod_Uc0dKAMVbuf28H
    storagePath: 'marketing-para-modelos/vol-01.pdf',
    downloadUrl:
      process.env.DOWNLOAD_URL_MARKETING_PARA_MODELOS ??
      '/downloads/marketing-para-modelos-hmzt-vol-01.pdf',
    expiresIn: '7 dias',
    volumeLabel: 'Vol. 01',
    detail: '94 páginas de leitura editorial — da passarela física ao império digital.',
  },
  'preco-da-relevancia': {
    slug: 'preco-da-relevancia',
    name: 'O Preço da Relevância · Vol. 02',
    stripePriceId: 'price_1TfpoYLcrEu1967nFjwWSZzJ', // R$ 46,00 · prod_Uc0jsoMdxr4oaj
    storagePath: 'preco-da-relevancia/vol-02.pdf',
    downloadUrl:
      process.env.DOWNLOAD_URL_PRECO_DA_RELEVANCIA ??
      '/downloads/preco-da-relevancia-hmzt-vol-02.pdf',
    expiresIn: '7 dias',
    volumeLabel: 'Vol. 02',
    detail: '107 páginas em 10 capítulos. Leitura sugerida em ordem — cada parte se apoia na anterior.',
  },
  'casos-da-producao': {
    slug: 'casos-da-producao',
    name: 'Inside Out · Vol. 03',
    stripePriceId: process.env.STRIPE_PRICE_ID_CASOS_DA_PRODUCAO ?? 'price_1TgZGILcrEu1967nxsNG52fO',
    storagePath: 'casos-da-producao/vol-03.pdf',
    downloadUrl:
      process.env.DOWNLOAD_URL_CASOS_DA_PRODUCAO ??
      '/downloads/casos-da-producao-hmzt-vol-03.pdf',
    expiresIn: '7 dias',
    volumeLabel: 'Vol. 03',
    detail: '7 bastidores reais — do conceito à entrega com contexto de mercado e direção criativa.',
  },
}

/**
 * Aliases de slug — tolera variações que existem nos produtos do Stripe.
 * Ex.: um produto Stripe usa `o-preco-da-relevancia` (com "o-"), mas o catálogo
 * é chaveado por `preco-da-relevancia`. Sem isto, a entrega do Vol. 02 no cartão
 * não resolveria o produto e o e-mail não sairia.
 */
const SLUG_ALIASES: Record<string, string> = {
  'o-preco-da-relevancia': 'preco-da-relevancia',
  'marketing-para-modelos-vol-01': 'marketing-para-modelos',
  'inside-out-masterclass': 'inside-out',
}

export function resolveDigitalProduct(slug: string | null | undefined): DigitalProduct | null {
  if (!slug) return null
  const key = SLUG_ALIASES[slug] ?? slug
  return DIGITAL_PRODUCTS[key] ?? null
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

/**
 * Resolve a URL de download que vai no email de entrega.
 *
 * Fonte primária: signed URL temporária do bucket privado (Storage) — o arquivo
 * não é público nem adivinhável, e o link expira em SIGNED_URL_TTL_SECONDS.
 * Fallback: URL pública legada (só se não houver storagePath ou a assinatura falhar).
 *
 * Recebe um SupabaseClient já criado (service client nos webhooks) para não
 * acoplar este módulo à criação de cliente.
 */
export async function createDownloadUrl(
  product: DigitalProduct,
  supabase: SupabaseClient,
): Promise<string> {
  if (product.storagePath) {
    const bucket = product.storageBucket ?? DIGITAL_PRODUCTS_BUCKET
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(product.storagePath, SIGNED_URL_TTL_SECONDS)
    if (!error && data?.signedUrl) return data.signedUrl
  }
  return absoluteDownloadUrl(product.downloadUrl)
}
