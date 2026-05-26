import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E config — House Mazzutti E-commerce.
 * Executa contra localhost:3000 (dev) ou BASE_URL customizado (CI/staging).
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,       // checkouts têm estado — serial por segurança
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  },

  projects: [
    // Setup: cria usuário de teste e autentica
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    // Testes principais em Chromium (90% dos usuários BR)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/e2e/.auth/user.json',
      },
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.ts/,
    },
    // Mobile — Safari iPhone (tráfego mobile alto)
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 14'],
        storageState: 'tests/e2e/.auth/user.json',
      },
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.ts/,
    },
  ],

  // Inicia o servidor Next.js automaticamente em modo CI
  webServer: process.env.CI
    ? {
        command: 'npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: false,
        timeout: 120_000,
      }
    : undefined,
})
