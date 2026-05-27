#!/usr/bin/env bash
# Publica as 6 LPs reescritas em produção (branch main → deploy Vercel).
# Os 10 arquivos JÁ estão no working tree — este script só faz commit + push.
# Rode no terminal local: bash scripts/publicar-landings.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Removendo lock se houver…"
rm -f .git/index.lock

echo "→ Confirmando que estamos na main…"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "  Branch atual = $BRANCH. Fazendo checkout para main…"
  git stash push -u -m "stash-pre-publicar-landings" || true
  git checkout main
  git stash pop || true
fi

echo "→ Adicionando os 10 arquivos das landings…"
git add \
  "src/lib/landingsContent.js" \
  "src/app/components/LandingGallery.js" \
  "src/app/components/LandingPricing.js" \
  "src/app/components/LandingTeam.js" \
  "src/app/[locale]/studio/book/page.js" \
  "src/app/[locale]/studio/ensaio/page.js" \
  "src/app/[locale]/studio/cobertura/page.js" \
  "src/app/[locale]/produtora/moda/page.js" \
  "src/app/[locale]/produtora/publicidade/page.js" \
  "src/app/[locale]/produtora/institucional/page.js"

echo "→ Diff resumo:"
git --no-pager diff --cached --stat

echo "→ Commitando na main…"
git commit -m "feat(landings): reescreve 6 LPs de serviço (book, ensaio, cobertura, moda, publicidade, institucional)

- Cria LandingGallery, LandingTeam, LandingPricing — componentes reutilizáveis
- Cria src/lib/landingsContent.js — mapa portfólio→serviço + tabelas de preço
- Galerias filtradas por categoria do /portfolio (covers reais, sem mais placeholder Aida)
- Equipe placeholder (Lucas/Elena/Arthur) substituída por Angelo Mazzutti + House Studio + House Produtora
- Pricing: Book a partir de R\$1.7k, Ensaio a partir de R\$3.7k, demais sob consulta
- Corrige bug do FormDrawer em /produtora/moda (open → isOpen)
- Adiciona FormDrawer funcional em /produtora/publicidade e /produtora/institucional
- Hero kicker padronizado, copy refinado, CTAs padronizados"

echo "→ Push origin main…"
git push origin main

echo ""
echo "✓ PRONTO. Vercel vai disparar deploy em ~1-3 min."
echo ""
echo "URLs para verificar quando o deploy terminar:"
echo "  https://housemazzutti.com/pt/studio/book/"
echo "  https://housemazzutti.com/pt/studio/ensaio/"
echo "  https://housemazzutti.com/pt/studio/cobertura/"
echo "  https://housemazzutti.com/pt/produtora/moda/"
echo "  https://housemazzutti.com/pt/produtora/publicidade/"
echo "  https://housemazzutti.com/pt/produtora/institucional/"
