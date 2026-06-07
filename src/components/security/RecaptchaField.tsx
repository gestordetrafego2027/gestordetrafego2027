'use client'

/**
 * RecaptchaField — campo oculto que injeta um token reCAPTCHA v3 em
 * formulários que usam Server Actions (login, cadastro, recuperar senha).
 *
 * O token é gerado no mount e renovado periodicamente (validade ~120s),
 * ficando sempre disponível em `formData.get('recaptchaToken')` no servidor.
 *
 * Uso:
 *   <form action={serverAction}>
 *     <RecaptchaField action="login" />
 *     ...
 *   </form>
 */

import { useEffect, useRef } from 'react'
import { getRecaptchaToken, recaptchaEnabled } from '@/lib/recaptcha/client'

export default function RecaptchaField({ action }: { action: string }) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!recaptchaEnabled) return
    let active = true

    const refresh = async () => {
      const token = await getRecaptchaToken(action)
      if (active && ref.current && token) ref.current.value = token
    }

    refresh()
    const id = setInterval(refresh, 100_000) // renova antes de expirar (120s)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [action])

  return <input ref={ref} type="hidden" name="recaptchaToken" defaultValue="" />
}
