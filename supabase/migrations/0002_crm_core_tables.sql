-- 0002_crm_core_tables.sql
-- Schema central do CRM House Mazzutti.
-- Modelo: lead único + interesse em N serviços, com respostas em JSONB.

------------------------------------------------------------
-- Trigger reutilizável para updated_at
------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

------------------------------------------------------------
-- Enums
------------------------------------------------------------
create type public.business_unit as enum ('agencia', 'studio', 'produtora');

create type public.lead_segment as enum (
  'talents',     -- alunos, afiliadas, agenciados, talentos, fornecedores, parceiros
  'commercial'   -- cliente_agencia, cliente_produtora, cliente_studio
);

create type public.lead_type as enum (
  'aluno_curso',
  'afiliada',
  'agenciado_casting',
  'talento',
  'fornecedor',
  'parceiro',
  'cliente_agencia',
  'cliente_produtora',
  'cliente_studio'
);

create type public.lead_status as enum (
  'novo',
  'em_contato',
  'qualificado',
  'proposta_enviada',
  'negociacao',
  'ganho',
  'perdido',
  'arquivado'
);

create type public.activity_type as enum (
  'call', 'email', 'whatsapp', 'meeting', 'note', 'task',
  'status_change', 'stage_change', 'quote_sent', 'system'
);

create type public.quote_status as enum (
  'rascunho', 'enviado', 'aceito', 'recusado', 'expirado'
);

------------------------------------------------------------
-- Catálogo de serviços
------------------------------------------------------------
create table public.services (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  unit        public.business_unit not null,
  name        text not null,
  description text,
  -- Perguntas do questionário UX em JSON (renderizado pelo front via Zod).
  questions_schema jsonb not null default '[]'::jsonb,
  position    int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index on public.services(unit, position);
create trigger services_updated_at before update on public.services
  for each row execute function public.set_updated_at();

-- Tiers/pacotes de cada serviço (Essencial/Estratégico/Premium, etc.)
create table public.service_packages (
  id          uuid primary key default gen_random_uuid(),
  service_id  uuid not null references public.services(id) on delete cascade,
  slug        text not null,
  name        text not null,           -- Essencial, Estratégico, Premium, Oficial Plan…
  description text,
  price_brl   numeric(10,2),           -- preço base
  duration    text,                    -- "3h", "Até 2h", "2+ meses"
  includes    jsonb not null default '[]'::jsonb,  -- bullets do que está incluído
  position    int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (service_id, slug)
);
create index on public.service_packages(service_id, position);
create trigger service_packages_updated_at before update on public.service_packages
  for each row execute function public.set_updated_at();

-- Add-ons opcionais (vídeo, book impresso, polaroid, etc.)
create table public.service_addons (
  id          uuid primary key default gen_random_uuid(),
  service_id  uuid references public.services(id) on delete cascade,  -- null = add-on global
  slug        text not null,
  name        text not null,
  description text,
  price_brl   numeric(10,2),
  position    int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);
create unique index service_addons_service_slug_uniq
  on public.service_addons(service_id, slug) where service_id is not null;
create unique index service_addons_global_slug_uniq
  on public.service_addons(slug) where service_id is null;
create index on public.service_addons(service_id);

-- Catálogo de profissionais avulsos (Produtora — quote builder)
create table public.team_resource_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,           -- "Direção & Criação", "Audiovisual"…
  position    int not null default 0
);

create table public.team_resources (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.team_resource_categories(id) on delete restrict,
  slug        text not null,
  role        text not null,           -- "Diretor Criativo", "Modelo New Face"…
  description text,
  base_price_brl  numeric(10,2),
  final_price_brl numeric(10,2),
  target_audience text,                -- "Empresas", "Marcas"…
  position    int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  unique (category_id, slug)
);
create index on public.team_resources(category_id);

------------------------------------------------------------
-- Pipeline
------------------------------------------------------------
create table public.pipeline_stages (
  id          uuid primary key default gen_random_uuid(),
  segment     public.lead_segment not null,
  slug        text not null,
  name        text not null,
  position    int not null,
  is_won      boolean not null default false,
  is_lost     boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (segment, slug)
);
create index on public.pipeline_stages(segment, position);

------------------------------------------------------------
-- Tags
------------------------------------------------------------
create table public.tags (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  color       text,
  created_at  timestamptz not null default now()
);

------------------------------------------------------------
-- Leads
------------------------------------------------------------
create table public.leads (
  id          uuid primary key default gen_random_uuid(),
  segment     public.lead_segment not null,
  lead_type   public.lead_type not null,
  name        text not null,
  email       citext,
  phone       text,
  city        text,
  source      text,                                  -- site_form, indicacao, instagram…
  status      public.lead_status not null default 'novo',
  stage_id    uuid references public.pipeline_stages(id) on delete set null,
  owner_id    uuid references auth.users(id) on delete set null,
  details     jsonb not null default '{}'::jsonb,    -- campos específicos do lead_type
  utm         jsonb,                                 -- {source, medium, campaign, term, content}
  notes       text,                                  -- nota inicial
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index on public.leads(segment);
create index on public.leads(lead_type);
create index on public.leads(status);
create index on public.leads(stage_id);
create index on public.leads(owner_id);
create index on public.leads(email);
create index on public.leads using gin(details);
create trigger leads_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

-- Junção lead ↔ serviço (lead pode ter interesse em múltiplos serviços)
create table public.lead_service_interests (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  service_id  uuid not null references public.services(id) on delete restrict,
  package_id  uuid references public.service_packages(id) on delete set null,
  addons      jsonb not null default '[]'::jsonb,     -- array de service_addons.id ou slug
  answers     jsonb not null default '{}'::jsonb,     -- respostas do questionário UX
  priority    int not null default 0,                 -- ordem de interesse
  created_at  timestamptz not null default now(),
  unique (lead_id, service_id)
);
create index on public.lead_service_interests(lead_id);
create index on public.lead_service_interests(service_id);

-- Tags do lead (many-to-many)
create table public.lead_tags (
  lead_id     uuid not null references public.leads(id) on delete cascade,
  tag_id      uuid not null references public.tags(id) on delete cascade,
  primary key (lead_id, tag_id)
);

------------------------------------------------------------
-- Activities (timeline) e Notes
------------------------------------------------------------
create table public.activities (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  author_id   uuid references auth.users(id) on delete set null,
  type        public.activity_type not null,
  title       text not null,
  body        text,
  metadata    jsonb,
  scheduled_at timestamptz,
  completed_at timestamptz,
  created_at  timestamptz not null default now()
);
create index on public.activities(lead_id, created_at desc);

create table public.notes (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  author_id   uuid references auth.users(id) on delete set null,
  body        text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index on public.notes(lead_id, created_at desc);
create trigger notes_updated_at before update on public.notes
  for each row execute function public.set_updated_at();

------------------------------------------------------------
-- Quotes (orçamentos)
------------------------------------------------------------
create table public.quotes (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete restrict,
  owner_id    uuid references auth.users(id) on delete set null,
  status      public.quote_status not null default 'rascunho',
  title       text not null,
  notes       text,
  subtotal_brl numeric(12,2) not null default 0,
  discount_brl numeric(12,2) not null default 0,
  total_brl   numeric(12,2) not null default 0,
  valid_until date,
  sent_at     timestamptz,
  accepted_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index on public.quotes(lead_id);
create index on public.quotes(status);
create trigger quotes_updated_at before update on public.quotes
  for each row execute function public.set_updated_at();

create type public.quote_item_kind as enum ('package', 'addon', 'team_resource', 'custom');

create table public.quote_items (
  id          uuid primary key default gen_random_uuid(),
  quote_id    uuid not null references public.quotes(id) on delete cascade,
  kind        public.quote_item_kind not null,
  reference_id uuid,                       -- id em service_packages / service_addons / team_resources
  label       text not null,
  description text,
  quantity    int not null default 1,
  unit_price_brl numeric(10,2) not null,
  total_brl   numeric(12,2) generated always as (quantity * unit_price_brl) stored,
  position    int not null default 0,
  created_at  timestamptz not null default now()
);
create index on public.quote_items(quote_id, position);
