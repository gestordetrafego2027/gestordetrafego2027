'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Camada 4 — Reveal confiável
 * Garante que o conteúdo sempre aparece: respeita prefers-reduced-motion,
 * usa fallback de 1s para âncoras/navegação rápida (resolve G2).
 */
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setShown(true);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setShown(true), delay);
                io.disconnect();
            }
        }, { rootMargin: '0px 0px -8% 0px' });

        io.observe(el);

        /* fallback: se nunca intersectar (End, âncora, voltar, scroll rápido),
           revela após 1s para garantir que o conteúdo nunca fique invisível */
        const t = setTimeout(() => setShown(true), 1000 + delay);

        return () => { io.disconnect(); clearTimeout(t); };
    }, [delay]);

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
            }}
        >
            {children}
        </Tag>
    );
}
