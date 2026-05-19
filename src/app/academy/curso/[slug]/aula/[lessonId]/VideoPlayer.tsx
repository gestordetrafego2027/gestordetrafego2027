'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Player simples que detecta YouTube/Vimeo (iframe) ou MP4 direto (<video>).
 * Para vídeos nativos faz ping de progresso a cada 15s via fetch para
 * /api/academy/lesson-progress (rota interna). Para YouTube/Vimeo o usuário
 * marca manualmente como completo.
 */
export default function VideoPlayer({
  videoUrl,
  videoProvider,
  lessonId,
  productId,
  initialPositionSeconds,
}: {
  videoUrl: string | null
  videoProvider: string | null
  lessonId: string
  productId: string
  initialPositionSeconds: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)

  // Detecta provider se não veio explícito
  const provider = videoProvider ?? detectProvider(videoUrl ?? '')

  // Ping de progresso a cada 15s (apenas vídeo nativo)
  useEffect(() => {
    if (provider !== 'mp4' && provider !== 'native') return
    const v = videoRef.current
    if (!v) return

    if (initialPositionSeconds > 0 && initialPositionSeconds < (v.duration || Infinity)) {
      v.currentTime = initialPositionSeconds
    }

    let lastPing = 0
    const ping = async () => {
      const pos = v.currentTime
      if (Math.abs(pos - lastPing) < 5) return
      lastPing = pos
      try {
        await fetch('/api/academy/lesson-progress', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ lesson_id: lessonId, product_id: productId, position: pos }),
        })
      } catch { /* silent */ }
    }
    const id = setInterval(ping, 15000)
    return () => clearInterval(id)
  }, [provider, lessonId, productId, initialPositionSeconds])

  if (!videoUrl) {
    return (
      <div className="aspect-video bg-neutral-900 text-neutral-400 flex items-center justify-center text-sm rounded">
        Esta aula ainda não tem vídeo.
      </div>
    )
  }

  if (provider === 'youtube') {
    const embed = toYouTubeEmbed(videoUrl)
    return (
      <div className="aspect-video bg-black rounded overflow-hidden">
        <iframe
          src={embed}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (provider === 'vimeo') {
    const embed = toVimeoEmbed(videoUrl)
    return (
      <div className="aspect-video bg-black rounded overflow-hidden">
        <iframe
          src={embed}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // MP4 nativo
  return (
    <div className="aspect-video bg-black rounded overflow-hidden relative">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        preload="metadata"
        className="w-full h-full"
        onError={() => setError('Não foi possível carregar o vídeo.')}
      />
      {error && (
        <div className="absolute inset-0 bg-black/80 text-white flex items-center justify-center text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

function detectProvider(url: string): 'youtube' | 'vimeo' | 'mp4' | 'native' {
  if (!url) return 'native'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('vimeo.com')) return 'vimeo'
  if (url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i)) return 'mp4'
  return 'native'
}

function toYouTubeEmbed(url: string): string {
  // youtu.be/<ID>
  let m = url.match(/youtu\.be\/([\w-]+)/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  // youtube.com/watch?v=<ID>
  m = url.match(/[?&]v=([\w-]+)/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  // já embed
  if (url.includes('/embed/')) return url
  return url
}

function toVimeoEmbed(url: string): string {
  const m = url.match(/vimeo\.com\/(\d+)/)
  if (m) return `https://player.vimeo.com/video/${m[1]}`
  return url
}
