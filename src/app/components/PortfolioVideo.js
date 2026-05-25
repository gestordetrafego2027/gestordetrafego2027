'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * PortfolioVideo
 * Renderiza um player de vídeo no final da página de projeto (entre o grid
 * de imagens e o CTA). Se o arquivo MP4 não existir (404), o componente se
 * esconde silenciosamente — permitindo rollout gradual: basta subir o arquivo
 * em /public/videos/<unit>/<slug>/projeto.mp4 e o player aparece sozinho.
 *
 * Props:
 *   unit   - 'studio' | 'produtora' | 'agencia' | caminho customizado
 *   slug   - identificador do projeto (ex: 'amanda-oliveira')
 *   src    - (opcional) caminho completo do MP4, sobrescreve unit+slug
 *   poster - (opcional) imagem capa enquanto o vídeo não carrega
 */
export default function PortfolioVideo({ unit, slug, src, poster }) {
  const [available, setAvailable] = useState(null); // null=verificando, true/false=resultado
  const videoRef = useRef(null);

  const url = src || `/videos/${unit}/${slug}/projeto.mp4`;

  useEffect(() => {
    let cancelled = false;
    // HEAD request — barato, só checa se o arquivo existe.
    fetch(url, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setAvailable(r.ok); })
      .catch(() => { if (!cancelled) setAvailable(false); });
    return () => { cancelled = true; };
  }, [url]);

  if (available === false || available === null) return null;

  return (
    <section className="px-8 max-w-[1600px] mx-auto pb-16">
      <div className="border-t border-outline-variant/15 pt-16">
        <div className="mb-8">
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">
            Fashion Film
          </p>
          <h2 className="font-newsreader text-3xl md:text-4xl font-light -tracking-[0.02em] leading-tight text-on-surface">
            Movimento.
          </h2>
        </div>
        <div className="relative w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
          <video
            ref={videoRef}
            src={url}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
