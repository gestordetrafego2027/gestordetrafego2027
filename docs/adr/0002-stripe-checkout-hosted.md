# ADR-0002 — Stripe Checkout Hospedado (v1)

**Status:** Aceito  
**Data:** 2026-05  
**Autores:** Angelo Mazzutti, Tech Lead

## Contexto
Precisamos de checkout com cartão, Pix e Boleto. Construir formulário próprio exige PCI SAQ-D (muito mais complexo). Stripe Checkout hospedado atinge SAQ-A.

## Decisão
Usar Stripe Checkout hospedado na v1. O cliente é redirecionado para `checkout.stripe.com` e retorna ao site após o pagamento.

## Consequências
- PCI SAQ-A: nunca tocamos no número do cartão
- Menos controle de UX no step de pagamento (aceitável para v1)
- Customer Portal Stripe para self-service de assinaturas
- Formulário próprio (Elements) pode ser implementado no v2 se necessário
