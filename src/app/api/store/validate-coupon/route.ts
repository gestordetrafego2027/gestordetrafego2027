import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/server'
import { featureFlags } from '@/lib/feature-flags'
import { logger } from '@/lib/logger'

export async function GET(req: NextRequest) {
  const log = logger.child({ route: 'GET /api/store/validate-coupon' })

  if (!featureFlags.isStoreEnabled()) {
    return NextResponse.json({ error: 'Loja não disponível.' }, { status: 503 })
  }

  const code = req.nextUrl.searchParams.get('code')?.trim().toUpperCase()
  if (!code) {
    return NextResponse.json({ error: 'Código obrigatório.' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const promoCodes = await stripe.promotionCodes.list({ code, active: true, limit: 1 })

    if (!promoCodes.data.length) {
      return NextResponse.json({ valid: false, error: 'Cupom inválido ou expirado.' }, { status: 200 })
    }

    const promo = promoCodes.data[0]
    const coupon = promo.coupon

    // Verifica validade temporal
    const now = Math.floor(Date.now() / 1000)
    if (coupon.redeem_by && coupon.redeem_by < now) {
      return NextResponse.json({ valid: false, error: 'Cupom expirado.' }, { status: 200 })
    }
    if (coupon.max_redemptions && coupon.times_redeemed >= coupon.max_redemptions) {
      return NextResponse.json({ valid: false, error: 'Cupom esgotado.' }, { status: 200 })
    }

    log.info({ code, promo_id: promo.id }, 'cupom válido')
    return NextResponse.json({
      valid: true,
      promoCodeId: promo.id,
      percentOff: coupon.percent_off ?? null,
      amountOff: coupon.amount_off ?? null,
      currency: coupon.currency ?? 'brl',
      name: coupon.name ?? code,
    })
  } catch (err) {
    log.error({ err, code }, 'erro ao validar cupom')
    return NextResponse.json({ valid: false, error: 'Erro ao validar cupom.' }, { status: 500 })
  }
}
