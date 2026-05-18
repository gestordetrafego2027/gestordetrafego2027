-- 0037_academy_reviews_notifications.sql
-- House Mazzutti Academy — reviews + notificações in-app.
-- DEPENDS ON: 0023 (enums), 0024 (functions), 0025 (profiles), 0027 (products), 0033 (enrollments)

------------------------------------------------------------
-- Tabela: academy_reviews
------------------------------------------------------------
create table if not exists public.academy_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.academy_products(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  title text check (title is null or length(title) <= 200),
  body text check (body is null or length(body) <= 2000),
  status academy_review_status not null default 'pending',
  helpful_count int not null default 0,
  reply_text text,
  replied_at timestamptz,
  replied_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

comment on table public.academy_reviews is
  'Avaliações de produtos. UNIQUE (user, product). status=approved alimenta agregados em products.';

create index if not exists idx_academy_reviews_product on public.academy_reviews(product_id);
create index if not exists idx_academy_reviews_user on public.academy_reviews(user_id);
create index if not exists idx_academy_reviews_status on public.academy_reviews(status);
create index if not exists idx_academy_reviews_approved on public.academy_reviews(product_id, rating desc) where status = 'approved';

drop trigger if exists tg_academy_reviews_updated_at on public.academy_reviews;
create trigger tg_academy_reviews_updated_at before update on public.academy_reviews for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: recalcula avg_rating e rating_count em products
------------------------------------------------------------
create or replace function public.fn_recalc_product_rating(p_product_id uuid)
returns void
language plpgsql
as $$
declare
  v_avg numeric(3,2);
  v_count int;
begin
  select coalesce(round(avg(rating)::numeric, 2), 0), count(*)::int
    into v_avg, v_count
  from public.academy_reviews
  where product_id = p_product_id and status = 'approved';
  update public.academy_products
  set avg_rating = v_avg, rating_count = v_count
  where id = p_product_id;
end;
$$;

------------------------------------------------------------
-- Trigger: sincroniza rating ao mudar review
------------------------------------------------------------
create or replace function public.fn_tg_academy_reviews_sync()
returns trigger language plpgsql as $$
declare v_product uuid;
begin
  v_product := coalesce(new.product_id, old.product_id);
  perform public.fn_recalc_product_rating(v_product);
  return coalesce(new, old);
end; $$;

drop trigger if exists tg_academy_reviews_sync on public.academy_reviews;
create trigger tg_academy_reviews_sync after insert or update or delete on public.academy_reviews for each row execute function public.fn_tg_academy_reviews_sync();

------------------------------------------------------------
-- Tabela: academy_notifications (in-app)
------------------------------------------------------------
create table if not exists public.academy_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type academy_notification_type not null,
  title text not null check (length(title) between 1 and 200),
  body text check (body is null or length(body) <= 1000),
  link_url text,
  icon_name text,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  archived_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.academy_notifications is
  'Notificações in-app. Emails/push são jobs externos lendo daqui.';

create index if not exists idx_academy_notifications_user on public.academy_notifications(user_id, created_at desc);
create index if not exists idx_academy_notifications_unread on public.academy_notifications(user_id) where read_at is null and archived_at is null;
create index if not exists idx_academy_notifications_type on public.academy_notifications(type);

------------------------------------------------------------
-- RLS: academy_reviews
------------------------------------------------------------
alter table public.academy_reviews enable row level security;

-- SELECT: aprovadas (público) + próprias + admin
drop policy if exists "academy_reviews_select" on public.academy_reviews;
create policy "academy_reviews_select" on public.academy_reviews for select using (
  status = 'approved'
  or user_id = auth.uid()
  or public.fn_is_admin(auth.uid())
);

-- INSERT: usuário precisa ter matrícula ativa no produto
drop policy if exists "academy_reviews_insert_own" on public.academy_reviews;
create policy "academy_reviews_insert_own" on public.academy_reviews for insert
  with check (
    user_id = auth.uid()
    and public.fn_user_has_active_enrollment(auth.uid(), product_id)
  );

drop policy if exists "academy_reviews_update_own" on public.academy_reviews;
create policy "academy_reviews_update_own" on public.academy_reviews for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "academy_reviews_delete_own" on public.academy_reviews;
create policy "academy_reviews_delete_own" on public.academy_reviews for delete
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_reviews_admin_all" on public.academy_reviews;
create policy "academy_reviews_admin_all" on public.academy_reviews for all
  using (public.fn_is_admin(auth.uid())) with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_notifications
------------------------------------------------------------
alter table public.academy_notifications enable row level security;

drop policy if exists "academy_notifications_select_own" on public.academy_notifications;
create policy "academy_notifications_select_own" on public.academy_notifications for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_notifications_update_own" on public.academy_notifications;
create policy "academy_notifications_update_own" on public.academy_notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "academy_notifications_admin_all" on public.academy_notifications;
create policy "academy_notifications_admin_all" on public.academy_notifications for all
  using (public.fn_is_admin(auth.uid())) with check (public.fn_is_admin(auth.uid()));
-- INSERT é feito por service-role / triggers do sistema.
