import { PostHog } from 'posthog-node'

let _client: PostHog | null = null

export function getPostHogServer(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return null
  if (!_client) {
    _client = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      flushAt: 20,
      flushInterval: 10000,
    })
  }
  return _client
}

export function captureEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
) {
  getPostHogServer()?.capture({ distinctId, event, properties })
}
