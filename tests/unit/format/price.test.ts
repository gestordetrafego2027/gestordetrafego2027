import { describe, it, expect } from 'vitest'
import { formatBRL } from '@/lib/format/price'

// Helper: normaliza qualquer espaço Unicode (\p{Zs} cobre NBSP U+00A0,
// narrow NBSP U+202F, thin space U+2009, etc.) para espaço simples.
// Isso torna os testes estáveis entre versões diferentes do Node/ICU.
const norm = (s: string) => s.replace(/\p{Zs}/gu, ' ').trim()

describe('formatBRL', () => {
  it('formata zero', () => {
    expect(norm(formatBRL(0))).toBe('R$ 0,00')
  })

  it('formata 100 centavos como R$ 1,00', () => {
    expect(norm(formatBRL(100))).toBe('R$ 1,00')
  })

  it('formata 1099 centavos como R$ 10,99', () => {
    expect(norm(formatBRL(1099))).toBe('R$ 10,99')
  })

  it('formata 999900 centavos como R$ 9.999,00', () => {
    expect(norm(formatBRL(999900))).toBe('R$ 9.999,00')
  })

  it('formata 19700 centavos como R$ 197,00', () => {
    expect(norm(formatBRL(19700))).toBe('R$ 197,00')
  })

  it('formata negativos com sinal', () => {
    expect(norm(formatBRL(-100))).toMatch(/-R\$\s?1,00/)
  })

  it('respeita parâmetro currency (USD)', () => {
    const usd = norm(formatBRL(1000, 'usd'))
    expect(usd).toMatch(/US\$\s?10,00/)
  })
})
