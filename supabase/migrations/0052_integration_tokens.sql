-- ═══════════════════════════════════════════════════════════════════════════
-- 0052 — Tokens de integrações externas (renovação automática)
--
-- Guarda tokens de longa duração que precisam ser renovados periodicamente e
-- sobreviver a redeploy do container (env var é estática; o token renovado não).
-- Primeiro caso de uso: Instagram Graph API, cujo token expira em ~60 dias.
--
-- Segurança: RLS ligado sem policy pública. Só o service_role (server-side)
-- enxerga a tabela — token é segredo, nunca vai para o client.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS integration_tokens (
  key           text PRIMARY KEY,          -- ex.: 'instagram'
  access_token  text NOT NULL,
  expires_at    timestamptz,               -- quando o token perde validade
  refreshed_at  timestamptz DEFAULT now(), -- última renovação bem-sucedida
  metadata      jsonb DEFAULT '{}',
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

DROP TRIGGER IF EXISTS integration_tokens_set_updated_at ON integration_tokens;
CREATE TRIGGER integration_tokens_set_updated_at
  BEFORE UPDATE ON integration_tokens
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE integration_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON integration_tokens;
CREATE POLICY "service_role_all" ON integration_tokens USING (auth.role() = 'service_role');

COMMENT ON TABLE integration_tokens IS
  'Tokens de integrações externas com renovação automática (Instagram Graph API etc.). Acesso restrito ao service_role.';
