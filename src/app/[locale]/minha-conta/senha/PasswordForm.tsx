'use client'

import { useActionState, useEffect, useRef } from 'react'
import { changePassword, type ChangePasswordState } from './actions'

const initial: ChangePasswordState = {}

export function PasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, initial)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {state.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
          ✓ Senha alterada com sucesso.
        </div>
      )}
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
          Senha atual
        </label>
        <input
          name="current_password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
        />
        {state.fieldErrors?.current_password && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.current_password}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
          Nova senha
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
        />
        {state.fieldErrors?.password && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.password}</p>
        )}
        <p className="text-xs text-neutral-400 mt-1">Mínimo de 8 caracteres.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
          Confirmar nova senha
        </label>
        <input
          name="confirm"
          type="password"
          required
          autoComplete="new-password"
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
        />
        {state.fieldErrors?.confirm && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.confirm}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-neutral-900 text-white font-semibold py-3 rounded-xl hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Salvando...' : 'Alterar senha'}
      </button>
    </form>
  )
}
