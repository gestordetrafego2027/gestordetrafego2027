"""Monta a fila de imagens do lookbook com estampa HMZT para um produto.

Uso:
    python3 build_magnific_jobs.py P02 --colecao nome-da-estampa

Lê as fotos (shots) do produto em gen_prompts.py / data/Pxx.json e gera, para cada
foto, DUAS versões:
    - camiseta BRANCA com a arte "modelo 01" (tom escuro)
    - camiseta PRETA  com a arte "modelo 02" (tom claro)
Cada versão usa a arte da FRENTE ou do VERSO conforme o ângulo da foto.

Saída:
    ../magnific/<colecao>/<Pxx>/jobs.json   (fila que o Claude executa no Magnific)
    ../magnific/<colecao>/<Pxx>/jobs.md     (mesma fila, legível)
"""
import argparse, json, os, sys, contextlib, io, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)                      # docs/shop-confeccao
sys.path.insert(0, HERE)
with contextlib.redirect_stdout(io.StringIO()):
    import gen_prompts as G                       # P, BEH, FIT, FIT_REG, MODELS, STUDIO, model_txt

ARTES = {
    # variante: (cor da camiseta EN, arquivo de arte frente, arquivo de arte verso, rótulo)
    'branca': ('clean optic white', 'frente_modelo01_escuro.png', 'verso_modelo01_escuro.png',
               'Camiseta BRANCA + estampa modelo 01 (tom escuro)'),
    'preta':  ('deep jet black', 'frente_modelo02_claro.png', 'verso_modelo02_claro.png',
               'Camiseta PRETA + estampa modelo 02 (tom claro)'),
}

FIDELITY = (
    "PRINTED ARTWORK — ABSOLUTE FIDELITY. The t-shirt carries a screen print that reproduces REFERENCE IMAGE 1 exactly: "
    "the same drawing, the same shapes, the same letters and words with identical spelling, typeface, weight, spacing, line breaks and proportions, "
    "and the same ink colors. Do not redraw, reinterpret, stylize, simplify, translate, mirror, rotate, crop, recolor or add anything to the artwork; "
    "treat it as a fixed graphic file printed on the fabric. The transparent background of the PNG is not printed — only the artwork itself is ink. "
    "The print follows the fabric naturally: it bends with the folds and drape of the knit, receives the same studio light and soft shadows as the shirt, "
    "with the matte, slightly raised texture of water-based screen-printing ink — no gloss, no sticker look, no halo, no border, no background panel or patch behind the artwork — the fabric color shows through everywhere except the ink. ")
PLACE = {
    'front': ("Placement: FRONT of the shirt, centered horizontally on the chest, top edge of the print about {gola} cm below the collar seam, "
              "print width about {lf} cm on a size M shirt. The back print is not visible in this view. "),
    'back':  ("Placement: BACK of the shirt, centered horizontally on the upper back, top edge of the print about {golav} cm below the collar seam, "
              "print width about {lv} cm on a size M shirt. The front print is not visible in this view. "),
    'front_left': ("Placement: small chest badge on the wearer's LEFT chest — it appears on the RIGHT side of the image when the model faces the camera. "
                   "Print width about {lf} cm, top edge about {gola} cm below the collar seam, horizontally centered over the left chest, midway between the center front and the armhole. "
                   "It is a small print: it must stay small and must not be enlarged or moved to the center. The back of the shirt is plain. "),
    'front_left_detail': ("Placement: small chest badge on the wearer's LEFT chest (RIGHT side of the image), width about {lf} cm, top edge about {gola} cm below the collar seam. "
                          "This is a close crop: if the badge falls inside the frame it must match reference image 1 exactly; if it falls outside, do not invent it elsewhere. "),
    'front_detail': ("Placement: FRONT of the shirt, centered on the chest, top edge about {gola} cm below the collar seam. This is a close crop: "
                     "only the part of the print that falls inside the frame is visible, and that part must match the corresponding area of reference image 1 exactly. "),
}
# ---- personagens salvos no Magnific -------------------------------------
#
# O Angelo salvou os três modelos como personagens nomeados. Chamar o handle
# vale mais que descrever: a identidade passa a viver DENTRO do Magnific, em vez
# de depender de anexar a F1 aprovada a cada geração.
#
# Isso derruba o problema de arranque que o pipeline tinha: antes, a primeira
# foto nascia só de texto (logo, rosto médio) e virava a referência de todas as
# outras — o defeito do começo contaminava o produto inteiro. Com handle, a
# foto nº 1 já sai com a identidade certa.
#
# O mapa de slot é o do Angelo. Note que ele NÃO bate com o número dentro do
# handle: o slot 01 usa "@modelo-03-…". Está certo, foi ele quem disse.
SLOT_POR_MODELO = {'A': '01', 'C': '02', 'D': '03'}

# Oito produtos usam model='custom', com a descrição do modelo escrita dentro da
# própria ficha. Eles também precisam de um personagem, senão geram rosto médio.
# Mapeados pela descrição que já tinham:
SLOT_POR_PRODUTO = {
    'P10': '01', 'P11': '01', 'P27': '01', 'P28': '01', 'P29': '01',
    'P17': '02', 'P26': '02',
    'P25': None,  # enquadrado do peito para baixo: não tem rosto na foto
}


# ---- distribuição dos modelos pelo acervo -------------------------------
#
# O Angelo quer o modelo 03 na maioria dos ensaios, o 02 menos e o 01 menos
# ainda. Os pesos abaixo são a proporção; mexer neles muda a divisão.
PESOS = {'03': 5, '02': 3, '01': 1}

# A escolha é por ENSAIO (coleção × produto), nunca por foto. Identidade tem de
# ser estável dentro de um produto: três homens diferentes vestindo a mesma
# camiseta na mesma página é defeito de catálogo, não variedade.
#
# E é determinística, por CRC do nome do ensaio: rodar o gerador de novo não
# pode reatribuir modelo, senão as fotos já aprovadas ficariam órfãs da
# identidade com que nasceram.
def _todos_os_ensaios():
    """Os ensaios que existem hoje: uma pasta por coleção × produto."""
    base = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'magnific')
    pares = []
    if os.path.isdir(base):
        for col in sorted(os.listdir(base)):
            d = os.path.join(base, col)
            if os.path.isdir(d):
                pares += [(col, prod) for prod in sorted(os.listdir(d))
                          if os.path.isdir(os.path.join(d, prod))]
    return pares


def _mapa_de_ensaios():
    """
    Distribui os modelos pelos ensaios respeitando os pesos, mas garantindo ao
    menos um ensaio para cada modelo.

    O sorteio puro por peso deixava o modelo 01 em ZERO: com nove ensaios e peso
    1 em 9, ele simplesmente não caía. "Menos ainda" não é "nunca" — um modelo
    que nunca aparece não está sub-representado, está ausente. Então, depois do
    sorteio, quem ficou sem ensaio toma um emprestado de quem está mais acima do
    que o peso pedia.
    """
    pares = _todos_os_ensaios()
    urna = sorted(s for s, n in PESOS.items() for _ in range(n))
    mapa = {par: urna[zlib.crc32(f'{par[0]}/{par[1]}'.encode()) % len(urna)] for par in pares}

    if len(pares) >= len(PESOS):
        for slot in PESOS:
            if slot in mapa.values():
                continue
            # O doador é quem tem mais ensaios acima da sua fatia proporcional.
            total = sum(PESOS.values())
            excesso = lambda s: sum(1 for v in mapa.values() if v == s) - PESOS[s] / total * len(pares)
            doador = max((s for s in PESOS if s != slot), key=excesso)
            # Cede o ensaio de nome mais alto, para a escolha seguir estável.
            alvo = max(par for par, v in mapa.items() if v == doador)
            mapa[alvo] = slot
    return mapa


_MAPA = None


def slot_do_ensaio(colecao, pk):
    global _MAPA
    if _MAPA is None:
        _MAPA = _mapa_de_ensaios()
    if (colecao, pk) in _MAPA:
        return _MAPA[(colecao, pk)]
    urna = sorted(s for s, n in PESOS.items() for _ in range(n))
    return urna[zlib.crc32(f'{colecao}/{pk}'.encode()) % len(urna)]


sem_handle = set()


def handle_do_modelo(mk, pk=None, colecao=None):
    """Handle do personagem, ou '' quando não houver um confirmado."""
    if pk in SLOT_POR_PRODUTO and SLOT_POR_PRODUTO[pk] is None:
        return ''            # produto sem rosto no enquadramento
    if colecao:
        slot = slot_do_ensaio(colecao, pk)
    elif pk in SLOT_POR_PRODUTO:
        slot = SLOT_POR_PRODUTO[pk]
    else:
        slot = SLOT_POR_MODELO.get(mk)
    if not slot:
        return ''
    ficha = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'modelos', f'modelo-{slot}.json')
    if not os.path.exists(ficha):
        return ''
    h = json.load(open(ficha)).get('magnific', '')
    # Handle com "(confirmar)" dentro é rascunho: usar devolveria rosto errado
    # em silêncio, que é o pior resultado possível.
    return h if h.startswith('@') and '(' not in h else ''


REALISM = ('REALISM: a real human photographed, not a retouched or AI-perfect face — keep the same person but show natural, subtle signs of life: fine expression lines at the outer corners of the eyes, faint forehead lines, soft nasolabial folds when the face moves, visible skin pores and fine texture, slight natural unevenness of skin tone, a few tiny natural blemishes, individual beard hairs and slightly uneven beard edge, natural lip texture, a few flyaway hairs. No plastic skin, no airbrushing, no over-sharpening, nothing exaggerated or aged. ')
IDENTITY_OTHER = ("@img2 is the approved photo of this same model: keep exactly the same person (face, hair, beard, skin tone, build), the same studio background and lighting — but in this photo the t-shirt is the {cor} version described below with its own print from @img1, and the pose, head angle and gaze are completely different from @img2. ")
IDENTITY = ("REFERENCE IMAGE 2 is the approved photo of this same model wearing this same shirt: keep the same person (face, hair, beard, skin tone, build), "
            "the same shirt cut, fabric and color, the same studio background and lighting. Change only the pose and framing described below. ")
MASTER = ("Vertical 2:3 master frame: the site crops this image to 4:5 and 1:1 by trimming the top and bottom only, never the sides — keep the subject horizontally centered, "
          "leave generous empty backdrop above the head and extend the framing a little further down than described, so nothing important sits near the top or bottom edges. ")
CLOSE_ART = ("CRITICAL: the only text or graphics allowed anywhere in the image are the ones in reference image 1, reproduced exactly. "
             "No other text, letters, numbers, logos, labels, brand tags or watermarks. Correct anatomy, five fingers per hand.")

def art_side(name, pose):
    t = (name + ' ' + pose).lower()
    if 'no person visible' in t or 'macro' in name.lower():
        return None
    if 'back view' in t or 'costas' in name.lower() or 'verso' in name.lower():
        return 'back'
    if 'detail crop' in t or 'close crop' in t or 'close-up' in t or 'detalhe' in name.lower():
        return 'front_detail'
    return 'front'

def extra_shots(pk, shots):
    """Garante que a coleção tenha costas no modelo e flat lay de frente e verso."""
    names = ' '.join(s[0] + ' ' + s[2] for s in shots).lower()
    extra = []
    if 'back view' not in names:
        extra.append(("FX1 — Costas (estampa do verso)", "Foto nova para mostrar a estampa do verso",
                      "Back view, standing straight with arms relaxed at the sides, head facing forward, shoulders square to the camera so the whole back panel "
                      "is flat and fully visible. Framing from the head to upper thigh.", "4:5"))
    HANGER = ("GARMENT ONLY, no person: the t-shirt hangs on a natural light-oak wooden hanger with a slim brushed-steel hook, suspended from a minimal matte-black "
              "clothing rail in front of the seamless light cool-gray wall. Straight-on eye-level shot, the shirt perfectly centered and symmetrical, {lado}; the shoulders "
              "rest on the hanger arms, the body and sleeves drape naturally under their own weight with soft vertical folds, the hem hangs freely and straight, "
              "a soft natural shadow falls on the wall behind. Clean premium boutique look, no mannequin, no other clothes, no tags. The whole shirt and hanger fit the frame with even margins.")
    extra.append(("FX2 — Cabide frente", "Foto nova de produto (sem modelo) — cabide, pedido do Angelo",
                  HANGER.format(lado="FRONT facing the camera"), "2:3"))
    extra.append(("FX3 — Cabide verso", "Foto nova de produto (sem modelo) — cabide (padrão aprovado para todos os produtos)",
                  HANGER.format(lado="BACK facing the camera"), "2:3"))
    return extra

def build(pk, colecao, lf, lv, gola, golav, posicao='centro', verso=True):
    if pk not in G.P:
        sys.exit(f'{pk} não encontrado em gen_prompts / data/')
    d = G.P[pk]
    mk = d['model']
    shots = [tuple(s[:4]) for s in d['shots']] + list(d.get('extra_variants', []))
    shots = [s for s in shots if 'macro' not in s[0].lower()]
    extras = extra_shots(pk, shots)
    if not verso:
        extras = [e for e in extras if 'verso' not in e[0].lower() and 'costas' not in e[0].lower()]
        shots = [s for s in shots if art_side(s[0], s[2]) != 'back']
    shots += extras
    # biblioteca de poses: cada produto recebe um conjunto próprio (sem poses.json manual)
    pj0 = os.path.join(ROOT, 'magnific', colecao, pk, 'poses.json')
    lib_path = os.path.join(HERE, 'pose_library.json')
    if not os.path.exists(pj0) and os.path.exists(lib_path):
        lib = json.load(open(lib_path))
        pool = lib['poses']
        import zlib
        n = zlib.crc32((colecao + pk).encode()) % 997
        start, step = (n * 5) % len(pool), (3 if len(pool) % 3 else 5)
        model_shots = [s for s in shots if not s[2].startswith('GARMENT ONLY')]
        new, k = [], 0
        for s in shots:
            if s[2].startswith('GARMENT ONLY'):
                new.append(s); continue
            if 'detail' in s[2].lower() or 'Detalhe' in s[0] or s[2].lower().startswith('back view'):
                new.append(s); continue          # detalhe e costas são específicos: mantém
            p = pool[(start + k * step) % len(pool)]; k += 1
            code = s[0].split(' —')[0]
            new.append((f"{code} — {p[0]}", s[1] + ' · pose da biblioteca (variação por produto)', p[1], s[3]))
        shots = new
    # variação de poses por coleção (magnific/<colecao>/<Pxx>/poses.json) — evita fotos repetidas
    pj = os.path.join(ROOT, 'magnific', colecao, pk, 'poses.json')
    if os.path.exists(pj):
        ov = json.load(open(pj))
        new = []
        for s in shots:
            code = s[0].split(' —')[0]
            if code in ov and isinstance(ov[code], list):
                new.append((ov[code][0], s[1] + ' · pose alterada para variar ângulo e olhar', ov[code][1], s[3]))
            else:
                new.append(s)
        shots = new
    art_dir = os.path.join(ROOT, 'artes', colecao)
    out_dir = os.path.join(ROOT, 'magnific', colecao, pk)
    os.makedirs(out_dir, exist_ok=True)
    fit = G.FIT.get(pk, G.FIT_REG)
    cfg_path = os.path.join(art_dir, 'config.json')
    cfg = json.load(open(cfg_path)) if os.path.exists(cfg_path) else None
    # cor "branca" real da base: só off-white no catálogo → descreve como off-white
    colors = G.P[pk].get('colors', '')
    white = 'clean optic white' if ('BCO' in colors or 'branco' in colors.lower()) else 'natural off-white (very light warm white)'
    jobs = []
    f1_branca = None
    for var, (cor, af, av, rot) in ARTES.items():
        if var == 'branca':
            cor = white
            first = None
        else:
            first = f1_branca
        for i, (name, origem, pose, ar) in enumerate(shots):
            side = art_side(name, pose)
            flat = pose.startswith('GARMENT ONLY')
            if flat:
                side = 'back' if 'BACK facing' in pose or 'BACK side up' in pose else 'front'
            pose = pose.replace(', ready for a print to be composited later', '').replace('ready for a print to be composited later', '')
            garment = d['garment'].replace('{COR}', cor)
            bottom = d.get('bottom_override', {}).get(name, d['bottom'])
            refs = []
            if side:
                refs.append(os.path.join(art_dir, av if side == 'back' else af))
            ident_ref = first if first is not None else (f1_branca if var == 'preta' else None)
            use_identity = ident_ref is not None and not flat
            if use_identity:
                refs.append(ident_ref)
            key = side
            if side and side.startswith('front') and posicao == 'peito-esquerdo':
                key = 'front_left_detail' if side == 'front_detail' else 'front_left'
            place = PLACE[key].format(lf=lf, lv=lv, gola=gola, golav=golav) if side else ''
            cdesc = ''
            if cfg and side:
                lado = cfg['verso'] if side == 'back' else cfg['frente']
                other = cfg['frente'] if side == 'back' else cfg['verso']
                vis = ('The front print is not visible in this view. ' if side == 'back'
                       else ('The back print is not visible in this view. ' if other else 'The back of the shirt is plain. '))
                crop = (" This is a close crop: only the part of the print inside the frame is visible and it must match @img1 exactly; do not invent it elsewhere."
                        if side == 'front_detail' else '')
                place = f"Placement ({'BACK' if side == 'back' else 'FRONT'} of the shirt): {lado['pos']}. Keep this exact position and scale. {vis}{crop} "
                cdesc = f"The artwork (@img1) is {lado['desc_escura' if var == 'branca' else 'desc_clara']}. Exact spelling: {cfg['spell']}. "

            parts = [G.STUDIO]
            if use_identity:
                parts.append(IDENTITY if var == 'branca' else IDENTITY_OTHER.format(cor='DEEP JET BLACK'))
            if flat:
                parts.append(f"Product photo of {garment}. {G.BEH.get(pk,'')} {pose}")
            else:
                parts.append(REALISM)
                parts.append(f"The model is {G.model_txt(mk)}. He wears {garment}, tucked out, paired with {bottom}. {G.BEH.get(pk,'')} {fit}{pose}")
            if side:
                dfile = os.path.join(art_dir, 'descricao_' + ('modelo01' if var == 'branca' else 'modelo02') + '.txt')
                desc = cdesc or ((open(dfile).read().strip() + ' ') if os.path.exists(dfile) else '')
                parts.append(FIDELITY + desc + place)
            parts.append(MASTER)
            parts.append(CLOSE_ART if side else G.CLOSE)
            prompt = ' '.join(p.strip() for p in parts if p)

            # A POSE vai também para a FRENTE do prompt.
            #
            # O prompt tem ~940 palavras, e a pose caía depois do bloco inteiro
            # de tecido, construção e medidas — perto do fim. Nessa posição ela
            # quase não pesa, e o gerador devolve a pose média dele: foi daí que
            # veio a repetição de peça na primeira rodada. A fila está certa
            # (medi: zero pose repetida dentro da mesma cor); quem repetia era o
            # modelo, não o jobs.json.
            #
            # Repetir a pose no começo custa ~15 palavras e lhe dá o peso que a
            # posição confere. Fica curta de propósito: a versão longa continua
            # no lugar de sempre, com o detalhe de mão, olhar e enquadramento.
            if pose and not flat:
                resumo = pose.strip().split('.')[0].strip()
                if resumo:
                    prompt = f'POSE: {resumo}. ' + prompt

            # O handle abre o prompt, antes até da pose: é quem é a pessoa.
            # Foto de peça sem modelo (cabide, macro de tecido) não leva.
            h = '' if flat else handle_do_modelo(mk, pk, colecao)
            if h:
                prompt = f'{h} ' + prompt
            elif not flat and pk not in SLOT_POR_PRODUTO:
                # Avisa alto. Job com modelo e sem personagem gera rosto médio —
                # e o defeito só aparece na foto pronta, com a geração gasta.
                sem_handle.add((pk, mk))
            if side == 'front' and 'GARMENT ONLY' not in prompt:   # pose nunca pode cobrir a estampa (a trava cola por cima do braço)
                prompt += ' Both hands and forearms stay away from the chest and belly, so the ENTIRE print is fully visible and unobstructed; nothing covers any part of the print.'
            # o Magnific nomeia as referências anexadas como @img1, @img2… na ordem de anexo
            for a, b in (('REFERENCE IMAGE 1', '@img1'), ('reference image 1', '@img1'), ('REFERENCE IMAGE 2', '@img2'), ('reference image 2', '@img2')):
                prompt = prompt.replace(a, b)
            fname = f"{pk}_{name.split(' —')[0]}_{var}.png"
            out = os.path.join(ROOT, 'lookbook', colecao, pk, var, fname)
            ar = '2:3'
            job = dict(id=f"{pk}-{name.split(' —')[0]}-{var}", produto=pk, foto=name, origem=origem, variante=var, rotulo=rot,
                       lado_estampa=side or 'sem estampa', formato=ar, referencias=refs,
                       referencia_identidade=bool(use_identity), prompt=prompt, saida=out, status='pendente', tentativas=0)
            jobs.append(job)
            if var == 'branca' and first is None and not flat:
                first = out   # a F1 branca aprovada vira referência de identidade de TODAS as fotos (branca e preta)
                f1_branca = out
    # a preta usa a F1 branca como identidade em todas as fotos de modelo

    # preserva o progresso de uma fila já existente (status, tentativas, arquivo, observações)
    old = os.path.join(out_dir, 'jobs.json')
    if os.path.exists(old):
        prev = {x['id']: x for x in json.load(open(old))['jobs']}
        for jb in jobs:
            p = prev.get(jb['id'])
            if p:
                for k in ('status', 'tentativas', 'arquivo', 'observacoes', 'modelo_usado'):
                    if k in p:
                        jb[k] = p[k]
    magnific = dict(modelo_principal='Seedream 5 Pro', resolucao='maior opção ∞ (download cheio 1365×2048)', modelo_reserva='Google Nano Banana 2', resolucao_reserva='1K · High (só ∞) + upscale para ≥1000×1500',
                    formato='2:3 (master; o site recorta em cima e embaixo)', modo_ilimitado='∞ ligado', aviso_ia='desligado', quantidade=1,
                    regra='Só clicar em Gerar se o botão mostrar "Gerações ilimitadas". Se mostrar créditos, NÃO gerar: reduzir resolução ou trocar para o modelo reserva.')
    json.dump(dict(produto=pk, colecao=colecao, total=len(jobs), magnific=magnific, jobs=jobs), open(os.path.join(out_dir, 'jobs.json'), 'w'), ensure_ascii=False, indent=1)
    with open(os.path.join(out_dir, 'jobs.md'), 'w') as f:
        f.write(f"# Fila Magnific — {pk} · estampa `{colecao}`\n\n{len(jobs)} imagens ({len(jobs)//2} fotos × 2 versões).\n\n")
        for j in jobs:
            refs = '\n'.join(f"  - ref {k+1}: `{os.path.relpath(r, ROOT)}`" for k, r in enumerate(j['referencias'])) or '  - (sem referência)'
            f.write(f"## {j['id']}\n\n- {j['rotulo']} · estampa: **{j['lado_estampa']}** · formato {j['formato']}\n- Origem: {j['origem']}\n- Referências:\n{refs}\n- Saída: `{os.path.relpath(j['saida'], ROOT)}`\n\n```text\n{j['prompt']}\n```\n\n")
    print(f"{len(jobs)} jobs → {os.path.relpath(out_dir, ROOT)}/jobs.json")


def avisar_sem_handle():
    if sem_handle:
        print('\n!  jobs sem personagem do Magnific (vão gerar rosto médio):')
        for pk, mk in sorted(sem_handle):
            print(f'     {pk} (model={mk}) — defina o slot em SLOT_POR_PRODUTO')

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('produto')
    ap.add_argument('--colecao', required=True, help='nome da pasta em docs/shop-confeccao/artes/')
    ap.add_argument('--largura-frente', type=float, default=28, help='cm no tamanho M')
    ap.add_argument('--largura-verso', type=float, default=30, help='cm no tamanho M')
    ap.add_argument('--gola-frente', type=float, default=8, help='cm da gola ao topo da estampa (frente)')
    ap.add_argument('--gola-verso', type=float, default=10, help='cm da gola ao topo da estampa (verso)')
    ap.add_argument('--posicao', choices=['centro', 'peito-esquerdo'], default='centro')
    ap.add_argument('--sem-verso', action='store_true', help='coleção só com arte de frente: remove fotos de costas')
    a = ap.parse_args()
    build(a.produto.upper(), a.colecao, a.largura_frente, a.largura_verso, a.gola_frente, a.gola_verso, a.posicao, not a.sem_verso)
