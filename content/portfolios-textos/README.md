# Portfólios Individuais — Textos Editoriais (House Mazzutti)

Branch: `editorial/portfolios-individuais-textos`
Autor editorial: House Mazzutti (Angelo Mazzutti, direção; Mateus Sacavem, produção executiva)
Ano: 2026
Total de textos: **83**

## O que tem aqui

| Arquivo | Para que serve |
|---------|---------------|
| `portfolios-house-mazzutti.md` | Fonte mestra em markdown — texto canônico, fácil de editar |
| `portfolios-house-mazzutti.docx` | Word consolidado para revisão final pelo Diretor |
| `portfolios-blocos-wp.html` | 83 blocos HTML prontos para colar (uso fora do Next, se preciso) |
| `portfolios-preview.html` | Preview navegável no browser, com formatação editorial aplicada |
| `slug-map.json` | **Crítico para o dev** — mapeamento texto → slug existente no `src/app/[locale]/portfolio-*/<slug>/page.js` |
| `build-docx.js` / `build-html.js` | Scripts reproduzíveis. `node build-docx.js && node build-html.js` regenera tudo |

## Estrutura padrão de cada portfólio

Todo texto segue o mesmo padrão editorial:

- **Citação** (já presente em cada page.js): _"Nada foi feito para parecer. Foi feito para sustentar."_
- **Ficha técnica** (já presente): Categoria · Autor (House Mazzutti) · Ano (2026)
- **Filosofia do Studio** (já presente): _Retrato como direção: presença, intenção e tratamento editorial._
- **NOVO — Texto editorial de 80–120 palavras** ← isto é o que esta branch acrescenta
- **NOVO — Assinatura da equipe em itálico**

## Como integrar nos page.js (próxima PR)

Em cada `src/app/[locale]/portfolio-<categoria>/<slug>/page.js`, localizar o bloco existente da Filosofia do Studio:

```jsx
<div className="info-col-anim bg-white/50 p-8 mt-8 border border-outline-variant/10">
  <h3 className="font-newsreader text-xl mb-4">Filosofia do Studio</h3>
  <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
    Retrato como direção: presença, intenção e tratamento editorial.
  </p>
</div>
```

E inserir **logo após** o card novo:

```jsx
<div className="info-col-anim bg-white/50 p-8 mt-4 border border-outline-variant/10">
  <h3 className="font-newsreader text-xl mb-4">Sobre este trabalho</h3>
  <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
    {/* TEXTO EDITORIAL de portfolios-house-mazzutti.md, seção correspondente */}
  </p>
  <p className="font-inter text-[10px] italic text-outline-variant leading-relaxed mt-4">
    {/* ASSINATURA da equipe (em itálico) da mesma seção */}
  </p>
</div>
```

Usar o `slug-map.json` para confirmar qual texto vai em qual slug. **74 textos** têm slug direto no repo, **8 textos** não têm página criada ainda (Ana Castela, Patrícia Abravanel, Celso Portiolli, Jequiti 16 Anos, Vivi Modas, Carlinhos Maia Carnaval, Ana Jorge Bazaar, Inside Out) — criar as páginas se desejar publicá-los.

## Conformidade com guia de estilo HMZT

Todos os 83 textos foram verificados contra `guia-estilo-hmzt`:
- ✅ House Mazzutti citada em 100%
- ✅ Angelo Mazzutti (direção criativa) em 100%
- ✅ Mateus Sacavem (produção executiva) em 100%
- ✅ Sem palavras-evitar (viral, engajamento, influenciador, super, mega, etc.)
- ✅ Verbos no presente, uso de travessão, parágrafos enxutos
- ✅ Tom sofisticado, consultivo, humano, confiante

## Reprodução

```bash
cd content/portfolios-textos
npm install docx
node build-docx.js
node build-html.js
```
