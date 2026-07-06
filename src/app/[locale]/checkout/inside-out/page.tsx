import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { WaitlistForm } from '@/components/academy/WaitlistForm'

export const metadata: Metadata = {
  title: 'Inside Out Masterclass · House Mazzutti Academy',
  robots: { index: false, follow: false },
}

export default function InsideOutWaitlistPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0e0e0e', color: '#f0ece4' }}>
      <div
        className="border-b px-8 py-5 flex items-center justify-between"
        style={{ borderColor: '#222' }}
      >
        <Link href="/" className="hm-logo" style={{ fontSize: '20px', color: '#f0ece4' }}>
          <span className="hm-house">House</span>
          <span className="hm-mazzutti">Mazzutti</span>
        </Link>
        <span
          className="font-label uppercase tracking-[0.22em] text-[9px]"
          style={{ color: '#555' }}
        >
          ACADEMY · MASTERCLASS
        </span>
      </div>

      <div className="max-w-[600px] mx-auto px-6 py-20 md:py-32">
        <p
          className="font-label uppercase tracking-[0.22em] text-[9px] mb-6"
          style={{ color: '#666' }}
        >
          INSIDE OUT · MASTERCLASS ON-DEMAND · DISPONÍVEL EM BREVE
        </p>
        <h1
          className="font-headline text-4xl md:text-5xl tracking-tight mb-4 leading-tight"
          style={{ color: '#f0ece4' }}
        >
          Entre na lista
          <br />
          de espera.
        </h1>
        <p
          className="font-body text-sm mb-10 leading-relaxed max-w-prose"
          style={{ color: '#888' }}
        >
          A masterclass está temporariamente suspensa para novas matrículas. Deixe seus dados e você
          será avisado em primeira mão quando reabrirmos o acesso.
        </p>

        <WaitlistForm
          product="inside-out-masterclass"
          accentColor="#f0ece4"
          accentTextColor="#0e0e0e"
        />

        <div className="mt-10">
          <Link
            href="/pt/academy/inside-out"
            className="font-label uppercase tracking-[0.22em] text-[9px] hover:opacity-100 transition-opacity"
            style={{ color: '#555' }}
          >
            ← Voltar para Inside Out
          </Link>
        </div>
      </div>
    </main>
  )
}
