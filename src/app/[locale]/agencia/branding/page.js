'use client';
import { pageMetadata } from '@/lib/seo/metadata';
import { track } from '@/components/analytics/Tracking';
import { initAosNative } from '@/lib/aosNative';
import Image from 'next/image';

import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import FormBranding from '@/app/components/forms/FormBranding';
import LandingTeam from '@/app/components/LandingTeam';
import BlogSection from '@/app/components/BlogSection';

export function generateMetadata() {
  return pageMetadata({
    path: '/agencia/branding/',
    title: 'Branding e Identidade Visual para Marcas — House Mazzutti Agência',
    description: 'Branding estratégico com direção criativa de Angelo Mazzutti. Identidade visual, nomenclatura, brandbook e voz de marca para empresas em São Paulo.',
    image: { src: '/images/agencia/knowhol/capa.webp', alt: 'Projeto de branding — House Mazzutti Agência', width: 1200, height: 630 },
  });
}

export default function AgenciaBrandingPage() {
    const t = useTranslations('agencia_branding');
    const [formOpen, setFormOpen] = useState(false);
    const [faqOpen, setFaqOpen] = useState(null);
    const openForm = () => { track('Lead', { lead_type: 'agencia_branding', content_name: 'Branding Form' }); setFormOpen(true); };

    useEffect(() => {
        const cleanup = initAosNative(); return cleanup;
    }, []);

    const processoSteps = [
        { num: t('processo_1_num'), titulo: t('processo_1_titulo'), desc: t('processo_1_desc') },
        { num: t('processo_2_num'), titulo: t('processo_2_titulo'), desc: t('processo_2_desc') },
        { num: t('processo_3_num'), titulo: t('processo_3_titulo'), desc: t('processo_3_desc') },
        { num: t('processo_4_num'), titulo: t('processo_4_titulo'), desc: t('processo_4_desc') },
        { num: t('processo_5_num'), titulo: t('processo_5_titulo'), desc: t('processo_5_desc') },
    ];

    const faqItems = [
        { q: t('faq_1_q'), a: t('faq_1_a') },
        { q: t('faq_2_q'), a: t('faq_2_a') },
        { q: t('faq_3_q'), a: t('faq_3_a') },
        { q: t('faq_4_q'), a: t('faq_4_a') },
    ];

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            `}} />

            <Header variant="dark" />

            {/* HERO */}
            <section className="relative w-full overflow-hidden bg-black m-0 p-0 border-0" style={{ height: "105vh" }}>
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/agencia/knowhol/capa.webp"
                        alt="Projeto de branding e identidade de marca — House Mazzutti, São Paulo"
                        fill priority sizes="100vw"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                    <div className="max-w-3xl">
                        <span className="text-caption text-white/70 mb-6 block" data-aos="fade-up" data-aos-delay="100">{t('hero_label')}</span>
                        <h1 className="text-h1 text-white mb-8 hmzt-hero-title" data-aos="fade-up" data-aos-delay="200">{t('hero_titulo')}</h1>
                        <p className="text-body text-white/80 mb-12 measure-editorial" data-aos="fade-up" data-aos-delay="300">{t('hero_subtitulo')}</p>
                        <div className="flex flex-col sm:flex-row gap-6 items-start" data-aos="fade-up" data-aos-delay="400">
                            <button type="button" onClick={() => openForm()} className="group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                {t('hero_cta_btn')}
                            </button>
                            <a href="#marcas" className="font-label uppercase tracking-[0.2em] text-[10px] text-white/60 hover:text-white transition-colors py-4">
                                {t('hero_cta_secondary')} ↓
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* REFRAME */}
            <section className="bg-black py-20 px-6 text-center" data-aos="fade-up">
                <h2 className="font-headline text-white text-2xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto tracking-tight mb-4">
                    {t('manifesto_texto')}
                </h2>
                <p className="font-body text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    {t('manifesto_desc')}
                </p>
            </section>

            {/* ESCOPO */}
            <section className="bg-[#f5f5f5] pt-[5rem] pb-[8rem]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16">
                    <div className="mb-16 max-w-2xl" data-aos="fade-up">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/50 mb-4 block">{t('services_label')}</span>
                        <h2 className="font-headline text-black tracking-tight text-[1.8rem] md:text-[2.85rem] leading-tight">{t('services_titulo')}</h2>
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

                    <p className="font-body text-on-surface-variant text-sm md:text-base mt-10 text-center" data-aos="fade-up">
                        {t('services_footer')}
                    </p>
                </div>
            </section>

            {/* PROCESSO */}
            <section className="bg-white py-24 md:py-32 px-6 md:px-16">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16" data-aos="fade-up">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/40 mb-4 block">{t('processo_label')}</span>
                        <h2 className="font-headline text-black text-[1.8rem] md:text-[2.85rem] leading-tight tracking-tight">{t('processo_titulo')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-black/10">
                        {processoSteps.map((step, i) => (
                            <div key={step.num} className={`p-10 flex flex-col gap-6 ${i < processoSteps.length - 1 ? 'border-b md:border-b lg:border-b-0 lg:border-r border-black/10' : ''}`} data-aos="fade-up" data-aos-delay={i * 80}>
                                <span className="font-headline text-5xl text-black/10 leading-none">{step.num}</span>
                                <div>
                                    <h3 className="font-headline text-xl tracking-tight mb-3">{step.titulo}</h3>
                                    <p className="text-on-surface-variant font-light text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="font-label uppercase tracking-[0.2em] text-[10px] text-black/40 mt-8 text-center" data-aos="fade-up">
                        {t('processo_prazo')}
                    </p>
                </div>
            </section>

            {/* PROVA — cases */}
            <section id="marcas" className="bg-zinc-950 py-24 px-6 md:px-16">
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

                    {/* CASE 1: House Mazzutti — dado real */}
                    {/* Linha 1: House Mazzutti — destaque grande */}
                    <div className="mb-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Link href="/portfolio-agencia/house-mazzutti" className="md:col-span-2 aspect-[16/9] overflow-hidden relative group block" data-aos="fade-up">
                            <Image src="/images/agencia/house-mazzutti/capa.webp" alt="Identidade visual House Mazzutti" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/50 block mb-1">Casa criativa estratégica</span>
                                <p className="font-headline text-white text-lg leading-snug">House Mazzutti</p>
                                <p className="font-body text-white/60 text-sm mt-1">A marca que dirige a leitura das outras: sistema brutalista, monocromático, editorial.</p>
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2">
                            <Link href="/portfolio-agencia/on-take" className="flex-1 min-h-[160px] overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="50">
                                <Image src="/images/agencia/on-take/capa.webp" alt="Identidade visual On Take" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                    <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">On Take</span>
                                </div>
                            </Link>
                            <Link href="/portfolio-agencia/pous" className="flex-1 min-h-[160px] overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="100">
                                <Image src="/images/agencia/pous/capa.webp" alt="Identidade visual Pous" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                    <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Pous</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Linha 2: grid 4 colunas */}
                    <div className="mb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Link href="/portfolio-agencia/mabdo" className="aspect-square overflow-hidden relative group block" data-aos="fade-up">
                            <Image src="/images/agencia/mabdo/capa.webp" alt="Identidade visual Mabdo" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Mabdo</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/samrat" className="aspect-square overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="50">
                            <Image src="/images/agencia/samrat/capa.webp" alt="Identidade visual Samrat" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Samrat</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/dra-ariadne-barbosa" className="aspect-square overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="100">
                            <Image src="/images/agencia/dra-ariadne-barbosa/dra-ariadne-barbosa-logo-branding-manual-de-marca-identidade-visual-house-mazzutti-agencia-01.webp" alt="Identidade visual Dra. Ariadne Barbosa" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Ariadne</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/knowhol" className="aspect-square overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="150">
                            <Image src="/images/agencia/knowhol/capa.webp" alt="Identidade visual Knowhol" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Knowhol</span>
                            </div>
                        </Link>
                    </div>

                    {/* Linha 3: grid 4 colunas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Link href="/portfolio-agencia/fort" className="aspect-square overflow-hidden relative group block" data-aos="fade-up">
                            <Image src="/images/agencia/fort/fort-negocios-imobiliarios-branding-identidade-visual-house-mazzutti-agencia-01.webp" alt="Identidade visual Fort" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Fort</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/lbo" className="aspect-square overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="50">
                            <Image src="/images/agencia/lbo/lbo-consultoria-logo-marca-branding-house-mazzutti-agencia-design-01.webp" alt="Identidade visual LBO" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">LBO</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/jucileia-soares" className="aspect-square overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="100">
                            <Image src="/images/agencia/jucileia-soares/jucileia-soares-branding-identidade-visual-house-mazzutti-agencia-01.webp" alt="Identidade visual Jucileia Soares" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Jucileia Soares</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/luiz-jr" className="aspect-square overflow-hidden relative group block" data-aos="fade-up" data-aos-delay="150">
                            <Image src="/images/agencia/luiz-jr/luiz-jr-branding-identidade-visual-house-mazzutti-agencia-01.webp" alt="Identidade visual Luiz Jr" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">Luiz Jr</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* DIFERENCIAL */}
            <div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-20" data-aos="fade-up">
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/40 block">{t('diferenciais_label')}</span>
                </div>
                <LandingTeam
                    heading={t('diferenciais_heading')}
                    items={[
                        { title: t('diferencial_1_titulo'), desc: t('diferencial_1_desc'), image: '/images/agencia/diferenciais/identidade-coesa.webp', alt: 'Identidade visual coesa — House Mazzutti' },
                        { title: t('diferencial_2_titulo'), desc: t('diferencial_2_desc'), image: '/images/agencia/diferenciais/posicionamento.webp', alt: 'Posicionamento estratégico de marca — House Mazzutti' },
                        { title: t('diferencial_3_titulo'), desc: t('diferencial_3_desc'), image: '/images/agencia/diferenciais/brand-book.webp', alt: 'Brand book completo — House Mazzutti' },
                    ]}
                />
            </div>

            {/* QUOTE — bloco de citação */}
            <section className="relative h-[769px] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/agencia/mabdo/capa.webp"
                    alt="Branding — House Mazzutti"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-8">
                    <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">{t('quote_texto')}</h2>
                    <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">{t('quote_subtitulo')}</p>
                </div>
            </section>

            {/* COM / SEM */}
            <section className="bg-zinc-50 py-32 px-12 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight text-black" data-aos="fade-up">{t('comparativo_titulo')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/10">
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

            {/* FAQ */}
            <section className="bg-white py-24 md:py-32 px-6 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16" data-aos="fade-up">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/40 mb-4 block">{t('faq_label')}</span>
                    </div>
                    <div className="divide-y divide-black/10" data-aos="fade-up">
                        {faqItems.map((item, i) => (
                            <div key={i} className="py-6">
                                <button
                                    type="button"
                                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                    className="w-full flex items-start justify-between gap-6 text-left"
                                    aria-expanded={faqOpen === i}
                                >
                                    <span className="font-headline text-lg md:text-xl tracking-tight">{item.q}</span>
                                    <span className="material-symbols-outlined text-black/40 shrink-0 mt-1 transition-transform duration-200" style={{transform: faqOpen === i ? 'rotate(45deg)' : 'none'}}>add</span>
                                </button>
                                {faqOpen === i && (
                                    <p className="font-body text-on-surface-variant font-light leading-relaxed mt-4 max-w-3xl">{item.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEPOIMENTOS — aguardando conteúdo real (DEPOIMENTOS ainda <<PREENCHER>>) */}
            {/*
            <section className="bg-zinc-50 py-24 md:py-32 px-6 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black/40 mb-4 block">REPUTAÇÃO</span>
                    <h2 className="font-headline text-black text-[1.8rem] md:text-[2.85rem] leading-tight tracking-tight mb-16">
                        O que dizem as marcas que passaram pela House.
                    </h2>
                </div>
            </section>
            */}

            {/* CTA FINAL */}
            <section className="bg-black py-32 px-12 md:px-24 text-center flex flex-col items-center">
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
                    'branding-project-arquitetura-valor',
                    'branding-project-motor-vendas',
                    'quanto-investir-em-branding',
                    'identidade-visual-o-que-e-quando-refazer-a-sua',
                ]}
                allLabel="Ver todos →"
                readLabel="Ler →"
            />

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
                <FormBranding onClose={() => setFormOpen(false)} />
            </FormDrawer>
        </div>
    );
}
