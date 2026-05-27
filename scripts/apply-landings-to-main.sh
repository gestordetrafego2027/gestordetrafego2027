#!/usr/bin/env bash
# Reaplica as 6 LPs (commit e34b0f8) diretamente na branch main e dá push.
# Usado quando a feature branch divergiu muito de main e cherry-pick teria conflitos.
# Rode no terminal local: bash scripts/apply-landings-to-main.sh
set -euo pipefail

cd "$(dirname "$0")/.."

LANDINGS_COMMIT="e34b0f8"

echo "→ Removendo lock se houver…"
rm -f .git/index.lock

echo "→ Garantindo branch main…"
git checkout main
git pull --ff-only origin main

echo "→ Branch atual:"
git rev-parse --abbrev-ref HEAD

echo "→ Restaurando os 10 arquivos do commit $LANDINGS_COMMIT para a working tree…"
git checkout "$LANDINGS_COMMIT" -- \
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
git commit -m "feat(landings): aplica reescrita das 6 LPs de serviço em produção

Reaplica conteúdo do commit $LANDINGS_COMMIT (feat/ecommerce-s1-gaps-and-s2)
diretamente em main por necessidade — a feature branch divergiu muito.

- 6 LPs reescritas (book, ensaio, cobertura, moda, publicidade, institucional)
- LandingGallery, LandingTeam, LandingPricing — componentes reutilizáveis
- src/lib/landingsContent.js — mapa portfólio→serviço + tabelas de preço
- Pricing: Book a partir de R\$1.7k, Ensaio a partir de R\$3.7k, demais sob consulta
- Equipe placeholder (Lucas/Elena/Arthur) substituída por Angelo Mazzutti + House Studio + House Produtora
- Galerias filtradas por categoria do /portfolio
- Corrige bug do FormDrawer em /produtora/moda e adiciona em /publicidade e /institucional"

echo "→ Push origin main…"
git push origin main

echo "✓ Pronto. Vercel deve disparar deploy de produção em ~1-3 min."
echo "URLs a verificar:"
echo "  https://housemazzutti.com/pt/studio/book/"
echo "  https://housemazzutti.com/pt/studio/ensaio/"
echo "  https://housemazzutti.com/pt/studio/cobertura/"
echo "  https://housemazzutti.com/pt/produtora/moda/"
echo "  https://housemazzutti.com/pt/produtora/publicidade/"
echo "  https://housemazzutti.com/pt/produtora/institucional/"
