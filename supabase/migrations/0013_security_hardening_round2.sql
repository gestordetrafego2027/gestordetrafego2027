-- 0013_security_hardening_round2.sql
-- Endurecimento pós-expansão CRM:
--  - Move extension vector para schema dedicado.
--  - Rate-limit por IP em INSERTs públicos.
--  - campaign_leads e lead_service_interests só aceitam INSERT vinculado a um
--    lead criado nos últimos 5 min (evita injeção de UTM/serviços a leads alheios).

create schema if not exists extensions;
grant usage on schema extensions to anon, authenticated, service_role;
alter extension vector set schema extensions;
alter database postgres set search_path = public, extensions;

------------------------------------------------------------
-- Rate-limit: 5 leads por IP em janelas de 10 min.
------------------------------------------------------------
create or replace function public.check_lead_rate_limit()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  client_ip text;
  recent int;
begin
  client_ip := coalesce(
    current_setting('request.headers', true)::jsonb->>'x-forwarded-for',
    'unknown'
  );
  if client_ip = 'unknown' then return true; end if;
  select count(*) into recent
    from public.leads
   where (utm->>'_ip') = client_ip
     and created_at > now() - interval '10 minutes';
  return recent < 5;
end;
$$;

revoke execute on function public.check_lead_rate_limit() from anon, authenticated, public;

drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert"
  on public.leads for insert to anon, authenticated
  with check (public.check_lead_rate_limit());

------------------------------------------------------------
-- Endurece dependências: campaign_leads e lead_service_interests
-- só aceitam INSERT se o lead referenciado foi criado nos últimos 5 minutos.
------------------------------------------------------------
drop policy if exists "campaign_leads_public_insert" on public.campaign_leads;
create policy "campaign_leads_public_insert"
  on public.campaign_leads for insert to anon, authenticated
  with check (exists (
    select 1 from public.leads l
     where l.id = campaign_leads.lead_id
       and l.created_at > now() - interval '5 minutes'
  ));

drop policy if exists "lsi_public_insert" on public.lead_service_interests;
create policy "lsi_public_insert"
  on public.lead_service_interests for insert to anon, authenticated
  with check (exists (
    select 1 from public.leads l
     where l.id = lead_service_interests.lead_id
       and l.created_at > now() - interval '5 minutes'
  ));

-- Nota: pg_jsonschema não suporta SET SCHEMA — permanece em public
-- como WARN aceito (falso-positivo do linter).
