'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

type Attachment = {
  id: string
  storage_path: string
  file_name: string
  mime_type: string | null
  size_bytes: number | null
  kind: string
  created_at: string
  description: string | null
}

const KINDS = [
  { v: 'contract', l: 'Contrato' },
  { v: 'brief', l: 'Briefing' },
  { v: 'logo', l: 'Logo' },
  { v: 'reference', l: 'Referência' },
  { v: 'invoice', l: 'NF / Fatura' },
  { v: 'other', l: 'Outro' },
]

const fmtSize = (n: number | null) => {
  if (!n) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

export default function Attachments({
  initial,
  leadId,
  clientId,
}: {
  initial: Attachment[]
  leadId?: string
  clientId?: string
}) {
  const [items, setItems] = useState<Attachment[]>(initial)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const file = fd.get('file') as File | null
    const kind = String(fd.get('kind') ?? 'other')
    const description = String(fd.get('description') ?? '').trim() || null
    if (!file || file.size === 0) {
      setError('Selecione um arquivo.')
      return
    }
    setBusy(true)

    const supabase = createClient()
    const ext = file.name.includes('.') ? file.name.split('.').pop() : ''
    const folder = leadId ? `leads/${leadId}` : `clients/${clientId}`
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext ? '.' + ext : ''}`

    const { error: upErr } = await supabase.storage
      .from('crm-assets')
      .upload(path, file, { contentType: file.type })
    if (upErr) {
      setError(upErr.message)
      setBusy(false)
      return
    }

    const { data: row, error: insErr } = await supabase
      .from('attachments')
      .insert({
        lead_id: leadId ?? null,
        client_id: clientId ?? null,
        kind,
        storage_path: path,
        file_name: file.name,
        mime_type: file.type || null,
        size_bytes: file.size,
        description,
      })
      .select('id, storage_path, file_name, mime_type, size_bytes, kind, created_at, description')
      .single()

    if (insErr || !row) {
      setError(insErr?.message ?? 'Falha ao registrar anexo.')
      // tenta remover o arquivo upadado
      await supabase.storage.from('crm-assets').remove([path])
      setBusy(false)
      return
    }
    setItems((prev) => [row as Attachment, ...prev])
    form.reset()
    setBusy(false)
  }

  async function handleDownload(att: Attachment) {
    const supabase = createClient()
    const { data, error: e } = await supabase.storage
      .from('crm-assets')
      .createSignedUrl(att.storage_path, 60 * 5) // 5 min
    if (e || !data) {
      alert(e?.message ?? 'erro ao gerar link')
      return
    }
    window.open(data.signedUrl, '_blank', 'noopener')
  }

  async function handleDelete(att: Attachment) {
    if (!confirm(`Excluir "${att.file_name}"?`)) return
    const supabase = createClient()
    const { error: dbErr } = await supabase.from('attachments').delete().eq('id', att.id)
    if (dbErr) {
      alert(dbErr.message)
      return
    }
    await supabase.storage.from('crm-assets').remove([att.storage_path])
    setItems((prev) => prev.filter((x) => x.id !== att.id))
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleUpload} className="space-y-2 border-b border-neutral-100 pb-3 mb-3">
        <div className="flex gap-2">
          <input type="file" name="file" required className="text-xs flex-1" />
          <select
            name="kind"
            defaultValue="other"
            className="rounded border border-neutral-200 px-2 py-1 text-xs"
          >
            {KINDS.map((k) => (
              <option key={k.v} value={k.v}>
                {k.l}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="description"
          placeholder="Descrição (opcional)"
          className="w-full rounded border border-neutral-200 px-2 py-1 text-xs"
        />
        <button
          disabled={busy}
          type="submit"
          className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700 disabled:opacity-50"
        >
          {busy ? 'Enviando…' : '+ Adicionar anexo'}
        </button>
        {error && <div className="text-xs text-rose-600">{error}</div>}
      </form>

      <ul className="space-y-1 text-sm">
        {items.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-2 border-b border-neutral-100 py-1"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(a)}
                  className="font-medium text-blue-600 hover:underline truncate text-left"
                >
                  {a.file_name}
                </button>
                <span className="text-[10px] uppercase rounded bg-neutral-100 px-1.5 py-0.5">
                  {a.kind}
                </span>
              </div>
              <div className="text-xs text-neutral-500">
                {fmtSize(a.size_bytes)} · {new Date(a.created_at).toLocaleDateString('pt-BR')}
                {a.description && ` · ${a.description}`}
              </div>
            </div>
            <button
              onClick={() => handleDelete(a)}
              className="text-xs text-rose-600 hover:underline shrink-0"
            >
              excluir
            </button>
          </li>
        ))}
        {!items.length && <li className="text-xs text-neutral-400 italic">Nenhum anexo.</li>}
      </ul>
    </div>
  )
}
