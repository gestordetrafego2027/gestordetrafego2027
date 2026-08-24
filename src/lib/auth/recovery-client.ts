import { createClient } from '@supabase/supabase-js'

/**
 * Cliente usado só para disparar o e-mail de recuperação de senha.
 *
 * Por que não o cliente SSR: ele opera em PKCE, o que faz o link do e-mail
 * chegar como `?code=`. Trocar esse code por sessão exige o cookie
 * `code_verifier` gravado no MESMO navegador que pediu a recuperação — pedir no
 * desktop e abrir o e-mail no celular falha com
 * "PKCE code verifier not found in storage".
 *
 * No fluxo implícito o link volta com `#access_token=...` no hash, que a ponte
 * em /auth/callback converte em sessão por POST. Funciona em qualquer
 * dispositivo sem depender de estado prévio no cliente.
 *
 * Compatível com o template de `token_hash`: quando o template do Dashboard
 * estiver atualizado, o link vai direto para /auth/confirm e nem passa por aqui.
 *
 * `persistSession: false` — este cliente não deve encostar nos cookies de quem
 * está pedindo a recuperação.
 */
export function recoveryEmailClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error('Supabase env vars ausentes (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY)')
  }

  return createClient(url, anonKey, {
    auth: {
      flowType: 'implicit',
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
