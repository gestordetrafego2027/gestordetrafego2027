/**
 * sync-stripe-catalog.ts
 * Replica catálogo completo do Stripe Dashboard → Supabase (store_products + store_prices).
 * Uso: npm run sync:catalog
 * Requer: STRIPE_SECRET_KEY + SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL
 */

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// ── Helpers ──────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function stripeProductType(metadata: Record<string, string>): string {
  return metadata?.product_type ?? 'digital'
}

// ── Init ─────────────────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// ── Sync products ────────────────────────────────────────────
async function syncProducts() {
  console.log('🔄 Buscando produtos do Stripe...')
  const products: Stripe.Product[] = []
  for await (const product of stripe.products.list({ limit: 100 })) {
    products.push(product)
  }
  console.log(`   ${products.length} produtos encontrados.`)

  for (const p of products) {
    const slug = (p.metadata?.slug as string) || slugify(p.name)
    const row = {
      stripe_product_id: p.id,
      slug,
      name: p.name,
      description: p.description ?? null,
      product_type: stripeProductType(p.metadata as Record<string, string>),
      active: p.active,
      images: p.images ?? [],
      features: p.marketing_features?.map((f) => f.name) ?? [],
      metadata: p.metadata ?? {},
      seo_title: (p.metadata?.seo_title as string) ?? null,
      seo_description: (p.metadata?.seo_description as string) ?? null,
      og_image_url: (p.metadata?.og_image_url as string) ?? (p.images?.[0] ?? null),
      featured: p.metadata?.featured === 'true',
      stripe_synced_at: new Date().toISOString(),
    }

    const { error } = await supabase
      .from('store_products')
      .upsert(row, { onConflict: 'stripe_product_id' })

    if (error) {
      console.error(`   ❌ Produto ${p.id} (${p.name}):`, error.message)
    } else {
      console.log(`   ✅ ${p.active ? '🟢' : '⚫'} ${p.name} [${slug}]`)
    }
  }
}

// ── Sync prices ──────────────────────────────────────────────
async function syncPrices() {
  console.log('\n🔄 Buscando preços do Stripe...')
  const prices: Stripe.Price[] = []
  for await (const price of stripe.prices.list({ limit: 100, expand: ['data.product'] })) {
    prices.push(price)
  }
  console.log(`   ${prices.length} preços encontrados.`)

  for (const price of prices) {
    const stripeProductId =
      typeof price.product === 'string' ? price.product : (price.product as Stripe.Product).id

    // Busca o UUID interno do produto
    const { data: product } = await supabase
      .from('store_products')
      .select('id')
      .eq('stripe_product_id', stripeProductId)
      .maybeSingle()

    if (!product) {
      console.warn(`   ⚠️  Produto ${stripeProductId} não encontrado — preço ${price.id} ignorado`)
      continue
    }

    const row = {
      stripe_price_id: price.id,
      product_id: product.id,
      active: price.active,
      currency: price.currency,
      unit_amount: price.unit_amount ?? 0,
      unit_amount_decimal: price.unit_amount_decimal ?? null,
      price_type: price.type as 'one_time' | 'recurring',
      recurring_interval: price.recurring?.interval ?? null,
      recurring_interval_count: price.recurring?.interval_count ?? null,
      trial_period_days: price.recurring?.trial_period_days ?? null,
      nickname: price.nickname ?? null,
      metadata: price.metadata ?? {},
    }

    const { error } = await supabase
      .from('store_prices')
      .upsert(row, { onConflict: 'stripe_price_id' })

    if (error) {
      console.error(`   ❌ Preço ${price.id}:`, error.message)
    } else {
      const amount = ((price.unit_amount ?? 0) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: price.currency.toUpperCase(),
      })
      console.log(`   ✅ ${price.active ? '🟢' : '⚫'} ${price.id} — ${amount} (${price.type})`)
    }
  }
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  console.log('══════════════════════════════════════')
  console.log('  House Mazzutti — Sync Stripe Catalog')
  console.log('══════════════════════════════════════')

  const missing = ['STRIPE_SECRET_KEY', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
    .filter((k) => !process.env[k])
  if (missing.length) {
    console.error('❌ Variáveis ausentes:', missing.join(', '))
    process.exit(1)
  }

  await syncProducts()
  await syncPrices()

  console.log('\n✅ Sync concluído.')
}

main().catch((err) => {
  console.error('❌ Erro fatal:', err)
  process.exit(1)
})
