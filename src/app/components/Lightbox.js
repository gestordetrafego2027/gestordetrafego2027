'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

/**
 * Lightbox — visualizador fullscreen com navegação prev/next.
 *
 * Props:
 *   images  — string[]  lista de srcs em ordem
 *   idx     — number | null   índice da imagem aberta (null = fechado)
 *   onClose — () => void
 *   onNav   — (newIdx: number) => void
 */
export default function Lightbox({ images = [], idx, onClose, onNav }) {
  const total = images.length

  const prev = useCallback(() => {
    if (idx === null || total === 0) return
    onNav((idx - 1 + total) % total)
  }, [idx, total, onNav])

  const next = useCallback(() => {
    if (idx === null || total === 0) return
    onNav((idx + 1) % total)
  }, [idx, total, onNav])

  useEffect(() => {
    if (idx === null) return
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [idx, prev, next, onClose])

  if (idx === null || !images[idx]) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.93)' }}
      onClick={onClose}
    >
      {/* imagem */}
      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-contain"
          alt={`Foto ${idx + 1}`}
        />
      </div>

      {/* fechar */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
        aria-label="Fechar"
      >
        ✕
      </button>

      {/* contador */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest font-light select-none">
        {idx + 1} / {total}
      </div>

      {/* seta anterior */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white text-xl"
          aria-label="Anterior"
        >
          ←
        </button>
      )}

      {/* seta próxima */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white text-xl"
          aria-label="Próxima"
        >
          →
        </button>
      )}
    </div>
  )
}
