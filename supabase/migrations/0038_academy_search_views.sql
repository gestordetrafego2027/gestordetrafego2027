-- 0038_academy_search_views.sql
-- House Mazzutti Academy — busca full-text + materialized view do catálogo.
-- DEPENDS ON: 0027 (products), 0026 (authors, categories), 0037 (reviews)

------------------------------------------------------------
-- Coluna: academy_products.search_tsv
------------------------------------------------------------
alter table public.academy_products
  add column if not exists search_tsv tsvector;

create index if not exists idx_academy_products_search_tsv
  on public.academy_products using gin (search_tsv);

------------------------------------------------------------
-- Função: gera tsvector consolidado
------------------------------------------------------------
create or replace function public.fn_academy_products_tsv()
returns trigger
language plpgsql
as $$
begin
  new.search_tsv :=
    setweight(to_tsvector('portuguese', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('portuguese', coalesce(new.subtitle, '')), 'B') ||
    setweight(to_tsvector('portuguese', coalesce(new.short_description, '')), 'C') ||
    setweight(to_tsvector('portuguese', coalesce(array_to_string(new.seo_keywords, ' '), '')), 'B') ||
    setweight(to_tsvector('portuguese', coalesce(new.slug, '')), 'D');
  return new;
end;
$$;

drop trigger if exists tg_academy_products_tsv on public.academy_products;
create trigger tg_academy_products_tsv
  before insert or update of title, subtitle, short_description, seo_keywords, slug
  on public.academy_products
  for each row execute function public.fn_academy_products_tsv();

-- Backfill da coluna em registros existentes
update public.academy_products
set search_tsv =
  setweight(to_tsvector('portuguese', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('portuguese', coalesce(subtitle, '')), 'B') ||
  setweight(to_tsvector('portuguese', coalesce(short_description, '')), 'C') ||
  setweight(to_tsvector('portuguese', coalesce(array_to_string(seo_keywords, ' '), '')), 'B') ||
  setweight(to_tsvector('portuguese', coalesce(slug, '')), 'D')
where search_tsv is null;

------------------------------------------------------------
-- Materialized View: mv_academy_catalog
-- Catálogo otimizado para landing/listagem pública.
------------------------------------------------------------
drop materialized view if exists public.mv_academy_catalog;
create materialized view public.mv_academy_catalog as
select
  p.id,
  p.slug,
  p.type,
  p.level,
  p.business_unit,
  p.title,
  p.subtitle,
  p.short_description,
  p.cover_url,
  p.thumbnail_url,
  p.price_cents,
  p.original_price_cents,
  p.currency,
  p.duration_minutes,
  p.page_count,
  p.module_count,
  p.lesson_count,
  p.featured,
  p.featured_order,
  p.bestseller,
  p.new_release,
  p.sales_count,
  p.avg_rating,
  p.rating_count,
  p.published_at,
  c.id   as category_id,
  c.slug as category_slug,
  c.name as category_name,
  a.id   as author_id,
  a.slug as author_slug,
  coalesce(a.pen_name, pr.full_name) as author_name,
  a.avatar_override_url,
  pr.avatar_url as author_profile_avatar
from public.academy_products p
left join public.academy_categories c on c.id = p.category_id
left join public.academy_authors a on a.id = p.author_id
left join public.profiles pr on pr.id = a.profile_id
where p.status = 'published';

create unique index if not exists uq_mv_academy_catalog_id on public.mv_academy_catalog(id);
create index if not exists idx_mv_academy_catalog_type on public.mv_academy_catalog(type);
create index if not exists idx_mv_academy_catalog_bu on public.mv_academy_catalog(business_unit);
create index if not exists idx_mv_academy_catalog_featured on public.mv_academy_catalog(featured desc, featured_order, published_at desc);
create index if not exists idx_mv_academy_catalog_category on public.mv_academy_catalog(category_id);
create index if not exists idx_mv_academy_catalog_author on public.mv_academy_catalog(author_id);

comment on materialized view public.mv_academy_catalog is
  'Catálogo público otimizado. Atualizado via fn_refresh_academy_catalog().';

------------------------------------------------------------
-- Função: fn_refresh_academy_catalog
-- Refresh concurrent — pode rodar enquanto a view é consultada.
------------------------------------------------------------
create or replace function public.fn_refresh_academy_catalog()
returns void
language plpgsql
security definer
as $$
begin
  refresh materialized view concurrently public.mv_academy_catalog;
exception when feature_not_supported then
  -- Sem unique idx ainda; fallback non-concurrent
  refresh materialized view public.mv_academy_catalog;
end;
$$;

comment on function public.fn_refresh_academy_catalog() is
  'Refresh da MV de catálogo. Chamar via cron a cada 5-10 min ou após mudanças relevantes.';

------------------------------------------------------------
-- View: v_academy_search
-- Consulta direta com ranking — sem cache.
------------------------------------------------------------
create or replace view public.v_academy_search as
select
  p.id,
  p.slug,
  p.type,
  p.title,
  p.subtitle,
  p.short_description,
  p.cover_url,
  p.thumbnail_url,
  p.price_cents,
  p.currency,
  p.business_unit,
  p.avg_rating,
  p.rating_count,
  p.featured,
  p.published_at,
  p.search_tsv
from public.academy_products p
where p.status = 'published';

comment on view public.v_academy_search is
  'View pública para busca full-text. Use ts_rank(search_tsv, websearch_to_tsquery(...)) para ordenar.';
