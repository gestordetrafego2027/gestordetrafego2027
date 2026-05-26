'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';
import PortfolioCTA from '@/app/components/PortfolioCTA';
import PortfolioVideo from '@/app/components/PortfolioVideo';
import YouTubeShort from '@/app/components/YouTubeShort';
import Lightbox from '@/app/components/Lightbox';

export default function SplashBoutiquePage() {
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

    const images = Array.from({length: 6}, (_, i) => `/images/produtora/moda/splash-boutique/${i+1}.webp`);

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
                              <Image alt={`Splash Boutique — Foto ${i+1}`} style={{objectPosition: 'top'}} src={src} width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                            </div>
                          ))}
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Moda</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">Splash Boutique</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">"Cada peça tem uma narrativa. A câmera só a revela."</p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p><p className="font-inter text-sm font-medium">Moda</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Marca</p><p className="font-inter text-sm font-medium">Splash Boutique</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Autor</p><p className="font-inter text-sm font-medium">House Mazzutti</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p><p className="font-inter text-sm font-medium">2026</p></div>
                            </div>
                            <div className="info-col-anim bg-white/50 p-8 mt-8 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Filosofia do estúdio</h3>
                                <p className="font-inter text-xs text-on-surface-variant leading-relaxed">Produção editorial para Splash Boutique — direção de imagem e captação de vídeo com padrão de campanha. Cada frame traduz o universo da marca com consistência visual.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="px-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center border-t border-outline-variant/15 pt-12">
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors" href="/portfolio-produtora/idrissi">
                        <span className="material-symbols-outlined text-sm">west</span>
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Idrissi</span>
                    </Link>
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors text-right" href="/portfolio-produtora">
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Ver portfólio</span>
                        <span className="material-symbols-outlined text-sm">east</span>
                    </Link>
                </div>
            </div>

            <PortfolioVideo unit="produtora" slug="splash-boutique" />

            <YouTubeShort urls="https://youtube.com/shorts/crXyeOvnOQQ?feature=share" />

            <PortfolioCTA businessUnit="produtora" projectSlug="splash-boutique" />

            <footer className="bg-[#0a0a0a] px-12 py-8">
                <div className="flex flex-col items-center space-y-6">
                    <Link className="font-newsreader text-xl font-semibold tracking-widest text-white no-underline" href="/">HOUSE MAZZUTTI</Link>
                    <div className="flex space-x-8">
                        <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">INSTAGRAM</Link>
                        <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LINKEDIN</Link>
                    </div>
                    <p className="text-[#808080] font-inter text-[10px] tracking-wider">© 2026 House Mazzutti</p>
                </div>
            </footer>

            <Lightbox images={images} idx={lightboxIdx} onClose={closeImg} onNav={setLightboxIdx} />
        </div>
    );
}
