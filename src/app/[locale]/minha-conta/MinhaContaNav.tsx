'use client'

import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'

const NAV = [
  { href: '/minha-conta', label: 'Visão geral', exact: true },
  { href: '/minha-conta/pedidos', label: 'Meus pedidos' },
  { href: '/minha-conta/dados', label: 'Dados pessoais' },
  { href: '/minha-conta/senha', label: 'Alterar senha' },
  { href: '/minha-conta/lgpd', label: 'Privacidade & LGPD' },
]

export function MinhaContaNav() {
  const pathname = usePathname()

  function isActive(href: string, exact: boolean | undefined) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {NAV.map((item) => {
        const active = isActive(item.href, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              active
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:bg-white hover:text-neutral-900'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
      <form action="/logout" method="POST" className="mt-auto">
        <button
          type="submit"
          className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          Sair da conta
        </button>
      </form>
    </nav>
  )
}
