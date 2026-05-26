/**
 * Tracking — Meta Pixel + Google Analytics 4
 *
 * Injetado uma vez por página via <Tracking />.
 * Lê os IDs de `process.env.NEXT_PUBLIC_FB_PIXEL_ID` e
 * `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`. Se nenhum estiver
 * configurado, o componente não renderiza nada.
 *
 * Eventos custom usam o helper `track()` exportado abaixo.
 *   track('ViewContent',     { content_name, content_ids, value, currency })
 *   track('InitiateCheckout',{ content_name, content_ids, value, currency })
 *   track('Purchase',        { value, currency, content_ids })
 *
 * Cada chamada dispara tanto no fbq quanto no gtag.
 */
'use client'

import Script from 'next/script'

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', event, payload)
    }
  } catch {}
  try {
    if (typeof window.gtag === 'function') {
      // GA4 usa nomes em snake_case
      const gaEvent =
        event === 'ViewContent'
          ? 'view_item'
          : event === 'InitiateCheckout'
            ? 'begin_checkout'
            : event === 'AddToCart'
              ? 'add_to_cart'
              : event === 'Purchase'
                ? 'purchase'
                : event === 'Lead'
                  ? 'generate_lead'
                  : 'sign_up'
      window.gtag('event', gaEvent, {
        currency: payload.currency,
        value: payload.value,
        items: payload.content_ids?.map((id) => ({
          item_id: id,
          item_name: payload.content_name,
        })),
        ...payload,
      })
    }
  } catch {}
}

export default function Tracking() {
  if (!FB_PIXEL_ID && !GA_ID) return null

  return (
    <>
      {FB_PIXEL_ID && (
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

      {GA_ID && (
        <>
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: true });
              `,
            }}
          />
        </>
      )}
    </>
  )
}
