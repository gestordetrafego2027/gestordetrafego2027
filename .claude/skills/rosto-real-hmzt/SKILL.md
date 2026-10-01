---
name: rosto-real-hmzt
description: Faz o rosto dos modelos HMZT parar de sair artificial nas gerações do LOOKBOOK DIGITAL AI. Monta a ficha de rosto de cada modelo (traços únicos, assimetrias, marcas), valida contra os adjetivos que puxam o resultado para a média da base de treino, e emite o trecho de prompt que substitui a descrição genérica. Use quando o usuário disser que os rostos ficaram artificiais, plásticos, de banco de imagem, todos iguais, ou pedir "melhorar os rostos", "ficha do modelo A", "/rosto-real-hmzt".
---

# Rosto real — modelos HMZT

## O diagnóstico

O rosto hoje vive em `scripts/gen_prompts.py`, no dicionário `MODELS`, e é um
catálogo de adjetivos:

> *"a Caucasian Brazilian man in his early 30s, athletic-lean build,
> medium-length dark brown wavy hair swept back with volume, short groomed
> beard with moustache, defined eyebrows, serious calm expression"*

Nenhuma palavra ali pertence a **uma** pessoa. "Defined eyebrows" e "serious
calm expression" descrevem metade dos homens do material de treino, então o
gerador faz a única coisa que pode: devolve a **média** daquela descrição. A
média de milhões de rostos é lisa, simétrica e sem história — é precisamente o
rosto plástico de banco de imagem.

O arquivo já pede `"natural skin with real pores, no retouched plastic look"`.
Não adianta: instrução negativa é fraca, e nenhuma delas dá ao gerador um traço
que ele possa usar para sair da média. **Realismo não se pede, se especifica.**

## As três alavancas, em ordem de força

1. **Foto de referência.** De longe a mais forte. Um rosto real na entrada
   resolve o que nenhuma descrição resolve. O pipeline já faz isso entre fotos
   (a F1 aprovada vira `@img2`), mas a F1 nasce de texto — então se o texto
   produz um rosto médio, ele se propaga para todas as outras.
2. **Assimetria e marca.** Rosto real é torto. Sobrancelha 2 mm mais alta,
   nariz levemente desviado, cicatriz na sobrancelha, falha na barba. É o que
   quebra a convergência para a média.
3. **Textura e idade.** Poros na zona T, subtom, dano solar, pés de galinha,
   entradas no cabelo. É o que o olho lê como "foto" e não como "render".

## Palavras que sabotam

`handsome`, `beautiful`, `perfect`, `flawless`, `symmetrical`, `smooth skin`,
`chiseled`, `airbrushed`, `glowing skin`, `porcelain`, `blemish-free`,
`supermodel`, `model-like`, `retouched`.

No material de treino essas palavras vêm coladas em foto retocada. Usá-las —
mesmo com a melhor intenção — pede de volta exatamente o rosto que se quer
evitar. O validador da ficha recusa todas.

---

## Fase 1 — PEDIR o rosto (o questionário)

Antes de mexer em prompt, levante o rosto **com o Angelo**. Crie a ficha:

```bash
python3 docs/shop-confeccao/scripts/ficha_rosto.py nova A --usado-em P01,P02,P03,P04,P07,P09
```

Depois conduza a conversa nesta ordem. **Uma pergunta por vez**, esperando a
resposta — questionário despejado de uma vez volta respondido pela metade.

**Antes de tudo:** *"Você tem uma foto de referência desse modelo? É o que mais
segura a identidade."* Se tiver, salve em
`docs/shop-confeccao/modelos/referencias/modelo-X.jpg` e aponte no campo
`referencia`. Se não tiver, siga pelo texto — mas avise que o rosto vai variar
mais entre as fotos.

| # | Pergunta | Campo |
|---|---|---|
| 1 | Que idade ele aparenta? Número, não faixa. | `idade` |
| 2 | Descreva a estrutura: formato do rosto, maxilar, maçãs, testa. | `estrutura` |
| 3 | **O que nesse rosto é torto ou desigual?** Sobrancelha mais alta, nariz desviado, um olho menor, sorriso que puxa mais para um lado. Preciso de pelo menos duas. | `assimetrias` |
| 4 | **Que marca ele tem?** Cicatriz, pinta, verruga, dente torto, orelha diferente. Pelo menos uma. | `marcas` |
| 5 | O que a idade já fez nele? Pés de galinha, sulco nasogeniano, grisalho nas têmporas, entradas. | `idade_visivel` |
| 6 | Como é a pele de perto? Poros, subtom, dano de sol, rosácea, oleosidade. | `pele` |
| 7 | O cabelo: linha, densidade, redemoinho, fios que não obedecem. | `cabelo` |
| 8 | A barba: formato, e onde ela falha. | `barba` |
| 9 | **O que o rosto dele faz quando NÃO está posando?** | `repouso` |

As perguntas 3, 4 e 5 são o coração. Se o Angelo responder "não sei" ou "é um
rosto normal", insista uma vez explicando por quê: **sem assimetria o gerador
devolve a média, e a média é o rosto plástico que ele quer evitar.** Se ainda
assim não houver, proponha traços concretos e peça que ele escolha — é melhor
escolher uma assimetria do que não ter nenhuma.

Escreva as respostas em **inglês** na ficha (é a língua do prompt), mesmo
conversando em português.

## Fase 2 — VALIDAR

```bash
python3 docs/shop-confeccao/scripts/ficha_rosto.py verificar A
```

Recusa adjetivo de média, exige 2 assimetrias, 1 marca e 1 sinal de idade, e
avisa quando não há foto de referência. Só siga com **"✓ ficha completa"**.

## Fase 3 — APLICAR no gerador

```bash
python3 docs/shop-confeccao/scripts/ficha_rosto.py prompt A
```

Imprime o trecho em inglês, na ordem que funciona: estrutura ancora, assimetrias
quebram a média logo em seguida, textura e idade fecham. Substitua com ele a
string do modelo em `MODELS` dentro de `scripts/gen_prompts.py` e regere os
prompts.

Ajuste também o bloco `STUDIO` quando o rosto for o problema: luz chapada de
frente é o que mais achata a pele. Luz lateral ou em três quartos revela poro e
sombra, e é o que faz a pele ler como pele.

## Fase 4 — JULGAR o resultado

Compare a geração nova com a antiga, lado a lado, e pergunte na ordem:

| Checagem | Reprova se… |
|---|---|
| **Assimetria** | o rosto saiu simétrico demais; as assimetrias da ficha não aparecem |
| **Marca** | a cicatriz/pinta da ficha sumiu |
| **Pele** | lisa como cera; sem poro visível na zona T; brilho uniforme |
| **Olhos** | íris perfeitas demais, cílios idênticos nos dois olhos, reflexo igual nos dois |
| **Dentes** | fileira perfeita e branca demais, todos do mesmo tamanho |
| **Cabelo** | capacete sem fio solto, linha do cabelo desenhada |
| **Idade** | aparenta 25 numa ficha de 34 — o gerador rejuvenesce por padrão |

Reprovou? Não escreva "more realistic". Volte à ficha, pegue o traço que não
apareceu e **mova-o para o começo** do trecho. O que vem primeiro pesa mais.

---

## Referências do Angelo

Ele tem material salvo no telefone sobre esta técnica. Quando anexar, leia,
extraia o que for operacional e **adicione às seções acima** — não crie um
apêndice solto. Se algo contradisser o que está aqui, o material dele ganha:
foi testado no caso real.

## Onde isto se encaixa

Faz parte do **LOOKBOOK DIGITAL AI**. A ficha de rosto é pré-requisito da fase 4
(gerar): com rosto genérico, a F1 aprovada vira referência de identidade de todas
as fotos seguintes e propaga o problema para o produto inteiro. Resolva o rosto
**antes** de aprovar a primeira F1 de uma peça nova.
