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

export default function FormAngelo({ onClose, sourceUrl = '/angelo', ctaLocation = null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    instagram: '',
    interactionType: '',
    desiredDate: '',
    referral: '',
    about: '',
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
        segment: 'talents',
        lead_type: 'parceiro',
        status: 'novo',
        source: sourceUrl,
        details: {
          track: 'angelo_mentoria',
          company: form.company || null,
          instagram: form.instagram || null,
          interaction_type: form.interactionType,
          desired_date: form.desiredDate || null,
          referral: form.referral || null,
          about: form.about || null,
          cta_location: ctaLocation,
        },
        utm: getUtmFromUrl(),
      })

      router.push('/obrigado?from=angelo')
    } catch (err) {
      clientLog.error('[FormAngelo] Unexpected error:', err)
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
        <label htmlFor="fang-name" className={labelClass}>
          Nome completo <span className="text-red-600">*</span>
        </label>
        <input
          id="fang-name"
          type="text"
          required
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fang-company" className={labelClass}>
          Empresa / marca
        </label>
        <input
          id="fang-company"
          type="text"
          value={form.company}
          onChange={handleChange('company')}
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fang-phone" className={labelClass}>
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          id="fang-phone"
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
        <label htmlFor="fang-email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="fang-email"
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fang-instagram" className={labelClass}>
          Instagram
        </label>
        <input
          id="fang-instagram"
          type="text"
          value={form.instagram}
          onChange={handleChange('instagram')}
          placeholder="@seuusuario"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fang-interaction" className={labelClass}>
          Tipo de interação <span className="text-red-600">*</span>
        </label>
        <select
          id="fang-interaction"
          required
          value={form.interactionType}
          onChange={handleChange('interactionType')}
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          <option value="mentoria">Mentoria 1:1</option>
          <option value="palestra">Palestra ou Talk</option>
          <option value="consultoria">Consultoria estratégica</option>
          <option value="parceria">Parceria</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fang-date" className={labelClass}>
          Data desejada / período
        </label>
        <input
          id="fang-date"
          type="text"
          value={form.desiredDate}
          onChange={handleChange('desiredDate')}
          placeholder="Ex: maio/26, segunda quinzena de junho"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fang-referral" className={labelClass}>
          Onde nos encontrou <span className="text-red-600">*</span>
        </label>
        <select
          id="fang-referral"
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
        <label htmlFor="fang-about" className={labelClass}>
          Sobre você e o que busca
        </label>
        <textarea
          id="fang-about"
          rows={4}
          value={form.about}
          onChange={handleChange('about')}
          className={`${inputClass} resize-y`}
          placeholder="Conte um pouco do contexto e do que espera dessa interação."
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
