-- 0025_academy_profiles.sql
-- House Mazzutti Academy — tabela profiles (perfil estendido de auth.users).

------------------------------------------------------------
-- Tabela profiles
------------------------------------------------------------
create table if not exists public.profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  email                 citext unique not null,
  full_name             text not null check (length(full_name) between 2 and 120),
  display_name          text,
  avatar_url            text,
  cover_url             text,
  bio                   text check (bio is null or length(bio) <= 500),
  phone                 text,
  cpf                   text unique,
  birthdate             date,
  gender                text check (
    gender is null
    or gender in ('feminino','masculino','nao_binario','prefiro_nao_dizer','outro')
  ),
  city                  text,
  state                 text check (state is null or state ~ '^[A-Z]{2}$'),
  country               text default 'BR',
  instagram_handle      text,
  tiktok_handle         text,
  linkedin_handle       text,
  role                  text not null default 'student' check (
    role in ('student','author','admin','support','lead',
             'cliente_agencia','cliente_studio','cliente_produtora')
  ),
  email_verified        boolean default false,
  marketing_consent     boolean default false,
  terms_accepted_at     timestamptz,
  last_login_at         timestamptz,
  onboarding_completed  boolean default false,
  locale                text default 'pt-BR',
  timezone              text default 'America/Sao_Paulo',
  metadata              jsonb default '{}'::jsonb,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

comment on table public.profiles is
  'Perfil estendido de auth.users — dados públicos e privados do usuário na Academy/CRM.';
comment on column public.profiles.role is
  'Papel do usuário: student, author, admin, support, lead, cliente_agencia, cliente_studio, cliente_produtora.';
comment on column public.profiles.metadata is
  'Bag JSONB para campos não estruturados (preferências, integrações, flags de experimento).';

------------------------------------------------------------
-- Índices
------------------------------------------------------------
create index if not exists idx_profiles_email      on public.profiles (email);
create index if not exists idx_profiles_role       on public.profiles (role);
create index if not exists idx_profiles_created_at on public.profiles (created_at desc);
create index if not exists idx_profiles_metadata   on public.profiles using gin (metadata);
create index if not exists idx_profiles_search     on public.profiles
  using gin (to_tsvector('portuguese',
    coalesce(full_name, '') || ' ' || coalesce(email::text, '')
  ));

------------------------------------------------------------
-- Trigger updated_at
------------------------------------------------------------
drop trigger if exists tg_profiles_updated_at on public.profiles;
create trigger tg_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.fn_set_updated_at();

------------------------------------------------------------
-- Auto-criação de profile ao inserir em auth.users
------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

comment on function public.handle_new_user() is
  'Cria automaticamente um registro em profiles quando um usuário é inserido em auth.users.';

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

comment on trigger on_auth_user_created on auth.users is
  'Espelha cada novo auth.users em public.profiles via handle_new_user().';

------------------------------------------------------------
-- RLS
------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists profiles_select_own_or_public_author on public.profiles;
create policy profiles_select_own_or_public_author
  on public.profiles
  for select
  using (
    auth.uid() = id
    or public.fn_is_admin(auth.uid())
    or (role = 'author' and display_name is not null)
  );

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select role from public.profiles where id = auth.uid())
  );

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all
  on public.profiles
  for all
  using (public.fn_is_admin(auth.uid()))
  with check (public.fn_is_admin(auth.uid()));

-- INSERT não tem policy: profiles é populada pelo trigger SECURITY DEFINER.
