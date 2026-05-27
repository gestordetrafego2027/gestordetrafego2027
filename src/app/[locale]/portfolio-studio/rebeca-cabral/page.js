'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';
import PortfolioCTA from '@/app/components/PortfolioCTA';
import PortfolioVideo from '@/app/components/PortfolioVideo';
import Lightbox from '@/app/components/Lightbox'

export default function RebecaCabralPage() {
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

    const images = [
      '/images/studio/rebeca-cabral/1.webp',
      '/images/studio/rebeca-cabral/2.webp',
      '/images/studio/rebeca-cabral/3.webp',
      '/images/studio/rebeca-cabral/4.webp',
      '/images/studio/rebeca-cabral/5.webp',
      '/images/studio/rebeca-cabral/6.webp',
    ]

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
                            <Image alt="Rebeca Cabral - Ensaio Pessoal House Mazzutti - Foto 1" style={{objectPosition: 'top'}} src="/images/studio/rebeca-cabral/1.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(1)} className="cursor-pointer">
                            <Image alt="Rebeca Cabral - Ensaio Pessoal House Mazzutti - Foto 2" style={{objectPosition: 'top'}} src="/images/studio/rebeca-cabral/2.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(2)} className="cursor-pointer">
                            <Image alt="Rebeca Cabral - Ensaio Pessoal House Mazzutti - Foto 3" style={{objectPosition: 'top'}} src="/images/studio/rebeca-cabral/3.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(3)} className="cursor-pointer">
                            <Image alt="Rebeca Cabral - Ensaio Pessoal House Mazzutti - Foto 4" style={{objectPosition: 'top'}} src="/images/studio/rebeca-cabral/4.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(4)} className="cursor-pointer">
                            <Image alt="Rebeca Cabral - Ensaio Pessoal House Mazzutti - Foto 5" style={{objectPosition: 'top'}} src="/images/studio/rebeca-cabral/5.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                          <div onClick={() => openImg(5)} className="cursor-pointer">
                            <Image alt="Rebeca Cabral - Ensaio Pessoal House Mazzutti - Foto 6" style={{objectPosition: 'top'}} src="/images/studio/rebeca-cabral/6.webp" width={800} height={1200} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                          </div>
                        </div>
                    </div>
                    {/* Content Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Ensaio Pessoal</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface hmzt-hero-title">Rebeca Cabral</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">
                                "Nada foi feito para parecer. Foi feito para sustentar."
                            </p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p>
                                    <p className="font-inter text-sm font-medium">Ensaio Pessoal</p>
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
                                <h3 className="font-newsreader text-xl mb-4">Filosofia do Studio</h3>
                                <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
                                    Retrato como direção: presença, intenção e tratamento editorial.
                                </p>
                            </div>
                            <div className="info-col-anim bg-white/50 p-8 mt-4 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Sobre este trabalho</h3>
                                <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
                                    {`Mulher de negócios precisa de imagem que sustente autoridade sem rigidez. Para Rebeca Cabral, a House Mazzutti construiu o ensaio Business como ferramenta estratégica — não como retrato corporativo. Angelo Mazzutti dirigiu a sessão a partir de uma leitura editorial da presença executiva contemporânea. Mateus Sacavem coordenou a produção executiva alinhando beauty discreto, luz desenhada e vídeo institucional. O resultado é um banco de imagens que circula em LinkedIn, site, palestra e apresentação de negócios com mesma assinatura — uma imagem adulta, contemporânea, pronta para sustentar a próxima fase de posicionamento profissional.`}
                                </p>
                                <p className="font-inter text-[10px] italic text-outline-variant leading-relaxed mt-4">
                                    {`Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <PortfolioVideo unit="studio" slug="rebeca-cabral" />

            <PortfolioCTA businessUnit="studio" projectSlug="rebeca-cabral" />

            {/* Navigation Links before footer */}
            <div className="px-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center border-t border-outline-variant/15 pt-12">
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors" href="/portfolio-studio">
                        <span className="material-symbols-outlined text-sm">west</span>
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Projeto Anterior</span>
                    </Link>
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors text-right" href="/portfolio-studio">
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Próximo Projeto</span>
                        <span className="material-symbols-outlined text-sm">east</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
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