/**
 * Feature flags centralizadas.
 * Toda rota/componente novo do e-commerce deve checar isStoreEnabled()
 * antes de renderizar. Permite rollout gradual sem quebrar o site.
 */

function flag(key: string): boolean {
  return process.env[key] === 'true' || process.env[key] === '1'
}

export const featureFlags = {
  isStoreEnabled: () => flag('FEATURE_STORE_ENABLED'),
  isSubscriptionsEnabled: () => flag('FEATURE_SUBSCRIPTIONS_ENABLED'),
  isAcademyStripeEnabled: () => flag('FEATURE_ACADEMY_STRIPE_ENABLED'),
} as const
