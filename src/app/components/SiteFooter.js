'use client'

import Link from 'next/link'
import SiteFooterLinks from './SiteFooterLinks'
import { useTranslations } from 'next-intl'

export default function SiteFooter() {
  const t = useTranslations('footer')
  return (
    <footer className="bg-white border-t border-zinc-200 px-12 py-8">
      <div className="flex flex-col items-center space-y-6">
        <Link className="font-newsreader text-xl font-semibold tracking-widest text-black no-underline" href="/">HOUSE MAZZUTTI</Link>
        <div className="flex space-x-8">
          <Link className="text-black font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-50 transition-opacity" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">INSTAGRAM</Link>
          <Link className="text-black font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-50 transition-opacity" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LINKEDIN</Link>
        </div>
        <div className="text-black">
          <SiteFooterLinks />
        </div>
        <p className="text-zinc-400 font-inter text-[10px] tracking-wider">{t('copyright')}</p>
      </div>
    </footer>
  )
}
