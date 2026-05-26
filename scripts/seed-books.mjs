/**
 * seed-books.mjs  (ESM com imports estáticos)
 * Uso: node scripts/seed-books.mjs
 */
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── .env.local ────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    const k = t.slice(0, i).trim()
    const v = t.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[k]) process.env[k] = v
  }
}

const KEY = process.env.STRIPE_SECRET_KEY
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SRK = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!KEY || !URL || !SRK) {
  console.error('❌ Env faltando: STRIPE_SECRET_KEY / NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const stripe = new Stripe(KEY, { apiVersion: '2025-04-30.basil' })
const sb = createClient(URL, SRK)

const BOOKS = [
  {
    slug: 'marketing-para-modelos',
    name: 'Marketing para Modelos',
    description: 'Ebook · 281 páginas · 12 capítulos — por Angelo Mazzutti.',
    unitAmount: 11700,
    currency: 'brl',
    images: ['https://housemazzutti.com/images/academy/marketing-para-modelos/cover.webp'],
    metadata: { product_type: 'digital', slug: 'marketing-para-modelos', featured: 'true', category: 'academy' },
    features: ['281 páginas em 12 capítulos', 'Estratégias digitais 2025/2026', '7 dias de garantia', 'PDF + EPUB incluídos'],
  },
  {
    slug: 'preco-da-relevancia',
    name: 'O Preço da Relevância',
    description: 'Manifesto sobre creator economy — por Angelo Mazzutti. Vol. 02.',
    unitAmount: 13700,
    currency: 'brl',
    images: ['https://housemazzutti.com/images/academy/preco-da-relevancia/cover.png'],
    metadata: { product_type: 'digital', slug: 'preco-da-relevancia', featured: 'true', category: 'academy' },
    features: ['Creator economy no Brasil', 'Posicionamento e marca pessoal', '7 dias de garantia', 'PDF + EPUB incluídos'],
  },
]

async function run() {
  console.log(`\n📚 Seed Books — ${KEY.startsWith('sk_test_') ? '🧪 TEST' : '🔴 LIVE'}\n`)
  const out = {}

  for (const b of BOOKS) {
    console.log(`── ${b.name}`)

    // Produto Stripe
    let prod
    try {
      const r = await stripe.products.search({ query: `metadata['slug']:'${b.slug}'`, limit: 1 })
      prod = r.data[0]
    } catch { /* search não disponível */ }

    if (!prod) {
      prod = await stripe.products.create({
        name: b.name, description: b.description,
        images: b.images, metadata: b.metadata,
        marketing_features: b.features.map(n => ({ name: n })),
      })
      console.log(`   ✅ Produto: ${prod.id}`)
    } else {
      console.log(`   ↩  Produto existente: ${prod.id}`)
    }

    // Preço Stripe
    const prices = await stripe.prices.list({ product: prod.id, active: true, limit: 10 })
    let price = prices.data.find(p => p.unit_amount === b.unitAmount && p.currency === b.currency)
    if (!price) {
      price = await stripe.prices.create({
        product: prod.id, unit_amount: b.unitAmount,
        currency: b.currency, metadata: { product_type: 'digital' },
      })
      console.log(`   ✅ Preço: ${price.id}`)
    } else {
      console.log(`   ↩  Preço existente: ${price.id}`)
    }

    // Supabase
    const { data: cat } = await sb.from('store_categories')
      .upsert({ slug: 'academy', name: 'Academy' }, { onConflict: 'slug' })
      .select('id').maybeSingle()

    const { data: pRow, error: pErr } = await sb.from('store_products')
      .upsert({
        stripe_product_id: prod.id, slug: b.slug, name: b.name,
        description: b.description, product_type: 'digital', active: true,
        images: b.images, features: b.features, metadata: b.metadata,
        seo_title: b.name, og_image_url: b.images[0], featured: true,
        stripe_synced_at: new Date().toISOString(),
      }, { onConflict: 'stripe_product_id' })
      .select('id').maybeSingle()

    if (pErr) { console.error(`   ❌ produto SB: ${pErr.message}`); continue }

    await sb.from('store_prices').upsert({
      product_id: pRow.id, stripe_price_id: price.id,
      unit_amount: price.unit_amount, currency: price.currency,
      price_type: 'one_time', active: true, metadata: {},
      nickname: `${b.name} · R$ ${(b.unitAmount / 100).toFixed(2)}`,
    }, { onConflict: 'stripe_price_id' })

    if (cat?.id) {
      await sb.from('store_product_categories')
        .upsert({ product_id: pRow.id, category_id: cat.id }, { onConflict: 'product_id,category_id' })
    }

    console.log(`   ✅ Supabase: ${pRow.id}`)
    out[b.slug] = price.id
  }

  console.log('\n═══════════════════════════════════')
  console.log('✅  SEED OK — adicione ao .env.local:')
  console.log('═══════════════════════════════════')
  for (const [slug, id] of Object.entries(out)) {
    console.log(`STRIPE_PRICE_${slug.toUpperCase().replace(/-/g,'_')}=${id}`)
  }
  console.log('\n🔑 Para webhooks locais:')
  console.log('  stripe listen --forward-to localhost:3000/api/stripe/webhook')
  console.log('  # Cole o whsec_... como STRIPE_WEBHOOK_SECRET no .env.local\n')
}

run().catch(e => { console.error('❌', e.message); process.exit(1) })
