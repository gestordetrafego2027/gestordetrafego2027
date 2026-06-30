import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

/**
 * Emite NFS-e municipal SP via NFE.io REST API v2.
 * Documentação: https://nfe.io/docs/nota-fiscal-servico/
 *
 * CNPJ Emissor: 64.448.222/0001-54 — House Mazzutti Produções Ltda
 * Regime: Simples Nacional — Código de serviço municipal SP: 1.05 (ex: serviços de publicidade)
 *
 * Em ambiente Development, NFE.io gera notas de teste sem valor fiscal.
 * Trocar NFEIO_ENVIRONMENT=Production no Coolify antes do go-live.
 */

const NFEIO_BASE = 'https://api.nfe.io/v1'

interface IssueNfseParams {
  orderId: string
  buyerEmail: string
  buyerName: string
  totalCents: number
  currency: string
  description: string
  buyerCpfCnpj?: string
}

export async function issueNfse(params: IssueNfseParams): Promise<void> {
  const log = logger.child({ order_id: params.orderId, fn: 'issueNfse' })

  const apiKey = process.env.NFEIO_API_KEY
  const companyId = process.env.NFEIO_COMPANY_ID
  const env = process.env.NFEIO_ENVIRONMENT ?? 'Development'

  if (!apiKey || !companyId) {
    log.warn('NFEIO_API_KEY ou NFEIO_COMPANY_ID não configurados — NFS-e ignorada')
    return
  }

  const totalBrl = params.totalCents / 100
  const supabase = createServiceClient()

  const body = {
    cityServiceCode: '1.05', // Serviços de publicidade/marketing — ajustar por produto
    description: params.description,
    servicesAmount: totalBrl,
    borrower: {
      name: params.buyerName || 'Consumidor Final',
      email: params.buyerEmail,
      ...(params.buyerCpfCnpj ? { federalTaxNumber: params.buyerCpfCnpj.replace(/\D/g, '') } : {}),
    },
  }

  try {
    log.info({ env, total: totalBrl }, 'emitindo NFS-e')

    const res = await fetch(`${NFEIO_BASE}/companies/${companyId}/serviceinvoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errText = await res.text()
      log.error({ status: res.status, body: errText }, 'nfeio: erro na emissão')
      await supabase
        .from('store_orders')
        .update({ nfse_status: `error_${res.status}`, metadata: { nfse_error: errText } as any })
        .eq('id', params.orderId)
      return
    }

    const data = await res.json()
    const nfseId: string = data.id ?? data.Id ?? ''
    const nfseNumber: string = data.number ?? data.Number ?? ''

    log.info({ nfse_id: nfseId, nfse_number: nfseNumber }, 'NFS-e emitida')

    await supabase
      .from('store_orders')
      .update({
        nfse_id: nfseId,
        nfse_number: nfseNumber,
        nfse_status: 'issued',
      })
      .eq('id', params.orderId)
  } catch (err) {
    log.error({ err }, 'nfeio: exceção ao emitir NFS-e')
    await supabase
      .from('store_orders')
      .update({ nfse_status: 'error_exception' })
      .eq('id', params.orderId)
  }
}

/**
 * Consulta status de uma NFS-e já emitida.
 * Útil para polling no painel admin (Sprint 6).
 */
export async function getNfseStatus(companyId: string, nfseId: string): Promise<string | null> {
  const apiKey = process.env.NFEIO_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(`${NFEIO_BASE}/companies/${companyId}/serviceinvoices/${nfseId}`, {
      headers: { Authorization: apiKey },
    })
    if (!res.ok) return null
    const data = await res.json()
    return (data.flowStatus ?? data.FlowStatus ?? null) as string | null
  } catch {
    return null
  }
}
