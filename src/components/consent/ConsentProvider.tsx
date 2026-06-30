'use client'

/**
 * ConsentProvider — estado global de consentimento de cookies.
 *
 * Exposto via useConsent():
 *  - consent: ConsentState | null   (null = visitante ainda não decidiu)
 *  - ready: boolean                 (já leu o cookie? evita flash)
 *  - showBanner / openPreferences / closePreferences
 *  - acceptAll / rejectAll / save(categorias)
 *
 * Também escuta o evento DOM `hmzt:open-cookie-prefs`, para que qualquer
 * link "Preferências de cookies" (inclusive na Política de Cookies) possa
 * reabrir o painel sem precisar de acesso ao contexto.
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  DENIED,
  GRANTED_ALL,
  readConsentClient,
  writeConsentClient,
  type ConsentCategory,
  type ConsentState,
} from '@/lib/consent'

interface ConsentContextValue {
  consent: ConsentState | null
  ready: boolean
  showBanner: boolean
  prefsOpen: boolean
  openPreferences: () => void
  closePreferences: () => void
  acceptAll: () => void
  rejectAll: () => void
  save: (categories: Record<ConsentCategory, boolean>) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export const OPEN_PREFS_EVENT = 'hmzt:open-cookie-prefs'

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [ready, setReady] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)

  useEffect(() => {
    setConsent(readConsentClient())
    setReady(true)
  }, [])

  const persist = useCallback((categories: { analytics: boolean; marketing: boolean }) => {
    const saved = writeConsentClient({ ...DENIED, ...categories })
    setConsent(saved)
    setPrefsOpen(false)
    // Notifica scripts de analytics para reavaliarem o consentimento.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hmzt:consent-changed', { detail: saved }))
    }
  }, [])

  const acceptAll = useCallback(() => persist(GRANTED_ALL), [persist])
  const rejectAll = useCallback(() => persist(DENIED), [persist])
  const save = useCallback(
    (categories: Record<ConsentCategory, boolean>) => persist(categories),
    [persist],
  )

  const openPreferences = useCallback(() => setPrefsOpen(true), [])
  const closePreferences = useCallback(() => setPrefsOpen(false), [])

  useEffect(() => {
    const handler = () => setPrefsOpen(true)
    window.addEventListener(OPEN_PREFS_EVENT, handler)
    return () => window.removeEventListener(OPEN_PREFS_EVENT, handler)
  }, [])

  const showBanner = ready && consent === null

  return (
    <ConsentContext.Provider
      value={{
        consent,
        ready,
        showBanner,
        prefsOpen,
        openPreferences,
        closePreferences,
        acceptAll,
        rejectAll,
        save,
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error('useConsent deve ser usado dentro de <ConsentProvider>')
  }
  return ctx
}

/** Dispara a abertura do painel de preferências de qualquer lugar do DOM. */
export function openCookiePreferences() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_PREFS_EVENT))
  }
}
