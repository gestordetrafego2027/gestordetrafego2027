import pino from 'pino'

const isDev = process.env.NODE_ENV !== 'production'

export const logger = pino({
  level: isDev ? 'debug' : 'info',
  ...(isDev
    ? { transport: { target: 'pino-pretty', options: { colorize: true, ignore: 'pid,hostname' } } }
    : {}),
  base: { service: 'house-mazzutti-ecommerce' },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.cpf', '*.email'],
    censor: '[REDACTED]',
  },
})

export function withContext(ctx: Record<string, unknown>) {
  return logger.child(ctx)
}
