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

export default function BarbaraPortoPage() {
    const [lightboxIdx, setLightboxIdx] = useState(null)
    const openImg = (idx) => { setLightboxIdx(idx); document.body.style.overflow = 'hidden'; const h = document.querySelector('header'); if(h) h.style.display = 'none'; }
    const closeImg = () => { setLightboxIdx(null); document.body.style.overflow = ''; const h = document.querySelector('header'); if(h) h.style.display = ''; }

    const images = Array.from({length: 8}, (_, i) => `/images/produtora/acessorios/barbara-porto/${i+1}.webp`);

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

        window.addEventListener('scroll', handleScroll, { passive: true });
        
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
                  object-fit: contain;
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
                        <div className="grid grid-cols-2 gap-3">
                          <div onClick={() => openImg(0)} className="cursor-pointer">
                            <Image alt="Foto 1" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/1.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(1)} className="cursor-pointer">
                            <Image alt="Foto 2" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/2.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(2)} className="cursor-pointer">
                            <Image alt="Foto 3" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/3.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(3)} className="cursor-pointer">
                            <Image alt="Foto 4" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/4.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(4)} className="cursor-pointer">
                            <Image alt="Foto 5" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/5.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(5)} className="cursor-pointer">
                            <Image alt="Foto 6" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/6.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(6)} className="cursor-pointer">
                            <Image alt="Foto 7" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/7.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(7)} className="cursor-pointer">
                            <Image alt="Foto 8" style={{objectPosition: 'top'}} src="/images/produtora/acessorios/barbara-porto/8.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                        </div>
                    </div>
                    {/* Content Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Acessórios</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">Barbara Porto</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">
                                "Acessório vive — ou morre — pela imagem."
                            </p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p>
                                    <p className="font-inter text-sm font-medium">PRODUTORA / EDITORIAL DE MODA</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-sm font-medium">House Mazzutti</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p>
                                    <p className="font-inter text-sm font-medium">2023</p>
                                </div>
                                <div className="h-px w-full bg-outline-variant/10"></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Produção Executiva</p><p className="font-inter text-sm font-medium">Angelo Mazzutti &amp; Mateus Sacavem</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Fotografia</p><p className="font-inter text-sm font-medium">Ita Mazzutti</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Vídeo</p><p className="font-inter text-sm font-medium">Lucas Brando</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Beauty</p><p className="font-inter text-sm font-medium">Nathan</p></div>
                                <div className="info-col-anim flex flex-col"><p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Modelos</p><p className="font-inter text-sm font-medium">Barbara Porto &amp; Talita Dalbó</p></div>
                            </div>
                            
                    </div>
                </div>
            </main>
            
            <PortfolioVideo unit="produtora" slug="barbara-porto" />

            <YouTubeShort urls="https://youtube.com/shorts/YbQQLxWJf_s?feature=share" />

            <PortfolioCTA businessUnit="produtora" projectSlug="barbara-porto" />

            {/* Navigation Links before footer */}
            <div className="px-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center border-t border-outline-variant/15 pt-12">
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors" href="/portfolio-produtora">
                        <span className="material-symbols-outlined text-sm">west</span>
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Projeto Anterior</span>
                    </Link>
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors text-right" href="/portfolio-produtora">
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Próximo Projeto</span>
                        <span className="material-symbols-outlined text-sm">east</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <SiteFooter />

            <Lightbox images={images} idx={lightboxIdx} onClose={closeImg} onNav={setLightboxIdx} />
        </div>
    );
}
