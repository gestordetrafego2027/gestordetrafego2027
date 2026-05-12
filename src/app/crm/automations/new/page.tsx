import Link from 'next/link'
import RuleForm from '../RuleForm'
import { createRuleAction } from '../actions'

export const metadata = { title: 'Nova automação | CRM' }

export default function NewAutomationPage() {
  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href="/crm/automations" className="text-neutral-500 hover:text-neutral-900">
          ← Voltar
        </Link>
      </div>
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Nova automação</h1>
        <p className="text-sm text-neutral-500">
          Configure gatilho, condições (JSON) e ações (JSON). Use os botões de template
          para começar com um exemplo.
        </p>
      </header>
      <RuleForm action={createRuleAction} submitLabel="Criar regra" />
    </div>
  )
}
