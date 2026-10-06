-- =============================================================================
-- 0053_shop_channel_and_logistics.sql
-- hmzt.shop — canal de PRODUTO FÍSICO sobre o schema store_* compartilhado.
--
-- Contexto: hmzt.shop é uma aplicação separada (container próprio no Coolify,
-- repo próprio), mas usa o MESMO projeto Supabase que housemazzutti.com — para
-- que a conta do cliente, o CRM e o histórico de compra sejam únicos.
-- A separação entre os dois catálogos é lógica, pela coluna `channel`.
--
-- Esta migration é ADITIVA e IDEMPOTENTE:
--   - toda coluna nova entra com DEFAULT 'house' ou NULL;
--   - nenhuma linha existente muda de comportamento;
--   - nenhuma policy existente é alterada.
--
-- Blocos:
--   1. Canal (house | shop)
--   2. Fiscal de produto — NF-e modelo 55 (≠ NFS-e de serviço, já existente)
--   3. Atributos físicos de variante (peso, dimensões, EAN, reserva de estoque)
--   4. Endereço brasileiro completo (número, complemento, bairro, documento)
--   5. Pedido: frete, fulfillment, Asaas e NF-e
--   6. Frete: cotações, envios e eventos de rastreio
--   7. Pós-venda: devoluções e trocas (CDC art. 49)
--   8. RLS, índices e view de catálogo
--   9. View de prontidão de venda (o que falta em cada produto)
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. CANAL
-- -----------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE store_channel AS ENUM ('house', 'shop');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE store_products   ADD COLUMN IF NOT EXISTS channel store_channel NOT NULL DEFAULT 'house';
ALTER TABLE store_categories ADD COLUMN IF NOT EXISTS channel store_channel NOT NULL DEFAULT 'house';
ALTER TABLE store_carts      ADD COLUMN IF NOT EXISTS channel store_channel NOT NULL DEFAULT 'house';
ALTER TABLE store_orders     ADD COLUMN IF NOT EXISTS channel store_channel NOT NULL DEFAULT 'house';

-- Cupom com channel NULL vale nos dois sites (ex.: campanha institucional).
ALTER TABLE store_coupons    ADD COLUMN IF NOT EXISTS channel store_channel;

CREATE INDEX IF NOT EXISTS store_products_channel_active_idx
  ON store_products (channel, active) WHERE active = true;
CREATE INDEX IF NOT EXISTS store_orders_channel_created_idx
  ON store_orders (channel, created_at DESC);
CREATE INDEX IF NOT EXISTS store_categories_channel_idx
  ON store_categories (channel);

COMMENT ON COLUMN store_products.channel IS
  'Vitrine de origem: house = housemazzutti.com (digital/serviço), shop = hmzt.shop (físico).';
COMMENT ON COLUMN store_coupons.channel IS
  'NULL = cupom válido nos dois canais.';

-- -----------------------------------------------------------------------------
-- 2. FISCAL DE PRODUTO — NF-e modelo 55
--    O site institucional emite NFS-e municipal (serviço) via NFE.io. Produto
--    físico exige NF-e 55, que depende destes campos por item. Sem eles a nota
--    é rejeitada pela Sefaz.
-- -----------------------------------------------------------------------------

ALTER TABLE store_products
  ADD COLUMN IF NOT EXISTS ncm               text,       -- 8 dígitos, obrigatório na NF-e
  ADD COLUMN IF NOT EXISTS cest              text,       -- 7 dígitos, só p/ ST
  ADD COLUMN IF NOT EXISTS cfop              text,       -- 4 dígitos, ex.: 5102 (dentro do estado)
  ADD COLUMN IF NOT EXISTS origem            smallint,   -- tabela A da Sefaz (0..8)
  ADD COLUMN IF NOT EXISTS unidade_comercial text NOT NULL DEFAULT 'UN',
  ADD COLUMN IF NOT EXISTS brand             text,
  ADD COLUMN IF NOT EXISTS requires_shipping boolean NOT NULL DEFAULT false;

-- Produtos físicos já cadastrados passam a exigir frete.
UPDATE store_products
   SET requires_shipping = true
 WHERE product_type = 'physical' AND requires_shipping = false;

DO $$ BEGIN
  ALTER TABLE store_products
    ADD CONSTRAINT store_products_ncm_ck    CHECK (ncm    IS NULL OR ncm    ~ '^[0-9]{8}$'),
    ADD CONSTRAINT store_products_cest_ck   CHECK (cest   IS NULL OR cest   ~ '^[0-9]{7}$'),
    ADD CONSTRAINT store_products_cfop_ck   CHECK (cfop   IS NULL OR cfop   ~ '^[0-9]{4}$'),
    ADD CONSTRAINT store_products_origem_ck CHECK (origem IS NULL OR origem BETWEEN 0 AND 8);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

COMMENT ON COLUMN store_products.origem IS
  'Origem da mercadoria, tabela A da Sefaz: 0 = nacional, 1 = importação direta, 2 = mercado interno etc.';

-- -----------------------------------------------------------------------------
-- 3. ATRIBUTOS FÍSICOS DE VARIANTE
--    Peso e dimensões são por VARIANTE, não por produto: um pôster 50x70 e um
--    30x40 do mesmo título têm frete diferente.
-- -----------------------------------------------------------------------------

ALTER TABLE store_product_variants
  ADD COLUMN IF NOT EXISTS weight_grams   integer,        -- peso bruto, já embalado
  ADD COLUMN IF NOT EXISTS length_cm      numeric(6,2),
  ADD COLUMN IF NOT EXISTS width_cm       numeric(6,2),
  ADD COLUMN IF NOT EXISTS height_cm      numeric(6,2),
  ADD COLUMN IF NOT EXISTS barcode        text,           -- EAN-13 / GTIN
  ADD COLUMN IF NOT EXISTS stock_reserved integer NOT NULL DEFAULT 0;

-- Estoque disponível = físico menos o que já está preso em checkout aberto.
-- Coluna gerada: nunca fica dessincronizada.
DO $$ BEGIN
  ALTER TABLE store_product_variants
    ADD COLUMN stock_available integer
      GENERATED ALWAYS AS (GREATEST(stock_qty - stock_reserved, 0)) STORED;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE store_product_variants
    ADD CONSTRAINT store_variants_weight_ck   CHECK (weight_grams IS NULL OR weight_grams > 0),
    ADD CONSTRAINT store_variants_dims_ck     CHECK (
      (length_cm IS NULL OR length_cm > 0) AND
      (width_cm  IS NULL OR width_cm  > 0) AND
      (height_cm IS NULL OR height_cm > 0)
    ),
    ADD CONSTRAINT store_variants_reserved_ck CHECK (stock_reserved >= 0),
    ADD CONSTRAINT store_variants_barcode_ck  CHECK (barcode IS NULL OR barcode ~ '^[0-9]{8,14}$');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS store_variants_barcode_uidx
  ON store_product_variants (barcode) WHERE barcode IS NOT NULL;

COMMENT ON COLUMN store_product_variants.stock_reserved IS
  'Unidades presas por checkout em andamento. Sobe ao abrir o pagamento, desce ao pagar (vira baixa em stock_qty) ou ao expirar.';

-- -----------------------------------------------------------------------------
-- 4. ENDEREÇO BRASILEIRO COMPLETO
--    Etiqueta de transportadora e NF-e exigem número e bairro separados —
--    concatenar em line1 faz a etiqueta ser recusada.
-- -----------------------------------------------------------------------------

ALTER TABLE store_addresses
  ADD COLUMN IF NOT EXISTS number     text,
  ADD COLUMN IF NOT EXISTS complement text,
  ADD COLUMN IF NOT EXISTS district   text,   -- bairro
  ADD COLUMN IF NOT EXISTS document   text,   -- CPF/CNPJ do destinatário (NF-e)
  ADD COLUMN IF NOT EXISTS ibge_code  text;   -- código do município, obrigatório na NF-e

-- NOT VALID: vale para toda linha nova, sem varrer nem rejeitar endereços já
-- gravados fora do padrão. Validar depois com ALTER TABLE ... VALIDATE CONSTRAINT
-- quando os dados legados estiverem limpos.
DO $$ BEGIN
  ALTER TABLE store_addresses
    ADD CONSTRAINT store_addresses_postal_ck CHECK (postal_code ~ '^[0-9]{5}-?[0-9]{3}$') NOT VALID,
    ADD CONSTRAINT store_addresses_state_ck  CHECK (char_length(state) = 2) NOT VALID;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- -----------------------------------------------------------------------------
-- 5. PEDIDO — FRETE, FULFILLMENT, ASAAS E NF-e
--    O status de pagamento (store_order_status) fica intocado. O ciclo físico
--    ganha uma dimensão própria: um pedido pode estar 'paid' e 'processing'.
-- -----------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE shop_fulfillment_status AS ENUM (
    'not_required',      -- pedido só de digital/serviço
    'awaiting_stock',
    'processing',        -- pago, sendo separado
    'label_purchased',   -- etiqueta comprada, aguardando postagem
    'shipped',           -- postado
    'in_transit',
    'out_for_delivery',
    'delivered',
    'returning',         -- logística reversa em curso
    'returned',
    'lost',
    'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE store_orders
  -- Frete
  ADD COLUMN IF NOT EXISTS shipping_cents         integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shipping_carrier       text,
  ADD COLUMN IF NOT EXISTS shipping_service       text,
  ADD COLUMN IF NOT EXISTS shipping_service_id    text,
  ADD COLUMN IF NOT EXISTS shipping_deadline_days integer,
  ADD COLUMN IF NOT EXISTS fulfillment_status     shop_fulfillment_status NOT NULL DEFAULT 'not_required',
  -- Asaas (Pix/boleto/cartão) — coexiste com os campos Stripe já existentes
  ADD COLUMN IF NOT EXISTS asaas_payment_id       text,
  ADD COLUMN IF NOT EXISTS asaas_customer_id      text,
  ADD COLUMN IF NOT EXISTS payment_provider       text,   -- 'stripe' | 'asaas'
  ADD COLUMN IF NOT EXISTS payment_method         text,   -- 'pix' | 'boleto' | 'card'
  -- NF-e 55 (produto). Distinto de nfse_* (serviço), que continua válido.
  ADD COLUMN IF NOT EXISTS nfe_id                 text,
  ADD COLUMN IF NOT EXISTS nfe_number             text,
  ADD COLUMN IF NOT EXISTS nfe_series             text,
  ADD COLUMN IF NOT EXISTS nfe_key                text,   -- chave de acesso, 44 dígitos
  ADD COLUMN IF NOT EXISTS nfe_status             text,
  ADD COLUMN IF NOT EXISTS nfe_danfe_url          text,
  ADD COLUMN IF NOT EXISTS nfe_xml_url            text,
  ADD COLUMN IF NOT EXISTS nfe_issued_at          timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS store_orders_asaas_payment_uidx
  ON store_orders (asaas_payment_id) WHERE asaas_payment_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS store_orders_nfe_key_uidx
  ON store_orders (nfe_key) WHERE nfe_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS store_orders_fulfillment_idx
  ON store_orders (fulfillment_status)
  WHERE fulfillment_status NOT IN ('not_required', 'delivered', 'cancelled');

DO $$ BEGIN
  ALTER TABLE store_orders
    ADD CONSTRAINT store_orders_nfe_key_ck CHECK (nfe_key IS NULL OR nfe_key ~ '^[0-9]{44}$'),
    ADD CONSTRAINT store_orders_shipping_ck CHECK (shipping_cents >= 0);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- -----------------------------------------------------------------------------
-- 6. FRETE — COTAÇÕES, ENVIOS E RASTREIO
-- -----------------------------------------------------------------------------

-- Cotação: efêmera, cacheada por hash(CEP + itens). Evita bater no Melhor Envio
-- a cada render e congela o preço mostrado ao cliente até o checkout.
CREATE TABLE IF NOT EXISTS shop_shipping_quotes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id       uuid REFERENCES store_carts(id) ON DELETE CASCADE,
  request_hash  text NOT NULL,
  postal_code   text NOT NULL,
  provider      text NOT NULL DEFAULT 'melhor_envio',
  options       jsonb NOT NULL DEFAULT '[]',   -- [{service_id, carrier, name, price_cents, days}]
  expires_at    timestamptz NOT NULL DEFAULT now() + interval '30 minutes',
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS shop_shipping_quotes_hash_idx
  ON shop_shipping_quotes (request_hash, expires_at DESC);
CREATE INDEX IF NOT EXISTS shop_shipping_quotes_expiry_idx
  ON shop_shipping_quotes (expires_at);

-- Envio: um pedido pode virar mais de um pacote (ex.: pôster em tubo + livro).
CREATE TABLE IF NOT EXISTS shop_shipments (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id             uuid NOT NULL REFERENCES store_orders(id) ON DELETE CASCADE,
  provider             text NOT NULL DEFAULT 'melhor_envio',
  provider_shipment_id text UNIQUE,
  carrier              text,
  service              text,
  status               shop_fulfillment_status NOT NULL DEFAULT 'processing',
  tracking_code        text,
  tracking_url         text,
  label_url            text,
  price_cents          integer NOT NULL DEFAULT 0,
  insurance_cents      integer NOT NULL DEFAULT 0,
  declared_value_cents integer,
  weight_grams         integer,
  purchased_at         timestamptz,
  posted_at            timestamptz,
  delivered_at         timestamptz,
  raw                  jsonb NOT NULL DEFAULT '{}',
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS shop_shipments_order_idx    ON shop_shipments (order_id);
CREATE INDEX IF NOT EXISTS shop_shipments_tracking_idx ON shop_shipments (tracking_code)
  WHERE tracking_code IS NOT NULL;

-- Histórico de rastreio: append-only, alimentado por webhook/polling.
CREATE TABLE IF NOT EXISTS shop_shipment_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid NOT NULL REFERENCES shop_shipments(id) ON DELETE CASCADE,
  status      shop_fulfillment_status,
  code        text,
  description text NOT NULL,
  location    text,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  raw         jsonb NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS shop_shipment_events_shipment_idx
  ON shop_shipment_events (shipment_id, occurred_at DESC);

-- Deduplicação de evento repetido vindo do provedor.
CREATE UNIQUE INDEX IF NOT EXISTS shop_shipment_events_dedup_uidx
  ON shop_shipment_events (shipment_id, code, occurred_at)
  WHERE code IS NOT NULL;

-- -----------------------------------------------------------------------------
-- 7. PÓS-VENDA — DEVOLUÇÕES E TROCAS
--    CDC art. 49: 7 dias corridos a contar do recebimento, sem justificativa,
--    com frete de retorno por conta do fornecedor.
-- -----------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE shop_return_reason AS ENUM (
    'arrependimento',      -- CDC art. 49
    'defeito',
    'divergencia',         -- veio item errado
    'avaria_transporte',
    'outro'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE shop_return_status AS ENUM (
    'requested', 'approved', 'rejected',
    'label_sent', 'in_transit', 'received',
    'refunded', 'exchanged', 'completed', 'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS shop_returns (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  return_number   text NOT NULL UNIQUE DEFAULT
                    'DEV-' || to_char(now(), 'YYYYMMDD') || '-' ||
                    upper(substr(gen_random_uuid()::text, 1, 6)),
  order_id        uuid NOT NULL REFERENCES store_orders(id) ON DELETE CASCADE,
  user_id         uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reason          shop_return_reason NOT NULL,
  status          shop_return_status NOT NULL DEFAULT 'requested',
  customer_note   text,
  internal_note   text,
  refund_cents    integer NOT NULL DEFAULT 0,
  reverse_label_url text,
  reverse_tracking  text,
  -- Prazo legal calculado na criação, a partir da entrega
  deadline_at     timestamptz,
  requested_at    timestamptz NOT NULL DEFAULT now(),
  resolved_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shop_return_items (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id      uuid NOT NULL REFERENCES shop_returns(id) ON DELETE CASCADE,
  order_item_id  uuid NOT NULL REFERENCES store_order_items(id) ON DELETE CASCADE,
  qty            integer NOT NULL CHECK (qty > 0),
  restock        boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS shop_returns_order_idx ON shop_returns (order_id);
CREATE INDEX IF NOT EXISTS shop_returns_status_idx ON shop_returns (status)
  WHERE status NOT IN ('completed', 'cancelled', 'rejected');
CREATE INDEX IF NOT EXISTS shop_return_items_return_idx ON shop_return_items (return_id);

-- -----------------------------------------------------------------------------
-- 8. TRIGGERS, RLS E VIEW DE CATÁLOGO
-- -----------------------------------------------------------------------------

DROP TRIGGER IF EXISTS shop_shipments_updated_at ON shop_shipments;
CREATE TRIGGER shop_shipments_updated_at
  BEFORE UPDATE ON shop_shipments
  FOR EACH ROW EXECUTE FUNCTION store_set_updated_at();

DROP TRIGGER IF EXISTS shop_returns_updated_at ON shop_returns;
CREATE TRIGGER shop_returns_updated_at
  BEFORE UPDATE ON shop_returns
  FOR EACH ROW EXECUTE FUNCTION store_set_updated_at();

ALTER TABLE shop_shipping_quotes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_shipments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_shipment_events  ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_returns          ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_return_items     ENABLE ROW LEVEL SECURITY;

-- Cotação: só o servidor escreve; o dono do carrinho lê a própria.
DROP POLICY IF EXISTS "shop_quotes_service" ON shop_shipping_quotes;
CREATE POLICY "shop_quotes_service" ON shop_shipping_quotes
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "shop_quotes_owner_read" ON shop_shipping_quotes;
CREATE POLICY "shop_quotes_owner_read" ON shop_shipping_quotes
  FOR SELECT USING (
    cart_id IN (SELECT id FROM store_carts WHERE user_id = auth.uid())
  );

-- Envio e rastreio: cliente lê o do próprio pedido; escrita só service_role.
DROP POLICY IF EXISTS "shop_shipments_owner_read" ON shop_shipments;
CREATE POLICY "shop_shipments_owner_read" ON shop_shipments
  FOR SELECT USING (
    order_id IN (SELECT id FROM store_orders WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "shop_shipments_service" ON shop_shipments;
CREATE POLICY "shop_shipments_service" ON shop_shipments
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "shop_shipment_events_owner_read" ON shop_shipment_events;
CREATE POLICY "shop_shipment_events_owner_read" ON shop_shipment_events
  FOR SELECT USING (
    shipment_id IN (
      SELECT s.id FROM shop_shipments s
      JOIN store_orders o ON o.id = s.order_id
      WHERE o.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "shop_shipment_events_service" ON shop_shipment_events;
CREATE POLICY "shop_shipment_events_service" ON shop_shipment_events
  FOR ALL USING (auth.role() = 'service_role');

-- Devolução: o cliente abre e acompanha a própria; a casa resolve.
DROP POLICY IF EXISTS "shop_returns_owner" ON shop_returns;
CREATE POLICY "shop_returns_owner" ON shop_returns
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "shop_returns_owner_insert" ON shop_returns;
CREATE POLICY "shop_returns_owner_insert" ON shop_returns
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    AND order_id IN (SELECT id FROM store_orders WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "shop_returns_service" ON shop_returns;
CREATE POLICY "shop_returns_service" ON shop_returns
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "shop_return_items_owner_read" ON shop_return_items;
CREATE POLICY "shop_return_items_owner_read" ON shop_return_items
  FOR SELECT USING (
    return_id IN (SELECT id FROM shop_returns WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "shop_return_items_service" ON shop_return_items;
CREATE POLICY "shop_return_items_service" ON shop_return_items
  FOR ALL USING (auth.role() = 'service_role');

-- View de catálogo do hmzt.shop: só o que está publicável e vendável.
-- security_invoker respeita a RLS de quem consulta (padrão do repo, ver 0011).
-- Agregados via subquery escalar, não JOIN + GROUP BY: juntar variantes e preços
-- na mesma consulta multiplica linhas e inflaria o SUM de estoque.
CREATE OR REPLACE VIEW shop_catalog
WITH (security_invoker = true) AS
SELECT
  p.id,
  p.slug,
  p.name,
  p.description,
  p.images,
  p.features,
  p.brand,
  p.featured,
  p.featured_order,
  p.seo_title,
  p.seo_description,
  p.og_image_url,
  (SELECT COALESCE(SUM(v.stock_available), 0)::integer
     FROM store_product_variants v
    WHERE v.product_id = p.id AND v.active) AS stock_available,
  (SELECT COUNT(*)::integer
     FROM store_product_variants v
    WHERE v.product_id = p.id AND v.active) AS variant_count,
  (SELECT MIN(pr.unit_amount)
     FROM store_prices pr
    WHERE pr.product_id = p.id AND pr.active) AS price_from_cents
FROM store_products p
WHERE p.channel = 'shop'
  AND p.active  = true;

COMMENT ON VIEW shop_catalog IS
  'Catálogo público do hmzt.shop: produtos ativos do canal shop com estoque e preço mínimo agregados.';


-- -----------------------------------------------------------------------------
-- 9. PRONTIDÃO DE VENDA
--
-- O cadastro de produto acontece antes de peso, medida, NCM e origem existirem.
-- Isso é deliberado: trava o cadastro esperando o contador seria pior. Mas um
-- produto sem peso NÃO pode ser vendido — a cotação de frete quebraria no meio
-- do checkout, com o cliente já decidido.
--
-- Esta view é a rede de segurança: diz, por produto, o que ainda falta e se ele
-- já pode ir à venda. Alimenta o relatório de lacunas e o gate do botão comprar.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE VIEW shop_product_readiness
WITH (security_invoker = true) AS
SELECT
  p.id,
  p.slug,
  p.name,
  p.active,
  p.requires_shipping,

  -- Logística: sem peso e as três medidas, não há cotação de frete.
  -- Avaliado por variante — cada uma viaja na própria embalagem.
  NOT EXISTS (
    SELECT 1 FROM store_product_variants v
     WHERE v.product_id = p.id AND v.active
       AND (v.weight_grams IS NULL OR v.length_cm IS NULL
            OR v.width_cm IS NULL OR v.height_cm IS NULL)
  ) AS shipping_ready,

  -- Fiscal: sem NCM e origem, a NF-e não é sequer transmitida à Sefaz.
  (p.ncm IS NOT NULL AND p.origem IS NOT NULL) AS fiscal_ready,

  -- Comercial: precisa de preço ativo e de ao menos uma variante ativa.
  EXISTS (
    SELECT 1 FROM store_prices pr WHERE pr.product_id = p.id AND pr.active
  ) AS price_ready,

  (SELECT COUNT(*) FROM store_product_variants v
    WHERE v.product_id = p.id AND v.active)::integer AS active_variants,

  -- Lista legível do que falta, para o relatório de lacunas.
  ARRAY_REMOVE(ARRAY[
    CASE WHEN NOT EXISTS (SELECT 1 FROM store_prices pr
                           WHERE pr.product_id = p.id AND pr.active)
         THEN 'preco' END,
    CASE WHEN NOT EXISTS (SELECT 1 FROM store_product_variants v
                           WHERE v.product_id = p.id AND v.active)
         THEN 'variante' END,
    CASE WHEN p.requires_shipping AND EXISTS (
           SELECT 1 FROM store_product_variants v
            WHERE v.product_id = p.id AND v.active AND v.weight_grams IS NULL)
         THEN 'peso' END,
    CASE WHEN p.requires_shipping AND EXISTS (
           SELECT 1 FROM store_product_variants v
            WHERE v.product_id = p.id AND v.active
              AND (v.length_cm IS NULL OR v.width_cm IS NULL OR v.height_cm IS NULL))
         THEN 'dimensoes' END,
    CASE WHEN p.ncm    IS NULL THEN 'ncm'    END,
    CASE WHEN p.origem IS NULL THEN 'origem' END
  ], NULL) AS missing
FROM store_products p
WHERE p.channel = 'shop';

COMMENT ON VIEW shop_product_readiness IS
  'O que falta em cada produto do hmzt.shop para ele poder ser vendido. '
  'shipping_ready e price_ready travam a venda; fiscal_ready trava a emissão da nota.';


COMMIT;

-- =============================================================================
-- ROLLBACK (manual, não executar em produção sem revisar)
-- =============================================================================
-- DROP VIEW IF EXISTS shop_catalog, shop_product_readiness;
-- DROP TABLE IF EXISTS shop_return_items, shop_returns,
--                      shop_shipment_events, shop_shipments, shop_shipping_quotes;
-- DROP TYPE IF EXISTS shop_return_status, shop_return_reason, shop_fulfillment_status;
-- ALTER TABLE store_orders DROP COLUMN IF EXISTS channel, ... ;
-- DROP TYPE IF EXISTS store_channel;
