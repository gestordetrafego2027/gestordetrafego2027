# Imagens quebradas — pendentes de decisão manual
Gerado por `node scripts/audit-assets.cjs` em 2026-09-02. Regenere após qualquer correção.

Nenhuma referência foi removida do código. Cada item abaixo continua apontando
para o caminho original — a ação é sua.

## Como ler

- **FUZZY** — existe um arquivo parecido em `/public`. Aceitar a sugestão ou indicar o certo.
- **BROKEN** — não existe nada equivalente. O arquivo precisa ser produzido.

---

# BROKEN — imagens de artigo que precisam ser produzidas (2)

Todas em `src/app/[locale]/blog/[slug]/articles.js`. Não é caminho errado: o arquivo não existe.
O `fallback` de cada entrada já aponta para uma imagem real, então a página
não fica com buraco — mas mostra uma imagem genérica no lugar da própria, e o
Open Graph (que usa `cover.src` direto) continua quebrado até o arquivo existir.

Fluxo sugerido: `foto-artigo-blog <slug>` por artigo.

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

