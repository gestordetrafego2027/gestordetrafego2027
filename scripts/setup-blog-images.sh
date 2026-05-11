#!/usr/bin/env bash
# House Mazzutti — Setup Provisional Blog Images
# Copia banners existentes para /public/images/blog/<slug>/ com filenames SEO-rich.
# Filename pattern: <primary-kw>-<secondary-kw>-<context>-house-mazzutti.jpg
#
# Uso: bash scripts/setup-blog-images.sh
set -euo pipefail

BLOG_DIR="public/images/blog"
S_HOME="public/images/home"
S_STUDIO="public/images/studio/banners"
S_AGENCIA="public/images/agencia/banners"
S_PROD="public/images/produtora/banners"

cp_seo() {
  local src="$1" dest_dir="$2" dest_name="$3"
  mkdir -p "$dest_dir"
  cp "$src" "$dest_dir/$dest_name"
}

# 01 — Studio · Book (quem é escolhido)
D="$BLOG_DIR/book-para-modelos"
cp_seo "$S_STUDIO/banner-1.jpg" "$D" "book-editorial-modelos-direcao-imagem-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-2.jpg" "$D" "book-fotografico-profissional-mood-editorial-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-3.jpg" "$D" "portfolio-modelo-agencia-sao-paulo-house-mazzutti.jpg"

# 02 — Studio · Book (ativo de mercado)
D="$BLOG_DIR/book-modelo-ativo"
cp_seo "$S_STUDIO/banner-2.jpg" "$D" "book-modelo-imagem-ativo-mercado-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-1.jpg" "$D" "book-comercial-editorial-marca-pessoal-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-3.jpg" "$D" "portfolio-modelo-casting-premium-sao-paulo-house-mazzutti.jpg"

# 03 — Studio · Ensaio (autoridade)
D="$BLOG_DIR/ensaio-autoridade"
cp_seo "$S_STUDIO/banner-3.jpg" "$D" "ensaio-pessoal-premium-autoridade-executiva-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-1.jpg" "$D" "retrato-corporativo-direcao-imagem-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-2.jpg" "$D" "ensaio-fotografico-marca-pessoal-house-mazzutti.jpg"

# 04 — Studio · Ensaio (lidera percepção)
D="$BLOG_DIR/ensaio-lidera-percepcao"
cp_seo "$S_STUDIO/banner-2.jpg" "$D" "ensaio-pessoal-reposicionamento-marca-pessoal-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-3.jpg" "$D" "ensaio-editorial-fundadora-direcao-autoral-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-1.jpg" "$D" "retrato-premium-fine-art-house-mazzutti.jpg"

# 05 — Studio · Cobertura (presença SP)
D="$BLOG_DIR/cobertura-presenca-sp"
cp_seo "$S_HOME/banner-2.jpg" "$D" "cobertura-externa-tempo-real-sao-paulo-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-1.jpg" "$D" "direcao-presenca-evento-corporativo-sao-paulo-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-3.jpg" "$D" "captacao-editorial-marca-pessoal-house-mazzutti.jpg"

# 06 — Studio · Cobertura (narrativa visual)
D="$BLOG_DIR/cobertura-narrativa-visual"
cp_seo "$S_HOME/banner-3.jpg" "$D" "cobertura-narrativa-visual-sao-paulo-house-mazzutti.jpg"
cp_seo "$S_HOME/banner-2.jpg" "$D" "cidade-sao-paulo-cenario-editorial-house-mazzutti.jpg"
cp_seo "$S_STUDIO/banner-2.jpg" "$D" "experiencia-marca-pessoal-conteudo-premium-house-mazzutti.jpg"

# 07 — Agência · Branding (arquitetura)
D="$BLOG_DIR/branding-arquitetura-valor"
cp_seo "$S_AGENCIA/banner-1.jpg" "$D" "branding-project-arquitetura-valor-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-2.jpg" "$D" "identidade-visual-sistema-marca-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-3.jpg" "$D" "brand-book-aplicacoes-marca-premium-house-mazzutti.jpg"

# 08 — Agência · Branding (motor de vendas)
D="$BLOG_DIR/branding-motor-vendas"
cp_seo "$S_AGENCIA/banner-2.jpg" "$D" "branding-motor-vendas-conversao-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-1.jpg" "$D" "branding-estrategico-reducao-cac-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-3.jpg" "$D" "identidade-marca-valor-percebido-house-mazzutti.jpg"

# 09 — Agência · Branding (preço)
D="$BLOG_DIR/investir-em-branding"
cp_seo "$S_AGENCIA/banner-3.jpg" "$D" "quanto-investir-branding-guia-estrategico-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-1.jpg" "$D" "branding-project-completo-empresa-premium-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-2.jpg" "$D" "investimento-marca-roi-branding-house-mazzutti.jpg"

# 10 — Agência · Campanhas (lançamento)
D="$BLOG_DIR/campanha-lancamento"
cp_seo "$S_AGENCIA/banner-1.jpg" "$D" "campanha-lancamento-marca-arquitetura-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-1.jpg" "$D" "campanha-publicitaria-direcao-criativa-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-2.jpg" "$D" "lancamento-marca-narrativa-editorial-house-mazzutti.jpg"

# 11 — Agência · Campanhas (por que falham)
D="$BLOG_DIR/por-que-campanhas-falham"
cp_seo "$S_AGENCIA/banner-2.jpg" "$D" "por-que-campanhas-falham-direcao-criativa-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-3.jpg" "$D" "estrutura-campanha-coerencia-editorial-house-mazzutti.jpg"
cp_seo "$S_AGENCIA/banner-1.jpg" "$D" "governanca-criativa-campanha-premium-house-mazzutti.jpg"

# 12 — Produtora · Editorial (narrativa visual)
D="$BLOG_DIR/editorial-moda-narrativa"
cp_seo "$S_PROD/banner-1.jpg" "$D" "editorial-moda-narrativa-visual-fashion-direction-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-3.jpg" "$D" "lookbook-editorial-direcao-arte-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-2.jpg" "$D" "fashion-film-marca-moda-house-mazzutti.jpg"

# 13 — Produtora · Editorial (performance)
D="$BLOG_DIR/editorial-performance"
cp_seo "$S_PROD/banner-3.jpg" "$D" "editorial-moda-performance-conversao-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-2.jpg" "$D" "campanha-moda-leitura-comercial-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-1.jpg" "$D" "imagem-ecommerce-premium-conversao-house-mazzutti.jpg"

# 14 — Produtora · Produção Executiva (boas ideias x resultado)
D="$BLOG_DIR/ideia-vs-resultado"
cp_seo "$S_PROD/banner-2.jpg" "$D" "producao-executiva-gestao-campanha-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-1.jpg" "$D" "set-campanha-coordenacao-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-3.jpg" "$D" "governanca-criativa-roi-campanha-house-mazzutti.jpg"

# 15 — Produtora · Produção Executiva (sistema)
D="$BLOG_DIR/producao-executiva-sistema"
cp_seo "$S_PROD/banner-1.jpg" "$D" "producao-executiva-sistema-governanca-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-3.jpg" "$D" "coordenacao-set-campanha-publicitaria-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-2.jpg" "$D" "direcao-criativa-producao-executiva-house-mazzutti.jpg"

# 16 — Produtora · Produção Executiva (campanhas caras falham)
D="$BLOG_DIR/campanhas-caras-falham"
cp_seo "$S_PROD/banner-3.jpg" "$D" "campanhas-caras-falham-roi-campanha-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-1.jpg" "$D" "campanha-publicitaria-premium-governanca-house-mazzutti.jpg"
cp_seo "$S_PROD/banner-2.jpg" "$D" "previsibilidade-producao-executiva-house-mazzutti.jpg"

echo "✓ 48 imagens copiadas com filenames SEO em $BLOG_DIR/"
find "$BLOG_DIR" -name "*.jpg" | wc -l | xargs echo "Total .jpg files:"
