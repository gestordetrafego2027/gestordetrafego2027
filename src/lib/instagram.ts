/**
 * Instagram — últimos conteúdos da House Mazzutti.
 *
 * Duas fontes, nessa ordem:
 *   1. AO VIVO — Instagram Graph API, quando INSTAGRAM_ACCESS_TOKEN está setado.
 *      Requer conta Business/Creator (@housemazzutti) e um token de longa duração.
 *      Cache de 1h via `next: { revalidate }` — a API da Meta é chamada no máximo
 *      1x por hora, não a cada visita.
 *   2. CURADO — src/data/instagram-curated.json, preenchido à mão com posts reais
 *      (permalink + imagem local em /public/images/instagram). Serve de fallback
 *      quando não há token ou quando a API falha/expira o token.
 *
 * Sem nenhuma das duas, retorna lista vazia — a seção cai no estado "só CTA".
 * Nunca inventar post: card sem post real é desinformação para o visitante.
 */
import { logger } from '@/lib/logger'
import curated from '@/data/instagram-curated.json'

export const INSTAGRAM_HANDLE = 'housemazzutti'
export const INSTAGRAM_PROFILE_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`

export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'

export type InstagramPost = {
  id: string
  permalink: string
  imageUrl: string
  caption: string
  mediaType: InstagramMediaType
  timestamp: string | null
}

export type InstagramFeed = {
  posts: InstagramPost[]
  /** 'live' = Graph API · 'curated' = JSON local · 'none' = nada configurado */
  source: 'live' | 'curated' | 'none'
}

const GRAPH_VERSION = process.env.INSTAGRAM_GRAPH_VERSION || 'v21.0'
const REVALIDATE_SECONDS = 3600
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'

type GraphMedia = {
  id?: string
  caption?: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink?: string
  timestamp?: string
}

/** Legenda de Instagram vem inteira; no card só cabe a primeira ideia. */
function trimCaption(caption: string | undefined, max = 140): string {
  const clean = (caption ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max).replace(/[\s,.;:-]+$/, '')}…`
}

function normalizeMediaType(raw: string | undefined): InstagramMediaType {
  if (raw === 'VIDEO' || raw === 'CAROUSEL_ALBUM') return raw
  return 'IMAGE'
}

function toPost(media: GraphMedia): InstagramPost | null {
  const mediaType = normalizeMediaType(media.media_type)
  // Vídeo/Reels não tem imagem estática em media_url — usa o thumbnail.
  const imageUrl = mediaType === 'VIDEO' ? media.thumbnail_url : media.media_url
  if (!media.id || !media.permalink || !imageUrl) return null

  return {
    id: media.id,
    permalink: media.permalink,
    imageUrl,
    caption: trimCaption(media.caption),
    mediaType,
    timestamp: media.timestamp ?? null,
  }
}

/**
 * Monta a URL da Graph API.
 * - Com INSTAGRAM_BUSINESS_ACCOUNT_ID → rota via Facebook Graph (conta ligada a Página).
 * - Sem ele → rota /me/media do Instagram Login.
 */
function buildEndpoint(token: string, limit: number): string {
  const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  const base = igUserId
    ? `https://graph.facebook.com/${GRAPH_VERSION}/${igUserId}/media`
    : `https://graph.instagram.com/${GRAPH_VERSION}/me/media`

  const params = new URLSearchParams({
    fields: FIELDS,
    // margem: itens sem imagem renderizável são descartados no normalize.
    limit: String(Math.max(limit * 3, 9)),
    access_token: token,
  })
  return `${base}?${params.toString()}`
}

function curatedPosts(limit: number): InstagramPost[] {
  const raw = (curated as { posts?: unknown }).posts
  if (!Array.isArray(raw)) return []

  return raw
    .map((item) => toPost(item as GraphMedia))
    .filter((p): p is InstagramPost => p !== null)
    .slice(0, limit)
}

async function fetchLive(limit: number): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  const res = await fetch(buildEndpoint(token, limit), {
    next: { revalidate: REVALIDATE_SECONDS, tags: ['instagram-feed'] },
    signal: AbortSignal.timeout(6000),
  })

  if (!res.ok) {
    // 190 = token expirado/revogado. É o erro esperado quando o token de 60 dias vence.
    throw new Error(`Instagram Graph API respondeu ${res.status}`)
  }

  const json = (await res.json()) as { data?: GraphMedia[] }
  return (json.data ?? [])
    .map(toPost)
    .filter((p): p is InstagramPost => p !== null)
    .slice(0, limit)
}

/** Últimos posts do @housemazzutti. Nunca lança — degrada para curado/vazio. */
export async function getInstagramPosts(limit = 3): Promise<InstagramFeed> {
  try {
    const live = await fetchLive(limit)
    if (live.length) return { posts: live, source: 'live' }
  } catch (error) {
    logger.warn(
      { err: error instanceof Error ? error.message : String(error) },
      '[instagram] feed ao vivo falhou — caindo para curado',
    )
  }

  const fallback = curatedPosts(limit)
  return fallback.length ? { posts: fallback, source: 'curated' } : { posts: [], source: 'none' }
}
