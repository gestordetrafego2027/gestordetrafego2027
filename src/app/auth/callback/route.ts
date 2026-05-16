// /auth/callback — recebe redirect do Supabase (signup, recuperação de senha,
// magic link, OAuth). Troca o code por sessão e manda pro `next`.
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
  }

  return NextResponse.redirect(new URL(next, url.origin))
}
