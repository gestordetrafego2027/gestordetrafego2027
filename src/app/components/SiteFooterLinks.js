'use client'

import Link from 'next/link'
import CookiePrefsButton from '@/components/consent/CookiePrefsButton'
import { useTranslations } from 'next-intl'

const linkClass =
  'font-inter text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-90 transition-opacity'

export default function SiteFooterLinks() {
  const t = useTranslations('nav')
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      <Link href="/politicas/privacidade" className={linkClass}>{t('privacidade')}</Link>
      <Link href="/politicas/termos-de-uso" className={linkClass}>{t('termos')}</Link>
      <Link href="/politicas/cookies" className={linkClass}>{t('cookies_link')}</Link>
      <CookiePrefsButton label={t('cookies_prefs')} className={linkClass} />
      <Link href="/politicas" className={linkClass}>Central de Privacidade e Termos →</Link>
    </div>
  )
}
