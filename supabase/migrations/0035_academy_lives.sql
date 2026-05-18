-- 0035_academy_lives.sql
-- House Mazzutti Academy — lives + inscrições.
-- DEPENDS ON: 0023 (enums), 0024 (functions), 0025 (profiles), 0026 (authors), 0027 (products)

------------------------------------------------------------
-- Tabela: academy_lives
------------------------------------------------------------
create table if not exists public.academy_lives (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  product_id uuid references public.academy_products(id) on delete set null,
  host_author_id uuid references public.academy_authors(id) on delete set null,
  title text not null check (length(title) between 3 and 200),
  description text,
  cover_url text,
  scheduled_at timestamptz not null,
  duration_minutes int not null default 60 check (duration_minutes > 0),
  status academy_live_status not null default 'scheduled',
  visibility academy_live_visibility not null default 'enrolled_only',
  stream_url text,
  stream_provider text check (stream_provider is null or stream_provider in ('youtube','vimeo','zoom','meet','mux','livepeer','custom')),
  recording_url text,
  recording_available_until timestamptz,
  max_attendees int check (max_attendees is null or max_attendees > 0),
  registration_count int not null default 0,
  attended_count int not null default 0,
  -- audit
  started_at timestamptz,
  ended_at timestamptz,
  -- SEO
  seo_title text,
  seo_description text,
  og_image_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_lives is
  'Lives (eventos ao vivo). Pode estar atrelada a um produto (course/community_access) ou avulsa.';
comment on column public.academy_lives.visibility is
  'public = qualquer um; enrolled_only = matriculados no product_id; subscribers_only = assinantes.';

create index if not exists idx_academy_lives_scheduled on public.academy_lives(scheduled_at desc);
create index if not exists idx_academy_lives_status on public.academy_lives(status);
create index if not exists idx_academy_lives_product on public.academy_lives(product_id);
create index if not exists idx_academy_lives_host on public.academy_lives(host_author_id);

drop trigger if exists tg_academy_lives_updated_at on public.academy_lives;
create trigger tg_academy_lives_updated_at before update on public.academy_lives for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Trigger: timestamps de ciclo (started_at, ended_at)
------------------------------------------------------------
create or replace function public.fn_academy_lives_lifecycle()
returns trigger language plpgsql as $$
begin
  if new.status = 'live' and new.started_at is null then new.started_at := now(); end if;
  if new.status = 'ended' and new.ended_at is null then new.ended_at := now(); end if;
  return new;
end; $$;

drop trigger if exists tg_academy_lives_lifecycle on public.academy_lives;
create trigger tg_academy_lives_lifecycle before insert or update of status on public.academy_lives for each row execute function public.fn_academy_lives_lifecycle();

------------------------------------------------------------
-- Tabela: academy_live_registrations
------------------------------------------------------------
create table if not exists public.academy_live_registrations (
  id uuid primary key default gen_random_uuid(),
  live_id uuid not null references public.academy_lives(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  registered_at timestamptz not null default now(),
  attended boolean not null default false,
  joined_at timestamptz,
  left_at timestamptz,
  watch_seconds int not null default 0 check (watch_seconds >= 0),
  metadata jsonb not null default '{}'::jsonb,
  unique (live_id, user_id)
);

create index if not exists idx_academy_live_registrations_live on public.academy_live_registrations(live_id);
create index if not exists idx_academy_live_registrations_user on public.academy_live_registrations(user_id);
create index if not exists idx_academy_live_registrations_attended on public.academy_live_registrations(live_id) where attended = true;

------------------------------------------------------------
-- Trigger: agregados na live
------------------------------------------------------------
create or replace function public.fn_tg_academy_live_registrations_sync()
returns trigger language plpgsql as $$
declare v_live uuid;
begin
  v_live := coalesce(new.live_id, old.live_id);
  update public.academy_lives
  set registration_count = (select count(*)::int from public.academy_live_registrations where live_id = v_live),
      attended_count = (select count(*)::int from public.academy_live_registrations where live_id = v_live and attended = true)
  where id = v_live;
  return coalesce(new, old);
end; $$;

drop trigger if exists tg_academy_live_registrations_sync on public.academy_live_registrations;
create trigger tg_academy_live_registrations_sync after insert or update or delete on public.academy_live_registrations for each row execute function public.fn_tg_academy_live_registrations_sync();

------------------------------------------------------------
-- RLS: academy_lives
------------------------------------------------------------
alter table public.academy_lives enable row level security;

drop policy if exists "academy_lives_select" on public.academy_lives;
create policy "academy_lives_select" on public.academy_lives for select using (
  public.fn_is_admin(auth.uid())
  or exists (select 1 from public.academy_authors a where a.id = academy_lives.host_author_id and a.profile_id = auth.uid())
  or visibility = 'public'
  or (visibility = 'enrolled_only' and product_id is not null and auth.uid() is not null and public.fn_user_has_active_enrollment(auth.uid(), product_id))
  or (visibility = 'subscribers_only' and auth.uid() is not null and public.fn_user_has_active_subscription(auth.uid()))
);

drop policy if exists "academy_lives_admin_all" on public.academy_lives;
create policy "academy_lives_admin_all" on public.academy_lives for all using (public.fn_is_admin(auth.uid())) with check (public.fn_is_admin(auth.uid()));

drop policy if exists "academy_lives_host_manage" on public.academy_lives;
create policy "academy_lives_host_manage" on public.academy_lives for all
  using (exists (select 1 from public.academy_authors a where a.id = academy_lives.host_author_id and a.profile_id = auth.uid()))
  with check (exists (select 1 from public.academy_authors a where a.id = academy_lives.host_author_id and a.profile_id = auth.uid()));

------------------------------------------------------------
-- RLS: academy_live_registrations
------------------------------------------------------------
alter table public.academy_live_registrations enable row level security;

drop policy if exists "academy_live_registrations_select_own" on public.academy_live_registrations;
create policy "academy_live_registrations_select_own" on public.academy_live_registrations for select
  using (
    user_id = auth.uid()
    or public.fn_is_admin(auth.uid())
    or exists (select 1 from public.academy_lives l join public.academy_authors a on a.id = l.host_author_id where l.id = academy_live_registrations.live_id and a.profile_id = auth.uid())
  );

drop policy if exists "academy_live_registrations_insert_own" on public.academy_live_registrations;
create policy "academy_live_registrations_insert_own" on public.academy_live_registrations for insert
  with check (user_id = auth.uid());

drop policy if exists "academy_live_registrations_update_own" on public.academy_live_registrations;
create policy "academy_live_registrations_update_own" on public.academy_live_registrations for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "academy_live_registrations_admin_all" on public.academy_live_registrations;
create policy "academy_live_registrations_admin_all" on public.academy_live_registrations for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));
