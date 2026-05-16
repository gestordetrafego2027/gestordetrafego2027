-- 0019_multitenant_rls_by_unit.sql
-- Multi-tenant scoping por unit (studio/agencia/produtora/comunidade).
--
-- Modelo:
--   * is_admin()  -> auth.jwt().app_metadata.role = 'admin'. Ve TUDO.
--   * current_user_unit() -> auth.jwt().app_metadata.unit (text, pode ser null).
--   * is_visible_unit(u) -> true se admin OU current_user_unit IS NULL OU u match.
--
-- Para promover um socio a "gestor da unidade studio", rode no SQL Editor:
--   update auth.users
--      set raw_app_meta_data = jsonb_set(
--            coalesce(raw_app_meta_data, '{}'::jsonb),
--            '{unit}', '"studio"'
--          )
--    where email = 'socio.studio@example.com';
--
-- Politicas _staff_all atualizadas em: clients, opportunities, leads,
-- invoices, payments, campaigns. Outras tabelas (activities, notes, quotes,
-- automations) seguem politicas existentes — gestor de unidade ja eh blocado
-- indiretamente por ter sua leitura de leads/clients filtrada.

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public, auth as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

create or replace function public.current_user_unit()
returns text language sql stable security definer set search_path = public, auth as $$
  select nullif(auth.jwt() -> 'app_metadata' ->> 'unit', '');
$$;

create or replace function public.is_visible_unit(p_unit text)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
      or current_user_unit() is null
      or current_user_unit() = p_unit;
$$;

grant execute on function public.is_admin(), public.current_user_unit(),
                          public.is_visible_unit(text) to anon, authenticated;

drop policy if exists "clients_staff_all" on public.clients;
create policy "clients_staff_all" on public.clients
  for all to authenticated
  using (public.is_staff() and public.is_visible_unit(unit::text))
  with check (public.is_staff() and public.is_visible_unit(unit::text));

drop policy if exists "opportunities_staff_all" on public.opportunities;
create policy "opportunities_staff_all" on public.opportunities
  for all to authenticated
  using (public.is_staff() and public.is_visible_unit(unit::text))
  with check (public.is_staff() and public.is_visible_unit(unit::text));

drop policy if exists "leads_staff_all" on public.leads;
create policy "leads_staff_all" on public.leads
  for all to authenticated
  using (public.is_staff() and public.is_visible_unit(coalesce(details->>'business_unit', current_user_unit())))
  with check (public.is_staff() and public.is_visible_unit(coalesce(details->>'business_unit', current_user_unit())));

drop policy if exists "invoices_staff_all" on public.invoices;
create policy "invoices_staff_all" on public.invoices
  for all to authenticated
  using (public.is_staff() and public.is_visible_unit(
    (select c.unit::text from public.clients c where c.id = invoices.client_id)
  ))
  with check (public.is_staff());

drop policy if exists "payments_staff_all" on public.payments;
create policy "payments_staff_all" on public.payments
  for all to authenticated
  using (public.is_staff() and public.is_visible_unit(
    (select c.unit::text from public.clients c where c.id = payments.client_id)
  ))
  with check (public.is_staff());

drop policy if exists "campaigns_staff_all" on public.campaigns;
create policy "campaigns_staff_all" on public.campaigns
  for all to authenticated
  using (public.is_staff() and public.is_visible_unit(unit::text))
  with check (public.is_staff() and public.is_visible_unit(unit::text));
