'use client'

/**
 * CookieBanner — banner de consentimento LGPD granular (House Mazzutti).
 *
 * Dois modos:
 *  - Barra compacta: aparece para quem ainda não decidiu. Ações:
 *    Aceitar tudo · Recusar não-essenciais · Personalizar.
 *  - Painel de preferências: toggles por categoria (Essenciais travado),
 *    aberto via "Personalizar" ou pelo link "Preferências de cookies".
 *
 * Estética alinhada à marca: preto/branco, labels em caixa-alta com
 * tracking, botões com borda fina.
 */

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useConsent } from './ConsentProvider'

export default function CookieBanner() {
  const t = useTranslations('cookies')
  const { showBanner, prefsOpen, openPreferences, closePreferences, acceptAll, rejectAll, save, consent } =
    useConsent()

  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  // Ao abrir o painel, parte do estado atual (ou tudo desligado se 1ª visita).
  useEffect(() => {
    if (prefsOpen) {
      setAnalytics(consent?.analytics ?? false)
      setMarketing(consent?.marketing ?? false)
    }
  }, [prefsOpen, consent])

  if (!showBanner && !prefsOpen) return null

  return (
    <>
      {/* Painel de preferências */}
      {prefsOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white text-black border border-black/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="font-label uppercase tracking-[0.2em] text-[11px] text-black/60">
                  {t('prefs.eyebrow')}
                </h2>
                <p className="font-body text-sm text-black/70 leading-relaxed">{t('prefs.intro')}</p>
              </div>

              <div className="space-y-4">
                <CategoryRow
                  title={t('cat.essential.title')}
                  desc={t('cat.essential.desc')}
                  checked
                  locked
                  lockedLabel={t('always')}
                />
                <CategoryRow
                  title={t('cat.analytics.title')}
                  desc={t('cat.analytics.desc')}
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CategoryRow
                  title={t('cat.marketing.title')}
                  desc={t('cat.marketing.desc')}
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>

              <p className="font-body text-xs text-black/50 leading-relaxed">
                {t('policyPrefix')}{' '}
                <Link href="/politicas/cookies" className="underline hover:text-black">
                  {t('policyLink')}
                </Link>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => save({ analytics, marketing })}
                  className="flex-1 border-[0.5px] border-black bg-black px-6 py-3 font-label uppercase tracking-[0.2em] text-[11px] text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  {t('save')}
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 border-[0.5px] border-black px-6 py-3 font-label uppercase tracking-[0.2em] text-[11px] text-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  {t('acceptAll')}
                </button>
              </div>
              {!showBanner && (
                <button
                  onClick={closePreferences}
                  className="w-full font-label uppercase tracking-[0.2em] text-[10px] text-black/40 hover:text-black transition-colors"
                >
                  {t('close')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Barra compacta */}
      {showBanner && !prefsOpen && (
        <div className="fixed bottom-0 inset-x-0 z-[90] bg-black text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-5 py-5 md:py-6 flex flex-col lg:flex-row lg:items-center gap-5">
            <p className="font-body text-sm text-white/80 leading-relaxed flex-1">
              {t('bar.text')}{' '}
              <Link href="/politicas/cookies" className="underline hover:text-white whitespace-nowrap">
                {t('policyLink')}
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={openPreferences}
                className="border-[0.5px] border-white/40 px-6 py-3 font-label uppercase tracking-[0.2em] text-[11px] text-white/80 hover:border-white hover:text-white transition-all duration-300"
              >
                {t('customize')}
              </button>
              <button
                onClick={rejectAll}
                className="border-[0.5px] border-white px-6 py-3 font-label uppercase tracking-[0.2em] text-[11px] text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                {t('reject')}
              </button>
              <button
                onClick={acceptAll}
                className="border-[0.5px] border-white bg-white px-6 py-3 font-label uppercase tracking-[0.2em] text-[11px] text-black hover:bg-transparent hover:text-white transition-all duration-300"
              >
                {t('acceptAll')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function CategoryRow({
  title,
  desc,
  checked,
  onChange,
  locked,
  lockedLabel,
}: {
  title: string
  desc: string
  checked: boolean
  onChange?: (v: boolean) => void
  locked?: boolean
  lockedLabel?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-black/10 pt-4">
      <div className="flex-1">
        <h3 className="font-label uppercase tracking-[0.15em] text-[12px] text-black">{title}</h3>
        <p className="font-body text-xs text-black/60 leading-relaxed mt-1">{desc}</p>
      </div>
      {locked ? (
        <span className="font-label uppercase tracking-[0.15em] text-[10px] text-black/40 mt-1 whitespace-nowrap">
          {lockedLabel}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange?.(!checked)}
          className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
            checked ? 'bg-black' : 'bg-black/20'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
              checked ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      )}
    </div>
  )
}
