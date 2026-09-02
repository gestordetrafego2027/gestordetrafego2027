# Imagens quebradas — pendentes de decisão manual
Gerado por `node scripts/audit-assets.cjs` em 2026-09-02. Regenere após qualquer correção.

Nenhuma referência foi removida do código. Cada item abaixo continua apontando
para o caminho original — a ação é sua.

## Como ler

- **FUZZY** — existe um arquivo parecido em `/public`. Aceitar a sugestão ou indicar o certo.
- **BROKEN** — não existe nada equivalente. O arquivo precisa ser produzido.

---

# BROKEN — imagens de artigo que precisam ser produzidas (84)

Todas em `src/app/[locale]/blog/[slug]/articles.js`. Não é caminho errado: o arquivo não existe.
O `fallback` de cada entrada já aponta para uma imagem real, então a página
não fica com buraco — mas mostra uma imagem genérica no lugar da própria, e o
Open Graph (que usa `cover.src` direto) continua quebrado até o arquivo existir.

Fluxo sugerido: `foto-artigo-blog <slug>` por artigo.

## `por-que-boas-ideias-nao-garantem-resultados` — 3 imagem(ns)

- [ ] L1422 `/images/blog/boas-ideias-resultados/branding-estrategia-posicionamento-house-mazzutti.webp`
- [ ] L1429 `/images/blog/boas-ideias-resultados/identidade-visual-posicionamento-house-mazzutti.webp`
- [ ] L1435 `/images/blog/boas-ideias-resultados/brand-strategy-marca-mercado-house-mazzutti.webp`

## `geo-visibilidade-marca-nas-ias` — 3 imagem(ns)

- [ ] L2305 `/images/blog/geo-visibilidade-ias/geo-generative-engine-optimization-marca-house-mazzutti.webp`
- [ ] L2312 `/images/agencia/branding/interior-1.webp`
- [ ] L2318 `/images/agencia/comunicacao/interior-1.webp`

## `aeo-como-ser-a-resposta-das-ias` — 3 imagem(ns)

- [ ] L2393 `/images/blog/aeo-resposta-das-ias/aeo-answer-engine-optimization-marca-house-mazzutti.webp`
- [ ] L2400 `/images/agencia/rp/interior-1.webp`
- [ ] L2406 `/images/agencia/branding/interior-2.webp`

## `geo-aeo-posicionamento-era-das-ias` — 3 imagem(ns)

- [ ] L2481 `/images/blog/geo-aeo-branding-ias/geo-aeo-posicionamento-marca-ias-house-mazzutti.webp`
- [ ] L2488 `/images/agencia/web/interior-1.webp`
- [ ] L2494 `/images/agencia/comunicacao/interior-2.webp`

## `quanto-custa-book-modelo-sao-paulo` — 3 imagem(ns)

- [ ] L2569 `/images/blog/quanto-custa-book/book-modelo-investimento-sao-paulo-house-mazzutti.webp`
- [ ] L2576 `/images/blog/quanto-custa-book/book-editorial-direcao-imagem-sao-paulo-house-mazzutti.webp`
- [ ] L2582 `/images/blog/quanto-custa-book/book-fotografico-resultado-premium-house-mazzutti.webp`

## `como-se-preparar-ensaio-fotografico` — 3 imagem(ns)

- [ ] L2662 `/images/blog/preparar-ensaio/como-se-preparar-ensaio-fotografico-house-mazzutti.webp`
- [ ] L2669 `/images/blog/preparar-ensaio/figurino-ensaio-pessoal-direcao-imagem-house-mazzutti.webp`
- [ ] L2675 `/images/blog/preparar-ensaio/resultado-ensaio-autoridade-house-mazzutti.webp`

## `o-que-e-assessoria-de-imprensa` — 3 imagem(ns)

- [ ] L2754 `/images/blog/assessoria-imprensa/o-que-e-assessoria-de-imprensa-house-mazzutti.webp`
- [ ] L2761 `/images/blog/assessoria-imprensa/assessoria-imprensa-marca-posicionamento-house-mazzutti.webp`
- [ ] L2767 `/images/blog/assessoria-imprensa/rp-reputacao-marca-sao-paulo-house-mazzutti.webp`

## `fotografia-de-moda-o-que-e-como-aprender` — 3 imagem(ns)

- [ ] L2847 `/images/blog/fotografia-de-moda/fotografia-de-moda-o-que-e-house-mazzutti-academy.webp`
- [ ] L2853 `/images/blog/fotografia-de-moda/pilares-tecnicos-fotografia-moda-house-mazzutti.webp`
- [ ] L2854 `/images/blog/fotografia-de-moda/aprender-fotografia-de-moda-sao-paulo-house-mazzutti.webp`

## `direcao-de-imagem-o-que-faz-um-diretor` — 3 imagem(ns)

- [ ] L2912 `/images/blog/direcao-de-imagem/direcao-de-imagem-o-que-faz-um-diretor-house-mazzutti.webp`
- [ ] L2918 `/images/blog/direcao-de-imagem/diretor-de-imagem-vs-fotografo-house-mazzutti.webp`
- [ ] L2919 `/images/blog/direcao-de-imagem/formacao-diretor-de-imagem-academy-house-mazzutti.webp`

## `workshop-fotografia-moda-sao-paulo-vale-a-pena` — 3 imagem(ns)

- [ ] L2977 `/images/blog/workshop-fotografia-moda/workshop-fotografia-moda-sao-paulo-house-mazzutti.webp`
- [ ] L2983 `/images/blog/workshop-fotografia-moda/workshop-vs-curso-online-fotografia-house-mazzutti.webp`
- [ ] L2984 `/images/blog/workshop-fotografia-moda/inside-out-workshop-direcao-imagem-house-mazzutti.webp`

## `inside-out-workshop-house-mazzutti-o-que-e` — 3 imagem(ns)

- [ ] L3042 `/images/blog/inside-out/inside-out-workshop-house-mazzutti-o-que-e.webp`
- [ ] L3048 `/images/blog/inside-out/inside-out-angelo-ita-mazzutti-direcao-imagem.webp`
- [ ] L3049 `/images/blog/inside-out/inside-out-formato-imersao-fotografia-moda-house-mazzutti.webp`

## `agencia-de-branding-ou-freelancer-quando-contratar-cada-um` — 3 imagem(ns)

- [ ] L3107 `/images/blog/agencia-ou-freelancer/agencia-de-branding-ou-freelancer-quando-contratar-house-mazzutti.webp`
- [ ] L3113 `/images/blog/agencia-ou-freelancer/quando-contratar-agencia-branding-house-mazzutti.webp`
- [ ] L3114 `/images/blog/agencia-ou-freelancer/freelancer-vs-agencia-custo-real-house-mazzutti.webp`

## `quando-contratar-uma-produtora-de-moda-guia-para-marcas` — 3 imagem(ns)

- [ ] L3172 `/images/blog/produtora-de-moda/quando-contratar-produtora-de-moda-house-mazzutti.webp`
- [ ] L3178 `/images/blog/produtora-de-moda/fotografo-solo-vs-produtora-de-moda-house-mazzutti.webp`
- [ ] L3179 `/images/blog/produtora-de-moda/produtora-de-moda-sao-paulo-direcao-arte-house-mazzutti.webp`

## `identidade-visual-o-que-e-quando-refazer-a-sua` — 3 imagem(ns)

- [ ] L3237 `/images/blog/identidade-visual/identidade-visual-o-que-e-quando-refazer-house-mazzutti.webp`
- [ ] L3243 `/images/blog/identidade-visual/identidade-visual-alem-do-logo-house-mazzutti.webp`
- [ ] L3244 `/images/blog/identidade-visual/quando-refazer-identidade-visual-house-mazzutti.webp`

## `diferenca-book-ensaio-fotografico` — 3 imagem(ns)

- [ ] L3303 `/images/blog/diferenca-book-ensaio/diferenca-book-ensaio-fotografico-house-mazzutti.webp`
- [ ] L3310 `/images/blog/diferenca-book-ensaio/book-editorial-versus-ensaio-autoridade-house-mazzutti.webp`
- [ ] L3316 `/images/blog/diferenca-book-ensaio/direcao-imagem-resultado-house-mazzutti.webp`

## `gestao-redes-sociais-para-empresas` — 3 imagem(ns)

- [ ] L3391 `/images/blog/gestao-redes-sociais/gestao-redes-sociais-empresas-house-mazzutti.webp`
- [ ] L3398 `/images/blog/gestao-redes-sociais/social-media-estrategia-marca-house-mazzutti.webp`
- [ ] L3404 `/images/blog/gestao-redes-sociais/conteudo-digital-premium-empresa-house-mazzutti.webp`

## `quanto-custa-video-institucional-2025` — 3 imagem(ns)

- [ ] L3472 `/images/blog/quanto-custa-video/quanto-custa-video-institucional-2025-house-mazzutti.webp`
- [ ] L3479 `/images/blog/quanto-custa-video/set-producao-video-institucional-house-mazzutti.webp`
- [ ] L3485 `/images/blog/quanto-custa-video/resultado-video-institucional-premium-house-mazzutti.webp`

## `fashion-film-lancamento-colecao` — 3 imagem(ns)

- [ ] L3554 `/images/blog/fashion-film-colecao/fashion-film-lancamento-colecao-house-mazzutti.webp`
- [ ] L3561 `/images/blog/fashion-film-colecao/producao-fashion-film-moda-set-house-mazzutti.webp`
- [ ] L3567 `/images/blog/fashion-film-colecao/fashion-film-resultado-editorial-house-mazzutti.webp`

## `quem-dirige-campanhas-wepink-jequiti-sp` — 3 imagem(ns)

- [ ] L4538 `/images/blog/wepink-jequiti-sp/campanha-beleza-wepink-jequiti-house-mazzutti.webp`
- [ ] L4545 `/images/blog/wepink-jequiti-sp/producao-campanha-celebridade-house-mazzutti-sp.webp`
- [ ] L4551 `/images/blog/wepink-jequiti-sp/direcao-criativa-moda-beleza-angelo-mazzutti.webp`

## `formacao-profissional-imagem-sao-paulo` — 3 imagem(ns)

- [ ] L4630 `/images/blog/formacao-imagem-sp/inside-out-house-mazzutti-academy-sao-paulo.webp`
- [ ] L4637 `/images/blog/formacao-imagem-sp/curso-direcao-imagem-profissional-sao-paulo.webp`
- [ ] L4643 `/images/blog/formacao-imagem-sp/producao-audiovisual-formacao-mercado-criativo-sp.webp`

## `diretores-criativos-moda-sao-paulo` — 3 imagem(ns)

- [ ] L4722 `/images/blog/diretores-criativos-moda-sp/diretor-criativo-moda-sao-paulo-house-mazzutti.webp`
- [ ] L4729 `/images/blog/diretores-criativos-moda-sp/set-direcao-criativa-campanha-moda-sao-paulo.webp`
- [ ] L4735 `/images/blog/diretores-criativos-moda-sp/portfolio-direcao-criativa-marcas-moda-brasil.webp`

## `o-que-e-brandbook-e-por-que-sua-marca-precisa` — 3 imagem(ns)

- [ ] L5631 `/images/blog/brandbook/brandbook-manual-de-marca-house-mazzutti.webp`
- [ ] L5638 `/images/blog/brandbook/paleta-tipografia-identidade-visual-house-mazzutti.webp`
- [ ] L5644 `/images/blog/brandbook/aplicacoes-marca-brandbook-house-mazzutti.webp`

## `naming-de-marca-como-escolher-um-nome-que-vende` — 3 imagem(ns)

- [ ] L5731 `/images/blog/naming-de-marca/naming-de-marca-nome-que-posiciona-house-mazzutti.webp`
- [ ] L5738 `/images/blog/naming-de-marca/tipos-de-naming-descritivo-evocativo-house-mazzutti.webp`
- [ ] L5744 `/images/blog/naming-de-marca/criterios-escolha-nome-marca-house-mazzutti.webp`

## `reposicionamento-de-marca-quando-e-como-mudar-identidade-visual` — 3 imagem(ns)

- [ ] L5836 `/images/blog/reposicionamento-de-marca/reposicionamento-de-marca-identidade-visual-house-mazzutti.webp`
- [ ] L5843 `/images/blog/reposicionamento-de-marca/auditoria-marca-rebranding-house-mazzutti.webp`
- [ ] L5849 `/images/blog/reposicionamento-de-marca/rollout-nova-identidade-visual-house-mazzutti.webp`

## `fashion-film-o-que-e-quanto-custa` — 2 imagem(ns)

- [ ] L2053 `/images/blog/fashion-film/fashion-film-producao-moda-house-mazzutti.webp`
- [ ] L2065 `/images/produtora/emanuely-terres/capa.webp`

## `fashion-film-sao-paulo-guia-de-producao` — 2 imagem(ns)

- [ ] L7212 `/images/produtora/moda/1.webp`
- [ ] L7218 `/images/produtora/moda/2.webp`

## `video-institucional-sao-paulo-como-produzir` — 1 imagem(ns)

- [ ] L2140 `/images/blog/video-institucional/video-institucional-producao-sao-paulo-house-mazzutti.webp`

## `casting-set-design-campanha-moda` — 1 imagem(ns)

- [ ] L2226 `/images/blog/casting-set-design/casting-set-design-producao-moda-house-mazzutti.webp`

## `onde-fazer-book-fotografico-sao-paulo` — 1 imagem(ns)

- [ ] L3639 `/images/blog/onde-fazer-book-fotografico-sao-paulo/cover.webp`

## `agencia-branding-premium-sao-paulo` — 1 imagem(ns)

- [ ] L3712 `/images/blog/agencia-branding-premium-sao-paulo/cover.webp`

## `produtora-fashion-film-sao-paulo` — 1 imagem(ns)

- [ ] L3785 `/images/blog/produtora-fashion-film-sao-paulo/cover.webp`

## `direcao-criativa-o-que-e` — 1 imagem(ns)

- [ ] L3858 `/images/blog/direcao-criativa-o-que-e/cover.webp`

## `quanto-custa-book-fotografico-profissional` — 1 imagem(ns)

- [ ] L3931 `/images/blog/quanto-custa-book-fotografico-profissional/cover.webp`

## `casa-criativa-sao-paulo` — 1 imagem(ns)

- [ ] L4004 `/images/blog/casa-criativa-sao-paulo/cover.webp`

---

# BROKEN — fora dos artigos (2)

## src/app/[locale]/portfolio-produtora/splash-boutique/layout.js:15
- Referência: `/images/produtora/moda/splash-boutique/1.webp`
- Nota: 7 arquivos homônimos em pastas irmãs — nenhum é esta imagem
- Ação: [ ] produzir a imagem  [ ] indicar caminho correto  [ ] remover a referência

## src/lib/seo/schemas.js:1577
- Referência: `${SITE}/images/produtora/moda/splash-boutique/1.webp`
- Nota: 7 arquivos homônimos em pastas irmãs — nenhum é esta imagem
- Ação: [ ] produzir a imagem  [ ] indicar caminho correto  [ ] remover a referência

---

# Padrões dinâmicos sem nenhum arquivo (2)

Um padrão com zero correspondências significa galeria inteira vazia em produção.

## src/app/[locale]/portfolio-produtora/splash-boutique/page.js:77
- Padrão: `/images/produtora/moda/splash-boutique/${i+1}.webp`
- Ação: [ ] produzir as imagens  [ ] corrigir o caminho  [ ] despublicar a página

## src/app/components/PortfolioVideo.js:22
- Padrão: `/videos/${unit}/${slug}/projeto.mp4`
- Ação: [ ] produzir as imagens  [ ] corrigir o caminho  [ ] despublicar a página

