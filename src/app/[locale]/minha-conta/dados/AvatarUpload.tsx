'use client'

import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { uploadAvatar } from './actions'

interface Props {
  avatarUrl: string | null
  displayName: string
}

export function AvatarUpload({ avatarUrl, displayName }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(avatarUrl)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 2 MB.')
      return
    }
    if (!file.type.startsWith('image/')) {
      setError('Selecione um arquivo de imagem.')
      return
    }

    setError(null)
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    const fd = new FormData()
    fd.append('avatar', file)

    startTransition(async () => {
      const result = await uploadAvatar(fd)
      if (result.error) {
        setError(result.error)
        setPreview(avatarUrl)
      }
    })
  }

  return (
    <div className="flex items-center gap-5 mb-6 pb-6 border-b border-neutral-100">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        className="relative w-20 h-20 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity group"
        title="Clique para alterar a foto"
      >
        {preview ? (
          <Image src={preview} alt={displayName} fill className="object-cover" />
        ) : (
          <span className="text-xl font-semibold text-neutral-400">{initials}</span>
        )}
        <span className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
          Alterar
        </span>
        {isPending && (
          <span className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </span>
        )}
      </button>

      <div>
        <p className="text-sm font-medium text-neutral-900">{displayName}</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isPending}
          className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors mt-0.5"
        >
          {isPending ? 'Enviando...' : 'Alterar foto de perfil'}
        </button>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        <p className="text-xs text-neutral-300 mt-1">JPG, PNG ou WebP · máx. 2 MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
