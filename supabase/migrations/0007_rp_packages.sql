-- 0007_rp_packages.sql
-- Pacotes de RP & Marketing Direto (Agência).
-- Idempotente via on conflict do update.

insert into public.service_packages (service_id, slug, name, price_brl, duration, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.duration, p.includes::jsonb, p.position
from public.services s, (values
  ('essential', 'Essential', 30000.00, '3 meses',
    '["Blog e produção de conteúdo","Gestão de redes sociais","Calendário editorial","Relatórios mensais"]',
    10),
  ('profissional', 'Profissional', 60000.00, '3 meses',
    '["Tudo do Essential","Assessoria de imprensa online","Assessoria de imprensa offline","Presença em portais web","Media training básico"]',
    20),
  ('premium', 'Premium', 100000.00, 'Lançamento',
    '["Assessoria completa de lançamento","Presença em revistas","Imprensa nacional","Media training avançado","Gestão de crise","Relações públicas estratégicas"]',
    30)
) as p(slug, name, price_brl, duration, includes, position)
where s.slug = 'rp-mkt-direto'
on conflict (service_id, slug) do update
set price_brl = excluded.price_brl,
    includes  = excluded.includes,
    name      = excluded.name,
    duration  = excluded.duration,
    position  = excluded.position;
