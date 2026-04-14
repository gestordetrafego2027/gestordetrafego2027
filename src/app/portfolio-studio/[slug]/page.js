'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function ProjetoStudioPage() {
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

            <header className="static w-full bg-transparent" style={{borderBottom: '0.5px solid #e0e0e0'}}>
                <nav className="flex justify-between items-center w-full px-8 py-6 max-w-full">
                    <Link className="font-newsreader text-xl font-semibold tracking-widest text-black no-underline" href="/">HOUSE MAZZUTTI</Link>
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/">HOME</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/about">SOBRE</Link>
                        <Link className="text-black border-b border-black pb-1 font-inter text-[10px] uppercase tracking-[0.1em]" href="/studio">STUDIO</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/produtora">PRODUTORA</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/agencia">AGÊNCIA</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/angelo">ANGELO</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/comunidade">COMUNIDADE</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/blog">BLOG</Link>
                        <Link className="text-black hover:opacity-70 transition-opacity font-inter text-[10px] uppercase tracking-[0.1em]" href="/contato">CONTATO</Link>
                    </div>
                    <div className="lg:hidden">
                        <span className="material-symbols-outlined text-black">menu</span>
                    </div>
                </nav>
            </header>

            <main className="pt-16 pb-24 px-8 max-w-[1600px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Grid Layout */}
                    <div className="lg:w-2/3">
                        <div className="images-grid">
                            <div className="relative overflow-hidden group">
                                <img alt="Architectural detail" className="grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAVU5IcLwEy2U0gDo52S417SIZIkTqBpRKp-umWW21jk_P2A-CiMGM96C56TQqRq1V87ae0u-SZ8rRgG7oeLJmHfpDQHmhkf6hiDMTUxImdbm42MBoJZdr8uZBcs5FyiZ6Z-Tl5vsOdmxMaiDuysypUDYoTvOOkt4O-CH6a1JSyL9zD9hOtdCO_KhRQE2-3IwzTsB_atS76_2Yh24aObNroL_ah-dPlUh9Dv003teuBMxcZ_FNC3Xz6AdsKmTacsBWbFDp20Y7Wsc"/>
                            </div>
                            <div className="relative overflow-hidden group">
                                <img alt="Portrait sculpture" className="grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoa7wVF9sDY_bVRgCbXawPmvrvjcan0epMoLbqhxiQjfZsIL26H7dQQTvm55i2feaDrrNk3K-JeCVHknR0ufxTVA27ahMsTu3H1kVGeiqLUO_I7rVIQ_E9uQcE9anpdsElbkIzhApw_ViKPv1VWEl6fPs7tzEliwICc0u7M_neiUVT62UgncBv8BdgJkg60-tYrZa8_IXi2V0fvZ5GlAK4Dqrg6K6XI0BJH_4FRvRjpm1Bf73kIuJgDxPBWor1XS8VaAU9TZLSF4s"/>
                            </div>
                            <div className="relative overflow-hidden group">
                                <img alt="Close up texture hand" className="grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCYgrLvUftwbIxYONAg4GDj_g11IpwqxMUA0WPkr20r6T_qusAS6uQs4lBQQMKZ2Gy367x85gsxFa2W0_94Gwrhco5_DvHwadS7Fg9IqTQXSWKWTXugk9h4u1qn7ueDjisGWDLfIdwPXoqGBRsZwszaTdwQn8vokhg5NYTQ8czrMt5ke5CgkXYhU_hdqloBtiPJZ7z2kB7tCKUWyzBk4MVPGxqP3or5ake9fZdUWUgt7Fzh3wgTB5gBUz-9L8exZch1FFwsiygJrg"/>
                            </div>
                            <div className="relative overflow-hidden group">
                                <img alt="Spiral staircase" className="grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDWq23mfl1pQgRbban0OaoOKLTt25CIn3zM4JuOlLaylmxJxNOFyKO4F1RoloLCkCzNbNrK9OyTClkpn8ghhBZ5kObv4hU6GZxe2o8ZloSqKHSmvbNaSnrp4_liMCZ50FnB0KmSPmjMAKshykmB1aYEOnLBZs-MJ8R8pD39Yn_or-F5YawxWxuoNVLoOhkv_kkISKorvUlrMTLa4K_g0zhQSgs-Sf-xHdIn0JFEdukphuhuxa6ur3Q1qqckUkGyJSAuzuHtJMiuJM"/>
                            </div>
                        </div>
                    </div>
                    {/* Content Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="info-col flex flex-col gap-[16px]">
                            <div className="space-y-1">
                                <p className="info-col-anim font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Direção de Imagem</p>
                                <h1 className="info-col-anim font-newsreader text-6xl font-light -tracking-[0.02em] leading-tight text-on-surface">Projeto Essência</h1>
                            </div>
                            <div className="h-px w-12 bg-outline-variant/30"></div>
                            <p className="info-col-anim font-newsreader text-2xl italic leading-relaxed text-on-surface-variant">
                                "Nada foi feito para parecer. Foi feito para sustentar."
                            </p>
                            <div className="space-y-[16px] pt-4">
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Categoria</p>
                                    <p className="font-inter text-sm font-medium">Studio</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Autor</p>
                                    <p className="font-inter text-sm font-medium">House Mazzutti</p>
                                </div>
                                <div className="info-col-anim flex flex-col">
                                    <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-outline-variant mb-1">Ano</p>
                                    <p className="font-inter text-sm font-medium">2025</p>
                                </div>
                            </div>
                            <div className="info-col-anim bg-white/50 p-8 mt-8 border border-outline-variant/10">
                                <h3 className="font-newsreader text-xl mb-4">Filosofia do Studio</h3>
                                <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
                                    Exploramos a verdade dos materiais e a pureza da forma. No Studio House Mazzutti, cada imagem é uma curadoria de intenções, onde o silêncio visual fala mais alto que o ruído digital.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Navigation Links before footer */}
            <div className="px-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center border-t border-outline-variant/15 pt-12">
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors" href="#">
                        <span className="material-symbols-outlined text-sm">west</span>
                        <span className="font-inter text-[9px] uppercase tracking-[0.2em]">Projeto Anterior</span>
                    </Link>
                    <Link className="group flex items-center space-x-4 text-on-surface-variant hover:text-black transition-colors text-right" href="#">
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
                        <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="#">INSTAGRAM</Link>
                        <Link className="text-white font-inter text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" href="#">LINKEDIN</Link>
                    </div>
                    <p className="text-[#808080] font-inter text-[10px] tracking-wider">© 2025 House Mazzutti</p>
                </div>
            </footer>
        </div>
    );
}
