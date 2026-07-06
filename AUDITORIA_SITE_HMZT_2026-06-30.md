# Auditoria Geral — Site House Mazzutti
**Data:** 2026-06-30 · **Modo:** somente leitura (nenhum arquivo/schema/RLS alterado) · **Projeto Supabase auditado:** `ohmnzalkfbhdivtttzsa` (sa-east-1)

> **Achado que muda o eixo do briefing:** o caminho do lead **não é mais** INSERT anônimo direto via `leads_public_insert`. As migrations `0016`/`0017` desativaram o INSERT anônimo e o reabilitaram **só via Edge Function**. Hoje todo form público chama `submitLead()` → `POST /functions/v1/submit_lead` → a função insere com **service_role** (bypassa RLS). A premissa do briefing ("policy `leads_public_insert` permite INSERT anônimo") está **desatualizada** — e não existe mais essa policy.

---

## RESUMO EXECUTIVO (o que importa)
1. **CRÍTICO — 3 funis de lead quebrados por enum inválido.** Studio, Branding e Agência B2B enviam `lead_type` que **não existe** no enum do banco → a Edge Function recebe erro do Postgres e devolve 400 → o lead **não é gravado** e o usuário vê erro. Confirmado empiricamente: **zero** leads de agência/branding no banco; o último lead de studio válido é de 26/05.
2. **ALTO — `business_unit` só existe dentro de `details` (JSONB).** Não há coluna `business_unit` na tabela `leads`. O RLS multitenant lê `details->>'business_unit'`. Forms de Contato e Angelo **não** setam `business_unit` → caem no fallback e ficam visíveis a todo staff.
3. **BOM — Segurança sólida.** Headers completos (CSP, HSTS 2 anos, X-Frame, nosniff, Referrer-Policy, Permissions-Policy), RLS habilitado em 100% das tabelas, nenhuma `service_role` no client, `/crm` protegido por middleware.
4. **MÉDIO — Inconsistências de fluxo e dados.** `status` e `notes` enviados pelos forms são **ignorados** pela Edge Function; 7 de 9 forms redirecionam para WhatsApp (não `/obrigado`); `city` do FormModelo vai para `details`, não para a coluna.

---

## 1. INVENTÁRIO DE ROTAS

Estrutura: App Router com i18n (`src/app/[locale]/...`, locale `pt`) + rotas fora do i18n (`/crm`, `/login`, `/api`, `/academy`, `/auth`).

### Páginas públicas institucionais / landings (`.js` — conforme padrão)
| Rota | Arquivo | CTA/Form |
|---|---|---|
| `/` (home) | `[locale]/page.js` | FormGeral |
| `/studio` + `/studio/book`,`/ensaio`,`/cobertura` | `[locale]/studio/**` | **FormStudio** |
| `/agencia` + `/agencia/branding`,`/comunicacao`,`/web`,`/rp` | `[locale]/agencia/**` | **FormAgenciaB2B / FormBranding** |
| `/produtora` + `/publicidade`,`/moda`,`/institucional`,`/direcao`,`/eventos`,`/executiva`,`/educacao` | `[locale]/produtora/**` | FormProdutora |
| `/angelo` | `[locale]/angelo/page.js` | FormAngelo |
| `/sobre` | `[locale]/sobre/page.js` | — |
| `/comunidade` + `/comunidade/vagas` | `[locale]/comunidade/**` | FormModelo (vagas) |
| `/contato` | `[locale]/contato/page.js` | FormContatoGeral |
| `/canoinhas` + `/checkout`,`/confirmacao` | `[locale]/canoinhas/**` | FormCanoinhas |
| `/blog` + `/blog/[slug]` | `[locale]/blog/**` | — |
| `/portfolio`, `/portfolio-studio|-agencia|-produtora` + `[slug]` e ~120 páginas de case | `[locale]/portfolio*/**` | — |
| `/academy` + landings (`/marketing-para-modelos`,`/preco-da-relevancia`,`/briefing-mal-passado`,`/casos-da-producao`,`/inside-out`) | `[locale]/academy/**` | CTA → checkout |
| `/politicas` + `[slug]`, `/obrigado`, `/newsletter/cancelado`, `/login`, `/verify/[code]`, `/p/[token]` | vários | — |

### Páginas novas (criadas recentemente, foco da auditoria)
Landings de serviço **Agência** (`/agencia/branding`, `/comunicacao`, `/web`, `/rp`), **Studio** (`/studio/book`, `/ensaio`, `/cobertura`), **Produtora** (`/produtora/publicidade`, `/moda`, `/institucional`), **Angelo**, **Canoinhas** (tour marca pessoal). Todas têm `layout.js` com `export const metadata` ✓.

### E-commerce / conta (`.tsx` — desvio do padrão "público em .js", ver §7)
`/loja` + `[slug]`, `/carrinho`, `/checkout/**`, `/minha-conta/**`.

### Protegidas (`.tsx`, atrás do middleware)
`app/crm/**` (leads, clients, quotes, invoices, campaigns, automations, academy, store, reports, admin…).

### API (`.ts`)
`app/api/**` (newsletter, payments asaas, store checkout, stripe webhook, whatsapp-click, mp webhook…), `app/crm/api/export`, rotas de export de leads/clients, `app/auth/callback`, `app/logout`.

---

## 2. LINKS

- **Nav (`Header.js`)** e **footer (`SiteFooter.js` / `SiteFooterLinks.js`)** apontam para rotas **válidas**: `/`, `/agencia`, `/produtora`, `/studio`, `/academy` (+subs), `/portfolio`, `/comunidade`, `/blog`, `/contato`, `/angelo`, `/minha-conta` (ou `/login?next=`), `/politicas/*`. Nenhum link de navegação quebrado.
- **Externos no Header** usam `<a target="_blank" rel="noopener">` ✓ (Instagram/LinkedIn).
- **Externos no Footer** usam o `<Link>` do **next-intl** para URLs absolutas (`instagram.com`, `linkedin.com`) — `SiteFooter.js:14-15`. Funciona, mas o componente `Link` do next-intl é para rotas internas; o correto para externos é `<a>`. **Baixo.**
- `rel="noopener"` presente nos externos; recomendado `rel="noopener noreferrer"`. **Baixo.**
- **Hardcode vs `site.ts`:** `Header.js:400/406` e o footer hardcodam as URLs sociais em vez de importar de `site.social`. `submitLead.js` e mensagens de erro dos forms hardcodam `contato@housemazzutti.com`. A fonte única (`src/config/site.ts`) existe e é boa, mas não é usada nesses pontos. **Baixo/Médio.**

> Observação de escopo: a varredura exaustiva de cada `<Link>` dentro de cada uma das ~120 páginas de case de portfólio não foi feita item a item; o foco foi nav, footer e landings de conversão.

---

## 3. BOTÕES E CTAs

- Os CTAs das landings de serviço abrem um **drawer/modal** que renderiza o `Form*` correspondente (ação = abrir captação). Não foram encontrados CTAs órfãos (handler vazio) nas landings de conversão.
- **CTA com destino correto, porém o form a que ele leva está quebrado** nos casos Studio / Branding / Agência (ver §5). O botão "funciona" (abre o form), mas o envio falha no banco.
- `/obrigado` (pós-loja) tem CTAs "Continuar comprando" → `/loja` e "Ver meus pedidos" → `/minha-conta/pedidos`, ambos válidos.

---

## 4. FORMULÁRIOS (9 forms públicos)

Todos são **client components** (`'use client'`) com `onSubmit` handler — **não** são `<form>` dentro de Artifact React; **regra do projeto respeitada** ✓. Todos têm estado controlado, `required` nos campos obrigatórios, estado `isSubmitting` e `error`.

| Form | `segment` | `lead_type` enviado | enum válido? | `business_unit` (em `details`) | Redirect pós-envio |
|---|---|---|---|---|---|
| FormProdutora | commercial | `cliente_produtora` | ✅ | produtora | WhatsApp |
| FormModelo | talents | `agenciado_casting` | ✅ | agencia | WhatsApp |
| FormCanoinhas | commercial | `cliente_tour_canoinhas` | ✅ | studio | WhatsApp |
| FormContatoGeral | commercial | `parceiro` | ✅ | — (ausente) | `/obrigado?from=contato` ✅ |
| FormAngelo | talents | `parceiro` | ✅ | — (ausente) | `/obrigado?from=angelo` ✅ |
| **FormStudio** | commercial | **`estúdio_cliente`** | ❌ **inexistente** | studio | WhatsApp |
| **FormBranding** | commercial | **`cliente_agência`** (acento) | ❌ **inexistente** | agencia | WhatsApp |
| **FormAgenciaB2B** | commercial | **`cliente_agência`** (acento) | ❌ **inexistente** | agencia | WhatsApp |
| **FormGeral** (home) | commercial | `LEAD_TYPE_BY_UNIT[unit]` | ⚠️ **2 de 3 inválidos** | unit selecionado | WhatsApp |

`FormGeral` mapeia: `studio → 'estúdio_cliente'` ❌, `agencia → 'cliente_agência'` ❌, `produtora → 'cliente_produtora'` ✅. Ou seja, **na home, escolher Studio ou Agência também quebra**; só Produtora grava.

**Outros problemas de form/payload:**
- **`status: 'novo'` é ignorado** — a Edge Function não repassa `status` no insert (depende do default do banco, que é `novo` ✓; mas o campo enviado é "morto").
- **`notes` é ignorado** — `FormBranding` envia `notes`, mas a Edge Function não insere `notes` → **dado perdido**.
- **`city`** — `FormModelo` coleta cidade e a coloca em `details.city`, não no payload `city` → a **coluna `city` fica nula** para esses leads.
- Validação: `FormBranding` tem `validate()` próprio; os demais confiam em `required` do HTML. Coerente.
- Estado de loading/erro: presente em todos; on success a página navega (WhatsApp/`/obrigado`), então `isSubmitting` não é resetado (ok).

---

## 5. INTEGRAÇÃO SUPABASE / CRM — **ponto crítico**

**Arquitetura real do lead:**
`Form*` → `submitLead()` (`src/lib/submitLead.js`, pega token reCAPTCHA v3) → `POST {SUPABASE_URL}/functions/v1/submit_lead` (Bearer = anon key, `verify_jwt=false`) → a função valida reCAPTCHA e **insere em `leads` usando `SUPABASE_SERVICE_ROLE_KEY`** (bypassa RLS).

**Verificação dos enums (consulta real ao banco):**
- `lead_type`: `aluno_curso, afiliada, agenciado_casting, talento, fornecedor, parceiro, cliente_agencia, cliente_produtora, cliente_studio, cliente_tour_canoinhas`
- `business_unit`: `agencia, studio, produtora` · `lead_segment`: `talents, commercial` · `lead_status`: `novo, em_contato, qualificado, proposta_enviada, negociacao, ganho, perdido, arquivado`

**❌ Valores enviados pelos forms que NÃO existem no enum:**
- `estúdio_cliente` → deveria ser **`cliente_studio`** (FormStudio + FormGeral/studio)
- `cliente_agência` (com acento) → deveria ser **`cliente_agencia`** (FormBranding, FormAgenciaB2B, FormGeral/agencia)

Como `lead_type` é coluna enum `NOT NULL`, o Postgres rejeita o INSERT (`invalid input value for enum lead_type`). A Edge Function devolve `{error}` 400 → `submitLead()` lança → o form mostra erro e **não redireciona**. **Não é falha silenciosa de UI** (o usuário vê erro), mas é **perda total de lead** nesses funis.

**Confirmação empírica (SELECT de leitura em `leads`):**
| lead_type | n | tem business_unit | último |
|---|---|---|---|
| cliente_studio | 5 | 5 | 2026-05-26 |
| cliente_produtora | 2 | 2 | 2026-05-22 |
| cliente_tour_canoinhas | 2 | 2 | **2026-06-28** |
| parceiro | 1 | 0 | 2026-05-24 |
| agenciado_casting | 1 | 1 | 2026-05-22 |

→ **Zero** registros de agência (nem `cliente_agencia` nem o inválido com acento) e **zero** de branding: esses funis **nunca** produziram lead pelo caminho atual. Os 5 `cliente_studio` são válidos e antigos (provável origem no CRM `/crm/leads/new`, que usa o valor correto, ou versão anterior do form). Desde fim de maio, o único lead público que entra é **Canoinhas**.

**`business_unit`:** não há coluna `business_unit` em `leads`; ele vive em `details.business_unit`. As landings setam corretamente em `details` (Agência→`agencia`, Studio→`studio`, Produtora→`produtora`) — **mas isso só importa para os leads que conseguem ser inseridos.** Contato e Angelo não setam `business_unit`.

**`lead_status` default = `novo`** ✅ confirmado (`column_default: 'novo'::lead_status`).

**O CRM enxerga os leads?** Policy `leads_staff_all`: `is_staff() AND is_visible_unit(COALESCE(details->>'business_unit', current_user_unit()))`. Como a Edge Function insere com service_role e grava `details.business_unit`, o staff da unidade correspondente vê o registro. Leads sem `business_unit` (contato/angelo) caem no `current_user_unit()` → visíveis a qualquer staff. Não há, portanto, lead "invisível" no CRM **entre os que são inseridos** — o problema é que os de Studio/Branding/Agência **nem chegam a ser inseridos**.

**Forms que renderizam mas NÃO persistem:** FormStudio, FormBranding, FormAgenciaB2B e FormGeral (caminhos Studio/Agência). *(Eles mostram erro ao usuário, não persistem.)*

---

## 6. SEGURANÇA

- **`/crm` protegido** ✅ — `middleware.ts` → `updateSession()`: sem `user`, qualquer `/crm/*` é redirecionado para `/login?next=`. Fail-open seguro: sem Supabase configurado, `/crm` ainda redireciona para login.
- **Sem `service_role` no client** ✅ — nenhuma referência a `SERVICE_ROLE`/`createServiceClient` em componentes de client; `service.ts` é server-only. As únicas chaves `NEXT_PUBLIC_*` são anon/publishable, GA, FB pixel, reCAPTCHA site key, Stripe **publishable**. A anon key está no formato novo `sb_publishable_…`.
- **RLS** ✅ — 100% das tabelas do schema `public` com RLS habilitado. `leads` tem só policies `authenticated` (owner + staff); **nenhuma policy anon** (anon não lê/insere/edita direto). Nenhuma policy sensível com `qual=true` para anon (única exceção `store_restock_alerts` INSERT `with_check=true` — waitlist de e-mail, risco baixo de spam).
- **Headers de segurança** ✅ (`next.config.mjs`) em `/:path*`: `Content-Security-Policy` (script/style/font/img/connect/frame-src com allowlist), `Strict-Transport-Security` (2 anos, includeSubDomains), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. **HTTPS forçado** via HSTS.
- **Edge Function `submit_lead`** — CORS `*` (aceitável para endpoint público de lead). **reCAPTCHA é fail-open**: se `RECAPTCHA_SECRET_KEY` não estiver configurada na função, ou em erro de rede, libera o envio. Tradeoff conhecido (não bloquear leads legítimos), mas significa que **anti-bot pode estar inativo** se o secret não estiver setado. **Médio** (verificar se o secret está configurado em produção).
- **`.env.local`** está no `.gitignore` (`.env`, `.env*.local`, `.env.local.save`) ✅ — segredos não versionados. Contém comentário "CHAVE CORROMPIDA — substitua" no `STRIPE_SECRET_KEY` (nota de dev).
- **⚠️ Verificar consistência de ambiente:** `.env.local` traz `SUPABASE_PROJECT_REF=urfrxi…` e o `next.config` libera **dois** domínios Supabase (`ohmnzalkfbhdivtttzsa.supabase.co` **e** `urfrxirqkkrosyrvvtdo.supabase.co`). A auditoria foi feita no projeto `ohmnzalkfbhdivtttzsa` (que está recebendo leads — último em 28/06). Confirme que **produção** aponta para `ohmnzalkfbhdivtttzsa` e que `urfrxi…` é só dev/staging, para não haver lead caindo em projeto separado. **Médio.**
- Rotas que retornam dados sensíveis (exports de leads/clients) estão sob `/crm/**` (protegido pelo middleware). Não foi feita leitura linha a linha de cada handler de `/api/**` para checar auth individual — recomendado num segundo passe focado.

---

## 7. PADRÕES DE FORMATO E CONSISTÊNCIA

- **`.js` público / `.ts(x)` em lib e CRM** — institucional/landings em `.js` ✅; `lib/` e `crm/` em `.ts/.tsx` ✅. **Desvio:** e-commerce/conta/login (`loja`, `carrinho`, `checkout`, `minha-conta`, `[locale]/login`) em `.tsx`. Provavelmente intencional (área transacional), mas foge da regra "páginas públicas novas em `.js`". **Baixo.**
- **Tipografia RocGrotesk** ✅ — o `globals.css` **ativo** é `src/app/globals.css` (importado no `layout.js`), que define `@font-face` RocGrotesk e `@theme` mapeando `--font-headline/body/label → 'RocGrotesk'`. As utilities `font-headline/body/label` renderizam RocGrotesk corretamente.
  - **Arquivos mortos/conflitantes (limpar):** `src/styles/globals.css` (duplicado inativo que mapeia para Newsreader/Inter/Raleway), `tailwind.config.mjs` (estilo Tailwind v3, mapeia para RocGrotesk mas **não é lido** pelo Tailwind v4 sem `@config`) e `src/pages_backup/_app.js` (Pages Router antigo que importa `next/font`). Não afetam o render atual, mas confundem e podem causar regressão. **Baixo.**
  - `Header.js` usa `fontFamily:'Newsreader, serif'` inline em 2 pontos (social) — fonte não carregada → cai em `serif`. **Baixo.**
- **Constantes de marca via `src/config/site.ts`** — a fonte única existe e é bem feita, mas há hardcodes pontuais (URLs sociais no Header/Footer; e-mail em mensagens de erro). **Baixo/Médio.** *(Atenção separada: `site.ts` ainda tem `TODO` em `approvedClients`/`cases`/bios — gate 0.5/0.7/0.8 pendente.)*
- **Metadados por página** ✅ — `layout.js` raiz define `metadataBase`, title template, ícones; todas as landings novas têm `export const metadata`. Não foi verificado Open Graph/imagem OG por página (recomendado checar `openGraph`/`twitter` nas landings de maior tráfego).

---

## 8. INDEXAÇÃO / SEO TÉCNICO

- **Sitemap** (`src/app/sitemap.js`, dinâmico) inclui as landings novas: `/studio`, `/agencia`, `/produtora` e subs (`/agencia/branding|comunicacao|web`, `/studio/book|cobertura|ensaio`, `/produtora/institucional|moda|publicidade`), academy landings, `/angelo`, `/sobre`, `/comunidade(+vagas)`, `/loja`, portfólio, blog, políticas, produtos academy. Portfólio delistado (gate 0.7) é excluído corretamente. ✅
- **Ausentes do sitemap (órfãos de sitemap):**
  - **`/agencia/rp`** — a página existe (`agencia/rp/page.js`) mas **não está** no sitemap. **Médio.**
  - **`/canoinhas`** (LP do tour) — a landing existe e recebe leads (último em 28/06), mas **não está** no sitemap (só `/canoinhas/checkout` e `/confirmacao`, que estão no `robots disallow`). **Médio.**
- **robots** (`src/app/robots.js`) ✅ — `allow: '/'`, `disallow` cobre `/crm/`, `/api/`, `/login`, `/auth/`, `/minha-conta/`, checkout, carrinho, `/p/` (propostas por token), newsletter cancelado. Nenhum `noindex` indevido nas landings. `sitemap` apontado para `housemazzutti.com/sitemap.xml`.
- **`/obrigado`** tem `robots: { index:false, follow:false }` ✅.
- **Canonical** — `metadataBase` definido globalmente; canonical explícito por página não foi auditado em profundidade (verificar `alternates.canonical` nas landings principais, sobretudo nas rotas que existem com e sem `/pt`).

---

## 9. FLUXO DO USUÁRIO END-TO-END (por landing)

| Landing | Clique CTA → form | Validação | Submit → Edge Function | INSERT no Supabase | Pós-submit | Status |
|---|---|---|---|---|---|---|
| Produtora | OK | OK | OK | ✅ grava (`cliente_produtora`) | WhatsApp | **OK** |
| Comunidade/Vagas (Modelo) | OK | OK | OK | ✅ grava (`agenciado_casting`) | WhatsApp | **OK** (city vai p/ details) |
| Canoinhas | OK | OK | OK | ✅ grava (`cliente_tour_canoinhas`) | WhatsApp | **OK** |
| Contato | OK | OK | OK | ✅ grava (`parceiro`, sem business_unit) | `/obrigado` + redirect 5s ✅ | **OK** |
| Angelo | OK | OK | OK | ✅ grava (`parceiro`, sem business_unit) | `/obrigado` + redirect 5s ✅ | **OK** |
| **Studio** | OK | OK | chama, recebe 400 | ❌ **enum `estúdio_cliente` inválido** | erro no form, sem redirect | **FALHA** |
| **Branding** | OK | OK | chama, recebe 400 | ❌ **enum `cliente_agência` inválido** + `notes` perdido | erro no form | **FALHA** |
| **Agência B2B** | OK | OK | chama, recebe 400 | ❌ **enum `cliente_agência` inválido** | erro no form | **FALHA** |
| **Home (Geral)** | OK | OK | chama | ⚠️ grava só se unit=Produtora; Studio/Agência **falham** | WhatsApp / erro | **PARCIAL** |

`/obrigado` → `Countdown(5)` → `router.push('/')` ✅ (auto-redirect home em 5s funciona). Nota: só Contato e Angelo usam o fluxo `/obrigado`; os demais vão direto ao WhatsApp (divergência do "fluxo padrão" do briefing — decidir se é intencional).

---

## TABELA-RESUMO

| Landing / Form | Conecta ao CRM? | business_unit correto? | Indexada (sitemap)? | Fluxo completo OK? |
|---|---|---|---|---|
| Produtora | **Sim** | Sim (`produtora`) | Sim | Sim |
| Studio | **Não** (enum inválido) | n/a (não grava) | Sim | **Não** |
| Agência (branding/web/comunicacao) | **Não** (enum inválido) | n/a | Sim (exceto `/agencia/rp`) | **Não** |
| Agência B2B (`/agencia`) | **Não** (enum inválido) | n/a | Sim | **Não** |
| Comunidade/Vagas (Modelo) | **Sim** | Sim (`agencia`) | `/comunidade/vagas` sim | Sim (city em details) |
| Angelo | **Sim** | Sem business_unit | Sim | Sim |
| Contato | **Sim** | Sem business_unit | Sim | Sim |
| Canoinhas | **Sim** | Sim (`studio`) | **Não** (ausente do sitemap) | Sim |
| Home (Geral) | **Parcial** | Só Produtora grava | Sim (home) | **Parcial** |

---

## LISTA PRIORIZADA DE CORREÇÕES (aguardando seu OK por item)

### 🔴 CRÍTICO
1. **Corrigir `lead_type` inválido nos forms** (perda total de lead):
   - `FormStudio.js`: `estúdio_cliente` → `cliente_studio`.
   - `FormBranding.js` e `FormAgenciaB2B.js`: `cliente_agência` → `cliente_agencia`.
   - `FormGeral.js` `LEAD_TYPE_BY_UNIT`: `studio:'estúdio_cliente'` → `cliente_studio`; `agencia:'cliente_agência'` → `cliente_agencia`.
   *(Só edição de client components; nenhum schema/RLS muda.)*
2. **Defesa em profundidade na Edge Function** (opcional, recomendável): validar `lead_type`/`segment` contra lista permitida e retornar erro claro/logado em vez de propagar o erro cru do enum — assim um valor novo errado não derruba captação de novo.

### 🟠 ALTO
3. **Decidir e padronizar `business_unit` em Contato e Angelo** — hoje ausente (caem no fallback do RLS, visíveis a todo staff). Definir se devem ter unidade fixa (ex.: contato→geral/produtora) ou se o comportamento atual é aceito.
4. **`notes` perdido (FormBranding)** — ou a Edge Function passa a inserir `notes`, ou mover o conteúdo para `details`.
5. **Confirmar ambiente de produção** — garantir que prod aponta para `ohmnzalkfbhdivtttzsa` (não `urfrxi…`) e remover o domínio Supabase não usado do `next.config` se for o caso.

### 🟡 MÉDIO
6. **Sitemap:** incluir `/agencia/rp` e `/canoinhas` (landings que existem e/ou convertem).
7. **Confirmar `RECAPTCHA_SECRET_KEY`** configurada nos secrets da Edge Function (senão o anti-bot está fail-open/inativo).
8. **`city` do FormModelo** — enviar no payload `city` (coluna) além de/em vez de `details`, para aparecer na lista do CRM.
9. **`status` morto no payload** — remover dos forms (a Edge Function ignora) ou fazer a função respeitá-lo; hoje confia no default `novo` (que está certo).
10. **Padronizar redirect pós-envio** — decidir entre `/obrigado` (Contato/Angelo) e WhatsApp (demais); hoje é misto.

### 🟢 BAIXO
11. **Limpeza de config conflitante de fonte:** remover/alinhar `src/styles/globals.css` (duplicado inativo), `tailwind.config.mjs` (ignorado pelo v4) e `src/pages_backup/`.
12. **Hardcodes → `site.ts`:** URLs sociais (Header/Footer) e e-mail de contato (submitLead/erros) vindo de `src/config/site.ts`.
13. **Footer:** trocar `<Link>` (next-intl) por `<a>` em URLs externas; usar `rel="noopener noreferrer"`.
14. **`fontFamily:'Newsreader'` inline no Header** — trocar por `font-*` (RocGrotesk).

---

## CORREÇÕES APLICADAS (2026-06-30) — por camadas

### 🔴 Camada 1 — enums dos forms (reabre 3 funis)
- `FormStudio.js`: `estúdio_cliente` → **`cliente_studio`**
- `FormBranding.js`: `cliente_agência` → **`cliente_agencia`**
- `FormAgenciaB2B.js`: `cliente_agência` → **`cliente_agencia`**
- `FormGeral.js` (`LEAD_TYPE_BY_UNIT`): `studio` → `cliente_studio`, `agencia` → `cliente_agencia`
- Verificado: nenhuma ocorrência de valor inválido em todo o `src`.

### 🟠 Camada 2 — Edge Function `submit_lead/index.ts`
- Adicionado **allowlist** `VALID_SEGMENTS` / `VALID_LEAD_TYPES` espelhando os enums; valida ANTES do INSERT e devolve erro claro (`invalid_segment` / `invalid_lead_type`) + `console.error` — nunca mais perde lead por enum cru.
- Passa **`notes`** para o INSERT (antes era descartado).
- `business_unit` de Contato/Angelo: **mantido ausente de propósito** (RLS torna lead geral visível a todo staff via `COALESCE(... current_user_unit())`).

### 🟡 Camada 3
- `sitemap.js`: incluídos **`/agencia/rp`** e **`/canoinhas`**.
- `FormModelo.js`: `city` agora vai no **payload top-level** (popula a coluna `city`).
- Removido `status: 'novo'` morto de 7 forms (a Edge Function ignora; default do banco já é `novo`).

### 🟢 Camada 4
- `SiteFooter.js`: links sociais externos agora usam `<a>` (não o `Link` do next-intl), `rel="noopener noreferrer"`, URLs vindas de `@/config/site`.
- `Header.js`: idem `rel="noopener noreferrer"` + URLs de `site.ts`; removido `fontFamily:'Newsreader'` inline → `RocGrotesk`.

### ⏳ Pendências que exigem ação fora do código (NÃO executadas)
1. **Deploy do app Next** (Vercel/CI) para as correções dos forms entrarem no ar.
2. **Deploy da Edge Function:** `supabase functions deploy submit_lead --project-ref ohmnzalkfbhdivtttzsa` — sem isso, validação/`notes` não valem.
3. **Confirmar `RECAPTCHA_SECRET_KEY`** nos secrets da função (senão anti-bot fica fail-open).
4. **Confirmar env de produção** aponta para `ohmnzalkfbhdivtttzsa` (não `urfrxi…`).
5. **Remoção de arquivos mortos** (deixada para fazer COM `next build` de verificação): `tailwind.config.mjs` (ignorado pelo v4), `src/styles/globals.css` (duplicado inativo), `src/pages_backup/` (Pages Router antigo). Não apaguei sem poder rodar o build.

> Recomendado após o deploy: enviar 1 lead de teste por cada funil (Studio, Branding, Agência) e confirmar no CRM (`/crm/leads`) que caem com `lead_type` correto e `details.business_unit` setado.
