'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/submitLead'
import { clientLog } from '@/lib/logger-client'
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

const UNITS = [
  { value: 'studio', label: 'Studio', help: 'Books, ensaios e coberturas' },
  { value: 'agencia', label: 'Agência', help: 'Branding, campanhas e desenvolvimento' },
  { value: 'produtora', label: 'Produtora', help: 'Publicidade, institucional e moda' },
]

const LEAD_TYPE_BY_UNIT = {
  studio: 'estúdio_cliente',
  agencia: 'cliente_agência',
  produtora: 'cliente_produtora',
}

const SERVICE_OPTIONS = {
  studio: [
    ['book', 'Book'],
    ['ensaio', 'Ensaio Pessoal'],
    ['cobertura', 'Cobertura'],
    ['outro', 'Outro'],
  ],
  agencia: [
    ['branding', 'Branding'],
    ['campanhas', 'Campanhas / Tráfego'],
    ['desenvolvimento', 'Desenvolvimento Web'],
    ['outro', 'Outro'],
  ],
  produtora: [
    ['publicidade', 'Publicidade'],
    ['institucional', 'Institucional'],
    ['moda', 'Moda'],
    ['outro', 'Outro'],
  ],
}

export default function FormGeral({ onClose, sourceUrl = '/', ctaLocation = null }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    unit: '',
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  })

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => {
      if (field === 'unit') {
        return { ...prev, unit: value, serviceType: '' }
      }
      return { ...prev, [field]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.unit) {
      setError('Selecione sobre o que você quer falar.')
      return
    }
    setError(null)
    setIsSubmitting(true)

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        segment: 'commercial',
        lead_type: LEAD_TYPE_BY_UNIT[form.unit],
        status: 'novo',
        source: sourceUrl,
        details: {
          business_unit: form.unit,
          service_type: form.serviceType || null,
          message: form.message || null,
          cta_location: ctaLocation,
        },
        utm: getUtmFromUrl(),
      })

      redirectToHouseWhatsApp('Formulário Geral', [
        { label: 'Nome', value: form.name },
        { label: 'Email', value: form.email },
        { label: 'WhatsApp', value: form.phone },
        { label: 'Unidade', value: UNITS.find(u => u.value === form.unit)?.label },
        { label: 'Serviço', value: form.serviceType },
        { label: 'Mensagem', value: form.message },
      ])
    } catch (err) {
      clientLog.error('[FormGeral] Unexpected error:', err)
      setError(err?.message || 'Não foi possível enviar. Tente novamente em instantes.')
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-none px-4 py-3 font-body text-black bg-white focus:outline-none focus:border-black transition-colors'
  const labelClass = 'font-body text-sm text-gray-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
      <fieldset className="flex flex-col gap-2">
        <legend className={`${labelClass} mb-2`}>
          Sobre o que você quer falar? <span className="text-red-600">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-2">
          {UNITS.map((u) => {
            const selected = form.unit === u.value
            return (
              <label
                key={u.value}
                className={`flex flex-col gap-1 border px-4 py-3 cursor-pointer transition-colors ${
                  selected ? 'border-black bg-black/5' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="fg-unit"
                    value={u.value}
                    checked={selected}
                    onChange={handleChange('unit')}
                    className="accent-black"
                    required
                  />
                  <span className="font-headline text-base text-black">{u.label}</span>
                </div>
                <span className="font-body text-xs text-gray-500 ml-7">{u.help}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col">
        <label htmlFor="fg-name" className={labelClass}>
          Nome completo <span className="text-red-600">*</span>
        </label>
        <input
          id="fg-name"
          type="text"
          required
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fg-email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="fg-email"
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fg-phone" className={labelClass}>
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          id="fg-phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange('phone')}
          placeholder="(11) 99999-9999"
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      {form.unit ? (
        <div className="flex flex-col">
          <label htmlFor="fg-service" className={labelClass}>
            Tipo de serviço
          </label>
          <select
            id="fg-service"
            value={form.serviceType}
            onChange={handleChange('serviceType')}
            className={inputClass}
          >
            <option value="">Selecione (opcional)</option>
            {SERVICE_OPTIONS[form.unit].map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="flex flex-col">
        <label htmlFor="fg-message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="fg-message"
          rows={4}
          value={form.message}
          onChange={handleChange('message')}
          className={`${inputClass} resize-y`}
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
