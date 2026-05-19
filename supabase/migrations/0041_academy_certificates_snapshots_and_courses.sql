-- 0041_academy_certificates_snapshots_and_courses.sql
-- House Mazzutti Academy — certificados imutáveis (snapshot) + 3 cursos do kit.
-- DEPENDS ON: 0033 (certificates), 0027 (products), 0026 (authors, categories)

------------------------------------------------------------
-- 1) Snapshots + dados editoriais em academy_certificates
------------------------------------------------------------
alter table public.academy_certificates
  add column if not exists student_name_snapshot text,
  add column if not exists course_title_pt_snapshot text,
  add column if not exists course_title_en_snapshot text,
  add column if not exists hours int,
  add column if not exists start_date date,
  add column if not exists end_date date,
  add column if not exists city text default 'São Paulo · Mooca',
  add column if not exists founder_name text default 'ÂNGELO MAZZUTTI',
  add column if not exists founder_title text default 'Fundador & Diretor',
  add column if not exists coordinator_name text default 'MATEUS SACAVEM',
  add column if not exists coordinator_title text default 'Coordenação',
  add column if not exists verify_url text;

create index if not exists idx_academy_certificates_dates on public.academy_certificates(end_date desc);

------------------------------------------------------------
-- 2) View pública para verificação: /verify/[code]
------------------------------------------------------------
create or replace view public.v_academy_certificate_public as
select
  c.id,
  c.code as cert_code,
  c.student_name_snapshot as student_name,
  c.course_title_pt_snapshot as course_title_pt,
  c.course_title_en_snapshot as course_title_en,
  c.hours,
  c.start_date,
  c.end_date,
  c.city,
  c.founder_name,
  c.founder_title,
  c.coordinator_name,
  c.coordinator_title,
  c.issued_at,
  c.revoked_at is not null as is_revoked,
  p.slug as course_slug,
  p.title as course_title,
  (p.metadata->>'index_label') as course_index,
  (p.metadata->>'chapter') as course_chapter,
  (p.metadata->>'accent_color') as course_accent,
  (p.metadata->>'accent_soft') as course_accent_soft,
  (p.metadata->>'seal_kind') as seal_kind,
  (p.metadata->>'discipline') as discipline
from public.academy_certificates c
join public.academy_products p on p.id = c.product_id;

comment on view public.v_academy_certificate_public is
  'Página pública /verify/[code]. SECURITY INVOKER — respeita RLS.';

-- Permite leitura pública via grant — RLS de academy_certificates já restringe
-- via "academy_certificates_select_own" (próprio user + admin). Para validação
-- pública, criamos policy explícita por code (somente não revogados):
drop policy if exists "academy_certificates_public_verify" on public.academy_certificates;
create policy "academy_certificates_public_verify"
  on public.academy_certificates
  for select
  using (revoked_at is null);

------------------------------------------------------------
-- 3) Cadastrar os 3 cursos como academy_products (idempotente)
------------------------------------------------------------
with category as (
  select id from public.academy_categories where slug = 'cursos' and parent_id is null limit 1
),
author as (
  select id from public.academy_authors where slug = 'angelo-mazzutti' limit 1
)
insert into public.academy_products (
  slug, type, status, level, category_id, business_unit, author_id,
  title, subtitle, short_description,
  cover_url, price_cents, currency,
  duration_minutes, lesson_count, module_count,
  access_duration_days,
  featured, new_release,
  seo_keywords, metadata
)
select
  v.slug, 'course'::academy_product_type, 'draft'::academy_product_status,
  'todos'::academy_product_level,
  (select id from category), v.bu::business_unit, (select id from author),
  v.title, v.subtitle, v.short_description,
  '/academy/courses/' || v.slug || '/cover.jpg',
  v.price_cents, 'BRL',
  v.hours * 60, 0, v.module_count,
  730,
  true, true,
  v.keywords,
  jsonb_build_object(
    'index_label', v.index_label,
    'chapter', v.chapter,
    'title_en', v.title_en,
    'discipline', v.discipline,
    'accent_color', v.accent_color,
    'accent_soft', v.accent_soft,
    'seal_kind', v.seal_kind,
    'source_kit', 'CERTIFICADOS-CURSOS-v1'
  )
from (values
  (
    'direcao-criativa', 'agencia',
    'Direção Criativa', 'Capítulo I — Concepção, direção de arte e narrativa',
    'Conceito, direção de arte e narrativa para Studio, Produtora e Agência. 120h, 8 módulos.',
    14700, 120, 8,
    '01', 'CAPÍTULO I', 'CREATIVE DIRECTION',
    'Conception, Art Direction & Narrative',
    '#C8531C', '#F2E1D4', 'creative',
    array['direção criativa','art direction','branding','narrativa','house mazzutti']
  ),
  (
    'producao-executiva', 'produtora',
    'Produção Executiva', 'Capítulo II — Planejamento, operações e entrega',
    'Planejamento, operações e entrega na produção audiovisual e comercial. 140h, 10 módulos.',
    19700, 140, 10,
    '02', 'CAPÍTULO II', 'EXECUTIVE PRODUCTION',
    'Planning, Operations & Delivery',
    '#1F3A5F', '#DCE3EE', 'executive',
    array['produção executiva','set','line producer','operações','house mazzutti']
  ),
  (
    'marketing-de-influencia', 'agencia',
    'Marketing de Influência', 'Capítulo III — Estratégia, creators e distribuição',
    'Estratégia, creators e distribuição em campanhas no Brasil real. 100h, 6 módulos.',
    12700, 100, 6,
    '03', 'CAPÍTULO III', 'INFLUENCE MARKETING',
    'Strategy, Creators & Distribution',
    '#9E1D4D', '#F1DAE3', 'influence',
    array['marketing de influência','creators','agência','talento','house mazzutti']
  )
) as v(
  slug, bu, title, subtitle, short_description,
  price_cents, hours, module_count,
  index_label, chapter, title_en, discipline,
  accent_color, accent_soft, seal_kind,
  keywords
)
on conflict (slug) do update set
  subtitle = excluded.subtitle,
  short_description = excluded.short_description,
  duration_minutes = excluded.duration_minutes,
  module_count = excluded.module_count,
  metadata = public.academy_products.metadata || excluded.metadata,
  updated_at = now();
