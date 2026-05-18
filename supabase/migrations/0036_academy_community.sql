-- 0036_academy_community.sql
-- House Mazzutti Academy — comunidade: spaces, posts, comments, reactions, follows, reports.
-- DEPENDS ON: 0023 (enums), 0024 (functions), 0025 (profiles), 0027 (products)

------------------------------------------------------------
-- Tabela: academy_community_spaces
-- Canais/espaços. Pode exigir produto pra ter acesso.
------------------------------------------------------------
create table if not exists public.academy_community_spaces (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null check (length(name) between 2 and 80),
  description text,
  cover_url text,
  icon_name text,
  required_product_id uuid references public.academy_products(id) on delete set null,
  requires_subscription boolean not null default false,
  order_index int not null default 0,
  active boolean not null default true,
  post_count int not null default 0,
  member_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_community_spaces is
  'Espaços/canais da comunidade. required_product_id ou requires_subscription gateiam acesso.';

create index if not exists idx_academy_community_spaces_active on public.academy_community_spaces(active, order_index);
create index if not exists idx_academy_community_spaces_slug on public.academy_community_spaces(slug);

drop trigger if exists tg_academy_community_spaces_updated_at on public.academy_community_spaces;
create trigger tg_academy_community_spaces_updated_at before update on public.academy_community_spaces for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: fn_user_can_access_space
------------------------------------------------------------
create or replace function public.fn_user_can_access_space(p_user_id uuid, p_space_id uuid)
returns boolean
language plpgsql
stable
security definer
as $$
declare
  v_required uuid;
  v_req_sub boolean;
begin
  select required_product_id, requires_subscription
    into v_required, v_req_sub
  from public.academy_community_spaces where id = p_space_id;
  if v_required is null and v_req_sub = false then
    return true; -- aberto
  end if;
  if v_required is not null and public.fn_user_has_active_enrollment(p_user_id, v_required) then
    return true;
  end if;
  if v_req_sub and public.fn_user_has_active_subscription(p_user_id) then
    return true;
  end if;
  return false;
exception when others then
  return false;
end;
$$;

------------------------------------------------------------
-- Tabela: academy_posts
------------------------------------------------------------
create table if not exists public.academy_posts (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.academy_community_spaces(id) on delete cascade,
  author_user_id uuid not null references public.profiles(id) on delete cascade,
  type academy_post_type not null default 'text',
  status academy_post_status not null default 'published',
  title text check (title is null or length(title) <= 200),
  body_md text,
  media jsonb not null default '[]'::jsonb,
  pinned boolean not null default false,
  locked boolean not null default false,
  -- agregados
  comment_count int not null default 0,
  reaction_count int not null default 0,
  view_count int not null default 0,
  -- audit
  last_activity_at timestamptz not null default now(),
  edited_at timestamptz,
  hidden_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_academy_posts_space on public.academy_posts(space_id, created_at desc);
create index if not exists idx_academy_posts_author on public.academy_posts(author_user_id);
create index if not exists idx_academy_posts_status on public.academy_posts(status);
create index if not exists idx_academy_posts_pinned on public.academy_posts(space_id) where pinned = true;
create index if not exists idx_academy_posts_activity on public.academy_posts(space_id, last_activity_at desc);

drop trigger if exists tg_academy_posts_updated_at on public.academy_posts;
create trigger tg_academy_posts_updated_at before update on public.academy_posts for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Tabela: academy_comments (recursiva)
------------------------------------------------------------
create table if not exists public.academy_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.academy_posts(id) on delete cascade,
  parent_comment_id uuid references public.academy_comments(id) on delete cascade,
  author_user_id uuid not null references public.profiles(id) on delete cascade,
  body_md text not null check (length(body_md) between 1 and 5000),
  status text not null default 'published' check (status in ('published','hidden','deleted')),
  reaction_count int not null default 0,
  edited_at timestamptz,
  hidden_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_academy_comments_post on public.academy_comments(post_id, created_at);
create index if not exists idx_academy_comments_parent on public.academy_comments(parent_comment_id);
create index if not exists idx_academy_comments_author on public.academy_comments(author_user_id);

drop trigger if exists tg_academy_comments_updated_at on public.academy_comments;
create trigger tg_academy_comments_updated_at before update on public.academy_comments for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Trigger: agregados em posts.comment_count e last_activity_at
------------------------------------------------------------
create or replace function public.fn_tg_academy_comments_sync()
returns trigger language plpgsql as $$
declare v_post uuid;
begin
  v_post := coalesce(new.post_id, old.post_id);
  update public.academy_posts set
    comment_count = (select count(*)::int from public.academy_comments where post_id = v_post and status = 'published'),
    last_activity_at = greatest(last_activity_at, now())
  where id = v_post;
  return coalesce(new, old);
end; $$;

drop trigger if exists tg_academy_comments_sync on public.academy_comments;
create trigger tg_academy_comments_sync after insert or update or delete on public.academy_comments for each row execute function public.fn_tg_academy_comments_sync();

------------------------------------------------------------
-- Tabela: academy_reactions
------------------------------------------------------------
create table if not exists public.academy_reactions (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('post','comment')),
  target_id uuid not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('like','fire','heart','clap','star')),
  created_at timestamptz not null default now(),
  unique (target_type, target_id, user_id, kind)
);

create index if not exists idx_academy_reactions_target on public.academy_reactions(target_type, target_id);
create index if not exists idx_academy_reactions_user on public.academy_reactions(user_id);

------------------------------------------------------------
-- Trigger: agregados de reactions
------------------------------------------------------------
create or replace function public.fn_tg_academy_reactions_sync()
returns trigger language plpgsql as $$
declare v_type text; v_id uuid; v_count int;
begin
  v_type := coalesce(new.target_type, old.target_type);
  v_id := coalesce(new.target_id, old.target_id);
  select count(*)::int into v_count from public.academy_reactions where target_type = v_type and target_id = v_id;
  if v_type = 'post' then
    update public.academy_posts set reaction_count = v_count where id = v_id;
  elsif v_type = 'comment' then
    update public.academy_comments set reaction_count = v_count where id = v_id;
  end if;
  return coalesce(new, old);
end; $$;

drop trigger if exists tg_academy_reactions_sync on public.academy_reactions;
create trigger tg_academy_reactions_sync after insert or delete on public.academy_reactions for each row execute function public.fn_tg_academy_reactions_sync();

------------------------------------------------------------
-- Tabela: academy_follows
------------------------------------------------------------
create table if not exists public.academy_follows (
  id uuid primary key default gen_random_uuid(),
  follower_user_id uuid not null references public.profiles(id) on delete cascade,
  followed_user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (follower_user_id, followed_user_id),
  check (follower_user_id <> followed_user_id)
);

create index if not exists idx_academy_follows_follower on public.academy_follows(follower_user_id);
create index if not exists idx_academy_follows_followed on public.academy_follows(followed_user_id);

------------------------------------------------------------
-- Tabela: academy_reports (denúncias)
------------------------------------------------------------
create table if not exists public.academy_reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('post','comment','profile')),
  target_id uuid not null,
  reporter_user_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (reason in ('spam','abuse','harassment','offensive','off_topic','copyright','other')),
  description text,
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  resolved_by uuid references public.profiles(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_academy_reports_status on public.academy_reports(status, created_at desc);
create index if not exists idx_academy_reports_target on public.academy_reports(target_type, target_id);
create index if not exists idx_academy_reports_reporter on public.academy_reports(reporter_user_id);

------------------------------------------------------------
-- Trigger: post agrega membros do space (placeholder simples)
-- Não há "join space" explícito; member_count será gerenciado pela app.
------------------------------------------------------------
create or replace function public.fn_tg_academy_posts_space_count()
returns trigger language plpgsql as $$
declare v_space uuid;
begin
  v_space := coalesce(new.space_id, old.space_id);
  update public.academy_community_spaces
  set post_count = (select count(*)::int from public.academy_posts where space_id = v_space and status = 'published')
  where id = v_space;
  return coalesce(new, old);
end; $$;

drop trigger if exists tg_academy_posts_space_count on public.academy_posts;
create trigger tg_academy_posts_space_count after insert or update or delete on public.academy_posts for each row execute function public.fn_tg_academy_posts_space_count();

------------------------------------------------------------
-- RLS: academy_community_spaces
------------------------------------------------------------
alter table public.academy_community_spaces enable row level security;

drop policy if exists "academy_community_spaces_select" on public.academy_community_spaces;
create policy "academy_community_spaces_select" on public.academy_community_spaces for select
  using (active = true or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_community_spaces_admin_all" on public.academy_community_spaces;
create policy "academy_community_spaces_admin_all" on public.academy_community_spaces for all
  using (public.fn_is_admin(auth.uid())) with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_posts
------------------------------------------------------------
alter table public.academy_posts enable row level security;

drop policy if exists "academy_posts_select" on public.academy_posts;
create policy "academy_posts_select" on public.academy_posts for select using (
  public.fn_is_admin(auth.uid())
  or author_user_id = auth.uid()
  or (status = 'published' and auth.uid() is not null and public.fn_user_can_access_space(auth.uid(), space_id))
);

drop policy if exists "academy_posts_insert_own" on public.academy_posts;
create policy "academy_posts_insert_own" on public.academy_posts for insert
  with check (
    author_user_id = auth.uid()
    and public.fn_user_can_access_space(auth.uid(), space_id)
  );

drop policy if exists "academy_posts_update_own" on public.academy_posts;
create policy "academy_posts_update_own" on public.academy_posts for update
  using (author_user_id = auth.uid())
  with check (author_user_id = auth.uid());

drop policy if exists "academy_posts_delete_own" on public.academy_posts;
create policy "academy_posts_delete_own" on public.academy_posts for delete
  using (author_user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_posts_admin_all" on public.academy_posts;
create policy "academy_posts_admin_all" on public.academy_posts for all
  using (public.fn_is_admin(auth.uid())) with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_comments
------------------------------------------------------------
alter table public.academy_comments enable row level security;

drop policy if exists "academy_comments_select" on public.academy_comments;
create policy "academy_comments_select" on public.academy_comments for select using (
  public.fn_is_admin(auth.uid())
  or author_user_id = auth.uid()
  or (
    status = 'published'
    and exists (
      select 1 from public.academy_posts p
      where p.id = academy_comments.post_id
        and p.status = 'published'
        and (auth.uid() is not null and public.fn_user_can_access_space(auth.uid(), p.space_id))
    )
  )
);

drop policy if exists "academy_comments_insert_own" on public.academy_comments;
create policy "academy_comments_insert_own" on public.academy_comments for insert
  with check (
    author_user_id = auth.uid()
    and exists (
      select 1 from public.academy_posts p
      where p.id = academy_comments.post_id
        and p.locked = false
        and public.fn_user_can_access_space(auth.uid(), p.space_id)
    )
  );

drop policy if exists "academy_comments_update_own" on public.academy_comments;
create policy "academy_comments_update_own" on public.academy_comments for update
  using (author_user_id = auth.uid()) with check (author_user_id = auth.uid());

drop policy if exists "academy_comments_delete_own" on public.academy_comments;
create policy "academy_comments_delete_own" on public.academy_comments for delete
  using (author_user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_comments_admin_all" on public.academy_comments;
create policy "academy_comments_admin_all" on public.academy_comments for all
  using (public.fn_is_admin(auth.uid())) with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_reactions
------------------------------------------------------------
alter table public.academy_reactions enable row level security;

drop policy if exists "academy_reactions_select" on public.academy_reactions;
create policy "academy_reactions_select" on public.academy_reactions for select
  using (auth.uid() is not null);

drop policy if exists "academy_reactions_insert_own" on public.academy_reactions;
create policy "academy_reactions_insert_own" on public.academy_reactions for insert
  with check (user_id = auth.uid());

drop policy if exists "academy_reactions_delete_own" on public.academy_reactions;
create policy "academy_reactions_delete_own" on public.academy_reactions for delete
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_follows
------------------------------------------------------------
alter table public.academy_follows enable row level security;

drop policy if exists "academy_follows_select" on public.academy_follows;
create policy "academy_follows_select" on public.academy_follows for select
  using (auth.uid() is not null);

drop policy if exists "academy_follows_insert_own" on public.academy_follows;
create policy "academy_follows_insert_own" on public.academy_follows for insert
  with check (follower_user_id = auth.uid());

drop policy if exists "academy_follows_delete_own" on public.academy_follows;
create policy "academy_follows_delete_own" on public.academy_follows for delete
  using (follower_user_id = auth.uid());

------------------------------------------------------------
-- RLS: academy_reports
------------------------------------------------------------
alter table public.academy_reports enable row level security;

drop policy if exists "academy_reports_select_own" on public.academy_reports;
create policy "academy_reports_select_own" on public.academy_reports for select
  using (reporter_user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_reports_insert_own" on public.academy_reports;
create policy "academy_reports_insert_own" on public.academy_reports for insert
  with check (reporter_user_id = auth.uid());

drop policy if exists "academy_reports_admin_all" on public.academy_reports;
create policy "academy_reports_admin_all" on public.academy_reports for all
  using (public.fn_is_admin(auth.uid())) with check (public.fn_is_admin(auth.uid()));
