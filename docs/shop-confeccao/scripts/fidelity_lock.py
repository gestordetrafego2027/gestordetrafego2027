"""Trava de fidelidade: troca a estampa gerada pela IA pela arte original (PNG), mantendo luz e dobras.

Uso:
  python3 fidelity_lock.py foto.png arte.png saida.png --cor branca|preta [--box x0 y0 x1 y1] [--debug]

1. Acha a estampa gerada (área escura na camiseta branca / clara na preta) dentro da região do peito
   ou usa a caixa --box informada (px da foto).
2. Apaga a estampa gerada preenchendo com o tecido ao redor (inpaint simples por difusão).
3. Encaixa a arte original na mesma altura/centro da estampa gerada, mantendo a proporção da ARTE.
4. Aplica o sombreamento do tecido (luz e dobras) sobre a tinta: multiplicação na camiseta branca,
   "tinta clara sobre tecido escuro" com a luminância do tecido na preta; leve desfoque e grão.
"""
import argparse
from PIL import Image, ImageFilter, ImageChops, ImageOps, ImageStat

def find_print(img, cor, region, uniao=False):
    """Maior mancha de tinta (escura na branca / clara na preta) dentro da região, por componentes conexos."""
    x0, y0, x1, y1 = region
    g = img.convert('L').crop(region)
    f = 4                                   # trabalha em 1/4 da resolução
    sw, sh = g.width // f, g.height // f
    g = g.resize((sw, sh), Image.BILINEAR)
    px = g.load()
    ink = (lambda v: v < 95) if cor == "branca" else (lambda v: v > 170)
    seen = [[False] * sw for _ in range(sh)]
    comps = []
    for yy in range(sh):
        for xx in range(sw):
            if seen[yy][xx] or not ink(px[xx, yy]):
                continue
            stack = [(xx, yy)]; seen[yy][xx] = True; pts = 0
            bx0, by0, bx1, by1 = xx, yy, xx, yy
            while stack:
                cx, cy = stack.pop(); pts += 1
                bx0, by0, bx1, by1 = min(bx0, cx), min(by0, cy), max(bx1, cx), max(by1, cy)
                for nx in range(cx - 2, cx + 3):          # vizinhança larga junta as letras do mesmo selo
                    for ny in range(cy - 2, cy + 3):
                        if 0 <= nx < sw and 0 <= ny < sh and not seen[ny][nx] and ink(px[nx, ny]):
                            seen[ny][nx] = True; stack.append((nx, ny))
            comps.append((pts, bx0, by0, bx1, by1))
    # descarta manchas que encostam na borda da região (braço, barba, cabelo entram pela borda; a estampa fica no meio)
    comps = [c for c in comps if c[0] >= 6 and c[1] > 1 and c[2] > 1 and c[3] < sw - 2 and c[4] < sh - 2]
    if not comps:
        raise SystemExit('estampa não encontrada — use --box')
    comps.sort(reverse=True)
    if uniao:
        big = [c for c in comps if c[0] >= max(6, comps[0][0] * 0.02)]
        bx0 = min(c[1] for c in big); by0 = min(c[2] for c in big); bx1 = max(c[3] for c in big); by1 = max(c[4] for c in big)
        f = 4
        return (x0 + bx0 * f, y0 + by0 * f, x0 + (bx1 + 1) * f, y0 + (by1 + 1) * f)
    _, bx0, by0, bx1, by1 = comps[0]
    gap = 8                                  # ~32 px na foto: junta letras e barra do mesmo selo
    changed = True
    while changed:
        changed = False
        gap = max(8, (by1 - by0) // 4)       # proporcional ao tamanho: junta a barra DIRECTOR às letras
        for c in comps[1:]:
            _, cx0, cy0, cx1, cy1 = c
            if cx0 <= bx1 + gap and cx1 >= bx0 - gap and cy0 <= by1 + gap and cy1 >= by0 - gap:
                if (cx0, cy0, cx1, cy1) != (min(bx0, cx0), min(by0, cy0), max(bx1, cx1), max(by1, cy1)) or True:
                    nb = (min(bx0, cx0), min(by0, cy0), max(bx1, cx1), max(by1, cy1))
                    if nb != (bx0, by0, bx1, by1):
                        bx0, by0, bx1, by1 = nb; changed = True
    return (x0 + bx0 * f, y0 + by0 * f, x0 + (bx1 + 1) * f, y0 + (by1 + 1) * f)

def _mean(im, mask=None):
    st = ImageStat.Stat(im, mask)
    return st.mean

def find_by_template(img, art_path, cor, region):
    """Acha a estampa pela FORMA da arte inteira (multi-escala). Bom para artes com várias partes/traços finos."""
    import numpy as np, cv2
    x0, y0, x1, y1 = region
    g = np.array(img.convert('L').crop(region)).astype(np.float32)
    bg = cv2.GaussianBlur(g, (0, 0), 20)
    ink = (bg - g) if cor == 'branca' else (g - bg)          # tinta escura na branca / clara na preta
    ink = np.clip(ink, 0, 80) / 80.0
    f = 3
    ink_s = cv2.resize(ink, (ink.shape[1] // f, ink.shape[0] // f), interpolation=cv2.INTER_AREA)
    a = Image.open(art_path).convert('RGBA'); a = a.crop(a.getchannel('A').getbbox())
    am = np.array(a.getchannel('A')).astype(np.float32) / 255.0
    best = (-1, None)
    W, H = ink_s.shape[1], ink_s.shape[0]
    for frac in np.linspace(0.12, 0.95, 42):
        tw = int(W * frac); th = int(tw * am.shape[0] / am.shape[1])
        if tw < 8 or th < 8 or th >= H or tw >= W:
            continue
        t = cv2.resize(am, (tw, th), interpolation=cv2.INTER_AREA)
        r = cv2.matchTemplate(ink_s, t, cv2.TM_CCOEFF_NORMED)
        _, mv, _, ml = cv2.minMaxLoc(r)
        if mv > best[0]:
            best = (mv, (ml[0], ml[1], tw, th))
    if best[1] is None:
        raise SystemExit('template não encontrado')
    mx, my, tw, th = best[1]
    return (x0 + mx * f, y0 + my * f, x0 + (mx + tw) * f, y0 + (my + th) * f), best[0]

def find_union(img, cor, region, art_path):
    """Área total da estampa da IA (todas as partes) → caixa com a proporção da arte original, centrada nela."""
    import numpy as np, cv2
    x0, y0, x1, y1 = region
    g = np.array(img.convert('L').crop(region)).astype(np.float32)
    bg = cv2.GaussianBlur(g, (0, 0), 12)
    ink = ((bg - g) if cor == 'branca' else (g - bg)) > 22
    ink = cv2.dilate(ink.astype(np.uint8), np.ones((5, 5), np.uint8), iterations=2)
    n, lab, st, _ = cv2.connectedComponentsWithStats(ink, 8)
    H, W = ink.shape
    keep = [i for i in range(1, n) if st[i, 4] >= 40 and st[i, 0] > 2 and st[i, 1] > 2
            and st[i, 0] + st[i, 2] < W - 2 and st[i, 1] + st[i, 3] < H - 2
            and st[i, 3] < H * 0.9 and st[i, 2] < W * 0.9]
    if not keep:
        raise SystemExit('estampa não encontrada (união) — use --box')
    bx0 = min(st[i, 0] for i in keep); by0 = min(st[i, 1] for i in keep)
    bx1 = max(st[i, 0] + st[i, 2] for i in keep); by1 = max(st[i, 1] + st[i, 3] for i in keep)
    a = Image.open(art_path).convert('RGBA'); a = a.crop(a.getchannel('A').getbbox())
    ar = a.width / a.height
    bw, bh = bx1 - bx0, by1 - by0
    # encaixa a arte (proporção fixa) cobrindo a área da IA
    if bw / bh > ar:
        nh = bw / ar; cy = (by0 + by1) / 2; by0, by1 = cy - nh / 2, cy + nh / 2
    else:
        nw = bh * ar; cx = (bx0 + bx1) / 2; bx0, bx1 = cx - nw / 2, cx + nw / 2
    return (int(x0 + bx0), int(y0 + by0), int(x0 + bx1), int(y0 + by1))

def fabric_fill(img, box, pad=34, direction=-1, ring=40, cor='branca'):
    """Remove a estampa gerada.
    Baixa frequência (luz e sombra): difusão a partir só do tecido ao redor.
    Alta frequência (trama e grão): clonada do tecido liso vizinho, na mesma altura.
    direction=-1 clona da esquerda (peito esquerdo de quem veste), +1 da direita."""
    x0, y0, x1, y1 = box[0] - pad, box[1] - pad, box[2] + pad, box[3] + pad
    w, h = x1 - x0, y1 - y0
    X0, Y0 = x0 - ring, y0 - ring
    patch = img.crop((X0, Y0, x1 + ring, y1 + ring))
    # buraco = só os pixels de tinta da IA (dilatados), não o retângulo inteiro
    g = patch.convert('L')
    # tom do tecido = mediana do anel em volta da estampa; tudo que se afasta dele dentro da caixa é estampa/painel da IA
    ringmask = Image.new('L', patch.size, 255); ringmask.paste(0, (ring, ring, ring + w, ring + h))
    vals = sorted(v for v, m in zip(g.getdata(), ringmask.getdata()) if m)
    fab = vals[len(vals) // 2]
    thr = lambda v, fab=fab: 255 if abs(v - fab) > 5 else 0      # painel mais claro OU mais escuro que o tecido
    ink = g.point(thr)
    rect = Image.new('L', patch.size, 0); rect.paste(255, (ring, ring, ring + w, ring + h))
    hole = ImageChops.multiply(ink, rect).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MaxFilter(5))
    keep = ImageOps.invert(hole)
    f = 4
    sw, sh = max(8, patch.width // f), max(8, patch.height // f)
    known = patch.resize((sw, sh), Image.BILINEAR)
    kmask = keep.resize((sw, sh), Image.NEAREST)
    ringpx = [px for px, m in zip(known.getdata(), kmask.getdata()) if m > 128]
    avg = tuple(sum(c[i] for c in ringpx) // len(ringpx) for i in range(3))
    cur = known.copy(); cur.paste(avg, (0, 0), ImageOps.invert(kmask))
    for _ in range(300):
        cur = cur.filter(ImageFilter.BoxBlur(1)); cur.paste(known, (0, 0), kmask)
    low = cur.resize(patch.size, Image.BICUBIC).filter(ImageFilter.GaussianBlur(4))
    # alta frequência do tecido vizinho
    sx0 = X0 + direction * (w + 12)
    src = img.crop((sx0, Y0, sx0 + patch.width, Y0 + patch.height))
    hi = ImageChops.subtract(src, src.filter(ImageFilter.GaussianBlur(4)), 1, 128)
    fill = ImageChops.add(low, hi, 1, -128)
    soft = hole.filter(ImageFilter.GaussianBlur(2))
    patch.paste(fill, (0, 0), soft)
    out = img.copy(); out.paste(patch, (X0, Y0))
    return out, (x0, y0, x1, y1)


def fabric_fill_cv(img, box, pad=30, direction=-1, ring=40, cor='branca'):
    """Remove estampa/painel da IA com inpainting do OpenCV (Telea) + grão do tecido vizinho."""
    import numpy as np, cv2
    arr = np.array(img.convert('RGB'))
    H, W = arr.shape[:2]
    x0, y0 = max(0, box[0] - pad), max(0, box[1] - pad)
    x1, y1 = min(W, box[2] + pad), min(H, box[3] + pad)
    gray = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY)
    X0, Y0, X1, Y1 = max(0, x0 - ring), max(0, y0 - ring), min(W, x1 + ring), min(H, y1 + ring)
    ringm = np.zeros_like(gray, bool); ringm[Y0:Y1, X0:X1] = True; ringm[y0:y1, x0:x1] = False
    fab = float(np.median(gray[ringm]))
    mask = np.zeros_like(gray, np.uint8)
    sub = gray[y0:y1, x0:x1].astype(int)
    thr = 9 if cor == 'branca' else 4          # branca tem sombras suaves: limiar maior
    mask[y0:y1, x0:x1] = (np.abs(sub - fab) > thr).astype(np.uint8) * 255
    mask = cv2.dilate(mask, np.ones((7, 7), np.uint8), iterations=3)
    out = cv2.inpaint(arr, mask, 11, cv2.INPAINT_TELEA)
    # grão: alta frequência clonada do tecido vizinho, só dentro da máscara
    w = x1 - x0
    sx0 = x0 + direction * (w + 12)
    if 0 <= sx0 and sx0 + w <= W:
        src = arr[y0:y1, sx0:sx0 + w].astype(np.float32)
        hi = np.clip(src - cv2.GaussianBlur(src, (0, 0), 3), -8, 8)   # só grão fino — nunca bordas/linhas
        m = cv2.GaussianBlur(mask[y0:y1, x0:x1].astype(np.float32) / 255, (0, 0), 2)[..., None]
        reg = out[y0:y1, x0:x1].astype(np.float32) + hi * m
        out[y0:y1, x0:x1] = np.clip(reg, 0, 255).astype(np.uint8)
    return Image.fromarray(out), (x0, y0, x1, y1)

def deep_clean(img, box, expand=60, thr=3):
    """Limpeza ampla para resíduos que escapam da caixa (riscos, sombras da estampa da IA)."""
    import numpy as np, cv2
    arr = np.array(img.convert('RGB')); g = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY).astype(np.float32)
    H, W = g.shape
    x0, y0 = max(0, box[0] - expand), max(0, box[1] - expand)
    x1, y1 = min(W, box[2] + expand), min(H, box[3] + expand)
    # tom local do tecido (desfoque grande preserva dobras amplas e ignora detalhes finos)
    bg = cv2.GaussianBlur(g, (0, 0), 25)
    m = np.zeros(g.shape, np.uint8)
    m[y0:y1, x0:x1] = (np.abs(g[y0:y1, x0:x1] - bg[y0:y1, x0:x1]) > thr * 2.5).astype(np.uint8) * 255
    m = cv2.dilate(m, np.ones((5, 5), np.uint8), iterations=2)
    return Image.fromarray(cv2.inpaint(arr, m, 9, cv2.INPAINT_TELEA))

def lock(photo, art, out, cor, box=None, debug=False, posicao='peito-esquerdo', detalhe=False, profundo=False, lado='front', uniao=False, tmpl_box=False):
    img = Image.open(photo).convert('RGB')
    W, H = img.size
    # peito esquerdo de quem veste = lado direito da imagem; abaixo da gola
    if lado == 'back':
        region = (int(W * 0.12), int(H * 0.22), int(W * 0.88), int(H * 0.80))
    elif detalhe:      # close: a estampa é grande e pode estar em qualquer lugar do peito
        region = (int(W * 0.08), int(H * 0.15), int(W * 0.95), int(H * 0.85))
    elif posicao == 'peito-esquerdo':
        region = (int(W * 0.50), int(H * 0.30), int(W * 0.82), int(H * 0.62))
    else:
        region = (int(W * 0.30), int(H * 0.30), int(W * 0.70), int(H * 0.65))
    tmpl = tmpl_box
    if box:
        pb = box
    elif uniao:
        pb = find_union(img, cor, region, art); tmpl = True
    else:
        pb = find_print(img, cor, region, uniao)
    clean, _ = fabric_fill_cv(img, pb, direction=-1 if posicao == 'peito-esquerdo' else 1, cor=cor)
    if profundo:
        clean = deep_clean(clean, pb)
    a = Image.open(art).convert('RGBA')
    a = a.crop(a.getchannel('A').getbbox())
    # "miolo" da arte = linhas com tinta de verdade (ignora filetes finos e áreas quase vazias)
    al = a.getchannel('A'); aw0, ah0 = a.size; apx = al.load()
    rows = [y for y in range(ah0) if sum(1 for x in range(0, aw0, 2) if apx[x, y] > 128) > aw0 * 0.06]
    core_top, core_bot = (rows[0], rows[-1] + 1) if rows else (0, ah0)
    # a altura da estampa gerada corresponde ao miolo; largura segue a proporção da arte original
    ph = pb[3] - pb[1]
    cx = (pb[0] + pb[2]) / 2
    if tmpl:                      # caixa do template já é a arte inteira, na proporção exata
        core_top, core_bot = 0, a.height
    scale = ph / (core_bot - core_top)
    aw, ah = int(a.width * scale), int(a.height * scale)
    # perspectiva: em poses viradas a estampa da IA fica mais estreita — comprime a arte na horizontal
    pw = pb[2] - pb[0]
    if not tmpl and pw < aw * 0.85:
        aw = max(int(pw * 1.02), int(aw * 0.55))
    a = a.resize((aw, ah), Image.LANCZOS)
    ox, oy = int(cx - aw / 2), int(pb[1] - core_top * scale)
    # sombreamento do tecido na área da arte (luz e dobras), normalizado
    shade = clean.convert('L').crop((ox, oy, ox + aw, oy + ah)).filter(ImageFilter.GaussianBlur(2))
    mean = sum(shade.getdata()) / (aw * ah)
    rgb = a.convert('RGB'); alpha = a.getchannel('A').filter(ImageFilter.GaussianBlur(0.6))
    if cor == 'branca':
        k = shade.point(lambda v: max(0, min(255, int(255 * v / max(mean, 1)))))
        ink = ImageChops.multiply(rgb, Image.merge('RGB', (k, k, k)))
    else:
        k = shade.point(lambda v: max(0, min(255, int(200 + 55 * v / max(mean, 1)))))
        ink = ImageChops.multiply(rgb, Image.merge('RGB', (k, k, k)))
    alpha = alpha.point(lambda v: int(v * 0.96))
    res = clean.copy()
    res.paste(ink, (ox, oy), alpha)
    res.save(out, quality=95)
    if debug:
        print('estampa IA:', pb, '→ arte em', (ox, oy, ox + aw, oy + ah))

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('foto'); ap.add_argument('arte'); ap.add_argument('saida')
    ap.add_argument('--cor', choices=['branca', 'preta'], required=True)
    ap.add_argument('--box', type=int, nargs=4)
    ap.add_argument('--debug', action='store_true')
    ap.add_argument('--posicao', default='peito-esquerdo', choices=['peito-esquerdo', 'centro'])
    a = ap.parse_args()
    lock(a.foto, a.arte, a.saida, a.cor, tuple(a.box) if a.box else None, a.debug, a.posicao)


def split_art(art_path, gap=40):
    """Separa a arte em partes (componentes distantes entre si). Retorna lista de PNGs RGBA recortados, ordenados por área."""
    import numpy as np, cv2
    a = Image.open(art_path).convert('RGBA'); al = np.array(a.getchannel('A'))
    m = cv2.dilate((al > 20).astype(np.uint8), np.ones((gap, gap), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    parts = []
    for i in range(1, n):
        x, y, w, h, area = st[i]
        if area < 200: continue
        sub = a.crop((x, y, x + w, y + h)); bb = sub.getchannel('A').getbbox()
        if bb: parts.append(sub.crop(bb))
    return sorted(parts, key=lambda p: -p.width * p.height)

def ink_clusters(img, cor, region, dil=9, thr=18):
    """Grupos de tinta da IA dentro da região (letras de uma palavra / linhas de um quadro se juntam)."""
    import numpy as np, cv2
    x0, y0, x1, y1 = region
    g = np.array(img.convert('L').crop(region)).astype(np.float32)
    bg = cv2.GaussianBlur(g, (0, 0), 15)
    rel = ((bg - g) if cor == 'branca' else (g - bg)) > thr
    absol = (g < 160) if cor == "branca" else (g > 120)      # tinta real: quase preta na branca / clara na preta
    ink = (rel & absol).astype(np.uint8)
    m = cv2.dilate(ink, np.ones((dil, dil), np.uint8), iterations=2)
    # máscara do tecido: só aceita grupos dentro da camiseta (evita borda da peça contra o fundo)
    full = np.array(img.convert('L')).astype(np.float32)
    border = np.concatenate([full[:20].ravel(), full[-20:].ravel(), full[:, :20].ravel(), full[:, -20:].ravel()])
    bgv = float(np.median(border))
    if cor == 'branca':
        cloth = cv2.medianBlur((cv2.GaussianBlur(full, (0, 0), 8) > bgv + 4).astype(np.uint8) * 255, 31)
    else:
        cloth = cv2.medianBlur((cv2.GaussianBlur(full, (0, 0), 6) < 90).astype(np.uint8) * 255, 31)
    cloth = cv2.morphologyEx(cloth, cv2.MORPH_CLOSE, np.ones((81, 81), np.uint8))   # fecha os buracos da própria estampa
    cloth = cv2.erode(cloth, np.ones((31, 31), np.uint8))[y0:y1, x0:x1] > 0
    n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    H, W = m.shape; out = []
    for i in range(1, n):
        x, y, w, h, area = st[i]
        inkpx = int(ink[lab == i].sum())
        if inkpx < 60 or x <= 1 or y <= 1 or x + w >= W - 1 or y + h >= H - 1 or w > W * 0.7 or h > H * 0.8:
            continue
        if cloth[y:y + h, x:x + w].mean() < 0.7:
            continue
        out.append((inkpx, (x0 + x, y0 + y, x0 + x + w, y0 + y + h)))
    return [b for _, b in sorted(out, reverse=True)]

def erase_ink(img, box, cor, grow=14, estrito=False):
    """Apaga só os pixels de tinta (tom absoluto + contraste local) dentro da caixa, com inpaint."""
    import numpy as np, cv2
    arr = np.array(img.convert('RGB')); g = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY).astype(np.float32)
    H, W = g.shape
    x0, y0, x1, y1 = max(0, box[0]-grow), max(0, box[1]-grow), min(W, box[2]+grow), min(H, box[3]+grow)
    bg = cv2.GaussianBlur(g, (0, 0), 45 if estrito else 15)   # desfoque largo: blocos grandes de tinta também contam
    rel = ((bg - g) if cor == 'branca' else (g - bg)) > (28 if estrito and cor == 'branca' else 10)
    if estrito and cor == 'branca':   # só tinta de verdade (evita sombra de dobra), inclui tinta colorida pela saturação
        sat = arr.max(2).astype(np.float32) - arr.min(2).astype(np.float32)
        absol = (g < 115) | (sat > 60)
    else:
        absol = (g < 175) if cor == "branca" else (g > 55)
    m = np.zeros(g.shape, np.uint8); m[y0:y1, x0:x1] = (rel & absol)[y0:y1, x0:x1].astype(np.uint8) * 255
    m = cv2.dilate(m, np.ones((5, 5), np.uint8), iterations=2)
    return Image.fromarray(cv2.inpaint(arr, m, 7, cv2.INPAINT_TELEA))

def lock_parts(photo, art, out, cor, region_frac, debug=False):
    """Estampa com várias partes: casa cada parte da arte com o grupo de tinta de proporção mais parecida e troca uma a uma."""
    import math, tempfile, os
    img = Image.open(photo).convert('RGB'); W, H = img.size
    region = (int(W * region_frac[0]), int(H * region_frac[1]), int(W * region_frac[2]), int(H * region_frac[3]))
    parts = split_art(art)
    clusters = ink_clusters(img, cor, region)[:len(parts) + 3]
    used, cur = set(), img
    for k, part in enumerate(parts):
        pr = part.width / part.height
        cand = [(abs(math.log(((b[2]-b[0]) / max(1, b[3]-b[1])) / pr)), i, b) for i, b in enumerate(clusters) if i not in used]
        if not cand: break
        d, i, b = min(cand)
        if debug: print('parte', k, part.size, '→ grupo', b, 'dif proporção %.2f' % d)
        if d > 0.7: continue
        used.add(i)
        tmp = tempfile.mktemp(suffix='.png'); part.save(tmp)
        # caixa final: proporção da parte, cobrindo o grupo (centro e altura do grupo)
        bw, bh = b[2]-b[0], b[3]-b[1]
        # encaixa DENTRO da área (a IA às vezes inclina a arte; cobrir estouraria o tamanho)
        if bw / bh > pr: nw = bh * pr; cx = (b[0]+b[2]) / 2; box = (int(cx-nw/2), b[1], int(cx+nw/2), b[3])
        else: nh = bw / pr; cy = (b[1]+b[3]) / 2; box = (b[0], int(cy-nh/2), b[2], int(cy+nh/2))
        # limpa a área inteira da IA antes de colar (a caixa final pode ser menor)
        cur = erase_ink(cur, b, cor, grow=24)
        t2 = tempfile.mktemp(suffix='.png'); cur.save(t2)
        lock(t2, tmp, t2, cor, box=box, lado='back', posicao='centro', tmpl_box=True)
        cur = Image.open(t2).convert('RGB'); os.remove(tmp); os.remove(t2)
    cur.save(out, quality=95)

def lock_boxes(photo, art, out, cor, boxes):
    """Arte com várias partes em posições medidas à mão: boxes = [caixa da parte 0, caixa da parte 1, ...]
    na ordem de split_art (maior área primeiro). Apaga a tinta da IA em cada caixa e cola a parte original encaixada."""
    import tempfile, os
    parts = split_art(art); cur = Image.open(photo).convert('RGB')
    for part, b in zip(parts, boxes):
        pr = part.width / part.height; bw, bh = b[2]-b[0], b[3]-b[1]
        if bw / bh > pr: nw = bh * pr; cx = (b[0]+b[2]) / 2; box = (int(cx-nw/2), b[1], int(cx+nw/2), b[3])
        else: nh = bw / pr; cy = (b[1]+b[3]) / 2; box = (b[0], int(cy-nh/2), b[2], int(cy+nh/2))
        cur = erase_ink(cur, b, cor, grow=18)
        tmp = tempfile.mktemp(suffix='.png'); part.save(tmp)
        t2 = tempfile.mktemp(suffix='.png'); cur.save(t2)
        lock(t2, tmp, t2, cor, box=box, lado='back', posicao='centro', tmpl_box=True)
        cur = Image.open(t2).convert('RGB'); os.remove(tmp); os.remove(t2)
    cur.save(out, quality=95)

def paste_soft(img, part, box, cor, oclusao=None):
    """Cola a parte original na caixa (encaixada pela proporção) sem preencher tecido em volta:
    só a tinta entra, com o sombreamento local do tecido (luminância suavizada / mediana)."""
    import numpy as np, cv2
    pr = part.width / part.height; bw, bh = box[2]-box[0], box[3]-box[1]
    if bw / bh > pr: nw = int(bh * pr); x = box[0] + (bw - nw) // 2; y = box[1]; nh = bh
    else: nh = int(bw / pr); x = box[0]; y = box[1] + (bh - nh) // 2; nw = bw
    p = part.resize((nw, nh), Image.LANCZOS); arr = np.array(img).astype(np.float32)
    H, W = arr.shape[:2]   # arte que sai do quadro (foto de detalhe): cola só a parte visível
    cx0, cy0 = max(0, -x), max(0, -y); cx1, cy1 = min(nw, W - x), min(nh, H - y)
    if cx0 or cy0 or cx1 < nw or cy1 < nh:
        p = p.crop((cx0, cy0, cx1, cy1)); x += cx0; y += cy0; nw, nh = cx1 - cx0, cy1 - cy0
    rgb = np.array(p.convert('RGB')).astype(np.float32); al = np.array(p.getchannel('A')).astype(np.float32)[..., None] / 255
    reg = arr[y:y+nh, x:x+nw]
    lum = cv2.GaussianBlur(cv2.cvtColor(reg.astype(np.uint8), cv2.COLOR_RGB2GRAY).astype(np.float32), (0, 0), 6)
    lo, hi = (0.9, 1.04) if cor == 'branca' else (1.0, 1.0)   # no preto a razão de luminância oscila demais: sombreamento bem leve
    shade = np.clip(cv2.GaussianBlur(lum, (0, 0), 20) / max(1.0, float(np.median(lum))), lo, hi)[..., None]
    ink = np.clip(rgb * shade, 0, 255)
    if oclusao is not None:   # braço/mão na frente da camiseta: a estampa fica atrás (não pinta sobre a pele)
        oc = oclusao[y:y+nh, x:x+nw].astype(np.float32)
        if oc.shape == al.shape[:2]: al = al * (1 - oc)[..., None]
    arr[y:y+nh, x:x+nw] = reg * (1 - al * 0.97) + ink * (al * 0.97)
    return Image.fromarray(arr.astype(np.uint8))

def lock_soft(photo, art, out, cor, boxes):
    """Como lock_boxes, mas sem preenchimento de tecido (evita painel/manchas na branca)."""
    parts = split_art(art) if len(boxes) > 1 else [Image.open(art).convert('RGBA').crop(Image.open(art).getchannel('A').getbbox())]
    cur = Image.open(photo).convert('RGB')
    for part, b in zip(parts, boxes):
        cur = erase_close(cur, b, cor=cor)
        import numpy as np, cv2
        arr = np.array(cur).astype(np.float32); R, G, B = arr[..., 0], arr[..., 1], arr[..., 2]; sat = arr.max(2) - arr.min(2); g = arr.mean(2)
        pele = (R > G) & (G > B) & (sat > 35) & (sat < 120) & (g > 60) & ((R - G) < 70) & ((R - B) > 35)
        pele = pele & ~cv2.dilate(((sat > 110) & (R > G + 60)).astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
        oc = cv2.GaussianBlur(cv2.morphologyEx(pele.astype(np.uint8), cv2.MORPH_OPEN, np.ones((7, 7), np.uint8)).astype(np.float32), (0, 0), 2)
        cur = paste_soft(cur, part, b, cor, oclusao=np.clip(oc * 1.5, 0, 1))   # braço/mão na frente: estampa fica atrás
    cur.save(out, quality=95)


def backdrop_mask(arr):
    """Fundo do estúdio: claro, pouco saturado e ligado à borda da foto (tinta branca dentro da peça não liga)."""
    import numpy as np, cv2
    g = arr.mean(2); sat = arr.max(2) - arr.min(2)
    c = ((g > 140) & (sat < 30)).astype(np.uint8)
    c = cv2.morphologyEx(c, cv2.MORPH_OPEN, np.ones((15, 15), np.uint8))   # traço fino de texto claro não liga no fundo
    n, lab, st, _ = cv2.connectedComponentsWithStats(c, 8)
    H, W = c.shape; out = np.zeros_like(c)
    for i in range(1, n):
        x, y, w, h, a = st[i]
        if x == 0 or y == 0 or x + w >= W or y + h >= H: out[lab == i] = 1
    frio = ((g > 130) & (sat < 35) & ((arr[..., 2] - arr[..., 0]) >= 3)).astype(np.uint8)   # cinza frio do estúdio (a tinta é branca neutra/creme)
    frio = cv2.morphologyEx(frio, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    return cv2.dilate(np.maximum(out, frio), np.ones((7, 7), np.uint8)).astype(bool)

def skin_mask(arr):
    import numpy as np, cv2
    R, G, B = arr[..., 0], arr[..., 1], arr[..., 2]; sat = arr.max(2) - arr.min(2); g = arr.mean(2)
    pele = (R > G) & (G > B) & (sat > 35) & (sat < 120) & (g > 60) & ((R - G) < 70) & ((R - B) > 35)   # tinta creme/branca não é pele
    pele = pele & ~cv2.dilate(((sat > 110) & (R > G + 60)).astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
    return cv2.morphologyEx(pele.astype(np.uint8), cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)).astype(bool)

def erase_close(img, box, grow=20, k=161, thr=28, cor='branca'):
    """Remove tinta escura na camiseta clara reconstruindo o tecido por fechamento morfológico:
    o fechamento com elemento maior que o traço devolve o brilho do tecido (com as dobras de baixa frequência);
    áreas grandes e escuras de verdade (jeans, cabelo) continuam escuras no fechamento e não são tocadas."""
    import numpy as np, cv2
    arr = np.array(img.convert('RGB')).astype(np.float32); H, W = arr.shape[:2]
    x0, y0, x1, y1 = max(0, box[0]-grow), max(0, box[1]-grow), min(W, box[2]+grow), min(H, box[3]+grow)
    k = max(k, min(401, int(1.1 * max(x1 - x0, y1 - y0))) | 1)   # elemento de tinta grande (círculo cheio) também sai; teto 401 em resolução cheia
    P = k // 2 + 4; X0, Y0, X1, Y1 = max(0, x0-P), max(0, y0-P), min(W, x1+P), min(H, y1+P)
    PROIB = backdrop_mask(arr) | skin_mask(arr)   # na foto inteira (num recorte, tinta que toca a borda pareceria fundo)
    reg = arr[Y0:Y1, X0:X1]; ker = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
    op = cv2.MORPH_CLOSE if cor == 'branca' else cv2.MORPH_OPEN   # preta: abertura devolve o tecido escuro sob tinta clara/colorida
    if k > 401:   # kernel enorme: faz a morfologia em 1/4 da resolução (muito mais rápido, mesmo resultado em baixa frequência)
        sm = cv2.resize(reg, (max(1, reg.shape[1] // 4), max(1, reg.shape[0] // 4)), interpolation=cv2.INTER_AREA)
        k4 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k // 4 | 1, k // 4 | 1))
        fs = np.stack([cv2.morphologyEx(sm[..., c], op, k4) for c in range(3)], -1)
        fab = cv2.GaussianBlur(cv2.resize(fs, (reg.shape[1], reg.shape[0]), interpolation=cv2.INTER_LINEAR), (0, 0), 9)
    else:
        fab = np.stack([cv2.GaussianBlur(cv2.morphologyEx(reg[..., c], op, ker), (0, 0), 9) for c in range(3)], -1)
    g = reg.mean(2); fg = fab.mean(2)
    sat = reg.max(2) - reg.min(2)
    if cor == 'branca':
        m = ((((fg - g) > thr) & (g < 110)) | (((fg - g) > 12) & (sat > 50))).astype(np.uint8)   # tinta escura ou colorida (vermelho/verde)
    else:
        m = ((((g - fg) > thr) & ((g > 70) | (sat > 45))) | (sat > 70)).astype(np.uint8)
    lim = np.zeros_like(m); lim[y0-Y0:y1-Y0, x0-X0:x1-X0] = 1; m = cv2.dilate(m * lim, np.ones((5, 5), np.uint8), iterations=2)
    # cor de preenchimento: média local do tecido real (convolução normalizada) — mantém sombras e dobras de baixa frequência
    keep = (m == 0).astype(np.float32)
    keep = keep * (~PROIB[Y0:Y1, X0:X1]).astype(np.float32)   # amostra só tecido
    num = np.stack([cv2.GaussianBlur(reg[..., c] * keep, (0, 0), 16) for c in range(3)], -1)
    den = cv2.GaussianBlur(keep, (0, 0), 16)[..., None]
    fab = np.where(den > 0.02, num / np.maximum(den, 1e-3), fab)
    # meio-tom da borda da tinta: só perto da tinta e bem mais escuro que o tecido local
    near = cv2.dilate(m, np.ones((9, 9), np.uint8), iterations=3)
    m = np.maximum(m, ((near > 0) & ((g < fab.mean(2) - 14) if cor == 'branca' else ((g > fab.mean(2) + 14) | (sat > 30)))).astype(np.uint8))
    proibido = PROIB[Y0:Y1, X0:X1]   # nunca apaga fundo do estúdio nem pele (braço/mão na frente)
    m = m & (~proibido).astype(np.uint8)
    rng = np.random.default_rng(0); gr = np.clip(rng.normal(0, 2.0, m.shape), -5, 5)[..., None]
    out = np.where(m[..., None] > 0, fab + gr, reg); arr[Y0:Y1, X0:X1] = out
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

def lock_auto(photo, art, out, cor, region_frac, debug=False):
    """Arte esparsa/repetida pela IA: junta TODOS os grupos de tinta da IA na região da peça numa caixa única,
    apaga tudo e cola a arte original inteira nessa caixa (encaixada pela proporção)."""
    img = Image.open(photo).convert('RGB'); W, H = img.size
    region = (int(W * region_frac[0]), int(H * region_frac[1]), int(W * region_frac[2]), int(H * region_frac[3]))
    cl = ink_clusters(img, cor, region)
    if not cl: raise SystemExit('estampa não encontrada — use --box')
    x0 = min(b[0] for b in cl); y0 = min(b[1] for b in cl); x1 = max(b[2] for b in cl); y1 = max(b[3] for b in cl)
    if debug: print('grupos', len(cl), 'união', (x0, y0, x1, y1))
    lock_soft(photo, art, out, cor, [(x0 - 3, y0 - 3, x1 + 3, y1 + 3)])
    return (x0, y0, x1, y1)

def cloth_mask(img, cor, close=45):
    """Máscara do tecido da camiseta (fecha só buracos pequenos: tinta; mãos/braços maiores ficam de fora)."""
    import numpy as np, cv2
    full = np.array(img.convert('L')).astype(np.float32)
    border = np.concatenate([full[:20].ravel(), full[-20:].ravel(), full[:, :20].ravel(), full[:, -20:].ravel()])
    bgv = float(np.median(border))
    if cor == 'branca':
        c = (cv2.GaussianBlur(full, (0, 0), 4) > bgv + 4).astype(np.uint8) * 255
    else:
        c = (cv2.GaussianBlur(full, (0, 0), 4) < 70).astype(np.uint8) * 255
    c = cv2.medianBlur(c, 15)
    c = cv2.morphologyEx(c, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (close, close)))
    n, lab, st, _ = cv2.connectedComponentsWithStats((c > 0).astype(np.uint8), 8)
    if n > 1:
        k = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA])); c = (lab == k).astype(np.uint8)
    return cv2.erode(c, np.ones((5, 5), np.uint8))

def lock_auto2(photo, art, out, cor, region_frac, debug=False, costas=False):
    """Apaga toda tinta da IA dentro do tecido (região da peça) e cola a arte inteira na caixa que cobria essa tinta."""
    import numpy as np, cv2
    img = Image.open(photo).convert('RGB'); W, H = img.size
    rx0, ry0, rx1, ry1 = int(W * region_frac[0]), int(H * region_frac[1]), int(W * region_frac[2]), int(H * region_frac[3])
    cm = cloth_mask(img, cor, close=141 if costas else 45)   # costas: letras grandes viram 'buraco' se o fechamento for pequeno
    arr = np.array(img).astype(np.float32); g = arr.mean(2); sat = arr.max(2) - arr.min(2)
    ker = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (121, 121))
    fg = cv2.GaussianBlur(cv2.morphologyEx(g, cv2.MORPH_CLOSE if cor == 'branca' else cv2.MORPH_OPEN, ker), (0, 0), 9)
    ink = (((fg - g) > 28) & (g < 120)) | (((fg - g) > 20) & (sat > 60)) if cor == 'branca' else ((g - fg) > 35) & ((g > 95) | ((sat > 60) & (g > 55)))
    R, G, B = arr[..., 0], arr[..., 1], arr[..., 2]
    pele = (R > G) & (G > B) & (sat > 35) & (sat < 120) & (g > 60) & ((R - G) < 70) & ((R - B) > 35)   # tons de pele/cabelo castanho: nunca é tinta
    vermelho = (sat > 110) & (R > G + 60)
    pele = pele & ~cv2.dilate(vermelho.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)   # borda rosada do ponto REC não é pele
    pele_oc = cv2.GaussianBlur(cv2.morphologyEx(pele.astype(np.uint8), cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)).astype(np.float32), (0, 0), 2)
    ink = ink & ~cv2.dilate(pele.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
    lim = np.zeros_like(cm); lim[ry0:ry1, rx0:rx1] = 1
    ink = (ink & (cm > 0) & (lim > 0)).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(cv2.dilate(ink, np.ones((5, 5), np.uint8)), 8)
    keep = [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] >= 40]
    if not keep: raise SystemExit('estampa não encontrada — use --box')
    xs = [st[i, 0] for i in keep]; ys = [st[i, 1] for i in keep]; xe = [st[i, 0] + st[i, 2] for i in keep]; ye = [st[i, 1] + st[i, 3] for i in keep]
    box = (min(xs), min(ys), max(xe), max(ye))
    cur = img
    for i in keep:   # apaga cada grupo de tinta separadamente (caixas pequenas → preenchimento bem local)
        b = (st[i, 0], st[i, 1], st[i, 0] + st[i, 2], st[i, 1] + st[i, 3])
        cur = erase_close(cur, b, grow=8, cor=cor)
    parts = [Image.open(art).convert('RGBA')]; a = parts[0]; a = a.crop(a.getchannel('A').getbbox())
    cur = paste_soft(cur, a, box, cor, oclusao=np.clip(pele_oc * 1.5, 0, 1)); cur.save(out, quality=95)
    if debug: print('grupos', len(keep), 'caixa', box)
    return box
