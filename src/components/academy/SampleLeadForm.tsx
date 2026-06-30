'use client'

import { useState, FormEvent } from 'react'

/**
 * Form de captura do capítulo 1 grátis (Vol.03 Briefing Mal Passado).
 * POST → /api/sample/briefing-mal-passado · envia signed URL por email.
 */
export function SampleLeadForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrMsg(null)
    try {
      const res = await fetch('/api/sample/briefing-mal-passado', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, name: name || null }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrMsg(data?.error ?? 'Não foi possível enviar agora. Tente em instantes.')
        return
      }
      setStatus('sent')
    } catch {
      setStatus('error')
      setErrMsg('Falha de conexão. Tente novamente.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-[var(--rule)] bg-white p-10 text-center">
        <p className="bmp-tag mb-4" style={{ color: 'var(--blood)' }}>
          ● Enviado
        </p>
        <p
          className="font-headline text-2xl md:text-3xl text-[var(--ink)]"
          style={{ fontWeight: 500, lineHeight: 1.2 }}
        >
          O capítulo 1 está a caminho do seu e-mail.
        </p>
        <p className="font-body text-sm text-neutral-500 mt-4">
          Se não chegar em 2 minutos, confere a pasta de spam — e libera nosso remetente.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-[var(--rule)] bg-white p-8 md:p-10 grid gap-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-0 border-b border-neutral-300 bg-transparent px-0 py-3 font-body text-base focus:outline-none focus:border-[var(--ink)] placeholder:text-neutral-400"
          autoComplete="name"
        />
        <input
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-0 border-b border-neutral-300 bg-transparent px-0 py-3 font-body text-base focus:outline-none focus:border-[var(--ink)] placeholder:text-neutral-400"
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bmp-cta mt-4 inline-block w-full text-center bg-[var(--ink)] text-[var(--paper)] text-sm px-8 py-5 hover:bg-[var(--blood)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Enviando…' : 'Receber capítulo 1 grátis →'}
      </button>
      {errMsg && <p className="font-body text-sm text-[var(--blood)] mt-2">{errMsg}</p>}
      <p className="font-raleway text-xs text-neutral-500 italic">
        Você vai receber o capítulo no e-mail e ficar na lista da House. Sem spam — só conteúdo
        editorial.
      </p>
    </form>
  )
}
