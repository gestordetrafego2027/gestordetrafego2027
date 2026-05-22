'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function acceptQuoteByTokenAction(formData: FormData): Promise<void> {
  const token = String(formData.get('token') ?? '')
  if (!token) return
  const supabase = await createClient()
  const { error } = await supabase.rpc('accept_quote_by_token', { p_token: token })
  if (error) { console.error('[accept_quote_by_token]', error.message); return }
  revalidatePath(`/p/${token}`)
}
