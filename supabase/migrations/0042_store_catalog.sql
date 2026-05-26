-- ═══════════════════════════════════════════════════════════════
-- Migration 0042 — Store: Catálogo (produtos, preços, variantes)
-- Source of truth: Stripe Dashboard → replica via webhook + sync
-- DOWN: ver final do arquivo
-- ═══════════════════════════════════════════════════════════════

-- ── Extensões necessárias (já habilitadas em 0001, garantia) ──
CREATE EXTENSION IF NOT EXISTS unaccent;

-- ── Enums ────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE store_product_type AS ENUM ('physical', 'digital', 'service', 'bundle');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE store_price_type AS ENUM ('one_time', 'recurring');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE store_recurring_interval AS ENUM ('day', 'week', 'month', 'year');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Categorias ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_categories (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text NOT NULL UNIQUE,
  name          text NOT NULL,
  description   text,
  parent_id     uuid REFERENCES store_categories(id) ON DELETE SET NULL,
  cover_url     text,
  active        boolean NOT NULL DEFAULT true,
  position      integer NOT NULL DEFAULT 0,
  metadata      jsonb NOT NULL DEFAULT '{}',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ── Produtos (replica do Stripe) ─────────────────────────────
CREATE TABLE IF NOT EXISTS store_products (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id   text NOT NULL UNIQUE,   -- prod_xxx do Stripe
  slug                text NOT NULL UNIQUE,
  name                text NOT NULL,
  description         text,
  product_type        store_product_type NOT NULL DEFAULT 'digital',
  active              boolean NOT NULL DEFAULT true,
  images              jsonb NOT NULL DEFAULT '[]',  -- array de URLs
  features            jsonb NOT NULL DEFAULT '[]',  -- bullet points
  metadata            jsonb NOT NULL DEFAULT '{}',  -- metadata do Stripe
  seo_title           text,
  seo_description     text,
  og_image_url        text,
  featured            boolean NOT NULL DEFAULT false,
  featured_order      integer,
  search_tsv          tsvector,
  stripe_synced_at    timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- ── Preços (replica do Stripe) ───────────────────────────────
CREATE TABLE IF NOT EXISTS store_prices (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_price_id       text NOT NULL UNIQUE,    -- price_xxx do Stripe
  product_id            uuid NOT NULL REFERENCES store_products(id) ON DELETE CASCADE,
  active                boolean NOT NULL DEFAULT true,
  currency              text NOT NULL DEFAULT 'brl',
  unit_amount           integer NOT NULL,          -- em centavos
  unit_amount_decimal   text,                       -- para cobranças fracionadas
  price_type            store_price_type NOT NULL DEFAULT 'one_time',
  recurring_interval    store_recurring_interval,
  recurring_interval_count integer,
  trial_period_days     integer,
  nickname              text,                       -- label no Dashboard Stripe
  metadata              jsonb NOT NULL DEFAULT '{}',
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- ── Variantes de produto ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_product_variants (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      uuid NOT NULL REFERENCES store_products(id) ON DELETE CASCADE,
  price_id        uuid REFERENCES store_prices(id) ON DELETE SET NULL,
  sku             text UNIQUE,
  name            text NOT NULL,          -- ex: "Azul / G"
  options         jsonb NOT NULL DEFAULT '{}',  -- {color: "Azul", size: "G"}
  stock_qty       integer NOT NULL DEFAULT 0,
  low_stock_threshold integer NOT NULL DEFAULT 5,
  active          boolean NOT NULL DEFAULT true,
  position        integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ── Relacionamento produto ↔ categoria ───────────────────────
CREATE TABLE IF NOT EXISTS store_product_categories (
  product_id    uuid NOT NULL REFERENCES store_products(id) ON DELETE CASCADE,
  category_id   uuid NOT NULL REFERENCES store_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- ── Movimentações de estoque (kardex) ────────────────────────
CREATE TABLE IF NOT EXISTS store_inventory_movements (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id    uuid NOT NULL REFERENCES store_product_variants(id) ON DELETE CASCADE,
  delta         integer NOT NULL,          -- positivo = entrada, negativo = saída
  reason        text NOT NULL,             -- 'sale', 'return', 'adjustment', 'initial'
  reference_id  uuid,                      -- order_id ou null
  note          text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ── Índices ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_store_products_stripe_id      ON store_products(stripe_product_id);
CREATE INDEX IF NOT EXISTS idx_store_products_slug           ON store_products(slug);
CREATE INDEX IF NOT EXISTS idx_store_products_active         ON store_products(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_store_products_search         ON store_products USING gin(search_tsv);
CREATE INDEX IF NOT EXISTS idx_store_prices_stripe_id        ON store_prices(stripe_price_id);
CREATE INDEX IF NOT EXISTS idx_store_prices_product          ON store_prices(product_id);
CREATE INDEX IF NOT EXISTS idx_store_variants_product        ON store_product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_store_variants_sku            ON store_product_variants(sku) WHERE sku IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_store_categories_slug         ON store_categories(slug);
CREATE INDEX IF NOT EXISTS idx_store_inventory_variant       ON store_inventory_movements(variant_id);

-- ── updated_at automático ────────────────────────────────────
CREATE OR REPLACE FUNCTION store_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['store_categories','store_products','store_prices','store_product_variants'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s', t, t);
    EXECUTE format('CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION store_set_updated_at()', t, t);
  END LOOP;
END $$;

-- ── Trigger: search_tsv atualiza automático ──────────────────
CREATE OR REPLACE FUNCTION store_products_search_tsv()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_tsv := to_tsvector('portuguese',
    coalesce(NEW.name, '') || ' ' ||
    coalesce(NEW.description, '') || ' ' ||
    coalesce(NEW.seo_title, '')
  );
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_store_products_search ON store_products;
CREATE TRIGGER trg_store_products_search
  BEFORE INSERT OR UPDATE ON store_products
  FOR EACH ROW EXECUTE FUNCTION store_products_search_tsv();

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE store_products            ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_prices              ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_product_variants    ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_product_categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_inventory_movements ENABLE ROW LEVEL SECURITY;

-- Leitura pública dos produtos e preços ativos
CREATE POLICY "store_products_public_read" ON store_products
  FOR SELECT USING (active = true);

CREATE POLICY "store_prices_public_read" ON store_prices
  FOR SELECT USING (active = true);

CREATE POLICY "store_categories_public_read" ON store_categories
  FOR SELECT USING (active = true);

CREATE POLICY "store_variants_public_read" ON store_product_variants
  FOR SELECT USING (active = true);

CREATE POLICY "store_product_categories_public_read" ON store_product_categories
  FOR SELECT USING (true);

-- Escrita só via service_role (webhooks, sync)
CREATE POLICY "store_products_service_write" ON store_products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "store_prices_service_write" ON store_prices
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "store_variants_service_write" ON store_product_variants
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "store_categories_service_write" ON store_categories
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "store_inventory_service_write" ON store_inventory_movements
  FOR ALL USING (auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════════
-- DOWN (executar manualmente se necessário reverter):
-- DROP TABLE IF EXISTS store_inventory_movements, store_product_categories,
--   store_product_variants, store_prices, store_products, store_categories CASCADE;
-- DROP TYPE IF EXISTS store_product_type, store_price_type, store_recurring_interval;
-- ═══════════════════════════════════════════════════════════════
