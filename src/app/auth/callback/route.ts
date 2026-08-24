// /auth/callback — compatibilidade com links já enviados e com OAuth.
//
// O fluxo canônico hoje é /auth/confirm (token_hash + verifyOtp). Esta rota
// continua viva porque:
//   1. links de e-mail disparados antes da correção ainda apontam para cá;
//   2. o `?code=` de OAuth/PKCE é trocado aqui;
//   3. links legados chegam com #access_token no hash (não chega ao servidor).
//
// Regra que não pode ser quebrada: NUNCA derivar a origem do redirect de
// `url.origin`. Atrás do proxy do Coolify isso resolve para 0.0.0.0:3000 e o
// navegador recebe um Location morto. Use sempre resolveSiteOrigin().

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

  const next = safeNext(url.searchParams.get('next'))
  const rawType = url.searchParams.get('type')
  const code = url.searchParams.get('code')
  const tokenHash = url.searchParams.get('token_hash')

  const fail = (message: string) =>
    NextResponse.redirect(
      new URL(
        `${failurePath(rawType ?? typeFromNext(next))}?error=${encodeURIComponent(message)}`,
        origin,
      ),
    )

  const errorParam = url.searchParams.get('error')
  if (errorParam) {
    return fail(
      friendlyAuthError(
        url.searchParams.get('error_description') ?? errorParam,
        url.searchParams.get('error_code'),
      ),
    )
  }

  // Caminho preferido: token_hash não depende de cookie prévio no navegador.
  if (tokenHash && VALID_TYPES.includes(rawType as EmailOtpType)) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: rawType as EmailOtpType,
    })
    if (error) return fail(friendlyAuthError(error.message, error.code))
    return NextResponse.redirect(new URL(next, origin))
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return fail(friendlyAuthError(error.message, error.code))
    return NextResponse.redirect(new URL(next, origin))
  }

  // Sem `code` e sem `token_hash`: fluxo implícito, tokens vêm no hash e só o
  // navegador enxerga. Servimos HTML que devolve os tokens por POST — nunca por
  // query string, que ficaria em log de proxy e no histórico.
  return new NextResponse(hashBridgeHtml(next, origin), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
    },
  })
}

/**
 * Recebe access_token/refresh_token capturados do hash e grava a sessão.
 * Só aceita chamada da própria origem — evita login forçado por terceiro.
 */
export async function POST(req: Request) {
  const origin = resolveSiteOrigin(req.headers)
  const reqOrigin = req.headers.get('origin')
  if (reqOrigin && reqOrigin !== origin) {
    return NextResponse.json({ error: 'origem inválida' }, { status: 403 })
  }

  const form = await req.formData()
  const access_token = String(form.get('access_token') ?? '')
  const refresh_token = String(form.get('refresh_token') ?? '')

  if (!access_token || !refresh_token) {
    return NextResponse.json({ error: 'tokens ausentes' }, { status: 400 })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.setSession({ access_token, refresh_token })
  if (error) {
    return NextResponse.json(
      { error: friendlyAuthError(error.message, error.code) },
      { status: 400 },
    )
  }

  return NextResponse.json({ ok: true })
}

/** Deduz o tipo do fluxo pelo destino, para escolher a tela de erro certa. */
function typeFromNext(next: string): string | null {
  return next.startsWith('/login/redefinir') ? 'recovery' : null
}

function hashBridgeHtml(next: string, origin: string): string {
  const failUrl = `${failurePath('recovery')}?error=`
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Validando seu link…</title>
<meta name="robots" content="noindex">
<style>body{font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#fafafa;color:#111;font-size:14px}</style>
</head><body><div>Validando seu link…</div>
<script>
(function () {
  var NEXT = ${JSON.stringify(next)};
  var FAIL = ${JSON.stringify(failUrl)};
  var params = new URLSearchParams((window.location.hash || '').replace(/^#/, ''));
  history.replaceState(null, '', window.location.pathname);

  if (params.get('error') || params.get('error_code')) {
    window.location.replace(FAIL + encodeURIComponent(params.get('error_description') || params.get('error') || ''));
    return;
  }

  var at = params.get('access_token');
  var rt = params.get('refresh_token');
  if (!at || !rt) {
    window.location.replace(FAIL + encodeURIComponent('Link inválido ou já utilizado.'));
    return;
  }

  var body = new URLSearchParams({ access_token: at, refresh_token: rt });
  fetch(${JSON.stringify(`${origin}/auth/callback/`)}, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
    .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
    .then(function (res) {
      if (res.ok) window.location.replace(NEXT);
      else window.location.replace(FAIL + encodeURIComponent(res.j.error || 'Não foi possível validar o link.'));
    })
    .catch(function () {
      window.location.replace(FAIL + encodeURIComponent('Falha de conexão ao validar o link.'));
    });
})();
</script></body></html>`
}
