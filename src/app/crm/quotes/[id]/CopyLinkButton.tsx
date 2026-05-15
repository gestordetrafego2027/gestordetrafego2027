'use client'

import { useState } from 'react'

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch {
          window.prompt('Copie o link manualmente:', url)
        }
      }}
      className="rounded border border-neutral-300 text-sm px-3 py-2 hover:bg-neutral-100"
    >
      {copied ? '✓ Copiado!' : '🔗 Copiar link público'}
    </button>
  )
}
