'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import FormStudio from '@/app/components/forms/FormStudio';
import LandingGallery from '@/app/components/LandingGallery';
import LandingTeam from '@/app/components/LandingTeam';
import LandingPricing from '@/app/components/LandingPricing';

export default function StudioBookPage() {
    const [formCta, setFormCta] = useState(null);
    const openForm = (ctaLocation, packageSelected = null) => setFormCta({ ctaLocation, packageSelected });
    const closeForm = () => setFormCta(null);

    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out' })
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .page-frame { padding-left: 40px; padding-right: 40px; }
            `}} />

            <h1 className="sr-only">Book Profissional para Modelos | Portfólio com Direção de Imagem House Mazzutti</h1>

            {/* 1. HEADER */}
            <Header variant="dark" />

            {/* 2. HERO */}
            <section className="relative h-screen w-full bg-white overflow-hidden px-[40px] pt-[25px] pb-[10px]">
                <div className="relative w-full h-full bg-[#111111] flex items-center justify-end min-h-[calc(100vh-75px)] pb-[20px]">
                    <div className="relative z-20 w-full px-[60px] flex justify-end pr-[120px]">
                        <div className="w-full max-w-[600px] flex flex-col items-center text-center ml-[-10px]">
                            <div className="mb-8">
                                <svg className="w-[42px] h-[42px] text-white/80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L3 12L12 22L21 12L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 2L12 22" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 12L21 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-white/60 mb-6 block" data-aos="fade-up" data-aos-delay="100">BOOK PROFISSIONAL · A PARTIR DE R$ 1.700</span>
                            <h1 className="font-headline text-4xl md:text-[3.6rem] text-white leading-[1.05] tracking-tight hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">Se o seu material não posiciona — ele te limita.</h1>
                            <p className="font-label uppercase tracking-[0.2em] text-[12px] text-white/60 mt-4 mb-8 max-w-[450px] mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">Book com direção estratégica de imagem para modelos, influenciadores e talentos que precisam de portfólio aprovado por agências e mercado.</p>
                            <div data-aos="fade-up" data-aos-delay="400">
                                <button type="button" onClick={() => openForm('hero')} className="bg-transparent text-white border border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors active:scale-95 duration-200">
                                    INICIAR MEU BOOK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICES */}
            <section className="bg-white py-0 px-[40px] pt-[25px]">
                <div className="bg-[#f5f5f5] pt-[4rem] md:pt-[5rem] pb-[10rem] md:pb-[12rem]">
                    <div className="max-w-[1440px] mx-auto px-6 text-center">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">BOOK PROFISSIONAL</span>
                        <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">Direção antes. Execução depois.</h2>
                        <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">Cada elemento tem função. Nada é aleatório.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                            {[
                                { icon: 'psychology', title: 'Leitura de Perfil', desc: 'Antes de qualquer clique, definimos qual mercado você quer acessar.' },
                                { icon: 'auto_awesome_motion', title: 'Moodboard', desc: 'Criação de moodboard estratégico alinhado ao seu objetivo.' },
                                { icon: 'movie_edit', title: 'Direção no Set', desc: 'Direção completa de poses, expressão e presença.' },
                                { icon: 'photo_camera', title: 'Captação Técnica', desc: 'Imagem captada com padrão técnico de mercado.' },
                                { icon: 'content_cut', title: 'Curadoria', desc: 'Seleção final das imagens que realmente posicionam.' },
                                { icon: 'diamond', title: 'Entrega High-End', desc: 'Tratamento e entrega profissional. Pronto para agências.' },
                            ].map((s, i) => (
                                <div key={s.icon} className="flex flex-col items-center" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                                    <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon={s.icon}>{s.icon}</span>
                                    <h3 className="font-headline mb-4 tracking-tight !text-lg">{s.title}</h3>
                                    <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. GALERIA — curadoria real do portfólio */}
            <LandingGallery service="book" />

            {/* 5. EQUIPE */}
            <LandingTeam />

            {/* 6. QUOTE + VIDEO */}
            <section className="bg-white px-[40px]">
                <div className="relative h-[769px] w-full flex items-center justify-center overflow-hidden bg-black">
                    <img alt="Reel House Mazzutti" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale blur-sm" src="/images/studio/marina-machado/capa.webp" />
                    <div className="relative z-10 text-center px-8">
                        <button className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-12 mx-auto hover:bg-white/10 transition-colors group" type="button">
                            <span className="material-symbols-outlined text-white text-4xl group-hover:scale-110 transition-transform" data-icon="play_arrow">play_arrow</span>
                        </button>
                        <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">"Quem não se comunica em imagem e vídeo, fica de fora."</h2>
                        <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">O mercado exige presença, fala e movimento.</p>
                    </div>
                </div>
            </section>

            {/* 7. PRICING */}
            <LandingPricing service="book" openForm={openForm} />

            {/* 8. COMPARATIVE */}
            <section className="bg-white px-[40px]">
                <div className="bg-black text-white py-32 px-12 md:px-24">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight" data-aos="fade-up">O que muda ter um Book com direção.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div data-aos="fade-right">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 mb-12">COM DIREÇÃO (HOUSE)</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: 'Posicionamento de mercado', d: 'Cada foto é pensada para um tipo de cliente específico.' },
                                        { t: 'Segurança no set', d: 'Você nunca fica perdido. Orientamos cada respiração.' },
                                        { t: 'Qualidade editorial', d: 'Tratamento de imagem que respeita a textura da pele.' },
                                    ].map((i) => (
                                        <li key={i.t} className="flex items-start gap-6">
                                            <span className="material-symbols-outlined text-white pt-1" data-icon="check_circle">check_circle</span>
                                            <div>
                                                <p className="font-headline text-lg mb-2">{i.t}</p>
                                                <p className="text-white/50 text-sm">{i.d}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div data-aos="fade-left">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 mb-12">SEM DIREÇÃO</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: 'Fotos genéricas', d: 'Material que parece amador e não gera interesse.' },
                                        { t: 'Insegurança e pose vazia', d: 'A falta de orientação transparece no olhar.' },
                                        { t: 'Pós-produção excessiva', d: 'Filtros que "plastificam" e perdem a naturalidade.' },
                                    ].map((i) => (
                                        <li key={i.t} className="flex items-start gap-6 opacity-40">
                                            <span className="material-symbols-outlined text-white pt-1" data-icon="cancel">cancel</span>
                                            <div>
                                                <p className="font-headline text-lg mb-2">{i.t}</p>
                                                <p className="text-white/50 text-sm">{i.d}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FINAL CTA */}
            <section className="bg-white px-[40px]">
                <div className="bg-black py-32 px-12 md:px-24 text-center flex flex-col items-center">
                    <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up" data-aos-delay="100">Se o seu objetivo é entrar ou evoluir no mercado — esse é o ponto de partida.</h2>
                    <button type="button" onClick={() => openForm('final')} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="200">
                        INICIAR DIAGNÓSTICO DO MEU BOOK
                    </button>
                </div>
            </section>

            {/* 10. FOOTER */}
            <footer className="bg-black text-white py-24 px-12 border-t-[0.5px] border-zinc-900 flex flex-col items-center w-full text-center space-y-8">
                <div className="mb-12">
                    <span className="hm-logo" style={{fontSize: '32px', color: 'white'}}>
                        <span className="hm-house">House</span>
                        <span className="hm-mazzutti">Mazzutti</span>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 mb-12">
                    <div className="space-y-4">
                        <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-500">SOCIAL</p>
                        <div className="flex space-x-8 justify-center">
                            <Link className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 hover:text-white transition-colors" href="https://instagram.com/housemazzutti">INSTAGRAM</Link>
                            <Link className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 hover:text-white transition-colors" href="https://linkedin.com/company/housemazzutti">LINKEDIN</Link>
                        </div>
                    </div>
                </div>
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 pb-12">
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/contato">CONTATO</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/portfolio">PORTFÓLIO</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/blog">BLOG</Link>
                </nav>
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 border-t-[0.5px] border-zinc-900">
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600">© 2026 House Mazzutti</p>
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600 mt-4 md:mt-0">23.5505° S, 46.6333° W</p>
                </div>
            </footer>

            <FormDrawer
                isOpen={!!formCta}
                onClose={closeForm}
                title="Iniciar projeto"
                subtitle="Conte-nos sobre seu book. Respondemos em até 1 dia útil."
            >
                <FormStudio
                    onClose={closeForm}
                    serviceType="book"
                    sourceUrl="/studio/book"
                    packageSelected={formCta?.packageSelected ?? null}
                    ctaLocation={formCta?.ctaLocation ?? null}
                />
            </FormDrawer>
        </div>
    );
}
