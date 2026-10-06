'use client'

import FormNewsletter from './forms/FormNewsletter'

export default function NewsletterStrip({
  sourceUrl,
  variant = 'dark',
  title = 'Carta House Mazzutti.',
  subtitle = 'Conteúdo editorial sobre direção, marca e imagem. Sem ruído. Cancele quando quiser.',
}) {
  const isDark = variant === 'dark'
  return (
    <section className={`${isDark ? 'bg-neutral-950 text-white border-t border-white/5' : 'bg-zinc-50/70 text-black border-t border-black/5'} px-12 py-24 md:py-32`}>
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <h2 className={`text-h2 mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h2>
          <p className={`text-body ${isDark ? 'text-white/60' : 'text-zinc-600'} measure-editorial`}>
            {subtitle}
          </p>
        </div>
        <div className="md:col-span-7">
          <FormNewsletter sourceUrl={sourceUrl} variant={variant} />
        </div>
      </div>
    </section>
  )
}
