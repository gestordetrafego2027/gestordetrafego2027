import { NextResponse } from 'next/server'

// Liveness probe — usado pelo HEALTHCHECK do container.
// Responde 200 desde que o processo esteja de pé, SEM tocar em
// dependências externas (Supabase/Stripe/Upstash). Assim, um soluço
// de dependência não derruba o container nem provoca rollback do deploy.
// A checagem profunda (readiness) fica em /api/health.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { status: 200 },
  )
}
