'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/crm') || '/crm'

  if (!email || !password) {
    redirect(`/login?error=${encodeURIComponent('Informe email e senha.')}&next=${encodeURIComponent(next)}`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`)
  }

  redirect(next.startsWith('/') ? next : '/crm')
}
