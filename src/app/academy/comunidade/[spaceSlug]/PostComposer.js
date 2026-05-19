'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'

export default function PostComposer({ spaceId }) {
  const supabase = createClient()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(null)

  async function submit(e) {
    e.preventDefault()
    if (!body.trim()) return
    setBusy(true)
    setErr(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setBusy(false); setErr('Não autenticado.'); return }

    const { error } = await supabase.from('academy_posts').insert({
      space_id: spaceId,
      author_user_id: user.id,
      type: 'text',
      status: 'published',
      title: title.trim() || null,
      body_md: body.trim(),
    })
    setBusy(false)
    if (error) { setErr(error.message); return }
    setTitle('')
    setBody('')
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-neutral-200 bg-white p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título (opcional)"
        className="w-full border-b border-neutral-100 px-2 py-2 text-sm outline-none focus:border-neutral-900"
        maxLength={200}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Compartilhe algo com a comunidade…"
        className="mt-2 w-full resize-none px-2 py-2 text-sm outline-none"
        rows={4}
      />
      {err && <p className="mt-2 text-xs text-rose-700">{err}</p>}
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={busy || !body.trim()}
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {busy ? 'Publicando…' : 'Publicar'}
        </button>
      </div>
    </form>
  )
}
