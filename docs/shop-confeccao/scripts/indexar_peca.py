#!/usr/bin/env python3
"""
LOOKBOOK DIGITAL AI — indexação de peça nova.

A porta de entrada do pipeline. Antes disto, lançar uma estampa nova exigia
escrever `config.json` à mão, acertar o nome de quatro PNG e lembrar de criar a
entrada em `publicacao/`. Cada uma dessas três coisas falha em silêncio: o
gerador roda, gasta geração e só na foto pronta se descobre que a descrição da
arte estava vazia ou que frente e verso trocaram de lado.

Dois modos:

  indexar   recebe os PNG soltos, valida, renomeia para o padrão e monta o
            esqueleto de config.json e publicacao/<colecao>.json com os campos
            obrigatórios marcados como PENDENTE.

  verificar audita uma coleção contra o contrato inteiro e diz, campo a campo,
            o que falta para ela poder gerar.

O script RECUSA em vez de adivinhar. Arte com nome ambíguo, PNG sem
transparência ou descrição em branco param a indexação com a lista do que
corrigir — porque o custo de descobrir isso depois são dezenas de gerações e um
lookbook inteiro refeito.
"""
import argparse, json, os, re, shutil, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PENDENTE = 'PENDENTE'

# Os quatro arquivos do padrão. `verso` é opcional: há coleção só com frente.
ARTES = [
    ('frente_modelo01_escuro.png', 'frente da camiseta BRANCA (arte em tom escuro)', True),
    ('frente_modelo02_claro.png', 'frente da camiseta PRETA (arte em tom claro)', True),
    ('verso_modelo01_escuro.png', 'costas da camiseta BRANCA (arte em tom escuro)', False),
    ('verso_modelo02_claro.png', 'costas da camiseta PRETA (arte em tom claro)', False),
]


def slugify(s):
    s = re.sub(r'[^a-z0-9]+', '-', s.lower().strip())
    return re.sub(r'-+', '-', s).strip('-')


def erro(msg):
    print(f'✗ {msg}', file=sys.stderr)
    sys.exit(1)


def checar_png(caminho):
    """Problemas que IMPEDEM (lista 1) e que só avisam (lista 2).

    Impede: não ser PNG, não ter canal alfa, ou ter alfa todo opaco — fundo
    chapado vira um retângulo colado no peito quando a trava de fidelidade
    aplica a arte, que é o erro mais caro do pipeline.

    Avisa: resolução baixa. A arte é colada com cerca de 28 cm de largura num
    master de 1600 px, o que pede uns 900 px no MAIOR lado. Abaixo disso a
    estampa sai macia — fica feio, mas gera; quem decide é o usuário.
    """
    from PIL import Image
    problemas = []
    try:
        im = Image.open(caminho)
    except Exception as e:
        return [f'não abre como imagem ({e})']
    if im.format != 'PNG':
        problemas.append(f'é {im.format}, precisa ser PNG')
    if im.mode not in ('RGBA', 'LA', 'P'):
        problemas.append(f'modo {im.mode} não tem canal alfa')
    else:
        alfa = im.convert('RGBA').getchannel('A')
        menor, maior = alfa.getextrema()
        if menor == maior == 255:
            # Fundo chapado vira retângulo branco colado no peito pela trava
            # de fidelidade. É o erro mais caro do pipeline.
            problemas.append('alfa totalmente opaco — a arte precisa de fundo transparente')
    avisos = []
    if max(im.size) < 900:
        avisos.append(f'{im.size[0]}×{im.size[1]}: o maior lado tem menos de 900 px, a estampa sai macia no master 1600')
    return problemas, avisos


def modelo_config(nome, com_verso):
    """Esqueleto do config.json com os campos que o gerador de prompt consome."""
    lado = lambda onde: {
        'pos': PENDENTE + f' — onde a arte fica no {onde}, em inglês, com largura em cm no tamanho M',
        'desc_escura': PENDENTE + ' — descrição EN da arte em tom ESCURO (camiseta branca)',
        'desc_clara': PENDENTE + ' — descrição EN da arte em tom CLARO (camiseta preta)',
    }
    cfg = {'nome': nome, 'frente': lado('peito')}
    if com_verso:
        cfg['verso'] = lado('costas')
    cfg['spell'] = PENDENTE + ' — cada palavra da arte soletrada, ex.: Y-O-U-R I-M-A-G-E'
    cfg['uniao'] = ['front']
    return cfg


def modelo_publicacao(colecao, nome, produto):
    return {
        'estampa': nome.lower(),
        'estampa_nome': nome,
        'estampa_desc': PENDENTE + ' — uma frase descrevendo a estampa, em português',
        'marca': 'HMZT',
        'marca_slug': 'hmzt',
        'produtos': {
            produto: {
                'tipo': PENDENTE, 'nome_curto': PENDENTE, 'tecido_curto': PENDENTE,
                'tecido_alt': PENDENTE, 'tecido_title': PENDENTE,
                'meta': PENDENTE, 'curta': PENDENTE, 'longa': PENDENTE,
                'bullets': [], 'ficha': [], 'medidas': [], 'medidas_nota': PENDENTE,
                'cuidados': [], 'keywords': [],
            }
        },
    }


def rotulo_pendencia(caminho):
    """'x\\x00vazia' -> 'x está vazio'; o resto -> 'x ainda em PENDENTE'."""
    if '\x00' in caminho:
        return caminho.split('\x00')[0] + ' está vazio'
    return caminho + f' ainda em {PENDENTE}'


def pendentes(obj, prefixo=''):
    """Caminhos que ainda estão em PENDENTE ou vazios."""
    achados = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            achados += pendentes(v, f'{prefixo}.{k}' if prefixo else k)
    elif isinstance(obj, list):
        if not obj:
            achados.append(prefixo + '\x00vazia')
    elif isinstance(obj, str) and obj.startswith(PENDENTE):
        achados.append(prefixo)
    return achados


def cmd_indexar(a):
    colecao = slugify(a.colecao)
    destino = os.path.join(RAIZ, 'artes', colecao)
    if os.path.exists(destino) and not a.forcar:
        erro(f'artes/{colecao}/ já existe. Use --forcar para sobrescrever ou escolha outro nome.')

    # Casa cada arquivo recebido com o seu papel. Sem adivinhação por ordem:
    # trocar frente e verso só aparece na foto pronta, gerações depois.
    mapa = {}
    for par in a.arte:
        if '=' not in par:
            erro(f'--arte espera papel=caminho, recebi "{par}". '
                 f'Papéis: {", ".join(n[:-4] for n, _, _ in ARTES)}')
        papel, caminho = par.split('=', 1)
        caminho = os.path.expanduser(caminho)
        nome_arquivo = papel if papel.endswith('.png') else papel + '.png'
        if nome_arquivo not in [n for n, _, _ in ARTES]:
            erro(f'papel "{papel}" não existe. Use: {", ".join(n[:-4] for n, _, _ in ARTES)}')
        if not os.path.isfile(caminho):
            erro(f'não achei o arquivo {caminho}')
        mapa[nome_arquivo] = caminho

    faltando = [n for n, desc, obrig in ARTES if obrig and n not in mapa]
    if faltando:
        erro('faltam as artes obrigatórias: ' + ', '.join(faltando))

    problemas, leves = {}, {}
    for nome_arquivo, caminho in mapa.items():
        ps, avs = checar_png(caminho)
        if ps:
            problemas[nome_arquivo] = ps
        if avs:
            leves[nome_arquivo] = avs
    for n, avs in leves.items():
        for av in avs:
            print(f'  ! {n}: {av}')
    if problemas:
        for n, ps in problemas.items():
            print(f'✗ {n} ({mapa[n]}):', file=sys.stderr)
            for p in ps:
                print(f'    · {p}', file=sys.stderr)
        sys.exit(1)

    os.makedirs(os.path.join(destino, 'originais'), exist_ok=True)
    for nome_arquivo, caminho in sorted(mapa.items()):
        shutil.copy2(caminho, os.path.join(destino, nome_arquivo))
        shutil.copy2(caminho, os.path.join(destino, 'originais', nome_arquivo.replace('.png', '_original.png')))
        print(f'  arte   artes/{colecao}/{nome_arquivo}')

    com_verso = any(n.startswith('verso') for n in mapa)
    cfg_path = os.path.join(destino, 'config.json')
    if not os.path.exists(cfg_path) or a.forcar:
        json.dump(modelo_config(a.nome or colecao.replace('-', ' ').title(), com_verso),
                  open(cfg_path, 'w'), ensure_ascii=False, indent=1)
        print(f'  config artes/{colecao}/config.json')

    pub_path = os.path.join(RAIZ, 'publicacao', f'{colecao}.json')
    if not os.path.exists(pub_path) or a.forcar:
        json.dump(modelo_publicacao(colecao, a.nome or colecao.replace('-', ' ').title(), a.produto),
                  open(pub_path, 'w'), ensure_ascii=False, indent=1)
        print(f'  texto  publicacao/{colecao}.json')

    for n in ('descricao_modelo01.txt', 'descricao_modelo02.txt'):
        p = os.path.join(destino, n)
        if not os.path.exists(p):
            tom = 'ESCURA (camiseta branca)' if '01' in n else 'CLARA (camiseta preta)'
            open(p, 'w').write(
                f'{PENDENTE}: descreva em inglês a arte em versão {tom}, letra a letra.\n'
                'É o campo que mais segura a fidelidade da tipografia na geração.\n')
            print(f'  desc   artes/{colecao}/{n}')

    print(f'\n✓ {colecao} indexada com {len(mapa)} arte(s){"" if com_verso else " (só frente)"}.')
    print(f'\nPreencha os PENDENTE e rode:\n  python3 docs/shop-confeccao/scripts/indexar_peca.py verificar {colecao} --produto {a.produto}')
    return 0


def cmd_verificar(a):
    colecao = slugify(a.colecao)
    destino = os.path.join(RAIZ, 'artes', colecao)
    falhas, avisos = [], []

    if not os.path.isdir(destino):
        erro(f'artes/{colecao}/ não existe. Rode o modo "indexar" primeiro.')

    presentes = []
    for nome_arquivo, desc, obrig in ARTES:
        caminho = os.path.join(destino, nome_arquivo)
        if os.path.isfile(caminho):
            presentes.append(nome_arquivo)
            ps, avs = checar_png(caminho)
            for p in ps:
                falhas.append(f'artes/{colecao}/{nome_arquivo}: {p}')
            for av in avs:
                avisos.append(f'artes/{colecao}/{nome_arquivo}: {av}')
        elif obrig:
            falhas.append(f'artes/{colecao}/{nome_arquivo} não existe ({desc})')

    tem_verso = any(n.startswith('verso') for n in presentes)
    if not tem_verso:
        avisos.append('coleção sem arte de verso — gere com --sem-verso')

    cfg_path = os.path.join(destino, 'config.json')
    if not os.path.isfile(cfg_path):
        falhas.append(f'artes/{colecao}/config.json não existe')
    else:
        cfg = json.load(open(cfg_path))
        for campo in ('nome', 'frente', 'spell', 'uniao'):
            if campo not in cfg:
                falhas.append(f'config.json sem o campo "{campo}"')
        if tem_verso and 'verso' not in cfg:
            falhas.append('config.json sem "verso", mas a coleção tem arte de costas')
        if not tem_verso and 'verso' in cfg:
            falhas.append('config.json tem "verso" sem arte de costas correspondente')
        for p in pendentes(cfg):
            falhas.append(f'config.json: {rotulo_pendencia(p)}')

    for n in ('descricao_modelo01.txt', 'descricao_modelo02.txt'):
        p = os.path.join(destino, n)
        if not os.path.isfile(p):
            avisos.append(f'{n} não existe — é o campo que mais segura a fidelidade da tipografia')
        elif PENDENTE in open(p).read():
            avisos.append(f'{n} ainda em {PENDENTE}')

    pub_path = os.path.join(RAIZ, 'publicacao', f'{colecao}.json')
    if not os.path.isfile(pub_path):
        falhas.append(f'publicacao/{colecao}.json não existe')
    else:
        pub = json.load(open(pub_path))
        for p in pendentes(pub):
            falhas.append(f'publicacao/{colecao}.json: {rotulo_pendencia(p)}')
        if a.produto and a.produto not in pub.get('produtos', {}):
            falhas.append(f'publicacao/{colecao}.json sem a entrada do produto {a.produto}')

    if a.produto:
        if not [f for f in os.listdir(os.path.join(RAIZ, 'catalogo')) if f.startswith(a.produto)]:
            falhas.append(f'catalogo/ sem ficha do produto {a.produto}')
        if not [f for f in os.listdir(os.path.join(RAIZ, 'dossies')) if f.startswith(a.produto)]:
            avisos.append(f'dossies/ sem dossiê do produto {a.produto}')

    print(f'LOOKBOOK DIGITAL AI — {colecao}' + (f' × {a.produto}' if a.produto else ''))
    print(f'artes presentes: {len(presentes)}' + (' (frente e verso)' if tem_verso else ' (só frente)'))
    for av in avisos:
        print(f'  ! {av}')
    for f in falhas:
        print(f'  ✗ {f}')
    if falhas:
        print(f'\n{len(falhas)} pendência(s) — a coleção NÃO está pronta para gerar.')
        return 1
    print('\n✓ pronta para gerar.')
    return 0


def main():
    ap = argparse.ArgumentParser(description='LOOKBOOK DIGITAL AI — indexação de peça nova.')
    sub = ap.add_subparsers(dest='cmd', required=True)

    i = sub.add_parser('indexar', help='recebe os PNG, valida e monta o esqueleto')
    i.add_argument('colecao', help='nome da estampa (vira slug da pasta)')
    i.add_argument('--produto', required=True, help='código do produto, ex.: P02')
    i.add_argument('--arte', action='append', required=True, metavar='papel=caminho',
                   help='ex.: --arte frente_modelo01_escuro=~/Downloads/arte.png (repetir por arte)')
    i.add_argument('--nome', help='nome de exibição da estampa, ex.: "Videomaker REC"')
    i.add_argument('--forcar', action='store_true', help='sobrescreve coleção existente')
    i.set_defaults(fn=cmd_indexar)

    v = sub.add_parser('verificar', help='audita a coleção contra o contrato inteiro')
    v.add_argument('colecao')
    v.add_argument('--produto', help='código do produto, ex.: P02')
    v.set_defaults(fn=cmd_verificar)

    a = ap.parse_args()
    sys.exit(a.fn(a))


if __name__ == '__main__':
    main()
