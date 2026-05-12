-- 0014_automation_runners_and_cron.sql
-- Camada de execução de automações:
--   • run_automation_inactivity()      → varre leads idle e cria activities/runs.
--   • run_automation_invoice_overdue() → marca invoices vencidas + runs.
--   • promote_lead_to_client()         → RPC autenticado: lead → client + opp ganha.
--   • pg_cron jobs diários disparam os dois runners.
--
-- Padrão: SECURITY DEFINER + EXECUTE revogado de anon/authenticated (exceto promote,
-- liberado p/ authenticated com checagem interna is_staff()).

create extension if not exists pg_cron with schema extensions;
grant usage on schema cron to postgres;

------------------------------------------------------------
-- Runner: inactivity (status novo|em_contato sem update há N dias)
------------------------------------------------------------
create or replace function public.run_automation_inactivity()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  r record; total int := 0; affected int; days_idle int;
begin
  for r in
    select * from public.automation_rules
     where active and trigger_type = 'inactivity'
  loop
    days_idle := coalesce((r.conditions->>'days_idle')::int, 14);
    with stale as (
      select l.id
        from public.leads l
       where l.status::text = any(coalesce(
         (select array_agg(value::text)
            from jsonb_array_elements_text(r.conditions->'status_in')),
         array['novo','em_contato']))
         and l.updated_at < now() - make_interval(days => days_idle)
         and not exists (
           select 1 from public.automation_runs ar
            where ar.rule_id = r.id and ar.lead_id = l.id
              and ar.ran_at > now() - interval '7 days'
         )
    ),
    inserted as (
      insert into public.activities (lead_id, type, title, body)
      select id, 'task'::activity_type, 'Follow-up de reengajamento (auto)',
             'Lead inativo há ' || days_idle || ' dias.'
        from stale
      returning lead_id
    ),
    runs as (
      insert into public.automation_runs (rule_id, lead_id, status, payload)
      select r.id, lead_id, 'success', jsonb_build_object('days_idle', days_idle)
        from inserted
      returning 1
    )
    select count(*) into affected from runs;

    update public.automation_rules
       set last_run_at = now(),
           run_count = run_count + coalesce(affected, 0)
     where id = r.id;
    total := total + coalesce(affected, 0);
  end loop;
  return total;
end;
$$;

------------------------------------------------------------
-- Runner: invoice_overdue → marca status=vencida + log
------------------------------------------------------------
create or replace function public.run_automation_invoice_overdue()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  r record; total int := 0; affected int; days_overdue int;
begin
  for r in
    select * from public.automation_rules
     where active and trigger_type = 'invoice_overdue'
  loop
    days_overdue := coalesce((r.conditions->>'days_overdue')::int, 1);
    with overdue as (
      update public.invoices
         set status = 'vencida'
       where status in ('emitida','parcial')
         and due_date is not null
         and due_date < current_date - make_interval(days => days_overdue)
       returning id, client_id
    ),
    runs as (
      insert into public.automation_runs (rule_id, client_id, status, payload)
      select r.id, client_id, 'success', jsonb_build_object('invoice_id', id)
        from overdue
      returning 1
    )
    select count(*) into affected from runs;

    update public.automation_rules
       set last_run_at = now(),
           run_count = run_count + coalesce(affected, 0)
     where id = r.id;
    total := total + coalesce(affected, 0);
  end loop;
  return total;
end;
$$;

revoke execute on function public.run_automation_inactivity()      from public, anon, authenticated;
revoke execute on function public.run_automation_invoice_overdue() from public, anon, authenticated;

------------------------------------------------------------
-- RPC: promote_lead_to_client (chamável do front pelo staff)
--   Cria cliente, oportunidade ganha, marca lead=ganho e activity.
------------------------------------------------------------
create or replace function public.promote_lead_to_client(
  p_lead_id    uuid,
  p_unit       business_unit default null,
  p_amount_brl numeric        default 0
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  l record;
  new_client uuid;
  resolved_unit business_unit;
begin
  if not public.is_staff() then
    raise exception 'forbidden';
  end if;

  select * into l from public.leads where id = p_lead_id;
  if not found then
    raise exception 'lead_not_found';
  end if;

  resolved_unit := coalesce(p_unit,
    case l.lead_type
      when 'cliente_agencia'   then 'agencia'::business_unit
      when 'cliente_studio'    then 'studio'::business_unit
      when 'cliente_produtora' then 'produtora'::business_unit
      else 'agencia'::business_unit
    end);

  insert into public.clients
    (lead_id, unit, display_name, email, phone, city, owner_id,
     status, first_purchase_at, lifetime_value_brl)
  values
    (l.id, resolved_unit, l.name, l.email, l.phone, l.city, l.owner_id,
     'ativo', now(), p_amount_brl)
  returning id into new_client;

  insert into public.opportunities
    (lead_id, client_id, owner_id, unit, title, stage,
     amount_brl, probability, closed_at)
  values
    (l.id, new_client, l.owner_id, resolved_unit,
     'Conversão de ' || l.name, 'ganho', p_amount_brl, 100, now());

  update public.leads set status = 'ganho' where id = l.id;

  insert into public.activities (lead_id, type, title, body)
  values (l.id, 'system', 'Lead promovido a cliente',
          'client_id=' || new_client::text);

  return new_client;
end;
$$;

revoke execute on function public.promote_lead_to_client(uuid, business_unit, numeric)
  from public, anon;
grant execute on function public.promote_lead_to_client(uuid, business_unit, numeric)
  to authenticated;

------------------------------------------------------------
-- Cron: diariamente 03:00 e 03:15 UTC
------------------------------------------------------------
select cron.schedule('automation_inactivity_daily',     '0 3 * * *',
  $cron$select public.run_automation_inactivity();$cron$);
select cron.schedule('automation_invoice_overdue_daily','15 3 * * *',
  $cron$select public.run_automation_invoice_overdue();$cron$);
