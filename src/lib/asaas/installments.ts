/**
 * Tabela de juros por número de parcelas — repassados ao cliente.
 * Baseado na tabela padrão Asaas (MDR + juros ao portador).
 *
 * O `totalValue` enviado ao Asaas já embute os juros, então o lojista
 * recebe o valor líquido cheio sem desconto de parcelamento.
 *
 * Parcelas disponíveis: 1x (sem juros), 2x, 3x, 6x, 12x.
 */

/** Taxa mensal de juros por número de parcelas (ex: 0.0199 = 1,99% a.m.) */
const MONTHLY_RATE: Record<number, number> = {
  1: 0,
  2: 0.0199,
  3: 0.0199,
  6: 0.0249,
  12: 0.0299,
}

export const AVAILABLE_INSTALLMENTS = [1, 2, 3, 6, 12] as const
export type InstallmentCount = (typeof AVAILABLE_INSTALLMENTS)[number]

export interface InstallmentOption {
  count: InstallmentCount
  /** Valor de cada parcela em centavos (arredondado para cima). */
  installmentCents: number
  /** Total a ser pago pelo cliente em centavos. */
  totalCents: number
  /** Taxa de juros efetiva total (não mensal). Ex: 0.0398 = 3,98% */
  effectiveRate: number
  /** Se há juros nesta opção. */
  hasInterest: boolean
}

/**
 * Calcula as opções de parcelamento com juros simples ao mês.
 * O cálculo usa juros simples (não compostos) pois é o padrão usado
 * pelo Asaas na cobrança ao portador.
 */
export function calcInstallmentOptions(baseCents: number): InstallmentOption[] {
  return AVAILABLE_INSTALLMENTS.map((count) => {
    const monthlyRate = MONTHLY_RATE[count]
    const effectiveRate = monthlyRate * count
    const totalCents = Math.ceil(baseCents * (1 + effectiveRate))
    const installmentCents = Math.ceil(totalCents / count)
    return {
      count,
      installmentCents,
      totalCents,
      effectiveRate,
      hasInterest: monthlyRate > 0,
    }
  })
}

/**
 * Retorna a opção para um número específico de parcelas.
 * Lança se a quantidade não está disponível.
 */
export function getInstallmentOption(baseCents: number, count: number): InstallmentOption {
  if (!AVAILABLE_INSTALLMENTS.includes(count as InstallmentCount)) {
    throw new Error(
      `Parcelamento em ${count}x não disponível. Use: ${AVAILABLE_INSTALLMENTS.join(', ')}`,
    )
  }
  return calcInstallmentOptions(baseCents).find((o) => o.count === count)!
}
