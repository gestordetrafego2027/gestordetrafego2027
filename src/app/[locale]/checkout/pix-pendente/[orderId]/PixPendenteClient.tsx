'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  locale: string
  orderId: string
  orderNumber: string
  paymentId: string
  totalCents: number
  encodedImage: string
  payload: string
  expirationDate: string | null
  initialStatus: string
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export function PixPendenteClient(props: Props) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState(props.initialStatus)
  const [now, setNow] = useState(() => Date.now())

  const expirationTs = useMemo(
    () => (props.expirationDate ? new Date(props.expirationDate).getTime() : null),
    [props.expirationDate],
  )

  // Tick para countdown
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // Polling de status a cada 5s
  useEffect(() => {
    if (status === 'paid') return
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/asaas/status/${props.paymentId}`, {
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()
        if (data.status && data.status !== status) {
          setStatus(data.status)
          if (data.status === 'paid') {
            router.push(`/${props.locale}/obrigado?from=loja&orderId=${props.orderId}`)
          }
        }
      } catch {
        /* ignora */
      }
    }, 5000)
    return () => clearInterval(id)
  }, [props.paymentId, props.orderId, props.locale, status, router])

  async function copyPayload() {
    try {
      await navigator.clipboard.writeText(props.payload)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignora */
    }
  }

  const remainingMs = expirationTs ? Math.max(0, expirationTs - now) : null
  const remainingLabel = remainingMs !== null
    ? `${Math.floor(remainingMs / 60000)}:${String(Math.floor((remainingMs % 60000) / 1000)).padStart(2, '0')}`
    : null

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
          Pague com Pix
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Pedido <strong>{props.orderNumber}</strong> · {formatPrice(props.totalCents)}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center gap-4">
            <img
              src={`data:image/png;base64,${props.encodedImage}`}
              alt="QR Code Pix"
              className="w-64 h-64 border border-neutral-200 rounded-2xl bg-white"
            />
            {remainingLabel && (
              <p className="text-sm text-neutral-500">Expira em <strong>{remainingLabel}</strong></p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-700">
              Aponte a câmera do seu app de banco para o QR Code ou copie o código abaixo.
            </p>
            <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50">
              <p className="text-xs font-mono break-all text-neutral-700">{props.payload}</p>
            </div>
            <button
              onClick={copyPayload}
              className="w-full bg-neutral-900 text-white font-semibold py-3 rounded-xl hover:bg-neutral-700 transition-colors"
            >
              {copied ? 'Copiado!' : 'Copiar código Pix'}
            </button>
            <div
              role="status"
              aria-live="polite"
              className="text-xs text-neutral-500 text-center mt-2"
            >
              {status === 'paid'
                ? 'Pagamento confirmado! Redirecionando...'
                : 'Aguardando pagamento...'}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
