-- 0010_crm_expansion.sql
-- Expansão do CRM: clients, opportunities, campaigns, invoices/payments,
-- automation rules e views analíticas. Mantém o padrão das migrações 0002/0003.

------------------------------------------------------------
-- Enums
------------------------------------------------------------
create type public.client_status as enum ('ativo', 'inativo', 'churn', 'prospect');

create type public.opportunity_stage as enum (
  'descoberta', 'qualificacao', 'proposta', 'negociacao', 'ganho', 'perdido'
);

create type public.campaign_channel as enum (
  'instagram', 'meta_ads', 'google_ads', 'tiktok', 'email',
  'whatsapp', 'evento', 'indicacao', 'organico', 'outro'
);

create type public.campaign_status as enum ('rascunho', 'ativa', 'pausada', 'encerrada');

create type public.invoice_status as enum (
  'rascunho', 'emitida', 'paga', 'parcial', 'vencida', 'cancelada'
);

create type public.payment_method as enum (
  'pix', 'boleto', 'cartao_credito', 'cartao_debito', 'transferencia', 'dinheiro', 'outro'
);

create type public.automation_trigger as enum (
  'lead_created', 'lead_status_change', 'stage_change',
  'quote_accepted', 'invoice_overdue', 'inactivity', 'cron'
);

------------------------------------------------------------
-- CLIENTS (promoção lead → cliente)
------------------------------------------------------------
create table public.clients (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid references public.leads(id) on delete set null,
  unit            public.business_unit not null,
  legal_name      text,
  display_name    text not null,
  document        text,                       -- CPF/CNPJ
  email           citext,
  phone           text,
  city            text,
  state           text,
  status          public.client_status not null default 'ativo',
  owner_id        uuid references auth.users(id) on delete set null,
  lifetime_value_brl numeric(12,2) not null default 0,
  first_purchase_at  timestamptz,
  last_purchase_at   timestamptz,
  details         jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index on public.clients(unit);
create index on public.clients(status);
create index on public.clients(owner_id);
create index on public.clients(email);
create unique index clients_document_uniq on public.clients(document) where document is not null;
create trigger clients_updated_at before update on public.clients
  for each row execute function public.set_updated_at();

------------------------------------------------------------
-- OPPORTUNITIES (negócios concretos no funil comercial)
------------------------------------------------------------
create table public.opportunities (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid references public.leads(id) on delete set null,
  client_id       uuid references public.clients(id) on delete set null,
  owner_id        uuid references auth.users(id) on delete set null,
  unit            public.business_unit not null,
  title           text not null,
  stage           public.opportunity_stage not null default 'descoberta',
  amount_brl      numeric(12,2) not null default 0,
  probability     int not null default 0 check (probability between 0 and 100),
  expected_close  date,
  closed_at       timestamptz,
  lost_reason     text,
  source          text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  check (lead_id is not null or client_id is not null)
);
create index on public.opportunities(stage);
create index on public.opportunities(owner_id);
create index on public.opportunities(lead_id);
create index on public.opportunities(client_id);
create index on public.opportunities(expected_close);
create trigger opportunities_updated_at before update on public.opportunities
  for each row execute function public.set_updated_at();

------------------------------------------------------------
-- CAMPAIGNS + tracking
------------------------------------------------------------
create table public.campaigns (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  channel         public.campaign_channel not null,
  status          public.campaign_status not null default 'rascunho',
  unit            public.business_unit,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  start_at        date,
  end_at          date,
  budget_brl      numeric(12,2),
  spent_brl       numeric(12,2) not null default 0,
  goal            text,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index on public.campaigns(status);
create index on public.campaigns(channel);
create index on public.campaigns(utm_campaign);
create trigger campaigns_updated_at before update on public.campaigns
  for each row execute function public.set_updated_at();

-- Atribuição lead ↔ campanha (multi-touch)
create table public.campaign_leads (
  id              uuid primary key default gen_random_uuid(),
  campaign_id     uuid not null references public.campaigns(id) on delete cascade,
  lead_id         uuid not null references public.leads(id) on delete cascade,
  touch_type      text not null default 'first',   -- first, last, assisted
  attributed_value_brl numeric(12,2),
  created_at      timestamptz not null default now(),
  unique (campaign_id, lead_id, touch_type)
);
create index on public.campaign_leads(campaign_id);
create index on public.campaign_leads(lead_id);

------------------------------------------------------------
-- INVOICES + ITEMS + PAYMENTS (financeiro)
------------------------------------------------------------
create table public.invoices (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references public.clients(id) on delete restrict,
  quote_id        uuid references public.quotes(id) on delete set null,
  opportunity_id  uuid references public.opportunities(id) on delete set null,
  number          text unique,                  -- número de fatura interno/NF
  status          public.invoice_status not null default 'rascunho',
  issue_date      date not null default current_date,
  due_date        date,
  subtotal_brl    numeric(12,2) not null default 0,
  discount_brl    numeric(12,2) not null default 0,
  tax_brl         numeric(12,2) not null default 0,
  total_brl       numeric(12,2) not null default 0,
  paid_brl        numeric(12,2) not null default 0,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index on public.invoices(client_id);
create index on public.invoices(status);
create index on public.invoices(due_date);
create trigger invoices_updated_at before update on public.invoices
  for each row execute function public.set_updated_at();

create table public.invoice_items (
  id              uuid primary key default gen_random_uuid(),
  invoice_id      uuid not null references public.invoices(id) on delete cascade,
  label           text not null,
  description     text,
  quantity        int not null default 1,
  unit_price_brl  numeric(10,2) not null,
  total_brl       numeric(12,2) generated always as (quantity * unit_price_brl) stored,
  position        int not null default 0,
  created_at      timestamptz not null default now()
);
create index on public.invoice_items(invoice_id, position);

create table public.payments (
  id              uuid primary key default gen_random_uuid(),
  invoice_id      uuid not null references public.invoices(id) on delete cascade,
  client_id       uuid not null references public.clients(id) on delete restrict,
  method          public.payment_method not null,
  amount_brl      numeric(12,2) not null check (amount_brl > 0),
  paid_at         timestamptz not null default now(),
  reference       text,                          -- txid Pix, NSU cartão, etc.
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);
create index on public.payments(invoice_id);
create index on public.payments(client_id);
create index on public.payments(paid_at desc);

------------------------------------------------------------
-- AUTOMATION RULES
------------------------------------------------------------
create table public.automation_rules (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  description     text,
  trigger_type    public.automation_trigger not null,
  conditions      jsonb not null default '{}'::jsonb,   -- ex: {"status":"qualificado"}
  actions         jsonb not null default '[]'::jsonb,   -- ex: [{"type":"send_email",...}]
  active          boolean not null default true,
  last_run_at     timestamptz,
  run_count       int not null default 0,
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index on public.automation_rules(trigger_type) where active = true;
create trigger automation_rules_updated_at before update on public.automation_rules
  for each row execute function public.set_updated_at();

create table public.automation_runs (
  id              uuid primary key default gen_random_uuid(),
  rule_id         uuid not null references public.automation_rules(id) on delete cascade,
  lead_id         uuid references public.leads(id) on delete set null,
  client_id       uuid references public.clients(id) on delete set null,
  status          text not null default 'success',     -- success | error | skipped
  payload         jsonb,
  error           text,
  ran_at          timestamptz not null default now()
);
create index on public.automation_runs(rule_id, ran_at desc);

------------------------------------------------------------
-- ANALYTICS VIEWS (para dashboards)
------------------------------------------------------------
create or replace view public.v_leads_funnel as
select
  segment,
  status,
  count(*)::int as total,
  date_trunc('month', created_at)::date as month
from public.leads
group by segment, status, date_trunc('month', created_at);

create or replace view public.v_opportunities_pipeline as
select
  unit,
  stage,
  count(*)::int as total,
  coalesce(sum(amount_brl), 0) as amount_total_brl,
  coalesce(sum(amount_brl * probability / 100.0), 0) as weighted_brl
from public.opportunities
where closed_at is null
group by unit, stage;

create or replace view public.v_revenue_monthly as
select
  date_trunc('month', p.paid_at)::date as month,
  c.unit,
  count(distinct p.invoice_id)::int as invoices_paid,
  coalesce(sum(p.amount_brl), 0) as revenue_brl
from public.payments p
join public.clients c on c.id = p.client_id
group by date_trunc('month', p.paid_at), c.unit;

create or replace view public.v_campaign_performance as
select
  ca.id,
  ca.slug,
  ca.name,
  ca.channel,
  ca.spent_brl,
  count(distinct cl.lead_id)::int as leads_count,
  coalesce(sum(cl.attributed_value_brl), 0) as attributed_revenue_brl,
  case when ca.spent_brl > 0
       then round(coalesce(sum(cl.attributed_value_brl), 0) / ca.spent_brl, 2)
       else null end as roas
from public.campaigns ca
left join public.campaign_leads cl on cl.campaign_id = ca.id
group by ca.id;

------------------------------------------------------------
-- RLS
------------------------------------------------------------
alter table public.clients            enable row level security;
alter table public.opportunities      enable row level security;
alter table public.campaigns          enable row level security;
alter table public.campaign_leads     enable row level security;
alter table public.invoices           enable row level security;
alter table public.invoice_items      enable row level security;
alter table public.payments           enable row level security;
alter table public.automation_rules   enable row level security;
alter table public.automation_runs    enable row level security;

-- Padrão: staff faz tudo; owner enxerga o que é seu.
create policy "clients_staff_all" on public.clients for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "clients_owner_select" on public.clients for select to authenticated
  using (owner_id = auth.uid());

create policy "opps_staff_all" on public.opportunities for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "opps_owner_all" on public.opportunities for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "campaigns_staff_all" on public.campaigns for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "campaign_leads_staff_all" on public.campaign_leads for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
-- Permite atribuição anônima vinda do formulário público (UTM tracking).
create policy "campaign_leads_public_insert" on public.campaign_leads for insert to anon, authenticated
  with check (true);

create policy "invoices_staff_all" on public.invoices for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "invoice_items_staff_all" on public.invoice_items for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "payments_staff_all" on public.payments for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "automation_rules_staff_all" on public.automation_rules for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "automation_runs_staff_all" on public.automation_runs for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
