import { redirect } from 'next/navigation'
import Header from '@/app/components/Header'
import { createClient } from '@/lib/supabase/server'
import { createPreference } from '@/lib/academy/mp'
import { formatPriceBRL } from '@/lib/academy/queries'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage({ searchParams }) {
  const { product: productId } = await searchParams
  if (!productId) redirect('/academy')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirect=/academy/checkout?product=${productId}`)

  // Buscar produto
  const { data: product, error: prodErr } = await supabase
    .from('academy_products')
    .select('id, slug, type, title, subtitle, price_cents, currency, status, cover_url')
    .eq('id', productId)
    .eq('status', 'published')
    .maybeSingle()
  if (prodErr || !product) redirect('/academy')

  // Já matriculado? Vai direto pro dashboard
  const { data: alreadyEnrolled } = await supabase.rpc('fn_user_has_active_enrollment', {
    p_user_id: user.id,
    p_product_id: product.id,
  })
  if (alreadyEnrolled === true) redirect('/academy/dashboard')

  // Produto grátis? Cria order paga direto.
  if (product.price_cents === 0) {
    await supabase.from('academy_orders').insert({
      user_id: user.id,
      status: 'paid',
      subtotal_cents: 0,
      total_cents: 0,
      currency: product.currency,
      payment_method: 'free',
      billing_email: user.email,
    })
    redirect('/academy/dashboard?welcome=1')
  }

  // Criar order pending
  const { data: order, error: orderErr } = await supabase
    .from('academy_orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      subtotal_cents: product.price_cents,
      total_cents: product.price_cents,
      currency: product.currency,
      billing_email: user.email,
      mp_external_reference: null,
    })
    .select('id, order_number')
    .single()
  if (orderErr || !order) {
    return (
      <CheckoutError message={`Erro ao criar pedido: ${orderErr?.message || 'desconhecido'}`} />
    )
  }

  // Order item snapshot
  await supabase.from('academy_order_items').insert({
    order_id: order.id,
    product_id: product.id,
    unit_price_cents: product.price_cents,
    quantity: 1,
    subtotal_cents: product.price_cents,
    snapshot: {
      title: product.title,
      slug: product.slug,
      type: product.type,
      price_cents: product.price_cents,
    },
  })

  // Base URL
  const h = await headers()
  const proto = h.get('x-forwarded-proto') || 'https'
  const host = h.get('host') || 'localhost:3000'
  const baseUrl = `${proto}://${host}`

  // MP preference
  try {
    const pref = await createPreference({
      orderId: order.id,
      orderNumber: order.order_number,
      title: product.title,
      description: product.subtitle || product.title,
      unitPriceCents: product.price_cents,
      payerEmail: user.email || undefined,
      externalReference: order.id,
      successUrl: `${baseUrl}/academy/checkout/sucesso?order=${order.id}`,
      failureUrl: `${baseUrl}/academy/checkout/erro?order=${order.id}`,
      pendingUrl: `${baseUrl}/academy/checkout/pendente?order=${order.id}`,
      notificationUrl: `${baseUrl}/api/mp/webhook`,
    })
    await supabase
      .from('academy_orders')
      .update({ mp_preference_id: pref.id, mp_external_reference: order.id })
      .eq('id', order.id)

    const checkoutUrl =
      process.env.NODE_ENV === 'production' ? pref.init_point : (pref.sandbox_init_point || pref.init_point)

    return (
      <CheckoutRedirect
        product={product}
        order={order}
        checkoutUrl={checkoutUrl}
      />
    )
  } catch (e) {
    console.error('[checkout] MP error:', e)
    return <CheckoutError message={`Erro ao iniciar pagamento: ${String(e.message || e)}`} />
  }
}

function CheckoutRedirect({ product, order, checkoutUrl }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold text-neutral-900">Finalize seu pagamento</h1>
          <p className="mt-2 text-neutral-600">Pedido <span className="font-mono">{order.order_number}</span></p>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center gap-4">
              {product.cover_url && (
                <img src={product.cover_url} alt="" className="h-20 w-32 rounded-lg object-cover" />
              )}
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-neutral-500">{product.type}</p>
                <h2 className="text-lg font-semibold text-neutral-900">{product.title}</h2>
              </div>
              <div className="text-right text-xl font-semibold text-neutral-900">
                {formatPriceBRL(product.price_cents)}
              </div>
            </div>
          </div>

          <a
            href={checkoutUrl}
            className="mt-8 block w-full rounded-xl bg-neutral-900 px-6 py-4 text-center text-base font-medium text-white transition hover:bg-neutral-800"
          >
            Continuar para Mercado Pago →
          </a>
          <p className="mt-4 text-center text-sm text-neutral-500">
            Pagamento via Pix, cartão de crédito ou boleto.
          </p>
        </section>
      </main>
    </>
  )
}

function CheckoutError({ message }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="mx-auto max-w-xl px-6 py-16 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Algo deu errado</h1>
          <p className="mt-4 text-neutral-600">{message}</p>
          <a href="/academy" className="mt-6 inline-block text-sm text-neutral-900 underline">
            Voltar para o catálogo
          </a>
        </section>
      </main>
    </>
  )
}
