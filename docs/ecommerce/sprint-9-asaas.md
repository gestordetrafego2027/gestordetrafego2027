# Sprint 9 — Multi-gateway (Asaas)

Migração de Pix e Boleto para o gateway **Asaas**, mantendo o Stripe
apenas para cartão. Sprint atômica, sob feature flag, sem quebrar
nenhum fluxo existente.

## Motivação

| Item        | Stripe (BR)              | Asaas                         |
|-------------|--------------------------|-------------------------------|
| Pix         | 3,99% sobre o valor      | **R$ 1,99 fixo por transação** |
| Boleto      | 3,45% + R$ 0,40          | **R$ 1,99 fixo por transação** |
| Cartão      | 3,99% + R$ 0,39          | (mantido no Stripe)           |

No volume planejado (ticket médio R$ 49–149), o Asaas reduz o custo
unitário em ~70%. Stripe segue como melhor opção para cartão por causa
de Radar (antifraude integrado) e parcelamento sem juros.

## Arquitetura — Adapter de Provedores

```
src/lib/payments/
  ├── types.ts            ← interface PaymentProvider + types
  ├── providers/
  │     ├── stripe.ts     ← adapta lib/stripe existente
  │     └── asaas.ts      ← adapta lib/asaas
  └── index.ts            ← getProvider(method)
```

`getProvider('card' | 'subscription')` → Stripe.
`getProvider('pix' | 'boleto')` → Asaas.

Toda a regra de roteamento mora num único lugar — facilita trocar de
provedor sem mexer no UI.

## Fluxo de Pagamento

### Cartão (Stripe — inalterado)
1. Carrinho → `POST /api/store/checkout` → Stripe Checkout Session
2. Usuário paga → webhook `checkout.session.completed`
3. `handleCheckoutCompleted` cria `store_orders` com `payment_provider='stripe'`

### Pix / Boleto (Asaas — novo)
1. Carrinho → `POST /api/store/create-pending-order` cria `store_orders`
   pendente com `payment_provider='asaas'`
2. `POST /api/payments/asaas/create-pix` (ou `create-boleto`) consome o
   `orderId`, faz upsert do Customer no Asaas e gera a cobrança
3. Página `/checkout/pix-pendente/[orderId]` ou `/checkout/boleto/[orderId]`
   mostra QR Code / linha digitável
4. Página faz polling em `/api/payments/asaas/status/[paymentId]` a
   cada 5s para detectar confirmação
5. Webhook `POST /api/payments/asaas/webhook` recebe `PAYMENT_RECEIVED` /
   `PAYMENT_CONFIRMED` e atualiza `store_orders.status = 'paid'`

## Migration `0044_multi_gateway.sql`

```sql
ALTER TABLE store_orders
  ADD COLUMN payment_provider text CHECK (... 'stripe','asaas') DEFAULT 'stripe',
  ADD COLUMN asaas_payment_id text UNIQUE,
  ADD COLUMN asaas_customer_id text;

CREATE TABLE asaas_webhook_events (
  event_id text PRIMARY KEY, ...
);
```

Aplicada em **dev** (`urfrxirqkkrosyrvvtdo`). Falta aplicar em **prod**
(`ohmnzalkfbhdivtttzsa`) no momento do release.

## Como obter API Key (Sandbox)

1. Cadastre uma conta sandbox em https://www.asaas.com/registrar
2. Painel → Integrações → Chave de API → copie a chave
3. Configure as envs:

```
ASAAS_API_KEY=$aact_...
ASAAS_ENV=sandbox
ASAAS_WEBHOOK_TOKEN=<gere com `openssl rand -hex 32`>
FEATURE_ASAAS_ENABLED=true
NEXT_PUBLIC_FEATURE_ASAAS_ENABLED=true
```

## Configurando o Webhook no Asaas

1. Painel Asaas → Integrações → Webhooks → Adicionar
2. URL: `https://housemazzutti.com.br/api/payments/asaas/webhook`
   (em local com ngrok: `https://<seu-tunel>.ngrok-free.app/api/payments/asaas/webhook`)
3. Token de autenticação: o **mesmo valor** de `ASAAS_WEBHOOK_TOKEN`
4. Eventos: `PAYMENT_CREATED`, `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`,
   `PAYMENT_OVERDUE`, `PAYMENT_REFUNDED`, `PAYMENT_DELETED`
5. Versão do payload: v3

## Variáveis de ambiente (`.env.local`)

```env
# Asaas
ASAAS_API_KEY=$aact_hmlg_xxx...        # sandbox: começa em $aact_hmlg_
ASAAS_ENV=sandbox                       # ou "production"
ASAAS_WEBHOOK_TOKEN=<segredo-aleatorio> # mesmo valor configurado no painel

# Feature flag
FEATURE_ASAAS_ENABLED=true              # quando false, pix/boleto caem no Stripe
```

Gere `ASAAS_WEBHOOK_TOKEN` com `openssl rand -hex 32`. Nunca commite
nenhuma dessas variáveis.

## Testando localmente

```bash
# Terminal 1 — app
npm run dev

# Terminal 2 — tunel
ngrok http 3000
# Use a URL https://xxx.ngrok-free.app no painel Asaas

# Terminal 3 — gerar uma cobrança Pix manualmente
curl -X POST http://localhost:3000/api/payments/asaas/create-pix \
  -H 'Content-Type: application/json' \
  -d '{"orderId":"<uuid-do-pedido>"}'

# Simule pagamento pelo painel Asaas (sandbox): Cobranças → ações →
# "Receber em dinheiro" / "Confirmar manualmente"
```

## Sandbox → Produção

1. Repita o cadastro em https://www.asaas.com (conta real)
2. Atualize as envs em Coolify:
   - `ASAAS_API_KEY` → chave de produção
   - `ASAAS_ENV=production`
   - `ASAAS_WEBHOOK_TOKEN` → novo segredo
3. Reconfigure o webhook no painel de produção do Asaas
4. Aplique a migration `0044_multi_gateway.sql` em prod via MCP/CLI
5. Suba `FEATURE_ASAAS_ENABLED=true` no Coolify
6. Smoke test: faça um pedido de R$ 1 com Pix → confirme com cartão pessoal

## Dívidas técnicas e trade-offs

- **Assinaturas continuam no Stripe.** O Asaas tem cobrança recorrente,
  mas não migramos nesta sprint para manter o blast radius pequeno.
- **Reembolso de boleto compensado é manual via Pix.** A API do Asaas
  só estorna boleto enquanto não foi pago; depois disso a operação
  financeira precisa devolver via Pix avulso.
- **Sandbox do Asaas não processa Pix real.** Para "pagar" no ambiente
  de teste, use a ação manual no painel (Cobranças → "Confirmar
  manualmente"). Não dá para apontar um app de banco ao QR sandbox.
- **Idempotência limitada.** O Asaas aceita `Idempotency-Key` em
  endpoints de pagamento, mas não em todos. Tratamos retry só em 5xx.
- **Webhook signing é por token compartilhado**, não HMAC. Vazou o
  token, rota o webhook (basta gerar novo segredo e atualizar painel +
  env).

## Próximos Passos (fora desta sprint)

- Dashboard admin filtrando pedidos por `payment_provider`
- Conciliação automática (cron diário comparando Asaas vs Supabase)
- Suporte a Pix recorrente (assinaturas) no Asaas — substitui Stripe
  Subscriptions para clientes brasileiros
- NFS-e: chamar NFE.io também quando `payment_provider='asaas'` no handler
  `handlePaymentConfirmed`
- Estorno automático: endpoint admin que chama `refundPayment` no Asaas
