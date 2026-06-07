/**
 * Validação de variáveis de ambiente com Zod.
 * Falha no boot se alguma variável obrigatória estiver ausente.
 * Importar este módulo em qualquer server-side code que precisar de env.
 */
import { z } from 'zod'

const serverSchema = z.object({
  // Core
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_DB_URL: z.string().optional(),

  // Stripe (obrigatório no Sprint 3+)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_TAX_ENABLED: z.string().optional().default('false'),

  // E-mail
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional().default('House Mazzutti <contato@housemazzutti.com>'),

  // Antifraude — reCAPTCHA v3
  RECAPTCHA_SITE_KEY: z.string().optional(),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),
  RECAPTCHA_SECRET_KEY: z.string().optional(),

  // Rate limit
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Observabilidade
  SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional().default('https://app.posthog.com'),

  // Fiscal
  NFEIO_API_KEY: z.string().optional(),
  NFEIO_COMPANY_ID: z.string().optional(),
  NFEIO_ENVIRONMENT: z.enum(['Development', 'Production']).optional().default('Development'),

  // Feature flags
  FEATURE_STORE_ENABLED: z.string().optional().default('false'),
  FEATURE_SUBSCRIPTIONS_ENABLED: z.string().optional().default('false'),
  FEATURE_ACADEMY_STRIPE_ENABLED: z.string().optional().default('false'),
  FEATURE_ASAAS_ENABLED: z.string().optional().default('false'),

  // Asaas (Sprint 9)
  ASAAS_API_KEY: z.string().optional(),
  ASAAS_ENV: z.enum(['sandbox', 'production']).optional().default('sandbox'),
  ASAAS_WEBHOOK_TOKEN: z.string().optional(),
})

function parseEnv() {
  const result = serverSchema.safeParse(process.env)
  if (!result.success) {
    console.error('❌ Variáveis de ambiente inválidas:')
    console.error(result.error.flatten().fieldErrors)
    throw new Error('Configuração de ambiente inválida. Verifique o .env.local.')
  }
  return result.data
}

// Lazy singleton — só valida uma vez por processo
let _env: ReturnType<typeof parseEnv> | undefined
export function getEnv() {
  if (!_env) _env = parseEnv()
  return _env
}

export type Env = ReturnType<typeof parseEnv>
