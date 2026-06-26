import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe/server'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const CheckoutBodySchema = z.object({
  items: z
    .array(
      z.object({
        stripePriceId: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(20),
  couponCode: z.string().optional(),
  locale: z.enum(['pt', 'en']).default('pt'),
  consent: z.object({ accepted: z.literal(true), termsVersion: z.string().min(1) }).optional(),
})

export async function POST(req: NextRequest) {
  const log = logger.child({ route: 'POST /api/store/checkout' })

  if (!featureFlags.isStoreEnabled()) {
    return NextResponse.json({ error: 'Loja não disponível.' }, { status: 503 })
  }

  // Rate limit — protege a criação de sessões de checkout.
  const rl = await checkRateLimit('checkout', getClientIp(req))
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde um instante e tente novamente.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    )
  }

  // Parse + validação
  let body: z.infer<typeof CheckoutBodySchema>
  try {
    const raw = await req.json()
    body = CheckoutBodySchema.parse(raw)
  } catch (err) {
    log.warn({ err }, 'payload inválido')
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }

  const stripe = getStripe()
  const supabase = await createClient()

  // Sessão do usuário (opcional — guest checkout permitido)
  const { data: { user } } = await supabase.auth.getUser()

  // Resolve stripe_customer_id se logado
  let stripeCustomerId: string | undefined
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle()
    stripeCustomerId = profile?.stripe_customer_id ?? undefined
  }

  // Valida se os prices existem e estão ativos no Supabase
  const priceIds = body.items.map((i) => i.stripePriceId)
  const { data: prices, error: pricesErr } = await supabase
    .from('store_prices')
    .select('id, stripe_price_id, unit_amount, active, metadata, store_products(name, product_type)')
    .in('stripe_price_id', priceIds)
    .eq('active', true)

  if (pricesErr || !prices?.length) {
    log.warn({ priceIds }, 'prices não encontrados')
    return NextResponse.json({ error: 'Produto não encontrado ou indisponível.' }, { status: 404 })
  }

  // Bloqueia quote_only no checkout direto
  const quoteOnlyItem = prices.find((p) => (p.metadata as { quote_only?: string } | null)?.quote_only === 'true')
  if (quoteOnlyItem) {
    return NextResponse.json(
      { error: 'Este item exige orçamento — use o formulário de contato.' },
      { status: 422 },
    )
  }

  // Monta line_items para o Stripe
  const lineItems = body.items.map((item) => ({
    price: item.stripePriceId,
    quantity: item.quantity,
  }))

  // Resolve promoção/cupom
  let discounts: { promotion_code: string }[] | undefined
  if (body.couponCode) {
    try {
      const promoCodes = await stripe.promotionCodes.list({
        code: body.couponCode,
        active: true,
        limit: 1,
      })
      if (promoCodes.data.length > 0) {
        discounts = [{ promotion_code: promoCodes.data[0].id }]
      }
    } catch {
      log.warn({ code: body.couponCode }, 'cupom não encontrado no Stripe')
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://housemazzutti.com'
  const locale = body.locale

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      ...(discounts ? { discounts } : { allow_promotion_codes: true }),
      ...(stripeCustomerId ? { customer: stripeCustomerId } : { customer_creation: 'always' }),
      client_reference_id: user?.id ?? undefined,
      locale: locale === 'en' ? 'en' : 'pt-BR',
      currency: 'brl',
      // Sprint 9: Pix/Boleto migrados para Asaas; Stripe responde apenas por cartão.
      payment_method_types: ['card'],
      // Parcelamento no cartão — juros repassados ao cliente pelo Stripe automaticamente.
      payment_method_options: {
        card: {
          installments: { enabled: true },
        },
      },
      // Aceite do Termo de Compra e Venda — propagado p/ o webhook persistir no pedido
      metadata: {
        ...(body.consent
          ? { consent_accepted: 'true', consent_terms_version: body.consent.termsVersion }
          : {}),
      },
      payment_intent_data: {
        description: 'House Mazzutti — Loja',
        metadata: { user_id: user?.id ?? 'guest', source: 'store_checkout' },
      },
      success_url: `${siteUrl}/${locale}/obrigado?from=loja&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/${locale}/carrinho?canceled=1`,
      // Expand line_items para o webhook poder criar store_order_items
      expand: ['line_items'],
    })

    log.info({ session_id: session.id }, 'checkout session criada')
    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    log.error({ err }, 'erro ao criar checkout session')
    const msg = err instanceof Error ? err.message : 'Erro interno.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
