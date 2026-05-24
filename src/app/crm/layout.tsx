import { createClient } from '@/lib/supabase/server'
import Sidebar from './components/Sidebar'

export const metadata = { title: 'CRM | House Mazzutti' }

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const [
    { count: newActivities },
    { count: openLeads },
    { count: overdueInvoices },
  ] = await Promise.all([
    supabase.from('activities').select('*', { count: 'exact', head: true }).gte('created_at', since),
    supabase.from('leads').select('*', { count: 'exact', head: true }).in('status', ['novo', 'em_contato']),
    supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('status', 'vencida'),
  ])

  const md = (user?.app_metadata ?? {}) as { role?: string; unit?: string }

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      <Sidebar
        openLeads={openLeads}
        overdueInvoices={overdueInvoices}
        newActivities={newActivities}
        isAdmin={md.role === 'admin'}
        userEmail={user?.email}
        userRole={md.role}
        userUnit={md.unit}
      />
      <div className="flex-1 min-w-0">
        <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
