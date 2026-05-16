-- 0020_attachments_and_storage.sql
-- Bucket privado 'crm-assets' + tabela public.attachments com vinculo a
-- lead OU client. Anexos sao acessiveis apenas via signed URLs.
--
-- Aplicado em dev e prod via Supabase MCP em 2026-05-13.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'crm-assets', 'crm-assets', false, 10485760,
  array['image/png','image/jpeg','image/webp','image/gif','application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword','text/plain','text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
)
on conflict (id) do update
  set public = excluded.public, file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "crm_assets_staff_select" on storage.objects;
create policy "crm_assets_staff_select" on storage.objects
  for select to authenticated
  using (bucket_id = 'crm-assets' and public.is_staff());

drop policy if exists "crm_assets_staff_insert" on storage.objects;
create policy "crm_assets_staff_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'crm-assets' and public.is_staff());

drop policy if exists "crm_assets_staff_delete" on storage.objects;
create policy "crm_assets_staff_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'crm-assets' and public.is_staff());

create table if not exists public.attachments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  uploaded_by uuid references auth.users(id) on delete set null,
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  kind text not null default 'other',
  storage_path text not null unique,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  description text,
  check (lead_id is not null or client_id is not null)
);

create index if not exists attachments_lead_idx on public.attachments(lead_id);
create index if not exists attachments_client_idx on public.attachments(client_id);

alter table public.attachments enable row level security;

drop policy if exists "attachments_staff_select" on public.attachments;
create policy "attachments_staff_select" on public.attachments
  for select to authenticated
  using (public.is_staff() and (
    (lead_id is not null and exists(select 1 from public.leads l where l.id = lead_id)) or
    (client_id is not null and exists(select 1 from public.clients c where c.id = client_id))
  ));

drop policy if exists "attachments_staff_insert" on public.attachments;
create policy "attachments_staff_insert" on public.attachments
  for insert to authenticated
  with check (public.is_staff() and (
    (lead_id is not null and exists(select 1 from public.leads l where l.id = lead_id)) or
    (client_id is not null and exists(select 1 from public.clients c where c.id = client_id))
  ));

drop policy if exists "attachments_staff_delete" on public.attachments;
create policy "attachments_staff_delete" on public.attachments
  for delete to authenticated using (public.is_staff());
