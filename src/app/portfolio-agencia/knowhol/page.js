'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';
import PortfolioCTA from '@/app/components/PortfolioCTA';

export default function KnowholPage() {
    const [selectedImg, setSelectedImg] = useState(null)
    const openImg = (src) => { setSelectedImg(src); document.body.style.overflow = 'hidden'; const h = document.querySelector('header'); if(h) h.style.display = 'none'; }
    const closeImg = () => { setSelectedImg(null); document.body.style.overflow = ''; const h = document.querySelector('header'); if(h) h.style.display = ''; }

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
        
        const handleScroll = () => {
            targetY = Math.max(0, window.scrollY * 0.5);
        };

        window.addEventListener('scroll', handleScroll);
        
        let animationFrameId;
        function animate() {
            currentY += (targetY - currentY) * 0.08;
            if (infoCol) infoCol.style.transform = `translateY(${currentY}px)`;
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const verticalImages = [
        "/images/agencia/knowhol/2.jpg",
        "/images/agencia/knowhol/3.jpg",
        "/images/agencia/knowhol/4.jpg",
        "/images/agencia/knowhol/5.jpg"
    ];

    const horizontalImages = [
        "/images/agencia/knowhol/1.jpg"
    ];

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
                            <div key={i} className="image-anim relative overflow-hidden group cursor-pointer" onClick={() => openImg(src)} style={{maxHeight:'600px'}}>
                                <Image alt="vertical" src={src} style={{maxHeight:'600px'}} fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover transition-all duration-700" />
                            </div>
                        ))}
                        {horizontalImages.map((src, i) => (
                            <div key={i} className="image-anim relative overflow-hidden group cursor-pointer" onClick={() => openImg(src)}>
                                <Image alt="horizontal" src={src} style={{aspectRatio:'16/9', objectFit:'cover'}} fill sizes="100vw" quality={80} loading="lazy" className="w-full transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                    
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Branding e Identidade Visual</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">Knowhol</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">
                                "Conhecimento como matéria-prima. Forma como consequência."
                            </p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p>
                                    <p className="font-inter text-sm font-medium">Agência</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Autor</p>
                                    <p className="font-inter text-sm font-medium">House Mazzutti</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p>
                                    <p className="font-inter text-sm font-medium">2026</p>
                                </div>
                            </div>
                            <div className="info-col-anim bg-white/50 p-8 mt-8 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Filosofia da Agência</h3>
                                <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
                                    Knowhol chegou com um produto técnico e uma narrativa difusa. O trabalho foi traduzir densidade em sistema: posicionamento, naming, identidade visual e arquitetura de marca capazes de sustentar autoridade sem perder acessibilidade.
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

            <PortfolioCTA businessUnit="agencia" projectSlug="knowhol" />

            <footer className="bg-[#0a0a0a] px-12 py-8">
                <div className="flex flex-col items-center space-y-6">
                    <Link className="font-newsreader text-xl font-semibold tracking-widest text-white no-underline" href="/">HOUSE MAZZUTTI</Link>
                    <div className="flex space-x-8">
                        <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="#">INSTAGRAM</Link>
                        <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="#">LINKEDIN</Link>
                    </div>
                    <p className="text-[#808080] font-inter text-[10px] tracking-wider">© 2026 House Mazzutti</p>
                </div>
            </footer>
        
            {selectedImg && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={closeImg}>
                    <Image src={selectedImg} fill sizes="100vw" quality={80} loading="lazy" className="max-h-screen max-w-screen object-contain" />
                </div>
            )}
</div>
    );
}
