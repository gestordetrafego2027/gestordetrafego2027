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
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    [data-aos="fade-up"]   { transform: translateY(32px); }
    [data-aos="fade-down"] { transform: translateY(-32px); }
    [data-aos="fade-left"] { transform: translateX(32px); }
    [data-aos="fade-right"]{ transform: translateX(-32px); }
    [data-aos="zoom-in"]   { transform: scale(0.92); }
    [data-aos].aos-visible { opacity: 1; transform: none; }
  `;
  if (!document.getElementById('aos-native-style')) document.head.appendChild(style);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.aosDelay || '0', 10);
        setTimeout(() => el.classList.add('aos-visible'), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
