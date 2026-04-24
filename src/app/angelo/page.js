"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";

export default function AngeloPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            text: "Da identidade visual à reputação de mercado, desenvolvemos projetos que orientam e sustentam o seu posicionamento com clareza, sofisticação e consistência.",
            author: "",
        },
        {
            text: "Unimos estratégia, direção criativa e produção audiovisual para transformar marcas e pessoas em presenças sólidas e relevantes no cenário digital e global.",
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
            <title>Angelo Mazzutti | Branding Estratégico e Posicionamento de Marca</title>

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
            <h1 className="sr-only">Angelo Mazzutti | Branding Estratégico e Posicionamento de Marca</h1>
            
            <style>{`
                header a, header div { color: #000 !important; }
                header { border-bottom: 0.5px solid #e0e0e0 !important; }
            `}</style>

            <Header variant="light" />

            <main>
                {/* 1. Bloco 1 (hero - manter) */}
                <section className="min-h-[calc(100vh+20px)] flex items-center" style={{ backgroundColor: "#ffffff", borderBottom: '0.5px solid #e0e0e0' }}>
                    <div className="w-full flex flex-col justify-center px-12 py-32 space-y-8 pl-[calc(3rem+15px+20px)] md:pl-[calc(6rem+15px+20px)]" style={{ backgroundColor: "#ffffff" }}>
                        <span className="font-label text-xs text-black">ANGELO MAZZUTTI</span>
                        <h2 className="text-4xl md:text-6xl font-headline leading-tight text-black max-w-4xl">
                            Nenhuma marca se constrói apenas com estética. Se constrói com leitura e consistência.
                        </h2>
                        <p className="text-lg md:text-xl italic text-black max-w-2xl leading-relaxed font-body">
                            Estrategista nato e diretor criativo à frente da House Mazzutti, Angelo possui formação em publicidade e mais de 15 anos de experiência em audiovisual. Seu olhar estratégico, aliado a uma criatividade apurada, garante que suas produções visuais sejam sustentadas por uma base analítica sólida e direcionamento estratégico consistente. Um profissional cujas campanhas se destacam pela precisão, eficiência e múltiplas sensibilidades criativas, com um portfólio que reúne marcas nacionais e internacionais.
                        </p>
                        <p className="text-lg font-raleway italic text-black">
                            - Angelo Mazzutti
                        </p>
                    </div>
                </section>

                {/* 2. O que era bloco 6 (Nada começa na execução) */}
                <section className="bg-black text-white py-40 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[20vw] uppercase select-none ghost-text font-headline">MÉTODO</span>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-24">
                        <h2 className="text-4xl md:text-5xl text-center mb-32 max-w-2xl mx-auto leading-tight font-headline">
                            Nada começa na execução. Tudo começa no entendimento.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[
                                { num: "01 / CONTEXTO", bold: "Contexto.", desc: "Sem leitura do momento e do mercado, qualquer branding vira estética. E estética não sustenta posicionamento." },
                                { num: "02 / DIREÇÃO", bold: "Direção.", desc: "Não executando. Direcionando. Defino o que a marca é, o que precisa comunicar e como deve ser percebida." },
                                { num: "03 / CONSISTÊNCIA", bold: "Consistência.", desc: "Não busco impacto imediato. Busco consistência. Não busco volume. Busco valor." },
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
                                Ao longo dos anos, desenvolvi uma forma de leitura que conecta negócio, comportamento, imagem e posicionamento.
                            </h2>
                            <div className="space-y-6 text-neutral-600 leading-relaxed font-body">
                                <p>Não como áreas separadas. Mas como sistema. A maioria das marcas hoje não precisa de mais produção. Precisa parar e se estruturar.</p>
                                <p>Porque sem clareza: a comunicação força, a imagem confunde, o posicionamento não sustenta.</p>
                            </div>
                            <div className="pt-8 italic text-3xl opacity-80 font-headline">Angelo Mazzutti</div>
                        </div>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>
                    <div className="w-full md:w-1/2 bg-[#e8e8e8] relative overflow-hidden h-full min-h-[500px] md:min-h-0">
                        <img
                            alt="Portrait profile in B&W"
                            className="absolute inset-0 w-full h-full object-cover grayscale"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxZ7RPLEdUZ-hWLjke8oCVUX55YvTrl6zkaoBFqWY4TGbl2ydWUCpp2uWwWLAYpkV1Xq_4Mi-j3c5TUIIXNdDv3VM0sZifN8wwb08edewoo8RcV-C3YDaTC23HJrElQadL7VHuPzUFO-NDNEU5kU8U7psekoAoRRVygstSfAjuNYucXTFyEN17PVOWTtn4wqLQIKRglvMzSqrgXMnIShQSHKdhCc4LNpKtPJVA_9X66yl2XNhGh1Qh1pclEv-BQUbhBPg0swc44OM"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <h2 className="text-6xl md:text-8xl text-white/[0.85] font-bold uppercase tracking-widest text-center select-none font-headline">SOBRE NÓS</h2>
                        </div>
                    </div>
                </section>

                {/* 4. O que era bloco 7 (SERVIÇOS - Visão sistêmica...) */}
                <section className="bg-white py-32 px-12 md:px-24">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <span className="font-label text-xs text-neutral-500 mb-4 block">SERVIÇOS</span>
                            <h2 className="text-4xl tracking-tight font-headline">Visão sistêmica e de longo prazo.</h2>
                        </div>
                        <div className="md:w-2/3 space-y-12">
                            {[
                                { title: "Campaign Lançamento", desc: "Estratégias integradas para um impacto memorável.", num: "01" },
                                { title: "Branding Project", desc: "Construção de identidade e posicionamento de marca.", num: "02" },
                                { title: "Web Development", desc: "Sites e plataformas que convertem e engajam.", num: "03" },
                                { title: "Produção Visual", desc: "Conteúdo de alta qualidade para todas as mídias.", num: "04" },
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
                                A House Mazzutti atua em três frentes complementares.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Agência", desc: "Estratégia e direção criativa para lançamentos e branding." },
                                { title: "Studio", desc: "Construção e posicionamento da imagem pessoal e profissional." },
                                { title: "Produtora", desc: "Execução visual de alta qualidade para todos os formatos." },
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
                            Se você busca direção — não execução — estamos alinhados.
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 text-left pt-8">
                            <div className="space-y-6">
                                <h4 className="font-label text-xs tracking-widest text-neutral-400">VOCÊ DEIXA DE:</h4>
                                <ul className="space-y-4 font-light text-neutral-600 font-body">
                                    {["Parecer mais do mesmo", "Atrair desalinhado", "Depender de esforço constante"].map((item, i) => (
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
                                    {["Ter clareza", "Construir percepção", "Sustentar valor"].map((item, i) => (
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
                                Quero reposicionar minha marca
                            </Link>
                            <p className="italic text-neutral-500 font-raleway">
                                Não é sobre aparecer mais. É sobre não precisar insistir.
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

                {/* 8. O que era bloco de logos */}
                <section className="bg-white px-8 md:px-24 border-b border-neutral-100 py-[113px]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-center items-center gap-[15px]">
                            {[
                                "https://lh3.googleusercontent.com/aida/ADBb0uhOGdjpFS3xe3PQ0SBANEJj9Lshi5iU1snnxg78KE9cu6q9SeduU7FrtyjVr7Aiwdb98Bh51O0y2M5iyUMrExkrhkblRt7z97iOw8Izlykk2aXRRSOOkty_W_o_oYuPgDPDJm82AfLka4UYlqYAgInyzkB9sHrM4CHkj6ALJZWz0GWOP76QaApK6LpgZKGqkWi6amp4e1ORrr_oVJ7qP9FrFcb4iZ2rsTIkeHbjgJR4mFdx6yB6dfZxmf96_CiFc9G0S7gJ1p_woA",
                                "https://lh3.googleusercontent.com/aida/ADBb0ugo_3hkuhJlyqc1n9XklUnq-HhA81Yebiu0ILdw0Or3Qe9SRJlgM85Hxqu6bDcKV3dFdHxr5BU2lXQMowJ7l3r8_BZHQAdJ59FXcJLSh7d2GBQDSaQXu3A25wanLr1ybdPagmeH6DyDg7hcqMQaEmLTudCnZEiKziI_Z69v-7IPc7aSHU1yZdYKUGpR5jcc05jv2YYKgK4axBIBAknUwdyxJc5K3Af7rUQ6xDJjN8XKaomkDpjGeokvNwEtT2v9s6xboaXaeH_XDg",
                                "https://lh3.googleusercontent.com/aida/ADBb0uidL1ApeQj61mELHcFLlZfhzQAVlxA-hD7vGs6dkwbhRlAskv0HkF5ryE5IB_O6EvvzbFcQBn1cPqUV4JrXaG98CEnMVlioeBfYEvx4X3ZigWJp7VmiAzyWoUvUepn1c6ye63qcGpXI9cnkiV9swx02Vwbrx8aMiBMdciOy0dDaJs_Ax4iVkgGzTh1WU9ajy-LgEf24EHs2KqfcaLQKR0H0CwkQ2F6jCo3HC-2y4w9S0-FMMzhSYDjw8D1YXVVXTnGNX_2zGduQ",
                                "https://lh3.googleusercontent.com/aida/ADBb0uhURJdNpyZ1XMkEEA0sJUFYrLBW29mKuuhOrIYKJ7OUzBRffxy-CL_e5uEJu1gaB7vc5_SvOcwoGrJlnbuswB7Xrxfx_7yDneYf05sFYIw48RCp4keRWoXDqy9uzmzPq7zlD8CkcJYuG9LXwCYas5EERfjkViTdthsolOQrQJGCzaOfL9A5dCEHEebSFrrFbgGCHa_PFZ2pJwj6I5M8a0F5KULMW217fEezqT_hNdY0qUQXtjcdLWRRnUyjYpmx5LQL9xd8OienFg",
                                "https://lh3.googleusercontent.com/aida/ADBb0ugVfWA5KDpg5JDeZ0GTthIh9l8hVMdD--LwM2nMXg7LyEAYhDnHUeR3c9XVCzmZOW10vkfN58NrraLcbqM2C0VZJZFJ34tkJkSBK0gKB5LLGiPAzqUaH5KHTHKvRMOl_Azr4Pe7lPIW3mjijldpZkWjQrizWWH5xLuebkepSW0hPJQ6FYCg5F_xNoaq5f1eNUayn7znm2IqIQtUMRdnVKAX8pFoCHltYf3cYM9oYP6FDqYZjXirIQe7M0kqWjgYV09EXK-5wiK8kA",
                            ].map((src, i) => (
                                <div key={i} className="logo-container cursor-default group" style={{ height: "144px" }}>
                                    <div className="logo-layer logo-layer-1 h-full">
                                        <img alt={`Logo ${i + 1}`} className="h-full w-auto object-contain" src={src} />
                                    </div>
                                    <div className="logo-layer logo-layer-2 h-full">
                                        <img alt={`Logo ${i + 1}`} className="h-full w-auto object-contain" src={src} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. Bloco CTA final */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato-final" style={{minHeight: 'auto', paddingTop: '80px', paddingBottom: '80px'}}>
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-16">
                        <h2 className="text-4xl md:text-6xl text-white leading-tight italic font-headline">
                            SE VOCÊ SE CONECTA COM O QUE NÓS CONSTRUÍMOS.
                        </h2>
                        <div className="flex flex-col items-center space-y-8">
                            <Link className="inline-block px-16 py-6 border-[0.5px] border-white text-white font-label uppercase tracking-[0.3em] text-[12px]" href="/contato">
                                ENTRE EM CONTATO AGORA
                            </Link>
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
