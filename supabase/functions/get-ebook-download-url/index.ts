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
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  const auth = req.headers.get('Authorization')
  if (!auth) return json({ error: 'unauthorized' }, 401)

  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { data: { user }, error: userErr } = await userClient.auth.getUser()
  if (userErr || !user) return json({ error: 'unauthorized' }, 401)

  let body: { product_id?: string; file_id?: string }
  try { body = await req.json() } catch { return json({ error: 'bad_request' }, 400) }
  if (!body.product_id) return json({ error: 'product_id required' }, 400)

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: hasAccess } = await admin.rpc('fn_user_has_active_enrollment', {
    p_user_id: user.id,
    p_product_id: body.product_id,
  })
  if (hasAccess !== true) return json({ error: 'forbidden' }, 403)

  let fileQuery = admin.from('academy_ebook_files')
    .select('id, file_url, format, version, is_active, is_default')
    .eq('product_id', body.product_id)
    .eq('is_active', true)
    .order('is_default', { ascending: false })
    .limit(1)
  if (body.file_id) fileQuery = fileQuery.eq('id', body.file_id)
  const { data: files, error: fileErr } = await fileQuery
  if (fileErr) return json({ error: 'db_error', detail: fileErr.message }, 500)
  if (!files || files.length === 0) return json({ error: 'file_not_found' }, 404)

  const file = files[0]
  const path = file.file_url.replace(/^academy-ebooks\//, '')
  const { data: signed, error: sErr } = await admin.storage
    .from('academy-ebooks')
    .createSignedUrl(path, 60 * 10)
  if (sErr || !signed) return json({ error: 'signing_failed', detail: sErr?.message }, 500)

  return json({
    url: signed.signedUrl,
    format: file.format,
    version: file.version,
    expires_in: 600,
  })
})
