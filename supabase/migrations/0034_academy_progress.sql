-- 0034_academy_progress.sql
-- House Mazzutti Academy — progresso de aulas + log de eventos.
-- DEPENDS ON: 0024 (functions), 0025 (profiles), 0028 (lessons), 0033 (enrollments)

------------------------------------------------------------
-- Tabela: academy_lesson_progress
------------------------------------------------------------
create table if not exists public.academy_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.academy_lessons(id) on delete cascade,
  product_id uuid not null references public.academy_products(id) on delete cascade,
  seconds_watched int not null default 0 check (seconds_watched >= 0),
  last_position_seconds int not null default 0 check (last_position_seconds >= 0),
  completed_at timestamptz,
  first_watched_at timestamptz not null default now(),
  last_watched_at timestamptz not null default now(),
  watch_count int not null default 1 check (watch_count >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

comment on table public.academy_lesson_progress is
  'Progresso por aula. UNIQUE (user, lesson) — uma linha por par, atualizada por upsert.';

create index if not exists idx_academy_lesson_progress_user on public.academy_lesson_progress(user_id);
create index if not exists idx_academy_lesson_progress_product on public.academy_lesson_progress(product_id);
create index if not exists idx_academy_lesson_progress_lesson on public.academy_lesson_progress(lesson_id);
create index if not exists idx_academy_lesson_progress_completed on public.academy_lesson_progress(user_id, product_id) where completed_at is not null;

drop trigger if exists tg_academy_lesson_progress_updated_at on public.academy_lesson_progress;
create trigger tg_academy_lesson_progress_updated_at before update on public.academy_lesson_progress for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Tabela: academy_progress_events
-- Log granular — audit/analytics. Append-only.
------------------------------------------------------------
create table if not exists public.academy_progress_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.academy_products(id) on delete cascade,
  lesson_id uuid references public.academy_lessons(id) on delete set null,
  event academy_progress_event not null,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists idx_academy_progress_events_user on public.academy_progress_events(user_id, occurred_at desc);
create index if not exists idx_academy_progress_events_product on public.academy_progress_events(product_id);
create index if not exists idx_academy_progress_events_lesson on public.academy_progress_events(lesson_id);
create index if not exists idx_academy_progress_events_event on public.academy_progress_events(event);

------------------------------------------------------------
-- Função: recalcula enrollments.progress_percent
------------------------------------------------------------
create or replace function public.fn_recalc_enrollment_progress(p_user_id uuid, p_product_id uuid)
returns void
language plpgsql
as $$
declare
  v_total int;
  v_done int;
  v_pct numeric(5,2);
begin
  select lesson_count into v_total from public.academy_products where id = p_product_id;
  if v_total is null or v_total = 0 then return; end if;
  select count(*) into v_done
  from public.academy_lesson_progress
  where user_id = p_user_id and product_id = p_product_id and completed_at is not null;
  v_pct := round((v_done::numeric / v_total::numeric) * 100, 2);
  update public.academy_enrollments
  set progress_percent = v_pct,
      last_accessed_at = now(),
      completed_at = case when v_pct = 100 and completed_at is null then now() else completed_at end
  where user_id = p_user_id and product_id = p_product_id;
end;
$$;

------------------------------------------------------------
-- Trigger: ao concluir uma aula, atualizar enrollment
------------------------------------------------------------
create or replace function public.fn_tg_academy_lesson_progress_sync()
returns trigger language plpgsql as $$
begin
  if tg_op in ('INSERT','UPDATE') then
    perform public.fn_recalc_enrollment_progress(new.user_id, new.product_id);
    return new;
  elsif tg_op = 'DELETE' then
    perform public.fn_recalc_enrollment_progress(old.user_id, old.product_id);
    return old;
  end if;
  return null;
end; $$;

drop trigger if exists tg_academy_lesson_progress_sync on public.academy_lesson_progress;
create trigger tg_academy_lesson_progress_sync after insert or update or delete on public.academy_lesson_progress for each row execute function public.fn_tg_academy_lesson_progress_sync();

------------------------------------------------------------
-- View: v_academy_course_progress
------------------------------------------------------------
create or replace view public.v_academy_course_progress as
select
  e.user_id,
  e.product_id,
  p.title as product_title,
  p.slug as product_slug,
  p.lesson_count as total_lessons,
  coalesce(lp.completed_lessons, 0) as completed_lessons,
  e.progress_percent,
  e.completed_at,
  e.last_accessed_at
from public.academy_enrollments e
join public.academy_products p on p.id = e.product_id
left join (
  select user_id, product_id, count(*) filter (where completed_at is not null)::int as completed_lessons
  from public.academy_lesson_progress
  group by user_id, product_id
) lp on lp.user_id = e.user_id and lp.product_id = e.product_id;

comment on view public.v_academy_course_progress is
  'Progresso agregado por matrícula. SECURITY INVOKER — respeita RLS das tabelas base.';

------------------------------------------------------------
-- RLS: academy_lesson_progress
------------------------------------------------------------
alter table public.academy_lesson_progress enable row level security;

drop policy if exists "academy_lesson_progress_select_own" on public.academy_lesson_progress;
create policy "academy_lesson_progress_select_own" on public.academy_lesson_progress for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_lesson_progress_insert_own" on public.academy_lesson_progress;
create policy "academy_lesson_progress_insert_own" on public.academy_lesson_progress for insert
  with check (user_id = auth.uid());

drop policy if exists "academy_lesson_progress_update_own" on public.academy_lesson_progress;
create policy "academy_lesson_progress_update_own" on public.academy_lesson_progress for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "academy_lesson_progress_admin_all" on public.academy_lesson_progress;
create policy "academy_lesson_progress_admin_all" on public.academy_lesson_progress for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_progress_events (append-only, sem update/delete pelo user)
------------------------------------------------------------
alter table public.academy_progress_events enable row level security;

drop policy if exists "academy_progress_events_select_own" on public.academy_progress_events;
create policy "academy_progress_events_select_own" on public.academy_progress_events for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_progress_events_insert_own" on public.academy_progress_events;
create policy "academy_progress_events_insert_own" on public.academy_progress_events for insert
  with check (user_id = auth.uid());

drop policy if exists "academy_progress_events_admin_all" on public.academy_progress_events;
create policy "academy_progress_events_admin_all" on public.academy_progress_events for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));
