import { createClient } from '@/lib/supabase/server'
import { LgpdClient } from './LgpdClient'

export default async function LgpdPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('marketing_consent, terms_accepted_at, created_at')
    .eq('id', user!.id)
    .maybeSingle()

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold text-neutral-900 mb-2">Privacidade & LGPD</h2>
      <p className="text-sm text-neutral-400 mb-6">
        Gerencie seus consentimentos e exercite seus direitos conforme a Lei Geral de Proteção de Dados
        (Lei 13.709/2018). Controlador: House Mazzutti Produções Ltda — CNPJ 64.448.222/0001-54.
      </p>

      {profile?.terms_accepted_at && (
        <div className="mb-6 bg-neutral-50 rounded-xl px-4 py-3 text-xs text-neutral-400">
          Termos aceitos em: {new Date(profile.terms_accepted_at).toLocaleDateString('pt-BR')}
          {' · '}
          Conta criada em: {new Date(profile.created_at ?? '').toLocaleDateString('pt-BR')}
        </div>
      )}

      <LgpdClient marketingConsent={profile?.marketing_consent ?? false} />
    </div>
  )
}
