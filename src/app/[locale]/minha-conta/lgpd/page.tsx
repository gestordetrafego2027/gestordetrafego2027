import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LgpdClient } from './LgpdClient'

export default async function LgpdPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/minha-conta/lgpd')

  const { data: profile } = await supabase
    .from('profiles')
    .select('marketing_consent, terms_accepted_at, created_at')
    .eq('id', user.id)
    .maybeSingle()

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold text-neutral-900 mb-2">Privacidade & LGPD</h2>
      <p className="text-sm text-neutral-400 mb-4">
        Gerencie seus consentimentos e exercite seus direitos conforme a Lei Geral de Proteção de
        Dados (Lei 13.709/2018). Controlador: House Mazzutti Produções Ltda — CNPJ
        64.448.222/0001-54.
      </p>

      {/* Documentos legais */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          href="/politicas/privacidade"
          className="text-xs font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
        >
          Política de Privacidade
        </Link>
        <span className="text-neutral-300 text-xs">·</span>
        <Link
          href="/politicas/termos-de-uso"
          className="text-xs font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
        >
          Termos de Uso
        </Link>
        <span className="text-neutral-300 text-xs">·</span>
        <Link
          href="/politicas/cookies"
          className="text-xs font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
        >
          Política de Cookies
        </Link>
      </div>

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
