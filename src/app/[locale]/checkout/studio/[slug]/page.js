'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { WaitlistForm } from '@/components/academy/WaitlistForm';

const SERVICE_LABEL = {
  book:   { label: 'Book Profissional', backHref: '/studio/book' },
  ensaio: { label: 'Ensaio Pessoal',    backHref: '/studio/ensaio' },
};

export default function StudioCheckoutPage() {
  const { slug } = useParams();
  const service = slug?.split('-')[0];
  const serviceInfo = SERVICE_LABEL[service] ?? { label: 'Studio', backHref: '/studio' };

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      <div className="border-b border-zinc-200 bg-white px-8 py-5 flex items-center justify-between">
        <Link href="/" className="hm-logo" style={{ fontSize: '20px', color: 'black' }}>
          <span className="hm-house">House</span>
          <span className="hm-mazzutti">Mazzutti</span>
        </Link>
        <span className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400">
          HOUSE MAZZUTTI STUDIO
        </span>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-20 md:py-32">
        <p className="font-label uppercase tracking-[0.22em] text-[9px] text-zinc-400 mb-6">
          {serviceInfo.label.toUpperCase()} · DISPONÍVEL EM BREVE
        </p>
        <h1 className="font-headline text-3xl md:text-4xl text-black tracking-tight mb-4 leading-tight">
          Entre na lista de espera.
        </h1>
        <p className="font-body text-sm text-zinc-500 mb-10 leading-relaxed max-w-prose">
          As agendas para {serviceInfo.label.toLowerCase()} estão temporariamente suspensas.
          Deixe seus dados e avisamos em primeira mão quando reabrirmos.
        </p>

        <WaitlistForm product={String(slug ?? 'studio')} />

        <div className="mt-10">
          <Link
            href={serviceInfo.backHref}
            className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-black transition-colors"
          >
            ← Voltar para {serviceInfo.label}
          </Link>
        </div>
      </div>
    </main>
  );
}
