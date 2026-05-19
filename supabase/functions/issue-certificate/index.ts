import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
}

/**
 * Emite (ou retorna existente) certificado para uma matrícula concluída.
 * O PDF em si é gerado por outro serviço (placeholder pdf_url=null).
 */
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  const auth = req.headers.get('Authorization')
  if (!auth) return json({ error: 'unauthorized' }, 401)
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { data: { user } } = await userClient.auth.getUser()
  if (!user) return json({ error: 'unauthorized' }, 401)

  let body: { enrollment_id?: string }
  try { body = await req.json() } catch { return json({ error: 'bad_request' }, 400) }
  if (!body.enrollment_id) return json({ error: 'enrollment_id required' }, 400)

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: enrollment } = await admin
    .from('academy_enrollments')
    .select('id, user_id, product_id, completed_at, status')
    .eq('id', body.enrollment_id)
    .maybeSingle()
  if (!enrollment) return json({ error: 'enrollment_not_found' }, 404)
  if (enrollment.user_id !== user.id) return json({ error: 'forbidden' }, 403)
  if (!enrollment.completed_at) return json({ error: 'not_completed' }, 400)

  const { data: existing } = await admin
    .from('academy_certificates')
    .select('id, code, pdf_url, issued_at')
    .eq('enrollment_id', enrollment.id)
    .maybeSingle()
  if (existing) return json({ certificate: existing, created: false })

  const { data: created, error } = await admin
    .from('academy_certificates')
    .insert({
      enrollment_id: enrollment.id,
      user_id: enrollment.user_id,
      product_id: enrollment.product_id,
      code: '',
      pdf_url: null, // TODO: gerar PDF e popular
    })
    .select('id, code, pdf_url, issued_at')
    .single()
  if (error) return json({ error: 'create_failed', detail: error.message }, 500)

  return json({ certificate: created, created: true })
})
