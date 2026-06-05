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

export default function StudioCoberturaPage() {
    const [formCta, setFormCta] = useState(null);
    const openForm = (ctaLocation, packageSelected = null) => setFormCta({ ctaLocation, packageSelected });
    const closeForm = () => setFormCta(null);

    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out' })
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <title>House Mazzutti — STUDIO | Cobertura Externa</title>
            <meta name="description" content="Acompanhamento premium, direção de imagem e produção de conteúdo em tempo real para sua agenda em São Paulo. Proposta sob medida." />

            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .page-frame { padding-left: 40px; padding-right: 40px; }
            `}} />

            <h1 className="sr-only">Concierge Production em São Paulo | Produção Externa Premium</h1>

            <Header variant="dark" />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden">
                <img src="/images/studio/mileide-mihaile/capa.webp" alt="Cobertura externa — House Mazzutti" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-[600px] flex flex-col items-center text-center px-6">
                            <div className="mb-8">
                                <svg className="w-[42px] h-[42px] text-white/80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-white/60 mb-6 block" data-aos="fade-up" data-aos-delay="100">COBERTURA EXTERNA · PROPOSTA SOB MEDIDA</span>
                            <h1 className="font-headline text-4xl md:text-[3.6rem] text-white leading-[1.05] tracking-tight hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">Viver São Paulo exige presença. Nós produzimos a sua.</h1>
                            <p className="font-label uppercase tracking-[0.2em] text-[12px] text-white/60 mt-4 mb-8 max-w-[450px] mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">Acompanhamento premium, direção de imagem e conteúdo em tempo real para transformar sua agenda em narrativa visual de alto valor.</p>
                            <div data-aos="fade-up" data-aos-delay="400">
                                <button type="button" onClick={() => openForm('hero')} className="bg-transparent text-white border border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors active:scale-95 duration-200">
                                    QUERO SER ACOMPANHADA
                                </button>
                            </div>
                        </div>
                    </div>
            </section>

            {/* SERVICES */}
            <section className="bg-[#f5f5f5] pt-[4rem] md:pt-[5rem] pb-[10rem] md:pb-[12rem]">
                    <div className="max-w-[1440px] mx-auto px-6 text-center">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">COBERTURA EXTERNA</span>
                        <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">Não é cobertura. É produção de presença.</h2>
                        <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">Cada momento da sua agenda, conduzido com intenção.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                            {[
                                { icon: 'location_on', title: 'Acompanhamento Real', desc: 'Do hotel ao evento — presença ao longo de toda a jornada.' },
                                { icon: 'photo_camera', title: 'Captação Estratégica', desc: 'Foto e vídeo com direção de imagem em tempo real.' },
                                { icon: 'style', title: 'Suporte de Produção', desc: 'Beauty artist, stylist e produção de looks sob demanda.' },
                                { icon: 'movie_edit', title: 'Conteúdo & Narrativa', desc: 'Reels, stories, teaser e bastidores com leitura estética.' },
                                { icon: 'auto_stories', title: 'São Paulo como Cenário', desc: 'Hotéis, eventos, restaurantes e locações selecionadas.' },
                                { icon: 'diamond', title: 'Entrega Premium', desc: 'Curadoria de presença e construção de narrativa visual.' },
                            ].map((s, i) => (
                                <div key={s.icon} className="flex flex-col items-center" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                                    <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon={s.icon}>{s.icon}</span>
                                    <h3 className="font-headline mb-4 tracking-tight !text-lg">{s.title}</h3>
                                    <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
            </section>

            <LandingGallery service="cobertura" />
            <LandingTeam
                heading="O que faz a diferença na House."
                items={[
                    { title: 'Suporte Completo', desc: 'Beauty artist, stylist e looks sob demanda.', image: '/images/produtora/beleza/natalia-beauty/capa.webp', alt: 'Beauty artist e suporte de produção — House Mazzutti' },
                    { title: 'Captação em Tempo Real', desc: 'Foto e vídeo com direção durante toda a experiência.', image: '/images/produtora/moda/pous/capa.webp', alt: 'Captação estratégica em locação — House Mazzutti' },
                    { title: 'Entrega em 48h', desc: 'Conteúdo tratado e entregue rápido para casos específicos.', image: '/images/produtora/institucional/tf/capa.webp', alt: 'Entrega premium ágil de conteúdo — House Mazzutti' },
                ]}
            />

            {/* QUOTE */}
            <section className="relative h-[769px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
                    <img alt="Cobertura externa — House Mazzutti" className="absolute inset-0 w-full h-full object-cover opacity-80" src="/images/studio/mileide-mihaile/capa.webp" />
                    <div className="relative z-10 text-center px-8">
                        <button type="button" className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-12 mx-auto hover:bg-white/10 transition-colors group">
                            <span className="material-symbols-outlined text-white text-4xl group-hover:scale-110 transition-transform" data-icon="play_arrow">play_arrow</span>
                        </button>
                        <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">"Presença de alto nível não acontece por acaso. Ela é construída."</h2>
                        <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">E quando é bem construída, transforma qualquer agenda em narrativa.</p>
                    </div>
            </section>

            <LandingPricing service="cobertura" openForm={openForm} />

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">A sua agenda produzida.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div data-aos="fade-right">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">COM ESTRUTURA</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: 'Presença construída', d: 'Cada momento é acompanhado com direção e intenção.' },
                                        { t: 'Conteúdo com valor', d: 'Sua agenda vira material visual estratégico.' },
                                        { t: 'Experiência elevada', d: 'Você vive. A House transforma em imagem.' },
                                    ].map((i) => (
                                        <li key={i.t} className="flex items-start gap-6">
                                            <span className="material-symbols-outlined text-zinc-700 pt-1" data-icon="check_circle">check_circle</span>
                                            <div>
                                                <p className="font-headline text-lg mb-2 text-black">{i.t}</p>
                                                <p className="text-zinc-500 text-sm">{i.d}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div data-aos="fade-left">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">SEM ESTRUTURA</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: 'Registros aleatórios', d: 'Momentos importantes perdidos sem qualidade.' },
                                        { t: 'Conteúdo improvisado', d: 'Presença que não reflete o nível da experiência.' },
                                        { t: 'Oportunidades perdidas', d: 'Sua imagem não acompanha o que você construiu.' },
                                    ].map((i) => (
                                        <li key={i.t} className="flex items-start gap-6 opacity-40">
                                            <span className="material-symbols-outlined text-zinc-700 pt-1" data-icon="cancel">cancel</span>
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
                    <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up" data-aos-delay="100">Não deixe São Paulo passar em branco.</h2>
                    <button type="button" onClick={() => openForm('final')} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="200">
                        QUERO VIVER ESSA EXPERIÊNCIA
                    </button>
            </section>

            {/* FOOTER */}
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
                subtitle="Conte-nos sobre sua cobertura. Respondemos em até 1 dia útil."
            >
                <FormStudio
                    onClose={closeForm}
                    serviceType="cobertura"
                    sourceUrl="/studio/cobertura"
                    packageSelected={formCta?.packageSelected ?? null}
                    ctaLocation={formCta?.ctaLocation ?? null}
                />
            </FormDrawer>
        </div>
    );
}
