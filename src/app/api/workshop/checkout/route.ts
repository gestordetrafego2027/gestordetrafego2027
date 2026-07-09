import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe/server'

const WORKSHOP_PLANS = {
  'Lote 1': {
    stripePriceId: 'price_1TrPOrLcrEu1967nCgrZU24O',
    asaasUrl: '',
    label: 'Inside Out Edit 02 · Lote 1',
    amount: 141000,
  },
  Insider: {
    stripePriceId: 'price_1TgcuPLcrEu1967nNXGh8fzC',
    asaasUrl: 'https://www.asaas.com/c/pj6iif7nbbx1yzyd',
    label: 'Inside Out Edit 02 · Insider',
    amount: 245000,
  },
  Pro: {
    stripePriceId: 'price_1TgcuPLcrEu1967n1vO7M9QD',
    asaasUrl: 'https://www.asaas.com/c/ebpqs7rreklo6uq3',
    label: 'Inside Out Edit 02 · Pro',
    amount: 280000,
  },
  Executivo: {
    stripePriceId: 'price_1TgcuQLcrEu1967n0NE7blKK',
    asaasUrl: 'https://www.asaas.com/c/18105iudo54tk7rq',
    label: 'Inside Out Edit 02 · Executivo',
    amount: 320000,
  },
} as const

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  plan: z.enum(['Lote 1', 'Insider', 'Pro', 'Executivo']),
  method: z.enum(['card', 'pix', 'boleto']),
})

export async function POST(req: NextRequest) {
  let body: z.infer<typeof Schema>
  try {
    body = Schema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const plan = WORKSHOP_PLANS[body.plan]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://housemazzutti.com'

  // Pix / Boleto → redireciona para o link Asaas (já configurado para aceitar ambos)
  if (body.method === 'pix' || body.method === 'boleto') {
    return NextResponse.json({ url: plan.asaasUrl })
  }

  // Cartão → cria Stripe Checkout Session
  const stripe = getStripe()
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      payment_method_types: ['card'],
      customer_email: body.email,
      locale: 'pt-BR',
      currency: 'brl',
      metadata: {
        workshop: 'inside-out-edit-02',
        plan: body.plan,
        customer_name: body.name,
        customer_phone: body.phone,
      },
      payment_intent_data: {
        description: plan.label,
        metadata: {
          workshop: 'inside-out-edit-02',
          plan: body.plan,
          customer_name: body.name,
        },
      },
      success_url: `${siteUrl}/academy/workshop-producao-direcao-01/?inscricao=confirmada&plano=${body.plan.toLowerCase()}`,
      cancel_url: `${siteUrl}/academy/workshop-producao-direcao-01/?inscricao=cancelada`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro interno.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
