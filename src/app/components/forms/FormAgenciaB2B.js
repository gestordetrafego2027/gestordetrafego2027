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

export default function FormAgenciaB2B({
  onClose,
  sourceUrl = '/agencia',
  serviceOfInterest = '',
  ctaLocation = null,
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    company: '',
    name: '',
    role: '',
    phone: '',
    email: '',
    companySite: '',
    serviceInterest: serviceOfInterest,
    timeline: '',
    referral: '',
    briefing: '',
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
        lead_type: 'cliente_agencia',
        status: 'novo',
        source: sourceUrl,
        details: {
          business_unit: 'agencia',
          company: form.company,
          role: form.role || null,
          company_site: form.companySite || null,
          service_interest: form.serviceInterest,
          timeline: form.timeline || null,
          referral: form.referral || null,
          briefing: form.briefing || null,
          cta_location: ctaLocation,
        },
        utm: getUtmFromUrl(),
      })

      router.push('/obrigado?from=agencia')
    } catch (err) {
      clientLog.error('[FormAgenciaB2B] Unexpected error:', err)
      setError(err?.message || 'Não foi possível enviar. Tente novamente em instantes.')
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-none px-4 py-3 font-body text-black bg-white focus:outline-none focus:border-black transition-colors'
  const labelClass = 'font-body text-sm text-gray-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2" noValidate={false}>
      <div className="flex flex-col">
        <label htmlFor="fa-company" className={labelClass}>
          Empresa <span className="text-red-600">*</span>
        </label>
        <input
          id="fa-company"
          type="text"
          required
          value={form.company}
          onChange={handleChange('company')}
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-name" className={labelClass}>
          Seu nome (contato) <span className="text-red-600">*</span>
        </label>
        <input
          id="fa-name"
          type="text"
          required
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-role" className={labelClass}>
          Cargo
        </label>
        <input
          id="fa-role"
          type="text"
          value={form.role}
          onChange={handleChange('role')}
          className={inputClass}
          autoComplete="organization-title"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-phone" className={labelClass}>
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          id="fa-phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange('phone')}
          placeholder="(11) 99999-9999"
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-email" className={labelClass}>
          Email corporativo <span className="text-red-600">*</span>
        </label>
        <input
          id="fa-email"
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-site" className={labelClass}>
          Site da empresa
        </label>
        <input
          id="fa-site"
          type="text"
          value={form.companySite}
          onChange={handleChange('companySite')}
          placeholder="empresa.com.br"
          className={inputClass}
          autoComplete="url"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-service" className={labelClass}>
          Serviço de interesse <span className="text-red-600">*</span>
        </label>
        <select
          id="fa-service"
          required
          value={form.serviceInterest}
          onChange={handleChange('serviceInterest')}
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          <option value="branding">Branding</option>
          <option value="campanhas">Campanhas</option>
          <option value="desenvolvimento">Desenvolvimento Web</option>
          <option value="estrategia">Estratégia</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-timeline" className={labelClass}>
          Prazo desejado
        </label>
        <select
          id="fa-timeline"
          value={form.timeline}
          onChange={handleChange('timeline')}
          className={inputClass}
        >
          <option value="">Selecione (opcional)</option>
          <option value="imediato">Imediato</option>
          <option value="30dias">30 dias</option>
          <option value="60-90dias">60–90 dias</option>
          <option value="sem-urgencia">Sem urgência</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-referral" className={labelClass}>
          Onde nos encontrou <span className="text-red-600">*</span>
        </label>
        <select
          id="fa-referral"
          required
          value={form.referral}
          onChange={handleChange('referral')}
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google</option>
          <option value="indicacao">Indicação</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fa-briefing" className={labelClass}>
          Briefing / desafio
        </label>
        <textarea
          id="fa-briefing"
          rows={4}
          value={form.briefing}
          onChange={handleChange('briefing')}
          className={`${inputClass} resize-y`}
          placeholder="Conte sobre o desafio, objetivos e contexto da marca."
        />
      </div>

      {error ? (
        <p className="font-body text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-2 w-full md:w-auto md:self-end bg-black text-white px-8 py-3 font-label uppercase tracking-wider text-sm hover:bg-gray-900 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
