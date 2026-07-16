-- ─── Newsletter & Growth Infrastructure ───────────────────────────────────────
-- Cria newsletter_subscribers (tabela que a API já referencia mas não existe em prod)
-- + email_sequences para automações pós-compra e nutrição de leads

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email        text NOT NULL UNIQUE,
  name         text,
  source       text DEFAULT 'blog',
  status       text DEFAULT 'active' CHECK (status IN ('active','unsubscribed','bounced')),
  utm          jsonb DEFAULT '{}',
  tags         text[] DEFAULT '{}',
  welcome_sent boolean DEFAULT false,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- índices para consultas comuns
CREATE INDEX IF NOT EXISTS newsletter_subscribers_status_idx ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at_idx ON newsletter_subscribers(created_at DESC);

-- RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
-- Somente service role pode ler/escrever
CREATE POLICY "service_role_all" ON newsletter_subscribers USING (auth.role() = 'service_role');

-- Trigger: updated_at automático
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS newsletter_subscribers_updated_at ON newsletter_subscribers;
CREATE TRIGGER newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Email send log (rastreia todos os emails transacionais) ──────────────────
CREATE TABLE IF NOT EXISTS email_send_log (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email     text NOT NULL,
  subject      text NOT NULL,
  template     text,
  resend_id    text,
  status       text DEFAULT 'sent' CHECK (status IN ('sent','failed','bounced','opened')),
  metadata     jsonb DEFAULT '{}',
  created_at   timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS email_send_log_to_email_idx ON email_send_log(to_email);
CREATE INDEX IF NOT EXISTS email_send_log_created_at_idx ON email_send_log(created_at DESC);

ALTER TABLE email_send_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON email_send_log USING (auth.role() = 'service_role');

-- ─── Growth events (analytics de crescimento) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS growth_events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type   text NOT NULL, -- 'newsletter_signup','lead_created','order_placed','upsell_clicked'
  session_id   text,
  user_id      uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email        text,
  properties   jsonb DEFAULT '{}',
  created_at   timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS growth_events_event_type_idx ON growth_events(event_type);
CREATE INDEX IF NOT EXISTS growth_events_created_at_idx ON growth_events(created_at DESC);

ALTER TABLE growth_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON growth_events USING (auth.role() = 'service_role');

COMMENT ON TABLE newsletter_subscribers IS 'Assinantes da newsletter House Mazzutti';
COMMENT ON TABLE email_send_log IS 'Log de todos os emails transacionais enviados via Resend';
COMMENT ON TABLE growth_events IS 'Eventos de crescimento para analytics de funil';
