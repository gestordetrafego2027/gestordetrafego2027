'use client'

import { useEffect } from 'react'
import { track } from '@/components/analytics/Tracking'

export function ProductViewTracker({
  slug,
  name,
  price,
}: {
  slug: string
  name: string
  price?: number
}) {
  useEffect(() => {
    track('ViewContent', {
      content_ids: [slug],
      content_name: name,
      content_type: 'product',
      ...(price !== undefined && { value: price, currency: 'BRL' }),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
