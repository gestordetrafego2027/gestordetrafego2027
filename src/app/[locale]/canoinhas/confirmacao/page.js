'use client'

import Link from 'next/link'

export default function TourConfirmacaoPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body antialiased flex items-center justify-center px-6">
      <div className="max-w-[480px] text-center">
        <span className="font-label uppercase tracking-[0.45em] text-[9px] text-white/25 block mb-8">
          House Mazzutti · Tour Canoinhas
        </span>
        <h1 className="font-headline font-light text-[2.2rem] md:text-[3rem] text-white leading-tight mb-6">
          Reserva confirmada.
        </h1>
        <p className="font-body text-white/50 text-base leading-relaxed mb-10">
          Recebemos seu pagamento. Você receberá a confirmação por e-mail com todos os detalhes da sua agenda.
        </p>
        <div className="hmzt-line w-12 mx-auto mb-10" style={{height:'0.5px',background:'currentColor',opacity:.2}} />
        <p className="font-body text-white/30 text-sm mb-8">
          Dúvidas? Fale diretamente com a House:
        </p>
        <a
          href="https://wa.me/5511952347533?text=Ol%C3%A1%2C+fiz+minha+reserva+no+Tour+Canoinhas+e+gostaria+de+confirmar+os+detalhes."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white/30 text-white px-10 py-4 font-label uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors mb-8"
        >
          WhatsApp House Mazzutti
        </a>
        <div className="mt-8">
          <Link
            href="/pt/canoinhas"
            className="font-label uppercase tracking-[0.3em] text-[8px] text-white/20 hover:text-white/40 transition-colors"
          >
            ← Voltar à página do Tour
          </Link>
        </div>
      </div>
    </div>
  )
}
