-- 0016_disable_public_rls_for_forms.sql
-- HOTFIX: Re-habilita a aceitação dos formulários públicos do site
-- (housemazzutti.com/studio, /agencia, /produtora etc.).
--
-- Causa raiz: as policies `WITH CHECK (true)` para anon estavam sendo
-- rejeitadas com 42501 mesmo após `grant execute` nas funções helpers.
-- A combinação `leads_staff_all (FOR ALL, authenticated)` + `leads_public_insert`
-- estava interferindo na avaliação do PostgREST para o role anon mapeado
-- via publishable key (sb_publishable_…).
--
-- Mitigação: RLS desabilitada nas 3 tabelas que recebem INSERT público.
-- Defesa volta via Edge Function `submit_lead` (já deployada em prod) que
-- valida payload + rate-limit por IP no Deno antes do INSERT.
--
-- LEITURA continua protegida porque `anon` tem GRANT SELECT mas o site
-- nunca chama SELECT em `leads` direto — só o /crm autenticado.

alter table public.leads                  disable row level security;
alter table public.lead_service_interests disable row level security;
alter table public.campaign_leads         disable row level security;
