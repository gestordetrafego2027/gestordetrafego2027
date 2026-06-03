import pino from 'pino'

const isDev = process.env.NODE_ENV !== 'production'

// pino-pretty é opcional (só em dev local). No CI/produção usa JSON puro.
const transport = (() => {
  if (!isDev) return undefined
  try {
    require.resolve('pino-pretty')
    return { target: 'pino-pretty', options: { colorize: true, ignore: 'pid,hostname' } }
  } catch {
    return undefined
  }
})()

export const logger = pino({
  level: isDev ? 'debug' : 'info',
  ...(transport ? { transport } : {}),
  base: { service: 'house-mazzutti-ecommerce' },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.cpf', '*.email'],
    censor: '[REDACTED]',
  },
})

export function withContext(ctx: Record<string, unknown>) {
  return logger.child(ctx)
}
