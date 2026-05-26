/**
 * seed-books.ts
 * Cria (ou atualiza) os dois livros do Academy no Stripe (test mode)
 * e sincroniza no Supabase (store_products + store_prices).
 *
 * Uso:
 *   npx tsx scripts/seed-books.ts
 *
 * Requer em .env.local:
 *   STRIPE_SECRET_KEY=sk_test_...
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// ── env ──────────────────────────────────────────────────────
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Variáveis de ambiente faltando. Verifique .env.local')
  process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' })
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// ── catálogo ──────────────────────────────────────────────────
const BOOKS = [
  {
    slug: 'marketing-para-modelos',
    name: 'Marketing para Modelos',
    description:
      'Da passarela física ao império digital. O guia honesto de quem quer ser modelo no Brasil de hoje — por Angelo Mazzutti. Ebook · 281 páginas · 12 capítulos.',
    unitAmount: 11700, // R$ 117,00
    currency: 'brl',
    images: ['https://housemazzutti.com/images/academy/marketing-para-modelos/cover.webp'],
    metadata: {
      product_type: 'digital',
      slug: 'marketing-para-modelos',
      seo_title: 'Marketing para Modelos · Ebook · House Mazzutti Academy Vol. 01',
      featured: 'true',
      category: 'academy',
    },
    features: [
      '281 páginas em 12 capítulos',
      'Guia completo de marketing para modelos',
      'Estratégias digitais para 2025/2026',
      '7 dias de garantia incondicional',
      'PDF + EPUB incluídos',
    ],
  },
  {
    slug: 'preco-da-relevancia',
    name: 'O Preço da Relevância',
    description:
      'Um manifesto sobre o colapso da identidade na era da atenção digital. Influenciadores, plataformas e a guerra silenciosa pela atenção — por Angelo Mazzutti. Ebook · Vol. 02.',
    unitAmount: 13700, // R$ 137,00
    currency: 'brl',
    images: ['https://housemazzutti.com/images/academy/preco-da-relevancia/cover.png'],
    metadata: {
      product_type: 'digital',
      slug: 'preco-da-relevancia',
      seo_title: 'O Preço da Relevância · Ebook · House Mazzutti Academy Vol. 02',
      featured: 'true',
      category: 'academy',
    },
    features: [
      'Manifesto sobre creator economy',
      'Análise do mercado de influenciadores no Brasil',
      'Estratégias de posicionamento e marca pessoal',
      '7 dias de garantia incondicional',
      'PDF + EPUB incluídos',
    ],
  },
]

// ── helpers ───────────────────────────────────────────────────
async function findOrCreateProduct(book: (typeof BOOKS)[0]) {
  // Verifica se já existe por slug na metadata
  const existing = await stripe.products.search({
    query: `metadata['slug']:'${book.slug}'`,
    limit: 1,
  })

  if (existing.data.length > 0) {
    console.log(`   ↩  Produto existente: ${existing.data[0].id} (${book.name})`)
    return existing.data[0]
  }

  const product = await stripe.products.create({
    name: book.name,
    description: book.description,
    images: book.images,
    metadata: book.metadata,
    features: book.features.map((name) => ({ name })),
  })
  console.log(`   ✅ Produto criado: ${product.id} (${book.name})`)
  return product
}

async function findOrCreatePrice(product: Stripe.Product, book: (typeof BOOKS)[0]) {
  // Verifica se já existe um preço ativo
  const existing = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 5,
    currency: book.currency,
  })

  const match = existing.data.find((p) => p.unit_amount === book.unitAmount)
  if (match) {
    console.log(`   ↩  Preço existente: ${match.id} (R$ ${book.unitAmount / 100})`)
    return match
  }

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: book.unitAmount,
    currency: book.currency,
    metadata: { product_type: 'digital' },
  })
  console.log(`   ✅ Preço criado: ${price.id} (R$ ${book.unitAmount / 100})`)
  return price
}

async function upsertSupabase(
  product: Stripe.Product,
  price: Stripe.Price,
  book: (typeof BOOKS)[0],
) {
  // Garante que a categoria "academy" existe
  const { data: catRow } = await supabase
    .from('store_categories')
    .upsert(
      { slug: 'academy', name: 'Academy', description: 'Livros e cursos digitais' },
      { onConflict: 'slug' },
    )
    .select('id')
    .maybeSingle()

  const categoryId = catRow?.id

  // Upsert produto
  const productRow = {
    stripe_product_id: product.id,
    slug: book.slug,
    name: book.name,
    description: book.description,
    product_type: 'digital',
    active: true,
    images: book.images,
    features: book.features,
    metadata: book.metadata,
    seo_title: book.metadata.seo_title,
    seo_description: book.description,
    og_image_url: book.images[0],
    featured: true,
    stripe_synced_at: new Date().toISOString(),
  }

  const { data: prodRow, error: prodErr } = await supabase
    .from('store_products')
    .upsert(productRow, { onConflict: 'stripe_product_id' })
    .select('id')
    .maybeSingle()

  if (prodErr) {
    console.error(`   ❌ Erro Supabase produto:`, prodErr.message)
    return
  }

  const productId = prodRow?.id
  if (!productId) {
    console.error('   ❌ Produto criado mas ID não retornou.')
    return
  }

  // Upsert preço
  const priceRow = {
    product_id: productId,
    stripe_price_id: price.id,
    unit_amount: price.unit_amount ?? book.unitAmount,
    currency: price.currency,
    price_type: 'one_time',
    active: true,
    metadata: price.metadata ?? {},
    nickname: `${book.name} · R$ ${(book.unitAmount / 100).toFixed(2)}`,
  }

  const { error: priceErr } = await supabase
    .from('store_prices')
    .upsert(priceRow, { onConflict: 'stripe_price_id' })

  if (priceErr) {
    console.error(`   ❌ Erro Supabase preço:`, priceErr.message)
    return
  }

  // Vincula à categoria academy
  if (categoryId) {
    await supabase
      .from('store_product_categories')
      .upsert(
        { product_id: productId, category_id: categoryId },
        { onConflict: 'product_id,category_id' },
      )
  }

  console.log(`   ✅ Supabase sincronizado: ${productId} (${book.slug})`)
}

// ── main ──────────────────────────────────────────────────────
async function main() {
  const isTest = STRIPE_SECRET_KEY.startsWith('sk_test_')
  console.log(`\n📚 Seed Books — modo: ${isTest ? '🧪 TEST' : '🔴 LIVE'}\n`)

  const priceIds: Record<string, string> = {}

  for (const book of BOOKS) {
    console.log(`\n── ${book.name} ──`)
    const product = await findOrCreateProduct(book)
    const price = await findOrCreatePrice(product, book)
    await upsertSupabase(product, price, book)
    priceIds[book.slug] = price.id
  }

  console.log('\n✅ Seed concluído!\n')
  console.log('📋 Price IDs para .env.local:')
  console.log('─'.repeat(50))
  for (const [slug, id] of Object.entries(priceIds)) {
    console.log(`STRIPE_PRICE_${slug.toUpperCase().replace(/-/g, '_')}=${id}`)
  }
  console.log('─'.repeat(50))
  console.log('\n💡 Cole esses IDs em .env.local e use-os no DirectCheckoutButton.\n')
}

main().catch((err) => {
  console.error('\n❌ Erro fatal:', err.message)
  process.exit(1)
})
