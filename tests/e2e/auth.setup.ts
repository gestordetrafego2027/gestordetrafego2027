import { test as setup, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '.auth/user.json')

/**
 * Setup: autentica um usuário de teste e salva o estado de sessão.
 * As credenciais vêm de variáveis de ambiente (nunca commitadas).
 *
 * E2E_TEST_EMAIL e E2E_TEST_PASSWORD devem ser de uma conta de teste
 * criada no Supabase com role=user (não admin).
 */
setup('autenticar usuário de teste', async ({ page }) => {
  const email = process.env.E2E_TEST_EMAIL
  const password = process.env.E2E_TEST_PASSWORD

  if (!email || !password) {
    console.warn('E2E_TEST_EMAIL / E2E_TEST_PASSWORD não definidos — pulando autenticação')
    await page.context().storageState({ path: authFile })
    return
  }

  await page.goto('/login')
  await page.getByLabel(/e-mail/i).fill(email)
  await page.getByLabel(/senha/i).fill(password)
  await page.getByRole('button', { name: /entrar/i }).click()

  // Aguarda redirecionamento após login
  await expect(page).toHaveURL(/\/(crm|pt|en)/, { timeout: 10_000 })

  await page.context().storageState({ path: authFile })
})
