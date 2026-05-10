"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";

export default function AngeloPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            text: "Mente estratégica formada na publicidade e forjada nos sets das maiores celebridades do Brasil — de Larissa Manoela à família Abravanel.",
            author: "",
        },
        {
            text: "Combina o pensamento de mercado de um diretor de marca com o domínio técnico de um diretor criativo audiovisual. Não apenas idealiza — sabe como realizar.",
            author: "",
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
        <div className="antialiased font-body" style={{ fontWeight: 300, backgroundColor: "#f9f9f9", color: "#1a1c1c" }}>
            <title>Angelo Mazzutti — Head of Creative & Brand Strategy | House Mazzutti</title>

            <style dangerouslySetInnerHTML={{
                __html: `
                body { font-weight: 300; background-color: #f9f9f9; color: #1a1c1c; }
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24; }
                .ghost-text { -webkit-text-stroke: 1px rgba(255,255,255,0.1); color: transparent; pointer-events: none; }
                .line-growth { transition: width 1.5s cubic-bezier(0.65, 0, 0.35, 1); }
                .hover-transition-refined { transition: all 0.6s cubic-bezier(0.2, 1, 0.3, 1); }
                .custom-nav-line { width: 40px; height: 1px; background-color: rgba(255,255,255,0.3); transition: width 0.3s ease; }
                .custom-nav-btn:hover .custom-nav-line { width: 60px; background-color: white; }
                @keyframes progress-load { from { width: 0; } to { width: var(--target-width); } }
                .animate-progress { animation: progress-load 1.5s ease-out forwards; }
                .percentage-tag {
                    position: absolute; right: 0; top: 50%; transform: translateY(-50%);
                    background-color: #000000; color: #ffffff; padding: 2px 6px;
                    font-size: 10px; font-family: 'Work Sans', sans-serif; white-space: nowrap;
                }
                @keyframes logo-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
                .logo-container { position: relative; overflow: hidden; height: 144px; display: flex; align-items: center; }
                .logo-layer { transition: transform 0.4s ease, opacity 0.4s ease; white-space: nowrap; height: 144px; display: flex; align-items: center; }
                .logo-layer-1 { transform: translateY(0); opacity: 0.4; }
                .logo-layer-2 { position: absolute; top: 0; left: 0; transform: translateY(-100%); opacity: 0; }
                .logo-container:hover .logo-layer-1 { transform: translateY(100%); opacity: 0; }
                .logo-container:hover .logo-layer-2 { transform: translateY(0); opacity: 1; }
                .testimonial-slide { display: none; opacity: 0; }
                .testimonial-slide.active { display: flex; opacity: 1; animation: fadeIn 0.8s ease-in-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            ` }} />

            {/* SEO Hidden H1 */}
            <h1 className="sr-only">Angelo Mazzutti — Head of Creative & Brand Strategy | House Mazzutti</h1>
            
            <style>{`
                header a, header div { color: #000 !important; }
                header { border-bottom: 0.5px solid #e0e0e0 !important; }
            `}</style>

            <Header variant="light" />

            <main>
                {/* 1. Bloco 1 (hero - manter) */}
                <section className="min-h-[calc(100vh+20px)] flex flex-col md:flex-row items-stretch" style={{ backgroundColor: "#ffffff", borderBottom: '0.5px solid #e0e0e0' }}>
                    <div className="w-full md:w-1/2 flex flex-col justify-center px-12 py-32 space-y-8 pl-[calc(3rem+15px+20px)] md:pl-[calc(6rem+15px+20px)]" style={{ backgroundColor: "#ffffff" }}>
                        <span className="font-label text-xs text-black">ANGELO MAZZUTTI · HEAD OF CREATIVE & BRAND STRATEGY</span>
                        <h2 className="text-4xl md:text-6xl font-headline leading-tight text-black">
                            Toda imagem que entrego carrega uma decisão de mercado. Estética sem propósito é apenas decoração.
                        </h2>
                        <p className="text-lg md:text-xl italic text-black leading-relaxed font-body">
                            Mente estratégica formada na publicidade e forjada nos sets das maiores celebridades do Brasil — de Larissa Manoela à família Abravanel. 15 anos no audiovisual e fotografia. Direção criativa para marcas premium de moda, beleza e lifestyle. Combina o pensamento de mercado de um diretor de marca com o domínio técnico de um diretor criativo audiovisual.
                        </p>
                        <p className="text-lg font-raleway italic text-black">
                            — Angelo Mazzutti
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 bg-[#e8e8e8] relative overflow-hidden min-h-[500px] md:min-h-[80vh]">
                        <img
                            alt="HMZT — House Mazzutti branding"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="/images/angelo/hmzt-logo.png"
                        />
                    </div>
                </section>

                {/* 2. O que era bloco 6 (Nada começa na execução) */}
                <section className="bg-black text-white py-40 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[20vw] uppercase select-none ghost-text font-headline">MÉTODO</span>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-24">
                        <h2 className="text-4xl md:text-5xl text-center mb-32 max-w-2xl mx-auto leading-tight font-headline">
                            Antes de qualquer imagem, existe uma decisão de mercado.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[
                                { num: "01 / LEITURA", bold: "Leitura de contexto.", desc: "Sem entendimento do momento, do público e do mercado, qualquer estética vira ruído. Posicionamento começa em diagnóstico." },
                                { num: "02 / DIREÇÃO", bold: "Direção autoral.", desc: "Não executo, direciono. Defino o que a marca é, o que precisa comunicar e como deve ser percebida — do moodboard ao master final." },
                                { num: "03 / CONSISTÊNCIA", bold: "Consistência editorial.", desc: "Não busco impacto isolado. Busco continuidade. Cada peça reforça a anterior — e prepara terreno para a próxima." },
                            ].map((item, i) => (
                                <div key={i} className="space-y-6">
                                    <span className="font-label text-xs text-neutral-100 block">{item.num}</span>
                                    <div className="h-px bg-neutral-800 w-full"></div>
                                    <p className="text-xs text-neutral-400 leading-relaxed uppercase tracking-widest font-bold mb-2 font-label">{item.bold}</p>
                                    <p className="text-xs text-neutral-400 leading-relaxed font-body">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. O que era bloco 4 (TRAJETÓRIA - Ao longo dos anos...) */}
                <section className="min-h-[80vh] flex flex-col md:flex-row relative">
                    <div className="w-full md:w-1/2 bg-[#d4c4c4] flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-8">
                            <span className="font-label text-xs text-neutral-400">TRAJETÓRIA</span>
                            <h2 className="text-4xl md:text-5xl font-headline leading-tight">
                                Quinze anos no audiovisual. Uma única certeza: marca não é estética. É sistema.
                            </h2>
                            <div className="space-y-6 text-neutral-600 leading-relaxed font-body">
                                <p>Negócio, comportamento, imagem e posicionamento operam juntos — ou não operam. A maioria das marcas hoje não precisa de mais produção. Precisa parar e se estruturar.</p>
                                <p>Sem clareza estratégica, a comunicação força, a imagem confunde e o posicionamento não sustenta. A House existe para que isso não aconteça.</p>
                            </div>
                            <div className="pt-8 italic text-3xl opacity-80 font-headline">Angelo Mazzutti</div>
                        </div>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>
                    <div className="w-full md:w-1/2 bg-[#e8e8e8] relative overflow-hidden h-full min-h-[500px] md:min-h-[80vh]">
                        <img
                            alt="Angelo Mazzutti — Diretor Criativo"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="/images/angelo/angelo-portrait.png"
                        />
                    </div>
                </section>

                {/* 4. O que era bloco 7 (SERVIÇOS - Visão sistêmica...) */}
                <section className="bg-white py-32 px-12 md:px-24">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <span className="font-label text-xs text-neutral-500 mb-4 block">FRENTES DE ATUAÇÃO</span>
                            <h2 className="text-4xl tracking-tight font-headline">Direção integrada. Do conceito ao acabamento.</h2>
                        </div>
                        <div className="md:w-2/3 space-y-12">
                            {[
                                { title: "Direção Criativa Estratégica", desc: "Conceito, moodboard e supervisão integral — do briefing ao master.", num: "01" },
                                { title: "Branding & Posicionamento", desc: "Estruturação de marca, narrativa e arquitetura institucional.", num: "02" },
                                { title: "Direção de Campanha & Filme", desc: "Captação editorial sob direção autoral em set, com padrão internacional.", num: "03" },
                                { title: "Curadoria de Imagem Pessoal", desc: "Consultoria de imagem para celebridades, ícones e profissionais de alto padrão.", num: "04" },
                            ].map((item, i) => (
                                <div key={i} className="group border-b border-neutral-200 pb-8 flex justify-between items-end hover:border-black transition-colors cursor-default">
                                    <div>
                                        <h4 className="text-2xl mb-2 font-headline">{item.title}</h4>
                                        <p className="text-neutral-500 font-light font-body">{item.desc}</p>
                                    </div>
                                    <span className="font-label text-[10px] text-neutral-400">{item.num}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. O que era bloco 3 (ESTRUTURA - A House Mazzutti atua em três frentes) */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[600px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-black text-[18vw] uppercase tracking-[0.1em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-50" style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>ESTRUTURA</span>
                    </div>
                    <div className="relative z-10 max-w-6xl mx-auto w-full">
                        <div className="text-center mb-16">
                            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-zinc-500 block mb-1">ESTRUTURA</span>
                            <h2 className="text-4xl text-white italic tracking-wide font-headline">
                                Uma House. Quatro unidades. Uma só visão.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Agência", desc: "Branding, identidade visual, sites premium e UI/UX. Construção e reposicionamento." },
                                { title: "Studio", desc: "Direção de pessoas. Books, ensaios e retratos com tratamento editorial premium." },
                                { title: "Produtora", desc: "Fashion films, campanhas publicitárias e brand content sob direção autoral." },
                            ].map((card, i) => (
                                <div key={i} className="text-center p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                                    <h3 className="text-3xl text-white mb-4 font-headline">{card.title}</h3>
                                    <p className="text-white/70 font-light font-body">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. O que era bloco 8 (Se você busca direção...) */}
                <section className="bg-[#eeeeee] py-32 px-12 md:px-24">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <h2 className="text-4xl md:text-5xl italic font-headline">
                            Se você procura direção — não apenas execução — estamos alinhados.
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 text-left pt-8">
                            <div className="space-y-6">
                                <h4 className="font-label text-xs tracking-widest text-neutral-400">VOCÊ DEIXA DE:</h4>
                                <ul className="space-y-4 font-light text-neutral-600 font-body">
                                    {["Competir por atenção", "Atrair público desalinhado", "Depender de esforço para se destacar"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-label text-xs tracking-widest text-neutral-400">PASSA A:</h4>
                                <ul className="space-y-4 font-light text-neutral-600 font-body">
                                    {["Ocupar espaço com clareza", "Construir percepção sustentável", "Sustentar valor de mercado"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="pt-12 flex flex-col items-center space-y-6">
                            <Link href="/contato" className="px-12 py-5 bg-black text-white font-label text-xs tracking-[0.3em] uppercase hover:bg-neutral-800 transition-colors">
                                AGENDAR IMERSÃO ESTRATÉGICA
                            </Link>
                            <p className="italic text-neutral-500 font-raleway">
                                Não é sobre aparecer mais. É sobre ocupar espaço com intenção.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 7. Seção de depoimentos */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center h-[480px] max-h-[480px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-black text-[18vw] uppercase tracking-[0.1em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-50 font-headline">DEPOIMENTOS</span>
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
                            <span className="uppercase tracking-[0.4em] text-[10px] text-zinc-500 block mb-1 font-label">O QUE DIZEM</span>
                            <h2 className="text-3xl text-white italic tracking-wide font-headline">Depoimentos</h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1" style={{height: '200px', display: 'flex', alignItems: 'center'}}>
                                {testimonials.map((t, i) => (
                                    <div key={i} className={`testimonial-slide flex flex-col justify-center ${currentSlide === i ? "active" : ""}`}>
                                        <h3 className="text-lg text-white leading-snug italic max-w-3xl mx-auto font-body">
                                            "{t.text}"
                                        </h3>
                                        {t.author && (
                                            <div className="pt-3">
                                                <p className="uppercase tracking-[0.35em] text-[10px] text-white/80 font-light font-label">{t.author}</p>
                                            </div>
                                        )}
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

                <ClientLogos />

                {/* 9. Bloco CTA final */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato-final" style={{minHeight: 'auto', paddingTop: '80px', paddingBottom: '80px'}}>
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-16">
                        <h2 className="text-4xl md:text-6xl text-white leading-tight italic font-headline">
                            Da decisão estratégica ao pixel final. Sob uma só direção.
                        </h2>
                        <div className="flex flex-col items-center space-y-8">
                            <Link className="inline-block px-16 py-6 border-[0.5px] border-white text-white font-label uppercase tracking-[0.3em] text-[12px]" href="/contato">
                                AGENDAR CONVERSA
                            </Link>
                            <p className="font-label uppercase tracking-widest text-[9px] text-zinc-500">São Paulo / Global · Sigilo absoluto</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
                <div className="flex flex-col items-center text-center">
                    <div className="text-3xl text-neutral-50 mb-12 font-headline">House Mazzutti</div>
                    <div className="flex space-x-8 mb-12">
                        <a className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="#">INSTAGRAM</a>
                        <a className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="#">LINKEDIN</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-16">
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/">HOME</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/studio">STUDIO</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/about">SOBRE</Link>
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
