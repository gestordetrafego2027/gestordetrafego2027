'use client'

import React, { useEffect, useState } from 'react';
import SiteFooter from '@/app/components/SiteFooter';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';
import PortfolioCTA from '@/app/components/PortfolioCTA';
import PortfolioVideo from '@/app/components/PortfolioVideo';
import YouTubeShort from '@/app/components/YouTubeShort';
import Lightbox from '@/app/components/Lightbox';

export default function BeatCo2Page() {
    const [lightboxIdx, setLightboxIdx] = useState(null)
    const openImg = (idx) => { setLightboxIdx(idx); document.body.style.overflow = 'hidden'; const h = document.querySelector('header'); if(h) h.style.display = 'none'; }
    const closeImg = () => { setLightboxIdx(null); document.body.style.overflow = ''; const h = document.querySelector('header'); if(h) h.style.display = ''; }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if(e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".info-col-anim").forEach(el => observer.observe(el));

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

    const images = Array.from({length: 6}, (_, i) => `/images/produtora/moda/beatco-2/${i+1}.webp`);

    return (
        <div className="bg-surface text-on-surface antialiased">
            <style dangerouslySetInnerHTML={{__html: `
                body { font-family: 'Inter', sans-serif; background-color: #f9f9f9; }
                .font-newsreader { font-family: 'Newsreader', serif; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .info-col-anim { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .info-col-anim.visible { opacity: 1; transform: translateY(0); }
                .info-col { position: relative; transition: transform 0.15s ease-out; will-change: transform; padding-top: 80px; }
            `}} />
            <Header />
            <style>{`header { background: #fff !important; border-bottom: 0.5px solid #e0e0e0 !important; } header a, header div, header span { color: #000 !important; }`}</style>
            <main className="pt-16 pb-24 px-8 max-w-[1600px] mx-auto" style={{ paddingTop: '80px' }}>
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3">
                        <div className="grid grid-cols-2 gap-3">
                          {images.map((src, i) => (
                            <div key={i} onClick={() => openImg(i)} className="cursor-pointer">
                              <Image alt={`Beat Co 2 — Foto ${i+1}`} style={{objectPosition: 'top'}} src={src} width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                            </div>
                          ))}
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Moda</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">Beat Co 2</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">"Continuidade não é repetição — é o mesmo princípio em uma nova respiração."</p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p><p className="font-inter text-sm font-medium">PRODUTORA / EDITORIAL DE MODA</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Marca</p><p className="font-inter text-sm font-medium">Beat Co</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Modelo</p><p className="font-inter text-sm font-medium">Talita Dalbo</p></div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-sm font-medium">House Mazzutti</p>
                                </div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p><p className="font-inter text-sm font-medium">2025</p></div>
                                <div className="h-px w-full bg-outline-variant/10"></div>
                                <div className="info-col-anim bg-white/50 p-8 mt-4 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Sobre este trabalho</h3>
                                <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
                                    {`Segunda campanha da marca em leitura mais sensorial da coleção — movimento, textura, presença. Quadros que alternam intensidade e calma, elenco, beauty e set em uma só linha narrativa. Banco para mídia editorial, e-commerce, redes próprias e ponto de venda.`}
                                </p>
                                <p className="font-inter text-[10px] italic text-outline-variant leading-relaxed mt-4">
                                    {`Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando`}
                                </p>
                            </div>
                            </div>
                            
                    </div>
                </div>            </div>

            </main>
    
            <div className="px-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center border-t border-outline-variant/15 pt-12">
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors" href="/portfolio-produtora/beatco"><span className="material-symbols-outlined text-sm">west</span><span className="font-inter text-[9px] uppercase tracking-[0.2em]">Beat Co</span></Link>
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors text-right" href="/portfolio-produtora/idrissi"><span className="font-inter text-[9px] uppercase tracking-[0.2em]">Idrissi</span><span className="material-symbols-outlined text-sm">east</span></Link>
                </div>
            </div>
            <PortfolioVideo unit="produtora" slug="beatco-2" />

            <YouTubeShort urls="https://youtube.com/shorts/BpCfu-YxI7s?feature=share" />

            <PortfolioCTA businessUnit="produtora" projectSlug="beatco-2" />

            <SiteFooter />
            <Lightbox images={images} idx={lightboxIdx} onClose={closeImg} onNav={setLightboxIdx} />
        </div>
    );
}
