/**
 * Tracking — Meta Pixel + Google Analytics 4 + Google Ads Consent Mode v2
 *
 * Gerencia consentimento LGPD e disparo de eventos.
 * O gtag base (GA4 + Ads) é carregado em layout.js com consent defaults=denied.
 * Este componente atualiza o consentimento quando o usuário decide e dispara
 * o pageview GA4 (que foi desativado no layout para evitar double-count).
 *
 * Conversões Google Ads: defina NEXT_PUBLIC_GADS_LEAD_LABEL e
 * NEXT_PUBLIC_GADS_PURCHASE_LABEL nas env vars com os labels da conta.
 *   track('Lead',     { lead_type: 'contato', value: 0 })
 *   track('Purchase', { value: 149, currency: 'BRL', transaction_id: 'xxx' })
 */
'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { useConsent } from '@/components/consent/ConsentProvider'

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GADS_ID = 'AW-16938050518'
const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL ?? ''
const GADS_PURCHASE_LABEL = process.env.NEXT_PUBLIC_GADS_PURCHASE_LABEL ?? ''

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export type TrackEvent =
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'AddToCart'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'

export interface TrackPayload {
  content_name?: string
  content_ids?: string[]
  content_type?: 'product' | 'product_group'
  value?: number
  currency?: string
  num_items?: number
  [key: string]: unknown
}

export function track(event: TrackEvent, payload: TrackPayload = {}) {
  if (typeof window === 'undefined') return

  // Meta Pixel
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', event, payload)
    }
  } catch {}

  // GA4 + Google Ads
  try {
    if (typeof window.gtag === 'function') {
      const gaEventMap: Record<TrackEvent, string> = {
        ViewContent: 'view_item',
        InitiateCheckout: 'begin_checkout',
        AddToCart: 'add_to_cart',
        Purchase: 'purchase',
        Lead: 'generate_lead',
        CompleteRegistration: 'sign_up',
      }
      const gaEvent = gaEventMap[event]
      window.gtag('event', gaEvent, {
        currency: payload.currency,
        value: payload.value,
        items: payload.content_ids?.map((id) => ({
          item_id: id,
          item_name: payload.content_name,
        })),
        ...payload,
      })

      // Google Ads conversions específicas (Smart Bidding)
      if (event === 'Lead' && GADS_LEAD_LABEL) {
        window.gtag('event', 'conversion', {
          send_to: `${GADS_ID}/${GADS_LEAD_LABEL}`,
          value: payload.value ?? 0,
          currency: payload.currency ?? 'BRL',
        })
      }
      if (event === 'Purchase' && GADS_PURCHASE_LABEL) {
        window.gtag('event', 'conversion', {
          send_to: `${GADS_ID}/${GADS_PURCHASE_LABEL}`,
          value: payload.value ?? 0,
          currency: payload.currency ?? 'BRL',
          transaction_id: payload.transaction_id as string | undefined,
        })
      }
    }
  } catch {}
}

export default function Tracking() {
  const { consent } = useConsent()

  const allowAnalytics = consent?.analytics === true
  const allowMarketing = consent?.marketing === true

  // Consent Mode v2 update — dispara quando o usuário decide no banner LGPD.
  // O 'default' já foi configurado como 'denied' no layout.js (beforeInteractive).
  // Este useEffect atualiza o sinal assim que o ConsentProvider tem a decisão.
  useEffect(() => {
    if (consent === null) return // ainda sem decisão
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('consent', 'update', {
      ad_storage: allowMarketing ? 'granted' : 'denied',
      ad_user_data: allowMarketing ? 'granted' : 'denied',
      ad_personalization: allowMarketing ? 'granted' : 'denied',
      analytics_storage: allowAnalytics ? 'granted' : 'denied',
    })
    // Dispara o pageview GA4 agora que o consent foi estabelecido
    // (layout.js carregou com send_page_view: false para evitar double-count)
    if (allowAnalytics && GA_ID) {
      window.gtag('event', 'page_view', { send_to: GA_ID })
    }
  }, [allowAnalytics, allowMarketing, consent])

  return (
    <>
      {FB_PIXEL_ID && allowMarketing && (
        <>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  )
}
