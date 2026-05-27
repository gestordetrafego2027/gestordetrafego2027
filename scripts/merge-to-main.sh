#!/usr/bin/env bash
# Merge feat/ecommerce-s1-gaps-and-s2 → main para disparar deploy em produção no Vercel.
# Rode no terminal local: bash scripts/merge-to-main.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Removendo lock se houver…"
rm -f .git/index.lock

FEATURE_BRANCH="feat/ecommerce-s1-gaps-and-s2"

echo "→ Branch atual:"
git rev-parse --abbrev-ref HEAD

echo "→ Atualizando main…"
git fetch origin main
git checkout main
git pull --ff-only origin main

echo "→ Mostrando commits que serão mergeados:"
git --no-pager log --oneline "main..$FEATURE_BRANCH"

echo "→ Mergeando $FEATURE_BRANCH → main…"
git merge --no-ff "$FEATURE_BRANCH" -m "merge(landings): publica reescrita das 6 LPs de serviço em produção

- 6 LPs reescritas (book, ensaio, cobertura, moda, publicidade, institucional)
- LandingGallery, LandingTeam, LandingPricing — componentes reutilizáveis
- src/lib/landingsContent.js — mapa portfólio→serviço + tabelas de preço
- Pricing: Book a partir de R\$1.7k, Ensaio a partir de R\$3.7k, demais sob consulta
- Substitui equipe placeholder por Angelo Mazzutti + House Studio + House Produtora
- Galerias filtradas por categoria do /portfolio
- Corrige bug do FormDrawer em /produtora/moda e adiciona em /publicidade e /institucional"

echo "→ Push origin main…"
git push origin main

echo "→ Voltando para a branch de feature…"
git checkout "$FEATURE_BRANCH"

echo "✓ Pronto. Vercel deve disparar deploy de produção em ~1-3 min."
echo "Acompanhe em: https://vercel.com/gestordetrafego2027"
