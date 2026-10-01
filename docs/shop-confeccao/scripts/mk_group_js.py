"""Gera o JS que gera um grupo de jobs no Magnific (as referências já devem estar anexadas).
Uso: python3 mk_group_js.py <colecao> <Pxx> <id1,id2,...>  → imprime o JS (cole no javascript_tool)."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
col, pk, ids = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
jobs = {j['id']: j for j in json.load(open(os.path.join(ROOT, 'magnific', col, pk, 'jobs.json')))['jobs']}
q = [dict(id=i, prompt=jobs[i]['prompt'], mencoes=jobs[i]['prompt'].count('@img')) for i in ids]
print("window.hmztQueue=" + json.dumps(q, ensure_ascii=False) + ";")
print("window.hmztRun(window.hmztQueue); 'rodando '+window.hmztQueue.length")
