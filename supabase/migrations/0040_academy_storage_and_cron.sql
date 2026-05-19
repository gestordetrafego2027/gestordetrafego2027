-- 0040_academy_storage_and_cron.sql
-- House Mazzutti Academy — bucket privado para ebooks + policies + cron de refresh.
-- DEPENDS ON: 0038 (mv_academy_catalog)

------------------------------------------------------------
-- Bucket privado: academy-ebooks
------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'academy-ebooks',
  'academy-ebooks',
  false,
  524288000, -- 500 MB por arquivo
  array['application/pdf','application/epub+zip','application/x-mobipocket-ebook','application/vnd.amazon.ebook']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

------------------------------------------------------------
-- Bucket privado: academy-media (capas, trailers, thumbnails — público em leitura)
------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'academy-media',
  'academy-media',
  true,
  104857600, -- 100 MB
  array['image/jpeg','image/png','image/webp','image/avif','image/gif','video/mp4','video/webm']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

------------------------------------------------------------
-- Bucket privado: academy-videos (aulas — privado, signed URL)
------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'academy-videos',
  'academy-videos',
  false,
  5368709120, -- 5 GB
  array['video/mp4','video/webm','video/quicktime','application/x-mpegURL']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

------------------------------------------------------------
-- Policies de storage para academy-ebooks (privado, signed URL via edge fn)
------------------------------------------------------------
drop policy if exists "academy_ebooks_admin_all" on storage.objects;
create policy "academy_ebooks_admin_all"
  on storage.objects
  for all
  using (bucket_id = 'academy-ebooks' and public.fn_is_admin(auth.uid()))
  with check (bucket_id = 'academy-ebooks' and public.fn_is_admin(auth.uid()));

-- Nenhuma policy de SELECT pública: usuários só baixam via signed URL gerada por edge function.

------------------------------------------------------------
-- Policies de storage para academy-videos (privado)
------------------------------------------------------------
drop policy if exists "academy_videos_admin_all" on storage.objects;
create policy "academy_videos_admin_all"
  on storage.objects
  for all
  using (bucket_id = 'academy-videos' and public.fn_is_admin(auth.uid()))
  with check (bucket_id = 'academy-videos' and public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- Policies de storage para academy-media (capas/thumbs — leitura pública)
------------------------------------------------------------
drop policy if exists "academy_media_public_read" on storage.objects;
create policy "academy_media_public_read"
  on storage.objects
  for select
  using (bucket_id = 'academy-media');

drop policy if exists "academy_media_admin_write" on storage.objects;
create policy "academy_media_admin_write"
  on storage.objects
  for all
  using (bucket_id = 'academy-media' and public.fn_is_admin(auth.uid()))
  with check (bucket_id = 'academy-media' and public.fn_is_admin(auth.uid()));

------------------------------------------------------------
-- Cron: refresh da materialized view a cada 10 minutos
------------------------------------------------------------
do $$
begin
  if exists (select 1 from cron.job where jobname = 'academy_refresh_catalog') then
    perform cron.unschedule('academy_refresh_catalog');
  end if;
  perform cron.schedule(
    'academy_refresh_catalog',
    '*/10 * * * *',
    $cmd$ select public.fn_refresh_academy_catalog(); $cmd$
  );
end $$;

------------------------------------------------------------
-- Cron: expira matrículas a cada 1h
------------------------------------------------------------
create or replace function public.fn_expire_enrollments()
returns int
language plpgsql
security definer
as $fn$
declare v_count int;
begin
  update public.academy_enrollments
  set status = 'expired'
  where status = 'active'
    and expires_at is not null
    and expires_at <= now();
  get diagnostics v_count = row_count;
  return v_count;
end;
$fn$;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'academy_expire_enrollments') then
    perform cron.unschedule('academy_expire_enrollments');
  end if;
  perform cron.schedule(
    'academy_expire_enrollments',
    '15 * * * *', -- 15 minutos depois de cada hora cheia
    $cmd$ select public.fn_expire_enrollments(); $cmd$
  );
end $$;
