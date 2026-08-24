/**
 * Traduz erros do Supabase Auth para mensagens que dizem ao usuário o que fazer.
 * O texto cru ("Email link is invalid or has expired", "PKCE code verifier not
 * found in storage...") não ajuda ninguém e vazava detalhe de implementação na
 * URL de erro.
 */

const EXPIRED =
  'O link expirou ou já foi utilizado. Peça um novo — cada link vale 1 hora e só funciona uma vez.'

export function friendlyAuthError(raw?: string | null, code?: string | null): string {
  const text = `${code ?? ''} ${raw ?? ''}`.toLowerCase()

  if (!text.trim()) return 'Não foi possível validar o link. Solicite um novo.'
  if (
    text.includes('otp_expired') ||
    text.includes('expired') ||
    text.includes('invalid or has expired')
  )
    return EXPIRED
  if (text.includes('code verifier') || text.includes('pkce')) return EXPIRED
  if (text.includes('access_denied')) return EXPIRED
  if (text.includes('token has expired or is invalid')) return EXPIRED
  if (text.includes('user not found'))
    return 'Não encontramos uma conta para este link. Solicite um novo acesso.'
  if (text.includes('rate limit') || text.includes('too many'))
    return 'Muitas tentativas em pouco tempo. Aguarde um minuto e tente novamente.'
  if (text.includes('same password') || text.includes('should be different'))
    return 'A nova senha precisa ser diferente da anterior.'

  return 'Não foi possível validar o link. Solicite um novo.'
}

/** Tipos de e-mail que terminam na tela de definir senha. */
const PASSWORD_FLOWS = new Set(['recovery', 'invite'])

/** Para onde mandar o usuário quando o link falha. */
export function failurePath(type?: string | null): string {
  return PASSWORD_FLOWS.has(String(type)) ? '/login/recuperar/' : '/login/'
}
