/**
 * seed-studio-services.ts
 * Cria produtos + preços de Book e Ensaio no Stripe e sincroniza no Supabase.
 * Uso: npx tsx scripts/seed-studio-services.ts
 * Requer: STRIPE_SECRET_KEY + SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL
 */

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://housemazzutti.com'

const PRODUCTS = [
  // ── ACADEMY — EBOOKS ──────────────────────────────────────
  {
    slug: 'marketing-para-modelos',
    name: 'Marketing para Modelos — Vol. 01',
    description: 'Ebook · 281 páginas · Estratégias de marketing para modelos e influenciadores',
    priceCents: 2790,
    coverImage: `https://housemazzutti.com/images/academy/marketing-para-modelos/capa.webp`,
    service: 'academy',
    tier: 'ebook',
  },
  {
    slug: 'o-preco-da-relevancia',
    name: 'O Preço da Relevância',
    description: 'Ebook · Posicionamento e valor de mercado para criativos',
    priceCents: 13700,
    coverImage: `https://housemazzutti.com/images/academy/preco-da-relevancia/capa.webp`,
    service: 'academy',
    tier: 'ebook',
  },
  // ── BOOK ──────────────────────────────────────────────────
  {
    slug: 'book-essencial',
    name: 'Book Profissional — Essencial',
    description: '02 looks estratégicos · 10 fotos tratadas · Direção de pose e expressão · Estúdio próprio em São Paulo',
    priceCents: 270000,
    coverImage: `${SITE_URL}/images/studio/banners/banner-1.webp`,
    service: 'book',
    tier: 'essencial',
  },
  {
    slug: 'book-estrategico',
    name: 'Book Profissional — Estratégico',
    description: '04 looks estratégicos · 25 fotos tratadas · Moodboard personalizado · 01 video reel de apresentação',
    priceCents: 350000,
    coverImage: `${SITE_URL}/images/studio/banners/banner-2.webp`,
    service: 'book',
    tier: 'estrategico',
  },
  {
    slug: 'book-premium',
    name: 'Book Profissional — Premium',
    description: 'Looks ilimitados · 40 fotos high-end · Direção de imagem completa · 03 video reels de conteúdo',
    priceCents: 610000,
    coverImage: `${SITE_URL}/images/studio/banners/banner-3.webp`,
    service: 'book',
    tier: 'premium',
  },
  // ── ENSAIO ────────────────────────────────────────────────
  {
    slug: 'ensaio-autoral',
    name: 'Ensaio Pessoal — Autoral',
    description: 'Conceito e moodboard · 02 looks de cena · 20 fotos tratadas · Direção de presença',
    priceCents: 370000,
    coverImage: `${SITE_URL}/images/studio/marjorie-rossi/capa.webp`,
    service: 'ensaio',
    tier: 'essencial',
  },
  {
    slug: 'ensaio-editorial',
    name: 'Ensaio Pessoal — Editorial',
    description: 'Conceito editorial · 04 looks de cena · 35 fotos tratadas · Beauty artist e styling · 01 video reel autoral',
    priceCents: 670000,
    coverImage: `${SITE_URL}/images/studio/marina-machado/capa.webp`,
    service: 'ensaio',
    tier: 'estrategico',
  },
  {
    slug: 'ensaio-signature',
    name: 'Ensaio Pessoal — Signature',
    description: 'Direção criativa completa · Looks ilimitados · 60 fotos high-end · Equipe full · 03 video reels e fashion film',
    priceCents: 1200000,
    coverImage: `${SITE_URL}/images/studio/mileide-mihaile/capa.webp`,
    service: 'ensaio',
    tier: 'premium',
  },
]

async function run() {
  console.log('══════════════════════════════════════════')
  console.log('  House Mazzutti — Seed Studio Services')
  console.log('══════════════════════════════════════════\n')

  for (const p of PRODUCTS) {
    console.log(`▶ ${p.name}`)

    // 1. Cria produto no Stripe (upsert por metadata.slug)
    const existing = await stripe.products.search({ query: `metadata['slug']:'${p.slug}'`, limit: 1 })
    let stripeProduct: Stripe.Product

    if (existing.data.length > 0) {
      stripeProduct = await stripe.products.update(existing.data[0].id, {
        name: p.name,
        description: p.description,
        images: [p.coverImage],
        metadata: { slug: p.slug, product_type: 'service', service: p.service, tier: p.tier },
      })
      console.log(`   ♻  Produto atualizado: ${stripeProduct.id}`)
    } else {
      stripeProduct = await stripe.products.create({
        name: p.name,
        description: p.description,
        images: [p.coverImage],
        metadata: { slug: p.slug, product_type: 'service', service: p.service, tier: p.tier },
      })
      console.log(`   ✅ Produto criado: ${stripeProduct.id}`)
    }

    // 2. Cria preço (sempre cria novo se não existir para este produto)
    const existingPrices = await stripe.prices.list({ product: stripeProduct.id, active: true, limit: 5 })
    let stripePrice: Stripe.Price

    const exactPrice = existingPrices.data.find(pr => pr.unit_amount === p.priceCents)
    if (exactPrice) {
      stripePrice = exactPrice
      console.log(`   ♻  Preço já existe: ${stripePrice.id} (R$ ${p.priceCents / 100})`)
    } else {
      // Arquiva preços antigos
      for (const old of existingPrices.data) {
        await stripe.prices.update(old.id, { active: false })
      }
      stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: p.priceCents,
        currency: 'brl',
        metadata: { slug: p.slug },
      })
      console.log(`   ✅ Preço criado: ${stripePrice.id} (R$ ${p.priceCents / 100})`)
    }

    // 3. Upsert no Supabase store_products
    const { data: spRow, error: spErr } = await supabase
      .from('store_products')
      .upsert({
        stripe_product_id: stripeProduct.id,
        slug: p.slug,
        name: p.name,
        description: p.description,
        product_type: 'service',
        active: true,
        images: [p.coverImage],
        features: p.description.split(' · '),
        metadata: { service: p.service, tier: p.tier },
        og_image_url: p.coverImage,
        stripe_synced_at: new Date().toISOString(),
      }, { onConflict: 'stripe_product_id' })
      .select('id')
      .single()

    if (spErr) { console.error(`   ❌ Supabase store_products:`, spErr.message); continue }
    console.log(`   ✅ store_products: ${spRow.id}`)

    // 4. Upsert no Supabase store_prices
    const { error: prErr } = await supabase
      .from('store_prices')
      .upsert({
        stripe_price_id: stripePrice.id,
        product_id: spRow.id,
        active: true,
        currency: 'brl',
        unit_amount: p.priceCents,
        price_type: 'one_time',
        metadata: { slug: p.slug },
      }, { onConflict: 'stripe_price_id' })

    if (prErr) { console.error(`   ❌ Supabase store_prices:`, prErr.message); continue }
    console.log(`   ✅ store_prices inserido\n`)
  }

  console.log('══════════════════════════════════════════')
  console.log('  ✅ Seed concluído!')
  console.log('══════════════════════════════════════════')
}

run().catch(err => { console.error('❌ Erro fatal:', err); process.exit(1) })
