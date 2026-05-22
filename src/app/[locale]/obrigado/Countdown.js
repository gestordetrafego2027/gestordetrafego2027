'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Countdown({ seconds = 5 }) {
  const router = useRouter()
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="flex flex-col items-center gap-8 mt-12">
      <p className="font-body text-sm text-zinc-500">
        Você será redirecionado em {remaining} {remaining === 1 ? 'segundo' : 'segundos'}...
      </p>
      <Link
        href="/"
        className="border border-black px-8 py-3 font-label uppercase tracking-wider text-sm text-black hover:bg-black hover:text-white transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
