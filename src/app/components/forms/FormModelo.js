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

export default function FormModelo({ onClose, sourceUrl = '/comunidade/vagas', ctaLocation = null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    city: '',
    state: '',
    height: '',
    phone: '',
    email: '',
    instagram: '',
    hasAgency: '',
    experience: '',
    portfolioUrl: '',
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
        lead_type: 'agenciado_casting',
        status: 'novo',
        source: sourceUrl,
        details: {
          business_unit: 'agencia',
          track: 'representacao',
          birth_date: form.birthDate || null,
          city: form.city || null,
          state: form.state || null,
          height: form.height || null,
          instagram: form.instagram || null,
          has_agency: form.hasAgency || null,
          experience: form.experience || null,
          portfolio_url: form.portfolioUrl || null,
          referral: form.referral || null,
          about: form.about || null,
          cta_location: ctaLocation,
        },
        utm: getUtmFromUrl(),
      })

      router.push('/obrigado?from=representacao')
    } catch (err) {
      clientLog.error('[FormModelo] Unexpected error:', err)
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
        <label htmlFor="fm-name" className={labelClass}>
          Nome completo <span className="text-red-600">*</span>
        </label>
        <input
          id="fm-name"
          type="text"
          required
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-birth" className={labelClass}>
          Data de nascimento <span className="text-red-600">*</span>
        </label>
        <input
          id="fm-birth"
          type="date"
          required
          value={form.birthDate}
          onChange={handleChange('birthDate')}
          className={inputClass}
          autoComplete="bday"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="fm-city" className={labelClass}>
            Cidade <span className="text-red-600">*</span>
          </label>
          <input
            id="fm-city"
            type="text"
            required
            value={form.city}
            onChange={handleChange('city')}
            className={inputClass}
            autoComplete="address-level2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fm-state" className={labelClass}>
            Estado <span className="text-red-600">*</span>
          </label>
          <input
            id="fm-state"
            type="text"
            required
            maxLength={2}
            value={form.state}
            onChange={handleChange('state')}
            placeholder="SP"
            className={`${inputClass} uppercase`}
            autoComplete="address-level1"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-height" className={labelClass}>
          Altura
        </label>
        <input
          id="fm-height"
          type="text"
          value={form.height}
          onChange={handleChange('height')}
          placeholder="1,75 m"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-phone" className={labelClass}>
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          id="fm-phone"
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
        <label htmlFor="fm-email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="fm-email"
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-instagram" className={labelClass}>
          Instagram <span className="text-red-600">*</span>
        </label>
        <input
          id="fm-instagram"
          type="text"
          required
          value={form.instagram}
          onChange={handleChange('instagram')}
          placeholder="@seuusuario"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-has-agency" className={labelClass}>
          Já tem agência?
        </label>
        <select
          id="fm-has-agency"
          value={form.hasAgency}
          onChange={handleChange('hasAgency')}
          className={inputClass}
        >
          <option value="">Selecione</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-experience" className={labelClass}>
          Experiência
        </label>
        <select
          id="fm-experience"
          value={form.experience}
          onChange={handleChange('experience')}
          className={inputClass}
        >
          <option value="">Selecione</option>
          <option value="iniciante">Iniciante</option>
          <option value="intermediario">Intermediário</option>
          <option value="profissional">Profissional</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-portfolio" className={labelClass}>
          Link de book / portfólio
        </label>
        <input
          id="fm-portfolio"
          type="url"
          value={form.portfolioUrl}
          onChange={handleChange('portfolioUrl')}
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fm-referral" className={labelClass}>
          Onde nos encontrou <span className="text-red-600">*</span>
        </label>
        <select
          id="fm-referral"
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
        <label htmlFor="fm-about" className={labelClass}>
          Sobre você
        </label>
        <textarea
          id="fm-about"
          rows={4}
          value={form.about}
          onChange={handleChange('about')}
          className={`${inputClass} resize-y`}
          placeholder="Conte um pouco sobre sua trajetória e por que quer ser representado pela House."
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
        {isSubmitting ? 'Enviando...' : 'Quero ser representado'}
      </button>
    </form>
  )
}
