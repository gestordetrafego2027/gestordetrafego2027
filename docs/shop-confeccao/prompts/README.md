# Prompts de lookbook — reconstrução das fotos do fornecedor

Um arquivo por produto, com **um prompt completo para cada foto** que aparece no print (P01–P09: fotos dos prints; P02 e P10–P29: galeria completa do site). Os prompts refazem enquadramento, pose, ângulo, luz, fundo, peça e styling de cada foto — e usam a ficha técnica para acertar caimento, costura, peso e movimento do tecido.

| Produto | Fotos | Arquivo |
|---|---|---|
| P01 Oversized Suedine 300g | 4 | [P01-prompts.md](P01-prompts.md) |
| P02 Oversized Drop Shoulder 185g | 8 | [P02-prompts.md](P02-prompts.md) |
| P03 Pima 165g | 4 | [P03-prompts.md](P03-prompts.md) |
| P04 Suedine 300g Regular | 5 | [P04-prompts.md](P04-prompts.md) |
| P05 Chinese Heavyweight 300g | 4 + variante oversized | [P05-prompts.md](P05-prompts.md) |
| P06 Chinese Cotton 160g | 4 | [P06-prompts.md](P06-prompts.md) |
| P07 Cotton Peruano 220g | 5 (inclui macro da malha) | [P07-prompts.md](P07-prompts.md) |
| P08 Egyptian 50/1 | 4 | [P08-prompts.md](P08-prompts.md) |
| P09 Suedine Light | 3 | [P09-prompts.md](P09-prompts.md) |
| P10 Oversized Básica Suedine 300GSM (100% al | 6 | [P10-prompts.md](P10-prompts.md) |
| P11 Custo Inteligente Malha Algodão/Poliéste | 6 | [P11-prompts.md](P11-prompts.md) |
| P12 Malhão Compact Algodão BCI 280g | 6 | [P12-prompts.md](P12-prompts.md) |
| P13 Estonada Regular 175g (Outras Cores) | 9 | [P13-prompts.md](P13-prompts.md) |
| P14 Estonada Regular 175g | 9 | [P14-prompts.md](P14-prompts.md) |
| P15 Estonada Neon Regular 175g | 11 | [P15-prompts.md](P15-prompts.md) |
| P16 Estonada Oversized 175g | 12 | [P16-prompts.md](P16-prompts.md) |
| P17 Estonada Oversized com Bolso 175g | 8 | [P17-prompts.md](P17-prompts.md) |
| P18 Rib Wide Texture 240g — canelado largo v | 10 | [P18-prompts.md](P18-prompts.md) |
| P19 Plissé Texture 240g — canelado vertical  | 8 | [P19-prompts.md](P19-prompts.md) |
| P20 Ripple Texture 240g — micro-ondulação ho | 16 | [P20-prompts.md](P20-prompts.md) |
| P21 Waffle Knit Texture 240g — faixas trança | 10 | [P21-prompts.md](P21-prompts.md) |
| P22 Piqué Texture 240g — micro-mesh | 9 | [P22-prompts.md](P22-prompts.md) |
| P23 Regata Masculina Canelada 2/1 Slim Fit ( | 12 | [P23-prompts.md](P23-prompts.md) |
| P24 Regata Estonada Canelada 2/1 Slim Fit (S | 9 | [P24-prompts.md](P24-prompts.md) |
| P25 Calça Moletom 3 Cabos 320g Felpada Confo | 9 | [P25-prompts.md](P25-prompts.md) |
| P26 Moletom Gola Careca 3 Cabos 320g Felpado | 15 | [P26-prompts.md](P26-prompts.md) |
| P27 Blusa Raglan Manga Longa 300g (fio impor | 11 | [P27-prompts.md](P27-prompts.md) |
| P28 Moletom Canguru Peluciado 260g com Capuz | 15 | [P28-prompts.md](P28-prompts.md) |
| P29 Blusa Manga Longa Gola Careca 300g (fio  | 12 | [P29-prompts.md](P29-prompts.md) |

Todos os prompts também estão na aba **Prompts Lookbook** da planilha `../Planejamento_Produto_Confeccao_HMZT.xlsx`.

## Como cada prompt é montado

Todos seguem a mesma ordem, para as fotos de um produto saírem consistentes:

1. **Estúdio** (igual em todas): fundo cinza claro contínuo, luz suave difusa, lente 85mm, f/8.
2. **Modelo**: um de 3 perfis fixos (abaixo).
3. **Peça**: tecido, gramatura, modelagem, gola, manga, barra e cor.
4. **Tecido e construção** (da ficha técnica): peso da malha, como cai e forma dobras, fosco ou brilho, gola, costuras, barras, fita ombro a ombro, anti-torção e como o tecido reage à pose.
5. **Caimento no corpo**: medidas do tamanho M (comprimento, largura, ombro, manga) no modelo de 1,84 m, para a IA acertar onde a peça termina.
6. **Styling**: calça ou bermuda igual à foto original.
7. **Pose e enquadramento** da foto específica.
8. **Trava final**: sem texto, sem logo, sem marca d'água, anatomia correta.

## Perfis de modelo

| Perfil | Produtos | Descrição |
|---|---|---|
| Modelo A | P01, P02, P03, P04, P07, P09 | Homem ~30 anos, cabelo castanho ondulado penteado para trás, barba curta, antebraços tatuados (opcional) |
| Modelo C | P05, P06, P08 | Homem ~35–40 anos, musculoso, cabelo preto curto, bigode e cavanhaque |
| Modelo D | Mockups P05 e P09 | Homem negro ~20 anos, alto e magro, cabelo raspado |
| Modelos próprios | P10, P11, P17, P25–P29 | Perfis descritos dentro de cada arquivo (outros modelos da Lunfe), sem copiar rosto |

**Direito de imagem:** os prompts descrevem um *perfil* de modelo, sem tentar copiar o rosto dos modelos do fornecedor. As fotos originais são da Lunfe, e a HMZT não tem direito sobre a imagem dessas pessoas. Para manter **o mesmo rosto em todas as fotos**, use um casting próprio da HMZT (foto de referência ou um primeiro resultado aprovado) como imagem de referência no gerador.

## O que foi adaptado e não copiado

- **Mockups do fornecedor** ("SEU LOGO AQUI / ESTAMPAMOS, E BORDAMOS"): viraram peça **lisa**, com a frente livre, para aplicar a arte HMZT depois. A IA embaralha texto, então a arte entra por composição (Photoshop/ferramenta de mockup), nunca pelo prompt.
- **Banners "Atacado"** (P02 e P09): são peças gráficas de propaganda, não lookbook — não entraram.
- **Selo ✦** no canto da foto principal: é ícone do site, não faz parte da foto.
- **Tatuagens**: descritas de forma genérica, sem desenhos ou letras dos originais.

## Configuração no Magnific (conta free)

- Modelo com **∞** (hoje Seedream 5 Pro) — o botão deve mostrar "Unlimited generations".
- **Desligar** o toggle "AI prompt" (senão ele reescreve o prompt).
- Formato **4:5** — o mesmo das fotos originais do site (1600×2000); a macro da malha do P07 é 1:1. Conferir o formato no card gerado — o rótulo do botão às vezes não atualiza.
- Colar o prompt **em inglês**, como está.

## Fluxo por produto

1. Gerar a **F1** (foto principal) até aprovar rosto, peça e luz.
2. Gerar F2, F3… usando a F1 como **imagem de referência**.
3. Nos produtos novos, cada foto já vem na cor e com a calça da foto original. Para outras cores: trocar só o termo de cor no prompt (lista em cada arquivo) e usar a foto aprovada como referência.
4. Mockups: gerar lisa → aplicar arte HMZT → revisar escala da arte com a tabela de medidas (M = 72 × 54 cm).
5. Conferir: cor fiel à cartela; gola, manga, barra e comprimento iguais à ficha; dobras compatíveis com o peso da malha; nenhuma letra ou logo inventado.
