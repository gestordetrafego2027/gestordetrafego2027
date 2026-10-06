"use client";

import React, { useState } from "react";
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { useTranslations } from "next-intl";
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";
import FormDrawer from "@/app/components/FormDrawer";
import FormAngelo from "@/app/components/forms/FormAngelo";
import { track } from '@/components/analytics/Tracking';
import BlogSection from "@/app/components/BlogSection";

export default function AngeloPage() {
    const t = useTranslations("angelo_page");
    const tFooter = useTranslations('footer');
    const [formCta, setFormCta] = useState(null);
    const openForm = (ctaLocation) => { track('Lead', { lead_type: 'angelo', content_name: `Angelo Form — ${ctaLocation}` }); setFormCta({ ctaLocation }); };
    const closeForm = () => setFormCta(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        { text: t("dep_slide_1"), author: "" },
        { text: t("dep_slide_2"), author: "" },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="antialiased font-body" style={{ fontWeight: 300, backgroundColor: "#fafafa", color: "#1a1c1c" }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                body { font-weight: 300; background-color: #fafafa; color: #1a1c1c; }
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24; }
                .ghost-text { -webkit-text-stroke: 1px rgba(255,255,255,0.1); color: transparent; pointer-events: none; }
                .line-growth { transition: width 1.5s cubic-bezier(0.65, 0, 0.35, 1); }
                .hover-transition-refined { transition: all 0.6s cubic-bezier(0.2, 1, 0.3, 1); }
                .custom-nav-line { width: 40px; height: 1px; background-color: rgba(255,255,255,0.3); transition: width 0.3s ease; }
                .custom-nav-btn:hover .custom-nav-line { width: 60px; background-color: white; }
                @keyframes progress-load { from { width: 0; } to { width: var(--target-width); } }
                .animate-progress { animation: progress-load 1.5s ease-out forwards; }
                .percentage-tag {
                    position: absolute; right: 0; top: 50%; transform: translateY(-50%);
                    background-color: #000000; color: #ffffff; padding: 2px 6px;
                    font-size: 10px; font-family: 'Work Sans', sans-serif; white-space: nowrap;
                }
                @keyframes logo-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
                .logo-container { position: relative; overflow: hidden; height: 144px; display: flex; align-items: center; }
                .logo-layer { transition: transform 0.4s ease, opacity 0.4s ease; white-space: nowrap; height: 144px; display: flex; align-items: center; }
                .logo-layer-1 { transform: translateY(0); opacity: 0.4; }
                .logo-layer-2 { position: absolute; top: 0; left: 0; transform: translateY(-100%); opacity: 0; }
                .logo-container:hover .logo-layer-1 { transform: translateY(100%); opacity: 0; }
                .logo-container:hover .logo-layer-2 { transform: translateY(0); opacity: 1; }
                .testimonial-slide { display: none; opacity: 0; }
                .testimonial-slide.active { display: flex; opacity: 1; animation: fadeIn 0.8s ease-in-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            ` }} />

            {/* SEO Hidden H1 */}
            <h1 className="sr-only">{t("page_title")}</h1>

            <style>{`
                header a, header div { color: #000 !important; }
                header { border-bottom: 0.5px solid #e0e0e0 !important; }
            `}</style>

            <Header variant="light" />

            <main>
                {/* 1. Hero */}
                <section className="min-h-[calc(100vh+20px)] flex flex-col md:flex-row items-stretch" style={{ backgroundColor: "#ffffff", borderBottom: '0.5px solid #e0e0e0' }}>
                    <div className="w-full md:w-1/2 flex flex-col justify-center px-12 py-32 space-y-10 pl-[calc(3rem+15px+20px)] md:pl-[calc(6rem+15px+20px)]" style={{ backgroundColor: "#ffffff" }}>
                        <span className="text-caption text-black/70">{t("hero_label")}</span>
                        <h2 className="text-h1 text-black hmzt-hero-title">
                            {t("hero_title")}
                        </h2>
                        <p className="text-body text-black/80 measure-editorial">
                            {t("hero_body")}
                        </p>
                        <p className="text-caption text-black">
                            — Angelo Mazzutti
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden min-h-[500px] md:min-h-[80vh]">
                        <Image
                            alt="HMZT — House Mazzutti branding"
                            src="/images/angelo/hmzt-logo.webp"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={85}
                            priority
                            className="object-cover"
                        />
                    </div>
                </section>

                {/* 2. Diferenciais */}
                <section className="bg-black text-white py-40 md:py-48 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[20vw] select-none ghost-text font-headline tracking-[-0.05em] font-bold">{t("diferenciais_ghost")}</span>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-24">
                        <h2 className="text-h2 text-center mb-32 max-w-3xl mx-auto text-white">
                            {t("diferenciais_title")}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[
                                { num: t("dif_1_num"), bold: t("dif_1_bold"), desc: t("dif_1_desc") },
                                { num: t("dif_2_num"), bold: t("dif_2_bold"), desc: t("dif_2_desc") },
                                { num: t("dif_3_num"), bold: t("dif_3_bold"), desc: t("dif_3_desc") },
                            ].map((item, i) => (
                                <div key={i} className="space-y-6">
                                    <span className="text-caption text-neutral-300 block">{item.num}</span>
                                    <div className="h-px bg-neutral-800 w-full"></div>
                                    <h3 className="text-h3 text-white">{item.bold}</h3>
                                    <p className="text-body text-neutral-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Quem é */}
                <section className="min-h-[80vh] flex flex-col md:flex-row relative">
                    <div className="w-full md:w-1/2 bg-[#f5f5f5] flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-10">
                            <span className="text-caption text-neutral-600">{t("quem_label")}</span>
                            <h2 className="text-h2 text-black">
                                {t("quem_title")}
                            </h2>
                            <div className="space-y-5 text-body text-zinc-400">
                                <p>{t("quem_p1")}</p>
                                <p>{t("quem_p2")}</p>
                            </div>
                            <div className="pt-6 text-h3 text-black/80">Angelo Mazzutti</div>
                        </div>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden h-full min-h-[500px] md:min-h-[80vh]">
                        <Image
                            alt="Angelo Mazzutti — Diretor Criativo"
                            src="/images/angelo/angelo-portrait.webp"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={82}
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                </section>

                {/* 4. Serviços */}
                <section className="bg-white py-32 md:py-40 px-12 md:px-24">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <span className="text-caption text-neutral-500 mb-6 block">{t("servicos_label")}</span>
                            <h2 className="text-h2 text-black">{t("servicos_title")}</h2>
                        </div>
                        <div className="md:w-2/3 space-y-10">
                            {[
                                { title: t("srv_1_title"), desc: t("srv_1_desc"), num: "01" },
                                { title: t("srv_2_title"), desc: t("srv_2_desc"), num: "02" },
                                { title: t("srv_3_title"), desc: t("srv_3_desc"), num: "03" },
                                { title: t("srv_4_title"), desc: t("srv_4_desc"), num: "04" },
                            ].map((item, i) => (
                                <div key={i} className="group border-b border-neutral-200 pb-8 flex justify-between items-end hover:border-black transition-colors cursor-default">
                                    <div>
                                        <h4 className="text-h3 text-black mb-2">{item.title}</h4>
                                        <p className="text-body text-neutral-500">{item.desc}</p>
                                    </div>
                                    <span className="text-caption text-neutral-400">{item.num}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Estrutura */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[600px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-bold text-[18vw] tracking-[-0.05em] leading-none translate-y-[40%] opacity-50" style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>{t("estrutura_ghost")}</span>
                    </div>
                    <div className="relative z-10 max-w-6xl mx-auto w-full">
                        <div className="text-center mb-20">
                            <span className="text-caption text-zinc-500 block mb-6">{t("estrutura_label")}</span>
                            <h2 className="text-h2 text-white">
                                {t("estrutura_title")}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: t("est_1_title"), desc: t("est_1_desc") },
                                { title: t("est_2_title"), desc: t("est_2_desc") },
                                { title: t("est_3_title"), desc: t("est_3_desc") },
                            ].map((card, i) => (
                                <div key={i} className="text-center p-12 border border-white/10 bg-white/5 backdrop-blur-sm">
                                    <h3 className="text-h3 text-white mb-6">{card.title}</h3>
                                    <p className="text-body text-white/70">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Valor */}
                <section className="bg-[#f5f5f5] py-32 md:py-40 px-12 md:px-24">
                    <div className="max-w-4xl mx-auto text-center space-y-16">
                        <h2 className="text-h1 text-black">
                            {t("valor_title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 text-left pt-8">
                            <div className="space-y-6">
                                <h4 className="text-caption text-neutral-500">{t("valor_deixa_label")}</h4>
                                <ul className="space-y-4 text-body text-zinc-400">
                                    {[t("valor_deixa_1"), t("valor_deixa_2"), t("valor_deixa_3")].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="w-3 h-[1px] bg-neutral-400"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-caption text-neutral-500">{t("valor_passa_label")}</h4>
                                <ul className="space-y-4 text-body text-zinc-400">
                                    {[t("valor_passa_1"), t("valor_passa_2"), t("valor_passa_3")].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="w-3 h-[1px] bg-black"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 flex flex-col items-center space-y-8">
                            <button type="button" onClick={() => openForm('reconstruir')} className="px-16 py-6 bg-black text-white text-button hover:bg-neutral-800 transition-all duration-500">
                                {t("valor_cta")}
                            </button>
                            <p className="text-caption text-neutral-500">
                                {t("valor_tagline")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 7. Depoimentos */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center h-[480px] max-h-[480px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-bold text-[18vw] tracking-[-0.05em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-40 font-headline">{t("dep_ghost")}</span>
                    </div>

                    {/* Navigation */}
                    <div className="absolute left-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={prevSlide}>
                            <div className="custom-nav-line mr-2"></div>
                            <svg className="transform -translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={nextSlide}>
                            <svg className="transform translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            <div className="custom-nav-line ml-2"></div>
                        </button>
                    </div>

                    {/* Slides */}
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <span className="text-caption text-zinc-500 block mb-4">{t("dep_label")}</span>
                            <h2 className="text-h2 text-white">{t("dep_title")}</h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1" style={{height: '220px', display: 'flex', alignItems: 'center'}}>
                                {testimonials.map((slide, i) => (
                                    <div key={i} className={`testimonial-slide flex flex-col justify-center ${currentSlide === i ? "active" : ""}`}>
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">
                                            "{slide.text}"
                                        </h3>
                                        {slide.author && (
                                            <div className="pt-6">
                                                <p className="text-caption text-white/80">{slide.author}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Indicators */}
                            <div className="flex space-x-3 pt-4">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${currentSlide === i ? "opacity-100" : "opacity-30"}`}
                                        onClick={() => goToSlide(i)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <ClientLogos />

                {/* 9. CTA final */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato-final" style={{minHeight: 'auto', paddingTop: '80px', paddingBottom: '80px'}}>
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white hmzt-hero-title">
                            {t("cta_final_title")}
                        </h2>
                        <div className="flex flex-col items-center space-y-10">
                            <button type="button" onClick={() => openForm('final')} className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                {t("cta_final_btn")}
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* BLOG */}
            <BlogSection
                slugs={[
                    'direcao-de-imagem-o-que-faz-um-diretor',
                    'branding-project-arquitetura-valor',
                    'geo-aeo-posicionamento-era-das-ias',
                    'agencia-de-branding-ou-freelancer-quando-contratar-cada-um',
                ]}
                allLabel={t('blog_see_all')}
                readLabel={t('blog_read')}
            />

            {/* FOOTER */}
            <footer className="bg-white text-zinc-900 py-24 px-8 border-t border-zinc-200">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-16">
                        <span className="hm-logo" style={{fontSize: '40px', color: '#fafafa'}}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                    </div>
                    <div className="flex space-x-10 mb-16">
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/">Home</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/studio">Studio</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/portfolio">Portfólio</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/contato">Contato</Link>
                    </nav>
                    <div className="text-caption text-zinc-400">
                        {tFooter('copyright')}
                    </div>
                </div>
              <div className="mt-6"><SiteFooterLinks /></div>
            </footer>
            <FormDrawer
                isOpen={!!formCta}
                onClose={closeForm}
                title={t("form_drawer_title")}
                subtitle={t("form_drawer_subtitle")}
            >
                <FormAngelo
                    onClose={closeForm}
                    sourceUrl="/angelo"
                    ctaLocation={formCta?.ctaLocation ?? null}
                />
            </FormDrawer>
        </div>
    );
}
