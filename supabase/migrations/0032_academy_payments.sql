-- 0032_academy_payments.sql
-- House Mazzutti Academy — pagamentos + log de webhooks do Mercado Pago.
-- DEPENDS ON: 0024 (functions), 0031 (orders)

------------------------------------------------------------
-- Tabela: academy_payments
------------------------------------------------------------
create table if not exists public.academy_payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.academy_orders(id) on delete cascade,
  method academy_payment_method not null,
  status text not null default 'pending' check (status in ('pending','approved','authorized','in_process','in_mediation','rejected','cancelled','refunded','charged_back')),
  amount_cents int not null check (amount_cents >= 0),
  currency text not null default 'BRL' check (currency in ('BRL','USD')),
  -- Mercado Pago
  mp_payment_id text unique,
  mp_status text,
  mp_status_detail text,
  mp_payment_type text,
  installments int,
  -- pagamentos
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_amount_cents int check (refund_amount_cents is null or refund_amount_cents >= 0),
  -- payload
  gateway_response jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_payments is
  'Pagamentos vinculados a orders. Pode ter mais de um por order (retries, parciais).';

create index if not exists idx_academy_payments_order on public.academy_payments(order_id);
create index if not exists idx_academy_payments_status on public.academy_payments(status);
create index if not exists idx_academy_payments_mp_payment_id on public.academy_payments(mp_payment_id) where mp_payment_id is not null;
create index if not exists idx_academy_payments_created on public.academy_payments(created_at desc);

drop trigger if exists tg_academy_payments_updated_at on public.academy_payments;
create trigger tg_academy_payments_updated_at before update on public.academy_payments for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Tabela: academy_mp_webhooks
-- Log cru de webhooks do Mercado Pago. Idempotência por (topic, resource_id).
------------------------------------------------------------
create table if not exists public.academy_mp_webhooks (
  id uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  topic text not null,
  resource_id text not null,
  action text,
  payload jsonb not null,
  signature text,
  -- processamento
  processed_at timestamptz,
  processing_status text not null default 'pending' check (processing_status in ('pending','processing','done','error','ignored')),
  processing_attempts int not null default 0,
  error_message text,
  -- referência cruzada
  order_id uuid references public.academy_orders(id) on delete set null,
  payment_id uuid references public.academy_payments(id) on delete set null,
  unique (topic, resource_id, received_at)
);

comment on table public.academy_mp_webhooks is
  'Log de webhooks do Mercado Pago. Edge Function processa de pending → done.';

create index if not exists idx_academy_mp_webhooks_status on public.academy_mp_webhooks(processing_status) where processing_status in ('pending','error');
create index if not exists idx_academy_mp_webhooks_topic_resource on public.academy_mp_webhooks(topic, resource_id);
create index if not exists idx_academy_mp_webhooks_order on public.academy_mp_webhooks(order_id);

------------------------------------------------------------
-- RLS: academy_payments — só admin lê; aluno vê via order
------------------------------------------------------------
alter table public.academy_payments enable row level security;

drop policy if exists "academy_payments_select_own" on public.academy_payments;
create policy "academy_payments_select_own" on public.academy_payments for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (select 1 from public.academy_orders o where o.id = academy_payments.order_id and o.user_id = auth.uid())
  );

drop policy if exists "academy_payments_admin_all" on public.academy_payments;
create policy "academy_payments_admin_all" on public.academy_payments for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_mp_webhooks — só admin
------------------------------------------------------------
alter table public.academy_mp_webhooks enable row level security;

drop policy if exists "academy_mp_webhooks_admin_all" on public.academy_mp_webhooks;
create policy "academy_mp_webhooks_admin_all" on public.academy_mp_webhooks for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));
-- Webhooks são inseridos via service-role (Edge Function), bypass RLS.
