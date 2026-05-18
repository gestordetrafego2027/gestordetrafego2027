-- 0028_academy_course_structure.sql
-- House Mazzutti Academy — estrutura de cursos: módulos + aulas + recursos.
-- DEPENDS ON: 0024 (functions), 0027 (academy_products)

------------------------------------------------------------
-- Tabela: academy_modules
------------------------------------------------------------
create table if not exists public.academy_modules (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.academy_products(id) on delete cascade,
  order_index int not null default 0,
  title text not null check (length(title) between 2 and 200),
  summary text check (summary is null or length(summary) <= 1000),
  cover_url text,
  -- agregados (mantidos por trigger)
  lesson_count int not null default 0,
  duration_minutes int not null default 0,
  -- timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, order_index)
);

comment on table public.academy_modules is
  'Módulo de um curso. Cada módulo agrupa aulas (academy_lessons).';
comment on column public.academy_modules.product_id is
  'Curso ao qual o módulo pertence. Cascade: ao remover curso, módulos somem.';

create index if not exists idx_academy_modules_product
  on public.academy_modules(product_id, order_index);

drop trigger if exists tg_academy_modules_updated_at on public.academy_modules;
create trigger tg_academy_modules_updated_at
  before update on public.academy_modules
  for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Tabela: academy_lessons
------------------------------------------------------------
create table if not exists public.academy_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.academy_modules(id) on delete cascade,
  product_id uuid not null references public.academy_products(id) on delete cascade,
  order_index int not null default 0,
  title text not null check (length(title) between 2 and 200),
  subtitle text check (subtitle is null or length(subtitle) <= 280),
  type text not null check (type in ('video','text','quiz','live','download')),
  -- vídeo
  video_url text,
  video_provider text check (video_provider is null or video_provider in ('vimeo','youtube','mux','bunny','self')),
  duration_seconds int check (duration_seconds is null or duration_seconds >= 0),
  -- texto / markdown
  body_md text,
  -- live (referência futura)
  live_id uuid,
  -- acesso
  is_preview boolean not null default false,
  is_free_for_all boolean not null default false,
  -- agregados
  attachments_count int not null default 0,
  -- mídia auxiliar
  thumbnail_url text,
  -- timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, order_index)
);

comment on table public.academy_lessons is
  'Aula individual dentro de um módulo. product_id é denormalizado para RLS rápido.';
comment on column public.academy_lessons.is_preview is
  'TRUE = qualquer um pode assistir (mesmo não matriculado). Usado para teaser.';
comment on column public.academy_lessons.is_free_for_all is
  'TRUE = aula liberada gratuitamente (não exige matrícula nem publicação do curso).';

create index if not exists idx_academy_lessons_module
  on public.academy_lessons(module_id, order_index);
create index if not exists idx_academy_lessons_product
  on public.academy_lessons(product_id);
create index if not exists idx_academy_lessons_preview
  on public.academy_lessons(product_id) where is_preview = true;
create index if not exists idx_academy_lessons_type
  on public.academy_lessons(type);

drop trigger if exists tg_academy_lessons_updated_at on public.academy_lessons;
create trigger tg_academy_lessons_updated_at
  before update on public.academy_lessons
  for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Tabela: academy_lesson_resources
------------------------------------------------------------
create table if not exists public.academy_lesson_resources (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.academy_lessons(id) on delete cascade,
  kind text not null check (kind in ('pdf','link','code','image','slides','audio')),
  url text not null,
  label text not null check (length(label) between 1 and 200),
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_lesson_resources is
  'Anexos/recursos de uma aula (PDFs, links externos, slides, código, áudio).';

create index if not exists idx_academy_lesson_resources_lesson
  on public.academy_lesson_resources(lesson_id, order_index);

drop trigger if exists tg_academy_lesson_resources_updated_at on public.academy_lesson_resources;
create trigger tg_academy_lesson_resources_updated_at
  before update on public.academy_lesson_resources
  for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: fn_recalc_module_aggregates
-- Recalcula lesson_count e duration_minutes de um módulo.
------------------------------------------------------------
create or replace function public.fn_recalc_module_aggregates(p_module_id uuid)
returns void
language plpgsql
as $$
begin
  update public.academy_modules m
  set lesson_count = coalesce(s.cnt, 0),
      duration_minutes = coalesce(s.dur, 0)
  from (
    select count(*)::int as cnt,
           coalesce(round(sum(duration_seconds)::numeric / 60.0)::int, 0) as dur
    from public.academy_lessons
    where module_id = p_module_id
  ) s
  where m.id = p_module_id;
end;
$$;

------------------------------------------------------------
-- Função: fn_recalc_product_course_aggregates
-- Recalcula module_count e lesson_count de um curso.
------------------------------------------------------------
create or replace function public.fn_recalc_product_course_aggregates(p_product_id uuid)
returns void
language plpgsql
as $$
begin
  update public.academy_products p
  set module_count = coalesce(s.mc, 0),
      lesson_count = coalesce(s.lc, 0)
  from (
    select
      (select count(*)::int from public.academy_modules where product_id = p_product_id) as mc,
      (select count(*)::int from public.academy_lessons where product_id = p_product_id) as lc
  ) s
  where p.id = p_product_id;
end;
$$;

------------------------------------------------------------
-- Trigger: sincroniza agregados em modules e products
------------------------------------------------------------
create or replace function public.fn_tg_academy_lessons_sync()
returns trigger
language plpgsql
as $$
declare
  v_old_module uuid;
  v_new_module uuid;
  v_old_product uuid;
  v_new_product uuid;
begin
  if tg_op = 'INSERT' then
    perform public.fn_recalc_module_aggregates(new.module_id);
    perform public.fn_recalc_product_course_aggregates(new.product_id);
    return new;
  elsif tg_op = 'DELETE' then
    perform public.fn_recalc_module_aggregates(old.module_id);
    perform public.fn_recalc_product_course_aggregates(old.product_id);
    return old;
  else -- UPDATE
    v_old_module := old.module_id;
    v_new_module := new.module_id;
    v_old_product := old.product_id;
    v_new_product := new.product_id;
    perform public.fn_recalc_module_aggregates(v_new_module);
    if v_old_module is distinct from v_new_module then
      perform public.fn_recalc_module_aggregates(v_old_module);
    end if;
    perform public.fn_recalc_product_course_aggregates(v_new_product);
    if v_old_product is distinct from v_new_product then
      perform public.fn_recalc_product_course_aggregates(v_old_product);
    end if;
    return new;
  end if;
end;
$$;

drop trigger if exists tg_academy_lessons_sync on public.academy_lessons;
create trigger tg_academy_lessons_sync
  after insert or update or delete on public.academy_lessons
  for each row execute function public.fn_tg_academy_lessons_sync();

------------------------------------------------------------
-- Trigger: sincroniza products.module_count quando modules muda
------------------------------------------------------------
create or replace function public.fn_tg_academy_modules_sync()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    perform public.fn_recalc_product_course_aggregates(new.product_id);
    return new;
  elsif tg_op = 'DELETE' then
    perform public.fn_recalc_product_course_aggregates(old.product_id);
    return old;
  else
    if old.product_id is distinct from new.product_id then
      perform public.fn_recalc_product_course_aggregates(old.product_id);
      perform public.fn_recalc_product_course_aggregates(new.product_id);
    end if;
    return new;
  end if;
end;
$$;

drop trigger if exists tg_academy_modules_sync on public.academy_modules;
create trigger tg_academy_modules_sync
  after insert or update or delete on public.academy_modules
  for each row execute function public.fn_tg_academy_modules_sync();

------------------------------------------------------------
-- Trigger: mantém attachments_count em lessons
------------------------------------------------------------
create or replace function public.fn_tg_academy_lesson_resources_sync()
returns trigger
language plpgsql
as $$
declare
  v_lesson uuid;
begin
  v_lesson := coalesce(new.lesson_id, old.lesson_id);
  update public.academy_lessons
  set attachments_count = (
    select count(*)::int from public.academy_lesson_resources where lesson_id = v_lesson
  )
  where id = v_lesson;
  return coalesce(new, old);
end;
$$;

drop trigger if exists tg_academy_lesson_resources_sync on public.academy_lesson_resources;
create trigger tg_academy_lesson_resources_sync
  after insert or update or delete on public.academy_lesson_resources
  for each row execute function public.fn_tg_academy_lesson_resources_sync();

------------------------------------------------------------
-- RLS: academy_modules
------------------------------------------------------------
alter table public.academy_modules enable row level security;

drop policy if exists "academy_modules_select" on public.academy_modules;
create policy "academy_modules_select"
  on public.academy_modules
  for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (
      select 1 from public.academy_products p
      where p.id = academy_modules.product_id
        and (
          p.status = 'published'
          or p.author_id in (select a.id from public.academy_authors a where a.profile_id = auth.uid())
        )
    )
  );

drop policy if exists "academy_modules_admin_all" on public.academy_modules;
create policy "academy_modules_admin_all"
  on public.academy_modules
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

drop policy if exists "academy_modules_author_manage" on public.academy_modules;
create policy "academy_modules_author_manage"
  on public.academy_modules
  for all
  using (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_modules.product_id
        and a.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_modules.product_id
        and a.profile_id = auth.uid()
    )
  );

------------------------------------------------------------
-- RLS: academy_lessons
-- Regras:
--   - admin: tudo
--   - author do produto: tudo
--   - público: se produto publicado E (is_free_for_all OR is_preview)
--   - matriculado: se produto publicado E matrícula ativa
------------------------------------------------------------
alter table public.academy_lessons enable row level security;

drop policy if exists "academy_lessons_select" on public.academy_lessons;
create policy "academy_lessons_select"
  on public.academy_lessons
  for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_lessons.product_id
        and a.profile_id = auth.uid()
    )
    or (
      is_free_for_all = true
      and exists (
        select 1 from public.academy_products p
        where p.id = academy_lessons.product_id and p.status = 'published'
      )
    )
    or (
      is_preview = true
      and exists (
        select 1 from public.academy_products p
        where p.id = academy_lessons.product_id and p.status = 'published'
      )
    )
    or (
      auth.uid() is not null
      and public.fn_user_has_active_enrollment(auth.uid(), academy_lessons.product_id)
    )
  );

drop policy if exists "academy_lessons_admin_all" on public.academy_lessons;
create policy "academy_lessons_admin_all"
  on public.academy_lessons
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

drop policy if exists "academy_lessons_author_manage" on public.academy_lessons;
create policy "academy_lessons_author_manage"
  on public.academy_lessons
  for all
  using (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_lessons.product_id
        and a.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_lessons.product_id
        and a.profile_id = auth.uid()
    )
  );

------------------------------------------------------------
-- RLS: academy_lesson_resources
-- Mesmas regras de visibilidade da aula-pai.
------------------------------------------------------------
alter table public.academy_lesson_resources enable row level security;

drop policy if exists "academy_lesson_resources_select" on public.academy_lesson_resources;
create policy "academy_lesson_resources_select"
  on public.academy_lesson_resources
  for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (
      select 1 from public.academy_lessons l
      join public.academy_products p on p.id = l.product_id
      join public.academy_authors a on a.id = p.author_id
      where l.id = academy_lesson_resources.lesson_id
        and a.profile_id = auth.uid()
    )
    or exists (
      select 1 from public.academy_lessons l
      join public.academy_products p on p.id = l.product_id
      where l.id = academy_lesson_resources.lesson_id
        and p.status = 'published'
        and (
          l.is_free_for_all = true
          or l.is_preview = true
          or (auth.uid() is not null and public.fn_user_has_active_enrollment(auth.uid(), l.product_id))
        )
    )
  );

drop policy if exists "academy_lesson_resources_admin_all" on public.academy_lesson_resources;
create policy "academy_lesson_resources_admin_all"
  on public.academy_lesson_resources
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

drop policy if exists "academy_lesson_resources_author_manage" on public.academy_lesson_resources;
create policy "academy_lesson_resources_author_manage"
  on public.academy_lesson_resources
  for all
  using (
    exists (
      select 1 from public.academy_lessons l
      join public.academy_products p on p.id = l.product_id
      join public.academy_authors a on a.id = p.author_id
      where l.id = academy_lesson_resources.lesson_id
        and a.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.academy_lessons l
      join public.academy_products p on p.id = l.product_id
      join public.academy_authors a on a.id = p.author_id
      where l.id = academy_lesson_resources.lesson_id
        and a.profile_id = auth.uid()
    )
  );
