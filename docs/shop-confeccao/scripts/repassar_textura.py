#!/usr/bin/env python3
"""
Repasse de textura em fotos JÁ geradas.

O que isto NÃO faz, para não haver ilusão: não refaz a luz. A razão 3:1 que
entrou no prompt age na geração — numa foto pronta, chapada de frente, não
existe informação de sombra para recuperar. Simular com queima direcional
escureceria também o fundo cinza, e fundo irregular é defeito de catálogo.

O que faz, e por que funciona: a assinatura mensurável do aspecto plástico é
falta de energia de ALTA FREQUÊNCIA. Medido nas fotos atuais: 1,23, contra
1,5–4,0 de uma digital de verdade. O contraste global já está certo (55,4, na
faixa de 45–65) — o problema é só a escala fina.

Num plano de cabeça-à-coxa o rosto ocupa ~11% do quadro, uns 264 px. Nesse
tamanho o olho não procura poro: procura grão e micro-relevo. Devolver isso
resolve a maior parte do incômodo.

Para os cortes de detalhe, onde o poro DEVE aparecer individualmente, grão não
substitui poro — essas valem regerar com o prompt novo.

Nunca sobrescreve: escreve em pasta separada e mede antes e depois.
"""
import argparse, os, sys
from PIL import Image, ImageFilter
import numpy as np

EXTS = ('.png', '.jpg', '.jpeg', '.webp')


def alta_frequencia(im):
    """Energia de alta frequência: a assinatura que separa foto de render."""
    g = im.convert('L')
    a = np.asarray(g).astype(np.float32)
    b = np.asarray(g.filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)
    return float(np.abs(a - b).mean())


def repassar(im, clareza, grao, semente):
    """
    Dois passes, nesta ordem.

    1. Clareza: unsharp de raio GRANDE e quantidade baixa. Raio grande age no
       micro-relevo (dobra de tecido, volume da pele) sem criar o halo de borda
       que denuncia nitidez artificial.
    2. Grão monocromático fino. Monocromático, não colorido: ruído de cor lê
       como defeito de compressão; ruído de luminância lê como filme ou ISO.
    """
    if clareza > 0:
        im = im.filter(ImageFilter.UnsharpMask(radius=18, percent=int(clareza * 100), threshold=2))

    if grao > 0:
        a = np.asarray(im).astype(np.float32)
        rng = np.random.default_rng(semente)
        ruido = rng.normal(0.0, grao, a.shape[:2]).astype(np.float32)
        # O grão some nos brancos estourados e nos pretos fechados, como no
        # material real: aplicar uniforme sujaria o fundo de estúdio.
        # Soma ponderada explícita, não matmul. O `a @ pesos` num array de três
        # dimensões dispara divide-by-zero e overflow no numpy desta máquina —
        # o resultado sai certo, mas o aviso polui toda execução e esconde um
        # erro de verdade quando aparecer.
        lum = (a[:, :, 0] * 0.2126 + a[:, :, 1] * 0.7152 + a[:, :, 2] * 0.0722)
        peso = (1.0 - np.clip((lum - 170.0) / 85.0, 0, 1)) * np.clip(lum / 40.0, 0, 1)
        a = a + (ruido * peso)[:, :, None]
        im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

    return im


def uma(caminho, saida, clareza, grao, semente, quieto=False):
    im = Image.open(caminho).convert('RGB')
    antes = alta_frequencia(im)
    nova = repassar(im, clareza, grao, semente)
    depois = alta_frequencia(nova)
    os.makedirs(os.path.dirname(saida), exist_ok=True)
    nova.save(saida, quality=95) if saida.lower().endswith(('.jpg', '.jpeg', '.webp')) else nova.save(saida)
    if not quieto:
        print(f'  {os.path.basename(caminho):38} {antes:4.2f} → {depois:4.2f}')
    return antes, depois


def main():
    ap = argparse.ArgumentParser(description='Repassa micro-textura em fotos já geradas.')
    ap.add_argument('entrada', help='arquivo ou pasta')
    ap.add_argument('--saida', help='pasta de destino (padrão: <entrada>_repassadas)')
    # 0.10 é o padrão da casa, escolhido comparando as três versões lado a lado
    # num rosto. Em 0.22 o sulco do nariz e a sobrancelha ganham uma crocância
    # escura e a bochecha perde a redondeza — lê como foto tratada demais. Quem
    # faz o trabalho de verdade é o grão; a clareza só o acompanha.
    ap.add_argument('--clareza', type=float, default=0.10,
                    help='micro-contraste, 0 a 1 (padrão 0.10)')
    ap.add_argument('--grao', type=float, default=2.0,
                    help='desvio do grão em níveis (padrão 2.2)')
    ap.add_argument('--semente', type=int, default=7,
                    help='mesma semente = mesmo grão; troque para variar entre fotos')
    a = ap.parse_args()

    if os.path.isfile(a.entrada):
        saida = a.saida or os.path.splitext(a.entrada)[0] + '_repassada' + os.path.splitext(a.entrada)[1]
        uma(a.entrada, saida, a.clareza, a.grao, a.semente)
        print(f'\n✓ {saida}')
        return

    if not os.path.isdir(a.entrada):
        print(f'✗ {a.entrada} não existe', file=sys.stderr)
        sys.exit(1)

    destino = a.saida or a.entrada.rstrip('/') + '_repassadas'
    arquivos = []
    for raiz, dirs, nomes in os.walk(a.entrada):
        # Tentativas reprovadas não valem repasse.
        dirs[:] = [d for d in dirs if d != '_tentativas']
        arquivos += [os.path.join(raiz, n) for n in nomes if n.lower().endswith(EXTS)]

    if not arquivos:
        print(f'✗ nenhuma imagem em {a.entrada}', file=sys.stderr)
        sys.exit(1)

    print(f'{len(arquivos)} imagem(ns) → {destino}\n')
    antes_t = depois_t = 0.0
    for i, f in enumerate(sorted(arquivos)):
        rel = os.path.relpath(f, a.entrada)
        # Semente por arquivo: grão idêntico em todas as fotos lê como textura
        # colada, não como ruído de sensor.
        an, de = uma(f, os.path.join(destino, rel), a.clareza, a.grao, a.semente + i)
        antes_t += an
        depois_t += de

    n = len(arquivos)
    print(f'\n✓ alta frequência média: {antes_t/n:.2f} → {depois_t/n:.2f}  (digital real: 1,5–4,0)')


if __name__ == '__main__':
    main()
