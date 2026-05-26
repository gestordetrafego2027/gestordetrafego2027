# ADR-0004 — Feature Flag Master para o E-Commerce

**Data:** 2026-05-25
**Status:** Aceito

## Decisão

`FEATURE_STORE_ENABLED=false` em produção até Sprint 8.
Toda rota nova do e-commerce retorna 404 ou redireciona enquanto a flag estiver OFF.
O site público (blog, portfólio, Academy) não é afetado.

## Implementação

`src/lib/feature-flags.ts` → `featureFlags.isStoreEnabled()`
Verificação no início de cada Server Component das rotas de loja.
