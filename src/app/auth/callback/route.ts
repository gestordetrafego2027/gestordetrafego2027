// /auth/callback — recebe redirect do Supabase (signup, recuperação de senha,
// magic link, OAuth). Troca o code por sessão e manda pro `next`.
//
// Supabase 2.x usa PKCE flow → o link contem ?code=xxx.
// Magic link clássico pode chegar com #access_token=... (não vem pro servidor);
// tratamos esse caso com um HTML fallback que extrai do hash e re-POSTa.

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/crm'
  const error = url.searchParams.get('error')
  const errorDesc = url.searchParams.get('error_description')

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorDesc ?? error)}`, url.origin),
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchErr } = await supabase.auth.exchangeCodeForSession(code)
    if (exchErr) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(exchErr.message)}`, url.origin),
      )
    }
    return NextResponse.redirect(new URL(next, url.origin))
  }

  // Sem `code` na query: link veio com #access_token no hash (fluxo legado).
  // Servimos HTML que captura do hash e redireciona pelo client.
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Autenticando…</title>
<style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#fafafa;color:#111}</style>
</head><body><div>Autenticando…</div>
<script>
(function(){
  var hash = window.location.hash || '';
  if (!hash || !hash.includes('access_token')) {
    window.location.replace('/login?error=' + encodeURIComponent('Link invalido ou expirado.'));
    return;
  }
  // Troca o hash por query string e redireciona pro endpoint que processa
  var params = new URLSearchParams(hash.substring(1));
  var target = ${JSON.stringify(next)} + (${JSON.stringify(next)}.includes('?') ? '&' : '?') +
               '_at=' + encodeURIComponent(params.get('access_token') || '') +
               '&_rt=' + encodeURIComponent(params.get('refresh_token') || '');
  window.location.replace(target);
})();
</script></body></html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
