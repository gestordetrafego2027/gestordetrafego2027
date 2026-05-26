/**
 * Formata centavos → string BRL.
 * Ex: 19700 → "R$ 197,00"
 */
export function formatBRL(cents: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}
