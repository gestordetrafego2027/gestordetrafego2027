/**
 * ConversionOnMount — dispara um evento de conversão uma única vez ao montar.
 *
 * Usado nas páginas de sucesso (server components) para registrar a conversão
 * no GA4 + Meta Pixel via o helper `track()`.
 *
 *   <ConversionOnMount event="Purchase" payload={{ value, currency, transaction_id }} />
 *   <ConversionOnMount event="Lead" payload={{ lead_type: 'produtora' }} />
 */
'use client'

import { useEffect, useRef } from 'react'
import { track, type TrackEvent, type TrackPayload } from './Tracking'

interface Props {
  event: TrackEvent
  payload?: TrackPayload
}

export default function ConversionOnMount({ event, payload }: Props) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    track(event, payload ?? {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
