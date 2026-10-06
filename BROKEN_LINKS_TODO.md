# Links quebrados — pendentes de decisão manual
Gerado pela varredura forense (Fase 4). Regenere após qualquer mudança de rotas.

Escopo: `<Link href>` e `<a href>` internos em `src/**` (exclui `src/app/crm/**`,
`src/app/api/**`, `src/pages_backup/**`), cruzados com as rotas reais em
`src/app/**/page.{js,jsx,tsx}` (incluindo segmentos dinâmicos `[slug]`, `[locale]`,
catch-all) e com os assets estáticos em `/public`.

---

## Sumário

| Métrica | Valor |
|---|---|
| Links internos analisados | 540 |
| **Links internos quebrados** | **0** |
| Links externos (revisão manual, sem HTTP request) | 146 |

**Nenhuma referência foi removida.** Não há link interno quebrado a corrigir.

---

## Falsos positivos verificados (NÃO são links quebrados)

Três `href` iniciais foram sinalizados por um cruzamento apenas-contra-rotas, mas
apontam para **assets estáticos reais** em `/public/lp/**`, servidos pelos route
handlers das landing pages (HTML cru). Confirmados como válidos:

- `src/app/[locale]/academy/inside-out/route.ts:33` → `/lp/workshop-io/styles.css` ✅ existe
- `src/app/academy/workshop-inside-out-edit-01/route.ts:37` → `/lp/workshop-io-edit-01/styles.css` ✅ existe
- `src/app/academy/workshop-producao-direcao-01/route.ts:37` → `/lp/workshop-io/styles.css` ✅ existe

---

## Links externos (146) — revisão manual opcional

Não foram feitas requisições HTTP (regra da auditoria). A lista completa está em
`.audit-data.json` (`externalLinks`) e no `AUDIT_REPORT.md`. Revisão manual é
opcional — nenhum é bloqueante para o build ou para a navegação interna.
