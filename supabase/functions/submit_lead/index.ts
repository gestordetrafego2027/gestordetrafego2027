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
  details?: Record<string, unknown>
  utm?: Record<string, string | undefined>
  service_interests?: Array<{
    service_id: string
    package_id?: string
    addons?: string[]
    answers?: Record<string, unknown>
  }>
  campaign_slug?: string
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
