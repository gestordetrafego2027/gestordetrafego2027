-- 0029_academy_ebooks.sql
-- House Mazzutti Academy — arquivos e capítulos de ebooks.
-- DEPENDS ON: 0024 (functions), 0027 (academy_products)

------------------------------------------------------------
-- Tabela: academy_ebook_files
-- Arquivos baixáveis (PDF/EPUB/MOBI). Download via signed URL na app.
------------------------------------------------------------
create table if not exists public.academy_ebook_files (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.academy_products(id) on delete cascade,
  format text not null check (format in ('pdf','epub','mobi','azw3')),
  language text not null default 'pt-BR',
  version text not null default '1.0',
  file_url text not null,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes >= 0),
  pages int check (pages is null or pages >= 0),
  checksum_sha256 text,
  is_default boolean not null default true,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_ebook_files is
  'Arquivos baixáveis dos ebooks. NUNCA exposto via SELECT público — só admin/autor; aluno recebe signed URL via Edge Function.';
comment on column public.academy_ebook_files.is_default is
  'TRUE = arquivo default para esse (product_id, format). Único por par.';
comment on column public.academy_ebook_files.is_active is
  'FALSE = versão antiga retida para histórico/auditoria.';

create index if not exists idx_academy_ebook_files_product
  on public.academy_ebook_files(product_id);
create index if not exists idx_academy_ebook_files_active
  on public.academy_ebook_files(product_id, format) where is_active = true;

-- Apenas UM arquivo default por (product, format)
create unique index if not exists uq_academy_ebook_files_default
  on public.academy_ebook_files(product_id, format)
  where is_default = true;

drop trigger if exists tg_academy_ebook_files_updated_at on public.academy_ebook_files;
create trigger tg_academy_ebook_files_updated_at
  before update on public.academy_ebook_files
  for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Tabela: academy_ebook_chapters
-- Sumário (opcional) para exibir no preview público do ebook.
------------------------------------------------------------
create table if not exists public.academy_ebook_chapters (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.academy_products(id) on delete cascade,
  order_index int not null default 0,
  title text not null check (length(title) between 2 and 200),
  summary text check (summary is null or length(summary) <= 1000),
  pages_start int check (pages_start is null or pages_start >= 0),
  pages_end int check (pages_end is null or pages_end >= 0),
  is_preview boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, order_index),
  check (pages_end is null or pages_start is null or pages_end >= pages_start)
);

comment on table public.academy_ebook_chapters is
  'Sumário do ebook. Capítulos com is_preview=true aparecem no preview público.';

create index if not exists idx_academy_ebook_chapters_product
  on public.academy_ebook_chapters(product_id, order_index);

drop trigger if exists tg_academy_ebook_chapters_updated_at on public.academy_ebook_chapters;
create trigger tg_academy_ebook_chapters_updated_at
  before update on public.academy_ebook_chapters
  for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- RLS: academy_ebook_files
-- Apenas admin e autor dono podem ler diretamente.
-- Alunos baixam via Edge Function (signed URL) — não via SELECT.
------------------------------------------------------------
alter table public.academy_ebook_files enable row level security;

drop policy if exists "academy_ebook_files_select_admin_author" on public.academy_ebook_files;
create policy "academy_ebook_files_select_admin_author"
  on public.academy_ebook_files
  for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_ebook_files.product_id
        and a.profile_id = auth.uid()
    )
  );

drop policy if exists "academy_ebook_files_admin_all" on public.academy_ebook_files;
create policy "academy_ebook_files_admin_all"
  on public.academy_ebook_files
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

drop policy if exists "academy_ebook_files_author_manage" on public.academy_ebook_files;
create policy "academy_ebook_files_author_manage"
  on public.academy_ebook_files
  for all
  using (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_ebook_files.product_id
        and a.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_ebook_files.product_id
        and a.profile_id = auth.uid()
    )
  );

------------------------------------------------------------
-- RLS: academy_ebook_chapters
-- Público se produto publicado E (preview ou matriculado); admin/autor podem tudo.
------------------------------------------------------------
alter table public.academy_ebook_chapters enable row level security;

drop policy if exists "academy_ebook_chapters_select" on public.academy_ebook_chapters;
create policy "academy_ebook_chapters_select"
  on public.academy_ebook_chapters
  for select
  using (
    public.fn_is_admin(auth.uid())
    or exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_ebook_chapters.product_id
        and a.profile_id = auth.uid()
    )
    or (
      is_preview = true
      and exists (
        select 1 from public.academy_products p
        where p.id = academy_ebook_chapters.product_id
          and p.status = 'published'
      )
    )
    or (
      auth.uid() is not null
      and public.fn_user_has_active_enrollment(auth.uid(), academy_ebook_chapters.product_id)
    )
  );

drop policy if exists "academy_ebook_chapters_admin_all" on public.academy_ebook_chapters;
create policy "academy_ebook_chapters_admin_all"
  on public.academy_ebook_chapters
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

drop policy if exists "academy_ebook_chapters_author_manage" on public.academy_ebook_chapters;
create policy "academy_ebook_chapters_author_manage"
  on public.academy_ebook_chapters
  for all
  using (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_ebook_chapters.product_id
        and a.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.academy_products p
      join public.academy_authors a on a.id = p.author_id
      where p.id = academy_ebook_chapters.product_id
        and a.profile_id = auth.uid()
    )
  );
