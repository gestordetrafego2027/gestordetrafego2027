-- 0021_audit_log.sql
-- Auditoria centralizada de mutacoes em tabelas core.
-- Aplicada em dev e prod via Supabase MCP em 2026-05-16.

create table if not exists public.audit_log (
  id bigserial primary key,
  ts timestamptz not null default now(),
  actor_id uuid references auth.users(id) on delete set null,
  actor_email text,
  entity text not null,
  entity_id uuid,
  action text not null,
  before jsonb,
  after jsonb,
  diff jsonb
);

create index if not exists audit_log_entity_idx on public.audit_log (entity, entity_id, ts desc);
create index if not exists audit_log_ts_idx     on public.audit_log (ts desc);
create index if not exists audit_log_actor_idx  on public.audit_log (actor_id, ts desc);

alter table public.audit_log enable row level security;

drop policy if exists "audit_log_admin_select" on public.audit_log;
create policy "audit_log_admin_select" on public.audit_log
  for select to authenticated using (public.is_admin());

create or replace function public.tg_audit() returns trigger
language plpgsql security definer set search_path = public, auth as $$
declare
  v_before jsonb; v_after jsonb; v_diff jsonb;
  v_actor uuid := auth.uid(); v_email text;
begin
  if v_actor is not null then
    select email into v_email from auth.users where id = v_actor;
  end if;
  if TG_OP = 'INSERT' then
    v_before := null; v_after := to_jsonb(NEW); v_diff := v_after;
  elsif TG_OP = 'UPDATE' then
    v_before := to_jsonb(OLD); v_after := to_jsonb(NEW);
    select jsonb_object_agg(key, value) into v_diff
      from jsonb_each(v_after) where v_before->key is distinct from value;
    if v_diff is null then return NEW; end if;
  elsif TG_OP = 'DELETE' then
    v_before := to_jsonb(OLD); v_after := null; v_diff := null;
  end if;
  insert into public.audit_log
    (actor_id, actor_email, entity, entity_id, action, before, after, diff)
  values
    (v_actor, v_email, TG_TABLE_NAME,
     coalesce((coalesce(NEW, OLD)::jsonb->>'id')::uuid, null),
     lower(TG_OP), v_before, v_after, v_diff);
  return coalesce(NEW, OLD);
end;
$$;

do $$
declare t text;
begin
  for t in select unnest(array['leads','clients','opportunities','quotes','invoices','payments']) loop
    execute format('drop trigger if exists trg_%s_audit on public.%s', t, t);
    execute format('create trigger trg_%s_audit after insert or update or delete on public.%s for each row execute function public.tg_audit()', t, t);
  end loop;
end $$;
