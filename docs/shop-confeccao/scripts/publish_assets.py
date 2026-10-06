"""Gera o pacote de publicação (SEO) de um produto + estampa.

Uso:
    python3 publish_assets.py P02 art-director

Lê magnific/<colecao>/<Pxx>/jobs.json e publicacao/<colecao>.json (nome da estampa, slug, textos),
e cria em lookbook/<colecao>/<Pxx>/site/:
    <slug-produto>-<cor>-<vista>-<nn>.webp        master 1600×2400 (2:3)
    <slug-produto>-<cor>-<vista>-<nn>-1000.webp   1000×1500 (mínimo)
    seo.json          nome, alt, title, legenda de cada imagem + dados do produto
    descricao.md      textos de venda (curta, longa, bullets, ficha, cuidados, meta)
Regras: nomes em minúsculas, sem acento, hífens, palavras-chave na ordem
        tipo-modelagem-estampa-cor-tecido-gramatura-marca-vista. Sem alegações do fornecedor.
"""
import json, os, re, sys, unicodedata
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

VISTA = {  # código da foto → (slug da vista, descrição PT para alt)
    'F1': ('frente-olhar-baixo', 'de frente, olhar para baixo'),
    'F2': ('tres-quartos-bracos-cruzados', 'em três quartos com os braços cruzados'),
    'F3': ('perfil', 'de perfil, olhando para o horizonte'),
    'F4': ('detalhe-gola-estampa', 'detalhe da gola, do ombro caído e da estampa'),
    'F5': ('olhar-por-cima-do-ombro', 'olhando por cima do ombro'),
    'F6': ('mao-no-cabelo', 'com a mão no cabelo'),
    'F7': ('tres-quartos-olhar-lateral', 'em três quartos com olhar lateral'),
    'F8': ('contra-plongee-sorriso', 'de baixo para cima, com meio sorriso'),
    'FX1': ('costas', 'de costas mostrando a estampa do verso'),
    'FX2': ('cabide-frente', 'no cabide, vista de frente'),
    'FX3': ('cabide-costas', 'no cabide, vista de costas'),
}
COR = {'branca': ('branca', 'branca'), 'preta': ('preta', 'preta')}

def slugify(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def main(pk, colecao):
    jobs = json.load(open(os.path.join(ROOT, 'magnific', colecao, pk, 'jobs.json')))['jobs']
    pub = json.load(open(os.path.join(ROOT, 'publicacao', f'{colecao}.json')))
    prod = pub['produtos'][pk]
    out = os.path.join(ROOT, 'lookbook', colecao, pk, 'site'); os.makedirs(out, exist_ok=True)
    base = slugify(f"{prod['tipo']} {pub['estampa']}")
    imagens, cont = [], {}
    order = sorted([j for j in jobs if j['status'] == 'aprovado' and os.path.exists(j['saida'])],
                   key=lambda j: (j['variante'] != 'branca', j['id'].split('-')[1] not in ('F1',), j['id']))
    for j in order:
        code = j['id'].split('-')[1]
        cor_slug, cor_pt = COR[j['variante']]
        pose_nome = j['foto'].split('—')[-1].strip()
        vslug, vpt = VISTA[code] if code.startswith('FX') else (slugify(pose_nome), pose_nome.lower())
        cont[j['variante']] = cont.get(j['variante'], 0) + 1
        n = cont[j['variante']]
        nome = f"{base}-{cor_slug}-{slugify(prod['tecido_curto'])}-{pub['marca_slug']}-{vslug}-{n:02d}"
        im = Image.open(j['saida']).convert('RGB')
        im.resize((1600, 2400), Image.LANCZOS).save(os.path.join(out, nome + '.webp'), 'WEBP', quality=86, method=6)
        im.resize((1000, 1500), Image.LANCZOS).save(os.path.join(out, nome + '-1000.webp'), 'WEBP', quality=84, method=6)
        sem_modelo = code.startswith('FX') and code != 'FX1'
        quem = '' if sem_modelo else ' vestida por modelo masculino'
        alt = (f"{prod['nome_curto']} {pub['estampa_nome']} {cor_pt}{quem}, {vpt} — "
               f"{prod['tecido_alt']}, {pub['marca']}")
        imagens.append(dict(arquivo=nome + '.webp', arquivo_1000=nome + '-1000.webp', cor=j['variante'], vista=code,
                            alt=alt[:180], title=f"{prod['nome_curto']} {pub['estampa_nome']} {cor_pt} | {pub['marca']}",
                            legenda=f"{prod['nome_curto']} {pub['estampa_nome']} na cor {cor_pt} — {vpt}.",
                            principal=(code == 'F1')))
    seo = dict(produto=pk, estampa=pub['estampa_nome'], slug_pagina=f"{base}-{slugify(prod['tecido_curto'])}",
               imagens=imagens)
    for cor in ('branca', 'preta'):
        seo[f'pagina_{cor}'] = dict(
            slug=f"{base}-{cor}", h1=f"{prod['nome_curto']} {pub['estampa_nome']} {cor.capitalize()}",
            title=(lambda t1, t2: t1 if len(t1) <= 62 else t2)(
                f"{prod['nome_curto']} {pub['estampa_nome']} {cor.capitalize()} | {prod['tecido_title']} | {pub['marca']}",
                f"{prod['nome_curto']} {pub['estampa_nome']} {cor.capitalize()} | {pub['marca']}"),
            meta_description=(prod['meta'].format(cor=cor, estampa=pub['estampa_nome']))[:158])
    json.dump(seo, open(os.path.join(out, 'seo.json'), 'w'), ensure_ascii=False, indent=1)
    md = [f"# {prod['nome_curto']} {pub['estampa_nome']} — {pub['marca']}\n"]
    for cor in ('branca', 'preta'):
        p = seo[f'pagina_{cor}']
        md.append(f"## Versão {cor}\n\n- **URL:** `/{p['slug']}`\n- **Title:** {p['title']}\n- **Meta description:** {p['meta_description']}\n- **H1:** {p['h1']}\n")
    md.append("## Descrição curta\n\n" + prod['curta'].format(estampa=pub['estampa_nome']) + "\n")
    md.append("## Descrição longa\n\n" + prod['longa'].format(estampa=pub['estampa_nome'], estampa_desc=pub['estampa_desc']) + "\n")
    md.append("## Destaques\n\n" + '\n'.join('- ' + b for b in prod['bullets']) + "\n")
    md.append("## Ficha técnica\n\n| Item | Valor |\n|---|---|\n" + '\n'.join(f"| {k} | {v} |" for k, v in prod['ficha']) + "\n")
    md.append("## Tabela de medidas (cm)\n\n| " + ' | '.join(prod['medidas'][0]) + " |\n|" + '---|' * len(prod['medidas'][0]) + "\n" +
              '\n'.join('| ' + ' | '.join(str(c) for c in r) + ' |' for r in prod['medidas'][1:]) +
              f"\n\n{prod['medidas_nota']}\n")
    md.append("## Cuidados\n\n" + '\n'.join('- ' + c for c in prod['cuidados']) + "\n")
    md.append("## Imagens (ordem da galeria)\n\n| Arquivo | Alt |\n|---|---|\n" + '\n'.join(f"| `{i['arquivo']}` | {i['alt']} |" for i in imagens) + "\n")
    md.append("## Palavras-chave\n\n" + ', '.join(prod['keywords']) + "\n")
    open(os.path.join(out, 'descricao.md'), 'w').write('\n'.join(md))
    print(f"{len(imagens)} imagens + seo.json + descricao.md → {os.path.relpath(out, ROOT)}")

if __name__ == '__main__':
    main(sys.argv[1].upper(), sys.argv[2])
