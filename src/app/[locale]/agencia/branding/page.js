'use client';
import { initAosNative } from '@/lib/aosNative';

import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import LandingTeam from '@/app/components/LandingTeam';

export default function AgenciaBrandingPage() {
    const t = useTranslations('agencia_branding');
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        const cleanup = initAosNative(); return cleanup;
    }, []);

    const processoSteps = [
        { num: t('processo_1_num'), titulo: t('processo_1_titulo'), desc: t('processo_1_desc') },
        { num: t('processo_2_num'), titulo: t('processo_2_titulo'), desc: t('processo_2_desc') },
        { num: t('processo_3_num'), titulo: t('processo_3_titulo'), desc: t('processo_3_desc') },
        { num: t('processo_4_num'), titulo: t('processo_4_titulo'), desc: t('processo_4_desc') },
    ];

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            `}} />

            <Header variant="dark" />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden">
                <img fetchpriority="high" src="/images/agencia/knowhol/capa.webp" alt="Branding Project — House Mazzutti" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-[600px] flex flex-col items-center text-center px-6">
                        <div className="mb-8">
                            <svg className="w-[42px] h-[42px] text-white/80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="font-label uppercase tracking-[0.4em] text-[10px] text-white/60 mb-6 block" data-aos="fade-up" data-aos-delay="100">{t('hero_label')}</span>
                        <h1 className="font-headline text-4xl md:text-[3.6rem] text-white leading-[1.05] tracking-tight hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">{t('hero_titulo')}</h1>
                        <p className="font-label uppercase tracking-[0.2em] text-[12px] text-white/60 mt-4 mb-8 max-w-[450px] mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">{t('hero_subtitulo')}</p>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => setFormOpen(true)} className="bg-transparent text-white border border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors active:scale-95 duration-200">
                                {t('hero_cta_btn')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* MANIFESTO */}
            <section className="bg-black py-20 px-6 text-center" data-aos="fade-up">
                <p className="font-headline text-white text-2xl md:text-4xl lg:text-5xl italic leading-tight max-w-4xl mx-auto tracking-tight">
                    {t('manifesto_texto')}
                </p>
            </section>

            {/* SERVICES */}
            <section className="bg-[#f5f5f5] pt-[5rem] pb-[8rem]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16">
                    <div className="mb-16 max-w-2xl" data-aos="fade-up">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/50 mb-4 block">{t('services_label')}</span>
                        <h2 className="font-headline text-black tracking-tight text-[1.8rem] md:text-[2.85rem] leading-tight">{t('services_titulo')}</h2>
                        <p className="text-on-surface-variant font-body font-light text-base md:text-lg mt-4">{t('services_desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
                        {[
                            { icon: 'edit_note', title: t('servico_1_titulo'), desc: t('servico_1_desc') },
                            { icon: 'palette', title: t('servico_2_titulo'), desc: t('servico_2_desc') },
                            { icon: 'record_voice_over', title: t('servico_3_titulo'), desc: t('servico_3_desc') },
                            { icon: 'hub', title: t('servico_4_titulo'), desc: t('servico_4_desc') },
                            { icon: 'description', title: t('servico_5_titulo'), desc: t('servico_5_desc') },
                            { icon: 'auto_awesome', title: t('servico_6_titulo'), desc: t('servico_6_desc') },
                        ].map((s, i) => (
                            <div key={s.icon} className="bg-[#f5f5f5] p-10 flex flex-col gap-4" data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                                <span className="material-symbols-outlined text-3xl text-on-surface/60">{s.icon}</span>
                                <h3 className="font-headline tracking-tight !text-lg">{s.title}</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light !text-[13px]">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESSO */}
            <section className="bg-white py-24 md:py-32 px-6 md:px-16">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16" data-aos="fade-up">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/40 mb-4 block">{t('processo_label')}</span>
                        <h2 className="font-headline text-black text-[1.8rem] md:text-[2.85rem] leading-tight tracking-tight">{t('processo_titulo')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black/10">
                        {processoSteps.map((step, i) => (
                            <div key={step.num} className={`p-10 flex flex-col gap-6 ${i < processoSteps.length - 1 ? 'border-b md:border-b-0 md:border-r border-black/10' : ''}`} data-aos="fade-up" data-aos-delay={i * 100}>
                                <span className="font-headline text-5xl text-black/10 leading-none">{step.num}</span>
                                <div>
                                    <h3 className="font-headline text-xl tracking-tight mb-3">{step.titulo}</h3>
                                    <p className="text-on-surface-variant font-light text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GALLERY — editorial */}
            <section className="bg-zinc-950 py-24 px-6 md:px-16">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex items-end justify-between mb-12" data-aos="fade-up">
                        <div>
                            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 mb-3 block">{t('gallery_label')}</span>
                            <h2 className="font-headline text-white text-[1.8rem] md:text-4xl tracking-tight">{t('gallery_titulo')}</h2>
                        </div>
                        <Link href="/portfolio" className="font-label uppercase tracking-[0.2em] text-[10px] text-white/50 hover:text-white transition-colors hidden md:block">
                            Ver portfólio →
                        </Link>
                    </div>

                    {/* Row 1: 1 large + 2 small */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <div className="md:col-span-2 aspect-[16/9] overflow-hidden relative group" data-aos="fade-up">
                            <img loading="lazy" src="/images/agencia/knowhol/1.webp" alt="Knowhol — House Mazzutti" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Knowhol</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex-1 overflow-hidden relative group" data-aos="fade-up" data-aos-delay="50">
                                <img loading="lazy" src="/images/agencia/knowhol/2.webp" alt="Knowhol — House Mazzutti" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="flex-1 overflow-hidden relative group" data-aos="fade-up" data-aos-delay="100">
                                <img loading="lazy" src="/images/agencia/knowhol/3.webp" alt="Knowhol — House Mazzutti" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: 3 equal + 1 wide */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="aspect-square overflow-hidden relative group" data-aos="fade-up">
                            <img loading="lazy" src="/images/agencia/mabdo/1.webp" alt="Mabdo — House Mazzutti" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Mabdo</span>
                            </div>
                        </div>
                        <div className="aspect-square overflow-hidden relative group" data-aos="fade-up" data-aos-delay="50">
                            <img loading="lazy" src="/images/agencia/mabdo/2.webp" alt="Mabdo — House Mazzutti" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="aspect-square overflow-hidden relative group" data-aos="fade-up" data-aos-delay="100">
                            <img loading="lazy" src="/images/agencia/alletto/1.webp" alt="Alletto — House Mazzutti" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Alletto</span>
                            </div>
                        </div>
                        <div className="aspect-square overflow-hidden relative group" data-aos="fade-up" data-aos-delay="150">
                            <img loading="lazy" src="/images/agencia/alletto/2.webp" alt="Alletto — House Mazzutti" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    </div>
                </div>
            </section>

            <LandingTeam
                heading={t('diferenciais_heading')}
                items={[
                    { title: t('diferencial_1_titulo'), desc: t('diferencial_1_desc'), image: '/images/agencia/diferenciais/identidade-coesa.webp', alt: 'Identidade visual coesa — House Mazzutti' },
                    { title: t('diferencial_2_titulo'), desc: t('diferencial_2_desc'), image: '/images/agencia/diferenciais/posicionamento.webp', alt: 'Posicionamento estratégico de marca — House Mazzutti' },
                    { title: t('diferencial_3_titulo'), desc: t('diferencial_3_desc'), image: '/images/agencia/diferenciais/brand-book.webp', alt: 'Brand book completo — House Mazzutti' },
                ]}
            />

            {/* QUOTE */}
            <section className="relative h-[769px] w-full flex items-center justify-center overflow-hidden">
                <img loading="lazy" src="/images/agencia/mabdo/capa.webp" alt="Branding — House Mazzutti" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-8">
                    <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">{t('quote_texto')}</h2>
                    <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">{t('quote_subtitulo')}</p>
                </div>
            </section>

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">{t('comparativo_titulo')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/10">
                        {/* COM */}
                        <div className="p-12 md:p-16 bg-black" data-aos="fade-right">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-white/50 mb-12">{t('comparativo_com_label')}</h3>
                            <ul className="space-y-10">
                                {[
                                    { t: t('com_1_titulo'), d: t('com_1_desc') },
                                    { t: t('com_2_titulo'), d: t('com_2_desc') },
                                    { t: t('com_3_titulo'), d: t('com_3_desc') },
                                ].map((item) => (
                                    <li key={item.t} className="flex items-start gap-5">
                                        <span className="material-symbols-outlined text-white/70 pt-1 shrink-0">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2 text-white">{item.t}</p>
                                            <p className="text-white/50 text-sm font-light">{item.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* SEM */}
                        <div className="p-12 md:p-16" data-aos="fade-left">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">{t('comparativo_sem_label')}</h3>
                            <ul className="space-y-10">
                                {[
                                    { t: t('sem_1_titulo'), d: t('sem_1_desc') },
                                    { t: t('sem_2_titulo'), d: t('sem_2_desc') },
                                    { t: t('sem_3_titulo'), d: t('sem_3_desc') },
                                ].map((item) => (
                                    <li key={item.t} className="flex items-start gap-5 opacity-50">
                                        <span className="material-symbols-outlined text-zinc-700 pt-1 shrink-0">cancel</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2 text-black">{item.t}</p>
                                            <p className="text-zinc-500 text-sm font-light">{item.d}</p>
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
                <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up">{t('cta_final_titulo')}</h2>
                <button type="button" onClick={() => setFormOpen(true)} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="100">
                    {t('cta_final_btn')}
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-white text-zinc-900 py-24 px-12 border-t-[0.5px] border-zinc-200 flex flex-col items-center w-full text-center space-y-8">
                <div className="mb-4">
                    <span className="hm-logo" style={{fontSize: '32px'}}>
                        <span className="hm-house">House</span>
                        <span className="hm-mazzutti">Mazzutti</span>
                    </span>
                </div>
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 pb-8">
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-zinc-900 transition-colors duration-200" href="/contato">{t('footer_contato')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-zinc-900 transition-colors duration-200" href="/portfolio">{t('footer_portfolio')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-zinc-900 transition-colors duration-200" href="/blog">{t('footer_blog')}</Link>
                </nav>
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t-[0.5px] border-zinc-200">
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400">{t('footer_copyright')}</p>
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 mt-4 md:mt-0">23.5505° S, 46.6333° W</p>
                </div>
                <div className="mt-6"><SiteFooterLinks /></div>
            </footer>

            <FormDrawer isOpen={formOpen} onClose={() => setFormOpen(false)} title={t('form_titulo')} subtitle={t('form_subtitulo')}>
                <div className="flex flex-col gap-6 pt-4">
                    <a href="https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20no%20Branding%20Project." target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-black text-white font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-zinc-800 transition-colors">
                        {t('form_whatsapp_btn')}
                    </a>
                    <a href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer" className="w-full py-4 border border-black text-black font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-black hover:text-white transition-colors">
                        {t('form_instagram_btn')}
                    </a>
                </div>
            </FormDrawer>
        </div>
    );
}
