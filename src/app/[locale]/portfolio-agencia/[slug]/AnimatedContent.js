'use client'

import React, { useEffect } from 'react';
import SiteFooter from '@/app/components/SiteFooter';
import { Link } from '@/i18n/navigation';
import Header from '@/app/components/Header';
import PortfolioCTA from '@/app/components/PortfolioCTA';

export default function AnimatedContent() {
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
        };
    }, []);

    return (
        <div className="bg-surface text-on-surface antialiased">
            <style dangerouslySetInnerHTML={{__html: `
                body { font-family: 'Inter', sans-serif; background-color: #f9f9f9; }
                .font-newsreader { font-family: 'Newsreader', serif; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .info-col-anim { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .info-col-anim.visible { opacity: 1; transform: translateY(0); }
                
                .images-grid {
                  display: grid;
                  grid-template-columns: 55% 45%;
                  grid-template-rows: 55% 45%;
                  gap: 16px;
                  width: 100%;
                  aspect-ratio: 1/1;
                }
                .images-grid img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  display: block;
                }

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
                    {/* Grid Layout */}
                    <div className="lg:w-2/3">
                        <div className="images-grid">
                            <div className="relative overflow-hidden group">
                                <img fetchpriority="high" alt="House Mazzutti — Agência" className="transition-all duration-700" src="/images/agencia/house-mazzutti/1.webp"/>
                            </div>
                            <div className="relative overflow-hidden group">
                                <img loading="lazy" alt="House Mazzutti — Agência" className="transition-all duration-700" src="/images/agencia/house-mazzutti/2.webp"/>
                            </div>
                            <div className="relative overflow-hidden group">
                                <img loading="lazy" alt="House Mazzutti — Agência" className="transition-all duration-700" src="/images/agencia/house-mazzutti/3.webp"/>
                            </div>
                            <div className="relative overflow-hidden group">
                                <img loading="lazy" alt="House Mazzutti — Agência" className="transition-all duration-700" src="/images/agencia/house-mazzutti/4.webp"/>
                            </div>
                        </div>
                    </div>
                    {/* Content Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Direção de Imagem</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">Projeto Agência</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">
                                "Cada projeto é uma resposta. A uma pergunta que vem antes."
                            </p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p>
                                    <p className="font-inter text-sm font-medium">Agência</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p>
                                    <p className="font-inter text-sm font-medium">2025</p>
                                </div>
                            </div>
                            <div className="info-col-anim bg-white/50 p-8 mt-8 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Filosofia da Agência</h3>
                                <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
                                    A maioria das marcas erra no ponto mais importante: começa executando sem definir. Sem clareza, não existe consistência. É aqui que a Agência atua.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <PortfolioCTA businessUnit="agencia" />

            {/* Navigation Links before footer */}
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

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
