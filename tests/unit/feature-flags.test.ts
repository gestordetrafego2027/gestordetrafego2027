import { describe, it, expect, beforeEach } from 'vitest'

describe('featureFlags', () => {
  beforeEach(() => {
    delete process.env.FEATURE_STORE_ENABLED
    delete process.env.FEATURE_SUBSCRIPTIONS_ENABLED
    delete process.env.FEATURE_ACADEMY_STRIPE_ENABLED
  })

  it('isStoreEnabled returns false when env is unset', async () => {
    const { featureFlags } = await import('@/lib/feature-flags')
    expect(featureFlags.isStoreEnabled()).toBe(false)
  })

  it('isStoreEnabled returns true when env is "true"', async () => {
    process.env.FEATURE_STORE_ENABLED = 'true'
    const mod = await import('@/lib/feature-flags?v=true')
    expect(mod.featureFlags.isStoreEnabled()).toBe(true)
  })

  it('isSubscriptionsEnabled returns false by default', async () => {
    const { featureFlags } = await import('@/lib/feature-flags')
    expect(featureFlags.isSubscriptionsEnabled()).toBe(false)
  })
})
