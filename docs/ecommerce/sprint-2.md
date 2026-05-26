# Sprint 2 — Carrinho (Zustand + Drawer + Página)

Status: entregue.

## Critérios atendidos

- [x] Zustand store com `persist` no `localStorage` (chave `hmzt-cart`).
- [x] CartDrawer acessível (Radix Dialog, foco gerenciado, ESC fecha).
- [x] Badge de quantidade no header (`CartButton`).
- [x] Página `/[locale]/carrinho` responsiva.
- [x] Add / remove / update com **toasts** via `sonner` (Toaster montado no
      layout do `[locale]`).
- [x] **Cross-tab sync** via `BroadcastChannel('hmzt-cart-sync')` — qualquer
      mutação dispara `postMessage` e as demais abas reidratam o store.
- [x] `CouponInput` → `/api/store/validate-coupon` (server) →
      `stripe.promotionCodes.list` (Sprint 3 ligou o backend real).
- [x] EmptyState no Drawer e na página.
- [x] Subtotal / desconto / total em BRL via `formatBRL`.
- [x] CTA "Finalizar compra" com estado de loading (Sprint 3 conectou ao
      Stripe Checkout Session).
- [x] Testes unitários do store em `tests/unit/cart/store.test.ts`.
- [x] **Hidratação SSR-safe**: `/carrinho` mostra skeleton até `mounted=true`
      no client (carrinho só existe no browser).
- [x] Feature flag `FEATURE_STORE_ENABLED` (server) + espelho
      `NEXT_PUBLIC_FEATURE_STORE_ENABLED` (client). Quando OFF:
      - `/carrinho` → `notFound()` (404)
      - `CartButton` no header → retorna `null`

## Produtos digitais: quantidade fixa

Catálogo da House Mazzutti é majoritariamente digital (ebooks, cursos,
serviços). Decidimos:

- **`productType ∈ {'digital','service'}`**: quantidade fixa em 1.
  - Em `Line.tsx`, os controles `+/-` não aparecem — só o botão de remover.
  - Em `store.ts`, `addItem` faz **no-op** quando o mesmo item já existe no
    carrinho e retorna `{ added: false, reason: 'already-in-cart' }`.
  - `AddToCartButton` consome o resultado e dispara
    `toast.info('Este item já está no seu carrinho.')`.
- **`productType ∈ {'physical','bundle'}`**: incremento normal, teto em 99.

## Sincronização cross-tab

```
BroadcastChannel('hmzt-cart-sync')
  ├─ Aba A: addItem() → set() → postMessage('cart-updated')
  └─ Aba B: onmessage → useCartStore.persist.rehydrate() (lê localStorage)
```

Em browsers sem `BroadcastChannel` (Safari < 15.4), o sync degrada
silenciosamente — cada aba mantém o estado local. O storage compartilhado
ainda funciona ao recarregar a página.

## Como testar manualmente

1. `npm run dev` com `FEATURE_STORE_ENABLED=true` e
   `NEXT_PUBLIC_FEATURE_STORE_ENABLED=true` no `.env.local`.
2. Abrir `/pt/loja`, clicar em um produto, adicionar ao carrinho.
3. Drawer deve abrir, toast deve aparecer.
4. Abrir nova aba em `/pt/carrinho` → estado deve estar sincronizado.
5. Mutar quantidade em uma aba → a outra atualiza em <1s.
6. Aplicar cupom de teste (`stripe.promotionCodes.create` no painel Stripe).

## Próximo: Sprint 3 (já entregue em `main`)

- POST `/api/store/checkout` → cria `Checkout.Session` no Stripe.
- Webhook `checkout.session.completed` → cria `store_orders` + items + events.
- `/obrigado?from=loja` → tela de confirmação.
- Falta configurar `STRIPE_WEBHOOK_SECRET` via Stripe CLI para testes locais.
