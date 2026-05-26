'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type NavItem = {
  href: string
  label: string
  icon: string
  badge?: number | null
  badgeColor?: string
  adminOnly?: boolean
}

const NAV_GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: 'Principal',
    items: [
      { href: '/crm', icon: '◈', label: 'Dashboard' },
      { href: '/crm/leads', icon: '⟡', label: 'Leads', badgeColor: 'amber' },
      { href: '/crm/clients', icon: '◎', label: 'Clientes', badgeColor: 'rose' },
      { href: '/crm/opportunities', icon: '◇', label: 'Oportunidades' },
    ],
  },
  {
    group: 'Financeiro',
    items: [
      { href: '/crm/quotes', icon: '▤', label: 'Propostas' },
      { href: '/crm/invoices', icon: '▦', label: 'Faturas' },
    ],
  },
  {
    group: 'Marketing',
    items: [
      { href: '/crm/campaigns', icon: '◉', label: 'Campanhas' },
      { href: '/crm/newsletter', icon: '✉', label: 'Newsletter' },
      { href: '/crm/automations', icon: '⟳', label: 'Automações' },
      { href: '/crm/reports', icon: '▨', label: 'Relatórios' },
    ],
  },
  {
    group: 'Configuração',
    items: [
      { href: '/crm/catalog', icon: '▣', label: 'Catálogo' },
      { href: '/crm/tags', icon: '◈', label: 'Tags' },
      { href: '/crm/manual', icon: '▥', label: 'Manual' },
      { href: '/crm/ajuda', icon: '◌', label: 'Ajuda' },
    ],
  },
  {
    group: 'Admin',
    items: [
      { href: '/crm/academy', icon: '◑', label: 'Academy', adminOnly: true },
      { href: '/crm/admin/users', icon: '◐', label: 'Usuários', adminOnly: true },
      { href: '/crm/admin/auditoria', icon: '◒', label: 'Auditoria', adminOnly: true },
    ],
  },
]

type Props = {
  openLeads?: number | null
  overdueInvoices?: number | null
  newActivities?: number | null
  isAdmin?: boolean
  userEmail?: string
  userRole?: string
  userUnit?: string
}

export default function Sidebar({
  openLeads,
  overdueInvoices,
  newActivities,
  isAdmin,
  userEmail,
  userRole,
  userUnit,
}: Props) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  function getBadge(item: NavItem) {
    if (item.href === '/crm/leads') return openLeads
    if (item.href === '/crm/clients') return overdueInvoices
    return null
  }

  function isActive(href: string) {
    if (href === '/crm') return pathname === '/crm'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={`flex flex-col bg-white border-r border-neutral-200 min-h-screen transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-56'
      }`}
    >
      {/* Logo / Header */}
      <div className={`flex items-center justify-between px-4 py-4 border-b border-neutral-100 ${collapsed ? 'px-3' : ''}`}>
        {!collapsed && (
          <Link href="/crm" className="flex items-center gap-2 group">
            <span className="font-bold text-sm tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">
              HM CRM
            </span>
            {!!newActivities && (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] w-4 h-4 leading-none tabular-nums" title={`${newActivities} atividades nas últimas 24h`}>
                {newActivities > 9 ? '9+' : newActivities}
              </span>
            )}
          </Link>
        )}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded hover:bg-neutral-100 ml-auto"
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {collapsed ? (
              <path d="M5 3l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M11 3L5 8l6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-neutral-100">
          <form action="/crm/search" method="get">
            <input
              type="search"
              name="q"
              placeholder="Buscar…"
              className="w-full rounded-md border border-neutral-200 px-3 py-1.5 text-xs focus:outline-none focus:border-neutral-400 bg-neutral-50"
            />
          </form>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {NAV_GROUPS.filter(g => {
          if (g.group === 'Admin') return isAdmin
          return true
        }).map(({ group, items }) => (
          <div key={group}>
            {!collapsed && (
              <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400 px-2 mb-1">
                {group}
              </p>
            )}
            <ul className="space-y-0.5">
              {items.map(item => {
                const badge = getBadge(item)
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
                        active
                          ? 'bg-neutral-900 text-white'
                          : item.adminOnly
                          ? 'text-violet-700 hover:bg-violet-50'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      <span className="text-base leading-none w-4 text-center flex-shrink-0">
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {!collapsed && !!badge && (
                        <span className={`inline-flex items-center justify-center rounded-full text-white text-[9px] px-1.5 py-0.5 leading-none tabular-nums ${
                          item.badgeColor === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                        }`}>
                          {badge}
                        </span>
                      )}
                      {collapsed && !!badge && (
                        <span className={`absolute right-1 top-1 w-2 h-2 rounded-full ${
                          item.badgeColor === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                        }`} />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className={`border-t border-neutral-100 px-3 py-3 ${collapsed ? 'px-2' : ''}`}>
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-semibold text-neutral-600 flex-shrink-0">
                {userEmail?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral-700 truncate">{userEmail}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {userRole === 'admin' && (
                    <span className="rounded bg-violet-100 text-violet-700 text-[9px] px-1.5 py-0.5 uppercase tracking-wide">admin</span>
                  )}
                  {userUnit && userRole !== 'admin' && (
                    <span className="rounded bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 uppercase tracking-wide">{userUnit}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" className="text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors">
                ← Site
              </Link>
              <form action="/logout" method="post" className="ml-auto">
                <button type="submit" className="text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors">
                  Sair
                </button>
              </form>
            </div>
          </div>
        ) : (
          <form action="/logout" method="post" className="flex justify-center">
            <button type="submit" title="Sair" className="text-neutral-400 hover:text-neutral-700 text-xs p-1">
              ↩
            </button>
          </form>
        )}
      </div>
    </aside>
  )
}
