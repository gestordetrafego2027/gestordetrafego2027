'use client';
import { initAosNative } from '@/lib/aosNative';

import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import LandingTeam from '@/app/components/LandingTeam';

export default function AgenciaComunicacaoPage() {
    const t = useTranslations('agencia_comunicacao');
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        const cleanup = initAosNative(); return cleanup;
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <title>{t('page_title')}</title>
            <meta name="description" content={t('page_description')} />

            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            `}} />

            <Header variant="dark" />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden">
                <img fetchpriority="high" src="/images/agencia/on-take/capa.webp" alt="Comunicação & Publicidade — House Mazzutti" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-[600px] flex flex-col items-center text-center px-6">
                        <div className="mb-8">
                            <svg className="w-[42px] h-[42px] text-white/80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="font-label uppercase tracking-[0.4em] text-[10px] text-white/60 mb-6 block" data-aos="fade-up" data-aos-delay="100">{t('hero_label')}</span>
                        <h1 className="font-headline text-4xl md:text-[3.6rem] text-white leading-[1.05] tracking-tight hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">{t('hero_titulo')}</h1>
                        <p className="font-label uppercase tracking-[0.2em] text-[12px] text-white/60 mt-4 mb-8 max-w-[450px] mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">{t('hero_subtitulo')}</p>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => setFormOpen(true)} className="bg-transparent text-white border border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors active:scale-95 duration-200">
                                {t('hero_cta')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-[#f5f5f5] pt-[4rem] md:pt-[5rem] pb-[10rem] md:pb-[12rem]">
                <div className="max-w-[1440px] mx-auto px-6 text-center">
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">{t('servicos_label')}</span>
                    <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">{t('servicos_titulo')}</h2>
                    <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">{t('servicos_subtitulo')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                        {[
                            { icon: 'campaign', title: t('servico_1_title'), desc: t('servico_1_desc') },
                            { icon: 'article', title: t('servico_2_title'), desc: t('servico_2_desc') },
                            { icon: 'trending_up', title: t('servico_3_title'), desc: t('servico_3_desc') },
                            { icon: 'photo_camera', title: t('servico_4_title'), desc: t('servico_4_desc') },
                            { icon: 'ads_click', title: t('servico_5_title'), desc: t('servico_5_desc') },
                            { icon: 'auto_awesome', title: t('servico_6_title'), desc: t('servico_6_desc') },
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
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/50 mb-4 block" data-aos="fade-up">{t('portfolio_label')}</span>
                    <h2 className="font-headline text-black text-3xl md:text-4xl mb-16 tracking-tight" data-aos="fade-up" data-aos-delay="100">{t('portfolio_titulo')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['on-take/1','on-take/2','on-take/3','on-take/4','pous/1','pous/2','pous/3','pous/4'].map((img, i) => (
                            <div key={img} className="aspect-square overflow-hidden" data-aos="fade-up" data-aos-delay={i * 50}>
                                <img loading="lazy" src={`/images/agencia/${img}.webp`} alt="" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingTeam
                heading={t('landing_team_heading')}
                items={[
                    { title: t('diferencial_1_title'), desc: t('diferencial_1_desc'), image: '/images/agencia/diferenciais/comunicacao-360.webp', alt: 'Comunicação integrada multicanal — House Mazzutti' },
                    { title: t('diferencial_2_title'), desc: t('diferencial_2_desc'), image: '/images/agencia/diferenciais/resultado-mensuravel.webp', alt: 'Performance e resultado mensurável — House Mazzutti' },
                    { title: t('diferencial_3_title'), desc: t('diferencial_3_desc'), image: '/images/agencia/diferenciais/producao-inhouse.webp', alt: 'Produção visual in-house — House Mazzutti' },
                ]}
            />

            {/* QUOTE */}
            <section className="relative h-[769px] w-full flex items-center justify-center overflow-hidden">
                <img loading="lazy" src="/images/agencia/pous/capa.webp" alt="Comunicação — House Mazzutti" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-8">
                    <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">{t('quote_titulo')}</h2>
                    <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">{t('quote_subtitulo')}</p>
                </div>
            </section>

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">{t('comparativo_titulo')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div data-aos="fade-right">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">{t('com_estrategia_label')}</h3>
                            <ul className="space-y-10">
                                {[
                                    { t: t('com_1_title'), d: t('com_1_desc') },
                                    { t: t('com_2_title'), d: t('com_2_desc') },
                                    { t: t('com_3_title'), d: t('com_3_desc') },
                                ].map((i) => (
                                    <li key={i.t} className="flex items-start gap-6"> <div>
                                            <p className="font-headline text-lg mb-2 text-black">{i.t}</p>
                                            <p className="text-zinc-500 text-sm">{i.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div data-aos="fade-left">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">{t('sem_estrategia_label')}</h3>
                            <ul className="space-y-10">
                                {[
                                    { t: t('sem_1_title'), d: t('sem_1_desc') },
                                    { t: t('sem_2_title'), d: t('sem_2_desc') },
                                    { t: t('sem_3_title'), d: t('sem_3_desc') },
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
                <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up">{t('cta_final_titulo')}</h2>
                <button type="button" onClick={() => setFormOpen(true)} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="100">
                    {t('cta_final_btn')}
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-white text-zinc-900 py-24 px-12 border-t-[0.5px] border-zinc-200 flex flex-col items-center w-full text-center space-y-8">
                <div className="mb-4">
                    <span className="hm-logo" style={{fontSize: '32px', color: 'white'}}>
                        <span className="hm-house">House</span>
                        <span className="hm-mazzutti">Mazzutti</span>
                    </span>
                </div>
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 pb-8">
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/contato">{t('footer_nav_contato')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/portfolio">{t('footer_nav_portfolio')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/blog">{t('footer_nav_blog')}</Link>
                </nav>
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t-[0.5px] border-zinc-900">
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600">{t('footer_copyright')}</p>
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600 mt-4 md:mt-0">{t('footer_coords')}</p>
                </div>
              <div className="mt-6"><SiteFooterLinks /></div>
            </footer>

            <FormDrawer isOpen={formOpen} onClose={() => setFormOpen(false)} title={t('form_title')} subtitle={t('form_subtitle')}>
                <div className="flex flex-col gap-6 pt-4">
                    <a href="https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20em%20Comunicação%20e%20Publicidade." target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-black text-white font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-zinc-800 transition-colors">
                        {t('form_whatsapp')}
                    </a>
                    <a href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer" className="w-full py-4 border border-black text-black font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-black hover:text-white transition-colors">
                        {t('form_instagram')}
                    </a>
                </div>
            </FormDrawer>
        </div>
    );
}
