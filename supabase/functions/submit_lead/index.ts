// Edge Function: submit_lead
// Recebe POST de formulário público, valida, injeta IP no utm._ip,
// e insere o lead. RLS + check_lead_rate_limit fazem o resto.
//
// Deploy:  supabase functions deploy submit_lead --project-ref <ref>
// Endpoint: POST {SUPABASE_URL}/functions/v1/submit_lead

// @ts-nocheck — runtime Deno, types via Supabase Edge Runtime.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"

type LeadPayload = {
  segment: "talents" | "commercial"
  lead_type: string
  name: string
  email?: string
  phone?: string
  city?: string
  source?: string
  notes?: string
  details?: Record<string, unknown>
  utm?: Record<string, string | undefined>
  service_interests?: Array<{
    service_id: string
    package_id?: string
    addons?: string[]
    answers?: Record<string, unknown>
  }>
  campaign_slug?: string
  recaptchaToken?: string
}

// Defesa em profundidade: espelha os enums do banco (public.lead_segment /
// public.lead_type). Mantenha sincronizado com as migrations. Se o payload
// trouxer um valor fora desta lista, devolvemos erro CLARO e logamos — em vez
// de propagar o erro cru do Postgres e perder o lead silenciosamente.
const VALID_SEGMENTS = new Set(["talents", "commercial"])
const VALID_LEAD_TYPES = new Set([
  "aluno_curso",
  "afiliada",
  "agenciado_casting",
  "talento",
  "fornecedor",
  "parceiro",
  "cliente_agencia",
  "cliente_produtora",
  "cliente_studio",
  "cliente_tour_canoinhas",
])

// reCAPTCHA v3 — validação server-side. Fail-open se o secret não estiver
// configurado (RECAPTCHA_SECRET_KEY nos secrets da Edge Function), para
// nunca bloquear leads legítimos por erro de infraestrutura.
const RECAPTCHA_MIN_SCORE = 0.5
async function verifyRecaptcha(token?: string): Promise<boolean> {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY")
  if (!secret) return true // fail-open: não configurado
  if (!token) return false
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    })
    if (!res.ok) return true // fail-open em erro de rede/Google
    const data = await res.json()
    if (!data.success) return false
    if (typeof data.score === "number" && data.score < RECAPTCHA_MIN_SCORE) return false
    return true
  } catch {
    return true // fail-open
  }
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors })
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405)
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  let body: LeadPayload
  try { body = await req.json() } catch { return json({ error: "invalid_json" }, 400) }

  if (!body?.name || !body?.segment || !body?.lead_type) {
    return json({ error: "missing_fields", required: ["name","segment","lead_type"] }, 400)
  }

  // Defesa em profundidade: valida enums ANTES do INSERT. Erro explícito +
  // log para detectar imediatamente um form enviando valor inválido (foi o
  // que derrubou silenciosamente os funis Studio/Branding/Agência).
  if (!VALID_SEGMENTS.has(body.segment)) {
    console.error("[submit_lead] segment inválido:", body.segment)
    return json({ error: "invalid_segment", value: body.segment }, 400)
  }
  if (!VALID_LEAD_TYPES.has(body.lead_type)) {
    console.error("[submit_lead] lead_type inválido:", body.lead_type)
    return json({ error: "invalid_lead_type", value: body.lead_type }, 400)
  }

  // Anti-bot: valida o token reCAPTCHA v3 antes de qualquer escrita.
  const captchaOk = await verifyRecaptcha(body.recaptchaToken)
  if (!captchaOk) {
    return json({ error: "recaptcha_failed" }, 400)
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  )

  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      segment: body.segment,
      lead_type: body.lead_type as never,
      name: body.name,
      email: body.email ?? null,
      phone: body.phone ?? null,
      city: body.city ?? null,
      source: body.source ?? "site_form",
      notes: body.notes ?? null,
      details: body.details ?? {},
      utm: { ...(body.utm ?? {}), _ip: ip, _ua: req.headers.get("user-agent") },
    })
    .select("id")
    .single()

  if (error) return json({ error: error.message }, 400)

  // Service interests (best-effort, não bloqueia resposta).
  if (body.service_interests?.length) {
    await supabase.from("lead_service_interests").insert(
      body.service_interests.map((si, i) => ({
        lead_id: lead.id,
        service_id: si.service_id,
        package_id: si.package_id ?? null,
        addons: si.addons ?? [],
        answers: si.answers ?? {},
        priority: i,
      })),
    )
  }

  // Attribuição de campanha (UTM).
  if (body.campaign_slug || body.utm?.utm_campaign) {
    const slug = body.campaign_slug ?? body.utm!.utm_campaign!
    const { data: ca } = await supabase
      .from("campaigns").select("id").eq("slug", slug).maybeSingle()
    if (ca) {
      await supabase.from("campaign_leads").insert({
        campaign_id: ca.id, lead_id: lead.id, touch_type: "first",
      })
    }
  }

  return json({ ok: true, lead_id: lead.id }, 201)
})

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...cors, "content-type": "application/json" },
  })
}
