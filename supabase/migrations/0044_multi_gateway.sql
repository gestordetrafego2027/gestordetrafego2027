-- ═══════════════════════════════════════════════════════════════
-- Migration 0044 — Multi-gateway (Asaas) para store_orders
-- Adiciona suporte a múltiplos provedores de pagamento (Stripe + Asaas)
-- e tabela de dedupe de webhooks Asaas.
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE store_orders
  ADD COLUMN IF NOT EXISTS payment_provider text
    CHECK (payment_provider IN ('stripe', 'asaas')) DEFAULT 'stripe',
  ADD COLUMN IF NOT EXISTS asaas_payment_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS asaas_customer_id text;

CREATE TABLE IF NOT EXISTS asaas_webhook_events (
  event_id    text PRIMARY KEY,
  event_type  text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  payload     jsonb NOT NULL
);

CREATE INDEX IF NOT EXISTS store_orders_asaas_payment_id_idx
  ON store_orders(asaas_payment_id) WHERE asaas_payment_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS store_orders_payment_provider_idx
  ON store_orders(payment_provider);

ALTER TABLE asaas_webhook_events ENABLE ROW LEVEL SECURITY;
-- Sem policies públicas: apenas service_role consegue ler/gravar.
