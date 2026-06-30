'use client'

import { Link } from '@/i18n/navigation'
import SiteFooterLinks from './SiteFooterLinks'
import { useTranslations } from 'next-intl'
import { social } from '@/config/site'

export default function SiteFooter() {
  const t = useTranslations('footer')
  return (
    <footer className="bg-white border-t border-zinc-200 px-12 py-8">
      <div className="flex flex-col items-center space-y-6">
        <Link className="hm-logo text-xl text-black no-underline" href="/">HOUSE MAZZUTTI</Link>
        <div className="flex space-x-8">
          <a className="text-black font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-50 transition-opacity" href={social.instagram.url} target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          <a className="text-black font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-50 transition-opacity" href={social.linkedin.url} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        </div>
        <div className="text-black">
          <SiteFooterLinks />
        </div>
        <p className="text-zinc-400 font-inter text-[10px] tracking-wider">{t('copyright')}</p>
      </div>
    </footer>
  )
}
