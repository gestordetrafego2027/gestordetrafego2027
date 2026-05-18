-- 0030_academy_bundles_subscriptions.sql
-- House Mazzutti Academy — bundles e assinaturas.
-- DEPENDS ON: 0024 (functions), 0025 (profiles), 0027 (academy_products)

------------------------------------------------------------
-- Extensão de products: flag included_in_subscription
------------------------------------------------------------
alter table public.academy_products
  add column if not exists included_in_subscription boolean not null default false;

comment on column public.academy_products.included_in_subscription is
  'TRUE = produto acessível por assinantes ativos sem compra avulsa.';

create index if not exists idx_academy_products_in_subscription
  on public.academy_products(included_in_subscription)
  where included_in_subscription = true;

------------------------------------------------------------
-- Tabela: academy_bundle_items
-- Bundles contêm outros produtos (mas nunca outro bundle).
------------------------------------------------------------
create table if not exists public.academy_bundle_items (
  id uuid primary key default gen_random_uuid(),
  bundle_product_id uuid not null references public.academy_products(id) on delete cascade,
  child_product_id uuid not null references public.academy_products(id) on delete restrict,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  unique (bundle_product_id, child_product_id),
  check (bundle_product_id <> child_product_id)
);

comment on table public.academy_bundle_items is
  'Composição de um bundle: produtos filhos incluídos quando o pai é comprado.';

create index if not exists idx_academy_bundle_items_bundle
  on public.academy_bundle_items(bundle_product_id, order_index);
create index if not exists idx_academy_bundle_items_child
  on public.academy_bundle_items(child_product_id);

------------------------------------------------------------
-- Trigger: valida tipos do bundle e do filho
------------------------------------------------------------
create or replace function public.fn_tg_validate_bundle_item()
returns trigger
language plpgsql
as $$
declare
  v_parent_type academy_product_type;
  v_child_type  academy_product_type;
begin
  select type into v_parent_type from public.academy_products where id = new.bundle_product_id;
  select type into v_child_type  from public.academy_products where id = new.child_product_id;

  if v_parent_type is null then
    raise exception 'Bundle pai (%) não existe em academy_products.', new.bundle_product_id;
  end if;
  if v_parent_type <> 'bundle' then
    raise exception 'bundle_product_id deve apontar para um produto type=bundle (atual: %).', v_parent_type;
  end if;
  if v_child_type = 'bundle' then
    raise exception 'Bundle não pode conter outro bundle (child=%).', new.child_product_id;
  end if;
  return new;
end;
$$;

drop trigger if exists tg_academy_bundle_items_validate on public.academy_bundle_items;
create trigger tg_academy_bundle_items_validate
  before insert or update on public.academy_bundle_items
  for each row execute function public.fn_tg_validate_bundle_item();

------------------------------------------------------------
-- Tabela: academy_subscription_plans
-- Planos de assinatura vinculados a um produto type=subscription.
------------------------------------------------------------
create table if not exists public.academy_subscription_plans (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.academy_products(id) on delete cascade,
  slug text unique not null,
  name text not null check (length(name) between 2 and 120),
  interval text not null check (interval in ('monthly','quarterly','yearly')),
  price_cents int not null check (price_cents >= 0),
  currency text not null default 'BRL' check (currency in ('BRL','USD')),
  trial_days int not null default 0 check (trial_days >= 0),
  mp_preapproval_plan_id text,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, interval)
);

comment on table public.academy_subscription_plans is
  'Planos de assinatura. Cada produto type=subscription pode ter múltiplos planos (mensal/trimestral/anual).';
comment on column public.academy_subscription_plans.mp_preapproval_plan_id is
  'ID do plano pré-aprovado no Mercado Pago (preapproval_plan).';

create index if not exists idx_academy_subscription_plans_product
  on public.academy_subscription_plans(product_id);
create index if not exists idx_academy_subscription_plans_active
  on public.academy_subscription_plans(active) where active = true;

drop trigger if exists tg_academy_subscription_plans_updated_at on public.academy_subscription_plans;
create trigger tg_academy_subscription_plans_updated_at
  before update on public.academy_subscription_plans
  for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Trigger: garante que plan.product_id é de type=subscription
------------------------------------------------------------
create or replace function public.fn_tg_validate_subscription_plan_product()
returns trigger
language plpgsql
as $$
declare
  v_type academy_product_type;
begin
  select type into v_type from public.academy_products where id = new.product_id;
  if v_type is null then
    raise exception 'product_id % não existe.', new.product_id;
  end if;
  if v_type <> 'subscription' then
    raise exception 'subscription_plans.product_id deve apontar para produto type=subscription (atual: %).', v_type;
  end if;
  return new;
end;
$$;

drop trigger if exists tg_academy_subscription_plans_validate on public.academy_subscription_plans;
create trigger tg_academy_subscription_plans_validate
  before insert or update of product_id on public.academy_subscription_plans
  for each row execute function public.fn_tg_validate_subscription_plan_product();

------------------------------------------------------------
-- Tabela: academy_subscriptions
-- Assinaturas ativas por usuário.
------------------------------------------------------------
create table if not exists public.academy_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.academy_subscription_plans(id) on delete restrict,
  status text not null default 'active' check (status in ('trialing','active','past_due','paused','cancelled','expired')),
  started_at timestamptz not null default now(),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancelled_at timestamptz,
  paused_at timestamptz,
  trial_ends_at timestamptz,
  mp_preapproval_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_subscriptions is
  'Assinaturas dos usuários. Status driveado por webhooks do Mercado Pago.';
comment on column public.academy_subscriptions.mp_preapproval_id is
  'ID da preapproval criada no Mercado Pago para essa assinatura.';

create index if not exists idx_academy_subscriptions_user
  on public.academy_subscriptions(user_id);
create index if not exists idx_academy_subscriptions_plan
  on public.academy_subscriptions(plan_id);
create index if not exists idx_academy_subscriptions_status
  on public.academy_subscriptions(status);
create index if not exists idx_academy_subscriptions_active_user
  on public.academy_subscriptions(user_id) where status in ('trialing','active');

drop trigger if exists tg_academy_subscriptions_updated_at on public.academy_subscriptions;
create trigger tg_academy_subscriptions_updated_at
  before update on public.academy_subscriptions
  for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: fn_user_has_active_subscription
------------------------------------------------------------
create or replace function public.fn_user_has_active_subscription(p_user_id uuid)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.academy_subscriptions
    where user_id = p_user_id
      and status in ('trialing','active')
      and (current_period_end is null or current_period_end > now())
  );
$$;

comment on function public.fn_user_has_active_subscription(uuid) is
  'True se o usuário tem alguma assinatura ativa (trialing ou active) não expirada.';

------------------------------------------------------------
-- RLS: academy_bundle_items
------------------------------------------------------------
alter table public.academy_bundle_items enable row level security;

drop policy if exists "academy_bundle_items_select_public" on public.academy_bundle_items;
create policy "academy_bundle_items_select_public"
  on public.academy_bundle_items
  for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (
      select 1 from public.academy_products p
      where p.id = academy_bundle_items.bundle_product_id
        and p.status = 'published'
    )
    or exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_bundle_items.bundle_product_id
        and a.profile_id = auth.uid()
    )
  );

drop policy if exists "academy_bundle_items_admin_all" on public.academy_bundle_items;
create policy "academy_bundle_items_admin_all"
  on public.academy_bundle_items
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

drop policy if exists "academy_bundle_items_author_manage" on public.academy_bundle_items;
create policy "academy_bundle_items_author_manage"
  on public.academy_bundle_items
  for all
  using (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_bundle_items.bundle_product_id
        and a.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_bundle_items.bundle_product_id
        and a.profile_id = auth.uid()
    )
  );

------------------------------------------------------------
-- RLS: academy_subscription_plans
------------------------------------------------------------
alter table public.academy_subscription_plans enable row level security;

drop policy if exists "academy_subscription_plans_select_public" on public.academy_subscription_plans;
create policy "academy_subscription_plans_select_public"
  on public.academy_subscription_plans
  for select
  using (
    active = true
    or public.fn_is_admin(auth.uid())
  );

drop policy if exists "academy_subscription_plans_admin_all" on public.academy_subscription_plans;
create policy "academy_subscription_plans_admin_all"
  on public.academy_subscription_plans
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_subscriptions
------------------------------------------------------------
alter table public.academy_subscriptions enable row level security;

drop policy if exists "academy_subscriptions_select_own" on public.academy_subscriptions;
create policy "academy_subscriptions_select_own"
  on public.academy_subscriptions
  for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_subscriptions_admin_all" on public.academy_subscriptions;
create policy "academy_subscriptions_admin_all"
  on public.academy_subscriptions
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

-- INSERT/UPDATE: aplicação faz via service-role (webhook MP)
