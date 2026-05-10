# Editorial Imagery — House Mazzutti Blog

> **Status atual**: o renderer usa `cover.fallback` (imagens do portfólio existente) enquanto as imagens dedicadas não são produzidas. Quando você colocar as imagens nos paths abaixo, elas substituem automaticamente os fallbacks.

---

## Briefing visual unificado HMZT

Toda imagem do editorial deve seguir o sistema visual do Brand Book 2026:

### Paleta
- **Preto HMZT** `#0A0A0A` · **Branco puro** `#FFFFFF` · **Off-white** `#F5F5F2`
- Cinzas estruturais: `#1A1A1A`, `#6D6D6D`, `#B7B7B7`
- **Sem cores secundárias.** A identidade vive no contraste puro.

### Estilo
- **Preto e branco** ou monocromático com tratamento fine art (até 15% de saturação residual aceito).
- **Luz cinematográfica**: contraste alto, sombras profundas, highlights controlados.
- **Composição editorial**: enquadramento amplo, respiro generoso, hierarquia clara.
- **Granulação editorial sutil** (ISO 800–1600 simulado) — nunca digital limpo demais.
- **Sem elementos decorativos**, sem textos sobrepostos, sem gráficos.

### Mood por categoria

| Categoria | Mood | Direção |
|---|---|---|
| **Studio · Book** | Editorial fashion, presença sustentada | Modelo em retrato 3/4, luz lateral suave, mood mercado de moda |
| **Studio · Ensaio** | Autoridade silenciosa, executiva | Retrato corporativo de alto padrão, ambientação minimalista, gesto contido |
| **Studio · Cobertura** | Cidade como cenário | São Paulo arquitetural ou cliente em movimento urbano, ritmo editorial |
| **Agência · Branding** | Sistema, infraestrutura, abstração | Detalhes de identidade visual, papelaria, geometria, símbolos da marca |
| **Agência · Campanhas** | Direção, multipeça | Set, decoupage de campanha, evidência de processo |
| **Produtora · Editorial** | Fashion film, lookbook | Modelo + produto em mood editorial, paleta neutra dominando |
| **Produtora · Produção Executiva** | Backstage controlado | Set, equipe operando, gestão silenciosa, pranchetas e monitores |

### Especificações técnicas

| Asset | Dimensão | Aspect | Compressão |
|---|---|---|---|
| `cover.jpg` | 1600 × 900 | 16:9 | JPEG 80% qualidade |
| `01.jpg` / `02.jpg` | 1200 × 1800 | 2:3 (vertical) | JPEG 80% qualidade |

> Use **WebP/AVIF** quando possível — preserve sempre um JPEG fallback com mesmo nome.

---

## Mapa de paths (ordem de produção sugerida)

Cada artigo tem **1 cover (16:9)** + **2 imagens de interior (2:3)** = **3 imagens × 16 artigos = 48 peças.**

```
public/images/blog/
├── book-para-modelos/                        # Studio — Book
│   ├── cover.jpg     → modelo em retrato editorial 3/4, P&B
│   ├── 01.jpg        → close de luz cinematográfica
│   └── 02.jpg        → pose com direção autoral
├── book-modelo-ativo/                        # Studio — Book (ativo)
│   ├── cover.jpg     → modelo em ambiente urbano/studio premium
│   ├── 01.jpg        → presença comercial
│   └── 02.jpg        → mood cinematográfico
├── ensaio-autoridade/                        # Studio — Ensaio (autoridade)
│   ├── cover.jpg     → executiva/o em retrato corporativo premium
│   ├── 01.jpg        → hierarquia visual + gesto
│   └── 02.jpg        → fine art editing
├── ensaio-lidera-percepcao/                  # Studio — Ensaio (reposicionamento)
│   ├── cover.jpg     → fundadora/líder com presença sustentada
│   ├── 01.jpg        → mood denso, direção autoral
│   └── 02.jpg        → tratamento P&B premium
├── cobertura-presenca-sp/                    # Studio — Cobertura SP
│   ├── cover.jpg     → executiva em ambiente corporativo SP
│   ├── 01.jpg        → direção de presença em evento
│   └── 02.jpg        → captação real-time
├── cobertura-narrativa-visual/               # Studio — Cobertura (narrativa)
│   ├── cover.jpg     → São Paulo arquitetural editorial
│   ├── 01.jpg        → cidade como linguagem
│   └── 02.jpg        → experiência convertida em ativo
├── branding-arquitetura-valor/               # Agência — Branding
│   ├── cover.jpg     → sistema de identidade visual aplicado
│   ├── 01.jpg        → papelaria institucional
│   └── 02.jpg        → brand book aberto / governança visual
├── branding-motor-vendas/                    # Agência — Branding (vendas)
│   ├── cover.jpg     → identidade premium em ambiente de marca
│   ├── 01.jpg        → aplicação digital + impressa
│   └── 02.jpg        → consistência multi-touchpoint
├── investir-em-branding/                     # Agência — Branding (preço)
│   ├── cover.jpg     → arquivos finais + manuais empilhados
│   ├── 01.jpg        → entrega completa de marca
│   └── 02.jpg        → aplicações premium em escala
├── campanha-lancamento/                      # Agência — Campanhas
│   ├── cover.jpg     → grid de campanha integrada
│   ├── 01.jpg        → narrativa central da campanha
│   └── 02.jpg        → sequência editorial em ritmo
├── por-que-campanhas-falham/                 # Agência — Campanhas (diagnóstico)
│   ├── cover.jpg     → metáfora de fragmentação (vs. coesão)
│   ├── 01.jpg        → coerência editorial
│   └── 02.jpg        → governança criativa unificada
├── editorial-moda-narrativa/                 # Produtora — Editorial
│   ├── cover.jpg     → fashion editorial premium, modelo + produto
│   ├── 01.jpg        → lookbook autoral
│   └── 02.jpg        → direção de arte / território
├── editorial-performance/                    # Produtora — Editorial (vendas)
│   ├── cover.jpg     → e-commerce premium, leitura clara
│   ├── 01.jpg        → comercial premium com mood editorial
│   └── 02.jpg        → hierarquia visual de conversão
├── ideia-vs-resultado/                       # Produtora — Produção Executiva
│   ├── cover.jpg     → set integrado, equipe operando
│   ├── 01.jpg        → coordenação em tempo real
│   └── 02.jpg        → governança criativa
├── producao-executiva-sistema/               # Produtora — Produção Executiva (sistema)
│   ├── cover.jpg     → backstage de campanha premium
│   ├── 01.jpg        → coordenação de set
│   └── 02.jpg        → mesma autoria do briefing ao master
└── campanhas-caras-falham/                   # Produtora — Produção Executiva (orçamento)
    ├── cover.jpg     → campanha publicitária premium em set
    ├── 01.jpg        → governança protegendo conceito
    └── 02.jpg        → previsibilidade / ROI
```

---

## SEO técnico já configurado nos artigos

Para cada imagem, o renderer aplica automaticamente:

| Atributo | Como é gerado |
|---|---|
| `src` | Path do article (com fallback ao portfólio) |
| `alt` | Texto SEO único, descritivo, com keyword + brand mention |
| `title` | Mesmo conteúdo do `alt` (tooltip + reforço SEO) |
| `loading="lazy"` | Performance (LCP) |
| `decoding="async"` | Não bloqueia render |
| `sizes` | Responsividade (largura por viewport) |
| `<figcaption>` | Caption editorial visível, em uppercase tracking-wide |

> **Dica de SEO de imagem (Google Images)**: o **filename** importa quase tanto quanto o alt. Por isso cada slug do diretório (ex.: `branding-motor-vendas`) já carrega keyword. Quando renderizar nomes de arquivo dentro de cada pasta, prefira `cover-branding-motor-vendas.jpg` ao invés do genérico `cover.jpg` se quiser maximizar — basta atualizar o path no `articles.js`.

---

## Prompt-base para geração assistida (Midjourney / DALL-E / Stable Diffusion)

> **Editorial photograph, House Mazzutti aesthetic. Black and white, fine art treatment, cinematic lighting, deep contrast, controlled shadows, editorial grain. Minimalist composition, generous negative space. [SUBJECT-SPECIFIC PROMPT]. No text, no graphics, no logos. Premium magazine quality, 35mm film aesthetic, shot on Hasselblad. Aspect ratio [16:9 for cover / 2:3 for interior].**

Substitua `[SUBJECT-SPECIFIC PROMPT]` pelo mood da categoria (ver tabela acima).

---

## Quando colocar as imagens reais

1. Crie o diretório do artigo: `mkdir public/images/blog/<slug>`
2. Coloque as 3 imagens com os nomes `cover.jpg`, `01.jpg`, `02.jpg`
3. Pronto — o renderer detecta automaticamente e usa as novas imagens. Os fallbacks só aparecem quando o arquivo dedicado não existe.
