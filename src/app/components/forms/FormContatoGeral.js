'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'
import { submitLead } from '@/lib/submitLead'
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

export default function FormContatoGeral({ sourceUrl = '/contato' }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    referral: '',
    message: '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        segment: 'commercial',
        lead_type: 'parceiro',
        source: sourceUrl,
        details: {
          track: 'contato_geral',
          subject: form.subject,
          referral: form.referral || null,
          message: form.message,
        },
        utm: getUtmFromUrl(),
      })

      router.push('/obrigado?from=contato')
    } catch (err) {
      clientLog.error('[FormContatoGeral] Unexpected error:', err)
      setError(err?.message || 'Não foi possível enviar. Tente novamente em instantes.')
      setIsSubmitting(false)
    }
  }

  const inputBase =
    'w-full bg-transparent border-b border-white/30 border-t-0 border-l-0 border-r-0 px-0 py-3 text-white placeholder-white/40 font-[\'Inter\'] focus:ring-0 focus:border-white transition-all focus:outline-none'

  return (
    <form className="space-y-12" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <label htmlFor="cf-name" className="sr-only">Nome</label>
          <input
            id="cf-name"
            className={inputBase}
            required
            value={form.name}
            onChange={handleChange('name')}
            placeholder="NOME *"
            type="text"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="sr-only">E-mail</label>
          <input
            id="cf-email"
            className={inputBase}
            required
            value={form.email}
            onChange={handleChange('email')}
            placeholder="EMAIL *"
            type="email"
            autoComplete="email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-phone" className="sr-only">WhatsApp</label>
        <input
          id="cf-phone"
          className={inputBase}
          required
          value={form.phone}
          onChange={handleChange('phone')}
          placeholder="WHATSAPP *"
          type="tel"
          autoComplete="tel"
        />
      </div>
      <div>
        <label htmlFor="cf-subject" className="sr-only">Assunto</label>
        <select
          id="cf-subject"
          className={`${inputBase} text-white`}
          required
          value={form.subject}
          onChange={handleChange('subject')}
          style={{ backgroundColor: '#0f0f0f' }}
        >
          <option value="" disabled>ASSUNTO *</option>
          <option value="studio">Studio</option>
          <option value="agencia">Agência</option>
          <option value="produtora">Produtora</option>
          <option value="angelo">Angelo (mentoria/palestra)</option>
          <option value="representacao">Representação (talento)</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-referral" className="sr-only">Onde nos encontrou</label>
        <select
          id="cf-referral"
          className={`${inputBase} text-white`}
          required
          value={form.referral}
          onChange={handleChange('referral')}
          style={{ backgroundColor: '#0f0f0f' }}
        >
          <option value="" disabled>ONDE NOS ENCONTROU *</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google</option>
          <option value="indicacao">Indicação</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="sr-only">Mensagem</label>
        <textarea
          id="cf-message"
          className={`${inputBase} resize-none`}
          required
          value={form.message}
          onChange={handleChange('message')}
          placeholder="SUA MENSAGEM *"
          rows={4}
        />
      </div>
      {error ? (
        <p className="font-body text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col items-center gap-12 pt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full md:w-auto min-w-[280px] border-[0.5px] border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[12px] text-white hover:bg-white hover:text-black transition-all duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
        </button>
        <div className="text-center">
          <p className="font-label uppercase tracking-[0.3em] text-[9px] text-white/40">Discrição. Cuidado. Direção.</p>
        </div>
      </div>
    </form>
  )
}
