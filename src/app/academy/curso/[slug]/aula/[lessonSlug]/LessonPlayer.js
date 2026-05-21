'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

/**
 * Player de aula. Suporta:
 * - vídeo direto (HTML5) — provider 'self' / Supabase Storage
 * - iframe (YouTube/Vimeo) — sem auto-tracking de tempo
 * - tipo 'text' / 'download' / 'quiz' — placeholder
 *
 * Faz upsert em academy_lesson_progress a cada 15s e ao fim.
 */
export default function LessonPlayer({
  lessonId,
  productId,
  videoUrl,
  videoProvider,
  type,
  startAt,
  durationSeconds,
  alreadyCompleted,
}) {
  const supabase = createClient()
  const videoRef = useRef(null)
  const [completed, setCompleted] = useState(alreadyCompleted)

  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return
    const v = videoRef.current
    if (startAt > 0) v.currentTime = startAt

    let lastSave = 0
    const onTime = async () => {
      const t = Math.floor(v.currentTime)
      if (t - lastSave >= 15) {
        lastSave = t
        await save({ last_position_seconds: t })
      }
    }
    const onEnded = async () => {
      await save({
        last_position_seconds: Math.floor(v.duration || durationSeconds),
        completed_at: new Date().toISOString(),
      })
      setCompleted(true)
    }

    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnded)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, type])

  async function save(patch) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('academy_lesson_progress').upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        product_id: productId,
        ...patch,
        last_watched_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    )
  }

  async function markComplete() {
    await save({
      completed_at: new Date().toISOString(),
      last_position_seconds: Math.floor(durationSeconds || 0),
    })
    setCompleted(true)
  }

  // === RENDER por tipo ===
  if (type === 'video' && videoUrl) {
    const isEmbed = videoProvider && videoProvider !== 'self'
    if (isEmbed) {
      const src = transformEmbedUrl(videoProvider, videoUrl)
      return (
        <div className="space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
            <iframe
              src={src}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          <ManualComplete completed={completed} onClick={markComplete} />
        </div>
      )
    }
    return (
      <div className="space-y-3">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          playsInline
          className="aspect-video w-full rounded-2xl bg-black"
        />
        {completed && <p className="text-sm text-emerald-700">✓ Aula concluída</p>}
      </div>
    )
  }

  if (type === 'download' && videoUrl) {
    return (
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-xl bg-neutral-900 px-5 py-3 text-white"
        onClick={markComplete}
      >
        Baixar material
      </a>
    )
  }

  // text / quiz / live sem video — só botão de concluir
  return <ManualComplete completed={completed} onClick={markComplete} />
}

function ManualComplete({ completed, onClick }) {
  if (completed) return <p className="text-sm text-emerald-700">✓ Aula concluída</p>
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-neutral-900 px-5 py-2 text-sm text-white hover:bg-neutral-800"
    >
      Marcar como concluída
    </button>
  )
}

function transformEmbedUrl(provider, url) {
  try {
    if (provider === 'youtube') {
      const m = url.match(/(?:v=|youtu\.be\/)([\w-]+)/)
      if (m) return `https://www.youtube.com/embed/${m[1]}`
    }
    if (provider === 'vimeo') {
      const m = url.match(/vimeo\.com\/(\d+)/)
      if (m) return `https://player.vimeo.com/video/${m[1]}`
    }
  } catch {}
  return url
}
