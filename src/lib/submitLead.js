// Cliente do endpoint público de captação (Edge Function `submit_lead`).
// Substitui os INSERTs diretos em `supabase.from('leads')` espalhados nos forms.
// Faz POST anônimo (verify_jwt=false na função) e retorna { ok, lead_id }.
//
// Anti-bot: obtém um token reCAPTCHA v3 (action 'lead') e o envia no corpo.
// A própria Edge Function valida o token (ver supabase/functions/submit_lead).
// Centralizar aqui protege TODOS os formulários de lead sem alterar cada um.

import { getRecaptchaToken } from '@/lib/recaptcha/client'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * @param {Object} payload
 * @param {'commercial'|'talents'} payload.segment
 * @param {string} payload.lead_type
 * @param {string} payload.name
 * @param {string} [payload.email]
 * @param {string} [payload.phone]
 * @param {string} [payload.city]
 * @param {string} [payload.source]
 * @param {Object} [payload.details]
 * @param {Object} [payload.utm]
 * @param {Array} [payload.service_interests]
 * @param {string} [payload.campaign_slug]
 */
export async function submitLead(payload) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const msg = 'Supabase URL ou Anon Key não configurados.'
    console.error('[submitLead]', msg)
    throw new Error(msg)
  }
  const recaptchaToken = await getRecaptchaToken('lead')

  let res
  try {
    res = await fetch(`${SUPABASE_URL}/functions/v1/submit_lead`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ ...payload, recaptchaToken }),
    })
  } catch (networkErr) {
    console.error('[submitLead] network error:', networkErr)
    throw new Error('Sem conexão com o servidor. Verifique sua internet e tente novamente.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = data?.error || `HTTP ${res.status}`
    console.error('[submitLead] falhou:', { status: res.status, detail, payload })
    throw new Error(`Falha ao enviar (${detail}). Se persistir, fale com contato@housemazzutti.com.`)
  }
  return data
}
