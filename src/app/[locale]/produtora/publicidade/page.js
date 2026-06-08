'use client';
import { initAosNative } from '@/lib/aosNative';

import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import FormProdutora from '@/app/components/forms/FormProdutora';
import LandingGallery from '@/app/components/LandingGallery';
import LandingTeam from '@/app/components/LandingTeam';
import LandingPricing from '@/app/components/LandingPricing';
import {useTranslations} from 'next-intl';

export default function ProdutoraPublicidadePage() {
    const t = useTranslations('produtora_publicidade');
    const [formCta, setFormCta] = useState(null);
    const openForm = (ctaLocation, packageSelected = null) => setFormCta({ ctaLocation, packageSelected });
    const closeForm = () => setFormCta(null);

    useEffect(() => {
        const cleanup = initAosNative(); return cleanup;
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <title>{t('page_title')}</title>
            <meta name="description" content={t('page_description')} />

            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .page-frame { padding-left: 40px; padding-right: 40px; }
            `}} />

            <h1 className="sr-only">{t('hero_sr_title')}</h1>

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
                        <span className="text-caption text-white/70 mb-6 block" data-aos="fade-up" data-aos-delay="100">{t('hero_label')}</span>
                        <h1 className="text-h1 text-white mb-8 hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">{t('hero_titulo')}</h1>
                        <p className="text-body text-white/80 mb-12 measure-editorial" data-aos="fade-up" data-aos-delay="300">
                            {t('hero_texto')}
                        </p>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => openForm('hero')} className="group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500">
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
                                { icon: 'videocam', title: t('servico_1_title'), desc: t('servico_1_desc') },
                                { icon: 'movie_edit', title: t('servico_2_title'), desc: t('servico_2_desc') },
                                { icon: 'smartphone', title: t('servico_3_title'), desc: t('servico_3_desc') },
                                { icon: 'groups', title: t('servico_4_title'), desc: t('servico_4_desc') },
                                { icon: 'settings', title: t('servico_5_title'), desc: t('servico_5_desc') },
                                { icon: 'diamond', title: t('servico_6_title'), desc: t('servico_6_desc') },
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
            <LandingTeam
                heading={t('team_heading')}
                items={[
                    { title: t('team_item_1_title'), desc: t('team_item_1_desc'), image: '/images/produtora/moda/beatco/capa.webp', alt: 'Filmes publicitários de alta performance — House Mazzutti' },
                    { title: t('team_item_2_title'), desc: t('team_item_2_desc'), image: '/images/studio/vitoria-boidt/capa.webp', alt: 'Casting e gestão de talentos — House Mazzutti' },
                    { title: t('team_item_3_title'), desc: t('team_item_3_desc'), image: '/images/produtora/moda/unique-chic/capa.webp', alt: 'Operação e logística de produção — House Mazzutti' },
                ]}
            />

            {/* QUOTE */}
            <section className="relative h-[769px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
                    <img fetchpriority="high" alt="Produção de campanha — House Mazzutti" className="absolute inset-0 w-full h-full object-cover opacity-80" src="/images/produtora/beleza/jequiti-larissa-manoela/capa.webp" />
                    <div className="relative z-10 text-center px-8">
                        <button type="button" className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-12 mx-auto hover:bg-white/10 transition-colors group">
                            <span className="material-symbols-outlined text-white text-4xl group-hover:scale-110 transition-transform" data-icon="play_arrow">play_arrow</span>
                        </button>
                        <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">{t('quote_text')}</h2>
                        <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">{t('quote_sub')}</p>
                    </div>
            </section>

            <LandingPricing service="publicidade" openForm={openForm} />

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">{t('comparativo_titulo')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div data-aos="fade-right">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">{t('comparativo_com_label')}</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: t('com_1_title'), d: t('com_1_desc') },
                                        { t: t('com_2_title'), d: t('com_2_desc') },
                                        { t: t('com_3_title'), d: t('com_3_desc') },
                                    ].map((i) => (
                                        <li key={i.t} className="flex items-start gap-6">
                                            <svg className="text-zinc-700 pt-1 shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="9 12 12 15 16 10" /></svg>
                                            <div>
                                                <p className="font-headline text-lg mb-2 text-black">{i.t}</p>
                                                <p className="text-zinc-500 text-sm">{i.d}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div data-aos="fade-left">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">{t('comparativo_sem_label')}</h3>
                                <ul className="space-y-10">
                                    {[
                                        { t: t('sem_1_title'), d: t('sem_1_desc') },
                                        { t: t('sem_2_title'), d: t('sem_2_desc') },
                                        { t: t('sem_3_title'), d: t('sem_3_desc') },
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
                    <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up" data-aos-delay="100">{t('cta_final_titulo')}</h2>
                    <button type="button" onClick={() => openForm('final')} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="200">
                        {t('cta_final_btn')}
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
                        <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-500">{t('footer_social')}</p>
                        <div className="flex space-x-8 justify-center">
                            <Link className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 hover:text-white transition-colors" href="https://instagram.com/housemazzutti">INSTAGRAM</Link>
                            <Link className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 hover:text-white transition-colors" href="https://linkedin.com/company/housemazzutti">LINKEDIN</Link>
                        </div>
                    </div>
                </div>
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 pb-12">
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/contato">{t('footer_contato')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/portfolio">{t('footer_portfolio')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/blog">{t('footer_blog')}</Link>
                </nav>
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 border-t-[0.5px] border-zinc-900">
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600">{t('footer_copyright')}</p>
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600 mt-4 md:mt-0">23.5505° S, 46.6333° W</p>
                </div>
              <div className="mt-6"><SiteFooterLinks /></div>
            </footer>

            <FormDrawer
                isOpen={!!formCta}
                onClose={closeForm}
                title={t('form_title')}
                subtitle={t('form_subtitle')}
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
