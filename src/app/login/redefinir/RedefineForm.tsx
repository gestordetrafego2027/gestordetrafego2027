'use client'

import { useActionState } from 'react'
import { setNewPassword } from './actions'
import { PasswordInput } from '@/components/ui/PasswordInput'

type State = { error?: string }

export function RedefineForm({ serverError }: { serverError?: string }) {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    setNewPassword,
    { error: serverError },
  )

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium block">Nova senha</label>
        <PasswordInput
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        <span className="block text-xs text-neutral-500">Mínimo 8 caracteres.</span>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium block">Confirmar nova senha</label>
        <PasswordInput
          name="confirm"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-neutral-900 text-white text-sm font-medium py-2 hover:bg-neutral-700 transition disabled:opacity-50"
      >
        {isPending ? 'Salvando...' : 'Salvar nova senha'}
      </button>
    </form>
  )
}
