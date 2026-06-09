-- Migration: 0046_inside_out_masterclass
-- Cadastra "Inside Out · Masterclass On-demand" na tabela academy_products
-- para que o sitemap.js a inclua automaticamente.
--
-- ATENÇÃO: preencher stripe_price_id depois de criar o produto no Stripe (prod).
-- O campo vimeo_showcase_url é salvo em metadata (jsonb).

INSERT INTO academy_products (
  slug,
  title,
  type,
  status,
  price_brl,
  stripe_price_id,
  metadata,
  created_at,
  updated_at
)
VALUES (
  'inside-out',
  'Inside Out · Masterclass On-demand',
  'masterclass',
  'draft',           -- publicar manualmente via CRM após Stripe configurado
  197.00,
  '',                -- TODO: preencher após criar price no Stripe
  jsonb_build_object(
    'subtitle',      'A imersão completa em vídeo — assista no seu ritmo',
    'author',        'Ângelo Mazzutti',
    'format',        'Vídeo on-demand · Masterclass completa',
    'guarantee_days', 7,
    'vimeo_showcase_url', '',  -- TODO: preencher com o link do Vimeo Showcase privado
    'original_format', 'workshop presencial',
    'edition',       '2026'
  ),
  now(),
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  title          = EXCLUDED.title,
  type           = EXCLUDED.type,
  price_brl      = EXCLUDED.price_brl,
  metadata       = EXCLUDED.metadata,
  updated_at     = now();
