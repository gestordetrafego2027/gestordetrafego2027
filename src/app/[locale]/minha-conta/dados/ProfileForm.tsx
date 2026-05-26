'use client'

import { useActionState } from 'react'
import { updateProfile, type UpdateProfileState } from './actions'

const BRAZIL_STATES = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
  'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO',
]

interface Props {
  defaultValues: {
    full_name: string
    display_name: string | null
    phone: string | null
    city: string | null
    state: string | null
    email: string
  }
}

const initial: UpdateProfileState = {}

export function ProfileForm({ defaultValues }: Props) {
  const [state, formAction, isPending] = useActionState(updateProfile, initial)

  return (
    <form action={formAction} className="space-y-5">
      {state.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
          ✓ Dados salvos com sucesso.
        </div>
      )}
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      {/* Email — somente leitura */}
      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
          E-mail
        </label>
        <input
          type="email"
          value={defaultValues.email}
          disabled
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm bg-neutral-50 text-neutral-400 cursor-not-allowed"
        />
        <p className="text-xs text-neutral-400 mt-1">Para alterar o e-mail, entre em contato.</p>
      </div>

      {/* Nome completo */}
      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
          Nome completo *
        </label>
        <input
          name="full_name"
          type="text"
          defaultValue={defaultValues.full_name}
          required
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
        />
        {state.fieldErrors?.full_name && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.full_name}</p>
        )}
      </div>

      {/* Nome de exibição */}
      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
          Como prefere ser chamado(a)
        </label>
        <input
          name="display_name"
          type="text"
          defaultValue={defaultValues.display_name ?? ''}
          placeholder="Ex: João"
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
        />
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
          Telefone / WhatsApp
        </label>
        <input
          name="phone"
          type="tel"
          defaultValue={defaultValues.phone ?? ''}
          placeholder="(11) 99999-9999"
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
        />
      </div>

      {/* Cidade + Estado */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
            Cidade
          </label>
          <input
            name="city"
            type="text"
            defaultValue={defaultValues.city ?? ''}
            className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
            Estado
          </label>
          <select
            name="state"
            defaultValue={defaultValues.state ?? ''}
            className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900 bg-white"
          >
            <option value="">—</option>
            {BRAZIL_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-neutral-900 text-white font-semibold py-3 rounded-xl hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Salvando...' : 'Salvar alterações'}
      </button>
    </form>
  )
}
