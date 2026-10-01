"""Pós-processamento de um job do lookbook, depois do download do Magnific.

Uso:
    python3 post_job.py <colecao> <Pxx> <job_id> [--arquivo ~/Downloads/magnific_x.png] [--box x0 y0 x1 y1]
                        [--sem-trava] [--status aprovado|aguardando_aprovacao] [--obs "texto"]

Sem --arquivo, pega o magnific_*.png mais recente de ~/Downloads.
1. Move o download para lookbook/<colecao>/<Pxx>/<cor>/_tentativas/<job>_tN.png
2. Aplica a trava de fidelidade (arte original no lugar da estampa da IA), exceto com --sem-trava
3. Upscale para o master 1600×2400 (2:3) e salva em `saida` do job
4. Atualiza jobs.json e imprime o caminho de um recorte de conferência da estampa
"""
import argparse, glob, json, os, shutil, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import fidelity_lock as FL

MASTER = (1600, 2400)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('colecao'); ap.add_argument('produto'); ap.add_argument('job')
    ap.add_argument('--arquivo'); ap.add_argument('--box', type=int, nargs=4)
    ap.add_argument('--sem-trava', action='store_true')
    ap.add_argument('--profundo', action='store_true', help='limpeza ampla de resíduos')
    ap.add_argument('--posicao', default='peito-esquerdo')
    ap.add_argument('--status', default='aprovado')
    ap.add_argument('--obs', default='')
    ap.add_argument('--apagar', type=int, nargs='+', help='caixas extras (4 números cada) onde a IA desenhou restos da arte — apaga antes de colar')
    ap.add_argument('--auto', action='store_true', help='une todos os grupos de tinta da IA numa caixa e cola a arte inteira')
    ap.add_argument('--suave', action='store_true', help='cola sem preencher tecido (usa --box ou --partes)')
    ap.add_argument('--partes', type=int, nargs='+', help='caixas por parte (4 números cada, ordem do split_art)')
    a = ap.parse_args()

    jp = os.path.join(ROOT, 'magnific', a.colecao, a.produto, 'jobs.json')
    data = json.load(open(jp))
    job = next(j for j in data['jobs'] if j['id'] == a.job)

    import time
    if a.arquivo:
        src = a.arquivo
    else:
        # SEGURANÇA: só aceita download feito nos últimos 90 s — nunca pega arquivo antigo do usuário
        recentes = [f for f in glob.glob(os.path.expanduser('~/Downloads/magnific_*'))
                    if time.time() - os.path.getmtime(f) < 90 and 'RECUPERADO' not in f]
        if not recentes:
            sys.exit('ERRO: nenhum download do Magnific nos últimos 90 s — o download não chegou (Chrome pode estar bloqueando vários downloads). Nada foi alterado.')
        src = max(recentes, key=os.path.getmtime)
    n = job.get('tentativas', 0) + 1
    tdir = os.path.join(os.path.dirname(job['saida']), '_tentativas')
    os.makedirs(tdir, exist_ok=True)
    raw = os.path.join(tdir, f"{a.job}_t{n}.png")
    im0 = Image.open(src)
    if abs(im0.width / im0.height - 2 / 3) > 0.01:
        sys.exit(f'ERRO: {os.path.basename(src)} tem {im0.width}x{im0.height}, não é 2:3 — não é deste job. Nada foi alterado.')
    im0.convert('RGB').save(raw)
    if a.arquivo is None:
        os.remove(src)   # só o download recém-baixado deste job

    locked = raw.replace('.png', '_lock.png')
    if a.apagar:
        _im = Image.open(raw).convert('RGB')
        for i in range(0, len(a.apagar), 4):
            _im = FL.erase_ink(_im, tuple(a.apagar[i:i+4]), job['variante'], grow=12, estrito=True)
        raw = raw.replace('.png', '_limpa.png'); _im.save(raw)
    side = job['lado_estampa']
    if a.sem_trava or side == 'sem estampa' or not job['referencias']:
        shutil.copy(raw, locked)
    else:
        cfgp = os.path.join(ROOT, 'artes', a.colecao, 'config.json')
        cfg = json.load(open(cfgp)) if os.path.exists(cfgp) else {}
        lado = 'back' if side == 'back' else 'front'
        uniao = lado in cfg.get('uniao', [])
        pos = a.posicao if lado == 'front' else 'centro'
        if cfg and lado == 'front':
            pos = 'peito-esquerdo' if ("LEFT chest" in cfg['frente']['pos'] or "LEFT side" in cfg['frente']['pos']) else 'centro'
        if a.auto:
            reg = (0.10, 0.14, 0.90, 0.80) if lado == 'back' else (0.08, 0.22, 0.92, 0.80)
            print('caixa', FL.lock_auto2(raw, job['referencias'][0], locked, job['variante'], reg, True, costas=(lado == 'back')))
        elif a.suave:
            bx = [tuple(a.partes[i:i+4]) for i in range(0, len(a.partes), 4)] if a.partes else [tuple(a.box)]
            FL.lock_soft(raw, job['referencias'][0], locked, job['variante'], bx)
        elif a.partes:
            FL.lock_boxes(raw, job['referencias'][0], locked, job['variante'], [tuple(a.partes[i:i+4]) for i in range(0, len(a.partes), 4)])
        elif uniao and not a.box:
            reg = (0.12, 0.20, 0.88, 0.93) if lado == 'back' else (0.18, 0.25, 0.85, 0.92)
            FL.lock_parts(raw, job['referencias'][0], locked, job['variante'], reg, True)
        else:
            FL.lock(raw, job['referencias'][0], locked, job['variante'], tuple(a.box) if a.box else None, True, pos,
                    detalhe=('detail' in side or 'Detalhe' in job['foto']), profundo=a.profundo, lado=lado)

    im = Image.open(locked).convert('RGB')
    w, h = im.size
    if abs(w / h - 2 / 3) > 0.01:
        print(f'⚠️ proporção {w}x{h} não é 2:3 — conferir o formato no Magnific')
    im.resize(MASTER, Image.LANCZOS).save(job['saida'])

    # recorte de conferência (região do peito)
    qa = os.path.join(tdir, f"{a.job}_t{n}_qa.png")
    m = Image.open(job['saida'])
    m.crop((int(MASTER[0] * .35), int(MASTER[1] * .28), int(MASTER[0] * .85), int(MASTER[1] * .60))).save(qa)

    job.update(tentativas=n, status=a.status, arquivo=job['saida'],
               modelo_usado='Seedream 5 Pro 1.5K Fast 2:3 + trava de fidelidade + upscale 1600×2400',
               observacoes=(job.get('observacoes', '') + ' ' + a.obs).strip())
    json.dump(data, open(jp, 'w'), ensure_ascii=False, indent=1)
    done = sum(1 for j in data['jobs'] if j['status'] in ('aprovado', 'aguardando_aprovacao'))
    print(f"OK {a.job} → {os.path.relpath(job['saida'], ROOT)} | conferência: {qa} | {done}/{len(data['jobs'])} prontos")

if __name__ == '__main__':
    main()
