import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase com service_role key.
 * ⚠️ USE APENAS EM SERVER-SIDE (API routes, webhooks, Server Actions).
 * Nunca expor ao client bundle. Bypassa RLS — sempre validar input antes.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados.')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
