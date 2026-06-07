'use client'

import { useState, useEffect } from 'react'
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import Header from '@/app/components/Header'
import ClientLogos from '@/app/components/ClientLogos'
import FormDrawer from '@/app/components/FormDrawer'
import FormProdutora from '@/app/components/forms/FormProdutora'
import BlogSection from '@/app/components/BlogSection'

export default function ProdutoraPage() {
    const t = useTranslations('produtora_page')
    const [formCta, setFormCta] = useState(null)
    const openForm = (ctaLocation) => setFormCta({ ctaLocation })
    const closeForm = () => setFormCta(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0)
    const prevBanner = () => setCurrentBannerSlide(prev => (prev - 1 + 3) % 3)
    const nextBanner = () => setCurrentBannerSlide(prev => (prev + 1) % 3)

    const testimonials = [
        {
            text: t('testimonial_1_text'),
            author: t('testimonial_1_author')
        },
        {
            text: t('testimonial_2_text'),
            author: t('testimonial_2_author')
        },
        {
            text: t('testimonial_3_text'),
            author: t('testimonial_3_author')
        }
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    useEffect(() => {
        // [1] HERO ANIMATION (TEXTOS)
        document.querySelectorAll('.hero-animate').forEach((el) => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(30px)'
        })

        const timer = setTimeout(() => {
            document.querySelectorAll('.hero-animate').forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                }, i * 150)
            })
        }, 150)

        // [2] SCROLL REVEAL (OBSERVER)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1'
                        entry.target.style.transform = 'translateY(0)'
                    }, entry.target.dataset.delay || 0)
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el)
        })

        // [3] PARALLAX BG EFFECT
        const handleScroll = () => {
            document.querySelectorAll('.parallax-bg').forEach((bg) => {
                const rect = bg.parentElement.getBoundingClientRect()
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = rect.top * 0.15
                    bg.style.transform = `translateY(${offset}px)`
                }
            })
        }
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            clearTimeout(timer)
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerSlide(prev => (prev + 1) % 3)
        }, 7000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            <style dangerouslySetInnerHTML={{
                __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
                    font-size: 20px;
                }
                .hero-slider-container {
                    perspective: 1000px;
                }
                .fade-in {
                    animation: fadeIn 1.2s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .nav-line {
                    width: 40px;
                    height: 1px;
                    background-color: white;
                    transition: width 0.3s ease, opacity 0.3s ease;
                }
                .nav-btn:hover .nav-line {
                    width: 60px;
                }
                .text-justify-none { text-align-last: left; }
                .masonry-item:nth-child(even) { margin-top: 4rem; }
                .letter-spacing-huge { letter-spacing: 0.3em; }
                .line-divider { height: 0.5px; width: 100px; background-color: currentColor; opacity: 0.3; }
                .noise-overlay {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.02;
                    pointer-events: none;
                }
                .custom-nav-line {
                    width: 40px;
                    height: 1px;
                    background-color: white;
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .custom-nav-btn:hover .custom-nav-line {
                    width: 70px;
                }
                .testimonial-slide {
                    display: none;
                    animation: slideFade 0.6s ease-in-out forwards;
                }
                .testimonial-slide.active {
                    display: block;
                }
                @keyframes slideFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />

            <Header variant="dark" />

            <main>
                {/* HERO */}
                <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: "105vh" }}>
                    {(() => {
                        const heroSlides = t.raw('hero_slides');
                        return <>
                            <div className="absolute inset-0 z-0">
                                {['/images/produtora/banners/banner-1.webp','/images/produtora/banners/banner-2.webp','/images/produtora/banners/banner-3.webp'].map((src, i) => (
                                    <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{opacity: currentBannerSlide === i ? 1 : 0}}>
                                        <Image src={src} alt="" fill sizes="100vw" quality={85} priority={i === 0} className="object-cover object-top" />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                                <div className="max-w-3xl">
                                    <span className="hero-animate text-caption text-white/70 mb-6 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>{t('hero_label')}</span>
                                    <h1 className="hero-animate text-h1 text-white mb-8 hmzt-hero-title" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        {heroSlides[currentBannerSlide].titulo}
                                    </h1>
                                    <p className="hero-animate text-body text-white/80 mb-12 measure-editorial" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        {heroSlides[currentBannerSlide].texto}
                                    </p>
                                    <button type="button" onClick={() => openForm('hero')} className="hero-animate group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        {t('hero_cta')}
                                    </button>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 left-12 flex items-center z-20">
                                <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity" onClick={prevBanner}>
                                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                        <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                                        <svg className="-ml-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    </div>
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-12 flex items-center z-20">
                                <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity" onClick={nextBanner}>
                                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                        <svg className="-mr-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                                    </div>
                                </button>
                            </div>
                        </>;
                    })()}
                </section>

                {/* Section 2: Gallery */}
                <section className="bg-white pt-24 pb-0 w-full mx-auto">
                    <div className="mb-20 text-center flex flex-col items-center">
                        <span className="text-caption text-zinc-500 block mb-6">{t('portfolio_label')}</span>
                        <h2 className="text-h2 text-black">{t('portfolio_titulo')}</h2>
                        <div className="line-divider mt-8 text-black"></div>
                    </div>
                    <div className="columns-gallery-container" style={{ height: '80vh' }}>
                        <Link className="gallery-column project-item group" href="/portfolio-produtora/elyah">
                            <Image alt="Elyah" src="/images/produtora/acessorios/elyah/1.webp" fill sizes="(max-width: 768px) 100vw, 25vw" quality={80} loading="lazy" className="object-cover" />
                            <div className="project-overlay">
                                <span>Publicidade</span>
                                <h4>Elyah</h4>
                            </div>
                        </Link>
                        <Link className="gallery-column project-item group" href="/portfolio-produtora/oceane">
                            <Image alt="Oceane" src="/images/produtora/beleza/oceane/1.webp" fill sizes="(max-width: 768px) 100vw, 25vw" quality={80} loading="lazy" className="object-cover" />
                            <div className="project-overlay">
                                <span>Content MKT</span>
                                <h4>Oceane</h4>
                            </div>
                        </Link>
                        <Link className="gallery-column project-item group" href="/portfolio-produtora/alletto-still">
                            <Image alt="Alletto Still" src="/images/produtora/beleza/alletto-still/1.webp" fill sizes="(max-width: 768px) 100vw, 25vw" quality={80} loading="lazy" className="object-cover" />
                            <div className="project-overlay">
                                <span>Set Design</span>
                                <h4>Alletto Still</h4>
                            </div>
                        </Link>
                        <Link className="gallery-column project-item group" href="/portfolio-produtora/signus-versolato02">
                            <Image alt="Signus - Versolato 02" src="/images/produtora/acessorios/signus-versolato02/1.webp" fill sizes="(max-width: 768px) 100vw, 25vw" quality={80} loading="lazy" className="object-cover" />
                            <div className="project-overlay">
                                <span>Direção Criativa</span>
                                <h4>Signus - Versolato 02</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link className="group relative px-12 py-4 border-[0.5px] border-black/30 text-black text-button hover:bg-black hover:text-white transition-all duration-500" href="/portfolio-produtora">
                            {t('see_all_portfolio')}
                        </Link>
                    </div>
                </section>
                {/* Section 3: Conceitos em Colunas */}
                <section className="relative bg-zinc-50/50 px-12 overflow-hidden py-32">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/4 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm">
                                <Image alt="B&W production set" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-xLyiPsyfV2aUDjj4bLVN-3PR3HTgwb2sBZ2lNLOnRCx5P32jkgh8ax5ZPBG1rbNGZv4_Z-SbpotTgPOzOyPI4yxtxOO9cQDxh4T1a5XqIyeGGIWyVItbLrFI9bHo0SMNos-LC-NwPVMpqExEbiVz8H_jbGSpE2m8WK3FlOJZC4OmovBhNVqgta-wv3V9oN9cGfrZ_LWx1Cn9gD0JTHjmCxn-uVL5ipKqjmTIRT1N5FlL1eCVuUq4PGege9Tjt5mdnWfhkxSsidA" fill sizes="(max-width: 1024px) 100vw, 25vw" quality={80} loading="lazy" className="object-cover" />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">{t('concept_1_title')}</h3>
                                        <p className="text-caption text-zinc-500">{t('concept_1_desc')}</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">{t('concept_2_title')}</h3>
                                        <p className="text-caption text-zinc-500">{t('concept_2_desc')}</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">{t('concept_3_title')}</h3>
                                        <p className="text-caption text-zinc-500">{t('concept_3_desc')}</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">{t('concept_4_title')}</h3>
                                        <p className="text-caption text-zinc-500">{t('concept_4_desc')}</p>
                                    </div>
                                </div>
                                <div className="max-w-3xl text-left border-t border-zinc-200 pt-10">
                                    <p className="text-h4 text-zinc-800">
                                        {t('concepts_text')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                            {/* STRUCTURE SELECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="text-caption text-zinc-400 mb-6 block">{t('servicos_label')}</span>
                                <h2 className="text-h2 text-white">{t('servicos_titulo')}</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: t('servico_1_title'),
                                        link: "/produtora/moda",
                                        subtitle: t('servico_1_subtitle'),
                                        items: [t('servico_1_item_1'), t('servico_1_item_2'), t('servico_1_item_3')]
                                    },
                                    {
                                        title: t('servico_2_title'),
                                        link: "/produtora/publicidade",
                                        subtitle: t('servico_2_subtitle'),
                                        items: [t('servico_2_item_1'), t('servico_2_item_2'), t('servico_2_item_3')]
                                    },
                                    {
                                        title: t('servico_3_title'),
                                        link: "/produtora/institucional",
                                        subtitle: t('servico_3_subtitle'),
                                        items: [t('servico_3_item_1'), t('servico_3_item_2'), t('servico_3_item_3')]
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined scroll-reveal" data-delay={idx * 150} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.4s ease, box-shadow 0.4s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                        <div>
                                            <h3 className="text-h3 mb-6 group-hover:text-white uppercase">{card.title}</h3>
                                            <p className="text-body text-on-surface-variant mb-12 group-hover:text-white/70">{card.subtitle}</p>
                                            <ul className="space-y-4 mb-12">
                                                {card.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-body text-on-surface-variant group-hover:text-white/80">
                                                        <span className="material-symbols-outlined text-lg">check</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Link href={card.link} className="w-full border border-black py-5 text-button hover:bg-black hover:text-white transition-all duration-500 group-hover:border-white group-hover:text-white text-center block">
                                            {t('learn_more')}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 7: Editorial CTA */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white hmzt-hero-title">
                            {t('cta_titulo')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto border-y border-white/10 py-16">
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">{t('cta_leave_label')}</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40"></span> <span>{t('cta_leave_1')}</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40"></span> <span>{t('cta_leave_2')}</span></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">{t('cta_gain_label')}</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white"></span> <span>{t('cta_gain_1')}</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white"></span> <span>{t('cta_gain_2')}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-10">
                            <button type="button" onClick={() => openForm('final')} className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                {t('cta_btn')}
                            </button>
                            <p className="text-caption text-zinc-500">{t('cta_tagline')}</p>
                        </div>
                    </div>
                </section>

                <BlogSection
                    slugs={[
                        'editorial-moda-narrativa-visual',
                        'editorial-moda-performance-vendas',
                        'producao-executiva-sistema-campanhas',
                        'por-que-campanhas-caras-falham',
                    ]}
                    allLabel={t('blog_see_all')}
                    readLabel={t('blog_read')}
                />

                <ClientLogos />

                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[500px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-bold text-[18vw] tracking-[-0.05em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-40">Depoimentos</span>
                    </div>
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
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <span className="text-caption text-zinc-500 block mb-4">{t('testimonials_label')}</span>
                            <h2 className="text-h2 text-white">{t('testimonials_titulo')}</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1">
                                {testimonials.map((testimonial, i) => (
                                    <div key={i} className={`testimonial-slide ${currentSlide === i ? 'active' : ''}`}>
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">
                                            “{testimonial.text}”
                                        </h3>
                                        <div className="pt-6">
                                            <p className="text-caption text-white/80">{testimonial.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-3 pt-4">
                                {testimonials.map((_, i) => (
                                    <button key={i} className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${currentSlide === i ? 'opacity-100' : 'opacity-30'}`} onClick={() => goToSlide(i)}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FAQ — obrigatório para FAQPage schema ser válido no Rich Results Test */}
            <section className="bg-white py-24 px-8 border-t border-zinc-100">
                <div className="max-w-3xl mx-auto">
                    <p className="font-label uppercase tracking-[0.25em] text-[11px] text-zinc-400 mb-6">{t('faq_label')}</p>
                    <h2 className="font-headline italic text-3xl text-zinc-900 mb-16">{t('faq_titulo')}</h2>
                    <div className="space-y-0">
                        {[
                            { q: t('faq_1_q'), a: t('faq_1_a') },
                            { q: t('faq_2_q'), a: t('faq_2_a') },
                            { q: t('faq_3_q'), a: t('faq_3_a') },
                            { q: t('faq_4_q'), a: t('faq_4_a') },
                        ].map(({q, a}, i) => (
                            <details key={i} className="group border-t border-zinc-100 py-6 cursor-pointer">
                                <summary className="flex justify-between items-center list-none font-headline italic text-lg text-zinc-900 gap-4">
                                    {q}
                                    <span className="text-zinc-400 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-2xl leading-none">+</span>
                                </summary>
                                <p className="mt-4 text-[15px] text-zinc-500 font-body leading-[1.8]">{a}</p>
                            </details>
                        ))}
                        <div className="border-t border-zinc-100" />
                    </div>
                </div>
            </section>

            <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
                <div className="flex flex-col items-center text-center">
                    <div className="text-neutral-50 mb-12">
                        <span className="hm-logo" style={{fontSize: '40px'}}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                    </div>
                    <div className="flex space-x-10 mb-16">
                        <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">Instagram</a>
                        <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LinkedIn</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/">Home</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/studio">Studio</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/portfolio">Portfólio</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/blog">Blog</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/contato">Contato</Link>
                    </nav>
                    <div className="text-caption text-neutral-700">
                        {t('footer_copyright')}
                    </div>
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
                    sourceUrl="/produtora"
                    ctaLocation={formCta?.ctaLocation ?? null}
                />
            </FormDrawer>
            <style dangerouslySetInnerHTML={{ __html: `
                .columns-gallery-container {
                    height: 80vh;
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                }
                .gallery-column {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    border-right: 1px solid rgba(0, 0, 0, 0.05);
                }
                .gallery-column:last-child {
                    border-right: none;
                }
                .column-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            `}} />
        </div>
    )
}
