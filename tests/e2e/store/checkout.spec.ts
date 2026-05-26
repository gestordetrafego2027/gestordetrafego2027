import { test, expect } from '@playwright/test'

/**
 * E2E — Checkout (Stripe Checkout redirect)
 * IMPORTANTE: usa Stripe test mode.
 * Não completa pagamento real — verifica apenas que o redirect para
 * checkout.stripe.com acontece corretamente.
 *
 * Para testes de pagamento completo, use Stripe CLI + webhook forwarding.
 */
test.describe('Checkout — redirect para Stripe', () => {
  test.skip(
    !process.env.E2E_RUN_CHECKOUT,
    'Pular checkout E2E em CI sem Stripe CLI — definir E2E_RUN_CHECKOUT=1 para rodar',
  )

  test('clique em Finalizar compra redireciona para Stripe', async ({ page }) => {
    await page.goto('/pt/loja')

    // Injeta item no carrinho via localStorage
    await page.evaluate(() => {
      const item = {
        id: '11111111-1111-1111-1111-111111111111',
        stripePriceId: process.env.NEXT_PUBLIC_E2E_PRICE_ID ?? 'price_test_placeholder',
        stripeProductId: 'prod_test',
        slug: 'curso-trafego',
        name: 'Curso Tráfego Pago',
        description: null,
        image: null,
        unitAmount: 19700,
        currency: 'brl',
        quantity: 1,
        productType: 'digital',
        quoteOnly: false,
      }
      localStorage.setItem('hmzt-cart', JSON.stringify({
        state: { items: [item], couponCode: null, couponDiscount: 0, drawerOpen: false },
        version: 0,
      }))
    })

    await page.goto('/pt/carrinho')
    await expect(page.getByText('Curso Tráfego Pago')).toBeVisible()

    // Clica em Finalizar compra
    const checkoutBtn = page.getByRole('button', { name: /finalizar compra/i })
    await expect(checkoutBtn).toBeVisible()
    await checkoutBtn.click()

    // Aguarda redirect para Stripe (checkout.stripe.com ou pay.stripe.com)
    await expect(page).toHaveURL(/stripe\.com/, { timeout: 15_000 })
  })
})
