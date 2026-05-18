-- 0026_academy_categories_authors.sql
-- House Mazzutti Academy — categorias (hierárquicas) + autores.

------------------------------------------------------------
-- Tabela: academy_categories
------------------------------------------------------------
create table if not exists public.academy_categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.academy_categories(id) on delete restrict,
  slug text not null,
  name text not null check (length(name) between 2 and 80),
  description text check (length(description) <= 500),
  icon_name text,
  cover_url text,
  business_unit business_unit,
  order_index int not null default 0,
  active boolean not null default true,
  -- SEO
  meta_title text,
  meta_description text,
  og_image_url text,
  -- agregados (atualizados via trigger em futuras migrations)
  product_count int not null default 0,
  -- timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- regras de integridade
  unique (parent_id, slug),
  check (id <> parent_id)
);

comment on table public.academy_categories is
  'Categorias hierárquicas do catálogo da Academy. Suporta até 5 níveis de profundidade.';
comment on column public.academy_categories.parent_id is
  'NULL = categoria raiz. Hierarquia validada por trigger para evitar ciclos.';
comment on column public.academy_categories.business_unit is
  'Reusa enum do CRM. Permite filtrar catálogo por Studio/Produtora/Agência.';

create index if not exists idx_academy_categories_parent
  on public.academy_categories(parent_id);
create index if not exists idx_academy_categories_slug
  on public.academy_categories(slug);
create index if not exists idx_academy_categories_business_unit
  on public.academy_categories(business_unit);
create index if not exists idx_academy_categories_active_order
  on public.academy_categories(active, order_index);

drop trigger if exists tg_academy_categories_updated_at on public.academy_categories;
create trigger tg_academy_categories_updated_at
  before update on public.academy_categories
  for each row
  execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: fn_check_category_no_cycle
-- Sobe pela cadeia de parent_id e garante:
--   1) não retorna ao próprio id (ciclo)
--   2) não excede profundidade máxima de 5 níveis
------------------------------------------------------------
create or replace function public.fn_check_category_no_cycle()
returns trigger
language plpgsql
as $$
declare
  v_current uuid := new.parent_id;
  v_depth int := 0;
  v_max_depth constant int := 5;
begin
  while v_current is not null loop
    if v_current = new.id then
      raise exception 'Hierarquia cíclica detectada em academy_categories (id=%).', new.id;
    end if;
    v_depth := v_depth + 1;
    if v_depth > v_max_depth then
      raise exception 'Profundidade máxima de % níveis excedida em academy_categories.', v_max_depth;
    end if;
    select parent_id into v_current
    from public.academy_categories
    where id = v_current;
  end loop;
  return new;
end;
$$;

comment on function public.fn_check_category_no_cycle() is
  'Trigger function: impede ciclos e limita hierarquia de academy_categories a 5 níveis.';

drop trigger if exists tg_academy_categories_no_cycle on public.academy_categories;
create trigger tg_academy_categories_no_cycle
  before insert or update of parent_id on public.academy_categories
  for each row
  when (new.parent_id is not null)
  execute function public.fn_check_category_no_cycle();

------------------------------------------------------------
-- Tabela: academy_authors
-- Estende profiles (1:1 opcional) para usuários que são autores.
------------------------------------------------------------
create table if not exists public.academy_authors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete restrict,
  -- identidade pública como autor
  pen_name text,
  headline text,
  bio_long text,
  avatar_override_url text,
  -- credenciais e links
  credentials jsonb not null default '[]'::jsonb,
  social_links jsonb not null default '{}'::jsonb,
  -- slug público
  slug text unique not null,
  -- SEO
  meta_title text,
  meta_description text,
  og_image_url text,
  -- flags
  featured boolean not null default false,
  active boolean not null default true,
  -- timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_authors is
  'Estende profiles com identidade editorial. 1:1 com profile_id.';
comment on column public.academy_authors.pen_name is
  'Nome editorial público. Se NULL, usar full_name do profile.';

create index if not exists idx_academy_authors_profile
  on public.academy_authors(profile_id);
create index if not exists idx_academy_authors_slug
  on public.academy_authors(slug);
create index if not exists idx_academy_authors_featured
  on public.academy_authors(featured, active);

drop trigger if exists tg_academy_authors_updated_at on public.academy_authors;
create trigger tg_academy_authors_updated_at
  before update on public.academy_authors
  for each row
  execute function public.fn_set_updated_at();

------------------------------------------------------------
-- RLS: academy_categories
------------------------------------------------------------
alter table public.academy_categories enable row level security;

drop policy if exists "academy_categories_select_public" on public.academy_categories;
create policy "academy_categories_select_public"
  on public.academy_categories
  for select
  using (active = true or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_categories_admin_all" on public.academy_categories;
create policy "academy_categories_admin_all"
  on public.academy_categories
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- RLS: academy_authors
------------------------------------------------------------
alter table public.academy_authors enable row level security;

drop policy if exists "academy_authors_select_public" on public.academy_authors;
create policy "academy_authors_select_public"
  on public.academy_authors
  for select
  using (active = true or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_authors_admin_all" on public.academy_authors;
create policy "academy_authors_admin_all"
  on public.academy_authors
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));
