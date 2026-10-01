#!/usr/bin/env python3
"""
Ficha de rosto dos modelos HMZT.

Por que existe: o rosto hoje é descrito por adjetivos de catálogo — "defined
eyebrows, serious calm expression". Nada ali é de uma pessoa específica, então
o gerador converge para a MÉDIA da base de treino, que é exatamente o rosto
plástico de banco de imagem. O remédio não é pedir "mais realista"; é dar ao
gerador traços que só uma pessoa tem.

A ficha guarda esses traços por modelo e emite o trecho em inglês que entra no
prompt. Três modos:

  nova       cria a ficha de um modelo com os campos em PENDENTE
  verificar  audita a ficha e recusa adjetivo de média
  prompt     imprime o trecho EN pronto para o gerador

O validador é a parte que mais importa. Ele RECUSA palavras como "handsome",
"perfect" e "flawless": são justamente as que puxam o resultado de volta para a
média, porque no material de treino elas aparecem colando em rosto retocado.
"""
import argparse, json, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PASTA = os.path.join(RAIZ, 'modelos')
PENDENTE = 'PENDENTE'

# Puxam o rosto para a média. Vêm do material de treino colado em foto retocada.
BANIDAS = [
    'handsome', 'beautiful', 'pretty', 'perfect', 'flawless', 'smooth skin',
    'symmetrical', 'ideal', 'model-like', 'chiseled', 'airbrushed', 'glowing skin',
    'porcelain', 'blemish-free', 'photoshop', 'retouched', 'supermodel',
]

CAMPOS = [
    ('idade', 'idade aparente, em número — "34", não "early 30s"'),
    ('estrutura', 'formato do rosto, maxilar, maçãs, testa, em inglês'),
    ('pele', 'textura real: poros, subtom, variação de melanina, marcas de sol'),
    ('cabelo', 'linha do cabelo, densidade, redemoinho, fios soltos'),
    ('barba', 'formato, falhas, densidade irregular — ou "clean-shaven" com a sombra'),
    ('repouso', 'o que o rosto faz quando NÃO está posando'),
]

LISTAS = [
    ('assimetrias', 'o que é torto, desigual, fora de esquadro — mínimo 2',
     'ex.: "left eyebrow sits about 2 mm higher than the right"', 2),
    ('marcas', 'cicatriz, pinta, verruga, dente torto, orelha diferente — mínimo 1',
     'ex.: "a 1 cm pale scar through the right eyebrow"', 1),
    ('idade_visivel', 'o que a idade fez: pés de galinha, sulco nasogeniano, grisalho',
     'ex.: "fine crow\'s feet that only show when he squints"', 1),
]


def erro(msg):
    print(f'✗ {msg}', file=sys.stderr)
    sys.exit(1)


def caminho(modelo):
    return os.path.join(PASTA, f'modelo-{modelo.upper()}.json')


def modelo_vazio(modelo, usado_em):
    f = {'modelo': modelo.upper(), 'usado_em': usado_em, 'referencia': None}
    for k, dica in CAMPOS:
        f[k] = f'{PENDENTE} — {dica}'
    for k, dica, exemplo, _ in LISTAS:
        f[k] = []
    return f


def achar_banidas(texto):
    t = texto.lower()
    return [b for b in BANIDAS if re.search(r'\b' + re.escape(b) + r'\b', t)]


def cmd_nova(a):
    os.makedirs(PASTA, exist_ok=True)
    p = caminho(a.modelo)
    if os.path.exists(p) and not a.forcar:
        erro(f'{os.path.relpath(p, RAIZ)} já existe. Use --forcar para recriar.')
    usado = a.usado_em.split(',') if a.usado_em else []
    json.dump(modelo_vazio(a.modelo, usado), open(p, 'w'), ensure_ascii=False, indent=1)
    print(f'✓ criada modelos/modelo-{a.modelo.upper()}.json')
    print('\nPreencha com o Angelo, campo a campo:')
    for k, dica in CAMPOS:
        print(f'  {k:14} {dica}')
    for k, dica, exemplo, minimo in LISTAS:
        print(f'  {k:14} {dica}\n  {"":14} {exemplo}')
    print(f'\nFoto de referência (o lance mais forte): salve em '
          f'modelos/referencias/modelo-{a.modelo.upper()}.jpg e aponte em "referencia".')
    return 0


def cmd_verificar(a):
    p = caminho(a.modelo)
    if not os.path.exists(p):
        erro(f'modelos/modelo-{a.modelo.upper()}.json não existe. Rode "nova" primeiro.')
    f = json.load(open(p))
    falhas, avisos = [], []

    for k, _ in CAMPOS:
        v = f.get(k, '')
        if not v or str(v).startswith(PENDENTE):
            falhas.append(f'{k} ainda em {PENDENTE}')
        else:
            for b in achar_banidas(str(v)):
                falhas.append(f'{k}: "{b}" puxa o rosto para a média — troque por um traço concreto')

    for k, dica, exemplo, minimo in LISTAS:
        itens = f.get(k) or []
        if len(itens) < minimo:
            falhas.append(f'{k}: {len(itens)} item(ns), o mínimo é {minimo} — {dica}')
        for it in itens:
            for b in achar_banidas(str(it)):
                falhas.append(f'{k}: "{b}" puxa o rosto para a média')

    ref = f.get('referencia')
    if not ref:
        avisos.append('sem foto de referência — é o que mais segura a identidade; '
                      'sem ela o rosto varia entre as fotos')
    elif not os.path.exists(os.path.join(RAIZ, ref)):
        falhas.append(f'referencia aponta para {ref}, que não existe')

    if not f.get('usado_em'):
        avisos.append('usado_em vazio — diga em quais produtos este modelo aparece')

    print(f'Ficha de rosto — modelo {f["modelo"]}')
    for av in avisos:
        print(f'  ! {av}')
    for fa in falhas:
        print(f'  ✗ {fa}')
    if falhas:
        print(f'\n{len(falhas)} pendência(s) — a ficha ainda produz rosto genérico.')
        return 1
    print('\n✓ ficha completa.')
    return 0


def cmd_prompt(a):
    p = caminho(a.modelo)
    if not os.path.exists(p):
        erro(f'modelos/modelo-{a.modelo.upper()}.json não existe.')
    f = json.load(open(p))

    # A ordem importa: estrutura primeiro ancora o rosto, e as assimetrias logo
    # depois quebram a média antes que o gerador a assuma. Pele e idade fecham
    # com a textura, que é o que o olho lê como "foto".
    partes = [
        f'a {f["idade"]}-year-old Brazilian man',
        f['estrutura'],
    ]
    partes += f.get('assimetrias', [])
    partes += f.get('marcas', [])
    partes += f.get('idade_visivel', [])
    partes += [f['pele'], f['cabelo'], f['barba'], f['repouso']]

    trecho = ', '.join(x.strip().rstrip('.,') for x in partes if x and not str(x).startswith(PENDENTE))
    print(trecho + '.')
    return 0


def main():
    ap = argparse.ArgumentParser(description='Ficha de rosto dos modelos HMZT.')
    sub = ap.add_subparsers(dest='cmd', required=True)

    n = sub.add_parser('nova')
    n.add_argument('modelo', help='letra do modelo, ex.: A')
    n.add_argument('--usado-em', help='produtos separados por vírgula, ex.: P01,P02')
    n.add_argument('--forcar', action='store_true')
    n.set_defaults(fn=cmd_nova)

    v = sub.add_parser('verificar')
    v.add_argument('modelo')
    v.set_defaults(fn=cmd_verificar)

    pr = sub.add_parser('prompt')
    pr.add_argument('modelo')
    pr.set_defaults(fn=cmd_prompt)

    a = ap.parse_args()
    sys.exit(a.fn(a))


if __name__ == '__main__':
    main()
