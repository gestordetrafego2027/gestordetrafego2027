#!/usr/bin/env tsx
/**
 * go-live.ts — Checklist automatizado de pré-ativação da loja
 *
 * Uso:
 *   npx tsx scripts/go-live.ts
 *
 * Verifica todas as condições necessárias antes de trocar
 * FEATURE_STORE_ENABLED=false → true no Coolify.
 */

import { createClient } from '@supabase/supabase-js'

const OK   = '\x1b[32m✓\x1b[0m'
const FAIL = '\x1b[31m✗\x1b[0m'
const WARN = '\x1b[33m⚠\x1b[0m'
const SKIP = '\x1b[90m—\x1b[0m'

type CheckResult = { ok: boolean; warn?: boolean; msg: string }

async function check(label: string, fn: () => Promise<CheckResult>): Promise<boolean> {
  try {
    const r = await fn()
    const icon = r.ok ? OK : r.warn ? WARN : FAIL
    console.log(`  ${icon}  ${label}: ${r.msg}`)
    return r.ok || !!r.warn
  } catch (err: any) {
    console.log(`  ${FAIL}  ${label}: EXCEÇÃO — ${err?.message ?? err}`)
    return false
  }
}

async function main() {
  console.log('\n\x1b[1mHouse Mazzutti — Checklist Go-Live da Loja\x1b[0m')
  console.log('─'.repeat(55))

  const failures: string[] = []

  // ── Variáveis de Ambiente ──────────────────────────────
  console.log('\n\x1b[1m1. Variáveis de ambiente\x1b[0m')

  const REQUIRED_ENVS = [
    ['NEXT_PUBLIC_SUPABASE_URL',        'Supabase URL'],
    ['NEXT_PUBLIC_SUPABASE_ANON_KEY',   'Supabase anon key'],
    ['SUPABASE_SERVICE_ROLE_KEY',       'Supabase service role'],
    ['STRIPE_SECRET_KEY',               'Stripe secret key'],
    ['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 'Stripe publishable key'],
    ['STRIPE_WEBHOOK_SECRET',           'Stripe webhook secret'],
    ['RESEND_API_KEY',                  'Resend API key'],
    ['NEXT_PUBLIC_SITE_URL',            'Site URL'],
  ]

  for (const [key, label] of REQUIRED_ENVS) {
    const v = process.env[key]
    if (!v) {
      console.log(`  ${FAIL}  ${label} (${key}): não definido`)
      failures.push(label)
    } else if (v.includes('...') || v.includes('sk_test_51RIIV') || v.endsWith('_KEY=')) {
      console.log(`  ${WARN}  ${label}: valor parece placeholder`)
    } else if (key === 'STRIPE_SECRET_KEY' && v.startsWith('sk_test_')) {
      console.log(`  ${WARN}  Stripe: usando chave de TESTE — trocar para sk_live_ antes do go-live real`)
    } else {
      console.log(`  ${OK}  ${label}: configurado`)
    }
  }

  const OPTIONAL_ENVS = [
    ['NFEIO_API_KEY',           'NFE.io API key'],
    ['NFEIO_COMPANY_ID',        'NFE.io Company ID'],
    ['UPSTASH_REDIS_REST_URL',  'Upstash Redis URL'],
    ['RECAPTCHA_SECRET_KEY',    'reCAPTCHA secret'],
  ]

  for (const [key, label] of OPTIONAL_ENVS) {
    if (!process.env[key]) {
      console.log(`  ${WARN}  ${label}: não configurado (opcional mas recomendado)`)
    } else {
      console.log(`  ${OK}  ${label}: configurado`)
    }
  }

  // ── Supabase ───────────────────────────────────────────
  console.log('\n\x1b[1m2. Supabase\x1b[0m')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (url && key) {
    const supabase = createClient(url, key, { auth: { persistSession: false } })

    const TABLES = ['store_products', 'store_prices', 'store_orders', 'store_coupons', 'store_order_items']
    for (const table of TABLES) {
      await check(`Tabela ${table}`, async () => {
        const { error } = await supabase.from(table).select('id').limit(1)
        if (error) return { ok: false, msg: error.message }
        return { ok: true, msg: 'acessível' }
      })
    }

    await check('Produtos ativos no catálogo', async () => {
      const { count } = await supabase
        .from('store_products').select('*', { count: 'exact', head: true }).eq('active', true)
      if (!count || count === 0) return { ok: false, msg: '0 produtos ativos — catálogo vazio' }
      return { ok: true, msg: `${count} produto(s) ativo(s)` }
    })

    await check('Perfis com campo stripe_customer_id', async () => {
      const { error } = await supabase.from('profiles').select('stripe_customer_id').limit(1)
      if (error) return { ok: false, msg: `coluna stripe_customer_id: ${error.message}` }
      return { ok: true, msg: 'migration 0043 aplicada' }
    })
  } else {
    console.log(`  ${SKIP}  Supabase não configurado — pulando verificação`)
  }

  // ── Stripe ────────────────────────────────────────────
  console.log('\n\x1b[1m3. Stripe\x1b[0m')

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (stripeKey) {
    await check('Stripe API acessível', async () => {
      const res = await fetch('https://api.stripe.com/v1/products?limit=1', {
        headers: { Authorization: `Bearer ${stripeKey}` },
      })
      if (!res.ok) return { ok: false, msg: `HTTP ${res.status}` }
      const data = await res.json()
      return { ok: true, msg: `${data.data?.length ?? 0} produto(s) retornado(s)` }
    })

    await check('Webhook secret configurado', async () => {
      const whs = process.env.STRIPE_WEBHOOK_SECRET
      if (!whs || whs === 'whsec_...') return { ok: false, msg: 'não configurado' }
      if (!whs.startsWith('whsec_')) return { ok: false, msg: 'formato inválido' }
      return { ok: true, msg: 'configurado' }
    })

    if (stripeKey.startsWith('sk_live_')) {
      await check('Modo live confirmado', async () => {
        return { ok: true, msg: 'usando chave live ✓' }
      })
    } else {
      console.log(`  ${WARN}  Stripe em modo TEST — deploy em produção requer chave live`)
    }
  }

  // ── E-mail ────────────────────────────────────────────
  console.log('\n\x1b[1m4. E-mail (Resend)\x1b[0m')

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    await check('Resend API acessível', async () => {
      const res = await fetch('https://api.resend.com/domains', {
        headers: { Authorization: `Bearer ${resendKey}` },
      })
      if (!res.ok) return { ok: false, msg: `HTTP ${res.status}` }
      const data = await res.json()
      const domains = data.data ?? []
      const verified = domains.filter((d: any) => d.status === 'verified')
      if (verified.length === 0) {
        return { ok: false, warn: true, msg: 'nenhum domínio verificado — SPF/DKIM pendente' }
      }
      return { ok: true, msg: `${verified.length} domínio(s) verificado(s): ${verified.map((d: any) => d.name).join(', ')}` }
    })
  } else {
    console.log(`  ${SKIP}  Resend não configurado`)
  }

  // ── Feature Flag ──────────────────────────────────────
  console.log('\n\x1b[1m5. Feature Flag\x1b[0m')

  const storeEnabled = process.env.FEATURE_STORE_ENABLED
  if (storeEnabled === 'true') {
    console.log(`  ${OK}  FEATURE_STORE_ENABLED=true — loja ATIVA`)
  } else {
    console.log(`  ${WARN}  FEATURE_STORE_ENABLED=${storeEnabled ?? 'undefined'} — loja inativa (esperado antes do go-live)`)
  }

  // ── Resumo ────────────────────────────────────────────
  console.log('\n' + '─'.repeat(55))
  if (failures.length > 0) {
    console.log(`\x1b[31m✗ ${failures.length} verificação(ões) falharam:\x1b[0m`)
    failures.forEach((f) => console.log(`   • ${f}`))
    console.log('\nResolva os itens acima antes de ativar FEATURE_STORE_ENABLED=true.\n')
    process.exit(1)
  } else {
    console.log('\x1b[32m✓ Todas as verificações passaram!\x1b[0m')
    console.log('\nPróximo passo: no Coolify, altere FEATURE_STORE_ENABLED=false → true e faça redeploy.\n')
    process.exit(0)
  }
}

main().catch((err) => {
  console.error('Erro fatal no go-live check:', err)
  process.exit(1)
})
