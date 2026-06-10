import { PasswordForm } from './PasswordForm'

export default function SenhaPage() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold text-neutral-900 mb-1">Alterar senha</h2>
      <p className="text-sm text-neutral-400 mb-6">
        Escolha uma senha forte com ao menos 8 caracteres.
      </p>
      <PasswordForm />
    </div>
  )
}
