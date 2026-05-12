'use client'

import { useState } from 'react'
import FormDrawer from './FormDrawer'
import FormStudio from './forms/FormStudio'
import FormProdutora from './forms/FormProdutora'
import FormAgenciaB2B from './forms/FormAgenciaB2B'

const CONFIG = {
  studio: {
    title: 'Quero algo assim',
    subtitle: 'Conte sobre seu projeto. Respondemos em até 1 dia útil.',
    drawerTitle: 'Iniciar projeto',
    drawerSubtitle: 'Conte-nos sobre seu projeto. Respondemos em até 1 dia útil.',
    cta: 'Quero algo assim',
    eyebrow: 'Studio · Direção de imagem',
  },
  produtora: {
    title: 'Quero algo assim',
    subtitle: 'Conte sobre sua marca. Respondemos em até 1 dia útil.',
    drawerTitle: 'Iniciar projeto',
    drawerSubtitle: 'Conte-nos sobre seu projeto. Respondemos em até 1 dia útil.',
    cta: 'Quero algo assim',
    eyebrow: 'Produtora · Audiovisual',
  },
  agencia: {
    title: 'Quero algo assim',
    subtitle: 'Conte sobre o desafio da sua marca. Respondemos em até 1 dia útil.',
    drawerTitle: 'Iniciar projeto',
    drawerSubtitle: 'Conte-nos sobre seu desafio. Respondemos em até 1 dia útil.',
    cta: 'Quero algo assim',
    eyebrow: 'Agência · Branding e estratégia',
  },
}

export default function PortfolioCTA({ businessUnit = 'studio', projectSlug = null }) {
  const cfg = CONFIG[businessUnit] || CONFIG.studio
  const [isOpen, setIsOpen] = useState(false)
  const sourceUrl = projectSlug ? `/portfolio-${businessUnit}/${projectSlug}` : `/portfolio-${businessUnit}`
  const ctaLocation = projectSlug ? `portfolio_${projectSlug}` : 'portfolio'

  return (
    <>
      <section className="bg-[#0a0a0a] text-white px-12 py-24 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 mb-4">{cfg.eyebrow}</p>
            <h2 className="font-newsreader text-3xl md:text-4xl text-white mb-3">{cfg.title}.</h2>
            <p className="font-inter text-sm text-white/60 max-w-md">{cfg.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="border-[0.5px] border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[11px] text-white hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
          >
            {cfg.cta}
          </button>
        </div>
      </section>

      <FormDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={cfg.drawerTitle}
        subtitle={cfg.drawerSubtitle}
      >
        {businessUnit === 'studio' && (
          <FormStudio
            onClose={() => setIsOpen(false)}
            serviceType="book"
            sourceUrl={sourceUrl}
            ctaLocation={ctaLocation}
          />
        )}
        {businessUnit === 'produtora' && (
          <FormProdutora
            onClose={() => setIsOpen(false)}
            sourceUrl={sourceUrl}
            ctaLocation={ctaLocation}
          />
        )}
        {businessUnit === 'agencia' && (
          <FormAgenciaB2B
            onClose={() => setIsOpen(false)}
            sourceUrl={sourceUrl}
            ctaLocation={ctaLocation}
          />
        )}
      </FormDrawer>
    </>
  )
}
