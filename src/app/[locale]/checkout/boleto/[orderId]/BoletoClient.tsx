'use client'
import { useState } from 'react'

interface Props {
  locale: string
  orderId: string
  orderNumber: string
  totalCents: number
  paymentId: string
  bankSlipUrl: string
  identificationField: string
  dueDate: string | null
  buyerEmail: string
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatLine(line: string) {
  // Já vem formatado pelo Asaas, mas garantimos espaços visuais
  return line.replace(/\s+/g, ' ').trim()
}

export function BoletoClient(props: Props) {
  const [copied, setCopied] = useState(false)

  async function copyLine() {
    try {
      await navigator.clipboard.writeText(props.identificationField.replace(/\s+/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignora */
    }
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Pague com Boleto</h1>
        <p className="text-sm text-neutral-500 mb-8">
          Pedido <strong>{props.orderNumber}</strong> · {formatPrice(props.totalCents)}
        </p>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wide">
              Linha digitável
            </p>
            <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50">
              <p className="text-xs md:text-sm font-mono break-all text-neutral-700">
                {formatLine(props.identificationField)}
              </p>
            </div>
            <button
              onClick={copyLine}
              className="mt-3 w-full bg-neutral-900 text-white font-semibold py-3 rounded-xl hover:bg-neutral-700 transition-colors"
            >
              {copied ? 'Copiado!' : 'Copiar linha digitável'}
            </button>
          </div>

          <a
            href={props.bankSlipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center border border-neutral-200 font-semibold py-3 rounded-xl text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            Baixar PDF do boleto
          </a>

          {props.dueDate && (
            <p className="text-sm text-neutral-500 text-center">
              Vencimento: <strong>{new Date(props.dueDate).toLocaleDateString('pt-BR')}</strong>
            </p>
          )}

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Boletos podem levar até <strong>2 dias úteis</strong> para serem compensados. Você
            receberá um email em <strong>{props.buyerEmail}</strong> assim que o pagamento for
            confirmado.
          </div>
        </div>
      </div>
    </main>
  )
}
