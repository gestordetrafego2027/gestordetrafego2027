'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import FormProdutora from '@/app/components/forms/FormProdutora';
import LandingGallery from '@/app/components/LandingGallery';
import LandingTeam from '@/app/components/LandingTeam';
import LandingPricing from '@/app/components/LandingPricing';

export default function ProdutoraPublicidadePage() {
    const [formCta, setFormCta] = useState(null);
    const openForm = (ctaLocation, packageSelected = null) => setFormCta({ ctaLocation, packageSelected });
    const closeForm = () => setFormCta(null);

    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out' })
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <title>House Mazzutti — PRODUTORA | Campanha Publicitária</title>
            <meta name="description" content="Produção executiva para campanhas publicitárias: direção criativa, audiovisual, casting e gestão completa de set." />

            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .page-frame { padding-left: 40px; padding-right: 40px; }
            `}} />

            <h1 className="sr-only">Produção Executiva para Campanhas Publicitárias</h1>

            <Header variant="dark" />

            {/* HERO */}
            <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: "105vh" }}>
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/produtora/beleza/we-pink-ze-felipe/capa.webp"
                        alt="Campanha publicitária — produção House Mazzutti"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/55"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                    <div className="max-w-3xl">
                        <span className="text-caption text-white/70 mb-6 block" data-aos="fade-up" data-aos-delay="100">PUBLICIDADE & CONTEÚDO · PROPOSTA SOB MEDIDA</span>
                        <h1 className="text-h1 text-white mb-8 hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">Vídeos que vendem. Imagens que engajam.</h1>
                        <p className="text-body text-white/80 mb-12 measure-editorial" data-aos="fade-up" data-aos-delay="300">
                            Produção de conteúdo dinâmico e filmes publicitários de alta performance para marcas que buscam autoridade e resultados reais no ambiente digital.
                        </p>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => openForm('hero')} className="group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                Iniciar campanha
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-[#f5f5f5] pt-[4rem] md:pt-[5rem] pb-[10rem] md:pb-[12rem]">
                    <div className="max-w-[1440px] mx-auto px-6 text-center">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">SERVIÇOS PUBLICITÁRIOS</span>
                        <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">Performance e estética. Sem compromisso.</h2>
                        <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">Soluções audiovisuais focadas em conversão e branding.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                            {[
                                { icon: 'videocam', title: 'Filmes Publicitários', desc: 'Produção de vídeos para TV e Digital com qualidade cinematográfica.' },
                                { icon: 'movie_edit', title: 'Edição Dinâmica', desc: 'Pós-produção ágil e moderna, alinhada às tendências atuais.' },
                                { icon: 'smartphone', title: 'Social First', desc: 'Conteúdo otimizado para redes sociais, Reels e TikTok com olhar premium.' },
                                { icon: 'groups', title: 'Casting & Influência', desc: 'Seleção e gestão de talentos para cada projeto.' },
                                { icon: 'settings', title: 'Estrutura & Operação', desc: 'Logística, fornecedores e cronograma sob controle total.' },
                                { icon: 'diamond', title: 'Entrega Consistente', desc: 'Qualidade garantida do briefing ao resultado final.' },
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

            <LandingGallery service="publicidade" />
            <LandingTeam />

            {/* QUOTE */}
            <section className="relative h-[769px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
                    <img alt="Produção de campanha — House Mazzutti" className="absolute inset-0 w-full h-full object-cover opacity-80" src="/images/produtora/beleza/jequiti-larissa-manoela/capa.webp" />
                    <div className="relative z-10 text-center px-8">
                        <button type="button" className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-12 mx-auto hover:bg-white/10 transition-colors group">
                            <span className="material-symbols-outlined text-white text-4xl group-hover:scale-110 transition-transform" data-icon="play_arrow">play_arrow</span>
                        </button>
                        <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">"Campanhas grandes não podem depender de tentativa. Elas exigem comando."</h2>
                        <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">Cada núcleo existe por um motivo. Cada decisão sustenta o resultado.</p>
                    </div>
            </section>

            <LandingPricing service="publicidade" openForm={openForm} />

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">Conteúdo que converte.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div data-aos="fade-right">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">COM PRODUÇÃO EXECUTIVA</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: 'Governança total', d: 'Integra todas as áreas e protege estratégia, prazo e percepção.' },
                                        { t: 'Execução com controle', d: 'Menos risco, mais previsibilidade e muito mais impacto.' },
                                        { t: 'Consistência garantida', d: 'Coerência entre conceito e entrega em cada detalhe.' },
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
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">SEM PRODUÇÃO EXECUTIVA</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: 'Execução fragmentada', d: 'Equipes desalinhadas e decisões que geram retrabalho.' },
                                        { t: 'Perda de qualidade', d: 'O que era estratégia vira esforço. O que era impacto vira ruído.' },
                                        { t: 'Risco constante', d: 'Atrasos, desalinhamento e perda de controle na entrega.' },
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
                    <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up" data-aos-delay="100">Sua campanha começa agora.</h2>
                    <button type="button" onClick={() => openForm('final')} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="200">
                        INICIAR PROJETO
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
                subtitle="Conte-nos sobre sua campanha publicitária. Respondemos em até 1 dia útil."
            >
                <FormProdutora
                    onClose={closeForm}
                    sourceUrl="/produtora/publicidade"
                    ctaLocation={formCta?.ctaLocation ?? null}
                />
            </FormDrawer>
        </div>
    );
}
