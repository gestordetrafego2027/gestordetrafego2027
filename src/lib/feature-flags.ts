/**
 * Feature flags centralizadas.
 * Toda rota/componente novo do e-commerce deve checar isStoreEnabled()
 * antes de renderizar. Permite rollout gradual sem quebrar o site.
 */

function flag(key: string): boolean {
  return process.env[key] === 'true' || process.env[key] === '1'
}

/**
 * Versão "client-safe" — lê NEXT_PUBLIC_FEATURE_STORE_ENABLED, que o Next
 * inclui estaticamente no bundle do browser. Server components devem usar
 * `isStoreEnabled()` (que checa o flag privado FEATURE_STORE_ENABLED).
 *
 * Para manter os dois em sincronia, configure ambos no .env quando ativar a loja:
 *   FEATURE_STORE_ENABLED=true
 *   NEXT_PUBLIC_FEATURE_STORE_ENABLED=true
 */
function publicStoreFlag(): boolean {
  const v = process.env.NEXT_PUBLIC_FEATURE_STORE_ENABLED
  return v === 'true' || v === '1'
}

export const featureFlags = {
  isStoreEnabled: () => flag('FEATURE_STORE_ENABLED'),
  isStoreEnabledClient: () => publicStoreFlag(),
  isSubscriptionsEnabled: () => flag('FEATURE_SUBSCRIPTIONS_ENABLED'),
  isAcademyStripeEnabled: () => flag('FEATURE_ACADEMY_STRIPE_ENABLED'),
} as const
