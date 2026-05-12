// Cliente do endpoint público de captação (Edge Function `submit_lead`).
// Substitui os INSERTs diretos em `supabase.from('leads')` espalhados nos forms.
// Faz POST anônimo (verify_jwt=false na função) e retorna { ok, lead_id }.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

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
  if (!SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL não configurado.')
  }
  const res = await fetch(`${SUPABASE_URL}/functions/v1/submit_lead`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error || `submit_lead falhou (HTTP ${res.status})`)
  }
  return data
}
