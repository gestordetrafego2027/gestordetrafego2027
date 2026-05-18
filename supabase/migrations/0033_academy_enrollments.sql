-- 0033_academy_enrollments.sql
-- House Mazzutti Academy — matrículas + certificados.
-- DEPENDS ON: 0023 (enums), 0024 (functions), 0025 (profiles), 0027 (products), 0031 (orders)

------------------------------------------------------------
-- Tabela: academy_enrollments
------------------------------------------------------------
create table if not exists public.academy_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.academy_products(id) on delete restrict,
  order_id uuid references public.academy_orders(id) on delete set null,
  status academy_enrollment_status not null default 'active',
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz,
  revoked_reason text,
  source text not null default 'purchase' check (source in ('purchase','admin_grant','subscription','bundle','migration','trial')),
  progress_percent numeric(5,2) not null default 0 check (progress_percent between 0 and 100),
  completed_at timestamptz,
  last_accessed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_enrollments is
  'Matrículas: vincula usuário a produto. UNIQUE garante uma matrícula por (user, product).';

-- UNIQUE (user, product) — uma matrícula por par (recriar via re-grant atualiza status)
create unique index if not exists uq_academy_enrollments_user_product
  on public.academy_enrollments(user_id, product_id);

create index if not exists idx_academy_enrollments_user on public.academy_enrollments(user_id);
create index if not exists idx_academy_enrollments_product on public.academy_enrollments(product_id);
create index if not exists idx_academy_enrollments_status on public.academy_enrollments(status);
create index if not exists idx_academy_enrollments_active
  on public.academy_enrollments(user_id, product_id)
  where status = 'active';

drop trigger if exists tg_academy_enrollments_updated_at on public.academy_enrollments;
create trigger tg_academy_enrollments_updated_at before update on public.academy_enrollments for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Trigger: timestamps automáticos
------------------------------------------------------------
create or replace function public.fn_academy_enrollments_lifecycle()
returns trigger language plpgsql as $$
begin
  if new.status = 'revoked' and new.revoked_at is null then new.revoked_at := now(); end if;
  if new.progress_percent = 100 and new.completed_at is null then new.completed_at := now(); end if;
  return new;
end;
$$;

drop trigger if exists tg_academy_enrollments_lifecycle on public.academy_enrollments;
create trigger tg_academy_enrollments_lifecycle before insert or update on public.academy_enrollments for each row execute function public.fn_academy_enrollments_lifecycle();

------------------------------------------------------------
-- Função: fn_grant_enrollment_from_order
-- Cria matrículas para todos os itens de uma order paga.
-- Resolve bundles em filhos.
------------------------------------------------------------
create or replace function public.fn_grant_enrollment_from_order(p_order_id uuid)
returns int
language plpgsql
security definer
as $$
declare
  v_user uuid;
  v_status academy_order_status;
  v_count int := 0;
  v_item record;
  v_child record;
  v_access_days int;
  v_expires timestamptz;
begin
  select user_id, status into v_user, v_status from public.academy_orders where id = p_order_id;
  if v_user is null then
    raise exception 'Order % não encontrada.', p_order_id;
  end if;
  if v_status <> 'paid' then
    raise exception 'Order % não está paga (status=%).', p_order_id, v_status;
  end if;

  for v_item in
    select oi.product_id, p.type, p.access_duration_days
    from public.academy_order_items oi
    join public.academy_products p on p.id = oi.product_id
    where oi.order_id = p_order_id
  loop
    if v_item.type = 'bundle' then
      -- expandir bundle
      for v_child in
        select bi.child_product_id, cp.access_duration_days
        from public.academy_bundle_items bi
        join public.academy_products cp on cp.id = bi.child_product_id
        where bi.bundle_product_id = v_item.product_id
      loop
        v_access_days := v_child.access_duration_days;
        v_expires := case when v_access_days is null then null else now() + (v_access_days || ' days')::interval end;
        insert into public.academy_enrollments (user_id, product_id, order_id, status, expires_at, source)
        values (v_user, v_child.child_product_id, p_order_id, 'active', v_expires, 'bundle')
        on conflict (user_id, product_id) do update
          set status = 'active',
              order_id = excluded.order_id,
              expires_at = excluded.expires_at,
              revoked_at = null,
              revoked_reason = null,
              updated_at = now();
        v_count := v_count + 1;
      end loop;
    else
      v_access_days := v_item.access_duration_days;
      v_expires := case when v_access_days is null then null else now() + (v_access_days || ' days')::interval end;
      insert into public.academy_enrollments (user_id, product_id, order_id, status, expires_at, source)
      values (v_user, v_item.product_id, p_order_id, 'active', v_expires, 'purchase')
      on conflict (user_id, product_id) do update
        set status = 'active',
            order_id = excluded.order_id,
            expires_at = excluded.expires_at,
            revoked_at = null,
            revoked_reason = null,
            updated_at = now();
      v_count := v_count + 1;
    end if;
  end loop;

  return v_count;
end;
$$;

comment on function public.fn_grant_enrollment_from_order(uuid) is
  'Cria/atualiza matrículas a partir dos itens de uma order paga. Expande bundles.';

------------------------------------------------------------
-- Trigger: ao mudar order.status para paid, conceder matrículas
------------------------------------------------------------
create or replace function public.fn_tg_academy_orders_grant()
returns trigger language plpgsql as $$
begin
  if (tg_op = 'UPDATE' and new.status = 'paid' and old.status is distinct from 'paid')
     or (tg_op = 'INSERT' and new.status = 'paid') then
    perform public.fn_grant_enrollment_from_order(new.id);
  end if;
  return new;
end; $$;

drop trigger if exists tg_academy_orders_grant_enrollments on public.academy_orders;
create trigger tg_academy_orders_grant_enrollments
  after insert or update of status on public.academy_orders
  for each row execute function public.fn_tg_academy_orders_grant();

------------------------------------------------------------
-- Atualização: fn_user_has_active_enrollment considera subscription
------------------------------------------------------------
create or replace function public.fn_user_has_active_enrollment(p_user_id uuid, p_product_id uuid)
returns boolean
language plpgsql
stable
security definer
as $$
declare
  v_has boolean;
  v_in_sub boolean;
  v_has_sub boolean;
begin
  -- matrícula direta
  select exists(
    select 1 from public.academy_enrollments
    where user_id = p_user_id and product_id = p_product_id
      and status = 'active'
      and (expires_at is null or expires_at > now())
  ) into v_has;
  if v_has then return true; end if;

  -- via assinatura
  select included_in_subscription into v_in_sub from public.academy_products where id = p_product_id;
  if v_in_sub then
    select public.fn_user_has_active_subscription(p_user_id) into v_has_sub;
    if v_has_sub then return true; end if;
  end if;

  return false;
end;
$$;

comment on function public.fn_user_has_active_enrollment(uuid, uuid) is
  'True se usuário tem matrícula direta ativa OU assinatura ativa cobrindo produto.';

------------------------------------------------------------
-- Tabela: academy_certificates
------------------------------------------------------------
create table if not exists public.academy_certificates (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null unique references public.academy_enrollments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.academy_products(id) on delete restrict,
  code text not null unique,
  pdf_url text,
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  revoked_reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.academy_certificates is
  'Certificados emitidos. PDF gerado por Edge Function — schema só guarda URL.';

create index if not exists idx_academy_certificates_user on public.academy_certificates(user_id);
create index if not exists idx_academy_certificates_product on public.academy_certificates(product_id);
create index if not exists idx_academy_certificates_code on public.academy_certificates(code);

drop trigger if exists tg_academy_certificates_updated_at on public.academy_certificates;
create trigger tg_academy_certificates_updated_at before update on public.academy_certificates for each row execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Função: gera code de certificado HM-CERT-YYYY-XXXXXX
------------------------------------------------------------
create or replace function public.fn_academy_certificate_code()
returns trigger language plpgsql as $$
begin
  if new.code is null or new.code = '' then
    new.code := 'HM-CERT-' || to_char(now(), 'YYYY') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  end if;
  return new;
end; $$;

drop trigger if exists tg_academy_certificates_code on public.academy_certificates;
create trigger tg_academy_certificates_code before insert on public.academy_certificates for each row execute function public.fn_academy_certificate_code();

------------------------------------------------------------
-- RLS: academy_enrollments
------------------------------------------------------------
alter table public.academy_enrollments enable row level security;

drop policy if exists "academy_enrollments_select_own" on public.academy_enrollments;
create policy "academy_enrollments_select_own" on public.academy_enrollments for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_enrollments_admin_all" on public.academy_enrollments;
create policy "academy_enrollments_admin_all" on public.academy_enrollments for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

-- Permite update do próprio progresso (last_accessed_at, progress_percent)
drop policy if exists "academy_enrollments_update_own_progress" on public.academy_enrollments;
create policy "academy_enrollments_update_own_progress" on public.academy_enrollments for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

------------------------------------------------------------
-- RLS: academy_certificates
-- Verificação pública por code é feita por RPC SECURITY DEFINER na app.
------------------------------------------------------------
alter table public.academy_certificates enable row level security;

drop policy if exists "academy_certificates_select_own" on public.academy_certificates;
create policy "academy_certificates_select_own" on public.academy_certificates for select
  using (user_id = auth.uid() or public.fn_is_admin(auth.uid()));

drop policy if exists "academy_certificates_admin_all" on public.academy_certificates;
create policy "academy_certificates_admin_all" on public.academy_certificates for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));
