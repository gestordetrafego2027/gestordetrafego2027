'use client'

import React, { useEffect, useState } from 'react';
import SiteFooter from '@/app/components/SiteFooter';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';
import PortfolioCTA from '@/app/components/PortfolioCTA';
import Lightbox from '@/app/components/Lightbox';

export default function AllettoPage() {
    const [lightboxIdx, setLightboxIdx] = useState(null)
    const openImg = (idx) => { setLightboxIdx(idx); document.body.style.overflow = 'hidden'; const h = document.querySelector('header'); if(h) h.style.display = 'none'; }
    const closeImg = () => { setLightboxIdx(null); document.body.style.overflow = ''; const h = document.querySelector('header'); if(h) h.style.display = ''; }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if(e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".info-col-anim, .image-anim").forEach(el => observer.observe(el));

        const infoCol = document.querySelector('.info-col');
        let currentY = 0;
        let targetY = 0;
        let animationFrameId;

        const handleScroll = () => {
            targetY = Math.max(0, window.scrollY * 0.5);
        };

        function animate() {
            currentY += (targetY - currentY) * 0.08;
            if (infoCol) infoCol.style.transform = `translateY(${currentY}px)`;
            animationFrameId = requestAnimationFrame(animate);
        }

        function startParallax() {
            currentY = 0;
            targetY = 0;
            window.addEventListener('scroll', handleScroll, { passive: true });
            animate();
        }

        function stopParallax() {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = undefined; }
            if (infoCol) infoCol.style.transform = 'none';
        }

        const mq = window.matchMedia('(min-width: 1024px)');
        if (mq.matches) {
            startParallax();
        } else {
            if (infoCol) infoCol.style.transform = 'none';
        }

        const handleMqChange = (e) => {
            if (e.matches) { startParallax(); } else { stopParallax(); }
        };
        mq.addEventListener('change', handleMqChange);

        return () => {
            observer.disconnect();
            stopParallax();
            mq.removeEventListener('change', handleMqChange);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Anúncios feed (formato quadrado/vertical — 1:1 ou 4:5)
    const feedAds = [
        "/images/agencia/alletto/1.webp",
        "/images/agencia/alletto/2.webp",
        "/images/agencia/alletto/3.webp",
        "/images/agencia/alletto/4.webp",
        "/images/agencia/alletto/8.webp",
        "/images/agencia/alletto/10.webp",
        "/images/agencia/alletto/11.webp",
        "/images/agencia/alletto/12.webp",
    ];

    // Anúncios full-page / lâminas (horizontal)
    const pageAds = [
        "/images/agencia/alletto/5.webp",
        "/images/agencia/alletto/6.webp",
        "/images/agencia/alletto/7.webp",
        "/images/agencia/alletto/9.webp",
    ];

    const images = [...feedAds, ...pageAds];

    return (
        <div className="bg-surface text-on-surface antialiased">
            <style dangerouslySetInnerHTML={{__html: `
                body { font-family: 'Inter', sans-serif; background-color: #f9f9f9; }
                .font-newsreader { font-family: 'Newsreader', serif; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .info-col-anim, .image-anim { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .info-col-anim.visible, .image-anim.visible { opacity: 1; transform: translateY(0); }
                .info-col {
                  position: relative;
                  transition: transform 0.15s ease-out;
                  will-change: transform;
                  padding-top: 80px;
                }
                .ad-grid-2 {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 12px;
                }
                @media (max-width: 640px) {
                  .ad-grid-2 { grid-template-columns: 1fr; }
                }
            `}} />

            <Header />
            <style>{`
              header { background: #fff !important; border-bottom: 0.5px solid #e0e0e0 !important; }
              header a, header div, header span { color: #000 !important; }
            `}</style>

            <main className="pt-16 pb-24 px-8 max-w-[1600px] mx-auto" style={{ paddingTop: '80px' }}>
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* COLUNA DE IMAGENS */}
                    <div className="lg:w-2/3 flex flex-col gap-8">

                        {/* Grid 2 colunas — anúncios feed */}
                        <div className="ad-grid-2">
                            {feedAds.map((src, i) => (
                                <div
                                    key={i}
                                    className="image-anim relative overflow-hidden group cursor-pointer bg-white"
                                    style={{ aspectRatio: '1/1' }}
                                    onClick={() => openImg(i)}
                                >
                                    <Image
                                        alt={`Alletto Skinlab — anúncio ${i + 1}`}
                                        src={src}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        quality={85}
                                        loading={i < 4 ? 'eager' : 'lazy'}
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Lâminas full-width */}
                        {pageAds.map((src, i) => (
                            <div
                                key={i}
                                className="image-anim relative overflow-hidden group cursor-pointer bg-white"
                                style={{ aspectRatio: '4/5' }}
                                onClick={() => openImg(feedAds.length + i)}
                            >
                                <Image
                                    alt={`Alletto Skinlab — criativo ${i + 1}`}
                                    src={src}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                    quality={85}
                                    loading="lazy"
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        ))}
                    </div>

                    {/* COLUNA DE INFORMAÇÕES */}
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                    Gestão de Tráfego &amp; Criação de Anúncios
                                </p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">
                                    Alletto
                                </h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">
                                "Skincare que faz sentido — ativos que entregam, visuais que convencem."
                            </p>

                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p>
                                    <p className="font-inter text-sm font-medium">Agência — Criação &amp; Tráfego</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Segmento</p>
                                    <p className="font-inter text-sm font-medium">Beleza · Skincare · Clean Beauty</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p>
                                    <p className="font-inter text-sm font-medium">2026</p>
                                </div>
                            </div>

                            <div className="info-col-anim bg-white/50 p-8 mt-8 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Sobre este trabalho</h3>
                                <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
                                    Alletto Skinlab é uma marca de skincare com foco em ativos funcionais e apelo clean. O trabalho da Agência envolveu criação de criativos para tráfego pago — feeds, stories e lâminas — com linguagem minimalista, hierarquia visual clara e copy orientada à conversão. Cada peça traduz o posicionamento da marca: ciência sem ruído, beleza sem exagero.
                                </p>
                            </div>

                            <div className="info-col-anim bg-white/50 p-8 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Escopo</h3>
                                <ul className="font-inter text-xs text-on-surface-variant leading-relaxed space-y-2">
                                    <li>— Criação de anúncios para Meta Ads</li>
                                    <li>— Criativos para feed e stories</li>
                                    <li>— Direção de arte e copywriting</li>
                                    <li>— Gestão de tráfego pago</li>
                                    <li>— Identidade visual das campanhas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="px-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center border-t border-outline-variant/15 pt-12">
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors" href="/portfolio-agencia">
                        <span className="material-symbols-outlined text-sm">west</span>
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Voltar ao Portfólio</span>
                    </Link>
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors text-right" href="/portfolio-agencia">
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Ver todos os projetos</span>
                        <span className="material-symbols-outlined text-sm">east</span>
                    </Link>
                </div>
            </div>

            <PortfolioCTA businessUnit="agencia" projectSlug="alletto" />

            <SiteFooter />

            <Lightbox images={images} idx={lightboxIdx} onClose={closeImg} onNav={setLightboxIdx} />
        </div>
    );
}
