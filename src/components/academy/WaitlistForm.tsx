'use client'

import { useState, FormEvent } from 'react'

interface Props {
  product: string
  /** CSS color value for the submit button background */
  accentColor?: string
  /** CSS color value for the submit button text */
  accentTextColor?: string
  className?: string
}

export function WaitlistForm({
  product,
  accentColor = '#1a1a1a',
  accentTextColor = '#f5f0e8',
  className = '',
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrMsg(null)
    try {
      const res = await fetch('/api/academy/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, phone, product }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrMsg(data?.error ?? 'Não foi possível registrar. Tente em instantes.')
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
      <div className={`text-center py-10 ${className}`}>
        <div className="text-4xl mb-3">✓</div>
        <p className="font-headline text-xl font-medium mb-2">Você está na lista.</p>
        <p className="font-body text-sm opacity-70 max-w-xs mx-auto">
          Avisamos assim que as vendas abrirem. Fique de olho no seu e-mail.
        </p>
      </div>
    )
  }

  const inputCls =
    'border-0 border-b border-neutral-400 bg-transparent px-0 py-3 font-body text-base w-full focus:outline-none focus:border-current placeholder:text-neutral-500'

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${className}`} noValidate>
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          required
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className={inputCls}
        />
        <input
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className={inputCls}
        />
        <input
          type="tel"
          placeholder="WhatsApp (opcional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          className={inputCls}
        />
      </div>
      {errMsg && <p className="font-body text-sm text-red-600 -mt-2">{errMsg}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-between font-mono font-semibold text-xs tracking-widest uppercase px-7 py-5 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: accentColor, color: accentTextColor }}
      >
        <span>{status === 'sending' ? 'Registrando…' : 'Entrar na lista de espera'}</span>
        <span style={{ fontFamily: 'var(--display, serif)', fontSize: 22, letterSpacing: 0 }}>
          →
        </span>
      </button>
      <p className="font-body text-xs opacity-60 italic">
        Sem compromisso. Avisamos quando abrir — nada mais.
      </p>
    </form>
  )
}
