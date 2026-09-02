# Auditoria Forense — House Mazzutti
Gerado em: 2026-09-02
Escopo: `src/**` (exclui `src/app/crm/**`, `src/app/api/**`, `src/pages_backup/**`) + `next.config.mjs` + `tailwind.config.mjs`

## Sumário Executivo

| Métrica | Valor |
|---|---:|
| Total de referências de mídia | 1735 |
| — estáticas (inclui `${SITE_URL}` + caminho fixo) | 1689 |
| — dinâmicas de verdade (slug/índice variável) | 46 |
| Imagens OK | 1685 |
| Case mismatch (correção automática) | 0 |
| Extensão mismatch (correção automática) | 0 |
| Fuzzy match (correção sugerida) | 0 |
| **BROKEN irrecuperáveis** | **2** (2 resolvidos em 2026-09-02) |
| Referências ignoradas (relativas/import) | 0 |
| Arquivos em /public | 1778 |
| Imagens órfãs em /public | 668 (158.9 MB) |
| Links internos quebrados | 0 |
| Links externos (revisão manual) | 146 |
| Tags `<img>` cruas (a migrar) | 55 |
| Tags `<Image>` (next/image) já usadas | 577 |
| Imagens SEM atributo alt | 0 |
| Imagens com alt="" | 9 |
| Tags `<video>` | 14 |
| Peso total de /public | 718.4 MB |

---

## ⛔ BLOQUEIO DE ACESSO — `www.housemazzutti.com` sem certificado

Achado fora do escopo de código, mas de impacto maior que qualquer imagem
quebrada: **quem digita `www.` não consegue entrar no site.**

Evidência coletada em 2026-09-01:

| Host | DNS | Certificado servido | HTTP |
|---|---|---|---|
| `housemazzutti.com` | 31.97.17.85 | Let's Encrypt, SAN = `housemazzutti.com` | 307 → `/pt/` (ok) |
| `www.housemazzutti.com` | 31.97.17.85 | **`CN=TRAEFIK DEFAULT CERT` (autoassinado)** | **503** |
| `app.housemazzutti.com` | sem registro — correto, não deve existir | — | — |

O DNS do `www` aponta certo, mas o Traefik do Coolify não tem router para
esse host: devolve o certificado padrão (daí o `NET::ERR_CERT_AUTHORITY_INVALID`
no navegador) e, ignorando o TLS, um 503. Causa: o domínio cadastrado na
aplicação no Coolify é só `https://housemazzutti.com` — sem o `www`, o
Let's Encrypt nunca emitiu certificado para ele.

**A correção é no painel do Coolify, não no código** (ver `PERFORMANCE.md`).
O erro de TLS acontece antes de qualquer requisição HTTP chegar ao Next, então
nenhum `redirect` em `next.config.mjs` resolve isso sozinho.

---

### Top 20 arquivos mais pesados em /public

| # | Arquivo | Tamanho | Referenciado? |
|---:|---|---:|:--:|
| 1 | `/videos/beatco-moda.mp4` | 91.4 MB | sim |
| 2 | `/videos/depoimentos-inside-out.mp4` | 90.0 MB | sim |
| 3 | `/videos/house-mazzutti-10-anos-branding-house-criativa-estrategic-house-branding-marketing-publicidade-rp-midia-digital-conect-influencia-moda-beauty-mazzutti-angelo-dir.vertical.mp4` | 72.8 MB | sim |
| 4 | `/videos/house-mazzutti-10-anos-branding-house-criativa-estrategic-house-branding-marketing-publicidade-rp-midia-digital-conect-influencia-moda-beauty-mazzutti-angelo-dir.mp4` | 47.6 MB | **NÃO** |
| 5 | `/videos/dona-onca.mp4` | 26.6 MB | **NÃO** |
| 6 | `/videos/studio-plano.mp4` | 26.6 MB | sim |
| 7 | `/videos/hero-tour-new.mp4` | 13.3 MB | sim |
| 8 | `/videos/hero-tour.mp4` | 11.4 MB | **NÃO** |
| 9 | `/videos/house-mazzutti-fashion-film-hero.mp4` | 9.0 MB | sim |
| 10 | `/videos/inside-out-hero-horizontal.mp4` | 6.4 MB | sim |
| 11 | `/videos/inside-out-hero-vertical.mp4` | 6.1 MB | sim |
| 12 | `/images-backup/academy/marketing-para-modelos/cover.png` | 5.5 MB | **NÃO** |
| 13 | `/images-backup/home/banner-1.png` | 5.1 MB | **NÃO** |
| 14 | `/images-backup/home/banner-3.jpg` | 4.0 MB | **NÃO** |
| 15 | `/images-backup/academy/marketing-para-modelos/mockup-chair.png` | 3.7 MB | **NÃO** |
| 16 | `/images/agencia/dra-ariadne-barbosa/dra-ariadne-barbosa-logo-branding-manual-de-marca-identidade-visual-house-mazzutti-agencia-capa.png` | 3.6 MB | **NÃO** |
| 17 | `/images/house-mazzutti-foto-grid-portfolio-mulheres-ensaio.jpg` | 3.5 MB | **NÃO** |
| 18 | `/images-backup/home/banner-2.jpg` | 2.7 MB | **NÃO** |
| 19 | `/images-backup/comunidade/grid-5.png` | 2.6 MB | **NÃO** |
| 20 | `/videos/beauty-oceane-larissa.mp4` | 2.4 MB | sim |

---

## CASE_MISMATCH (Linux vai quebrar) — 0

_Nenhuma ocorrência._

## EXT_MISMATCH (extensão diferente) — 0

_Nenhuma ocorrência._

## FUZZY_MATCH (sugestão — precisa de decisão) — 0

_Nenhuma ocorrência._

## BROKEN — irrecuperáveis — 2 (2 resolvidos em 2026-09-02)

| Arquivo:linha | Referência | Status |
|---|---|---|
| `src/app/[locale]/blog/[slug]/articles.js:7212` | `/images/produtora/moda/1.webp` | ✅ gerado 2026-09-02 |
| `src/app/[locale]/blog/[slug]/articles.js:7218` | `/images/produtora/moda/2.webp` | ✅ gerado 2026-09-02 |
| `src/app/[locale]/portfolio-produtora/splash-boutique/layout.js:15` | `/images/produtora/moda/splash-boutique/1.webp` | ⛔ pendente |
| `src/lib/seo/schemas.js:1577` | `${SITE}/images/produtora/moda/splash-boutique/1.webp` | ⛔ pendente |

## Referências DINÂMICAS com ZERO arquivos correspondentes (quebradas) — 2

| Arquivo:linha | Padrão |
|---|---|
| `src/app/[locale]/portfolio-produtora/splash-boutique/page.js:77` | `/images/produtora/moda/splash-boutique/${i+1}.webp` |
| `src/app/components/PortfolioVideo.js:22` | `/videos/${unit}/${slug}/projeto.mp4` |

## Referências DINÂMICAS (template literals) — 46

| Arquivo:linha | Padrão | Arquivos que casam | Exemplo |
|---|---|---:|---|
| `src/app/[locale]/agencia/comunicacao/page.js:90` | `/images/agencia/${img}.webp` | 115 | `/images/agencia/alletto/1.webp`<br>`/images/agencia/alletto/10.webp`<br>`/images/agencia/alletto/11.webp` |
| `src/app/[locale]/agencia/web/page.js:90` | `/images/agencia/${img}.webp` | 115 | `/images/agencia/alletto/1.webp`<br>`/images/agencia/alletto/10.webp`<br>`/images/agencia/alletto/11.webp` |
| `src/app/[locale]/portfolio/page.js:28` | `/images/studio/${slug}/capa.webp` | 44 | `/images/studio/amanda-oliveira/capa.webp`<br>`/images/studio/ana-laura-saar/capa.webp`<br>`/images/studio/ana-rockenbach/capa.webp` |
| `src/app/[locale]/portfolio/page.js:40` | `/images/studio/${slug}/capa.webp` | 44 | `/images/studio/amanda-oliveira/capa.webp`<br>`/images/studio/ana-laura-saar/capa.webp`<br>`/images/studio/ana-rockenbach/capa.webp` |
| `src/app/[locale]/portfolio/page.js:51` | `/images/produtora/acessorios/${slug}/capa.webp` | 16 | `/images/produtora/acessorios/barbara-porto/capa.webp`<br>`/images/produtora/acessorios/bia/capa.webp`<br>`/images/produtora/acessorios/camila-scarpa/capa.webp` |
| `src/app/[locale]/portfolio/page.js:61` | `/images/produtora/beleza/${slug}/capa.webp` | 11 | `/images/produtora/beleza/alletto-still/capa.webp`<br>`/images/produtora/beleza/jequiti-ana-castela/capa.webp`<br>`/images/produtora/beleza/jequiti-galisteu/capa.webp` |
| `src/app/[locale]/portfolio/page.js:70` | `/images/produtora/moda/${slug}/capa.webp` | 7 | `/images/produtora/moda/beatco/capa.webp`<br>`/images/produtora/moda/beatco-2/capa.webp`<br>`/images/produtora/moda/eivi/capa.webp` |
| `src/app/[locale]/portfolio/page.js:82` | `/images/agencia/${item}/capa.webp` | 7 | `/images/agencia/alletto/capa.webp`<br>`/images/agencia/house-mazzutti/capa.webp`<br>`/images/agencia/knowhol/capa.webp` |
| `src/app/[locale]/portfolio-produtora/barbara-porto/page.js:18` | `/images/produtora/acessorios/barbara-porto/${i+1}.webp` | 9 | `/images/produtora/acessorios/barbara-porto/1.webp`<br>`/images/produtora/acessorios/barbara-porto/2.webp`<br>`/images/produtora/acessorios/barbara-porto/3.webp` |
| `src/app/[locale]/portfolio-produtora/beatco/page.js:73` | `/images/produtora/moda/beatco/${i+1}.webp` | 9 | `/images/produtora/moda/beatco/1.webp`<br>`/images/produtora/moda/beatco/2.webp`<br>`/images/produtora/moda/beatco/3.webp` |
| `src/app/[locale]/portfolio-produtora/beatco-2/page.js:74` | `/images/produtora/moda/beatco-2/${i+1}.webp` | 7 | `/images/produtora/moda/beatco-2/1.webp`<br>`/images/produtora/moda/beatco-2/2.webp`<br>`/images/produtora/moda/beatco-2/3.webp` |
| `src/app/[locale]/portfolio-produtora/bia/page.js:72` | `/images/produtora/acessorios/bia/${i+1}.webp` | 5 | `/images/produtora/acessorios/bia/1.webp`<br>`/images/produtora/acessorios/bia/2.webp`<br>`/images/produtora/acessorios/bia/3.webp` |
| `src/app/[locale]/portfolio-produtora/camila-scarpa/page.js:18` | `/images/produtora/acessorios/camila-scarpa/${i+1}.webp` | 6 | `/images/produtora/acessorios/camila-scarpa/1.webp`<br>`/images/produtora/acessorios/camila-scarpa/2.webp`<br>`/images/produtora/acessorios/camila-scarpa/3.webp` |
| `src/app/[locale]/portfolio-produtora/dumond/page.js:73` | `/images/produtora/acessorios/dumond/${i+1}.webp` | 5 | `/images/produtora/acessorios/dumond/1.webp`<br>`/images/produtora/acessorios/dumond/2.webp`<br>`/images/produtora/acessorios/dumond/3.webp` |
| `src/app/[locale]/portfolio-produtora/elyah/page.js:73` | `/images/produtora/acessorios/elyah/${i+1}.webp` | 11 | `/images/produtora/acessorios/elyah/1.webp`<br>`/images/produtora/acessorios/elyah/10.webp`<br>`/images/produtora/acessorios/elyah/2.webp` |
| `src/app/[locale]/portfolio-produtora/festiva/page.js:73` | `/images/produtora/acessorios/festiva/${i+1}.webp` | 11 | `/images/produtora/acessorios/festiva/1.webp`<br>`/images/produtora/acessorios/festiva/10.webp`<br>`/images/produtora/acessorios/festiva/2.webp` |
| `src/app/[locale]/portfolio-produtora/idrissi/page.js:73` | `/images/produtora/moda/idrissi/${i+1}.webp` | 9 | `/images/produtora/moda/idrissi/1.webp`<br>`/images/produtora/moda/idrissi/2.webp`<br>`/images/produtora/moda/idrissi/3.webp` |
| `src/app/[locale]/portfolio-produtora/jequiti-ana-castela/page.js:73` | `/images/produtora/beleza/jequiti-ana-castela/${i+1}.webp` | 5 | `/images/produtora/beleza/jequiti-ana-castela/1.webp`<br>`/images/produtora/beleza/jequiti-ana-castela/2.webp`<br>`/images/produtora/beleza/jequiti-ana-castela/3.webp` |
| `src/app/[locale]/portfolio-produtora/jequiti-galisteu/page.js:18` | `/images/produtora/beleza/jequiti-galisteu/${i+1}.webp` | 5 | `/images/produtora/beleza/jequiti-galisteu/1.webp`<br>`/images/produtora/beleza/jequiti-galisteu/2.webp`<br>`/images/produtora/beleza/jequiti-galisteu/3.webp` |
| `src/app/[locale]/portfolio-produtora/jequiti-larissa-manoela/page.js:18` | `/images/produtora/beleza/jequiti-larissa-manoela/${i+1}.webp` | 6 | `/images/produtora/beleza/jequiti-larissa-manoela/1.webp`<br>`/images/produtora/beleza/jequiti-larissa-manoela/2.webp`<br>`/images/produtora/beleza/jequiti-larissa-manoela/3.webp` |
| `src/app/[locale]/portfolio-produtora/jequiti-sense/page.js:18` | `/images/produtora/beleza/jequiti-sense/${i+1}.webp` | 4 | `/images/produtora/beleza/jequiti-sense/1.webp`<br>`/images/produtora/beleza/jequiti-sense/2.webp`<br>`/images/produtora/beleza/jequiti-sense/3.webp` |
| `src/app/[locale]/portfolio-produtora/monica-costa-jewerly/page.js:73` | `/images/produtora/acessorios/monica-costa-jewerly/${i+1}.webp` | 11 | `/images/produtora/acessorios/monica-costa-jewerly/1.webp`<br>`/images/produtora/acessorios/monica-costa-jewerly/10.webp`<br>`/images/produtora/acessorios/monica-costa-jewerly/2.webp` |
| `src/app/[locale]/portfolio-produtora/natalia-beauty/page.js:18` | `/images/produtora/beleza/natalia-beauty/${i+1}.webp` | 7 | `/images/produtora/beleza/natalia-beauty/1.webp`<br>`/images/produtora/beleza/natalia-beauty/2.webp`<br>`/images/produtora/beleza/natalia-beauty/3.webp` |
| `src/app/[locale]/portfolio-produtora/oceane/page.js:18` | `/images/produtora/beleza/oceane/${i+1}.webp` | 4 | `/images/produtora/beleza/oceane/1.webp`<br>`/images/produtora/beleza/oceane/2.webp`<br>`/images/produtora/beleza/oceane/3.webp` |
| `src/app/[locale]/portfolio-produtora/poema-paris/page.js:73` | `/images/produtora/acessorios/poema-paris/${i+1}.webp` | 11 | `/images/produtora/acessorios/poema-paris/1.webp`<br>`/images/produtora/acessorios/poema-paris/10.webp`<br>`/images/produtora/acessorios/poema-paris/2.webp` |
| `src/app/[locale]/portfolio-produtora/pontok/page.js:73` | `/images/produtora/acessorios/pontok/${i+1}.webp` | 7 | `/images/produtora/acessorios/pontok/1.webp`<br>`/images/produtora/acessorios/pontok/2.webp`<br>`/images/produtora/acessorios/pontok/3.webp` |
| `src/app/[locale]/portfolio-produtora/pous/page.js:73` | `/images/produtora/moda/pous/${i+1}.webp` | 13 | `/images/produtora/moda/pous/1.webp`<br>`/images/produtora/moda/pous/10.webp`<br>`/images/produtora/moda/pous/11.webp` |
| `src/app/[locale]/portfolio-produtora/sense-hotel/page.js:73` | `/images/produtora/institucional/sense-hotel/${i+1}.webp` | 4 | `/images/produtora/institucional/sense-hotel/1.webp`<br>`/images/produtora/institucional/sense-hotel/2.webp`<br>`/images/produtora/institucional/sense-hotel/3.webp` |
| `src/app/[locale]/portfolio-produtora/signus/page.js:50` | `/images/produtora/acessorios/signus/${i+1}.webp` | 6 | `/images/produtora/acessorios/signus/1.webp`<br>`/images/produtora/acessorios/signus/2.webp`<br>`/images/produtora/acessorios/signus/3.webp` |
| `src/app/[locale]/portfolio-produtora/signus-fiamma/page.js:73` | `/images/produtora/acessorios/signus-fiamma/${i+1}.webp` | 6 | `/images/produtora/acessorios/signus-fiamma/1.webp`<br>`/images/produtora/acessorios/signus-fiamma/2.webp`<br>`/images/produtora/acessorios/signus-fiamma/3.webp` |
| `src/app/[locale]/portfolio-produtora/signus-jean-pierre/page.js:73` | `/images/produtora/acessorios/signus-jean-pierre/${i+1}.webp` | 6 | `/images/produtora/acessorios/signus-jean-pierre/1.webp`<br>`/images/produtora/acessorios/signus-jean-pierre/2.webp`<br>`/images/produtora/acessorios/signus-jean-pierre/3.webp` |
| `src/app/[locale]/portfolio-produtora/signus-lavorato/page.js:73` | `/images/produtora/acessorios/signus-lavorato/${i+1}.webp` | 6 | `/images/produtora/acessorios/signus-lavorato/1.webp`<br>`/images/produtora/acessorios/signus-lavorato/2.webp`<br>`/images/produtora/acessorios/signus-lavorato/3.webp` |
| `src/app/[locale]/portfolio-produtora/signus-versolato01/page.js:51` | `/images/produtora/acessorios/signus-versolato01/${i+1}.webp` | 6 | `/images/produtora/acessorios/signus-versolato01/1.webp`<br>`/images/produtora/acessorios/signus-versolato01/2.webp`<br>`/images/produtora/acessorios/signus-versolato01/3.webp` |
| `src/app/[locale]/portfolio-produtora/signus-versolato02/page.js:51` | `/images/produtora/acessorios/signus-versolato02/${i+1}.webp` | 7 | `/images/produtora/acessorios/signus-versolato02/1.webp`<br>`/images/produtora/acessorios/signus-versolato02/2.webp`<br>`/images/produtora/acessorios/signus-versolato02/3.webp` |
| `src/app/[locale]/portfolio-produtora/signus-vertz/page.js:73` | `/images/produtora/acessorios/signus-vertz/${i+1}.webp` | 6 | `/images/produtora/acessorios/signus-vertz/1.webp`<br>`/images/produtora/acessorios/signus-vertz/2.webp`<br>`/images/produtora/acessorios/signus-vertz/3.webp` |
| `src/app/[locale]/portfolio-produtora/simony-marca/page.js:73` | `/images/produtora/beleza/simony-marca/${i+1}.webp` | 4 | `/images/produtora/beleza/simony-marca/1.webp`<br>`/images/produtora/beleza/simony-marca/2.webp`<br>`/images/produtora/beleza/simony-marca/3.webp` |
| `src/app/[locale]/portfolio-produtora/splash-boutique/page.js:77` | `/images/produtora/moda/splash-boutique/${i+1}.webp` | **0** |  |
| `src/app/[locale]/portfolio-produtora/superbia/page.js:71` | `/images/produtora/beleza/superbia/${i+1}.webp` | 8 | `/images/produtora/beleza/superbia/1.webp`<br>`/images/produtora/beleza/superbia/2.webp`<br>`/images/produtora/beleza/superbia/3.webp` |
| `src/app/[locale]/portfolio-produtora/tf/page.js:73` | `/images/produtora/institucional/tf/${i+1}.webp` | 13 | `/images/produtora/institucional/tf/1.webp`<br>`/images/produtora/institucional/tf/10.webp`<br>`/images/produtora/institucional/tf/11.webp` |
| `src/app/[locale]/portfolio-produtora/toli/page.js:51` | `/images/produtora/moda/toli/${i+1}.webp` | 11 | `/images/produtora/moda/toli/1.webp`<br>`/images/produtora/moda/toli/10.webp`<br>`/images/produtora/moda/toli/2.webp` |
| `src/app/[locale]/portfolio-produtora/unique-chic/page.js:73` | `/images/produtora/moda/unique-chic/${i+1}.webp` | 14 | `/images/produtora/moda/unique-chic/1.webp`<br>`/images/produtora/moda/unique-chic/10.webp`<br>`/images/produtora/moda/unique-chic/11.webp` |
| `src/app/[locale]/portfolio-produtora/we-pink-01/page.js:18` | `/images/produtora/beleza/we-pink-01/${i+1}.webp` | 8 | `/images/produtora/beleza/we-pink-01/1.webp`<br>`/images/produtora/beleza/we-pink-01/2.webp`<br>`/images/produtora/beleza/we-pink-01/3.webp` |
| `src/app/[locale]/portfolio-produtora/we-pink-ze-felipe/page.js:18` | `/images/produtora/beleza/we-pink-ze-felipe/${i+1}.webp` | 5 | `/images/produtora/beleza/we-pink-ze-felipe/1.webp`<br>`/images/produtora/beleza/we-pink-ze-felipe/2.webp`<br>`/images/produtora/beleza/we-pink-ze-felipe/3.webp` |
| `src/app/components/PortfolioVideo.js:22` | `/videos/${unit}/${slug}/projeto.mp4` | **0** |  |
| `src/lib/landingsContent.js:18` | `/images/studio/${slug}/capa.webp` | 44 | `/images/studio/amanda-oliveira/capa.webp`<br>`/images/studio/ana-laura-saar/capa.webp`<br>`/images/studio/ana-rockenbach/capa.webp` |
| `src/lib/landingsContent.js:19` | `/images/produtora/${folder}/${slug}/capa.webp` | 37 | `/images/produtora/acessorios/barbara-porto/capa.webp`<br>`/images/produtora/acessorios/bia/capa.webp`<br>`/images/produtora/acessorios/camila-scarpa/capa.webp` |

## Links internos quebrados — 0

_Nenhuma ocorrência._

## Vídeos — 14

| Arquivo:linha | src | arquivo | poster | arquivo do poster | preload | playsInline |
|---|---|:--:|---|:--:|:--:|:--:|
| `src/app/[locale]/canoinhas/page.js:96` | — | — | `/images/studio/canoinhas-hero/mobile.webp` | ok | metadata | sim |
| `src/app/[locale]/canoinhas/page.js:607` | — | — | `/images/studio/canoinhas-hero/mobile.webp` | ok | none | sim |
| `src/app/[locale]/page.js:202` | — | — | `/images/hero-poster.webp` | ok | metadata | sim |
| `src/app/[locale]/page.js:215` | — | — | `/images/hero-poster.webp` | ok | metadata | sim |
| `src/app/[locale]/produtora/publicidade/page.js:44` | `/videos/house-mazzutti-fashion-film-hero.mp4` | ok | `/images/produtora/beleza/we-pink-ze-felipe/capa.webp` | ok | metadata | sim |
| `src/app/academy/curso/[slug]/aula/[lessonId]/VideoPlayer.tsx:102` | — | — | **sem poster** | — | metadata | sim |
| `src/app/academy/workshop-producao-direcao-01/midia-kit/route.ts:514` | — | — | `/images/academy/inside-out/cover.webp` | ok | metadata | sim |
| `src/app/academy/workshop-producao-direcao-01/route.ts:111` | — | — | `/images/academy/banner-workshop-edit02-sp.webp` | ok | metadata | sim |
| `src/app/academy/workshop-producao-direcao-01/route.ts:120` | — | — | `/images/academy/inside-out/cover.webp` | ok | metadata | sim |
| `src/app/academy/workshop-producao-direcao-01/route.ts:290` | `/videos/beatco-moda.mp4` | ok | `/images/produtora/moda/beatco/capa.webp` | ok | metadata | sim |
| `src/app/academy/workshop-producao-direcao-01/route.ts:308` | `/videos/beauty-oceane-larissa.mp4` | ok | `/images/produtora/beleza/oceane/capa.webp` | ok | metadata | sim |
| `src/app/academy/workshop-producao-direcao-01/route.ts:565` | `/videos/studio-plano.mp4` | ok | `/images/academy/studio-plano/studio-plano-1.webp` | ok | metadata | sim |
| `src/app/academy/workshop-producao-direcao-01/route.ts:612` | `/videos/depoimentos-inside-out.mp4` | ok | `/images/academy/inside-out/cover.webp` | ok | metadata | sim |
| `src/app/components/PortfolioVideo.js:47` | — | — | **sem poster** | — | metadata | sim |

## Imagens sem atributo alt — 0

_Nenhuma ocorrência._

## Imagens com alt="" (verificar se decorativas) — 9

| Arquivo:linha | Tag |
|---|---|
| `src/app/[locale]/agencia/page.js:165` | `<Image>` |
| `src/app/[locale]/canoinhas/page.js:443` | `<Image>` |
| `src/app/[locale]/canoinhas/page.js:509` | `<Image>` |
| `src/app/[locale]/page.js:381` | `<Image>` |
| `src/app/[locale]/produtora/page.js:196` | `<Image>` |
| `src/app/[locale]/studio/page.js:226` | `<Image>` |
| `src/app/academy/checkout/page.js:140` | `<img>` |
| `src/app/academy/comunidade/[spaceSlug]/page.js:100` | `<img>` |
| `src/components/analytics/Tracking.tsx:145` | `<img>` |

## Tags <img> que PODEM migrar para next/image (JSX) — 0

_Nenhuma ocorrência._

## Tags <img> que NÃO podem migrar (impossibilidade técnica) — 55

`next/image` exige JSX e um loader do Next. Os casos abaixo não atendem
esse pré-requisito — migrá-los quebraria a página.

| Arquivo | Ocorrências | Motivo |
|---|---:|---|
| `src/app/catalogo-servico-264/route.ts` | 19 | HTML em string dentro de route handler — sem JSX |
| `src/app/academy/workshop-producao-direcao-01/midia-kit/route.ts` | 13 | HTML em string dentro de route handler — sem JSX |
| `src/app/academy/workshop-inside-out-edit-01/route.ts` | 12 | HTML em string dentro de route handler — sem JSX |
| `src/app/academy/workshop-producao-direcao-01/route.ts` | 4 | HTML em string dentro de route handler — sem JSX |
| `src/app/[locale]/canoinhas/checkout/page.js` | 1 | data: URI (QR code) — next/image não aplica |
| `src/app/[locale]/canoinhas/page.js` | 1 | mantido por decisão documentada no código (ver comentário acima da tag) |
| `src/app/[locale]/checkout/pix-pendente/[orderId]/PixPendenteClient.tsx` | 1 | data: URI (QR code) — next/image não aplica |
| `src/app/academy/[type]/[slug]/page.js` | 1 | mantido por decisão documentada no código (ver comentário acima da tag) |
| `src/app/academy/checkout/page.js` | 1 | mantido por decisão documentada no código (ver comentário acima da tag) |
| `src/app/academy/comunidade/[spaceSlug]/page.js` | 1 | mantido por decisão documentada no código (ver comentário acima da tag) |
| `src/components/analytics/Tracking.tsx` | 1 | pixel de tracking / URL externa |

## Saúde das imagens dos artigos do blog

`ArticleImage` (`ArticleContent.js:43`) troca para `fallback` no `onError` do
navegador. Então um `src` quebrado só vira buraco na tela quando o `fallback`
também está quebrado. O OG/Twitter/JSON-LD, porém, usa `cover.src` direto
(`blog/[slug]/page.js:35` e `:42`) — esse quebra em todo caso.

| Situação | Entradas |
|---|---:|
| `src` existe | 159 |
| `src` quebrado, `fallback` salva a tela (mas OG quebra) | 0 |
| **`src` E `fallback` quebrados — buraco visível na página** | **0** |

### Artigos com imagem visivelmente quebrada

| Artigo (slug) | Imagens quebradas |
|---|---:|

### Artigos que dependem do fallback (imagem genérica no lugar da própria)

| Artigo (slug) | Imagens ausentes |
|---|---:|

## Imagens órfãs em /public (NÃO deletadas) — 668

Total: 158.9 MB. Nada foi removido — lista apenas para revisão.

| Arquivo | KB |
|---|---:|
| `/videos/dona-onca.mp4` | 27260 |
| `/images-backup/academy/marketing-para-modelos/cover.png` | 5643 |
| `/images/house-mazzutti-foto-grid-portfolio-mulheres-ensaio.jpg` | 3567 |
| `/images-backup/comunidade/grid-5.png` | 2670 |
| `/images-backup/comunidade/grid-4.png` | 2289 |
| `/images-backup/comunidade/grid-6.png` | 2282 |
| `/images-backup/comunidade/hero.png` | 2261 |
| `/videos/housemazutti-video-sao-paulo-agfencia-foto-video-angelo.mp4` | 2209 |
| `/images-backup/comunidade/grid-2.png` | 1668 |
| `/images-backup/produtora/moda/hero.png` | 1164 |
| `/images-backup/blog/ideia-vs-resultado/producao-executiva-gestao-campanha-house-mazzutti.jpg` | 962 |
| `/images-backup/blog/investir-em-branding/branding-project-completo-empresa-premium-house-mazzutti.jpg` | 890 |
| `/images-backup/blog/ideia-vs-resultado/governanca-criativa-roi-campanha-house-mazzutti.jpg` | 877 |
| `/images-backup/comunidade/grid-1.png` | 869 |
| `/images-backup/blog/ideia-vs-resultado/set-campanha-coordenacao-house-mazzutti.jpg` | 736 |
| `/images-backup/produtora/acessorios/signus-versolato02/2.jpg` | 630 |
| `/images-backup/studio/julia-moraes/2.jpg` | 610 |
| `/images-backup/studio/marina-machado/5.jpg` | 594 |
| `/images-backup/produtora/acessorios/signus/4.jpg` | 591 |
| `/images-backup/produtora/acessorios/signus/3.jpg` | 588 |
| `/images-backup/studio/francielle-reis/5.jpg` | 575 |
| `/images-backup/produtora/acessorios/signus-vertz/1.jpg` | 571 |
| `/images-backup/studio/vitoria-boidt/5.jpg` | 568 |
| `/images-backup/comunidade/grid-3.png` | 558 |
| `/images-backup/produtora/acessorios/poema-paris/8.jpg` | 554 |
| `/images-backup/produtora/acessorios/dumond/4.jpg` | 543 |
| `/images-backup/studio/nairicia-caberlon/1.jpg` | 523 |
| `/images-backup/produtora/acessorios/signus/5.jpg` | 521 |
| `/images-backup/studio/thaisi-dias/1.jpg` | 514 |
| `/images-backup/produtora/moda/pous/7.jpg` | 510 |
| `/images-backup/studio/sara-henriches/7.jpg` | 509 |
| `/images-backup/studio/thaisi-dias/5.jpg` | 502 |
| `/images-backup/produtora/moda/toli/5.jpg` | 495 |
| `/images-backup/produtora/acessorios/signus-versolato01/5.jpg` | 494 |
| `/images-backup/studio/francielle-reis/1.jpg` | 492 |
| `/images-backup/studio/francielle-reis/capa.jpg` | 492 |
| `/images-backup/produtora/acessorios/signus-lavorato/5.jpg` | 485 |
| `/images-backup/produtora/acessorios/signus-vertz/5.jpg` | 476 |
| `/images-backup/produtora/acessorios/barbara-porto/5.jpg` | 467 |
| `/images-backup/produtora/acessorios/poema-paris/7.jpg` | 464 |
| `/images-backup/produtora/beleza/oceane/2.jpg` | 462 |
| `/images-backup/produtora/acessorios/signus-jean-pierre/3.jpg` | 461 |
| `/images-backup/studio/francielle-reis/2.jpg` | 459 |
| `/images-backup/produtora/acessorios/signus/2.jpg` | 450 |
| `/images-backup/studio/arielly/5.jpg` | 449 |
| `/images-backup/about/origem.png` | 448 |
| `/images-backup/studio/gustavo-vioto/4.jpg` | 442 |
| `/images-backup/studio/iza-feser/2.jpg` | 442 |
| `/images-backup/produtora/acessorios/signus-lavorato/1.jpg` | 437 |
| `/images-backup/studio/marina-machado/3.jpg` | 436 |
| `/images-backup/produtora/beleza/oceane/1.jpg` | 432 |
| `/images-backup/produtora/acessorios/signus-versolato02/1.jpg` | 431 |
| `/images-backup/produtora/acessorios/signus-versolato01/1.jpg` | 427 |
| `/images-backup/studio/julia-moraes/4.jpg` | 419 |
| `/images-backup/studio/gustavo-vioto/3.jpg` | 417 |
| `/images-backup/studio/francielle-reis/4.jpg` | 414 |
| `/images-backup/produtora/acessorios/signus-vertz/3.jpg` | 413 |
| `/images-backup/studio/emanuelly-terres/1.jpg` | 412 |
| `/images-backup/studio/emanuelly-terres/capa.jpg` | 412 |
| `/images-backup/produtora/moda/beatco/1.jpg` | 411 |
| `/images-backup/studio/patricia-marafon/4.jpg` | 410 |
| `/images-backup/produtora/acessorios/signus-versolato01/2.jpg` | 410 |
| `/images-backup/studio/gustavo-vioto/5.jpg` | 409 |
| `/images-backup/studio/debora-pantaglione/8.jpg` | 409 |
| `/images-backup/produtora/acessorios/signus/1.jpg` | 408 |
| `/images-backup/produtora/acessorios/signus-versolato01/4.jpg` | 407 |
| `/images-backup/studio/francielle-reis/3.jpg` | 401 |
| `/images-backup/studio/debora-pantaglione/3.jpg` | 393 |
| `/images-backup/produtora/acessorios/barbara-porto/7.jpg` | 391 |
| `/images-backup/produtora/acessorios/dumond/3.jpg` | 391 |
| `/images-backup/produtora/acessorios/signus-jean-pierre/1.jpg` | 391 |
| `/images-backup/produtora/acessorios/signus-lavorato/2.jpg` | 390 |
| `/images-backup/produtora/acessorios/signus-vertz/4.jpg` | 388 |
| `/images-backup/studio/fernanda-costas/1.jpg` | 386 |
| `/images-backup/produtora/acessorios/poema-paris/5.jpg` | 381 |
| `/images-backup/produtora/acessorios/signus-versolato02/3.jpg` | 378 |
| `/images-backup/produtora/moda/beatco/2.jpg` | 372 |
| `/images-backup/studio/debora-pantaglione/1.jpg` | 372 |
| `/images-backup/produtora/acessorios/signus-vertz/2.jpg` | 369 |
| `/images/academy/comunicacao-360/cover.jpg` | 368 |
| `/images-backup/produtora/acessorios/dumond/2.jpg` | 360 |
| `/images-backup/produtora/acessorios/barbara-porto/8.jpg` | 359 |
| `/images-backup/produtora/acessorios/poema-paris/3.jpg` | 357 |
| `/images-backup/produtora/acessorios/camila-scarpa/3.jpg` | 355 |
| `/images-backup/studio/debora-pantaglione/7.jpg` | 354 |
| `/images-backup/studio/debora-pantaglione/5.jpg` | 353 |
| `/images-backup/produtora/acessorios/signus-fiamma/5.jpg` | 353 |
| `/images-backup/studio/marina-machado/1.jpg` | 349 |
| `/images-backup/produtora/acessorios/signus-fiamma/1.jpg` | 348 |
| `/images-backup/produtora/acessorios/signus-fiamma/4.jpg` | 345 |
| `/images-backup/studio/leif-sinclar/6.jpg` | 343 |
| `/images-backup/produtora/acessorios/poema-paris/10.jpg` | 339 |
| `/images-backup/studio/marina-machado/6.jpg` | 337 |
| `/images-backup/produtora/acessorios/poema-paris/2.jpg` | 335 |
| `/images-backup/studio/nairicia-caberlon/5.jpg` | 331 |
| `/images-backup/studio/maria-eduarda/1.jpg` | 328 |
| `/images-backup/studio/patricia-marafon/3.jpg` | 327 |
| `/images-backup/studio/debora-pantaglione/2.jpg` | 325 |
| `/images-backup/produtora/moda/beatco/5.jpg` | 324 |
| `/images-backup/produtora/acessorios/signus-versolato02/6.jpg` | 323 |
| `/images-backup/produtora/acessorios/barbara-porto/2.jpg` | 322 |
| `/images-backup/produtora/acessorios/barbara-porto/capa.jpg` | 322 |
| `/images-backup/studio/thaisi-dias/2.jpg` | 319 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/2.jpg` | 316 |
| `/images-backup/produtora/moda/pous/8.jpg` | 315 |
| `/images-backup/studio/jessica-bittelbrun/2.jpg` | 313 |
| `/images-backup/produtora/moda/toli/3.jpg` | 313 |
| `/images-backup/studio/patricia-marafon/7.jpg` | 313 |
| `/images-backup/studio/paula-assuncao/8.jpg` | 303 |
| `/images-backup/produtora/acessorios/barbara-porto/6.jpg` | 302 |
| `/images-backup/studio/gab-cruz/13.jpg` | 299 |
| `/images-backup/studio/gustavo-vioto/1.jpg` | 298 |
| `/images-backup/produtora/acessorios/signus-lavorato/4.jpg` | 296 |
| `/images-backup/studio/rebeca-cabral/6.jpg` | 296 |
| `/images-backup/produtora/acessorios/signus-versolato02/4.jpg` | 294 |
| `/images-backup/produtora/acessorios/signus-fiamma/3.jpg` | 293 |
| `/images-backup/produtora/moda/toli/2.jpg` | 291 |
| `/images-backup/studio/maria-tereza/2.jpg` | 289 |
| `/images-backup/produtora/acessorios/signus-lavorato/3.jpg` | 289 |
| `/images-backup/studio/marina-machado/2.jpg` | 287 |
| `/images-backup/produtora/acessorios/camila-scarpa/1.jpg` | 285 |
| `/images-backup/studio/jamile-caroline/2.jpg` | 285 |
| `/images-backup/produtora/acessorios/signus-versolato02/5.jpg` | 283 |
| `/images-backup/produtora/acessorios/camila-scarpa/2.jpg` | 280 |
| `/images-backup/produtora/acessorios/camila-scarpa/capa.jpg` | 280 |
| `/images-backup/produtora/moda/toli/9.jpg` | 276 |
| `/images-backup/agencia/pous/2.jpg` | 276 |
| `/images-backup/produtora/acessorios/signus-jean-pierre/2.jpg` | 275 |
| `/images-backup/produtora/moda/pous/9.jpg` | 274 |
| `/images-backup/produtora/acessorios/poema-paris/6.jpg` | 270 |
| `/images-backup/produtora/moda/beatco/7.jpg` | 267 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/3.jpg` | 265 |
| `/images-backup/studio/patricia-marafon/5.jpg` | 264 |
| `/images-backup/studio/emanuelly-terres/4.jpg` | 264 |
| `/images-backup/produtora/moda/pous/11.jpg` | 263 |
| `/images-backup/produtora/moda/toli/10.jpg` | 260 |
| `/images-backup/studio/brenda-mattos/5.jpg` | 258 |
| `/images-backup/produtora/acessorios/elyah/7.jpg` | 257 |
| `/images-backup/studio/maria-tereza/4.jpg` | 257 |
| `/images-backup/produtora/acessorios/camila-scarpa/4.jpg` | 256 |
| `/images-backup/produtora/moda/beatco/4.jpg` | 255 |
| `/images-backup/studio/gab-cruz/5.jpg` | 254 |
| `/images-backup/studio/patricia-marafon/2.jpg` | 253 |
| `/images-backup/studio/ana-laura-saar/5.jpg` | 252 |
| `/images-backup/produtora/acessorios/barbara-porto/4.jpg` | 252 |
| `/images-backup/studio/arielly/4.jpg` | 248 |
| `/images-backup/studio/carol-costa/1.jpg` | 248 |
| `/images-backup/studio/paula-assuncao/2.jpg` | 247 |
| `/images-backup/studio/maria-eduarda/2.jpg` | 247 |
| `/images-backup/produtora/acessorios/signus-versolato01/3.jpg` | 245 |
| `/images-backup/agencia/house-mazzutti/5.jpg` | 244 |
| `/images-backup/produtora/moda/beatco/3.jpg` | 244 |
| `/images-backup/produtora/acessorios/poema-paris/9.jpg` | 240 |
| `/images-backup/produtora/acessorios/signus-fiamma/2.jpg` | 238 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/7.jpg` | 238 |
| `/images-backup/produtora/acessorios/poema-paris/1.jpg` | 237 |
| `/images-backup/produtora/moda/pous/3.jpg` | 237 |
| `/images-backup/produtora/moda/beatco/8.jpg` | 236 |
| `/images-backup/studio/chai-e-dai/5.jpg` | 236 |
| `/images-backup/studio/poliana-barreto/2.jpg` | 235 |
| `/images-backup/studio/arielly/3.jpg` | 235 |
| `/images-backup/studio/debora-pantaglione/4.jpg` | 234 |
| `/images-backup/studio/paula-assuncao/1.jpg` | 233 |
| `/images-backup/produtora/acessorios/elyah/9.jpg` | 232 |
| `/images-backup/produtora/acessorios/elyah/1.jpg` | 231 |
| `/images-backup/studio/paula-assuncao/7.jpg` | 231 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/4.jpg` | 230 |
| `/images-backup/studio/ana-laura-saar/3.jpg` | 230 |
| `/images-backup/studio/nataly-silva/1.jpg` | 230 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/1.jpg` | 230 |
| `/images/academy/direcao-criativa/cover.jpg` | 228 |
| `/images-backup/produtora/acessorios/elyah/5.jpg` | 227 |
| `/images-backup/produtora/moda/toli/7.jpg` | 227 |
| `/images-backup/studio/gustavo-vioto/2.jpg` | 227 |
| `/images-backup/studio/gustavo-vioto/capa.jpg` | 227 |
| `/images-backup/studio/arielly/1.jpg` | 224 |
| `/images/blog/workshop-inside-out-ita-mazzutti/02.jpg` | 224 |
| `/images-backup/studio/patricia-marafon/6.jpg` | 223 |
| `/images-backup/studio/gab-cruz/2.jpg` | 222 |
| `/images-backup/studio/leif-sinclar/7.jpg` | 222 |
| `/images-backup/studio/sara-henriches/8.jpg` | 222 |
| `/images-backup/produtora/beleza/jequiti-larissa-manoela/5.jpg` | 221 |
| `/images/blog/workshop-inside-out-ita-mazzutti/01.jpg` | 221 |
| `/images-backup/studio/chai-e-dai/1.jpg` | 218 |
| `/images-backup/studio/talita-dalbo/5.jpg` | 218 |
| `/images-backup/produtora/acessorios/signus-jean-pierre/5.jpg` | 215 |
| `/images-backup/studio/debora-pantaglione/6.jpg` | 214 |
| `/images-backup/studio/gustavo-vioto/6.jpg` | 214 |
| `/images-backup/produtora/moda/toli/1.jpg` | 214 |
| `/images-backup/studio/jamile-caroline/3.jpg` | 213 |
| `/images-backup/studio/talita-dalbo/2.jpg` | 211 |
| `/images-backup/produtora/beleza/jequiti-galisteu/1.jpg` | 210 |
| `/images/blog/ideia-vs-resultado/producao-executiva-gestao-campanha-house-mazzutti.webp` | 209 |
| `/images-backup/studio/iasmim/1.jpg` | 207 |
| `/images-backup/studio/maria-tereza/3.jpg` | 207 |
| `/images-backup/studio/ana-laura-saar/2.jpg` | 207 |
| `/images-backup/produtora/acessorios/elyah/6.jpg` | 206 |
| `/images/blog/investir-em-branding/branding-project-completo-empresa-premium-house-mazzutti.webp` | 206 |
| `/images-backup/studio/brenda-mattos/6.jpg` | 206 |
| `/images-backup/produtora/moda/beatco/6.jpg` | 206 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/10.jpg` | 205 |
| `/images-backup/produtora/acessorios/elyah/4.jpg` | 204 |
| `/images-backup/studio/julia-moraes/5.jpg` | 204 |
| `/images-backup/agencia/knowhol/3.jpg` | 204 |
| `/images-backup/studio/nairicia-caberlon/2.jpg` | 204 |
| `/images-backup/studio/mileide-mihaile/7.jpg` | 203 |
| `/images-backup/agencia/house-mazzutti/6.jpg` | 203 |
| `/images-backup/studio/jessica-bittelbrun/3.jpg` | 202 |
| `/images-backup/studio/paula-assuncao/6.jpg` | 199 |
| `/images-backup/studio/andressa-gomiero/1.jpg` | 199 |
| `/images-backup/produtora/acessorios/signus-jean-pierre/4.jpg` | 195 |
| `/images-backup/produtora/acessorios/pontok/6.jpg` | 194 |
| `/images/agencia/alletto/10.jpg` | 194 |
| `/images-backup/produtora/acessorios/elyah/10.jpg` | 194 |
| `/images-backup/studio/nataly-silva/4.jpg` | 193 |
| `/images-backup/produtora/moda/pous/4.jpg` | 193 |
| `/images-backup/studio/carol-costa/6.jpg` | 193 |
| `/images-backup/produtora/beleza/oceane/3.jpg` | 192 |
| `/images-backup/produtora/beleza/jequiti-larissa-manoela/1.jpg` | 191 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/6.jpg` | 190 |
| `/images-backup/produtora/moda/unique-chic/10.jpg` | 190 |
| `/images-backup/studio/samara-samme/5.jpg` | 189 |
| `/images-backup/studio/jamile-caroline/4.jpg` | 189 |
| `/images-backup/produtora/acessorios/poema-paris/4.jpg` | 189 |
| `/images-backup/studio/marina-machado/4.jpg` | 187 |
| `/images-backup/studio/ana-rockenbach/2.jpg` | 187 |
| `/images-backup/studio/jessica-bittelbrun/1.jpg` | 187 |
| `/images-backup/studio/poliana-barreto/5.jpg` | 187 |
| `/images-backup/studio/paula-assuncao/4.jpg` | 187 |
| `/images-backup/studio/maria-tereza/1.jpg` | 186 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/9.jpg` | 184 |
| `/images-backup/studio/amanda-oliveira/5.jpg` | 183 |
| `/images-backup/studio/ana-laura-saar/6.jpg` | 182 |
| `/images-backup/studio/leif-sinclar/3.jpg` | 181 |
| `/images-backup/studio/brenda-mattos/4.jpg` | 181 |
| `/images-backup/studio/nataly-silva/2.jpg` | 181 |
| `/images/academy/crew/trevizoli.webp` | 179 |
| `/images-backup/studio/bruna-brummer/4.jpg` | 178 |
| `/images-backup/produtora/moda/unique-chic/8.jpg` | 178 |
| `/images-backup/studio/marjorie-rossi/3.jpg` | 178 |
| `/images-backup/studio/sara-henriches/3.jpg` | 178 |
| `/images-backup/produtora/beleza/jequiti-larissa-manoela/3.jpg` | 177 |
| `/images-backup/agencia/knowhol/5.jpg` | 177 |
| `/images-backup/studio/samara-samme/3.jpg` | 177 |
| `/images-backup/produtora/beleza/jequiti-larissa-manoela/4.jpg` | 177 |
| `/images-backup/studio/nataly-silva/5.jpg` | 176 |
| `/images-backup/studio/patricia-marafon/1.jpg` | 175 |
| `/images-backup/studio/chai-e-dai/3.jpg` | 175 |
| `/images-backup/produtora/moda/pous/capa.jpg` | 175 |
| `/images-backup/studio/talita-dalbo/4.jpg` | 174 |
| `/images-backup/produtora/moda/toli/8.jpg` | 174 |
| `/images-backup/produtora/acessorios/pontok/2.jpg` | 173 |
| `/images-backup/studio/iza-feser/1.jpg` | 173 |
| `/images-backup/studio/chai-e-dai/6.jpg` | 173 |
| `/images-backup/studio/gab-cruz/7.jpg` | 172 |
| `/images-backup/studio/rebeca-cabral/4.jpg` | 172 |
| `/images/agencia/alletto/2.jpg` | 172 |
| `/images-backup/studio/chai-e-dai/4.jpg` | 171 |
| `/images/blog/ideia-vs-resultado/governanca-criativa-roi-campanha-house-mazzutti.webp` | 170 |
| `/images-backup/studio/bruna-brummer/1.jpg` | 170 |
| `/images-backup/agencia/knowhol/capa.jpg` | 169 |
| `/images-backup/studio/sara-henriches/2.jpg` | 169 |
| `/images-backup/studio/gab-cruz/11.jpg` | 169 |
| `/images-backup/studio/sara-henriches/1.jpg` | 169 |
| `/images-backup/studio/gab-cruz/6.jpg` | 168 |
| `/images-backup/studio/fernanda-treml/2.jpg` | 168 |
| `/images-backup/studio/jamile-caroline/5.jpg` | 167 |
| `/images-backup/studio/mileide-mihaile/6.jpg` | 166 |
| `/images-backup/studio/thaisi-dias/4.jpg` | 165 |
| `/images-backup/studio/fernanda-treml/5.jpg` | 164 |
| `/images-backup/produtora/moda/pous/2.jpg` | 164 |
| `/images-backup/studio/jessica-bittelbrun/5.jpg` | 163 |
| `/images-backup/studio/francine-massoco/3.jpg` | 163 |
| `/images-backup/studio/rebeca-cabral/2.jpg` | 163 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/8.jpg` | 163 |
| `/images-backup/produtora/moda/toli/4.jpg` | 163 |
| `/images-backup/studio/carol-costa/3.jpg` | 162 |
| `/images-backup/produtora/acessorios/elyah/3.jpg` | 162 |
| `/images-backup/produtora/beleza/natalia-beauty/5.jpg` | 160 |
| `/images-backup/produtora/moda/pous/5.jpg` | 160 |
| `/images-backup/studio/samara-samme/1.jpg` | 159 |
| `/images-backup/agencia/house-mazzutti/4.jpg` | 158 |
| `/images-backup/produtora/beleza/jequiti-sense/1.jpg` | 158 |
| `/images-backup/produtora/acessorios/elyah/2.jpg` | 157 |
| `/images-backup/studio/mileide-mihaile/2.jpg` | 156 |
| `/images-backup/studio/poliana-barreto/3.jpg` | 156 |
| `/images-backup/studio/arielly/2.jpg` | 156 |
| `/images-backup/produtora/acessorios/barbara-porto/1.jpg` | 156 |
| `/images-backup/studio/chai-e-dai/2.jpg` | 156 |
| `/images-backup/studio/leif-sinclar/1.jpg` | 156 |
| `/images-backup/studio/jamile-caroline/6.jpg` | 156 |
| `/images-backup/produtora/beleza/jequiti-sense/2.jpg` | 154 |
| `/images-backup/produtora/moda/pous/6.jpg` | 154 |
| `/images-backup/studio/brenda-mattos/1.jpg` | 152 |
| `/images-backup/studio/paula-assuncao/capa.jpg` | 152 |
| `/images-backup/studio/maria-tereza/5.jpg` | 152 |
| `/images-backup/studio/debora-pantaglione/capa.jpg` | 152 |
| `/images-backup/produtora/beleza/jequiti-sense/3.jpg` | 151 |
| `/images-backup/studio/leticia-moraes/5.jpg` | 151 |
| `/images-backup/produtora/acessorios/pontok/5.jpg` | 151 |
| `/images-backup/studio/emanuelly-terres/3.jpg` | 151 |
| `/images-backup/studio/marjorie-rossi/5.jpg` | 151 |
| `/images-backup/studio/carol-costa/2.jpg` | 150 |
| `/images-backup/studio/carol-costa/capa.jpg` | 150 |
| `/images-backup/about/origem-parede.jpeg` | 150 |
| `/images-backup/produtora/beleza/we-pink-ze-felipe/1.jpg` | 149 |
| `/images-backup/produtora/moda/unique-chic/2.jpg` | 149 |
| `/images-backup/produtora/acessorios/elyah/8.jpg` | 149 |
| `/images-backup/studio/gab-cruz/3.jpg` | 149 |
| `/images-backup/produtora/moda/pous/10.jpg` | 148 |
| `/images-backup/studio/ana-laura-saar/capa.jpg` | 147 |
| `/images-backup/studio/samara-samme/4.jpg` | 147 |
| `/images-backup/studio/paula-assuncao/5.jpg` | 147 |
| `/images-backup/studio/nataly-silva/3.jpg` | 146 |
| `/images-backup/produtora/acessorios/pontok/1.jpg` | 146 |
| `/images-backup/studio/maria-eduarda/3.jpg` | 146 |
| `/images-backup/studio/ana-laura-saar/1.jpg` | 146 |
| `/images-backup/studio/andressa-gomiero/2.jpg` | 144 |
| `/images-backup/studio/iasmim/5.jpg` | 144 |
| `/images-backup/studio/ana-rockenbach/5.jpg` | 144 |
| `/images-backup/produtora/moda/unique-chic/12.jpg` | 144 |
| `/images-backup/studio/gab-cruz/4.jpg` | 143 |
| `/images-backup/studio/rebeca-cabral/3.jpg` | 143 |
| `/images-backup/studio/jessica-bittelbrun/capa.jpg` | 142 |
| `/images-backup/studio/vitoria-boidt/3.jpg` | 142 |
| `/images-backup/studio/rebeca-cabral/1.jpg` | 140 |
| `/images-backup/studio/emanuelly-terres/2.jpg` | 139 |
| `/images-backup/studio/iasmim/2.jpg` | 139 |
| `/images-backup/studio/vitoria-boidt/1.jpg` | 139 |
| `/images-backup/produtora/moda/pous/12.jpg` | 139 |
| `/images-backup/studio/ana-laura-saar/4.jpg` | 139 |
| `/images-backup/studio/carol-costa/4.jpg` | 139 |
| `/images-backup/studio/deise-smaniotto/3.jpg` | 139 |
| `/images/agencia/alletto/11.jpg` | 139 |
| `/images-backup/produtora/moda/unique-chic/3.jpg` | 138 |
| `/images-backup/produtora/moda/unique-chic/9.jpg` | 138 |
| `/images-backup/produtora/moda/pous/1.jpg` | 137 |
| `/images-backup/studio/bruna-brummer/5.jpg` | 137 |
| `/images-backup/studio/leticia-moraes/3.jpg` | 137 |
| `/images-backup/studio/bruna-brummer/3.jpg` | 136 |
| `/images-backup/studio/fernanda-costas/2.jpg` | 136 |
| `/images-backup/studio/julia-moraes/3.jpg` | 136 |
| `/images-backup/studio/rebeca-cabral/5.jpg` | 135 |
| `/images-backup/produtora/beleza/we-pink-ze-felipe/3.jpg` | 135 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/5.jpg` | 134 |
| `/images-backup/studio/nairicia-caberlon/4.jpg` | 134 |
| `/images-backup/produtora/moda/unique-chic/6.jpg` | 134 |
| `/images-backup/studio/mileide-mihaile/1.jpg` | 133 |
| `/images-backup/studio/fernanda-costas/3.jpg` | 133 |
| `/images-backup/studio/gab-cruz/10.jpg` | 132 |
| `/images-backup/produtora/beleza/jequiti-larissa-manoela/2.jpg` | 131 |
| `/images-backup/produtora/beleza/jequiti-galisteu/capa.jpg` | 131 |
| `/images-backup/studio/talita-dalbo/1.jpg` | 131 |
| `/images-backup/produtora/beleza/natalia-beauty/1.jpg` | 130 |
| `/images-backup/studio/julia-moraes/6.jpg` | 130 |
| `/images-backup/studio/vitoria-boidt/2.jpg` | 130 |
| `/images-backup/produtora/acessorios/pontok/3.jpg` | 129 |
| `/images-backup/studio/mileide-mihaile/3.jpg` | 129 |
| `/images-backup/studio/leif-sinclar/4.jpg` | 129 |
| `/images-backup/produtora/acessorios/barbara-porto/3.jpg` | 128 |
| `/images-backup/studio/paula-assuncao/3.jpg` | 128 |
| `/images-backup/studio/iza-feser/5.jpg` | 127 |
| `/images-backup/studio/nairicia-caberlon/7.jpg` | 127 |
| `/images-backup/produtora/moda/unique-chic/7.jpg` | 127 |
| `/images-backup/studio/leticia-moraes/1.jpg` | 127 |
| `/images-backup/studio/poliana-barreto/1.jpg` | 126 |
| `/images-backup/produtora/acessorios/camila-scarpa/5.jpg` | 126 |
| `/images-backup/studio/gab-cruz/9.jpg` | 125 |
| `/images-backup/studio/ana-rockenbach/4.jpg` | 125 |
| `/images-backup/studio/marjorie-rossi/2.jpg` | 125 |
| `/images-backup/produtora/moda/unique-chic/13.jpg` | 125 |
| `/images-backup/studio/fernanda-costas/4.jpg` | 125 |
| `/images-backup/studio/jessica-bittelbrun/6.jpg` | 124 |
| `/images-backup/produtora/acessorios/pontok/4.jpg` | 124 |
| `/images-backup/studio/francine-massoco/4.jpg` | 124 |
| `/images/blog/ideia-vs-resultado/set-campanha-coordenacao-house-mazzutti.webp` | 124 |
| `/images-backup/studio/jamile-caroline/capa.jpg` | 124 |
| `/images-backup/studio/marjorie-rossi/6.jpg` | 124 |
| `/images-backup/studio/marjorie-rossi/4.jpg` | 123 |
| `/images-backup/studio/deise-smaniotto/2.jpg` | 123 |
| `/images-backup/studio/francine-massoco/2.jpg` | 123 |
| `/images-backup/studio/chai-e-dai/capa.jpg` | 123 |
| `/images-backup/agencia/knowhol/2.jpg` | 123 |
| `/images-backup/agencia/pous/4.jpg` | 123 |
| `/images-backup/studio/deise-smaniotto/4.jpg` | 122 |
| `/images-backup/studio/brenda-mattos/2.jpg` | 121 |
| `/images-backup/studio/nataly-silva/capa.jpg` | 121 |
| `/images-backup/studio/deise-smaniotto/5.jpg` | 121 |
| `/images-backup/studio/bruna-brummer/2.jpg` | 120 |
| `/images-backup/studio/marjorie-rossi/capa.jpg` | 119 |
| `/images-backup/produtora/beleza/we-pink-01/7.jpg` | 119 |
| `/images-backup/studio/fernanda-treml/3.jpg` | 119 |
| `/images-backup/studio/carol-costa/5.jpg` | 118 |
| `/images-backup/studio/leif-sinclar/2.jpg` | 118 |
| `/images-backup/produtora/beleza/oceane/capa.jpg` | 117 |
| `/images-backup/studio/andressa-gomiero/4.jpg` | 117 |
| `/images-backup/studio/sara-henriches/4.jpg` | 116 |
| `/images-backup/studio/andressa-gomiero/3.jpg` | 116 |
| `/images-backup/studio/fernanda-treml/4.jpg` | 116 |
| `/images-backup/studio/marina-machado/capa.jpg` | 115 |
| `/images-backup/studio/nataly-silva/6.jpg` | 114 |
| `/images-backup/produtora/moda/unique-chic/4.jpg` | 114 |
| `/images-backup/produtora/moda/unique-chic/1.jpg` | 114 |
| `/images-backup/studio/leticia-moraes/6.jpg` | 113 |
| `/images-backup/produtora/beleza/we-pink-01/3.jpg` | 113 |
| `/images-backup/studio/sara-henriches/capa.jpg` | 112 |
| `/images-backup/agencia/on-take/capa.jpg` | 112 |
| `/images-backup/studio/anna-laura/1.jpg` | 112 |
| `/images-backup/studio/nairicia-caberlon/3.jpg` | 111 |
| `/images-backup/studio/poliana-barreto/4.jpg` | 110 |
| `/images-backup/studio/marjorie-rossi/1.jpg` | 110 |
| `/images/agencia/alletto/9.jpg` | 110 |
| `/images-backup/produtora/acessorios/dumond/1.jpg` | 109 |
| `/images/agencia/alletto/6.jpg` | 108 |
| `/images-backup/studio/julia-moraes/capa.jpg` | 108 |
| `/images-backup/produtora/moda/toli/6.jpg` | 108 |
| `/images-backup/studio/vitoria-boidt/4.jpg` | 108 |
| `/images-backup/studio/iza-feser/3.jpg` | 107 |
| `/images-backup/studio/anna-laura/2.jpg` | 106 |
| `/images-backup/agencia/samrat/7.jpg` | 105 |
| `/images/agencia/alletto/3.jpg` | 105 |
| `/images-backup/studio/cynthia-andrade/capa.jpg` | 105 |
| `/images-backup/studio/iasmim/4.jpg` | 104 |
| `/images-backup/studio/gab-cruz/capa.jpg` | 104 |
| `/images-backup/studio/ana-rockenbach/3.jpg` | 103 |
| `/images-backup/studio/gab-cruz/12.jpg` | 102 |
| `/images-backup/produtora/beleza/natalia-beauty/4.jpg` | 101 |
| `/images-backup/studio/brenda-mattos/capa.jpg` | 101 |
| `/images-backup/studio/sara-henriches/6.jpg` | 101 |
| `/images-backup/studio/maria-tereza/capa.jpg` | 100 |
| `/images-backup/studio/samara-samme/2.jpg` | 100 |
| `/images-backup/studio/samara-samme/capa.jpg` | 100 |
| `/images/agencia/alletto/7.jpg` | 100 |
| `/images-backup/produtora/beleza/natalia-beauty/2.jpg` | 100 |
| `/images-backup/studio/amanda-oliveira/capa.jpg` | 99 |
| `/images-backup/studio/nairicia-caberlon/6.jpg` | 98 |
| `/images-backup/studio/talita-dalbo/6.jpg` | 98 |
| `/images-backup/studio/leif-sinclar/capa.jpg` | 98 |
| `/images-backup/studio/patricia-marafon/capa.jpg` | 97 |
| `/images-backup/produtora/beleza/we-pink-ze-felipe/2.jpg` | 97 |
| `/images-backup/produtora/beleza/we-pink-01/1.jpg` | 97 |
| `/images-backup/studio/amanda-oliveira/3.jpg` | 96 |
| `/images-backup/studio/ana-rockenbach/1.jpg` | 96 |
| `/images-backup/studio/brenda-mattos/3.jpg` | 96 |
| `/images-backup/studio/rebeca-cabral/capa.jpg` | 96 |
| `/images-backup/produtora/beleza/natalia-beauty/6.jpg` | 96 |
| `/images-backup/studio/gab-cruz/8.jpg` | 96 |
| `/images-backup/produtora/beleza/we-pink-ze-felipe/4.jpg` | 96 |
| `/images-backup/studio/talita-dalbo/3.jpg` | 95 |
| `/images-backup/studio/francine-massoco/5.jpg` | 94 |
| `/images-backup/studio/iza-feser/4.jpg` | 93 |
| `/images-backup/studio/maria-eduarda/capa.jpg` | 93 |
| `/images-backup/studio/cynthia-andrade/3.jpg` | 93 |
| `/images-backup/agencia/samrat/2.jpg` | 92 |
| `/images-backup/studio/cynthia-andrade/1.jpg` | 92 |
| `/images-backup/produtora/moda/toli/capa.jpg` | 91 |
| `/images-backup/produtora/beleza/alletto-still/4.jpg` | 91 |
| `/images-backup/studio/amanda-oliveira/2.jpg` | 91 |
| `/images-backup/produtora/beleza/jequiti-sense/capa.jpg` | 91 |
| `/images-backup/studio/talita-dalbo/capa.jpg` | 90 |
| `/images-backup/studio/leif-sinclar/5.jpg` | 90 |
| `/images-backup/produtora/beleza/natalia-beauty/3.jpg` | 89 |
| `/images-backup/studio/simonny/8.jpg` | 89 |
| `/images-backup/studio/jessica-bittelbrun/4.jpg` | 88 |
| `/images-backup/agencia/samrat/5.jpg` | 88 |
| `/images-backup/studio/iasmim/capa.jpg` | 87 |
| `/images-backup/studio/deise-smaniotto/1.jpg` | 87 |
| `/images-backup/studio/jamile-caroline/1.jpg` | 87 |
| `/images-backup/studio/fernanda-costas/capa.jpg` | 86 |
| `/images-backup/produtora/beleza/we-pink-01/2.jpg` | 85 |
| `/images-backup/studio/anna-laura/4.jpg` | 85 |
| `/images-backup/agencia/house-mazzutti/1.jpg` | 85 |
| `/images-backup/studio/fernanda-treml/1.jpg` | 84 |
| `/images/agencia/alletto/capa.jpg` | 83 |
| `/images-backup/studio/francine-massoco/1.jpg` | 82 |
| `/images-backup/studio/leticia-moraes/capa.jpg` | 82 |
| `/images-backup/agencia/mabdo/4.jpg` | 82 |
| `/images-backup/produtora/beleza/jequiti-larissa-manoela/capa.jpg` | 82 |
| `/images-backup/studio/julia-moraes/1.jpg` | 82 |
| `/images-backup/studio/fernanda-treml/capa.jpg` | 81 |
| `/images-backup/studio/iasmim/3.jpg` | 80 |
| `/images-backup/studio/arielly/capa.jpg` | 80 |
| `/images-backup/agencia/samrat/3.jpg` | 80 |
| `/images/agencia/alletto/8.jpg` | 80 |
| `/images-backup/studio/iza-feser/capa.jpg` | 80 |
| `/images-backup/produtora/beleza/we-pink-01/capa.jpg` | 79 |
| `/images-backup/studio/amanda-oliveira/1.jpg` | 79 |
| `/images-backup/produtora/beleza/alletto-still/5.jpg` | 79 |
| `/images-backup/studio/deise-smaniotto/capa.jpg` | 79 |
| `/images/academy/crew/mateus-sacaem.webp` | 79 |
| `/images/agencia/alletto/4.jpg` | 79 |
| `/images-backup/studio/simonny/10.jpg` | 77 |
| `/images-backup/studio/simonny/7.jpg` | 77 |
| `/images-backup/studio/bruna-brummer/capa.jpg` | 77 |
| `/images-backup/produtora/acessorios/signus/capa.jpg` | 77 |
| `/images-backup/studio/thaisi-dias/capa.jpg` | 76 |
| `/images-backup/produtora/beleza/alletto-still/3.jpg` | 76 |
| `/images-backup/produtora/beleza/we-pink-01/5.jpg` | 75 |
| `/images-backup/about/diferencial-claquete.jpeg` | 75 |
| `/images-backup/agencia/house-mazzutti/3.jpg` | 75 |
| `/images-backup/studio/thaisi-dias/3.jpg` | 75 |
| `/images/academy/crew/thyago-barriviera.webp` | 74 |
| `/images-backup/studio/poliana-barreto/capa.jpg` | 74 |
| `/images-backup/studio/nairicia-caberlon/capa.jpg` | 73 |
| `/images-backup/studio/simonny/9.jpg` | 72 |
| `/images-backup/agencia/pous/5.jpg` | 72 |
| `/images-backup/produtora/beleza/jequiti-galisteu/2.jpg` | 70 |
| `/images-backup/produtora/moda/unique-chic/capa.jpg` | 70 |
| `/images-backup/produtora/moda/unique-chic/5.jpg` | 69 |
| `/images-backup/studio/sara-henriches/5.jpg` | 69 |
| `/images-backup/produtora/acessorios/signus-versolato01/capa.jpg` | 68 |
| `/images-backup/studio/mileide-mihaile/5.jpg` | 68 |
| `/images-backup/studio/ana-rockenbach/capa.jpg` | 67 |
| `/images-backup/studio/andressa-gomiero/capa.jpg` | 67 |
| `/images-backup/produtora/acessorios/monica-costa-jewerly/capa.jpg` | 66 |
| `/images/agencia/alletto/1.jpg` | 66 |
| `/images/agencia/alletto/5.jpg` | 66 |
| `/images-backup/agencia/samrat/6.jpg` | 65 |
| `/images-backup/agencia/mabdo/5.jpg` | 65 |
| `/images-backup/about/mateus-sacavem.jpg` | 65 |
| `/images-backup/agencia/mabdo/6.jpg` | 65 |
| `/images-backup/studio/mileide-mihaile/4.jpg` | 65 |
| `/images-backup/agencia/house-mazzutti/7.jpg` | 65 |
| `/images-backup/produtora/beleza/alletto-still/2.jpg` | 63 |
| `/images-backup/studio/francine-massoco/capa.jpg` | 63 |
| `/images-backup/agencia/on-take/1.jpg` | 62 |
| `/images-backup/produtora/beleza/we-pink-01/6.jpg` | 62 |
| `/images-backup/studio/cynthia-andrade/2.jpg` | 62 |
| `/images-backup/studio/jessica-bittelbrun/7.jpg` | 61 |
| `/images-backup/agencia/samrat/4.jpg` | 61 |
| `/images-backup/studio/brenda-mattos/7.jpg` | 60 |
| `/images-backup/studio/anna-laura/3.jpg` | 60 |
| `/images-backup/agencia/house-mazzutti/2.jpg` | 60 |
| `/images-backup/produtora/acessorios/signus-lavorato/capa.jpg` | 59 |
| `/images-backup/produtora/beleza/we-pink-ze-felipe/capa.jpg` | 58 |
| `/images-backup/agencia/samrat/1.jpg` | 57 |
| `/images-backup/produtora/acessorios/signus-versolato02/capa.jpg` | 57 |
| `/images/agencia/alletto/12.jpg` | 56 |
| `/images-backup/agencia/house-mazzutti/capa.jpg` | 56 |
| `/images-backup/produtora/acessorios/poema-paris/capa.jpg` | 55 |
| `/images-backup/agencia/mabdo/1.jpg` | 55 |
| `/images-backup/studio/mileide-mihaile/capa.jpg` | 54 |
| `/images-backup/studio/simonny/6.jpg` | 54 |
| `/images-backup/agencia/knowhol/4.jpg` | 54 |
| `/images-backup/produtora/beleza/jequiti-galisteu/3.jpg` | 53 |
| `/images-backup/studio/simonny/2.jpg` | 53 |
| `/images-backup/produtora/beleza/we-pink-01/4.jpg` | 52 |
| `/images-backup/agencia/pous/1.jpg` | 52 |
| `/images-backup/studio/anna-laura/capa.jpg` | 52 |
| `/images-backup/agencia/mabdo/2.jpg` | 51 |
| `/images-backup/produtora/acessorios/elyah/capa.jpg` | 51 |
| `/images-backup/studio/simonny/5.jpg` | 51 |
| `/images-backup/studio/anna-laura/6.jpg` | 50 |
| `/images-backup/produtora/beleza/alletto-still/1.jpg` | 50 |
| `/images-backup/produtora/acessorios/signus-vertz/capa.jpg` | 48 |
| `/images-backup/produtora/moda/unique-chic/11.jpg` | 48 |
| `/images-backup/agencia/mabdo/3.jpg` | 47 |
| `/images-backup/agencia/on-take/2.jpg` | 46 |
| `/images/about/origem.webp` | 46 |
| `/images-backup/agencia/on-take/3.jpg` | 46 |
| `/images-backup/agencia/on-take/5.jpg` | 46 |
| `/images-backup/agencia/knowhol/1.jpg` | 46 |
| `/images/about/origem-parede.webp` | 45 |
| `/images-backup/produtora/beleza/jequiti-galisteu/4.jpg` | 44 |
| `/images/academy/crew/fernanda-olive.webp` | 44 |
| `/images-backup/studio/simonny/3.jpg` | 43 |
| `/images-backup/produtora/acessorios/signus-jean-pierre/capa.jpg` | 42 |
| `/images-backup/agencia/samrat/capa.jpg` | 42 |
| `/images-backup/produtora/acessorios/pontok/capa.jpg` | 41 |
| `/images-backup/studio/anna-laura/5.jpg` | 40 |
| `/images-backup/agencia/pous/3.jpg` | 38 |
| `/images-backup/produtora/moda/beatco/capa.jpg` | 36 |
| `/images-backup/studio/simonny/11.jpg` | 34 |
| `/images-backup/agencia/pous/capa.jpg` | 34 |
| `/images-backup/agencia/mabdo/capa.jpg` | 33 |
| `/images-backup/produtora/beleza/alletto-still/capa.jpg` | 33 |
| `/images/about/mateus-sacavem.webp` | 31 |
| `/images-backup/produtora/acessorios/signus-fiamma/capa.jpg` | 31 |
| `/images/agencia/on-take/8.jpg` | 29 |
| `/images-backup/agencia/on-take/8.jpg` | 29 |
| `/images/academy/crew/neto-lins.webp` | 28 |
| `/images/studio/simonny/15.jpg` | 28 |
| `/images-backup/studio/simonny/15.jpg` | 28 |
| `/images/studio/vitoria-boidt/6.jpg` | 27 |
| `/images-backup/studio/vitoria-boidt/6.jpg` | 27 |
| `/images/agencia/on-take/6.jpg` | 26 |
| `/images-backup/agencia/on-take/6.jpg` | 26 |
| `/images/studio/gab-cruz/1.jpg` | 24 |
| `/images-backup/studio/gab-cruz/1.jpg` | 24 |
| `/images/studio/simonny/1.jpg` | 24 |
| `/images-backup/studio/simonny/1.jpg` | 24 |
| `/images/produtora/acessorios/dumond/capa.jpg` | 24 |
| `/images-backup/produtora/acessorios/dumond/capa.jpg` | 24 |
| `/images/studio/simonny/12.jpg` | 23 |
| `/images-backup/studio/simonny/12.jpg` | 23 |
| `/images/produtora/institucional/sense-hotel/2.jpg` | 23 |
| `/images-backup/produtora/institucional/sense-hotel/2.jpg` | 23 |
| `/images/studio/leticia-moraes/4.jpg` | 23 |
| `/images-backup/studio/leticia-moraes/4.jpg` | 23 |
| `/images/agencia/on-take/4.jpg` | 23 |
| `/images-backup/agencia/on-take/4.jpg` | 23 |
| `/images/agencia/on-take/7.jpg` | 22 |
| `/images-backup/agencia/on-take/7.jpg` | 22 |
| `/images/studio/simonny/13.jpg` | 21 |
| `/images-backup/studio/simonny/13.jpg` | 21 |
| `/images/studio/.DS_Store` | 20 |
| `/images/produtora/institucional/sense-hotel/1.jpg` | 19 |
| `/images-backup/produtora/institucional/sense-hotel/1.jpg` | 19 |
| `/images/studio/simonny/4.jpg` | 19 |
| `/images/studio/simonny/capa.jpg` | 19 |
| `/images-backup/studio/simonny/4.jpg` | 19 |
| `/images-backup/studio/simonny/capa.jpg` | 19 |
| `/images/studio/simonny/14.jpg` | 18 |
| `/images-backup/studio/simonny/14.jpg` | 18 |
| `/images/blog/PROMPTS.md` | 17 |
| `/images/studio/vitoria-boidt/capa.jpg` | 17 |
| `/images-backup/studio/vitoria-boidt/capa.jpg` | 17 |
| `/images/studio/leticia-moraes/2.jpg` | 17 |
| `/images-backup/studio/leticia-moraes/2.jpg` | 17 |
| `/images/produtora/institucional/sense-hotel/3.jpg` | 16 |
| `/images-backup/produtora/institucional/sense-hotel/3.jpg` | 16 |
| `/images/about/diferencial-claquete.webp` | 14 |
| `/images/produtora/institucional/sense-hotel/capa.jpg` | 13 |
| `/images-backup/produtora/institucional/sense-hotel/capa.jpg` | 13 |
| `/images/academy/crew/rod-frois.webp` | 13 |
| `/images/produtora/beleza/natalia-beauty/capa.jpg` | 12 |
| `/images-backup/produtora/beleza/natalia-beauty/capa.jpg` | 12 |
| `/images/blog/README.md` | 9 |
| `/.DS_Store` | 8 |
| `/images/.DS_Store` | 8 |
| `/images/academy/.DS_Store` | 6 |
| `/images/agencia/.DS_Store` | 6 |
| `/images/produtora/.DS_Store` | 6 |
| `/images/produtora/beleza/.DS_Store` | 6 |
| `/images-backup/.DS_Store` | 6 |
| `/images-backup/produtora/.DS_Store` | 6 |
| `/images-backup/produtora/beleza/.DS_Store` | 6 |
| `/images-backup/studio/.DS_Store` | 6 |
| `/lp/.DS_Store` | 6 |
| `/images-backup/angelo/logos/bonne-soiree.png` | 4 |
| `/icons/icon-192.png` | 3 |
| `/icons/icon-512.png` | 3 |
| `/images/angelo/logos/dumond.png` | 2 |
| `/images-backup/angelo/logos/dumond.png` | 2 |
| `/images/angelo/logos/saue.png` | 2 |
| `/images-backup/angelo/logos/saue.png` | 2 |
| `/images/angelo/logos/signus.png` | 2 |
| `/images-backup/angelo/logos/signus.png` | 2 |
| `/images/angelo/logos/oceane.png` | 2 |
| `/images-backup/angelo/logos/oceane.png` | 2 |
| `/images/angelo/logos/wepink.png` | 2 |
| `/images-backup/angelo/logos/wepink.png` | 2 |
| `/images/angelo/logos/beatco.png` | 2 |
| `/images-backup/angelo/logos/beatco.png` | 2 |
| `/images/angelo/logos/elyah.png` | 1 |
| `/images-backup/angelo/logos/elyah.png` | 1 |
| `/.gitkeep` | 0 |
| `/images/agencia/banners/.gitkeep` | 0 |
| `/images/home/.gitkeep` | 0 |
| `/images/produtora/banners/.gitkeep` | 0 |
| `/images/produtora/institucional/sense-hotel/.gitkeep` | 0 |
| `/images/produtora/moda/beatco/.gitkeep` | 0 |
| `/images/produtora/moda/beatco-2/.gitkeep` | 0 |
| `/images/produtora/moda/idrissi/.gitkeep` | 0 |
| `/images/produtora/moda/pous/.gitkeep` | 0 |
| `/images/produtora/moda/toli/.gitkeep` | 0 |
| `/images/produtora/moda/unique-chic/.gitkeep` | 0 |
| `/images/studio/banners/.gitkeep` | 0 |

## Links externos (revisão manual — sem requests HTTP) — 13

| Host | Ocorrências | Primeiro uso |
|---|---:|---|
| `housemazzutti.com` | 44 | `src/app/[locale]/academy/briefing-mal-passado/page.js:544` |
| `instagram.com` | 37 | `src/app/[locale]/academy/briefing-mal-passado/page.js:903` |
| `www.linkedin.com` | 18 | `src/app/[locale]/agencia/page.js:490` |
| `fonts.googleapis.com` | 17 | `src/app/[locale]/academy/briefing-mal-passado/page.js:519` |
| `fonts.gstatic.com` | 9 | `src/app/[locale]/academy/briefing-mal-passado/page.js:520` |
| `wa.me` | 7 | `src/app/[locale]/canoinhas/confirmacao/page.js:23` |
| `linkedin.com` | 6 | `src/app/[locale]/produtora/institucional/page.js:200` |
| `api.fontshare.com` | 3 | `src/app/[locale]/academy/marketing-para-modelos/page.js:557` |
| `maps.google.com` | 1 | `src/app/[locale]/contato/page.js:101` |
| `pay.hotmart.com` | 1 | `src/app/academy/workshop-inside-out-edit-01/route.ts:325` |
| `www.googletagmanager.com` | 1 | `src/app/layout.js:57` |
| `www.google-analytics.com` | 1 | `src/app/layout.js:58` |
| `connect.facebook.net` | 1 | `src/app/layout.js:59` |

---

## Resultado Final

Números medidos por esta mesma auditoria, rodando sobre o código já corrigido.

| | |
|---|---:|
| Referências de mídia resolvidas | 1685 |
| Case mismatch pendente | 0 |
| Extensão mismatch pendente | 0 |
| Fuzzy aguardando decisão | 0 |
| **BROKEN — arquivo não existe** | **4** |
| Links internos quebrados | 0 |
| `<img>` restantes (todos com motivo documentado) | 55 |
| — ainda migráveis para next/image | 0 |
| `<Image>` em uso | 577 |
| Vídeos sem `preload` | 0 |
| Vídeos com `preload="auto"` | 0 |
| Vídeos sem `playsInline` | 0 |
| Vídeos sem poster | 1 |
| Imagens sem alt | 0 |
| Órfãos em /public (nada removido) | 668 · 158.9 MB |

### O que sobrou para decisão humana

1. **4 imagens que não existem** — quase todas são o set editorial
   de artigos de blog que nunca foi produzido. O `fallback` já cobre a tela; o que
   continua quebrado é o Open Graph, que usa `cover.src` direto. Lista por artigo
   em `BROKEN_IMAGES_TODO.md`.
2. **`www.housemazzutti.com` sem certificado** — o bloqueio de acesso descrito no
   topo deste relatório. Correção no painel do Coolify, não no código.
3. **668 arquivos órfãos, 158.9 MB** — listados, nenhum removido.
4. **Vídeos**: `scripts/optimize-videos.js` está pronto e não foi executado.
5. **`npm run lint` não roda** neste checkout — `node_modules/object.values` está
   sem `index.js` e derruba o plugin react do eslint-config-next. Falha idêntica
   no commit anterior a esta auditoria, então é anterior a ela; resolve com
   reinstalação das dependências.

