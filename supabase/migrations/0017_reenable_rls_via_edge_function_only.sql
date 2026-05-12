-- 0017_reenable_rls_via_edge_function_only.sql
-- Restaura postura de segurança após hotfix 0016.
--
-- Estratégia: forms do site (FormStudio, FormAgencia, etc) agora POSTam em
-- /functions/v1/submit_lead via src/lib/submitLead.js. A Edge Function usa
-- service_role internamente (BYPASSRLS) então não precisa de policy para anon.
-- Removendo as policies de INSERT público fechamos a porta de INSERTs diretos
-- via /rest/v1/leads — só Edge Function (controlada, validada, com IP no utm)
-- consegue inserir.

alter table public.leads                  enable row level security;
alter table public.lead_service_interests enable row level security;
alter table public.campaign_leads         enable row level security;

drop policy if exists "leads_public_insert"          on public.leads;
drop policy if exists "lsi_public_insert"            on public.lead_service_interests;
drop policy if exists "campaign_leads_public_insert" on public.campaign_leads;
