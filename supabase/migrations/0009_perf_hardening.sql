-- 0009_perf_hardening.sql
-- Corrige unindexed_foreign_keys + auth_rls_initplan.

-- 1. Índices para FKs sem cobertura
create index if not exists activities_author_id_idx
  on public.activities(author_id);
create index if not exists lead_service_interests_package_id_idx
  on public.lead_service_interests(package_id);
create index if not exists lead_tags_tag_id_idx
  on public.lead_tags(tag_id);
create index if not exists notes_author_id_idx
  on public.notes(author_id);
create index if not exists quotes_owner_id_idx
  on public.quotes(owner_id);

-- 2. Reescreve políticas pra usar (select auth.uid())
drop policy if exists "leads_owner_select" on public.leads;
create policy "leads_owner_select"
  on public.leads for select to authenticated
  using (owner_id = (select auth.uid()));

drop policy if exists "leads_owner_update" on public.leads;
create policy "leads_owner_update"
  on public.leads for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists "lsi_owner_select" on public.lead_service_interests;
create policy "lsi_owner_select"
  on public.lead_service_interests for select to authenticated
  using (exists (
    select 1 from public.leads l
    where l.id = lead_service_interests.lead_id
      and l.owner_id = (select auth.uid())
  ));

drop policy if exists "lead_tags_owner_all" on public.lead_tags;
create policy "lead_tags_owner_all"
  on public.lead_tags for all to authenticated
  using (exists (
    select 1 from public.leads l
    where l.id = lead_tags.lead_id and l.owner_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.leads l
    where l.id = lead_tags.lead_id and l.owner_id = (select auth.uid())
  ));

drop policy if exists "activities_owner_all" on public.activities;
create policy "activities_owner_all"
  on public.activities for all to authenticated
  using (exists (
    select 1 from public.leads l
    where l.id = activities.lead_id and l.owner_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.leads l
    where l.id = activities.lead_id and l.owner_id = (select auth.uid())
  ));

drop policy if exists "notes_owner_all" on public.notes;
create policy "notes_owner_all"
  on public.notes for all to authenticated
  using (exists (
    select 1 from public.leads l
    where l.id = notes.lead_id and l.owner_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.leads l
    where l.id = notes.lead_id and l.owner_id = (select auth.uid())
  ));

drop policy if exists "quotes_owner_all" on public.quotes;
create policy "quotes_owner_all"
  on public.quotes for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists "quote_items_owner_all" on public.quote_items;
create policy "quote_items_owner_all"
  on public.quote_items for all to authenticated
  using (exists (
    select 1 from public.quotes q
    where q.id = quote_items.quote_id and q.owner_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.quotes q
    where q.id = quote_items.quote_id and q.owner_id = (select auth.uid())
  ));
