-- ═══════════════════════════════════════════════════════════════
-- Migration 0043 — Store: Comércio (clientes, endereços, carrinhos,
--   pedidos, cupons, webhooks, wishlists)
-- ═══════════════════════════════════════════════════════════════

-- ── Enums ────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE store_order_status AS ENUM (
    'pending', 'processing', 'paid', 'failed',
    'refunded', 'partially_refunded', 'cancelled', 'chargeback'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── stripe_customer_id em profiles ───────────────────────────
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id text UNIQUE;

CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON profiles(stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;

-- ── Endereços ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_addresses (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label         text,                     -- "Casa", "Trabalho"
  recipient     text NOT NULL,
  line1         text NOT NULL,
  line2         text,
  city          text NOT NULL,
  state         text NOT NULL,            -- UF, ex: SP
  postal_code   text NOT NULL,
  country       text NOT NULL DEFAULT 'BR',
  phone         text,
  is_default    boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ── Carrinhos ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_carts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id    text,                     -- anon: cookie session
  expires_at    timestamptz NOT NULL DEFAULT now() + interval '30 days',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS store_cart_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id       uuid NOT NULL REFERENCES store_carts(id) ON DELETE CASCADE,
  price_id      uuid NOT NULL REFERENCES store_prices(id),
  variant_id    uuid REFERENCES store_product_variants(id) ON DELETE SET NULL,
  quantity      integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_amount   integer NOT NULL,         -- snapshot do preço no momento do add
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (cart_id, price_id, variant_id)
);

-- ── Cupons (cache do Stripe Promotion Codes) ─────────────────
CREATE TABLE IF NOT EXISTS store_coupons (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_coupon_id        text UNIQUE,
  stripe_promo_code_id    text UNIQUE,
  code                    text NOT NULL UNIQUE,
  active                  boolean NOT NULL DEFAULT true,
  percent_off             numeric(5,2),
  amount_off              integer,                  -- centavos
  currency                text DEFAULT 'brl',
  max_redemptions         integer,
  times_redeemed          integer NOT NULL DEFAULT 0,
  valid_from              timestamptz,
  valid_until             timestamptz,
  metadata                jsonb NOT NULL DEFAULT '{}',
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

-- ── Pedidos ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_orders (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number              text NOT NULL UNIQUE DEFAULT
                              'ORD-' || to_char(now(), 'YYYYMMDD') || '-' ||
                              upper(substr(gen_random_uuid()::text, 1, 6)),
  user_id                   uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id         text UNIQUE,
  stripe_payment_intent_id  text UNIQUE,
  stripe_customer_id        text,
  status                    store_order_status NOT NULL DEFAULT 'pending',
  -- Valores em centavos
  subtotal_cents            integer NOT NULL DEFAULT 0,
  discount_cents            integer NOT NULL DEFAULT 0,
  tax_cents                 integer NOT NULL DEFAULT 0,
  total_cents               integer NOT NULL DEFAULT 0,
  currency                  text NOT NULL DEFAULT 'brl',
  -- Comprador
  buyer_email               text NOT NULL,
  buyer_name                text,
  buyer_phone               text,
  buyer_cpf                 text,                    -- nunca indexar em claro
  -- Endereços (snapshot no momento do pedido)
  billing_address           jsonb,
  shipping_address          jsonb,
  -- Cupom
  coupon_id                 uuid REFERENCES store_coupons(id) ON DELETE SET NULL,
  coupon_code_snapshot      text,
  -- Fiscal
  nfse_id                   text,                    -- ID na NFE.io
  nfse_number               text,
  nfse_status               text,
  nfse_url                  text,
  -- NF emitida em
  nfse_issued_at            timestamptz,
  -- Antifraude
  ip_address                inet,
  user_agent                text,
  recaptcha_score           numeric(3,2),
  -- Controle
  idempotency_key           text UNIQUE,             -- hash(cart_id+version)
  notes                     text,
  metadata                  jsonb NOT NULL DEFAULT '{}',
  -- Timestamps de estado
  pending_at                timestamptz DEFAULT now(),
  paid_at                   timestamptz,
  failed_at                 timestamptz,
  refunded_at               timestamptz,
  cancelled_at              timestamptz,
  -- Padrão
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

-- ── Itens do pedido ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_order_items (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          uuid NOT NULL REFERENCES store_orders(id) ON DELETE CASCADE,
  stripe_price_id   text NOT NULL,
  product_snapshot  jsonb NOT NULL DEFAULT '{}',  -- nome, imagem, slug no momento da compra
  quantity          integer NOT NULL DEFAULT 1,
  unit_amount       integer NOT NULL,
  total_amount      integer NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- ── Timeline do pedido ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_order_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    uuid NOT NULL REFERENCES store_orders(id) ON DELETE CASCADE,
  status      store_order_status NOT NULL,
  note        text,
  actor       text DEFAULT 'system',   -- 'system', 'admin', 'customer'
  metadata    jsonb NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ── Webhook events (dedupe + audit) ──────────────────────────
CREATE TABLE IF NOT EXISTS store_webhook_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      text NOT NULL UNIQUE,   -- id do evento Stripe (deduplicação)
  event_type    text NOT NULL,
  payload       jsonb NOT NULL DEFAULT '{}',
  processed_at  timestamptz,
  error         text,
  attempts      integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Dead letter para webhooks que falharam 3x
CREATE TABLE IF NOT EXISTS store_webhook_dead_letter (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      text NOT NULL,
  event_type    text NOT NULL,
  payload       jsonb NOT NULL DEFAULT '{}',
  last_error    text,
  attempts      integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ── Wishlists ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS store_wishlists (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  price_id    uuid NOT NULL REFERENCES store_prices(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, price_id)
);

-- ── Notificar quando produto volta ao estoque ─────────────────
CREATE TABLE IF NOT EXISTS store_restock_alerts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL,
  variant_id  uuid NOT NULL REFERENCES store_product_variants(id) ON DELETE CASCADE,
  notified_at timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, variant_id)
);

-- ── Índices ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_store_orders_user         ON store_orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_store_orders_session      ON store_orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_store_orders_status       ON store_orders(status);
CREATE INDEX IF NOT EXISTS idx_store_orders_idempotency  ON store_orders(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_store_order_items_order   ON store_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_store_order_events_order  ON store_order_events(order_id);
CREATE INDEX IF NOT EXISTS idx_store_cart_user           ON store_carts(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_store_cart_session        ON store_carts(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_store_cart_items_cart     ON store_cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_store_webhook_event_id    ON store_webhook_events(event_id);
CREATE INDEX IF NOT EXISTS idx_store_wishlists_user      ON store_wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_store_addresses_user      ON store_addresses(user_id);

-- ── updated_at triggers ──────────────────────────────────────
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY[
    'store_addresses','store_carts','store_cart_items',
    'store_coupons','store_orders'
  ] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s', t, t);
    EXECUTE format('CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION store_set_updated_at()', t, t);
  END LOOP;
END $$;

-- ── Trigger: inserir evento na timeline quando status muda ────
CREATE OR REPLACE FUNCTION store_orders_insert_event()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF (TG_OP = 'INSERT') OR (OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO store_order_events(order_id, status, actor)
    VALUES (NEW.id, NEW.status, 'system');
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_store_orders_event ON store_orders;
CREATE TRIGGER trg_store_orders_event
  AFTER INSERT OR UPDATE OF status ON store_orders
  FOR EACH ROW EXECUTE FUNCTION store_orders_insert_event();

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE store_addresses           ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_carts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_cart_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_coupons             ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_orders              ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_order_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_order_events        ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_webhook_events      ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_webhook_dead_letter ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_wishlists           ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_restock_alerts      ENABLE ROW LEVEL SECURITY;

-- Endereços: só o dono lê/escreve
CREATE POLICY "store_addresses_owner" ON store_addresses
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Carrinhos: dono ou service_role
CREATE POLICY "store_carts_owner" ON store_carts
  USING (user_id = auth.uid() OR auth.role() = 'service_role');

CREATE POLICY "store_cart_items_owner" ON store_cart_items
  USING (cart_id IN (SELECT id FROM store_carts WHERE user_id = auth.uid())
         OR auth.role() = 'service_role');

-- Cupons: leitura pública (validação no server) para código ativo
CREATE POLICY "store_coupons_public_read" ON store_coupons
  FOR SELECT USING (active = true);

-- Pedidos: só o dono vê os próprios
CREATE POLICY "store_orders_owner" ON store_orders
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "store_orders_service_write" ON store_orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "store_order_items_owner" ON store_order_items
  FOR SELECT USING (
    order_id IN (SELECT id FROM store_orders WHERE user_id = auth.uid())
  );

CREATE POLICY "store_order_items_service" ON store_order_items
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "store_order_events_owner" ON store_order_events
  FOR SELECT USING (
    order_id IN (SELECT id FROM store_orders WHERE user_id = auth.uid())
  );

-- Webhooks: só service_role
CREATE POLICY "store_webhooks_service" ON store_webhook_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "store_dlq_service" ON store_webhook_dead_letter
  FOR ALL USING (auth.role() = 'service_role');

-- Wishlists: dono
CREATE POLICY "store_wishlists_owner" ON store_wishlists
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Restock alerts: insert livre, leitura só service_role
CREATE POLICY "store_restock_insert" ON store_restock_alerts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "store_restock_service" ON store_restock_alerts
  FOR SELECT USING (auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════════
-- DOWN:
-- ALTER TABLE profiles DROP COLUMN IF EXISTS stripe_customer_id;
-- DROP TABLE IF EXISTS store_restock_alerts, store_wishlists,
--   store_webhook_dead_letter, store_webhook_events,
--   store_order_events, store_order_items, store_orders,
--   store_coupons, store_cart_items, store_carts,
--   store_addresses CASCADE;
-- DROP TYPE IF EXISTS store_order_status;
-- ═══════════════════════════════════════════════════════════════
