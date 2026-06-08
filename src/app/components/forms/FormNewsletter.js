'use client'

import { useState } from 'react'
import { getRecaptchaToken } from '@/lib/recaptcha/client'
import { clientLog } from '@/lib/logger-client';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

function getUtmFromUrl() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const utm = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return Object.keys(utm).length ? utm : null
}

export default function FormNewsletter({ sourceUrl = '/', variant = 'light' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const isDark = variant === 'dark'
  const inputClass = isDark
    ? 'w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder-white/40 font-body focus:outline-none focus:border-white transition-colors'
    : 'w-full bg-transparent border-b border-black/30 px-0 py-3 text-black placeholder-black/40 font-body focus:outline-none focus:border-black transition-colors'
  const buttonClass = isDark
    ? 'border-[0.5px] border-white px-8 py-4 font-label uppercase tracking-[0.2em] text-[11px] text-white hover:bg-white hover:text-black transition-all duration-300'
    : 'border-[0.5px] border-black px-8 py-4 font-label uppercase tracking-[0.2em] text-[11px] text-black hover:bg-black hover:text-white transition-all duration-300'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setStatus('submitting')

    try {
      const recaptchaToken = await getRecaptchaToken('newsletter')
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim() || null,
          source: sourceUrl,
          utm: getUtmFromUrl(),
          recaptchaToken,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Erro ao inscrever.')
      }

      setStatus('success')
      setEmail('')
      setName('')
    } catch (err) {
      clientLog.error('[FormNewsletter]', err)
      setError('Não foi possível inscrever. Tente novamente.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <p className={`font-body text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Inscrição confirmada. Obrigado.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-end w-full max-w-2xl">
      <div className="flex-1">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="NOME"
          className={inputClass}
          autoComplete="name"
        />
      </div>
      <div className="flex-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL *"
          className={inputClass}
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`${buttonClass} ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {status === 'submitting' ? 'INSCREVENDO...' : 'INSCREVER'}
      </button>
      {error ? (
        <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'} md:absolute md:mt-16`} role="alert">{error}</p>
      ) : null}
    </form>
  )
}
