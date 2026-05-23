'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const LOCALES = [
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

export default function LangSwitcher({ textColor = '#fff' }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = LOCALES.find(l => l.code === segments[0])?.code ?? 'pt';
  const current = LOCALES.find(l => l.code === currentLocale);

  const switchLocale = (code) => {
    if (code === currentLocale) { setOpen(false); return; }
    const rest = segments[0] === currentLocale ? segments.slice(1) : segments;
    const newPath = `/${code}${rest.length ? '/' + rest.join('/') : ''}`;
    router.push(newPath);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" style={{ zIndex: 9999 }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 font-label text-[10px] uppercase tracking-[0.15em] hover:opacity-70 transition-opacity duration-200 select-none"
        style={{ color: textColor, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
        aria-label="Selecionar idioma"
      >
        <span>{current?.flag}</span>
        <span>{current?.label}</span>
        <svg
          width="8" height="5" viewBox="0 0 8 5" fill="none"
          style={{ marginLeft: 2, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 py-1 min-w-[90px] bg-white shadow-lg border border-zinc-100"
          style={{ borderRadius: 0 }}
        >
          {LOCALES.map(l => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className="w-full flex items-center gap-2 px-4 py-2 text-[11px] font-label uppercase tracking-wider hover:bg-zinc-50 transition-colors"
              style={{
                color: l.code === currentLocale ? '#000' : '#666',
                fontWeight: l.code === currentLocale ? '600' : '400',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {l.code === currentLocale && (
                <span style={{ marginLeft: 'auto', fontSize: 8 }}>●</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
