import { NextResponse } from 'next/server'
import { getInstagramPosts, INSTAGRAM_PROFILE_URL } from '@/lib/instagram'

/**
 * Feed público dos últimos posts do @housemazzutti.
 * Consumido pela seção de Instagram da home (componente client).
 * O cache real está no fetch da Graph API (1h) — aqui a resposta também
 * carrega Cache-Control para o CDN não bater na rota a cada visita.
 */
export const runtime = 'nodejs'
export const revalidate = 3600

const DEFAULT_LIMIT = 3
const MAX_LIMIT = 12

export async function GET(request: Request) {
  const requested = Number(new URL(request.url).searchParams.get('limit'))
  const limit =
    Number.isFinite(requested) && requested > 0
      ? Math.min(Math.trunc(requested), MAX_LIMIT)
      : DEFAULT_LIMIT

  const feed = await getInstagramPosts(limit)

  return NextResponse.json(
    { ...feed, profileUrl: INSTAGRAM_PROFILE_URL },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  )
}
