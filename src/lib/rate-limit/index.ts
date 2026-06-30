import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { logger } from '@/lib/logger'
import type { NextRequest } from 'next/server'

let _redis: Redis | null = null
let _limiters: Record<string, Ratelimit> = {}

function getRedis(): Redis | null {
  if (_redis) return _redis
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  _redis = new Redis({ url, token })
  return _redis
}

type LimiterKey = 'checkout' | 'coupon' | 'api_general' | 'newsletter' | 'lead' | 'auth'

const LIMITS: Record<
  LimiterKey,
  { requests: number; window: `${number} s` | `${number} m` | `${number} h` }
> = {
  checkout: { requests: 5, window: '1 m' }, // 5 checkouts/min por IP
  coupon: { requests: 10, window: '1 m' }, // 10 validações/min por IP
  api_general: { requests: 60, window: '1 m' }, // 60 req/min por IP (geral)
  newsletter: { requests: 5, window: '1 m' }, // 5 inscrições/min por IP
  lead: { requests: 5, window: '1 m' }, // 5 leads/min por IP
  auth: { requests: 8, window: '1 m' }, // 8 tentativas de login/min por IP
}

function getLimiter(key: LimiterKey): Ratelimit | null {
  const redis = getRedis()
  if (!redis) return null
  if (!_limiters[key]) {
    const { requests, window } = LIMITS[key]
    _limiters[key] = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(requests, window),
      prefix: `hmzt_rl_${key}`,
      analytics: false,
    })
  }
  return _limiters[key]
}

/**
 * Extrai IP real do request, respeitando Coolify/proxy headers.
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  )
}

/**
 * Verifica rate limit para uma rota específica.
 * Retorna { allowed: true } ou { allowed: false, retryAfter: number }.
 * Se Upstash não estiver configurado, sempre permite (fail-open).
 */
export async function checkRateLimit(
  key: LimiterKey,
  identifier: string,
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const limiter = getLimiter(key)
  if (!limiter) {
    // Upstash não configurado — fail-open com log
    logger.debug({ key, identifier }, 'rate-limit: Upstash não configurado, permitindo')
    return { allowed: true }
  }

  try {
    const { success, reset } = await limiter.limit(identifier)
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000)
      logger.warn({ key, identifier, retryAfter }, 'rate-limit: bloqueado')
      return { allowed: false, retryAfter }
    }
    return { allowed: true }
  } catch (err) {
    logger.error({ err, key }, 'rate-limit: erro no Upstash, permitindo por segurança')
    return { allowed: true } // fail-open
  }
}
