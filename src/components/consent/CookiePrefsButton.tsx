'use client'

/**
 * CookiePrefsButton — reabre o painel de preferências de cookies de qualquer
 * lugar (Política de Cookies, rodapé, etc.) via evento global, sem depender
 * do contexto de consentimento estar presente no ponto de uso.
 */

import { openCookiePreferences } from './ConsentProvider'

export default function CookiePrefsButton({
  label = 'Gerenciar preferências de cookies',
  className = '',
}: {
  label?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={
        className ||
        'inline-flex items-center gap-2 border-[0.5px] border-zinc-900 px-6 py-3 font-label uppercase tracking-[0.2em] text-[11px] text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300'
      }
    >
      {label}
    </button>
  )
}
