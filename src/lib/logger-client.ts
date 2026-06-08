/**
 * Logger silencioso para client components.
 *
 * Em produção: silencia console.error/warn/log pra não vazar mensagens
 * de erro nos devtools de visitantes/clientes. Em desenvolvimento,
 * mantém todos os logs pra debug local.
 *
 * Uso (substitui console.error em forms, handlers, etc):
 *   import { clientLog } from '@/lib/logger-client'
 *   try { ... } catch (err) { clientLog.error('[form]', err) }
 */
type LogFn = (...args: unknown[]) => void

const isProd = process.env.NODE_ENV === 'production'

const noop: LogFn = () => {}

export const clientLog = {
  log: isProd ? noop : (console.log.bind(console) as LogFn),
  warn: isProd ? noop : (console.warn.bind(console) as LogFn),
  error: isProd ? noop : (console.error.bind(console) as LogFn),
}
