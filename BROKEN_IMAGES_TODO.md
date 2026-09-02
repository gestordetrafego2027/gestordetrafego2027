# Imagens quebradas — pendentes de decisão manual
Gerado por `node scripts/audit-assets.cjs` em 2026-09-02. Regenere após qualquer correção.

Nenhuma referência foi removida do código. Cada item abaixo continua apontando
para o caminho original — a ação é sua.

## Como ler

- **FUZZY** — existe um arquivo parecido em `/public`. Aceitar a sugestão ou indicar o certo.
- **BROKEN** — não existe nada equivalente. O arquivo precisa ser produzido.

---

# BROKEN — imagens de artigo que precisam ser produzidas (50)

Todas em `src/app/[locale]/blog/[slug]/articles.js`. Não é caminho errado: o arquivo não existe.
O `fallback` de cada entrada já aponta para uma imagem real, então a página
não fica com buraco — mas mostra uma imagem genérica no lugar da própria, e o
Open Graph (que usa `cover.src` direto) continua quebrado até o arquivo existir.

Fluxo sugerido: `foto-artigo-blog <slug>` por artigo.

## `cover` — 24 imagem(ns)

- [ ] L8284 `/images/blog/assessoria-imprensa/o-que-e-assessoria-de-imprensa-house-mazzutti.webp`
- [ ] L8291 `/images/blog/assessoria-imprensa/assessoria-imprensa-marca-posicionamento-house-mazzutti.webp`
- [ ] L8297 `/images/blog/assessoria-imprensa/rp-reputacao-marca-sao-paulo-house-mazzutti.webp`
- [ ] L8440 `/images/blog/gestao-redes-sociais/gestao-redes-sociais-empresas-house-mazzutti.webp`
- [ ] L8447 `/images/blog/gestao-redes-sociais/social-media-estrategia-marca-house-mazzutti.webp`
- [ ] L8453 `/images/blog/gestao-redes-sociais/conteudo-digital-premium-empresa-house-mazzutti.webp`
- [ ] L8605 `/images/blog/identidade-visual/identidade-visual-o-que-e-quando-refazer-house-mazzutti.webp`
- [ ] L8612 `/images/blog/identidade-visual/identidade-visual-alem-do-logo-house-mazzutti.webp`
- [ ] L8617 `/images/blog/identidade-visual/quando-refazer-identidade-visual-house-mazzutti.webp`
- [ ] L8744 `/images/blog/diferenca-book-ensaio/diferenca-book-ensaio-fotografico-house-mazzutti.webp`
- [ ] L8751 `/images/blog/diferenca-book-ensaio/book-editorial-versus-ensaio-autoridade-house-mazzutti.webp`
- [ ] L8757 `/images/blog/diferenca-book-ensaio/direcao-imagem-resultado-house-mazzutti.webp`
- [ ] L8849 `/images/blog/quanto-custa-book/book-modelo-investimento-sao-paulo-house-mazzutti.webp`
- [ ] L8856 `/images/blog/quanto-custa-book/book-editorial-direcao-imagem-sao-paulo-house-mazzutti.webp`
- [ ] L8862 `/images/blog/quanto-custa-book/book-fotografico-resultado-premium-house-mazzutti.webp`
- [ ] L8971 `/images/blog/preparar-ensaio/como-se-preparar-ensaio-fotografico-house-mazzutti.webp`
- [ ] L8978 `/images/blog/preparar-ensaio/figurino-ensaio-pessoal-direcao-imagem-house-mazzutti.webp`
- [ ] L8984 `/images/blog/preparar-ensaio/resultado-ensaio-autoridade-house-mazzutti.webp`
- [ ] L9093 `/images/blog/quanto-custa-video/quanto-custa-video-institucional-2025-house-mazzutti.webp`
- [ ] L9100 `/images/blog/quanto-custa-video/set-producao-video-institucional-house-mazzutti.webp`
- [ ] L9106 `/images/blog/quanto-custa-video/resultado-video-institucional-premium-house-mazzutti.webp`
- [ ] L9249 `/images/blog/fashion-film-colecao/fashion-film-lancamento-colecao-house-mazzutti.webp`
- [ ] L9256 `/images/blog/fashion-film-colecao/producao-fashion-film-moda-set-house-mazzutti.webp`
- [ ] L9262 `/images/blog/fashion-film-colecao/fashion-film-resultado-editorial-house-mazzutti.webp`

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

## `fashion-film-sao-paulo-guia-de-producao` — 2 imagem(ns)

- [ ] L7212 `/images/produtora/moda/1.webp`
- [ ] L7218 `/images/produtora/moda/2.webp`

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

