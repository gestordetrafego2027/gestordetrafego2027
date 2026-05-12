-- 0006_catalog_refinement.sql
-- Refinamento do catálogo CRM (Agência):
--   1. Desenvolvimento Web   — preenche price_brl dos 3 pacotes
--   2. Campanha de Lançamento — cria 3 pacotes (essential/profissional/premium)
--   3. Branding Project       — cria 3 bundles (essential/profissional/premium)
--
-- RP & Marketing Direto fica para 0007 (preços pendentes).
-- Idempotente: UPDATE só atua quando price_brl is null; INSERTs usam on conflict.

------------------------------------------------------------
-- 1) Desenvolvimento Web — preencher preços
------------------------------------------------------------
update public.service_packages sp
set price_brl = 5700.00
from public.services s
where sp.service_id = s.id
  and s.slug = 'desenvolvimento-web'
  and sp.slug = 'essential'
  and sp.price_brl is null;

update public.service_packages sp
set price_brl = 8600.00
from public.services s
where sp.service_id = s.id
  and s.slug = 'desenvolvimento-web'
  and sp.slug = 'profissional'
  and sp.price_brl is null;

update public.service_packages sp
set price_brl = 13300.00
from public.services s
where sp.service_id = s.id
  and s.slug = 'desenvolvimento-web'
  and sp.slug = 'premium'
  and sp.price_brl is null;

------------------------------------------------------------
-- 2) Campanha de Lançamento — 3 pacotes
-- Inclusos derivados do Ecossistema 360° (planilha sitemap).
------------------------------------------------------------
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('essential', 'Essential', 15700.00,
    '["1 vídeo manifesto (hero film)","2-3 vídeos médios (1-3 min)","5-8 reels/short videos","Storytelling escrito","Landing page de campanha","Equipe enxuta (direção criativa + audiovisual)"]',
    10),
  ('profissional', 'Profissional', 28600.00,
    '["1 vídeo manifesto","4-5 vídeos médios","10-15 reels/TikTok","Editorial fotográfico","Storytelling escrito","Landing page interativa","Diretor criativo + produção executiva + audiovisual + fotógrafo"]',
    20),
  ('premium', 'Premium', 33300.00,
    '["1 vídeo manifesto (hero film)","5-6 vídeos médios","15-20 reels/TikTok","Editorial completo","Storytelling escrito","Landing page interativa","Equipe 360°: direção criativa + produção executiva + audiovisual + fotógrafo + stylist + redator + web designer"]',
    30)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'campanha-lancamento'
on conflict (service_id, slug) do update
set price_brl = excluded.price_brl,
    includes  = excluded.includes,
    name      = excluded.name,
    position  = excluded.position;

------------------------------------------------------------
-- 3) Branding Project — 3 bundles
-- Os 6 módulos seguem como service_addons opcionais; estes são
-- bundles "personalizados" oferecidos como base.
------------------------------------------------------------
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('essential', 'Essential', 20700.00,
    '["Identidade Visual (logotipo, paleta, tipografia)","Brand Book / Manual de Marca","Aplicações básicas (papelaria digital)"]',
    10),
  ('profissional', 'Profissional', 35600.00,
    '["Identidade Visual completa","Brand Book / Manual de Marca","Essencial Print Pack","Visual Merchandising básico","Diretrizes de tom e voz"]',
    20),
  ('premium', 'Premium', 55300.00,
    '["Identidade Visual completa","Brand Book / Manual de Marca","Visual Merchandising","Projeto de Fachada","Essencial Print Pack","Assessoria de Imprensa inicial","Consultoria estratégica de posicionamento"]',
    30)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'branding-project'
on conflict (service_id, slug) do update
set price_brl = excluded.price_brl,
    includes  = excluded.includes,
    name      = excluded.name,
    position  = excluded.position;
