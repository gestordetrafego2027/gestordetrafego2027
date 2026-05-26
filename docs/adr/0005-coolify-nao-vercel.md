# ADR-0005 — Deploy em Coolify (não Vercel)

**Status:** Aceito  
**Data:** 2026-05  
**Autores:** Angelo Mazzutti, Tech Lead

## Contexto
O projeto usa `output: 'standalone'` no Next.js e tem `Dockerfile` configurado para Coolify (self-hosted). O encargo original mencionava Vercel, mas a realidade do código é Coolify.

## Decisão
Manter Coolify como plataforma de deploy. Não migrar para Vercel.

## Implicações no encargo original
- Sem `@vercel/analytics`, `@vercel/speed-insights`, Vercel KV
- Rate limiting via **Upstash Redis** (externo, independente de plataforma) ✅
- Sem preview URLs por PR automático — usar branch `staging` como ambiente de teste
- CI/CD: GitHub Actions → webhook Coolify (já configurado em `coolify-deploy.yml`)
- Rollback: redeploy do commit anterior via Coolify Dashboard ou `git revert` + push
