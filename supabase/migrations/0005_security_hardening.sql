-- 0005_security_hardening.sql
-- Corrige warnings do Supabase Advisor:
-- 1. function_search_path_mutable nas funções públicas
-- 2. anon/authenticated podiam executar is_staff() via /rest/v1/rpc

-- Fixar search_path
alter function public.set_updated_at() set search_path = public;
alter function public.is_staff()       set search_path = public, auth;

-- Bloquear chamada direta a is_staff() via API REST
revoke execute on function public.is_staff() from anon, authenticated, public;
-- Mantém grant pra postgres/service_role (uso interno em policies via security definer)

-- Nota deixada para revisão:
-- - `leads_public_insert` e `lsi_public_insert` usam `with check (true)` por design (formulário
--   público anônimo). Mitigação futura: rate limit no Edge Function ou turnstile/captcha.
-- - Extensões `vector` e `pg_jsonschema` em `public` (vieram do create extension simples).
--   Mover requer disable+create em outro schema; postergado.
