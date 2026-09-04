# Imagens quebradas — pendentes de decisão manual
Gerado por `node scripts/audit-assets.cjs` em 2026-09-04. Regenere após qualquer correção.

Nenhuma referência foi removida do código. Cada item abaixo continua apontando
para o caminho original — a ação é sua.

## Como ler

- **FUZZY** — existe um arquivo parecido em `/public`. Aceitar a sugestão ou indicar o certo.
- **BROKEN** — não existe nada equivalente. O arquivo precisa ser produzido.

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


---

# Achado manual — NÃO detectado pelo `audit-assets.cjs`

> O script trata `slug` em array como padrão dinâmico e só checa se o diretório-pai
> tem *algum* arquivo, então não flagra um slug individual sem capa. Esta seção é
> mantida à mão. **Se rodar `node scripts/audit-assets.cjs`, ela será sobrescrita** —
> reinsira a partir daqui. O flag durável está no comentário `TODO-BROKEN-IMAGE`
> no código.

## src/app/[locale]/portfolio/page.js:66 — `bonne-sorrie`
- Referência: `/images/produtora/moda/bonne-sorrie/capa.webp` (gerada por `produtoraModa.map(... cover: /images/produtora/moda/${slug}/capa.webp)`)
- Nota: não existe pasta `/public/images/produtora/moda/bonne-sorrie/`, nenhum arquivo homônimo em `/public`, e não há rota de detalhe `/portfolio-produtora/bonne-sorrie`. O card renderiza a capa quebrada no hub `/portfolio`.
- Ação: [ ] produzir a capa (`foto-artigo-blog` / Seedream)  [ ] remover o slug `'bonne-sorrie'` do array  [ ] apontar para um projeto existente
