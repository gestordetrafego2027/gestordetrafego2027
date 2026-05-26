# Go-Live Checklist — House Mazzutti Loja

> Última atualização: Sprint 8  
> CNPJ: 64.448.222/0001-54 — House Mazzutti Produções Ltda

---

## 1. Pré-requisitos obrigatórios

### Stripe
- [ ] Trocar `STRIPE_SECRET_KEY` de `sk_test_` → `sk_live_`
- [ ] Trocar `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` de `pk_test_` → `pk_live_`
- [ ] Criar endpoint de webhook no Stripe Dashboard:
  - URL: `https://housemazzutti.com.br/api/stripe/webhook`
  - Eventos: `checkout.session.completed`, `payment_intent.payment_failed`
  - Copiar `whsec_...` → `STRIPE_WEBHOOK_SECRET` no Coolify
- [ ] Verificar produtos e preços em modo live (re-executar `scripts/sync-stripe-catalog.ts` apontando para live)

### Supabase
- [ ] Confirmar que migrations `0042` e `0043` estão aplicadas no projeto **production** (`ohmnzalkfbhdivtttzsa`)
- [ ] Verificar RLS policies nas tabelas `store_orders`, `store_order_items`, `store_coupons`
- [ ] Confirmar índice `idx_profiles_stripe_customer` existente

### Resend
- [ ] Verificar domínio `mztgrupo.com` no painel Resend (SPF, DKIM, DMARC)
- [ ] Confirmar `EMAIL_FROM=House Mazzutti <contato@mztgrupo.com>` no Coolify

### NFE.io
- [ ] Criar conta NFE.io e configurar empresa com CNPJ 64.448.222/0001-54
- [ ] Trocar `NFEIO_ENVIRONMENT=Development` → `Production`
- [ ] Configurar `NFEIO_API_KEY` e `NFEIO_COMPANY_ID` no Coolify
- [ ] Definir código de serviço municipal SP correto por categoria de produto

### Segurança
- [ ] Configurar `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`
- [ ] Configurar `RECAPTCHA_SITE_KEY` e `RECAPTCHA_SECRET_KEY`
- [ ] Adicionar token reCAPTCHA no frontend antes do checkout (`recaptchaToken` no payload)

---

## 2. Script de verificação

```bash
# Carrega variáveis de produção e roda o checklist
npx tsx scripts/go-live.ts
```

Todos os itens devem passar (ou ter aviso aceitável) antes de prosseguir.

---

## 3. Ativação

No painel do **Coolify**, altere a variável de ambiente:

```
FEATURE_STORE_ENABLED=false  →  FEATURE_STORE_ENABLED=true
```

Faça **redeploy** da aplicação. A loja será ativada em todas as rotas:
- `/pt/loja` — listagem de produtos
- `/pt/loja/[slug]` — detalhe do produto
- `/pt/carrinho` — carrinho
- `/pt/minha-conta` — área do cliente
- `/api/store/*` — APIs

---

## 4. Smoke test pós-deploy

- [ ] Acessar `https://housemazzutti.com.br/pt/loja` — produtos aparecem
- [ ] Adicionar curso ao carrinho — badge do header incrementa
- [ ] Abrir drawer — itens corretos, preço correto
- [ ] Clicar "Finalizar compra" → redireciona para Stripe (modo live)
- [ ] Completar compra teste com cartão `4242 4242 4242 4242` (exp 12/26, CVV 123)
- [ ] Confirmar: e-mail de confirmação recebido
- [ ] Confirmar: pedido aparece em `/pt/minha-conta/pedidos`
- [ ] Confirmar: pedido aparece em `/crm/store/pedidos`
- [ ] Confirmar: NFS-e emitida (campo `nfse_status=issued` no pedido)
- [ ] Verificar logs no Coolify — sem erros 5xx

---

## 5. Rollback

Se algo der errado, volte:
```
FEATURE_STORE_ENABLED=true  →  FEATURE_STORE_ENABLED=false
```
E faça redeploy. Todos os dados são preservados no Supabase.

---

## 6. Monitoramento pós-go-live

| O que monitorar | Onde |
|---|---|
| Erros 5xx | Coolify logs / Sentry DSN |
| Pedidos pagos sem e-mail | Resend dashboard |
| NFS-e com erro | `store_orders.nfse_status` no Supabase |
| Rate limit atingido | Upstash dashboard |
| Score reCAPTCHA baixo | Logs Pino (campo `score`) |
| Webhook falhou | Stripe Dashboard → Developers → Webhooks |
