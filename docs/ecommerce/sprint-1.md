# Sprint 1 — Catálogo Supabase + /loja

Status: entregue.

## O que foi entregue

- **Migrations 0042/0043** (Supabase): tabelas `store_products`, `store_prices`,
  `store_categories`, `store_product_categories`, `store_orders`,
  `store_order_items`, `store_order_events`. RLS habilitado, índices em `slug`
  e `active`.
- **Script de sync Stripe → Supabase**: `npm run sync:catalog` percorre
  `products.list` + `prices.list` do Stripe e faz upsert idempotente no
  Supabase. Preserva `metadata.quote_only`.
- **/loja (read-only)**: lista produtos ativos agrupados por categoria
  (Agência, Studio, Produtora, Academy). Cards usam o componente compartilhado
  `src/components/ecommerce/product/ProductCard.tsx`.
- **/loja/[slug]**: página de produto individual com `AddToCartButton` e CTA
  inteligente `quote_only → /contato`.
- **Webhook Stripe** (`src/lib/stripe/webhook/`) com dispatcher modular em
  `handlers/`; handler real apenas para `checkout.session.completed` (Sprint 3).
- **Feature flag `FEATURE_STORE_ENABLED`** gateia `/loja`, `/loja/[slug]` e
  `/carrinho` no server (todas chamam `notFound()` quando OFF).
- **Format helper centralizado**: `src/lib/format/price.ts` (`formatBRL`).
  Todos os formatadores inline do e-commerce foram migrados.

## Como rodar o sync local

```bash
# .env.local precisa ter:
#   STRIPE_SECRET_KEY=sk_test_...
#   SUPABASE_URL=...
#   SUPABASE_SERVICE_ROLE_KEY=...

npm run sync:catalog
```

O script é idempotente — pode ser re-executado N vezes sem duplicar.

## CTA inteligente `quote_only`

Produtos cujo `prices[0].metadata.quote_only === "true"` no Stripe não
aparecem com preço na UI. O CTA "Adicionar ao carrinho" é substituído por
"Solicitar orçamento" que aponta para `/contato`. Isso permite catalogar
serviços de alto ticket (Agência, Produtora) sem expor preço de tabela.

## Dívida técnica (carregada para Sprint 4+)

- **Webhook handlers**: apenas `checkout.session.completed` está em arquivo
  próprio em `src/lib/stripe/webhook/handlers/`. Os stubs de
  `payment_intent.payment_failed` e `customer.subscription.*` continuam
  inline no dispatcher (`src/lib/stripe/webhook/index.ts`) — devem migrar
  para arquivos próprios quando ganharem lógica real (Sprint 5).
- **Filtros de busca em /loja**: ainda não há filtros por categoria via
  query string (`?cat=...`). Adicionar quando o catálogo passar de ~20 itens.
- **i18n dos textos do e-commerce**: hoje hard-coded em pt-BR. Migrar para
  `next-intl` quando for ativar locale `en`.
