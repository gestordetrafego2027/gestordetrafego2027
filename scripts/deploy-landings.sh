#!/usr/bin/env bash
# Commit + push das 6 landings novas (book, ensaio, cobertura, moda, publicidade, institucional)
# Rode no terminal local: bash scripts/deploy-landings.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Removendo lock se houver…"
rm -f .git/index.lock

echo "→ Branch atual:"
git rev-parse --abbrev-ref HEAD

echo "→ Adicionando arquivos…"
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

echo "→ Commitando…"
git commit -m "feat(landings): reescreve 6 LPs de serviço (book, ensaio, cobertura, moda, publicidade, institucional)

- Cria LandingGallery (galeria asimétrica de 8 tiles puxando covers reais do /portfolio por serviço)
- Cria LandingTeam (substitui Lucas/Elena/Arthur placeholder por Angelo Mazzutti + House Studio + House Produtora, todos linkados)
- Cria LandingPricing (pacotes por serviço com Book a partir de R\$1.7k, Ensaio a partir de R\$3.7k, demais sob consulta)
- Cria src/lib/landingsContent.js (mapa portfólio→serviço + tabelas de preço por serviço)
- Refina copy de hero, services, comparativo, FAQ implícita e CTAs em cada LP
- Corrige bug do FormDrawer em /produtora/moda (open → isOpen)
- Adiciona FormDrawer nas LPs /produtora/publicidade e /produtora/institucional (antes não abriam)
- Padroniza meta title/description por LP
- Hero das LPs Studio recebe price-tag no kicker; LPs Produtora recebem 'PROPOSTA SOB MEDIDA'"

echo "→ Push…"
git push

echo "✓ Pronto. Vercel deve disparar deploy automático."
