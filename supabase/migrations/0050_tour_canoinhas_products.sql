-- Tour Marca Pessoal · Canoinhas Winter 2026
-- Registra os 3 planos como produtos no catálogo + preços

-- Produtos
INSERT INTO store_products (slug, name, description, active, metadata)
VALUES
  ('tour-canoinhas-ensaio-01', 'Tour Canoinhas · Ensaio 01', '3 produções · 10 fotos tratadas · Making of', true, '{"product_type":"tour","plan_id":"ensaio-01","event_date":"2026-07-20"}'),
  ('tour-canoinhas-ensaio-02', 'Tour Canoinhas · Ensaio 02', '4 produções · 15 fotos tratadas · 1 Backstage 20"', true, '{"product_type":"tour","plan_id":"ensaio-02","event_date":"2026-07-21","popular":true}'),
  ('tour-canoinhas-ensaio-03', 'Tour Canoinhas · Ensaio 03', '5 produções · 20 fotos tratadas · Backstage + Fashion Film 20"', true, '{"product_type":"tour","plan_id":"ensaio-03","event_date":"2026-07-22"}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  metadata = EXCLUDED.metadata;

-- Preços (stripe_price_id é usado como chave interna — prefixo "asaas:" para tour)
INSERT INTO store_prices (product_id, stripe_price_id, unit_amount, currency, active, metadata)
SELECT p.id, 'asaas:tour-canoinhas-ensaio-01', 190000, 'brl', true, '{"installments":3}'
FROM store_products p WHERE p.slug = 'tour-canoinhas-ensaio-01'
ON CONFLICT (stripe_price_id) DO UPDATE SET unit_amount = EXCLUDED.unit_amount;

INSERT INTO store_prices (product_id, stripe_price_id, unit_amount, currency, active, metadata)
SELECT p.id, 'asaas:tour-canoinhas-ensaio-02', 260000, 'brl', true, '{"installments":3}'
FROM store_products p WHERE p.slug = 'tour-canoinhas-ensaio-02'
ON CONFLICT (stripe_price_id) DO UPDATE SET unit_amount = EXCLUDED.unit_amount;

INSERT INTO store_prices (product_id, stripe_price_id, unit_amount, currency, active, metadata)
SELECT p.id, 'asaas:tour-canoinhas-ensaio-03', 320000, 'brl', true, '{"installments":3}'
FROM store_products p WHERE p.slug = 'tour-canoinhas-ensaio-03'
ON CONFLICT (stripe_price_id) DO UPDATE SET unit_amount = EXCLUDED.unit_amount;
