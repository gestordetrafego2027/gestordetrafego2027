/* ============================================================
   INSIDE OUT — Masterclass On-demand · interactions
   Versão sem slider, countdown ou modal — CTA vai direto ao checkout.
   ============================================================ */
(function(){
  'use strict';
  const $ = (s,c)=> (c||document).querySelector(s);
  const $$ = (s,c)=> [...(c||document).querySelectorAll(s)];

  const EASE = 'cubic-bezier(.76,0,.24,1)';
  const canAnim = ('animate' in Element.prototype) &&
    !matchMedia('(prefers-reduced-motion:reduce)').matches;

  function animIn(el, from, dur, delay){
    if(!canAnim || !el) return;
    el.animate([from, {opacity:1, transform:'none'}],
      {duration:dur, easing:EASE, delay:delay||40, fill:'none'});
  }

  /* ---- hero title entrance ---- */
  document.body.classList.add('loaded');
  $$('.hero-title .line span').forEach((sp,i)=>
    animIn(sp, {opacity:1, transform:'translateY(112%)'}, 1000, 90 + i*90));

  /* ---- nav scroll ---- */
  window.addEventListener('scroll', ()=>{
    document.documentElement.style.setProperty('--sy', window.scrollY);
  }, {passive:true});

  /* ---- fullscreen menu ---- */
  const menu = $('#menu');
  const openMenu = ()=>{
    if(!menu) return;
    menu.classList.add('open');
    $$('#menu .menu-list a').forEach((a,i)=>
      animIn(a, {opacity:0, transform:'translateY(45%)'}, 520, 60 + i*55));
  };
  const closeMenu = ()=> menu && menu.classList.remove('open');
  const burger = $('#burger');
  const menuClose = $('#menuClose');
  if(burger) burger.addEventListener('click', openMenu);
  if(menuClose) menuClose.addEventListener('click', closeMenu);
  $$('#menu a[href^="#"]').forEach(a=> a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMenu(); });

  /* ---- smooth scroll ---- */
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length < 2) return;
      const t = document.querySelector(id);
      if(!t) return;
      e.preventDefault();
      window.scrollTo({
        top: t.getBoundingClientRect().top + window.scrollY - 10,
        behavior: 'smooth'
      });
    });
  });

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

})();
