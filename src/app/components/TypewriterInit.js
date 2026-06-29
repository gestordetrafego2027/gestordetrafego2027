'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Applies typewriter to all .hmzt-hero-title elements that render static text
// (landing pages). Slide-based heroes use <TypewriterText> directly.
export default function TypewriterInit() {
  const pathname = usePathname();

  useEffect(() => {
    const timers = [];
    const observers = [];

    const animate = (el) => {
      const text = el.dataset.twText || el.textContent;
      el.dataset.twText = text;
      el.textContent = '';

      const cursor = document.createElement('span');
      cursor.className = 'hmzt-cursor';
      cursor.textContent = '|';
      el.appendChild(cursor);

      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.insertBefore(document.createTextNode(text[i++]), cursor);
          timers.push(setTimeout(type, 30));
        } else {
          cursor.remove();
        }
      };
      // Delay to let fade-in animation play first
      timers.push(setTimeout(type, 400));
    };

    // Only target elements NOT inside [data-tw-slide] (handled by TypewriterText)
    const els = [...document.querySelectorAll('.hmzt-hero-title:not([data-tw-slide])')];
    els.forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              obs.disconnect();
              animate(el);
            }
          });
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      timers.forEach(clearTimeout);
      observers.forEach((o) => o.disconnect());
      // Restore original text on cleanup (route change)
      els.forEach((el) => {
        if (el.dataset.twText) el.textContent = el.dataset.twText;
      });
    };
  }, [pathname]);

  return null;
}
