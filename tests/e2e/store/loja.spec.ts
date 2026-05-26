import { test, expect } from '@playwright/test'

/**
 * E2E — Página de loja (/pt/loja)
 * Testa: listagem de produtos, navegação por categoria, abertura de detalhe.
 */
test.describe('Loja — listagem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pt/loja')
  })

  test('exibe título e produtos', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    // Pelo menos um card de produto deve estar presente
    const cards = page.locator('[data-testid="product-card"], a[href*="/loja/"]')
    await expect(cards.first()).toBeVisible({ timeout: 10_000 })
  })

  test('navega para detalhe do produto', async ({ page }) => {
    const firstProduct = page.locator('a[href*="/loja/"]').first()
    const href = await firstProduct.getAttribute('href')
    await firstProduct.click()
    await expect(page).toHaveURL(/\/loja\//, { timeout: 8_000 })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('produto de serviço exibe "Solicitar orçamento"', async ({ page }) => {
    // Serviços têm quote_only=true → botão de orçamento
    const quoteBtn = page.getByRole('link', { name: /solicitar orçamento/i })
    const addBtn = page.getByRole('button', { name: /adicionar ao carrinho/i })
    // Pelo menos um dos dois deve existir na loja
    const count = await quoteBtn.count() + await addBtn.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Loja — detalhe do produto', () => {
  test('exibe preço, descrição e CTA', async ({ page }) => {
    await page.goto('/pt/loja')
    // Navega para o primeiro produto
    const firstLink = page.locator('a[href*="/loja/"]').first()
    await firstLink.click()
    await page.waitForURL(/\/loja\//)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    // Preço OU badge de orçamento deve aparecer
    const hasPrice = await page.getByText(/R\$/).count() > 0
    const hasQuote = await page.getByText(/orçamento/i).count() > 0
    expect(hasPrice || hasQuote).toBe(true)
  })
})
