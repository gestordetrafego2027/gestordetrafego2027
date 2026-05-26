# ADR-0003 — Stripe + Supabase: divisão de responsabilidades

**Status:** Aceito  
**Data:** 2026-05  
**Autores:** Angelo Mazzutti, Tech Lead

## Contexto
Precisamos definir qual sistema é source-of-truth para cada entidade.

## Decisão

| Entidade | Source of Truth | Justificativa |
|----------|----------------|---------------|
| Produtos e preços | **Stripe** | Catálogo gerenciado no Dashboard Stripe |
| Pedidos e status | **Supabase** | Auditoria, timeline, NFS-e, relatórios |
| Clientes | **Supabase** (1:1 com `stripe_customer_id`) | LGPD, dados adicionais BR |
| Pagamentos | **Stripe** | Reconciliação financeira |
| Carrinho | **Supabase** (anon) + localStorage (client) | Persistência cross-session |

## Consequências
- Webhook `product.created/updated/deleted` replica catálogo Stripe → Supabase
- `sync:catalog` script força resync completo quando necessário
- Nunca duplicar estado financeiro — consultar Stripe para status de pagamento
