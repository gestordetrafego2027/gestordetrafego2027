'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'

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

const SERVICE_LABEL = {
  book: 'Book',
  ensaio: 'Ensaio Pessoal',
  cobertura: 'Cobertura',
  outro: 'Outro',
}

export default function FormStudio({
  onClose,
  serviceType = 'book',
  sourceUrl = '/studio',
  packageSelected = null,
  ctaLocation = null,
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    phone: '',
    email: '',
    instagram: '',
    serviceType: SERVICE_LABEL[serviceType] ? serviceType : 'book',
    desiredDate: '',
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
      const supabase = createClient()
      const { error: insertError } = await supabase.from('leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        segment: 'commercial',
        lead_type: 'cliente_studio',
        status: 'novo',
        source: sourceUrl,
        details: {
          business_unit: 'studio',
          service_type: form.serviceType,
          birth_date: form.birthDate || null,
          instagram: form.instagram || null,
          desired_date: form.desiredDate || null,
          referral: form.referral || null,
          message: form.message || null,
          package_selected: packageSelected,
          cta_location: ctaLocation,
        },
        utm: getUtmFromUrl(),
      })

      if (insertError) {
        console.error('[FormStudio] Supabase insert error:', insertError)
        setError('Não foi possível enviar. Tente novamente em instantes.')
        setIsSubmitting(false)
        return
      }

      router.push('/obrigado?from=studio')
    } catch (err) {
      console.error('[FormStudio] Unexpected error:', err)
      setError('Não foi possível enviar. Tente novamente em instantes.')
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-none px-4 py-3 font-body text-black bg-white focus:outline-none focus:border-black transition-colors'
  const labelClass = 'font-body text-sm text-gray-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2" noValidate={false}>
      <div className="flex flex-col">
        <label htmlFor="fs-name" className={labelClass}>
          Nome completo <span className="text-red-600">*</span>
        </label>
        <input
          id="fs-name"
          type="text"
          required
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fs-birth" className={labelClass}>
          Data de nascimento <span className="text-red-600">*</span>
        </label>
        <input
          id="fs-birth"
          type="date"
          required
          value={form.birthDate}
          onChange={handleChange('birthDate')}
          className={inputClass}
          autoComplete="bday"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fs-phone" className={labelClass}>
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          id="fs-phone"
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
        <label htmlFor="fs-email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="fs-email"
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fs-instagram" className={labelClass}>
          Instagram
        </label>
        <input
          id="fs-instagram"
          type="text"
          value={form.instagram}
          onChange={handleChange('instagram')}
          placeholder="@seuusuario"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fs-service" className={labelClass}>
          Tipo de serviço <span className="text-red-600">*</span>
        </label>
        <select
          id="fs-service"
          required
          value={form.serviceType}
          onChange={handleChange('serviceType')}
          className={inputClass}
        >
          <option value="book">Book</option>
          <option value="ensaio">Ensaio Pessoal</option>
          <option value="cobertura">Cobertura</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fs-date" className={labelClass}>
          Data desejada
        </label>
        <input
          id="fs-date"
          type="date"
          value={form.desiredDate}
          onChange={handleChange('desiredDate')}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fs-referral" className={labelClass}>
          Onde nos encontrou <span className="text-red-600">*</span>
        </label>
        <select
          id="fs-referral"
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
        <label htmlFor="fs-message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="fs-message"
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
