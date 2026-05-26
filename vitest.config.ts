import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { Plugin } from 'vite'

// Strip React Server/Client directives so vitest (jsdom) can import them
function stripReactDirectives(): Plugin {
  return {
    name: 'strip-react-directives',
    transform(code: string, id: string) {
      if (!/\.(ts|tsx|js|jsx)$/.test(id)) return null
      if (code.startsWith("'use client'") || code.startsWith('"use client"') ||
          code.startsWith("'use server'") || code.startsWith('"use server"')) {
        return { code: code.replace(/^['"]use (client|server)['"]\s*\n?/, ''), map: null }
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [stripReactDirectives(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    pool: 'vmForks',
    vmForks: {
      execArgv: ['--max-old-space-size=512'],
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'tests', '.next', 'src/app/**/*.js'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
