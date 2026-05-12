-- 0015_automation_instant_triggers.sql
-- Disparo automático de regras quando lead é criado ou quote → aceito.
-- Executa apenas actions seguras DB-side (create_activity, update_opportunity).
-- send_email e notify_owner ficam como no-op aqui (alvo de Edge Function futura).

------------------------------------------------------------
-- Executor genérico de actions
------------------------------------------------------------
create or replace function public.exec_automation_actions(
  p_rule public.automation_rules,
  p_lead_id uuid,
  p_client_id uuid default null
) returns void
language plpgsql security definer set search_path = public as $$
declare a jsonb;
begin
  for a in select value from jsonb_array_elements(p_rule.actions)
  loop
    if a->>'type' = 'create_activity' and p_lead_id is not null then
      insert into public.activities (lead_id, type, title, body)
      values (p_lead_id,
              coalesce((a->>'activity_type')::activity_type, 'system'::activity_type),
              coalesce(a->>'title', 'Automação'),
              a->>'body');
    elsif a->>'type' = 'update_opportunity' and p_lead_id is not null then
      update public.opportunities
         set stage = coalesce((a->>'stage')::opportunity_stage, stage),
             closed_at = case when (a->>'stage') in ('ganho','perdido') then now() else closed_at end,
             probability = case when a->>'stage' = 'ganho'  then 100
                                when a->>'stage' = 'perdido' then 0
                                else probability end
       where lead_id = p_lead_id and closed_at is null;
    end if;
  end loop;

  insert into public.automation_runs (rule_id, lead_id, client_id, status, payload)
  values (p_rule.id, p_lead_id, p_client_id, 'success', p_rule.actions);

  update public.automation_rules
     set last_run_at = now(), run_count = run_count + 1
   where id = p_rule.id;
end;
$$;

revoke execute on function public.exec_automation_actions(public.automation_rules, uuid, uuid)
  from public, anon, authenticated;

------------------------------------------------------------
-- Trigger: lead_created (AFTER INSERT em public.leads)
------------------------------------------------------------
create or replace function public.tg_lead_created_automation()
returns trigger
language plpgsql security definer set search_path = public as $$
declare r public.automation_rules%rowtype;
begin
  for r in select * from public.automation_rules
            where active and trigger_type = 'lead_created'
  loop
    perform public.exec_automation_actions(r, new.id, null);
  end loop;
  return new;
end;
$$;

drop trigger if exists trg_leads_created_automation on public.leads;
create trigger trg_leads_created_automation
  after insert on public.leads
  for each row execute function public.tg_lead_created_automation();

------------------------------------------------------------
-- Trigger: quote_accepted (BEFORE UPDATE em public.quotes quando status muda p/ 'aceito')
------------------------------------------------------------
create or replace function public.tg_quote_accepted_automation()
returns trigger
language plpgsql security definer set search_path = public as $$
declare r public.automation_rules%rowtype;
begin
  if new.status = 'aceito' and (old.status is distinct from 'aceito') then
    if new.accepted_at is null then new.accepted_at := now(); end if;
    for r in select * from public.automation_rules
              where active and trigger_type = 'quote_accepted'
    loop
      perform public.exec_automation_actions(r, new.lead_id, null);
    end loop;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_quotes_accepted_automation on public.quotes;
create trigger trg_quotes_accepted_automation
  before update of status on public.quotes
  for each row execute function public.tg_quote_accepted_automation();
