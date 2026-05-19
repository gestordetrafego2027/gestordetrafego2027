// Cliente do endpoint público de captação (Edge Function `submit_lead`).
// Substitui os INSERTs diretos em `supabase.from('leads')` espalhados nos forms.
// Faz POST anônimo (verify_jwt=false na função) e retorna { ok, lead_id }.

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
    throw new Error('Supabase URL ou Anon Key não configurados.')
  }
  const res = await fetch(`${SUPABASE_URL}/functions/v1/submit_lead`, {
    method: 'POST',
    headers: { 
      'content-type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error || `submit_lead falhou (HTTP ${res.status})`)
  }
  return data
}
