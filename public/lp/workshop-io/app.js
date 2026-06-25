/* ============================================================
   INSIDE OUT — interactions
   ============================================================ */
(function(){
  'use strict';
  const $ = (s,c)=> (c||document).querySelector(s);
  const $$ = (s,c)=> [...(c||document).querySelectorAll(s)];

  const EASE = 'cubic-bezier(.76,0,.24,1)';
  const canAnim = ('animate' in Element.prototype) && !matchMedia('(prefers-reduced-motion:reduce)').matches;
  // WAAPI helper: start-delay + fill:none means a frozen-at-t0 timeline
  // rests on the visible BASE (no hidden first frame in screenshots/print).
  function animIn(el, from, dur, delay){
    if(!canAnim) return;
    el.animate([from, {opacity:1, transform:'none'}], {duration:dur, easing:EASE, delay:delay||40, fill:'none'});
  }

  /* ---- hero title entrance ---- */
  document.body.classList.add('loaded');
  $$('.hero-title .line span').forEach((sp,i)=> animIn(sp, {opacity:1, transform:'translateY(112%)'}, 1000, 90 + i*90));

  /* ---- nav scroll state ---- */
  const nav = $('#nav');
  const onScroll = ()=>{ document.documentElement.style.setProperty('--sy', window.scrollY); };
  window.addEventListener('scroll', onScroll, {passive:true});

  /* ---- fullscreen menu ---- */
  const menu = $('#menu');
  const openMenu = ()=>{
    menu.classList.add('open');
    $$('#menu .menu-list a').forEach((a,i)=> animIn(a, {opacity:0, transform:'translateY(45%)'}, 520, 60 + i*55));
  };
  const closeMenu = ()=> menu.classList.remove('open');
  $('#burger').addEventListener('click', openMenu);
  $('#menuClose').addEventListener('click', closeMenu);
  $$('#menu a[href^="#"]').forEach(a=> a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeMenu(); closeModal(); } });

  /* ---- smooth scroll ---- */
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length<2) return;
      const t = document.querySelector(id);
      if(!t) return;
      e.preventDefault();
      window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - 10, behavior:'smooth'});
    });
  });

  /* ---- hero slider ---- */
  const slides = $$('.hero-slide');
  let si = 0, sTimer;
  const numEl = $('#slideNum');
  const pad = n=> String(n).padStart(2,'0');
  function go(n){
    slides[si].classList.remove('active');
    si = (n + slides.length) % slides.length;
    slides[si].classList.add('active');
    if(numEl) numEl.textContent = pad(si+1) + ' — ' + pad(slides.length);
  }
  function auto(){ clearInterval(sTimer); sTimer = setInterval(()=> go(si+1), 4600); }
  $('#heroNext')?.addEventListener('click', ()=>{ go(si+1); auto(); });
  $('#heroPrev')?.addEventListener('click', ()=>{ go(si-1); auto(); });
  auto();

  /* ---- rotating taglines ---- */
  const rotEl = $('#rot');
  const phrases = [
    'Onde a criação encontra a execução',
    'Da concepção à execução',
    'Da essência à imagem',
    'Aesthetic is a decision'
  ];
  let ri = 0;
  setInterval(()=>{
    if(!rotEl) return;
    ri = (ri+1) % phrases.length;
    rotEl.textContent = phrases[ri];          // instant, always-visible swap
    animIn(rotEl, {opacity:0, transform:'translateY(70%)'}, 520, 20); // live polish only
  }, 3400);

  /* ---- countdown ---- */
  // Edit 2 — São Paulo. Data confirmada: 05/09/2026 09:00 BRT
  const TARGET = new Date('2026-09-05T09:00:00-03:00').getTime();
  const cd = {
    d: $('[data-cd="d"]'), h: $('[data-cd="h"]'),
    m: $('[data-cd="m"]'), s: $('[data-cd="s"]')
  };
  function tick(){
    let diff = Math.max(0, TARGET - Date.now());
    const d = Math.floor(diff/864e5); diff -= d*864e5;
    const h = Math.floor(diff/36e5); diff -= h*36e5;
    const m = Math.floor(diff/6e4); diff -= m*6e4;
    const s = Math.floor(diff/1e3);
    if(cd.d) cd.d.textContent = pad(d);
    if(cd.h) cd.h.textContent = pad(h);
    if(cd.m) cd.m.textContent = pad(m);
    if(cd.s) cd.s.textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);

  /* ---- reveal on scroll (WAAPI; base stays visible) ---- */
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(en=>{
      if(en.isIntersecting){
        const d = parseInt(en.target.getAttribute('data-reveal-d')||'0',10) * 80;
        animIn(en.target, {opacity:0, transform:'translateY(26px)'}, 880, 40 + d);
        io.unobserve(en.target);
      }
    });
  }, {threshold:.1, rootMargin:'0px 0px -8% 0px'});
  $$('[data-reveal]').forEach(el=> io.observe(el));

  /* ---- vagas bar (freeze-safe: base is filled, grows on view) ---- */
  const vagasBar = $('#vagasBar');
  if(vagasBar){
    const vIo = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{ if(en.isIntersecting){
        if(canAnim) vagasBar.animate([{transform:'scaleX(0)'},{transform:'scaleX(.766)'}],{duration:1400, easing:EASE, delay:60, fill:'none'});
        vIo.disconnect();
      }});
    }, {threshold:.4});
    vIo.observe(vagasBar.closest('.scarcity'));
  }

  /* ---- modal ---- */
  const modal = $('#modal');
  const modalSub = $('#modalSub');
  const formWrap = $('#modalForm');
  const success = $('#modalSuccess');
  const form = $('#form');
  function openModal(plan){
    formWrap.style.display='block'; success.style.display='none';
    if(plan){
      const sel = form.plano;
      [...sel.options].forEach(o=>{ if(o.text.startsWith(plan)) sel.value=o.value; });
      modalSub.textContent = 'Plano ' + plan + ' · Inside Out Edit 2 — SP';
    } else {
      modalSub.textContent = 'Inside Out · Edit 2 — São Paulo';
    }
    modal.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeModal(){ modal.classList.remove('open'); document.body.style.overflow=''; }
  $$('[data-reserve]').forEach(b=> b.addEventListener('click', e=>{ e.preventDefault(); openModal(b.dataset.plan); }));
  $$('[data-close]').forEach(b=> b.addEventListener('click', closeModal));

  /* ---- método de pagamento ---- */
  const methodBtns = $$('[data-method]', form.closest('.modal-card'));
  let selectedMethod = 'card';
  function setMethodActive(active){
    methodBtns.forEach(b=>{
      const on = b===active;
      b.style.background = on ? '#14140e' : 'transparent';
      b.style.color = on ? '#efe9da' : '#14140e';
      b.style.borderColor = on ? '#14140e' : '#ddd6c8';
    });
  }
  setMethodActive(methodBtns[0]);
  methodBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      selectedMethod = btn.dataset.method;
      setMethodActive(btn);
    });
  });

  /* ---- form validation + checkout ---- */
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function setErr(input, on){ input.closest('.field').classList.toggle('err', on); }
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    let ok = true;
    const nome = form.nome, email = form.email, fone = form.fone;
    if(nome.value.trim().length < 2){ setErr(nome,true); ok=false; } else setErr(nome,false);
    if(!reEmail.test(email.value.trim())){ setErr(email,true); ok=false; } else setErr(email,false);
    const digits = fone.value.replace(/\D/g,'');
    if(digits.length < 10){ setErr(fone,true); ok=false; } else setErr(fone,false);
    if(!ok){
      const f = form.querySelector('.field.err');
      if(f) f.querySelector('input').focus();
      return;
    }

    // Determina plano selecionado
    const planText = form.plano.value; // ex: "Pro — R$ 2.800"
    const plan = planText.split(' ')[0]; // "Insider" | "Pro" | "Executivo"

    const submitBtn = form.querySelector('[type=submit]');
    if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Aguarde…'; }

    try {
      const res = await fetch('/api/workshop/checkout/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: nome.value.trim(),
          email: email.value.trim(),
          phone: digits,
          plan,
          method: selectedMethod,
        }),
      });
      const data = await res.json();
      if(!res.ok || !data.url) throw new Error(data.error || 'Erro ao iniciar pagamento.');
      window.location.href = data.url;
    } catch(err){
      if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Confirmar inscrição'; }
      const errEl = form.querySelector('.form-error');
      if(errEl){ errEl.textContent = err.message; errEl.style.display='block'; }
      else { alert(err.message); }
    }
  });
  form.querySelectorAll('input').forEach(inp=>{
    inp.addEventListener('input', ()=> inp.closest('.field').classList.remove('err'));
  });

  /* phone mask (BR) */
  const fone = form.fone;
  fone.addEventListener('input', ()=>{
    let v = fone.value.replace(/\D/g,'').slice(0,11);
    if(v.length>6) v = '('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);
    else if(v.length>2) v = '('+v.slice(0,2)+') '+v.slice(2);
    else if(v.length>0) v = '('+v;
    fone.value = v;
  });

})();
