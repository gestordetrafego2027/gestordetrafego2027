/**
 * seed-books.cjs  (CommonJS — compatível com "type":"module" no package.json)
 * Cria os dois livros no Stripe (test mode) e sincroniza no Supabase.
 *
 * Uso: node scripts/seed-books.cjs
 */
'use strict'

const fs = require('fs')
const path = require('path')

// ── Carrega .env.local ────────────────────────────────────────
const envPath = path.resolve(__dirname, '../.env.local')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const idx = t.indexOf('=')
    if (idx === -1) continue
    const key = t.slice(0, idx).trim()
    const val = t.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
  console.log('✅ .env.local carregado')
}

// ── Dependências ──────────────────────────────────────────────
const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!STRIPE_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error('\n❌  Variáveis faltando:')
  if (!STRIPE_KEY) console.error('   STRIPE_SECRET_KEY')
  if (!SUPABASE_URL) console.error('   NEXT_PUBLIC_SUPABASE_URL')
  if (!SUPABASE_KEY) console.error('   SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Stripe SDK pode exportar como default ou direto
const StripeClass = Stripe.default || Stripe
const stripe = new StripeClass(STRIPE_KEY, { apiVersion: '2025-04-30.basil' })
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Catálogo ──────────────────────────────────────────────────
const BOOKS = [
  {
    slug: 'marketing-para-modelos',
    name: 'Marketing para Modelos',
    description: 'Da passarela física ao império digital. O guia honesto de quem quer ser modelo no Brasil de hoje — por Angelo Mazzutti. Ebook · 281 páginas · 12 capítulos.',
    unitAmount: 11700,
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
    description: 'Um manifesto sobre o colapso da identidade na era da atenção digital. Influenciadores, plataformas e a guerra silenciosa pela atenção — por Angelo Mazzutti.',
    unitAmount: 13700,
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

// ── Helpers ───────────────────────────────────────────────────
async function findOrCreateProduct(book) {
  let existing
  try {
    existing = await stripe.products.search({
      query: `metadata['slug']:'${book.slug}'`,
      limit: 1,
    })
  } catch (e) {
    console.warn('   ⚠️  search não suportada, listando...')
    existing = { data: [] }
  }

  if (existing.data.length > 0) {
    console.log(`   ↩  Produto existente: ${existing.data[0].id}`)
    return existing.data[0]
  }

  const product = await stripe.products.create({
    name: book.name,
    description: book.description,
    images: book.images,
    metadata: book.metadata,
    features: book.features.map((name) => ({ name })),
  })
  console.log(`   ✅ Produto criado: ${product.id}`)
  return product
}

async function findOrCreatePrice(product, book) {
  const existing = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 10,
  })

  const match = (existing.data || []).find(
    (p) => p.unit_amount === book.unitAmount && p.currency === book.currency,
  )
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

async function upsertSupabase(product, price, book) {
  // Categoria
  const { data: catRow, error: catErr } = await supabase
    .from('store_categories')
    .upsert({ slug: 'academy', name: 'Academy', description: 'Livros e cursos digitais' }, { onConflict: 'slug' })
    .select('id')
    .maybeSingle()

  if (catErr) console.warn('   ⚠️  Categoria:', catErr.message)
  const categoryId = catRow?.id

  // Produto
  const { data: prodRow, error: prodErr } = await supabase
    .from('store_products')
    .upsert({
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
    }, { onConflict: 'stripe_product_id' })
    .select('id')
    .maybeSingle()

  if (prodErr) {
    console.error('   ❌ Produto Supabase:', prodErr.message)
    return
  }

  const productId = prodRow?.id
  if (!productId) {
    console.error('   ❌ ID não retornou. Migration 0043 foi aplicada no projeto dev?')
    return
  }

  // Preço
  const { error: priceErr } = await supabase
    .from('store_prices')
    .upsert({
      product_id: productId,
      stripe_price_id: price.id,
      unit_amount: price.unit_amount,
      currency: price.currency,
      price_type: 'one_time',
      active: true,
      metadata: price.metadata || {},
      nickname: `${book.name} · R$ ${(book.unitAmount / 100).toFixed(2)}`,
    }, { onConflict: 'stripe_price_id' })

  if (priceErr) {
    console.error('   ❌ Preço Supabase:', priceErr.message)
    return
  }

  // Categoria pivot
  if (categoryId) {
    await supabase
      .from('store_product_categories')
      .upsert({ product_id: productId, category_id: categoryId }, { onConflict: 'product_id,category_id' })
  }

  console.log(`   ✅ Supabase OK: ${productId}`)
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const isTest = STRIPE_KEY.startsWith('sk_test_')
  console.log(`\n📚 Seed Books — ${isTest ? '🧪 TEST MODE' : '🔴 LIVE MODE'}\n`)

  const results = {}

  for (const book of BOOKS) {
    console.log(`\n── ${book.name} ──`)
    const product = await findOrCreateProduct(book)
    const price = await findOrCreatePrice(product, book)
    await upsertSupabase(product, price, book)
    results[book.slug] = { productId: product.id, priceId: price.id }
  }

  console.log('\n' + '═'.repeat(56))
  console.log('✅  SEED CONCLUÍDO')
  console.log('═'.repeat(56))
  console.log('\n📋 Adicione ao .env.local:\n')
  for (const [slug, ids] of Object.entries(results)) {
    const envKey = `STRIPE_PRICE_${slug.toUpperCase().replace(/-/g, '_')}`
    console.log(`${envKey}=${ids.priceId}`)
  }
  console.log('\n💡 Para testar webhooks localmente:')
  console.log('   stripe listen --forward-to localhost:3000/api/stripe/webhook')
  console.log('   # Copie o whsec_... e adicione como STRIPE_WEBHOOK_SECRET no .env.local\n')
}

main().catch((err) => {
  console.error('\n❌ Erro fatal:', err.message)
  process.exit(1)
})
