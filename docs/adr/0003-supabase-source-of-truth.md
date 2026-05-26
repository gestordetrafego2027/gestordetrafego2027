# ADR-0003 — Supabase como Source of Truth para Pedidos

**Data:** 2026-05-25
**Status:** Aceito

## Decisão

- **Stripe** = catálogo, preços, pagamento
- **Supabase** = pedidos, clientes, carrinho, auditoria, NFS-e

Sync Stripe → Supabase via webhooks (product.*, price.*).
Nunca o inverso: Supabase não é fonte de preço.
