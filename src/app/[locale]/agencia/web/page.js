'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import LandingTeam from '@/app/components/LandingTeam';

export default function AgenciaWebPage() {
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out' });
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <title>House Mazzutti — Web Development | Sites e Plataformas Digitais</title>
            <meta name="description" content="Sites institucionais, landing pages e e-commerce com design premium. House Mazzutti Agência — São Paulo." />

            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            `}} />

            <Header variant="dark" />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden">
                <img src="/images/agencia/house-mazzutti/capa.webp" alt="Web Development — House Mazzutti" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-[600px] flex flex-col items-center text-center px-6">
                        <div className="mb-8">
                            <svg className="w-[42px] h-[42px] text-white/80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="font-label uppercase tracking-[0.4em] text-[10px] text-white/60 mb-6 block" data-aos="fade-up" data-aos-delay="100">WEB DEVELOPMENT · PROPOSTA SOB MEDIDA</span>
                        <h1 className="font-headline text-4xl md:text-[3.6rem] text-white leading-[1.05] tracking-tight hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">Onde presença digital vira sistema.</h1>
                        <p className="font-label uppercase tracking-[0.2em] text-[12px] text-white/60 mt-4 mb-8 max-w-[450px] mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">Sites institucionais, landing pages e e-commerce construídos com design premium, performance técnica e foco total em conversão.</p>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => setFormOpen(true)} className="bg-transparent text-white border border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors active:scale-95 duration-200">
                                INICIAR MEU PROJETO WEB
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-[#f5f5f5] pt-[4rem] md:pt-[5rem] pb-[10rem] md:pb-[12rem]">
                <div className="max-w-[1440px] mx-auto px-6 text-center">
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">WEB DEVELOPMENT</span>
                    <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">Não é só um site. É sua maior vitrine.</h2>
                    <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">Tecnologia, design e estratégia trabalhando juntos pela sua presença digital.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                        {[
                            { icon: 'language', title: 'Sites Institucionais', desc: 'Presença digital premium que representa a marca com autoridade.' },
                            { icon: 'rocket_launch', title: 'Landing Pages', desc: 'Páginas de alta conversão com design focado em resultado.' },
                            { icon: 'shopping_cart', title: 'E-commerce', desc: 'Lojas digitais com experiência de compra premium e integração completa.' },
                            { icon: 'speed', title: 'Performance Técnica', desc: 'Sites rápidos, seguros e otimizados para SEO e Google.' },
                            { icon: 'devices', title: 'Responsivo', desc: 'Experiência impecável em desktop, tablet e mobile.' },
                            { icon: 'auto_awesome', title: 'Efeito House', desc: 'Design que não parece só funcional — parece arte com propósito.' },
                        ].map((s, i) => (
                            <div key={s.icon} className="flex flex-col items-center" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80">{s.icon}</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">{s.title}</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="bg-white py-24 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/50 mb-4 block" data-aos="fade-up">PORTFÓLIO · WEB</span>
                    <h2 className="font-headline text-black text-3xl md:text-4xl mb-16 tracking-tight" data-aos="fade-up" data-aos-delay="100">Projetos que entregamos.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['house-mazzutti/1','house-mazzutti/2','house-mazzutti/3','house-mazzutti/4','samrat/1','samrat/2','samrat/3','samrat/4'].map((img, i) => (
                            <div key={img} className="aspect-square overflow-hidden" data-aos="fade-up" data-aos-delay={i * 50}>
                                <img src={`/images/agencia/${img}.webp`} alt="" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingTeam />

            {/* QUOTE */}
            <section className="relative h-[769px] w-full flex items-center justify-center overflow-hidden">
                <img src="/images/agencia/samrat/capa.webp" alt="Web Development — House Mazzutti" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-8">
                    <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">"Seu site é o único vendedor que trabalha 24 horas por dia."</h2>
                    <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">Faz sentido entregar menos do que ele pode ser?</p>
                </div>
            </section>

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">A diferença está na entrega.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div data-aos="fade-right">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">COM WEB DEVELOPMENT (HOUSE)</h3>
                            <ul className="space-y-10">
                                {[
                                    { t: 'Design com propósito', d: 'Cada elemento visual tem função — guia, converte ou posiciona.' },
                                    { t: 'Técnica impecável', d: 'Código limpo, rápido e seguro. Sem gambiarra.' },
                                    { t: 'Entrega completa', d: 'Do briefing ao ar — sem surpresas nem etapas faltando.' },
                                ].map((i) => (
                                    <li key={i.t} className="flex items-start gap-6">
                                        <span className="material-symbols-outlined text-zinc-700 pt-1">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2 text-black">{i.t}</p>
                                            <p className="text-zinc-500 text-sm">{i.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div data-aos="fade-left">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">SEM DESENVOLVIMENTO</h3>
                            <ul className="space-y-10">
                                {[
                                    { t: 'Template genérico', d: 'Visual igual a centenas de outros — sem personalidade.' },
                                    { t: 'Site lento e instável', d: 'Performance ruim afasta visitantes e penaliza no Google.' },
                                    { t: 'Sem conversão', d: 'Visitas que entram e saem sem nenhuma ação.' },
                                ].map((i) => (
                                    <li key={i.t} className="flex items-start gap-6 opacity-40">
                                        <span className="material-symbols-outlined text-zinc-700 pt-1">cancel</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2 text-black">{i.t}</p>
                                            <p className="text-zinc-500 text-sm">{i.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-black py-32 px-12 md:px-24 text-center flex flex-col items-center">
                <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up">Seu projeto digital começa agora.</h2>
                <button type="button" onClick={() => setFormOpen(true)} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="100">
                    INICIAR MEU PROJETO WEB
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-black text-white py-24 px-12 border-t-[0.5px] border-zinc-900 flex flex-col items-center w-full text-center space-y-8">
                <div className="mb-4">
                    <span className="hm-logo" style={{fontSize: '32px', color: 'white'}}>
                        <span className="hm-house">House</span>
                        <span className="hm-mazzutti">Mazzutti</span>
                    </span>
                </div>
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 pb-8">
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/contato">CONTATO</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/portfolio">PORTFÓLIO</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/blog">BLOG</Link>
                </nav>
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t-[0.5px] border-zinc-900">
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600">© 2026 House Mazzutti</p>
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600 mt-4 md:mt-0">23.5505° S, 46.6333° W</p>
                </div>
            </footer>

            <FormDrawer isOpen={formOpen} onClose={() => setFormOpen(false)} title="Web Development" subtitle="Conte-nos sobre seu projeto digital. Respondemos em até 1 dia útil.">
                <div className="flex flex-col gap-6 pt-4">
                    <a href="https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20em%20Web%20Development." target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-black text-white font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-zinc-800 transition-colors">
                        CONTINUAR VIA WHATSAPP
                    </a>
                    <a href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer" className="w-full py-4 border border-black text-black font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-black hover:text-white transition-colors">
                        CONTINUAR VIA INSTAGRAM
                    </a>
                </div>
            </FormDrawer>
        </div>
    );
}
