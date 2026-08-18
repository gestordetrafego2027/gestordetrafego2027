'use client';
import Image from 'next/image';
import { initAosNative } from '@/lib/aosNative';
import { track } from '@/components/analytics/Tracking';
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import FormProdutora from '@/app/components/forms/FormProdutora';
import LandingTeam from '@/app/components/LandingTeam';
import BlogSection from '@/app/components/BlogSection';

export default function ProdutoraExecutivaPage() {
    const t = useTranslations('produtora_executiva');
    const [formCta, setFormCta] = useState(null);
    const openForm = (ctaLocation) => { track('Lead', { lead_type: 'produtora_executiva', content_name: `Executiva Form — ${ctaLocation}` }); setFormCta({ ctaLocation }); };
    const closeForm = () => setFormCta(null);

    useEffect(() => {
        const cleanup = initAosNative(); return cleanup;
    }, []);

    const nucleos = [
        { icon: 'lightbulb', titleKey: 'servico_1_title', descKey: 'servico_1_desc' },
        { icon: 'videocam', titleKey: 'servico_2_title', descKey: 'servico_2_desc' },
        { icon: 'style', titleKey: 'servico_3_title', descKey: 'servico_3_desc' },
        { icon: 'person_celebrate', titleKey: 'servico_4_title', descKey: 'servico_4_desc' },
        { icon: 'construction', titleKey: 'servico_5_title', descKey: 'servico_5_desc' },
        { icon: 'diamond', titleKey: 'servico_6_title', descKey: 'servico_6_desc' },
    ];

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            `}} />

            <h1 className="sr-only">Produção Executiva 360° para Campanhas de Alto Padrão — House Mazzutti</h1>

            <Header variant="dark" />

            {/* HERO */}
            <section className="relative w-full overflow-hidden bg-black m-0 p-0 border-0" style={{ height: "105vh" }}>
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/produtora/banners/banner-1.webp"
                        alt="Produção executiva 360° — House Mazzutti"
                        fill priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                    <div className="max-w-3xl">
                        <span className="text-caption text-white/70 mb-6 block" data-aos="fade-up" data-aos-delay="100">{t('hero_label')}</span>
                        <h2 className="text-h1 text-white mb-8 hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">{t('hero_titulo')}</h2>
                        <p className="text-body text-white/80 mb-12 measure-editorial" data-aos="fade-up" data-aos-delay="300">{t('hero_texto')}</p>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => openForm('hero')} className="group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                {t('hero_cta')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 NUCLEOS */}
            <section className="bg-[#f5f5f5] pt-[4rem] md:pt-[5rem] pb-[10rem] md:pb-[12rem]">
                <div className="max-w-[1440px] mx-auto px-6 text-center">
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">{t('servicos_label')}</span>
                    <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">{t('servicos_titulo')}</h2>
                    <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">{t('servicos_subtitulo')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                        {nucleos.map((s, i) => (
                            <div key={s.icon} className="flex flex-col items-center" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon={s.icon}>{s.icon}</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">{t(s.titleKey)}</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">{t(s.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingTeam
                heading={t('team_heading')}
                items={[
                    { title: t('team_1_title'), desc: t('team_1_desc'), image: '/images/produtora/diferenciais/governanca-producao.webp', alt: 'Governança total de produção — House Mazzutti' },
                    { title: t('team_2_title'), desc: t('team_2_desc'), image: '/images/produtora/diferenciais/especialistas-curados.webp', alt: 'Especialistas curados pela House Mazzutti' },
                    { title: t('team_3_title'), desc: t('team_3_desc'), image: '/images/produtora/diferenciais/escala-controle.webp', alt: 'Escala com controle — House Mazzutti' },
                ]}
            />

            {/* QUOTE */}
            <section className="relative py-40 w-full flex items-center justify-center overflow-hidden bg-zinc-900">
                <Image src="/images/produtora/banners/banner-2.webp" alt="Produção executiva — House Mazzutti" fill className="object-cover opacity-40" sizes="100vw" />
                <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6" data-aos="fade-up">{t('quote_texto')}</h2>
                    <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60" data-aos="fade-up" data-aos-delay="100">{t('quote_subtitulo')}</p>
                </div>
            </section>

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">{t('comparativo_titulo')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div data-aos="fade-right">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">{t('com_label')}</h3>
                            <ul className="space-y-10">
                                {[
                                    { t: t('com_1_title'), d: t('com_1_desc') },
                                    { t: t('com_2_title'), d: t('com_2_desc') },
                                    { t: t('com_3_title'), d: t('com_3_desc') },
                                ].map((i) => (
                                    <li key={i.t} className="flex items-start gap-6">
                                        <div>
                                            <p className="font-headline text-lg mb-2 text-black">{i.t}</p>
                                            <p className="text-zinc-500 text-sm">{i.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div data-aos="fade-left">
                            <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-12">{t('sem_label')}</h3>
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
                <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up">{t('cta_titulo')}</h2>
                <p className="font-body text-white/60 text-lg mb-12 max-w-xl" data-aos="fade-up" data-aos-delay="100">{t('cta_subtitulo')}</p>
                <button
                    type="button"
                    onClick={() => openForm('final-cta')}
                    className="bg-white text-black font-label uppercase tracking-[0.2em] text-sm px-10 py-4 hover:bg-neutral-100 transition-colors"
                    data-aos="fade-up" data-aos-delay="200"
                >
                    {t('cta_btn')}
                </button>
            </section>

            {/* BLOG */}
            <BlogSection
                slugs={[
                    'producao-executiva-sistema-campanhas',
                    'por-que-boas-ideias-nao-garantem-resultados',
                    'por-que-campanhas-caras-falham',
                    'campanha-lancamento-arquitetura-invisivel',
                ]}
                allLabel="Ver todos →"
                readLabel="Ler →"
            />

            {/* FOOTER */}
            <footer className="bg-white text-zinc-900 py-24 px-12 border-t-[0.5px] border-zinc-200 flex flex-col items-center w-full text-center space-y-8">
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 pb-12">
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-zinc-900 transition-colors duration-200" href="/contato">{t('footer_nav_contato')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-zinc-900 transition-colors duration-200" href="/portfolio-produtora">{t('footer_nav_portfolio')}</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-zinc-900 transition-colors duration-200" href="/blog">{t('footer_nav_blog')}</Link>
                </nav>
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 border-t-[0.5px] border-zinc-200">
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
                    sourceUrl="/produtora/executiva"
                    ctaLocation={formCta?.ctaLocation ?? null}
                />
            </FormDrawer>
        </div>
    );
}
