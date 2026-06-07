'use client'

/**
 * SiteFooter — rodapé canônico da House Mazzutti.
 * Espelha o rodapé padrão usado nas páginas de portfólio (logo, redes,
 * copyright) e acrescenta a linha de links legais + preferências de cookies.
 */

import Link from 'next/link'
import SiteFooterLinks from './SiteFooterLinks'

export default function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] px-12 py-8">
      <div className="flex flex-col items-center space-y-6">
        <Link className="font-newsreader text-xl font-semibold tracking-widest text-white no-underline" href="/">HOUSE MAZZUTTI</Link>
        <div className="flex space-x-8">
          <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">INSTAGRAM</Link>
          <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LINKEDIN</Link>
        </div>
        <div className="text-white">
          <SiteFooterLinks />
        </div>
        <p className="text-[#808080] font-inter text-[10px] tracking-wider">© 2026 House Mazzutti</p>
      </div>
    </footer>
  )
}
