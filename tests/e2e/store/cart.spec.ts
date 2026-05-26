import { test, expect } from '@playwright/test'

/**
 * E2E — Carrinho
 * Testa: adicionar produto, abrir drawer, alterar quantidade, remover,
 * navegar para /carrinho.
 */
test.describe('Carrinho', () => {
  test.beforeEach(async ({ page }) => {
    // Garante localStorage limpo a cada teste
    await page.goto('/pt/loja')
    await page.evaluate(() => localStorage.removeItem('hmzt-cart'))
  })

  test('adicionar produto abre drawer', async ({ page }) => {
    await page.goto('/pt/loja')

    // Encontra primeiro produto que não seja quote_only
    const addBtn = page.getByRole('button', { name: /adicionar ao carrinho/i }).first()
    await expect(addBtn).toBeVisible({ timeout: 10_000 })
    await addBtn.click()

    // Drawer deve abrir
    const drawer = page.getByRole('dialog')
    await expect(drawer).toBeVisible({ timeout: 5_000 })
    await expect(drawer.getByText(/carrinho/i)).toBeVisible()
  })

  test('badge do header incrementa ao adicionar', async ({ page }) => {
    await page.goto('/pt/loja')

    const addBtn = page.getByRole('button', { name: /adicionar ao carrinho/i }).first()
    if ((await addBtn.count()) === 0) {
      test.skip()
      return
    }

    // Badge antes: 0 ou invisível
    const badge = page.locator('[aria-label*="Carrinho"] span')

    await addBtn.click()
    // Badge deve mostrar "1"
    await expect(page.locator('[aria-label*="1 iten"]')).toBeVisible({ timeout: 5_000 })
  })

  test('página /carrinho exibe itens', async ({ page }) => {
    // Adiciona via localStorage diretamente (mais rápido)
    await page.goto('/pt/loja')
    await page.evaluate(() => {
      const item = {
        id: '11111111-1111-1111-1111-111111111111',
        stripePriceId: 'price_test_123',
        stripeProductId: 'prod_test_123',
        slug: 'teste-e2e',
        name: 'Produto E2E',
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

    await expect(page.getByText('Produto E2E')).toBeVisible({ timeout: 8_000 })
    await expect(page.getByText(/R\$\s*197/)).toBeVisible()
  })

  test('botão limpar carrinho esvazia a lista', async ({ page }) => {
    await page.goto('/pt/loja')
    await page.evaluate(() => {
      const item = {
        id: '11111111-1111-1111-1111-111111111111',
        stripePriceId: 'price_test_123',
        stripeProductId: 'prod_test_123',
        slug: 'teste-e2e',
        name: 'Produto E2E',
        description: null,
        image: null,
        unitAmount: 19700,
        currency: 'brl',
        quantity: 2,
        productType: 'digital',
        quoteOnly: false,
      }
      localStorage.setItem('hmzt-cart', JSON.stringify({
        state: { items: [item], couponCode: null, couponDiscount: 0, drawerOpen: false },
        version: 0,
      }))
    })
    await page.goto('/pt/carrinho')

    await page.getByRole('button', { name: /limpar carrinho/i }).click()
    await expect(page.getByText(/carrinho está vazio/i)).toBeVisible({ timeout: 5_000 })
  })
})
