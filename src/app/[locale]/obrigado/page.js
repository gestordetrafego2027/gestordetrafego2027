import { getTranslations } from 'next-intl/server'
import Countdown from './Countdown'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ConversionOnMount from '@/components/analytics/ConversionOnMount'

export const metadata = {
  title: 'Obrigado — House Mazzutti',
  robots: { index: false, follow: false },
}

export default async function ObrigadoPage({ searchParams }) {
  const t = await getTranslations('obrigado')
  const params = (await searchParams) || {}
  const fromRaw = params.from
  const from = Array.isArray(fromRaw) ? fromRaw[0] : fromRaw

  // Pedido da loja — exibe confirmação especial + dispara conversão de COMPRA
  if (from === 'loja') {
    const sidRaw = params.session_id
    const sessionId = Array.isArray(sidRaw) ? sidRaw[0] : sidRaw
    let purchaseValue
    let transactionId = sessionId
    if (sessionId) {
      try {
        const supabase = await createClient()
        const { data: order } = await supabase
          .from('store_orders')
          .select('total_cents, order_number')
          .eq('stripe_session_id', sessionId)
          .maybeSingle()
        if (order) {
          if (typeof order.total_cents === 'number') purchaseValue = order.total_cents / 100
          if (order.order_number) transactionId = String(order.order_number)
        }
      } catch {
        /* tracking não deve quebrar a página de sucesso */
      }
    }

    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <ConversionOnMount
          event="Purchase"
          payload={{
            value: purchaseValue,
            currency: 'BRL',
            transaction_id: transactionId,
            content_type: 'product',
          }}
        />
        <div className="flex flex-col items-center text-center max-w-2xl gap-6">
          {/* Ícone de sucesso */}
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h1 className="font-headline text-4xl md:text-6xl text-black">Pedido confirmado!</h1>
            <p className="font-body text-lg text-zinc-500 mt-3 max-w-md">
              Recebemos seu pagamento. Você receberá um e-mail de confirmação em breve.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/loja"
              className="px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-colors font-medium text-sm"
            >
              Continuar comprando
            </Link>
            <Link
              href="/minha-conta/pedidos"
              className="px-6 py-3 border border-neutral-200 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors font-medium text-sm"
            >
              Ver meus pedidos
            </Link>
          </div>

          <p className="text-xs text-neutral-400 mt-4">
            Dúvidas? Fale conosco em{' '}
            <a href="mailto:contato@housemazzutti.com" className="underline hover:text-neutral-700">
              contato@housemazzutti.com
            </a>
          </p>
        </div>
      </main>
    )
  }

  const subKey =
    from === 'studio' ? 'studio_sub' :
    from === 'produtora' ? 'produtora_sub' :
    from === 'agencia' ? 'agencia_sub' :
    'default_sub'

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Lead — dispara conversão de lead (formulários studio/produtora/agencia/default) */}
      <ConversionOnMount event="Lead" payload={{ lead_type: from || 'default' }} />
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="font-headline text-5xl md:text-7xl text-black">{t('title')}</h1>
        <p className="font-body text-lg md:text-xl text-zinc-600 mt-4 max-w-xl">{t(subKey)}</p>
        <Countdown seconds={5} />
      </div>
    </main>
  )
}
