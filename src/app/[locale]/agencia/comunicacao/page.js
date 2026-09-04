'use client';
import { track } from '@/components/analytics/Tracking';
import { initAosNative } from '@/lib/aosNative';
import { trackAndOpenWhatsApp } from '@/lib/trackWhatsAppClick';
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import LandingTeam from '@/app/components/LandingTeam';
import BlogSection from '@/app/components/BlogSection';


export default function AgenciaComunicacaoPage() {
    const t = useTranslations('agencia_comunicacao');
    const [formOpen, setFormOpen] = useState(false);
    const openForm = () => { track('Lead', { lead_type: 'agencia_comunicacao', content_name: 'Comunicação Form' }); setFormOpen(true); };

    useEffect(() => {
        const cleanup = initAosNative(); return cleanup;
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            `}} />

            <Header variant="dark" />

                        {/* HERO */}
            <section className="relative w-full overflow-hidden bg-black m-0 p-0 border-0" style={{ height: "105vh" }}>
                <div className="absolute inset-0 z-0">
                    <Image src="/images/agencia/on-take/capa.webp" alt="Campanha de lançamento em São Paulo — House Mazzutti Agência" fill priority className="object-cover object-center" sizes="100vw" />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                    <div className="max-w-3xl">
                        <span className="text-caption text-white/70 mb-6 block" data-aos="fade-up" data-aos-delay="100">{t('hero_label')}</span>
                        <h1 className="text-h1 text-white mb-8 hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">{t('hero_titulo')}</h1>
                        <p className="text-body text-white/80 mb-12 measure-editorial" data-aos="fade-up" data-aos-delay="300">{t('hero_subtitulo')}</p>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => openForm()} className="group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500">
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
            <section className="bg-white py-24 md:py-32 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/50 mb-4 block" data-aos="fade-up">{t('portfolio_label')}</span>
                    <h2 className="font-headline text-black text-3xl md:text-4xl mb-16 tracking-tight" data-aos="fade-up" data-aos-delay="100">{t('portfolio_titulo')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['on-take/1','on-take/2','on-take/3','on-take/4','pous/1','pous/2','pous/3','pous/4'].map((img, i) => {
                            const project = img.split('/')[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                            return (
                                <div key={img} className="aspect-square overflow-hidden relative" data-aos="fade-up" data-aos-delay={i * 50}>
                                    <Image
                                        src={`/images/agencia/${img}.webp`}
                                        alt={`Projeto ${project} — Comunicação House Mazzutti`}
                                        fill sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            )
                        })}
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
                <Image src="/images/agencia/pous/capa.webp" alt="Comunicação digital em São Paulo — House Mazzutti Agência" fill className="object-cover object-center" sizes="100vw" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-8">
                    <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">{t('quote_titulo')}</h2>
                    <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">{t('quote_subtitulo')}</p>
                </div>
            </section>

            {/* COMPARATIVE */}
            <section className="bg-zinc-50 py-32 md:py-40 px-12 md:px-24">
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
            <section className="bg-black py-32 md:py-40 px-12 md:px-24 text-center flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 text-[11px] font-label mb-6">
                  <span style={{ color: '#f5c518', letterSpacing: '0.05em' }}>★★★★★</span>
                  <span className="text-zinc-400">5.0 · 32 avaliações no Google</span>
                </div>
                <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug hmzt-hero-title" data-aos="fade-up">{t('cta_final_titulo')}</h2>
                <button type="button" onClick={() => openForm()} className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="100">
                    {t('cta_final_btn')}
                </button>
            </section>

            {/* BLOG */}
            <BlogSection
                slugs={[
                    'gestao-redes-sociais-para-empresas',
                    'campanha-lancamento-arquitetura-invisivel',
                    'por-que-campanhas-falham',
                    'geo-aeo-posicionamento-era-das-ias',
                ]}
                allLabel="Ver todos →"
                readLabel="Ler →"
            />

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
                    <button
                        type="button"
                        onClick={() => trackAndOpenWhatsApp({ location: 'agencia_comunicacao_form_drawer', message: 'Olá, tenho interesse em Comunicação e Publicidade com a House Mazzutti.' })}
                        className="w-full py-4 bg-black text-white font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-zinc-800 transition-colors"
                    >
                        {t('form_whatsapp')}
                    </button>
                    <a href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer" className="w-full py-4 border border-black text-black font-label uppercase tracking-[0.2em] text-[10px] text-center hover:bg-black hover:text-white transition-colors">
                        {t('form_instagram')}
                    </a>
                </div>
            </FormDrawer>
        </div>
    );
}
