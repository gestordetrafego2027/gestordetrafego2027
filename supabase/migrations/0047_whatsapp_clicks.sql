-- Registra cada clique no botão/link de WhatsApp do site público.
-- Permite análise de origem, página, dispositivo e volume por período.

CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),

  -- contexto do clique
  source      text,         -- página onde ocorreu (ex: '/pt/studio')
  location    text,         -- qual botão/link (ex: 'floating_button', 'hero_cta', 'footer')
  message     text,         -- texto pré-preenchido enviado (truncado em 500 chars)

  -- dados do visitante (sem PII obrigatório)
  ip          text,
  user_agent  text,

  -- utm passado na URL do visitante
  utm         jsonb DEFAULT '{}'::jsonb
);

-- Sem RLS: INSERT feito via service role pela API route (anon não acessa).
-- Leitura reservada ao CRM (role autenticado).
ALTER TABLE whatsapp_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_insert" ON whatsapp_clicks
  FOR INSERT WITH CHECK (true);   -- API route usa service role

CREATE POLICY "auth_read" ON whatsapp_clicks
  FOR SELECT USING (auth.role() = 'authenticated');

-- Índices para os relatórios mais comuns
CREATE INDEX ON whatsapp_clicks (created_at DESC);
CREATE INDEX ON whatsapp_clicks (source);
CREATE INDEX ON whatsapp_clicks (location);
