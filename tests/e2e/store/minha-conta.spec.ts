import { test, expect } from '@playwright/test'

/**
 * E2E — Área do cliente /minha-conta
 * Requer usuário autenticado (storage state de auth.setup.ts).
 */
test.describe('Minha Conta', () => {
  test('redireciona para /login sem sessão', async ({ browser }) => {
    // Contexto sem autenticação
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.goto('/pt/minha-conta')
    await expect(page).toHaveURL(/login/, { timeout: 8_000 })
    await ctx.close()
  })

  test('exibe visão geral com usuário autenticado', async ({ page }) => {
    await page.goto('/pt/minha-conta')
    // Se não autenticado, o setup não rodou — skip gracioso
    if (page.url().includes('login')) {
      test.skip()
      return
    }
    await expect(page.getByText(/olá/i)).toBeVisible({ timeout: 8_000 })
    await expect(page.getByRole('link', { name: /dados pessoais/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /privacidade/i })).toBeVisible()
  })

  test('página de dados pessoais renderiza formulário', async ({ page }) => {
    await page.goto('/pt/minha-conta/dados')
    if (page.url().includes('login')) { test.skip(); return }
    await expect(page.getByLabel(/nome completo/i)).toBeVisible({ timeout: 8_000 })
    await expect(page.getByRole('button', { name: /salvar/i })).toBeVisible()
  })

  test('página LGPD exibe toggles e botões corretos', async ({ page }) => {
    await page.goto('/pt/minha-conta/lgpd')
    if (page.url().includes('login')) { test.skip(); return }
    await expect(page.getByRole('switch')).toBeVisible({ timeout: 8_000 })
    await expect(page.getByRole('button', { name: /solicitar exportação/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /excluir minha conta/i })).toBeVisible()
  })

  test('confirmação de exclusão exige digitar EXCLUIR', async ({ page }) => {
    await page.goto('/pt/minha-conta/lgpd')
    if (page.url().includes('login')) { test.skip(); return }

    await page.getByRole('button', { name: /excluir minha conta/i }).click()
    // Campo de confirmação deve aparecer
    const input = page.getByPlaceholder('EXCLUIR')
    await expect(input).toBeVisible({ timeout: 5_000 })

    // Botão confirm desabilitado até digitar EXCLUIR
    const confirmBtn = page.getByRole('button', { name: /confirmar exclusão/i })
    await expect(confirmBtn).toBeDisabled()
    await input.fill('EXCLUIR')
    await expect(confirmBtn).toBeEnabled()
  })
})
