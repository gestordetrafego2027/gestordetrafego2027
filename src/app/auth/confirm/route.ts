// /auth/confirm — valida links de e-mail pelo `token_hash` (verifyOtp).
//
// Por que não usar o /auth/v1/verify do Supabase (`{{ .ConfirmationURL }}`):
// aquele link entrega um `?code=` de PKCE, e trocar o code por sessão exige o
// cookie `code_verifier` gravado no MESMO navegador que pediu a recuperação.
// Quem pede no desktop e abre o e-mail no celular recebe
// "PKCE code verifier not found in storage" — falha garantida.
//
// `verifyOtp({ token_hash, type })` não depende de estado prévio no cliente:
// funciona em qualquer dispositivo, e já grava os cookies de sessão.

import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { resolveSiteOrigin, safeNext } from '@/lib/auth/site-url'
import { friendlyAuthError, failurePath } from '@/lib/auth/errors'

export const dynamic = 'force-dynamic'

const VALID_TYPES: EmailOtpType[] = [
  'recovery',
  'invite',
  'magiclink',
  'signup',
  'email',
  'email_change',
]

export async function GET(req: Request) {
  const url = new URL(req.url)
  const origin = resolveSiteOrigin(req.headers)

  const tokenHash = url.searchParams.get('token_hash')
  const rawType = url.searchParams.get('type')
  const type = VALID_TYPES.includes(rawType as EmailOtpType) ? (rawType as EmailOtpType) : null
  const next = safeNext(url.searchParams.get('next'))

  const fail = (message: string) =>
    NextResponse.redirect(
      new URL(`${failurePath(rawType)}?error=${encodeURIComponent(message)}`, origin),
    )

  // Supabase manda o erro no próprio redirect quando o token já morreu.
  const errorParam = url.searchParams.get('error')
  if (errorParam) {
    return fail(
      friendlyAuthError(
        url.searchParams.get('error_description') ?? errorParam,
        url.searchParams.get('error_code'),
      ),
    )
  }

  if (!tokenHash || !type) {
    return fail('Link incompleto ou inválido. Solicite um novo.')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })

  if (error) {
    return fail(friendlyAuthError(error.message, error.code))
  }

  return NextResponse.redirect(new URL(next, origin))
}
