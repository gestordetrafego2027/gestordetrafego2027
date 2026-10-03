---
name: lookbook-digital-ai
description: Pipeline completo do LOOKBOOK DIGITAL AI da House Mazzutti — da arte nova até as fotos publicáveis no hmzt.shop. Indexa a estampa, monta a fila, gera no Magnific com fidelidade absoluta (branca com a arte escura, preta com a arte clara, frente e verso), trava a arte original sobre a geração, e empacota para o site. Use quando o usuário lançar uma peça ou estampa nova, ou pedir "indexar a arte X", "rodar o lookbook do P02", "gerar as fotos da coleção Y", "/lookbook-digital-ai".
---

# LOOKBOOK DIGITAL AI

Toda peça nova passa por cinco fases, sempre na mesma ordem. Ninguém pula fase:
pular a 1 custa dezenas de gerações desperdiçadas, e é o erro que mais se repete.

```
1 INDEXAR → 2 DESCREVER → 3 ENFILEIRAR → 4 GERAR+TRAVAR → 5 PUBLICAR
```

Raiz: `docs/shop-confeccao/`. Contexto do produto: `catalogo/Pxx-*.md`,
`dossies/Pxx-*.md`, `prompts/Pxx-prompts.md`.

---

## Fase 1 — INDEXAR a peça nova

O usuário chega com os PNG da estampa. Antes de qualquer coisa:

```bash
python3 docs/shop-confeccao/scripts/indexar_peca.py indexar "<Nome da Estampa>" \
  --produto Pxx --nome "<Nome da Estampa>" \
  --arte frente_modelo01_escuro=<caminho> \
  --arte frente_modelo02_claro=<caminho> \
  [--arte verso_modelo01_escuro=<caminho>] \
  [--arte verso_modelo02_claro=<caminho>]
```

Os quatro papéis, e o que cada um veste:

| Papel | Vai na camiseta | Tom da arte |
|---|---|---|
| `frente_modelo01_escuro` | **branca**, peito | escuro |
| `frente_modelo02_claro` | **preta**, peito | claro |
| `verso_modelo01_escuro` | **branca**, costas | escuro |
| `verso_modelo02_claro` | **preta**, costas | claro |

**Nunca deduza o papel pela ordem dos arquivos.** Abra cada PNG com Read, diga
em uma linha o que é, e confirme com o usuário antes de indexar. Frente e verso
trocados só aparecem na foto pronta, gerações depois.

O script recusa PNG sem transparência — fundo chapado vira um retângulo colado
no peito quando a trava de fidelidade aplica a arte. Ele cria a pasta, guarda os
originais, e deixa `config.json`, `publicacao/<colecao>.json` e os dois
`descricao_modelo*.txt` com os campos em `PENDENTE`.

Coleção só com frente é normal: indexe as duas artes de frente e siga com
`--sem-verso` na fase 3.

## Fase 2 — DESCREVER a arte

Esta fase é o que separa uma letra legível de um rabisco. Preencha, olhando a
arte:

**`artes/<colecao>/config.json`**

| Campo | O que escrever |
|---|---|
| `frente.pos` / `verso.pos` | onde a arte fica, em inglês, com a largura em cm no tamanho M |
| `desc_escura` / `desc_clara` | a arte descrita em inglês, na versão escura e na clara |
| `spell` | cada palavra soletrada: `Y-O-U-R I-M-A-G-E / O-U-R A-R-T` |
| `uniao` | partes que a trava trata como um bloco só (`["front"]` no caso comum) |

**`artes/<colecao>/descricao_modelo01.txt` e `02.txt`** — a arte em inglês,
letra a letra. É o campo que mais segura a tipografia na geração.

**`publicacao/<colecao>.json`** — os textos de venda. Sem isso a fase 5 não roda.

Quando terminar:

```bash
python3 docs/shop-confeccao/scripts/indexar_peca.py verificar <colecao> --produto Pxx
```

Ele audita o contrato inteiro e lista campo a campo o que falta. **Só avance com
"✓ pronta para gerar".**

## Fase 3 — ENFILEIRAR

```bash
python3 docs/shop-confeccao/scripts/build_magnific_jobs.py Pxx --colecao <colecao>
```

→ `magnific/<colecao>/Pxx/jobs.json` e `jobs.md`.

Opções (cm no tamanho M): `--largura-frente 28 --largura-verso 30 --gola-frente 8
--gola-verso 10`, `--posicao centro|peito-esquerdo`, `--sem-verso`.
Estampa de peito pequeno (tipo `art-director`): `--posicao peito-esquerdo
--largura-frente 9 --gola-frente 8 --sem-verso`.

## Fase 4 — GERAR e TRAVAR

### 4.0 O rosto, antes de tudo

Para peça de modelo novo — ou sempre que o rosto estiver saindo artificial —
rode a skill **`rosto-real-hmzt`** ANTES de gerar a primeira foto. A F1 aprovada
vira a referência de identidade de todas as outras, inclusive das pretas: rosto
genérico na F1 contamina o produto inteiro, e refazer custa o lookbook todo.

```bash
python3 docs/shop-confeccao/scripts/ficha_rosto.py verificar <modelo>
```

Sem "✓ ficha completa", o rosto ainda é a média da base de treino.

### 4.1 Navegador e plano

Claude in Chrome, sessão do usuário logada no Magnific. Carregue as ferramentas
`mcp__claude-in-chrome__*` num único ToolSearch e abra
`https://www.magnific.com/app/ai-image-generator` numa aba própria.

| Campo | Valor |
|---|---|
| Modelo (peça com estampa) | **Seedream 5 Pro** — testado em 30/09: acertou o corte das letras, enquanto o Nano Banana 2 **redesenhou a arte** |
| Modelo (rosto e personagem) | **Nano Banana 2** — melhor em pele e rosto, e sem estampa para errar |
| Formato | **2:3 Portrait**, sempre |
| Resolução | **2K · Alto** (~1672×2508 no 2:3) |
| Modo ∞ | **desligado** — o Angelo optou por pagar em 02/10 |
| AI prompt | desligado · Quantidade 1 |
| Master final | `fidelity_lock.py` + **redução** para 1600×2400 |

**Por que 2:3 e não 4:5.** O master do site é 2:3, e a página de produto recorta
4:5 a partir dele cortando só topo e base. Gerar direto em 4:5 inverteria isso:
para chegar ao 2:3 da grade da `/use` seria preciso cortar as LATERAIS, perdendo
largura da peça — que é justamente o que a foto vende.

**Por que 2K muda o pós-processamento.** Em 1.5K a origem chegava com 1248 px e
o master de 1600 era uma AMPLIAÇÃO de 28% — medido num par real, isso derrubava
a energia de alta frequência de 2,27 para 1,95 e era o que lia como pele de
cera. Em 2K a origem chega maior que o master, então o caminho vira REDUÇÃO, que
é supersampling e devolve nitidez em vez de tirar. O `post_job.py` decide
sozinho pelo tamanho que chegou e só repõe textura quando amplia.

**Regra de ouro:** antes de clicar em Gerar, confira por JS que o botão diz
"Generate / Unlimited". Se mostrar créditos, NÃO gere. GPT 2.5, Cinematic e
resoluções acima de 1.5K (Seedream) / 1K (Nano Banana) cobram.

### 4.2 A aba precisa estar visível

Aba escondida congela os timers: o pipeline trava e o botão nem carrega. Se
`document.visibilityState` for `hidden` e nada anda, peça para trazer a janela à
frente. Confira em `list_connected_browsers` que é o Chrome logado.

### 4.3 Montar a página (a cada abertura ou recarga)

1. Cole `scripts/magnific_helpers.js` inteiro no `javascript_tool` → `await hmzt.init()`.
2. Formato `2:3 Portrait`, Seedream 5 Pro, `1.5K · Fast`, ∞ ligado.
3. `hmzt.mkInputs()` → `find` "hmzt jobs" → `file_upload` do `jobs.json` → `await hmztLoadJobs()`.
4. `find` "hmzt arts" → `file_upload` das artes **+ a F1 branca aprovada** → `hmztLoadArts('<colecao>')`.

Para recarregar os helpers: input "hmzt boot", `file_upload` do JS e
`(0,eval)(await input.files[0].text())`.

### 4.4 Ordem da fila

F1 branca primeiro (aprovada pelo usuário) → resto da branca → toda a preta.
**A F1 branca aprovada é a referência de identidade (`@img2`) de todas as fotos
seguintes, inclusive das pretas** — mesmo modelo nas duas cores. Cabides FX2/FX3
não levam identidade.

```js
const C='<colecao>', P=C+'/'; hmztPipeLog=[];
hmztQueueSteps([
 [C,[P+'frente_modelo01_escuro.png',P+'Pxx_F1_branca.png'],['Pxx-F2-branca','Pxx-F3-branca','Pxx-F4-branca']],
 [C,[P+'verso_modelo01_escuro.png', P+'Pxx_F1_branca.png'],['Pxx-FX1-branca']],
 [C,[P+'frente_modelo02_claro.png', P+'Pxx_F1_branca.png'],['Pxx-F1-preta','Pxx-F2-preta','Pxx-F3-preta','Pxx-F4-preta']],
 [C,[P+'verso_modelo02_claro.png',  P+'Pxx_F1_branca.png'],['Pxx-FX1-preta']]]);
```

Acompanhe com `JSON.stringify(hmztPipeLog)`. **Nunca** `await hmzt.sleep()` longo
no `javascript_tool` — dá timeout de 45 s; espere com `computer wait`.

### 4.5 Baixar

Uma criação por vez, por ID: abra `https://www.magnific.com/app/creation/<id>`,
espere ~6 s e clique o botão **PNG** por JS. O botão do visualizador baixa sempre
a primeira imagem se você só navegar entre cards. Tirar `&preview=true` dá 403.
IDs: abra o primeiro card e avance com ArrowRight lendo `location.pathname` —
não use `history.back()`, sai do app. Para casar criação com job:
`/app/api/projects/folders/<pasta>/files` traz `creation.metadata.prompt`.

### 4.6 Travar a fidelidade

```bash
python3 docs/shop-confeccao/scripts/post_job.py <colecao> Pxx <job_id> \
  [--arquivo ~/Downloads/magnific_x.png] [--box x0 y0 x1 y1] [--status aprovado]
```

Aceita só `magnific_*` baixado nos últimos 90 s, exige 2:3, guarda a tentativa em
`_tentativas/`, roda `fidelity_lock.py` (apaga a estampa da IA com inpaint, cola
a arte original com sombreamento), faz upscale para 1600×2400 e atualiza o
`jobs.json`.

Quando a trava erra:

| Sintoma | Resposta |
|---|---|
| estampa não encontrada, caixa absurda | meça numa grade de 50 px sobre o PNG cru e rode com `--box` |
| mancha cinza na camiseta branca | `--suave` (evite `--profundo` na branca) |
| arte de várias partes | `--suave --partes x0 y0 x1 y1 ...`, maior primeiro |
| a IA desenhou elementos extras | `--apagar x0 y0 x1 y1 ...` antes de colar |
| arte esparsa, ícones espalhados | `--auto` |
| braço ou mão sobre a estampa | **gere de novo** — a arte cobriria o braço |
| pose igual à F1 | gere de novo reforçando o ângulo no início do prompt |

### 4.7 Controle de qualidade (obrigatório, com Read na imagem)

Compare a foto com o PNG da arte e com o dossiê do produto. Reprova se:

- sobrou estampa da IA, ou há retângulo/mancha em volta da arte
- a arte está torta, fora do peito ou em tamanho absurdo
- a estampa da frente apareceu nas costas, ou vice-versa
- branca saiu creme/cinza, ou preta saiu cinza chumbo
- a modelagem não bate com a ficha do produto
- apareceu texto, logo ou etiqueta que não está na arte
- mãos, dedos ou rosto deformados
- (F2 em diante) a pessoa não é a mesma da F1 aprovada

Reprovada → gere de novo acrescentando ao fim do prompt uma frase curta
corrigindo o erro visto. Até 3 tentativas no Nano Banana, depois 2 no Seedream.
Após 5 → `status: revisar_manual` e siga para o próximo job.

**A F1 de cada cor vai para o usuário (SendUserFile) e espera OK** antes do resto
daquela cor: ela define rosto, luz e caimento de todas as outras.

## Fase 5 — PUBLICAR

```bash
python3 docs/shop-confeccao/scripts/publish_assets.py Pxx <colecao>
```

→ `lookbook/<colecao>/Pxx/site/` com WebP **1600×2400** e **1000×1500**, nomes
SEO (`{tipo}-{estampa}-{cor}-{tecido}-hmzt-{pose}-{nn}.webp`), `seo.json` e
`descricao.md`.

Esses são os masters 2:3 que o `hmzt.shop` consome: a grade da `/use` usa 2:3,
e a página de produto recorta 4:5 **só em cima e embaixo**. Por isso a peça tem
de caber nos **83% centrais da altura** — nada de gola no topo do quadro nem
barra encostando na base.

Entregue também:
- `magnific/<colecao>/Pxx/relatorio.md` — job × status × tentativas × modelo × observação
- contact sheet das aprovadas em `lookbook/<colecao>/Pxx/contato.jpg`
- a lista do que ficou em `revisar_manual`

---

## Regras permanentes

- **Fidelidade absoluta é o critério nº 1.** Nunca alterar a arte, nem "melhorar".
- Nunca copiar o rosto dos modelos do fornecedor. O perfil vive no prompt e a
  identidade vem da F1 aprovada.
- Nunca usar alegação de marketing do fornecedor em texto de venda.
- Plano free: se o Magnific pedir upgrade, crédito ou mostrar limite diário,
  **pare e avise**.
- O Chrome traduz a página sozinho e congela rótulos. `hmzt.init()` injeta
  `notranslate`; os helpers aceitam PT e EN. Confirmação real vem da rede:
  `start-tti-v2` com `force_credits:false` e `render/v4` com a tag `2:3`.
