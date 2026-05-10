"use client";
import React from "react";
import Link from "next/link";
import Header from "@/app/components/Header";

export default function Portfolio() {
  return (
    <div className="page-portfolio selection:bg-black selection:text-white" style={{ overflowY: 'auto', height: '100vh' }}>
      <h1 className="sr-only">Portfólio House Mazzutti — Hub Criativo & Estratégico</h1>
      <Header variant="light" />
      <main>
        {/* STUDIO */}
        <section className="flex flex-col md:flex-row" style={{ minHeight: '100vh' }}>
          <div className="w-full md:w-1/2 bg-neutral-100 relative overflow-hidden" style={{ minHeight: '50vh' }}>
            <img alt="Studio" className="w-full h-full object-cover grayscale" style={{ position: 'absolute', inset: 0 }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4KUVLJUL-uxvDKAfn2IfswuESvjVPbRKyIhOr6RAgX-gPHUSbYctz9jhHVRyhrPOvgp_F3f339FTKZ2mhKtmRsw1Or-AmM4LeyBQXQLMRP31QoOgFfQPK3xfhY4RNtunnrYPZC4V9mEPkrfWjBz0iKBMIwvWokt-XYQceqHYBtZErUvjI2khPxLKapxWYqHS0N2VjtMveW4bOeceZhgsr5k3bQ6DOR40hyL8fpJ4kuyCXaGpvOMPgit5ZRt4CcmS9Ua18PsBPgXw" />
          </div>
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-24">
            <div className="max-w-md w-full space-y-[27px]">
              <span className="block text-[9px] uppercase tracking-[0.3em] font-light text-neutral-400">STUDIO</span>
              <h2 className="text-[2rem] md:text-[2.75rem] font-body font-light tracking-widest text-black leading-tight">HMZT STUDIO</h2>
              <p className="font-headline italic text-[1.1rem] md:text-[1.32rem] text-neutral-500 leading-relaxed">"Direção de pessoas: books, ensaios e retratos com tratamento editorial premium."</p>
              <div className="fine-line"></div>
              <p className="text-[0.77rem] md:text-[0.88rem] text-neutral-600 tracking-wide font-light">Para celebridades, executivos e profissionais cuja imagem é o próprio ativo de mercado.</p>
              <div className="pt-[20px]">
                <Link className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" href="/portfolio-studio">
                  VER TODOS <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTORA */}
        <section className="flex flex-col md:flex-row-reverse border-t border-neutral-100" style={{ minHeight: '100vh' }}>
          <div className="w-full md:w-1/2 bg-neutral-100 relative overflow-hidden" style={{ minHeight: '50vh' }}>
            <img alt="Produtora" className="w-full h-full object-cover grayscale" style={{ position: 'absolute', inset: 0 }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxxCED8XmlkgNbuGiBWOIoL_z8W4KNtk73xn8vQ-iW8GDkkVNi7X1jqkXb6AlWm6RX3cw0DJKVuj64s5VKTwHN4-JRumUk7k1WdMY2xl4wCBNUZM97L1mfESGVn3jK3UxigcDBkEptMRWuiNt9eJwAk9--RWcaUJIgxvPkcjp6XwpOxvSNIzA9LKZ4PXxdt9mmLGG_uMCYlYndBP79YuGkiWMCuzgJDFBDxSMg4BlXyypJqLa3rJCkOY0YCgpUX25kL9KLQuyenBE" />
          </div>
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-24">
            <div className="max-w-md w-full space-y-[27px]">
              <span className="block text-[9px] uppercase tracking-[0.3em] font-light text-neutral-400">PRODUTORA</span>
              <h2 className="text-[2rem] md:text-[2.75rem] font-body font-light tracking-widest text-black leading-tight">HMZT PRODUTORA</h2>
              <p className="font-headline italic text-[1.1rem] md:text-[1.32rem] text-neutral-500 leading-relaxed">"Fashion films, campanhas publicitárias e brand content sob direção autoral."</p>
              <div className="fine-line"></div>
              <p className="text-[0.77rem] md:text-[0.88rem] text-neutral-600 tracking-wide font-light">Captação em alta resolução com diretor criativo presente em set. Acabamento de campanha global.</p>
              <div className="pt-[20px]">
                <Link className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" href="/portfolio-produtora">
                  VER TODOS <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AGÊNCIA */}
        <section className="flex flex-col md:flex-row border-t border-neutral-100" style={{ minHeight: '100vh' }}>
          <div className="w-full md:w-1/2 bg-neutral-100 relative overflow-hidden" style={{ minHeight: '50vh' }}>
            <img alt="Agência" className="w-full h-full object-cover grayscale" style={{ position: 'absolute', inset: 0 }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9JOvmd61-d55EzR904FOgUgD6XCybSttKhy0e2AuHAcJFi1SIYxiCe0tiIr2GvnpHMiog9GeIBi_w14F-CbUeWoM_knk3_BS8YPNnduZwKZZ0dafgoO95ND97D968qi9tDRQwmL5bsnew3mZb7VpUkAIxCt8wbPRvypRvjcbHp7w9MqqdgMX5Z0dU939Tx5vH0GzHOBwMC-lSn3ZA1ytDq_2yVlpnVme8CsCuDj4cBc63ZO2BrbOQq1tTnWinjn4XJSTR-BUhJKg" />
          </div>
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-24">
            <div className="max-w-md w-full space-y-[27px]">
              <span className="block text-[9px] uppercase tracking-[0.3em] font-light text-neutral-400">AGÊNCIA</span>
              <h2 className="text-[2rem] md:text-[2.75rem] font-body font-light tracking-widest text-black leading-tight">HMZT AGÊNCIA</h2>
              <p className="font-headline italic text-[1.1rem] md:text-[1.32rem] text-neutral-500 leading-relaxed">"Branding, identidade visual, sites premium e plataformas digitais de alta conversão."</p>
              <div className="fine-line"></div>
              <p className="text-[0.77rem] md:text-[0.88rem] text-neutral-600 tracking-wide font-light">Construção e reposicionamento de marca para empresas que precisam ocupar espaço — não disputar atenção.</p>
              <div className="pt-[20px]">
                <Link className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" href="/portfolio-agencia">
                  VER TODOS <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
