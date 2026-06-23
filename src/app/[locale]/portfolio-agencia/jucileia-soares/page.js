'use client'

import React, { useEffect, useState } from 'react';
import SiteFooter from '@/app/components/SiteFooter';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';
import PortfolioCTA from '@/app/components/PortfolioCTA';
import PortfolioVideo from '@/app/components/PortfolioVideo';
import Lightbox from '@/app/components/Lightbox';

export default function JucileiaSoaresPage() {
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
        };
    }, []);

    const verticalImages = [
        "/images/agencia/jucileia-soares/jucileia-soares-branding-identidade-visual-house-mazzutti-agencia-01.webp",
        "/images/agencia/jucileia-soares/jucileia-soares-branding-identidade-visual-house-mazzutti-agencia-04.webp"
    ];

    const horizontalImages = [
        "/images/agencia/jucileia-soares/jucileia-soares-branding-identidade-visual-house-mazzutti-agencia-05.webp",
        "/images/agencia/jucileia-soares/jucileia-soares-branding-identidade-visual-house-mazzutti-agencia-06.webp"
    ];

    const images = [...verticalImages, ...horizontalImages];

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
            `}} />

            <Header />
            <style>{`
              header { background: #fff !important; border-bottom: 0.5px solid #e0e0e0 !important; }
              header a, header div, header span { color: #000 !important; }
            `}</style>

            <main className="pt-16 pb-24 px-8 max-w-[1600px] mx-auto" style={{ paddingTop: '80px' }}>
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3 flex flex-col gap-8">
                        {verticalImages.map((src, i) => (
                            <div key={i} className="image-anim relative overflow-hidden group cursor-pointer" onClick={() => openImg(i)} style={{height:'600px'}}>
                                <Image alt="Jucileia Soares — branding House Mazzutti" src={src} fill sizes="(max-width: 768px) 100vw, 66vw" quality={i===0?85:80} loading={i===0?undefined:"lazy"} priority={i===0?true:undefined} className="w-full h-full object-cover transition-all duration-700" />
                            </div>
                        ))}
                        {horizontalImages.map((src, i) => (
                            <div key={i} className="image-anim relative overflow-hidden group cursor-pointer" onClick={() => openImg(verticalImages.length + i)} style={{aspectRatio:'16/9'}}>
                                <Image alt="Jucileia Soares — identidade visual House Mazzutti" src={src} fill sizes="100vw" quality={80} loading={verticalImages.length===0 && i===0 ? undefined : "lazy"} priority={verticalImages.length===0 && i===0 ? true : undefined} className="object-cover w-full transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                    
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Branding e Identidade Visual</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">Jucileia Soares</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">
                                &quot;Estilo é o que permanece quando o excesso vai embora.&quot;
                            </p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p>
                                    <p className="font-inter text-sm font-medium">Agência</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p>
                                    <p className="font-inter text-sm font-medium">2026</p>
                                </div>
                            </div>
                            <div className="info-col-anim bg-white/50 p-8 mt-8 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Filosofia da Agência</h3>
                                <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
                                    Jucileia Soares queria uma marca tão cuidada quanto o que ela veste. Criamos uma identidade de tom editorial — minimalista, elegante e atemporal — aplicada do logotipo às peças e mockups, com uma linguagem que valoriza a presença e deixa o produto respirar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <div className="px-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center border-t border-outline-variant/15 pt-12">
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors" href="/portfolio-agencia">
                        <span className="material-symbols-outlined text-sm">west</span>
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Projeto Anterior</span>
                    </Link>
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors text-right" href="/portfolio-agencia">
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Próximo Projeto</span>
                        <span className="material-symbols-outlined text-sm">east</span>
                    </Link>
                </div>
            </div>

            <PortfolioVideo unit="agencia" slug="jucileia-soares" />

            <PortfolioCTA businessUnit="agencia" projectSlug="jucileia-soares" />

            <SiteFooter />
        
            <Lightbox images={images} idx={lightboxIdx} onClose={closeImg} onNav={setLightboxIdx} />
</div>
    );
}
