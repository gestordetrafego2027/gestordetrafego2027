'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/submitLead'
import { redirectToHouseWhatsApp } from '@/lib/whatsappRedirect'

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

const ESCOPOS = [
  { value: 'branding_completo', label: 'Branding completo' },
  { value: 'naming', label: 'Naming' },
  { value: 'identidade_visual', label: 'Identidade visual' },
  { value: 'brand_book', label: 'Brand book' },
  { value: 'aplicacoes', label: 'Aplicações' },
]

export default function FormBranding({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    momento: '',
    escopos: [],
    sobre: '',
  })

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const toggleEscopo = (value) =>
    setForm((prev) => ({
      ...prev,
      escopos: prev.escopos.includes(value)
        ? prev.escopos.filter((v) => v !== value)
        : [...prev.escopos, value],
    }))

  const validate = () => {
    if (!form.name.trim()) return 'Informe seu nome.'
    if (!form.company.trim()) return 'Informe a marca ou empresa.'
    if (!form.email.trim() || !form.email.includes('@')) return 'Informe um e-mail válido.'
    if (!form.phone.trim()) return 'Informe seu WhatsApp.'
    if (!form.momento) return 'Selecione o momento da marca.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }
    setError(null)
    setIsSubmitting(true)

    const notes = [
      form.momento ? `Momento: ${form.momento}` : null,
      form.sobre ? `Sobre a marca: ${form.sobre}` : null,
    ].filter(Boolean).join('\n')

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        segment: 'commercial',
        lead_type: 'cliente_agencia',
        source: 'site/branding',
        notes: notes || null,
        details: {
          business_unit: 'agencia',
          company: form.company,
          momento_marca: form.momento,
          escopo_interesse: form.escopos.length ? form.escopos : ['branding_completo'],
          sobre_marca: form.sobre || null,
        },
        utm: getUtmFromUrl(),
      })

      redirectToHouseWhatsApp('Branding', [
        { label: 'Nome', value: form.name },
        { label: 'Empresa / Marca', value: form.company },
        { label: 'Email', value: form.email },
        { label: 'WhatsApp', value: form.phone },
        { label: 'Momento da marca', value: form.momento },
        { label: 'Escopo de interesse', value: form.escopos.length ? form.escopos.join(', ') : null },
        { label: 'Sobre a marca', value: form.sobre },
      ])
    } catch (err) {
      setError(err?.message || 'Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.')
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 px-4 py-3 font-body text-black bg-white focus:outline-none focus:border-black transition-colors text-sm'
  const labelClass = 'font-body text-sm text-gray-600 mb-1 block'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-2" noValidate>
      <div className="flex flex-col">
        <label htmlFor="fb-name" className={labelClass}>Nome <span className="text-red-600">*</span></label>
        <input id="fb-name" type="text" required value={form.name} onChange={handleChange('name')} className={inputClass} autoComplete="name" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fb-company" className={labelClass}>Marca / empresa <span className="text-red-600">*</span></label>
        <input id="fb-company" type="text" required value={form.company} onChange={handleChange('company')} className={inputClass} autoComplete="organization" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fb-email" className={labelClass}>E-mail <span className="text-red-600">*</span></label>
        <input id="fb-email" type="email" required value={form.email} onChange={handleChange('email')} className={inputClass} autoComplete="email" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fb-phone" className={labelClass}>WhatsApp <span className="text-red-600">*</span></label>
        <input id="fb-phone" type="tel" required value={form.phone} onChange={handleChange('phone')} placeholder="(11) 99999-9999" className={inputClass} autoComplete="tel" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fb-momento" className={labelClass}>Momento da marca <span className="text-red-600">*</span></label>
        <select id="fb-momento" required value={form.momento} onChange={handleChange('momento')} className={inputClass}>
          <option value="" disabled>Selecione</option>
          <option value="lancando_agora">Lançando agora</option>
          <option value="reposicionando">Reposicionando</option>
          <option value="marca_sem_direcao">Marca existente sem direção</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>Escopo de interesse</span>
        <div className="flex flex-wrap gap-2">
          {ESCOPOS.map((op) => (
            <button
              key={op.value}
              type="button"
              onClick={() => toggleEscopo(op.value)}
              className={`px-3 py-1.5 font-label uppercase tracking-wider text-[10px] border transition-colors ${
                form.escopos.includes(op.value)
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-200 hover:border-black'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fb-sobre" className={labelClass}>Sobre a marca</label>
        <textarea
          id="fb-sobre"
          rows={4}
          value={form.sobre}
          onChange={handleChange('sobre')}
          placeholder="Conte o contexto, o desafio e o que você espera da marca."
          className={`${inputClass} resize-y`}
        />
      </div>

      {error && (
        <p className="font-body text-sm text-red-600" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-1 w-full bg-black text-white py-4 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-800 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Enviando...' : 'Solicitar proposta'}
      </button>

      <p className="text-center font-body text-xs text-gray-400">
        Ou fale direto:{' '}
        <a href="https://wa.me/5511952347533?text=Olá!%20Tenho%20interesse%20no%20Branding%20Project." target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">
          WhatsApp
        </a>
      </p>
    </form>
  )
}
