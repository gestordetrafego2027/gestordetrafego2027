-- 0024_academy_functions.sql
-- House Mazzutti Academy — funções helper reutilizáveis
-- (triggers, slug, verificações de acesso).

------------------------------------------------------------
-- 1. fn_set_updated_at — trigger BEFORE UPDATE
------------------------------------------------------------
create or replace function public.fn_set_updated_at()
returns trigger
language plpgsql
security invoker
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

comment on function public.fn_set_updated_at() is
  'Trigger reutilizável para BEFORE UPDATE: atualiza coluna updated_at para now().';

------------------------------------------------------------
-- 2. fn_generate_slug — normaliza texto em slug url-safe
------------------------------------------------------------
create or replace function public.fn_generate_slug(p_input text)
returns text
language plpgsql
immutable
as $$
declare
  v_slug text;
begin
  if p_input is null then
    return null;
  end if;
  v_slug := unaccent(p_input);
  v_slug := lower(v_slug);
  v_slug := regexp_replace(v_slug, '[^a-z0-9]+', '-', 'g');
  v_slug := regexp_replace(v_slug, '-{2,}', '-', 'g');
  v_slug := trim(both '-' from v_slug);
  return v_slug;
end;
$$;

comment on function public.fn_generate_slug(text) is
  'Gera slug url-safe: remove acentos, lowercase, troca não-alfanumérico por hífen. Ex: "Cão Açúcar!" -> "cao-acucar".';

------------------------------------------------------------
-- 3. fn_unique_slug — garante slug único em uma tabela/coluna
------------------------------------------------------------
create or replace function public.fn_unique_slug(
  p_table_name text,
  p_column_name text,
  p_base_slug text
)
returns text
language plpgsql
security definer
as $$
declare
  v_candidate text := p_base_slug;
  v_counter int := 1;
  v_exists boolean;
  v_sql text;
begin
  loop
    v_sql := format(
      'select exists(select 1 from %I where %I = $1)',
      p_table_name, p_column_name
    );
    execute v_sql into v_exists using v_candidate;
    exit when not v_exists;
    v_counter := v_counter + 1;
    v_candidate := p_base_slug || '-' || v_counter::text;
  end loop;
  return v_candidate;
end;
$$;

comment on function public.fn_unique_slug(text, text, text) is
  'Retorna slug único para (tabela, coluna): tenta base, depois base-2, base-3... ATENÇÃO: SECURITY DEFINER — só passar nomes de tabela/coluna confiáveis (não user input).';

------------------------------------------------------------
-- 4. fn_user_has_active_enrollment
--    Tabela academy_enrollments ainda não existe nesta migration;
--    usamos EXECUTE dinâmico com fallback false em undefined_table.
------------------------------------------------------------
create or replace function public.fn_user_has_active_enrollment(
  p_user_id uuid,
  p_product_id uuid
)
returns boolean
language plpgsql
stable
security definer
as $$
declare
  v_exists boolean;
begin
  execute $q$
    select exists(
      select 1 from academy_enrollments
      where user_id = $1
        and product_id = $2
        and status = 'active'
        and (expires_at is null or expires_at > now())
    )
  $q$
  into v_exists
  using p_user_id, p_product_id;
  return coalesce(v_exists, false);
exception
  when undefined_table then
    return false;
end;
$$;

comment on function public.fn_user_has_active_enrollment(uuid, uuid) is
  'True se usuário tem matrícula ativa e não expirada no produto. Retorna false se academy_enrollments ainda não foi criada.';

------------------------------------------------------------
-- 5. fn_user_has_role
--    Tabela profiles é criada em 0025; mesmo padrão de fallback.
------------------------------------------------------------
create or replace function public.fn_user_has_role(
  p_user_id uuid,
  p_role text
)
returns boolean
language plpgsql
stable
security definer
as $$
declare
  v_exists boolean;
begin
  execute $q$
    select exists(
      select 1 from profiles
      where id = $1 and role = $2
    )
  $q$
  into v_exists
  using p_user_id, p_role;
  return coalesce(v_exists, false);
exception
  when undefined_table then
    return false;
end;
$$;

comment on function public.fn_user_has_role(uuid, text) is
  'True se o usuário tem o role indicado em profiles. Retorna false se profiles ainda não existe.';

------------------------------------------------------------
-- 6. fn_is_admin — atalho
------------------------------------------------------------
create or replace function public.fn_is_admin(p_user_id uuid)
returns boolean
language sql
stable
security definer
as $$
  select public.fn_user_has_role(p_user_id, 'admin');
$$;

comment on function public.fn_is_admin(uuid) is
  'Atalho: true se o usuário tem role = admin em profiles.';
