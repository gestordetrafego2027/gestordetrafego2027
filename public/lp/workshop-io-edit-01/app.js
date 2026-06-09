/* ============================================================
   INSIDE OUT · EDIT 01 — interactions
   ============================================================ */
(function(){
  'use strict';
  const $ = (s,c)=> (c||document).querySelector(s);
  const $$ = (s,c)=> [...(c||document).querySelectorAll(s)];
  const EASE = 'cubic-bezier(.76,0,.24,1)';
  const canAnim = ('animate' in Element.prototype) && !matchMedia('(prefers-reduced-motion:reduce)').matches;

  function animIn(el, from, dur, delay){
    if(!canAnim) return;
    el.animate([from, {opacity:1, transform:'none'}], {duration:dur, easing:EASE, delay:delay||40, fill:'none'});
  }

  /* ---- hero entrance ---- */
  document.body.classList.add('loaded');
  $$('.hero-title .line span').forEach((sp,i)=> animIn(sp, {opacity:1, transform:'translateY(112%)'}, 1000, 90 + i*90));

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
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMenu(); });

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

  /* ---- scroll reveal ---- */
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

  /* ---- video embed ---- */
  const videoPlaceholder = $('#videoPlaceholder');
  const videoFrame = $('#videoFrame');
  if(videoPlaceholder && videoFrame){
    const ytId = videoFrame.dataset.ytid;
    if(ytId){
      videoPlaceholder.addEventListener('click', ()=>{
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.allowFullscreen = true;
        videoFrame.appendChild(iframe);
        videoPlaceholder.style.display = 'none';
      });
    }
  }

  /* ---- counter animado ---- */
  const nums = $$('.num-item .v[data-count]');
  if(nums.length){
    const counterIo = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        if(!en.isIntersecting) return;
        const el = en.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1200;
        const start = performance.now();
        function step(now){
          const p = Math.min((now-start)/dur, 1);
          const ease = 1 - Math.pow(1-p, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if(p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        counterIo.unobserve(el);
      });
    }, {threshold:.4});
    nums.forEach(el=> counterIo.observe(el));
  }

})();
