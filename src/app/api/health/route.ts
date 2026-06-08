// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

async function checkSupabase(): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now()
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('_health').select('1').limit(1).maybeSingle()
    // Tabela inexistente retorna erro de schema, não de conexão — conexão OK.
    // PGRST116 (no rows) / PGRST205 (table not found in schema cache) / 42P01 (relation does not exist) → conexão saudável.
    const ok =
      !error ||
      ['PGRST116', 'PGRST205', '42P01'].includes(error.code ?? '') ||
      /does not exist|could not find/i.test(error.message ?? '')
    return { ok, latencyMs: Date.now() - start }
  } catch {
    return { ok: false, latencyMs: Date.now() - start }
  }
}

async function checkStripe(): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now()
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return { ok: false, latencyMs: 0 }
  try {
    const res = await fetch('https://api.stripe.com/v1/balance', {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(3000),
    })
    return { ok: res.status !== 401 && res.status < 500, latencyMs: Date.now() - start }
  } catch {
    return { ok: false, latencyMs: Date.now() - start }
  }
}

async function checkUpstash(): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now()
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return { ok: false, latencyMs: 0 }
  try {
    const res = await fetch(`${url}/ping`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(2000),
    })
    return { ok: res.ok, latencyMs: Date.now() - start }
  } catch {
    return { ok: false, latencyMs: Date.now() - start }
  }
}

export async function GET() {
  const [supabase, stripe, upstash] = await Promise.all([
    checkSupabase(),
    checkStripe(),
    checkUpstash(),
  ])

  const status = {
    supabase,
    stripe,
    upstash,
    version: process.env.NEXT_PUBLIC_SITE_URL ?? 'local',
    timestamp: new Date().toISOString(),
    feature_store: process.env.FEATURE_STORE_ENABLED === 'true',
  }

  const allOk = supabase.ok
  return NextResponse.json(status, { status: allOk ? 200 : 503 })
}
