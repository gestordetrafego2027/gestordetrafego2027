# House Mazzutti — E-Commerce

Sistema de e-commerce de produção integrado ao site housemazzutti.com.br.

## Empresa

- **Razão social:** House Mazzutti Producoes Ltda
- **CNPJ:** 64.448.222/0001-54
- **Regime:** Simples Nacional — ME
- **Fiscal:** NFS-e municipal SP via NFE.io

## Stack

- **Framework:** Next.js 14 (App Router, RSC, Server Actions)
- **Pagamentos:** Stripe (loja) + Mercado Pago (Academy — legado)
- **Banco:** Supabase (Postgres + RLS + Auth)
- **Deploy:** Coolify (standalone Docker)
- **Fiscal:** NFE.io (NFS-e São Paulo)

## Roadmap de Sprints

| Sprint | Entrega | Status |
|--------|---------|--------|
| 0 | Fundação (deps, env, observabilidade, CI) | ✅ Concluído |
| 1 | Schema Supabase + Catálogo Stripe → Supabase + /loja | 🔲 |
| 2 | Carrinho (Zustand, Drawer, persistência, cupom) | 🔲 |
| 3 | Checkout Stripe + Webhook + order lifecycle | 🔲 |
| 4 | Conta do cliente (/minha-conta, pedidos, LGPD básico) | 🔲 |
| 5 | Fiscal NFE.io + E-mails Resend | 🔲 |
| 6 | Admin (/admin, refund, audit_log) | 🔲 |
| 7 | Antifraude + Rate limit + CSP + Segurança | 🔲 |
| 8 | E2E + Go-live (feature flag ON em produção) | 🔲 |

## Decisões chave

- **Feature flag master:** `FEATURE_STORE_ENABLED=false` — site público não é afetado até Sprint 8
- **Academy:** migra para Stripe junto ao Sprint 3 (nunca vendeu nada no MP — sem migração de dados)
- **Frete:** sem frete físico no v1 (só serviços e digital)
- **Nota fiscal:** NFS-e municipal SP (não NF-e de produto)

## Links

- [Arquitetura](architecture.md)
- [Runbook](runbook.md)
- [LGPD](../lgpd/README.md)
- [ADRs](../adr/)
