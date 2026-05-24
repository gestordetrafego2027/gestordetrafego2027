import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return new NextResponse('<h2>Link inválido.</h2>', { status: 400, headers: { 'content-type': 'text/html' } })
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ active: false, unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)

  if (error) {
    return new NextResponse('<h2>Erro ao processar. Tente novamente.</h2>', { status: 500, headers: { 'content-type': 'text/html' } })
  }

  // Redirecionar para página de confirmação
  return NextResponse.redirect(new URL('/pt/newsletter/cancelado', req.url))
}
