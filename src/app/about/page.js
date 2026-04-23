"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";

/**
 * ABOUT PAGE - HOUSE MAZZUTTI
 * Conversão idêntica do Stitch para React/Next.js
 */
export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            text: "A House Mazzutti trouxe uma clareza que eu não conseguia encontrar sozinho. Eles não apenas criaram uma marca, eles criaram um novo patamar para o meu negócio.",
            author: "JULIANO R. — FOUNDER & CEO",
        },
        {
            text: "Trabalhar com o Lucas e sua equipe foi o melhor investmento do ano. Eles entendem de negócio tanto quanto entendem de design.",
            author: "RICARDO M. — INVESTIDOR",
        },
        {
            text: "Antes da House, eu aparecia. Depois, passei a ocupar espaço. A diferença é exatamente essa.",
            author: "MARINA S. — EMPRESÁRIA",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="page-about bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            {/* SEO Hidden H1 */}
            <h1 className="sr-only">House Mazzutti | Branding Estratégico e Posicionamento de Marca</h1>

            {/* HEADER */}
            <Header variant="dark" />
            <main>
                {/* [1] HERO SECTION */}
                <section className="min-h-[calc(100vh+20px)] flex items-center bg-[#c8c8c8]">
                    <div className="w-full flex flex-col justify-center px-12 py-32 space-y-8 pl-[calc(3rem+15px+20px)] md:pl-[calc(6rem+15px+20px)]">
                        <span className="font-label text-xs text-black">STRATEGIC HOUSE</span>
                        <h2 className="text-5xl md:text-7xl font-headline leading-tight text-black">Vamos além da publicidade.</h2>
                        <p className="text-lg md:text-xl font-headline italic text-[#555555] max-w-md">Estruturamos o seu projeto para comunicar com precisão.</p>
                        
                        {/* Progress Bars */}
                        <div className="space-y-6 pt-8 w-4/5 md:w-1/3">
                            {[
                                { label: "ESTRATÉGIA", value: "92%" },
                                { label: "POSICIONAMENTO", value: "88%" },
                                { label: "DIREÇÃO CRIATIVA", value: "95%" },
                                { label: "PRODUÇÃO", value: "85%" },
                            ].map((item, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex justify-between font-label text-[12px] text-black">
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="h-[8px] bg-[#d5d5d5] w-full relative">
                                        <div 
                                            className="h-full bg-black animate-progress relative" 
                                            style={{ width: item.value, "--target-width": item.value }}
                                        >
                                            <span className="percentage-tag">{item.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* [2] DEPOIMENTOS SECTION */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[500px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-black text-[18vw] uppercase tracking-[0.1em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-50">DEPOIMENTOS</span>
                    </div>
                    
                    {/* Navigation */}
                    <div className="absolute left-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={prevSlide}>
                            <div className="custom-nav-line mr-2"></div>
                            <svg className="transform -translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={nextSlide}>
                            <svg className="transform translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            <div className="custom-nav-line ml-2"></div>
                        </button>
                    </div>

                    {/* Slides */}
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="mb-4">
                            <span className="font-raleway uppercase tracking-[0.4em] text-[10px] text-zinc-500 block mb-1">O QUE DIZEM</span>
                            <h2 className="font-headline text-3xl text-white italic tracking-wide">Depoimentos</h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1">
                                {testimonials.map((t, i) => (
                                    <div key={i} className={`testimonial-slide flex flex-col justify-center ${currentSlide === i ? "active" : ""}`}>
                                        <h3 className="font-headline text-2xl md:text-[2.15rem] text-white leading-snug italic max-w-3xl mx-auto">
                                            "{t.text}"
                                        </h3>
                                        <div className="pt-3">
                                            <p className="font-raleway uppercase tracking-[0.35em] text-[10px] text-white/80 font-light">{t.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Indicators */}
                            <div className="flex space-x-3 pt-4">
                                {testimonials.map((_, i) => (
                                    <button 
                                        key={i} 
                                        className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${currentSlide === i ? "opacity-100" : "opacity-30"}`} 
                                        onClick={() => goToSlide(i)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* [3] STRUCTURE SELECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-4 block">ESCOLHA SEU NÌVEL</span>
                                <h2 className="font-headline text-4xl md:text-5xl tracking-tight">Escolha o nível ideal para o seu momento.</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    {
                                        title: "AGÊNCIA",
                                        subtitle: '"Onde estratégia e posicionamento são definidos"',
                                        items: ["Diagnóstico de marca", "Definição de posicionamento", "Arquitetura de comunicação", "Identidade estratégica"]
                                    },
                                    {
                                        title: "STUDIO",
                                        subtitle: '"Onde a imagem é construída com intenção"',
                                        items: ["Book profissional", "Direção de imagem", "Ensaio editorial", "Produção visual"]
                                    },
                                    {
                                        title: "PRODUTORA",
                                        subtitle: '"Onde a estratégia ganha forma e presença"',
                                        items: ["Produção de conteúdo", "Vídeo estratégico", "Campanha de marca", "Presença digital"]
                                    },
                                    {
                                        title: "HOUSE COMMUNITY",
                                        subtitle: '"Onde o crescimento se sustenta"',
                                        items: ["Acompanhamento contínuo", "Comunidade estratégica", "Acesso a conteúdo", "Suporte de marca"]
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined">
                                        <div>
                                            <h3 className="font-headline text-2xl mb-4 group-hover:text-white uppercase">{card.title}</h3>
                                            <p className="font-body font-light text-sm text-on-surface-variant mb-10 group-hover:text-white/70 italic">{card.subtitle}</p>
                                            <ul className="space-y-4 mb-12">
                                                {card.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                                        <span className="material-symbols-outlined text-lg">check</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button className="w-full border border-black py-4 font-label uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all group-hover:border-white group-hover:text-white">
                                            SAIBA MAIS
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* [4] ORIGEM EDITORIAL */}
                <section className="min-h-[80vh] flex flex-col md:flex-row relative">
                    <div className="w-full md:w-1/2 bg-[#d4c4c4] flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-8">
                            <span className="font-label text-xs text-neutral-400">ORIGEM</span>
                            <h2 className="text-4xl md:text-5xl font-headline leading-tight">A House Mazzutti nasceu de uma convicção simples.</h2>
                            <div className="space-y-6 text-neutral-600 leading-relaxed font-body">
                                <p>Acreditamos que a verdadeira distinção não grita; ela emana. No mercado saturado de ruído, a comunicação silenciosa mas precisa é o que separa os líderes dos seguidores.</p>
                                <p>Cada marca que construímos é tratada como uma obra de curadoria, onde cada detalhe — do tom de voz à textura visual — é um ativo estratégico.</p>
                            </div>
                            <div className="pt-8 italic font-headline text-3xl opacity-80">Angelo Mazzutti</div>
                        </div>
                    </div>
                    {/* Vertical Divider */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>
                    
                    <div className="w-full md:w-1/2 bg-[#e8e8e8] relative overflow-hidden h-full min-h-[500px] md:min-h-0">
                        <img 
                            alt="Portrait profile in B&W" 
                            className="absolute inset-0 w-full h-full object-cover grayscale" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxZ7RPLEdUZ-hWLjke8oCVUX55YvTrl6zkaoBFqWY4TGbl2ydWUCpp2uWwWLAYpkV1Xq_4Mi-j3c5TUIIXNdDv3VM0sZifN8wwb08edewoo8RcV-C3YDaTC23HJrElQadL7VHuPzUFO-NDNEU5kU8U7psekoAoRRVygstSfAjuNYucXTFyEN17PVOWTtn4wqLQIKRglvMzSqrgXMnIShQSHKdhCc4LNpKtPJVA_9X66yl2XNhGh1Qh1pclEv-BQUbhBPg0swc44OM"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <h2 className="font-headline text-6xl md:text-8xl text-white/85 font-bold uppercase tracking-widest text-center select-none">SOBRE NÓS</h2>
                        </div>
                    </div>
                </section>

                {/* [5] PARCEIROS */}
                <section className="bg-white px-8 md:px-24 border-b border-neutral-100 py-[113px]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-center items-center gap-[40px]">
                            {[
                                "https://lh3.googleusercontent.com/aida/ADBb0uhOGdjpFS3xe3PQ0SBANEJj9Lshi5iU1snnxg78KE9cu6q9SeduU7FrtyjVr7Aiwdb98Bh51O0y2M5iyUMrExkrhkblRt7z97iOw8Izlykk2aXRRSOOkty_W_o_oYuPgDPDJm82AfLka4UYlqYAgInyzkB9sHrM4CHkj6ALJZWz0GWOP76QaApK6LpgZKGqkWi6amp4e1ORrr_oVJ7qP9FrFcb4iZ2rsTIkeHbjgJR4mFdx6yB6dfZxmf96_CiFc9G0S7gJ1p_woA",
                                "https://lh3.googleusercontent.com/aida/ADBb0ugo_3hkuhJlyqc1n9XklUnq-HhA81Yebiu0ILdw0Or3Qe9SRJlgM85Hxqu6bDcKV3dFdHxr5BU2lXQMowJ7l3r8_BZHQAdJ59FXcJLSh7d2GBQDSaQXu3A25wanLr1ybdPagmeH6DyDg7hcqMQaEmLTudCnZEiKziI_Z69v-7IPc7aSHU1yZdYKUGpR5jcc05jv2YYKgK4axBIBAknUwdyxJc5K3Af7rUQ6xDJjN8XKaomkDpjGeokvNwEtT2v9s6xboaXaeH_XDg",
                                "https://lh3.googleusercontent.com/aida/ADBb0uidL1ApeQj61mELHcFLlZfhzQAVlxA-hD7vGs6dkwbhRlAskv0HkF5ryE5IB_O6EvvzbFcQBn1cPqUV4JrXaG98CEnMVlioeBfYEvx4X3ZigWJp7VmiAzyWoUvUepn1c6ye63qcGpXI9cnkiV9swx02Vwbrx8aMiBMdciOy0dDaJs_Ax4iVkgGzTh1WU9ajy-LgEf24EHs2KqfcaLQKR0H0CwkQ2F6jCo3HC-2y4w9S0-FMMzhSYDjw8D1YXVVXTnGNX_2zGduQ",
                                "https://lh3.googleusercontent.com/aida/ADBb0uhURJdNpyZ1XMkEEA0sJUFYrLBW29mKuuhOrIYKJ7OUzBRffxy-CL_e5uEJu1gaB7vc5_SvOcwoGrJlnbuswB7Xrxfx_7yDneYf05sFYIw48RCp4keRWoXDqy9uzmzPq7zlD8CkcJYuG9LXwCYas5EERfjkViTdthsolOQrQJGCzaOfL9A5dCEHEebSFrrFbgGCHa_PFZ2pJwj6I5M8a0F5KULMW217fEezqT_hNdY0qUQXtjcdLWRRnUyjYpmx5LQL9xd8OienFg",
                                "https://lh3.googleusercontent.com/aida/ADBb0ugVfWA5KDpg5JDeZ0GTthIh9l8hVMdD--LwM2nMXg7LyEAYhDnHUeR3c9XVCzmZOW10vkfN58NrraLcbqM2C0VZJZFJ34tkJkSBK0gKB5LLGiPAzqUaH5KHTHKvRMOl_Azr4Pe7lPIW3mjijldpZkWjQrizWWH5xLuebkepSW0hPJQ6FYCg5F_xNoaq5f1eNUayn7znm2IqIQtUMRdnVKAX8pFoCHltYf3cYM9oYP6FDqYZjXirIQe7M0kqWjgYV09EXK-5wiK8kA"
                            ].map((src, i) => (
                                <div key={i} className="logo-container cursor-default group h-[144px]">
                                    <div className="logo-layer logo-layer-1 h-full">
                                        <img alt={`Logo ${i+1}`} className="h-full w-auto object-contain grayscale" src={src}/>
                                    </div>
                                    <div className="logo-layer logo-layer-2 h-full">
                                        <img alt={`Logo ${i+1}`} className="h-full w-auto object-contain grayscale" src={src}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* [6] METODOLOGIA */}
                <section className="bg-black text-white py-40 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="ghost-text text-[20vw] font-headline uppercase select-none">MÉTODO</span>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-24">
                        <h2 className="text-4xl md:text-5xl font-headline text-center mb-32 max-w-2xl mx-auto leading-tight">Nada começa na execução. Tudo começa no entendimento.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            {[
                                { num: "01 / IMERSÃO", desc: "Análise profunda do DNA e objetivos do negócio." },
                                { num: "02 / DIAGNÓSTICO", desc: "Identificação de lacunas e oportunidades de mercado." },
                                { num: "03 / CONCEITO", desc: "A espinha dorsal criativa que guiará a marca." },
                                { num: "04 / EXECUÇÃO", desc: "Traduzindo a estratégia em ativos visuais e verbais." },
                                { num: "05 / MONITORAMENTO", desc: "Garantia de consistência e evolução contínua." }
                            ].map((item, i) => (
                                <div key={i} className="space-y-6">
                                    <span className="font-label text-xs text-neutral-100 block">{item.num}</span>
                                    <div className="h-px bg-neutral-800 w-full"></div>
                                    <p className="text-xs text-neutral-400 leading-relaxed font-body">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
                <div className="flex flex-col items-center text-center">
                    <div className="text-3xl font-serif text-neutral-50 mb-12">House Mazzutti</div>
                    <div className="flex space-x-8 mb-12">
                        <a className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="#">INSTAGRAM</a>
                        <a className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="#">LINKEDIN</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-16">
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/">HOME</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/about">SOBRE</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/studio">STUDIO</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/blog">BLOG</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/contato">CONTATO</Link>
                    </nav>
                    <div className="font-label text-[9px] text-neutral-700">
                        © 2025 House Mazzutti. TODOS OS DIREITOS RESERVADOS.
                    </div>
                </div>
            </footer>
        </div>
    );
}
