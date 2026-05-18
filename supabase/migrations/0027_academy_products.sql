-- 0027_academy_products.sql
-- House Mazzutti Academy — tabela central de produtos
-- (ebooks, cursos, mentorias, bundles, etc.)
-- DEPENDS ON: 0023 (enums), 0024 (functions), 0025 (profiles), 0026 (categories + authors)

------------------------------------------------------------
-- Tabela: academy_products
------------------------------------------------------------
create table if not exists public.academy_products (
  id uuid primary key default gen_random_uuid(),

  -- IDENTIDADE
  slug text not null unique,
  type academy_product_type not null,
  status academy_product_status not null default 'draft',
  level academy_product_level not null default 'todos',

  -- RELACIONAMENTOS
  category_id uuid references public.academy_categories(id) on delete restrict,
  business_unit business_unit not null,
  author_id uuid not null references public.academy_authors(id) on delete restrict,

  -- CONTEÚDO EDITORIAL
  title text not null check (length(title) between 3 and 200),
  subtitle text check (length(subtitle) <= 200),
  short_description text check (length(short_description) <= 280),
  long_description jsonb,
  highlights jsonb not null default '[]'::jsonb,
  requirements jsonb not null default '[]'::jsonb,
  target_audience jsonb,

  -- MÍDIA
  cover_url text not null,
  thumbnail_url text,
  gallery jsonb not null default '[]'::jsonb,
  trailer_video_url text,
  preview_file_url text,

  -- PREÇOS (em centavos, sempre integer)
  price_cents int not null check (price_cents >= 0),
  original_price_cents int check (
    original_price_cents is null or original_price_cents >= price_cents
  ),
  currency text not null default 'BRL' check (currency in ('BRL','USD')),

  -- MÉTRICAS DE CONTEÚDO
  duration_minutes int check (duration_minutes is null or duration_minutes >= 0),
  page_count int check (page_count is null or page_count >= 0),
  module_count int not null default 0,
  lesson_count int not null default 0,

  -- POLÍTICA DE ACESSO
  access_duration_days int check (
    access_duration_days is null or access_duration_days > 0
  ),
  max_devices int not null default 0 check (max_devices >= 0),

  -- DESTAQUE E SOCIAL PROOF
  featured boolean not null default false,
  featured_order int,
  bestseller boolean not null default false,
  new_release boolean not null default true,

  -- AGREGADOS (atualizados por triggers em migrations futuras)
  sales_count int not null default 0,
  views_count int not null default 0,
  avg_rating numeric(3,2) not null default 0 check (avg_rating between 0 and 5),
  rating_count int not null default 0,

  -- SEO
  seo_title text,
  seo_description text,
  seo_keywords text[],
  og_image_url text,

  -- CICLO DE VIDA
  published_at timestamptz,
  archived_at timestamptz,

  -- METADADOS LIVRES
  metadata jsonb not null default '{}'::jsonb,

  -- TIMESTAMPS
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- INTEGRIDADE CRUZADA
  check (status <> 'published' or published_at is not null),
  check (status <> 'archived'  or archived_at  is not null)
);

------------------------------------------------------------
-- Índices
------------------------------------------------------------
-- Acesso por slug (vitrine)
create index if not exists idx_academy_products_slug
  on public.academy_products(slug);

-- Filtros principais
create index if not exists idx_academy_products_status
  on public.academy_products(status);
create index if not exists idx_academy_products_type
  on public.academy_products(type);
create index if not exists idx_academy_products_business_unit
  on public.academy_products(business_unit);
create index if not exists idx_academy_products_category
  on public.academy_products(category_id);
create index if not exists idx_academy_products_author
  on public.academy_products(author_id);

-- Composto para listagem de catálogo (published + ordem por destaque/data)
create index if not exists idx_academy_products_catalog
  on public.academy_products(status, featured desc, published_at desc nulls last);

-- Composto para "novidades"
create index if not exists idx_academy_products_published_at
  on public.academy_products(published_at desc)
  where status = 'published';

-- Featured ordering
create index if not exists idx_academy_products_featured_order
  on public.academy_products(featured_order)
  where featured = true;

-- Busca textual full-text em português
create index if not exists idx_academy_products_fts
  on public.academy_products
  using gin (
    to_tsvector(
      'portuguese',
      coalesce(title,'') || ' ' ||
      coalesce(subtitle,'') || ' ' ||
      coalesce(short_description,'')
    )
  );

-- Busca fuzzy de título (autocomplete, "produtos parecidos com X")
create index if not exists idx_academy_products_title_trgm
  on public.academy_products
  using gin (title gin_trgm_ops);

-- Metadados arbitrários
create index if not exists idx_academy_products_metadata
  on public.academy_products using gin (metadata);

-- Keywords (filtros futuros)
create index if not exists idx_academy_products_keywords
  on public.academy_products using gin (seo_keywords);

------------------------------------------------------------
-- Trigger: updated_at
------------------------------------------------------------
drop trigger if exists tg_academy_products_updated_at on public.academy_products;
create trigger tg_academy_products_updated_at
  before update on public.academy_products
  for each row
  execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: auto-preenche published_at / archived_at conforme status
------------------------------------------------------------
create or replace function public.fn_academy_products_lifecycle()
returns trigger
language plpgsql
as $$
begin
  -- Ao publicar, registrar timestamp se ainda não tem
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;

  -- Ao arquivar, registrar timestamp se ainda não tem
  if new.status = 'archived' and new.archived_at is null then
    new.archived_at := now();
  end if;

  return new;
end;
$$;

comment on function public.fn_academy_products_lifecycle() is
  'Trigger BEFORE INSERT/UPDATE OF status: popula published_at/archived_at automaticamente.';

drop trigger if exists tg_academy_products_lifecycle on public.academy_products;
create trigger tg_academy_products_lifecycle
  before insert or update of status on public.academy_products
  for each row
  execute function public.fn_academy_products_lifecycle();

------------------------------------------------------------
-- RLS
------------------------------------------------------------
alter table public.academy_products enable row level security;

-- SELECT público apenas para produtos publicados
drop policy if exists "academy_products_select_published" on public.academy_products;
create policy "academy_products_select_published"
  on public.academy_products
  for select
  using (
    status = 'published'
    or public.fn_is_admin(auth.uid())
  );

-- Admin pode tudo
drop policy if exists "academy_products_admin_all" on public.academy_products;
create policy "academy_products_admin_all"
  on public.academy_products
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

-- Author pode VER seus próprios produtos (inclusive draft/coming_soon)
drop policy if exists "academy_products_author_manage_own" on public.academy_products;
create policy "academy_products_author_manage_own"
  on public.academy_products
  for select
  using (
    author_id in (
      select a.id from public.academy_authors a where a.profile_id = auth.uid()
    )
  );

-- Author pode EDITAR seus próprios produtos
drop policy if exists "academy_products_author_update_own" on public.academy_products;
create policy "academy_products_author_update_own"
  on public.academy_products
  for update
  using (
    author_id in (
      select a.id from public.academy_authors a where a.profile_id = auth.uid()
    )
  )
  with check (
    author_id in (
      select a.id from public.academy_authors a where a.profile_id = auth.uid()
    )
  );

------------------------------------------------------------
-- Comments
------------------------------------------------------------
comment on table public.academy_products is
  'Tabela central da Academy. Cada linha é um produto vendável: ebook, course, mentorship, community_access, live_event, bundle ou subscription.';

comment on column public.academy_products.slug is
  'Identificador único legível usado em URLs públicas /academy/[type]/[slug].';

comment on column public.academy_products.type is
  'Tipo do produto. Define o comportamento de consumo (ebook → reader, course → player, etc.).';

comment on column public.academy_products.long_description is
  'Conteúdo rico em JSON (TipTap/Lexical). Estrutura definida pela camada de aplicação.';

comment on column public.academy_products.price_cents is
  'Preço em centavos (integer). Nunca usar float/decimal para dinheiro. R$ 47,00 = 4700.';

comment on column public.academy_products.original_price_cents is
  'Preço "de" para exibir "de R$ X por R$ Y". Sempre >= price_cents.';

comment on column public.academy_products.access_duration_days is
  'Duração do acesso em dias após compra. NULL = acesso vitalício.';

comment on column public.academy_products.metadata is
  'Campo livre para extensões por tipo: { pages_avg_read_time, course_modules_summary, etc. }.';
