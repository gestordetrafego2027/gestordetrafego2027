-- 0003_rls_policies.sql
-- RLS para o CRM: catálogo é leitura pública, dados de lead/quote são restritos.

------------------------------------------------------------
-- Helper: verifica se o usuário autenticado tem o role 'admin' ou 'staff'
-- (claim em raw_app_meta_data.role do Supabase Auth)
------------------------------------------------------------
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff'),
    false
  );
$$;

------------------------------------------------------------
-- Habilita RLS em TODAS as tabelas
------------------------------------------------------------
alter table public.services                  enable row level security;
alter table public.service_packages          enable row level security;
alter table public.service_addons            enable row level security;
alter table public.team_resource_categories  enable row level security;
alter table public.team_resources            enable row level security;
alter table public.pipeline_stages           enable row level security;
alter table public.tags                      enable row level security;
alter table public.leads                     enable row level security;
alter table public.lead_service_interests    enable row level security;
alter table public.lead_tags                 enable row level security;
alter table public.activities                enable row level security;
alter table public.notes                     enable row level security;
alter table public.quotes                    enable row level security;
alter table public.quote_items               enable row level security;

------------------------------------------------------------
-- CATÁLOGO PÚBLICO — qualquer um pode LER (anon + authenticated)
-- Apenas staff pode escrever.
------------------------------------------------------------
create policy "catalog_public_read_services"
  on public.services for select using (active = true);
create policy "catalog_staff_write_services"
  on public.services for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "catalog_public_read_packages"
  on public.service_packages for select using (active = true);
create policy "catalog_staff_write_packages"
  on public.service_packages for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "catalog_public_read_addons"
  on public.service_addons for select using (active = true);
create policy "catalog_staff_write_addons"
  on public.service_addons for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "catalog_public_read_team_categories"
  on public.team_resource_categories for select using (true);
create policy "catalog_staff_write_team_categories"
  on public.team_resource_categories for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "catalog_public_read_team_resources"
  on public.team_resources for select using (active = true);
create policy "catalog_staff_write_team_resources"
  on public.team_resources for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "catalog_public_read_pipeline"
  on public.pipeline_stages for select using (true);
create policy "catalog_staff_write_pipeline"
  on public.pipeline_stages for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "catalog_public_read_tags"
  on public.tags for select using (true);
create policy "catalog_staff_write_tags"
  on public.tags for all to authenticated using (public.is_staff()) with check (public.is_staff());

------------------------------------------------------------
-- LEADS — anon pode INSERIR (formulário público); staff pode tudo;
-- usuários autenticados não-staff só veem leads onde são owner.
------------------------------------------------------------
create policy "leads_public_insert"
  on public.leads for insert to anon, authenticated
  with check (true);

create policy "leads_staff_all"
  on public.leads for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "leads_owner_select"
  on public.leads for select to authenticated
  using (owner_id = auth.uid());

create policy "leads_owner_update"
  on public.leads for update to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

------------------------------------------------------------
-- LEAD_SERVICE_INTERESTS — anon pode inserir (formulário público).
-- Leitura/edição: staff ou owner do lead.
------------------------------------------------------------
create policy "lsi_public_insert"
  on public.lead_service_interests for insert to anon, authenticated
  with check (true);

create policy "lsi_staff_all"
  on public.lead_service_interests for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "lsi_owner_select"
  on public.lead_service_interests for select to authenticated
  using (exists (
    select 1 from public.leads l
    where l.id = lead_service_interests.lead_id and l.owner_id = auth.uid()
  ));

------------------------------------------------------------
-- LEAD_TAGS, ACTIVITIES, NOTES, QUOTES, QUOTE_ITEMS
-- Apenas staff ou owner do lead.
------------------------------------------------------------
create policy "lead_tags_staff_all"
  on public.lead_tags for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "lead_tags_owner_all"
  on public.lead_tags for all to authenticated
  using (exists (select 1 from public.leads l where l.id = lead_tags.lead_id and l.owner_id = auth.uid()))
  with check (exists (select 1 from public.leads l where l.id = lead_tags.lead_id and l.owner_id = auth.uid()));

create policy "activities_staff_all"
  on public.activities for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "activities_owner_all"
  on public.activities for all to authenticated
  using (exists (select 1 from public.leads l where l.id = activities.lead_id and l.owner_id = auth.uid()))
  with check (exists (select 1 from public.leads l where l.id = activities.lead_id and l.owner_id = auth.uid()));

create policy "notes_staff_all"
  on public.notes for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "notes_owner_all"
  on public.notes for all to authenticated
  using (exists (select 1 from public.leads l where l.id = notes.lead_id and l.owner_id = auth.uid()))
  with check (exists (select 1 from public.leads l where l.id = notes.lead_id and l.owner_id = auth.uid()));

create policy "quotes_staff_all"
  on public.quotes for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "quotes_owner_all"
  on public.quotes for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "quote_items_staff_all"
  on public.quote_items for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "quote_items_owner_all"
  on public.quote_items for all to authenticated
  using (exists (select 1 from public.quotes q where q.id = quote_items.quote_id and q.owner_id = auth.uid()))
  with check (exists (select 1 from public.quotes q where q.id = quote_items.quote_id and q.owner_id = auth.uid()));
