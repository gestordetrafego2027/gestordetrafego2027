// Helpers do fluxo HMZT no Magnific — cole inteiro no javascript_tool depois de abrir/recarregar
// https://www.magnific.com/app/ai-image-generator (a página perde tudo ao recarregar).
//
// Sequência:
//   1) cole este arquivo → await hmzt.init()
//   2) formato 2:3 (clique real na opção marcada por hmzt.markAspect('2:3')), modelo Seedream 5 Pro, 1.5K · Fast, ∞ ON
//   3) hmzt.mkInputs() → file_upload dos jobs.json no input "hmzt jobs" → await hmztLoadJobs()
//   4) file_upload das artes de UMA coleção no input "hmzt arts" → hmztLoadArts('<colecao>')
//      (para identidade, suba também a F1 aprovada no mesmo input e use a chave '<colecao>/<arquivo>')
//   5) hmztQueueSteps([[colecao, [refs...], [ids...]], ...]) → acompanhe hmztPipeLog
// Nunca enviar Enter no campo (dispara Gerar). Espera usa MessageChannel (aba em 2º plano não trava).
window.hmzt = {
  sleep: (ms) => new Promise(res => { const c = new MessageChannel(); const t0 = performance.now(); c.port1.onmessage = () => { if (performance.now() - t0 >= ms) { c.port1.close(); res(); } else c.port2.postMessage(0); }; c.port2.postMessage(0); }),
  btns() { return [...document.querySelectorAll('button')]; },
  txt(b) { return (b.innerText || '').trim().replace(/\s+/g, ' '); },
  async init() {
    if (!document.querySelector('meta[name=google][content=notranslate]')) { const m = document.createElement('meta'); m.name = 'google'; m.content = 'notranslate'; document.head.appendChild(m); }   // tradução do Chrome congela a UI (React) e derruba gerações
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
    if (document.body) document.body.setAttribute('translate', 'no');
    await this.sleep(500); return this.state();
  },
  state() {
    const b = this.btns().map(x => this.txt(x)); const ed = document.querySelector('[contenteditable=true]');
    return { traduzida: document.documentElement.className.includes('translated'), modelo: b.find(s => /Seedream|Nano Banana/.test(s)),
      formato: b.find(s => /^\d+:\d+$/.test(s)), resolucao: (r => r && /R[áa]pido|Fast/.test(r) && /^1[.,]5/.test(r) ? '1.5K · Fast' : r)(b.find(s => /K · |mil · /.test(s))), gerar: b.find(s => /^Generate|^Gerar/.test(s)),
      refs: [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && /^@img\d$/.test((e.textContent || '').trim())).map(e => e.textContent.trim()),
      promptLen: ed ? ed.innerText.length : 0, mencoes: ed ? ed.querySelectorAll('.form-rich-input-mention-key').length : 0 };
  },
  async markAspect(ar) { const ab = this.btns().find(x => /^\d+:\d+$/.test(this.txt(x))); ab.click(); await this.sleep(800); const o = this.btns().find(x => this.txt(x).startsWith(ar)); if (!o) return 'opção não encontrada'; o.setAttribute('aria-label', 'hmzt-ar'); return 'marcado ' + ar; },
  async clearRefs() { for (let k = 0; k < 8; k++) { const rm = this.btns().find(b => /^Remove @img\d$/.test(b.getAttribute('aria-label') || '')); if (!rm) break; rm.click(); await this.sleep(700); } return this.state().refs; },
  async insertPrompt(text) {
    const jj = Object.entries(window.hmztJobs || {}).find(([k, v]) => v.prompt === text && k.endsWith('@' + window.hmztCurCol)); window.hmztCurJob = jj ? jj[0] : '';
    const ed = document.querySelector('[contenteditable=true]'); ed.focus(); document.execCommand('selectAll'); document.execCommand('delete');
    for (const p of text.split(/(@img\d)/)) { if (!p) continue; document.execCommand('insertText', false, p); await this.sleep(/^@img\d$/.test(p) ? 300 : 40); }
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); await this.sleep(400); return this.state();
  },
  replace(oldText, newText) { const ed = document.querySelector('[contenteditable=true]'); const w = document.createTreeWalker(ed, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const i = n.data.indexOf(oldText); if (i >= 0) { ed.focus(); const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + oldText.length); const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('insertText', false, newText); return 'ok'; } } return 'NÃO ENCONTRADO'; },
  generate({ mencoes, formato = '2:3', modelo = 'Seedream 5 Pro', resolucao = '1.5K · Fast' }) {
    const st = this.state(); const ed = document.querySelector('[contenteditable=true]');
    const pt = / camiseta | estampa | tecido | letras | fundo /i.test(ed.innerText);
    const gb = this.btns().find(x => /^Generate|^Gerar/.test(this.txt(x)));
    const ok = !pt && st.mencoes === mencoes && st.formato === formato && st.modelo === modelo && st.resolucao === resolucao && /Unlimited|Ilimitad/.test(gb.parentElement.parentElement.innerText);
    if (!ok) return { ABORT: true, st, prompt_em_portugues: pt }; gb.click(); return 'GERANDO';
  },
  mkInputs() {
    for (const [lab, left] of [['hmzt jobs', 20], ['hmzt arts', 40]]) {
      document.querySelectorAll(`[aria-label="${lab}"]`).forEach(e => e.remove());
      const i = document.createElement('input'); i.type = 'file'; i.multiple = true; i.setAttribute('aria-label', lab);
      i.style.cssText = `position:fixed;top:0;left:${left}px;width:10px;height:10px;opacity:.01;z-index:999999`; document.body.appendChild(i);
    }
    return 'inputs prontos (find "hmzt jobs" / "hmzt arts")';
  },
};
window.hmztJobs = window.hmztJobs || {}; window.hmztArts = window.hmztArts || {};
window.hmztLoadJobs = async () => { for (const f of document.querySelector('[aria-label="hmzt jobs"]').files) { const j = JSON.parse(await f.text()); for (const x of j.jobs) hmztJobs[x.id + '@' + j.colecao] = x; } return Object.keys(hmztJobs).length; };
window.hmztLoadArts = (prefix) => { for (const f of document.querySelector('[aria-label="hmzt arts"]').files) hmztArts[prefix + '/' + f.name] = f; return Object.keys(hmztArts).length; };
// A tradução automática do Chrome troca rótulos da página ("Add"→"Adicionar", "1.5K · Fast"→"1,5 mil · Rápido");
// por isso as buscas aceitam os dois idiomas. O diálogo de referências (portal) costuma ficar em inglês.
window.hmztByText = (re, root = document) => { const c = [...root.querySelectorAll('*')].filter(e => re.test((e.textContent || '').trim()) && e.offsetParent !== null); return c.filter(e => !c.some(o => o !== e && e.contains(o)))[0]; };
window.hmztDropLbl = () => [...document.querySelectorAll('*')].find(e => /^(Drop or upload assets|Solte ou (fa[çc]a )?(upload|carregue))/i.test((e.textContent || '').trim()) && (e.textContent || '').trim().length < 40 && e.children.length <= 1);
window.hmztAddRef = async (key) => {
  const f = hmztArts[key]; if (!f) return 'sem arquivo ' + key;
  if (!hmztDropLbl()) { const a = hmztByText(/^(Add|Adicionar)$/); if (!a) return 'sem Add'; a.click(); await hmzt.sleep(2000); }
  const lbl = hmztDropLbl(); if (!lbl) return 'diálogo não abriu';
  const dz = lbl.closest('div.pointer-events-auto') || lbl.parentElement.parentElement; const r = dz.getBoundingClientRect(), dt = new DataTransfer(); dt.items.add(f);
  for (const t of ['dragenter', 'dragover', 'drop']) dz.dispatchEvent(new DragEvent(t, { bubbles: true, cancelable: true, composed: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, dataTransfer: dt }));
  await hmzt.sleep(6000);
  const clr = hmzt.btns().find(b => /^(Clear all|Limpar tudo)/.test(b.innerText.trim())); if (!clr) return 'sem Clear all';
  const ok = [...clr.parentElement.querySelectorAll('button')].find(b => /^(Add|Adicionar)$/.test(b.innerText.trim()));
  ok.click(); await hmzt.sleep(2500); return hmzt.state().refs;
};
// Rede: registra start/render para confirmar que a geração saiu de fato (e que é grátis: force_credits:false)
window.hmztNet = window.hmztNet || []; window.hmztMap = window.hmztMap || {};   // hmztMap: 'job@colecao' → ID da criação (baixar por /app/creation/<id>)
if (!window._hmztOf) { window._hmztOf = window.fetch; window.fetch = async (...a) => { const r = await window._hmztOf(...a); try { const u = String(a[0] && a[0].url || a[0]); if (/start-tti|render\/v4/.test(u)) { const t = await r.clone().text(); const tg = (t.match(/"tags":\[([^\]]*)\]/) || [])[1] || ''; const idf = (t.match(/"identifier":"([A-Za-z0-9]+)"/) || [])[1] || ''; hmztNet.push({ u: u.split('?')[0].split('/').pop(), s: r.status, credits: /"force_credits":true/.test(t), tags: tg, idf, job: window.hmztCurJob || '', t: Date.now() }); if (idf && window.hmztCurJob) hmztMap[window.hmztCurJob] = idf; } } catch (e) {} return r; }; }
window.hmztStarted = (since) => hmztNet.some(x => x.u === 'start-tti-v2' && x.t >= since && x.s === 200);
window.hmztRun = async (q) => { const out = []; const norm = s => s.replace(/@?img\d/g, '').replace(/\s+/g, ''); for (const job of q) { await hmzt.insertPrompt(job.prompt); const ed = document.querySelector('[contenteditable=true]'); if (norm(ed.innerText) !== norm(job.prompt)) { out.push(job.id + ':TEXTO_DIFERENTE'); break; } let g; for (let k = 0; k < 12; k++) { g = hmzt.generate({ mencoes: job.mencoes }); if (g === 'GERANDO') break; await hmzt.sleep(1500); } if (g === 'GERANDO') { for (let tr = 0; tr < 3; tr++) { const t0 = Date.now() - 50; let ok = false; for (let w = 0; w < 20 && !ok; w++) { await hmzt.sleep(500); ok = hmztStarted(t0); } if (ok) break; if (tr === 2) { g = 'NAO_INICIOU'; break; } hmzt.generate({ mencoes: job.mencoes }); } if (hmztNet.some(x => x.credits)) g = 'COBRANCA_DETECTADA'; await hmzt.sleep(2500); const rv = hmztNet.filter(x => x.u === 'v4').pop(); if (rv && rv.tags && !/"2:3"/.test(rv.tags)) g = 'FORMATO_ERRADO ' + rv.tags; } out.push(job.id + ':' + JSON.stringify(g)); if (g !== 'GERANDO') break; await hmzt.sleep(3500); } window.hmztLast = out; return out; };
window.hmztStep = async (col, refs, ids) => { window.hmztCurCol = col; await hmzt.clearRefs(); for (const r of refs) { const x = await hmztAddRef(r); if (typeof x === 'string') return 'ERRO ref ' + r + ': ' + x; } const st = hmzt.state(); if (st.refs.length !== refs.length) return 'ERRO refs ' + JSON.stringify(st.refs); return await hmztRun(ids.map(id => { const x = hmztJobs[id + '@' + col]; return { id, prompt: x.prompt, mencoes: (x.prompt.match(/@img/g) || []).length }; })); };
window.hmztPipeLog = [];
window.hmztQueueSteps = async (steps) => { for (const s of steps) { const r = await hmztStep(s[0], s[1], s[2]); hmztPipeLog.push(JSON.stringify(r)); if (typeof r === 'string' && r.startsWith('ERRO')) break; if (r.some(x => !/GERANDO/.test(x))) break; } hmztPipeLog.push('FIM'); };
'hmzt helpers carregados';
