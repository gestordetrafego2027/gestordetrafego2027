-- 0018_quotes_public_token.sql
-- Token publico opaco em quotes pra cliente abrir/aceitar proposta
-- via /p/[token] sem login.

alter table public.quotes
  add column if not exists public_token text unique
    default encode(gen_random_bytes(18), 'base64')
    not null;

update public.quotes set public_token = encode(gen_random_bytes(18), 'base64')
 where public_token is null or length(public_token) < 24;

-- Funcao SECURITY DEFINER que retorna a proposta pelo token (bypassa RLS).
create or replace function public.get_quote_by_token(p_token text)
returns table (
  id uuid, title text, status quote_status, notes text,
  subtotal_brl numeric, discount_brl numeric, total_brl numeric,
  valid_until date, sent_at timestamptz, accepted_at timestamptz, created_at timestamptz,
  lead_name text, lead_email text, lead_phone text, lead_city text,
  items jsonb
)
language sql security definer set search_path = public as $$
  select
    q.id, q.title, q.status, q.notes,
    q.subtotal_brl, q.discount_brl, q.total_brl,
    q.valid_until, q.sent_at, q.accepted_at, q.created_at,
    l.name, l.email, l.phone, l.city,
    coalesce(
      (select jsonb_agg(
        jsonb_build_object(
          'id', qi.id, 'kind', qi.kind, 'label', qi.label,
          'description', qi.description, 'quantity', qi.quantity,
          'unit_price_brl', qi.unit_price_brl, 'total_brl', qi.total_brl,
          'position', qi.position
        ) order by qi.position
      ) from public.quote_items qi where qi.quote_id = q.id),
      '[]'::jsonb
    ) as items
  from public.quotes q
  join public.leads l on l.id = q.lead_id
  where q.public_token = p_token
  limit 1;
$$;

grant execute on function public.get_quote_by_token(text) to anon, authenticated;

-- Aceitar proposta via link publico (cliente clica botao na pagina /p/[token]).
-- Marca aceita -> trigger DB tg_quote_accepted_automation dispara.
create or replace function public.accept_quote_by_token(p_token text)
returns boolean
language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  update public.quotes set status = 'aceito'
   where public_token = p_token and status in ('rascunho','enviado','expirado')
   returning id into v_id;
  return v_id is not null;
end;
$$;

grant execute on function public.accept_quote_by_token(text) to anon, authenticated;
