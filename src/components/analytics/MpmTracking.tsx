/**
 * MpmTracking — tracking client-side específico da landing do livro
 * Marketing para Modelos · Vol. 01.
 *
 * - Dispara ViewContent ao montar
 * - Expõe <BuyLink /> que dispara InitiateCheckout antes de navegar
 */
'use client'

import { useEffect } from 'react'
import { track } from './Tracking'

const PRODUCT_PAYLOAD = {
  content_name: 'Marketing para Modelos · Vol. 01',
  content_ids: ['marketing-para-modelos'],
  content_type: 'product' as const,
  value: 49,
  currency: 'BRL',
}

export function MpmViewContent() {
  useEffect(() => {
    track('ViewContent', PRODUCT_PAYLOAD)
  }, [])
  return null
}

interface BuyLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export function BuyLink({ href, className, children }: BuyLinkProps) {
  function onClick() {
    track('InitiateCheckout', PRODUCT_PAYLOAD)
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}
