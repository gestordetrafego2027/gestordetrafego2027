# ADR-0002 — Stripe Checkout Hospedado no v1

**Data:** 2026-05-25
**Status:** Aceito

## Contexto

Precisamos de checkout com PCI-DSS SAQ-A. O site está no Coolify (standalone Next.js).

## Decisão

Usar Stripe Checkout **hospedado** (redirect para página Stripe) no v1.
- PCI-DSS SAQ-A: nunca tocamos PAN
- Suporta Pix, Boleto, Cartão, Apple/Google Pay nativamente no BR
- Stripe Tax calcula tributos automaticamente
- Stripe Radar cuida de antifraude na camada de gateway

## Consequências

- Experiência de checkout é a página padrão do Stripe (customizável com branding)
- Checkout custom (Stripe Elements) pode ser implementado no v2 se necessário
