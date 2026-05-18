-- 0031_academy_orders.sql
-- House Mazzutti Academy — cupons, pedidos, itens de pedido, redemptions.
-- DEPENDS ON: 0023 (enums), 0024 (functions), 0025 (profiles), 0027 (academy_products)

------------------------------------------------------------
-- Tabela: academy_coupons
------------------------------------------------------------
create table if not exists public.academy_coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  type academy_coupon_type not null,
  value int not null check (value > 0),
  min_order_cents int not null default 0 check (min_order_cents >= 0),
  max_discount_cents int check (max_discount_cents is null or max_discount_cents >= 0),
  usage_limit int check (usage_limit is null or usage_limit > 0),
  usage_count int not null default 0 check (usage_count >= 0),
  per_user_limit int check (per_user_limit is null or per_user_limit > 0),
  valid_from timestamptz,
  valid_until timestamptz,
  applies_to jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_until is null or valid_from is null or valid_until >= valid_from)
);

comment on table public.academy_coupons is
  'Cupons de desconto. applies_to: { product_ids:[], category_ids:[], product_types:[] } — null/{} = qualquer produto.';
comment on column public.academy_coupons.type is
  'percentage = value em % (1-100); fixed_amount = value em centavos.';

create index if not exists idx_academy_coupons_code on public.academy_coupons(code);
create index if not exists idx_academy_coupons_active on public.academy_coupons(active) where active = true;

drop trigger if exists tg_academy_coupons_updated_at on public.academy_coupons;
create trigger tg_academy_coupons_updated_at before update on public.academy_coupons for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Tabela: academy_orders
------------------------------------------------------------
create table if not exists public.academy_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references public.profiles(id) on delete restrict,
  status academy_order_status not null default 'pending',
  subtotal_cents int not null default 0 check (subtotal_cents >= 0),
  discount_cents int not null default 0 check (discount_cents >= 0),
  total_cents int not null default 0 check (total_cents >= 0),
  currency text not null default 'BRL' check (currency in ('BRL','USD')),
  coupon_id uuid references public.academy_coupons(id) on delete set null,
  payment_method academy_payment_method,
  -- Mercado Pago
  mp_preference_id text,
  mp_payment_id text,
  mp_external_reference text,
  -- billing snapshot
  billing_name text,
  billing_email citext,
  billing_cpf text,
  billing_phone text,
  billing_address jsonb,
  -- timing
  paid_at timestamptz,
  cancelled_at timestamptz,
  refunded_at timestamptz,
  expires_at timestamptz,
  -- audit
  ip_address inet,
  user_agent text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_orders is
  'Pedidos da Academy. order_number é exposto ao usuário (recibos).';
comment on column public.academy_orders.mp_external_reference is
  'Referência enviada ao MP para reconciliação (geralmente order_id ou hash).';

create index if not exists idx_academy_orders_user on public.academy_orders(user_id);
create index if not exists idx_academy_orders_status on public.academy_orders(status);
create index if not exists idx_academy_orders_created_at on public.academy_orders(created_at desc);
create index if not exists idx_academy_orders_mp_payment on public.academy_orders(mp_payment_id) where mp_payment_id is not null;
create index if not exists idx_academy_orders_mp_preference on public.academy_orders(mp_preference_id) where mp_preference_id is not null;

drop trigger if exists tg_academy_orders_updated_at on public.academy_orders;
create trigger tg_academy_orders_updated_at before update on public.academy_orders for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: gera order_number sequencial (HM-AC-YYYYMMDD-XXXX)
------------------------------------------------------------
create or replace function public.fn_academy_generate_order_number()
returns trigger
language plpgsql
as $$
declare
  v_count int;
begin
  if new.order_number is null or new.order_number = '' then
    select count(*) + 1 into v_count
    from public.academy_orders
    where created_at::date = current_date;
    new.order_number := 'HM-AC-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(v_count::text, 4, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists tg_academy_orders_order_number on public.academy_orders;
create trigger tg_academy_orders_order_number before insert on public.academy_orders for each row execute function public.fn_academy_generate_order_number();

------------------------------------------------------------
-- Trigger: timestamps de ciclo de vida
------------------------------------------------------------
create or replace function public.fn_academy_orders_lifecycle()
returns trigger language plpgsql as $$
begin
  if new.status = 'paid' and new.paid_at is null then new.paid_at := now(); end if;
  if new.status = 'cancelled' and new.cancelled_at is null then new.cancelled_at := now(); end if;
  if new.status = 'refunded' and new.refunded_at is null then new.refunded_at := now(); end if;
  return new;
end;
$$;

drop trigger if exists tg_academy_orders_lifecycle on public.academy_orders;
create trigger tg_academy_orders_lifecycle before insert or update of status on public.academy_orders for each row execute function public.fn_academy_orders_lifecycle();

------------------------------------------------------------
-- Tabela: academy_order_items
------------------------------------------------------------
create table if not exists public.academy_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.academy_orders(id) on delete cascade,
  product_id uuid not null references public.academy_products(id) on delete restrict,
  unit_price_cents int not null check (unit_price_cents >= 0),
  quantity int not null default 1 check (quantity > 0),
  discount_cents int not null default 0 check (discount_cents >= 0),
  subtotal_cents int not null check (subtotal_cents >= 0),
  -- snapshot do produto no momento da compra (resistente a mudanças futuras)
  snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

comment on table public.academy_order_items is
  'Itens de um pedido. snapshot captura title/price/slug no momento da compra.';

create index if not exists idx_academy_order_items_order on public.academy_order_items(order_id);
create index if not exists idx_academy_order_items_product on public.academy_order_items(product_id);

------------------------------------------------------------
-- Tabela: academy_coupon_redemptions
------------------------------------------------------------
create table if not exists public.academy_coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references public.academy_coupons(id) on delete restrict,
  order_id uuid not null references public.academy_orders(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete restrict,
  discount_cents int not null check (discount_cents >= 0),
  redeemed_at timestamptz not null default now(),
  unique (coupon_id, order_id)
);

create index if not exists idx_academy_coupon_redemptions_coupon on public.academy_coupon_redemptions(coupon_id);
create index if not exists idx_academy_coupon_redemptions_user on public.academy_coupon_redemptions(user_id);
create index if not exists idx_academy_coupon_redemptions_order on public.academy_coupon_redemptions(order_id);

------------------------------------------------------------
-- Trigger: incrementa coupons.usage_count ao inserir redemption
------------------------------------------------------------
create or replace function public.fn_tg_academy_coupon_redeem()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.academy_coupons set usage_count = usage_count + 1 where id = new.coupon_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.academy_coupons set usage_count = greatest(usage_count - 1, 0) where id = old.coupon_id;
    return old;
  end if;
  return null;
end; $$;

drop trigger if exists tg_academy_coupon_redemptions_count on public.academy_coupon_redemptions;
create trigger tg_academy_coupon_redemptions_count after insert or delete on public.academy_coupon_redemptions for each row execute function public.fn_tg_academy_coupon_redeem();

------------------------------------------------------------
-- RLS: academy_coupons
------------------------------------------------------------
alter table public.academy_coupons enable row level security;

drop policy if exists "academy_coupons_admin_all" on public.academy_coupons;
create policy "academy_coupons_admin_all" on public.academy_coupons for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

-- Validação pública de cupom é feita por RPC SECURITY DEFINER (a ser criada na app).

------------------------------------------------------------
-- RLS: academy_orders
------------------------------------------------------------
alter table public.academy_orders enable row level security;

drop policy if exists "academy_orders_select_own" on public.academy_orders;
create policy "academy_orders_select_own" on public.academy_orders for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_orders_insert_own" on public.academy_orders;
create policy "academy_orders_insert_own" on public.academy_orders for insert
  with check (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_orders_admin_all" on public.academy_orders;
create policy "academy_orders_admin_all" on public.academy_orders for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

-- UPDATE de status é feito por service-role (webhooks MP).

------------------------------------------------------------
-- RLS: academy_order_items
------------------------------------------------------------
alter table public.academy_order_items enable row level security;

drop policy if exists "academy_order_items_select_own" on public.academy_order_items;
create policy "academy_order_items_select_own" on public.academy_order_items for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (select 1 from public.academy_orders o where o.id = academy_order_items.order_id and o.user_id = auth.uid())
  );

drop policy if exists "academy_order_items_admin_all" on public.academy_order_items;
create policy "academy_order_items_admin_all" on public.academy_order_items for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_coupon_redemptions
------------------------------------------------------------
alter table public.academy_coupon_redemptions enable row level security;

drop policy if exists "academy_coupon_redemptions_select_own" on public.academy_coupon_redemptions;
create policy "academy_coupon_redemptions_select_own" on public.academy_coupon_redemptions for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_coupon_redemptions_admin_all" on public.academy_coupon_redemptions;
create policy "academy_coupon_redemptions_admin_all" on public.academy_coupon_redemptions for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));
