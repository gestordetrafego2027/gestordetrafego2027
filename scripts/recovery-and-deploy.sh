#!/usr/bin/env bash
# Recovery do índice corrompido + deploy das 6 LPs.
# O sandbox do Cowork criou locks que corromperam .git/index.
# Este script reconstrói o índice do zero e dá push.
#
# Rode no terminal local: bash scripts/recovery-and-deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "============================================"
echo "  RECOVERY DO ÍNDICE GIT + DEPLOY LANDINGS"
echo "============================================"
echo ""

echo "→ 1. Removendo locks…"
rm -f .git/index.lock
rm -f /tmp/idx-*.lock 2>/dev/null || true

echo "→ 2. Verificando estado atual:"
git rev-parse --abbrev-ref HEAD || true
ls -la .git/index 2>&1 || true

echo "→ 3. Reconstruindo índice a partir do HEAD…"
# Faz backup do índice corrompido só por garantia
cp .git/index .git/index.corrupted.bak 2>/dev/null || true
# Remove o índice corrompido e reconstrói
rm -f .git/index
git read-tree HEAD
echo "   Índice reconstruído."

echo "→ 4. Verificando se conseguimos rodar git status:"
git status --short | head -10 || echo "  AINDA COM PROBLEMA"
echo ""

echo "→ 5. Garantindo que estamos em main…"
git checkout main

echo "→ 6. Atualizando main com remoto:"
git fetch origin main
git reset --hard origin/main

echo "→ 7. Restaurando os 10 arquivos do commit e34b0f8:"
git checkout e34b0f8 -- \
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

echo "→ 8. Diff resumo:"
git --no-pager diff --cached --stat

echo "→ 9. Commitando na main:"
git commit -m "feat(landings): reescreve 6 LPs de serviço (book, ensaio, cobertura, moda, publicidade, institucional)

- Cria LandingGallery, LandingTeam, LandingPricing — componentes reutilizáveis
- Cria src/lib/landingsContent.js — mapa portfólio→serviço + tabelas de preço
- Galerias filtradas por categoria do /portfolio (covers reais, sem mais placeholder Aida)
- Equipe placeholder (Lucas/Elena/Arthur) substituída por Angelo Mazzutti + House Studio + House Produtora
- Pricing: Book a partir de R\$1.7k, Ensaio a partir de R\$3.7k, demais sob consulta
- Corrige bug do FormDrawer em /produtora/moda (open → isOpen)
- Adiciona FormDrawer funcional em /produtora/publicidade e /produtora/institucional
- Hero kicker padronizado, copy refinado, CTAs padronizados"

echo "→ 10. Push origin main:"
git push origin main

echo ""
echo "============================================"
echo "  ✓ DEPLOY DISPARADO"
echo "============================================"
echo ""
echo "Vercel vai compilar em ~1-3 min."
echo ""
echo "URLs para conferir:"
echo "  https://housemazzutti.com/pt/studio/book/"
echo "  https://housemazzutti.com/pt/studio/ensaio/"
echo "  https://housemazzutti.com/pt/studio/cobertura/"
echo "  https://housemazzutti.com/pt/produtora/moda/"
echo "  https://housemazzutti.com/pt/produtora/publicidade/"
echo "  https://housemazzutti.com/pt/produtora/institucional/"
