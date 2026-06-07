'use client'

/**
 * SiteFooterLinks — linha discreta de links legais para o rodapé.
 * Inclui o botão "Preferências de cookies" (reabre o painel de consentimento).
 * Herda a cor do rodapé (usa opacidade sobre currentColor), funcionando tanto
 * em rodapés escuros quanto claros.
 */

import Link from 'next/link'
import CookiePrefsButton from '@/components/consent/CookiePrefsButton'

const linkClass =
  'font-inter text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-90 transition-opacity'

export default function SiteFooterLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      <Link href="/politicas/privacidade" className={linkClass}>Privacidade</Link>
      <Link href="/politicas/termos-de-uso" className={linkClass}>Termos</Link>
      <Link href="/politicas/cookies" className={linkClass}>Cookies</Link>
      <CookiePrefsButton label="Preferências de cookies" className={linkClass} />
    </div>
  )
}
