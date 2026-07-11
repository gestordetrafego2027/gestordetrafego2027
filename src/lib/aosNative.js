/**
 * Substituto zero-dependency para AOS.
 * Respeita data-aos="fade-up|fade-in|zoom-in" e data-aos-delay="N".
 * Adicione ao useEffect() no lugar de AOS.init().
 */
export function initAosNative() {
  const style = document.getElementById('aos-native-style') || document.createElement('style');
  style.id = 'aos-native-style';
  style.textContent = `
    [data-aos] {
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.25,0.1,0.25,1), transform 0.5s cubic-bezier(0.25,0.1,0.25,1);
    }
    /* Fotos — aparecem com leveza, leve escala */
    [data-aos="fade-photo"]  { transform: scale(1.02); transition: opacity 0.6s cubic-bezier(0.25,0.1,0.25,1), transform 0.6s cubic-bezier(0.25,0.1,0.25,1); }
    /* Títulos grandes — deslizam com elegância */
    [data-aos="slide-title"] { transform: translateY(20px); transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1); }
    /* Texto pequeno / labels — aparecem no lugar */
    [data-aos="fade-in"]     { transition: opacity 0.45s cubic-bezier(0.25,0.1,0.25,1); }
    /* Legados */
    [data-aos="fade-up"]     { transform: translateY(16px); }
    [data-aos="fade-down"]   { transform: translateY(-16px); }
    [data-aos="fade-left"]   { transform: translateX(16px); }
    [data-aos="fade-right"]  { transform: translateX(-16px); }
    [data-aos="zoom-in"]     { transform: scale(0.97); }
    [data-aos].aos-visible   { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) {
      [data-aos] { transition: none !important; }
      [data-aos].aos-visible { opacity: 1; transform: none; }
    }
  `;
  if (!document.getElementById('aos-native-style')) document.head.appendChild(style);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Cap delay at 150ms para hero elements (data-aos-delay <= 400 → max 150ms)
        const rawDelay = parseInt(el.dataset.aosDelay || '0', 10);
        const delay = rawDelay > 150 ? Math.round(rawDelay * 0.35) : rawDelay;
        setTimeout(() => el.classList.add('aos-visible'), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
