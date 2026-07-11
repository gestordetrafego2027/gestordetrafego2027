import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from './ProfileForm'
import { AvatarUpload } from './AvatarUpload'

export default async function DadosPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/minha-conta/dados')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, display_name, phone, city, state, email, avatar_url')
    .eq('id', user.id)
    .maybeSingle()

  const displayName = profile?.display_name ?? profile?.full_name ?? profile?.email ?? 'Membro'

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold text-neutral-900 mb-6">Dados pessoais</h2>
      <AvatarUpload avatarUrl={profile?.avatar_url ?? null} displayName={displayName} />
      <ProfileForm
        defaultValues={{
          full_name: profile?.full_name ?? '',
          display_name: profile?.display_name ?? null,
          phone: profile?.phone ?? null,
          city: profile?.city ?? null,
          state: profile?.state ?? null,
          email: profile?.email ?? user.email ?? '',
        }}
      />
    </div>
  )
}
