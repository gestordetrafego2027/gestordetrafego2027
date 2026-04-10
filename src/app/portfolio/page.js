"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

/**
 * PORTFOLIO PAGE - HOUSE MAZZUTTI
 * Full-screen Slider with Scroll/Wheel/Touch interface
 */
export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesCount = 3;
  const animatingRef = useRef(false);

  const updateSlide = useCallback((nextIndex) => {
    if (animatingRef.current) return;

    let targetIndex = nextIndex;
    if (targetIndex >= slidesCount) {
      targetIndex = 0;
    } else if (targetIndex < 0) {
      targetIndex = slidesCount - 1;
    }

    animatingRef.current = true;
    setIsAnimating(true);
    document.body.classList.add("is-animating");

    // 1. Fade out current, wait for transition
    setTimeout(() => {
      setCurrentIndex(targetIndex);

      // 2. Mid-transition delay (overlay visible)
      setTimeout(() => {
        document.body.classList.remove("is-animating");

        // 3. Wait for fade in completion
        setTimeout(() => {
          animatingRef.current = false;
          setIsAnimating(false);
        }, 600);
      }, 300);
    }, 600);
  }, [slidesCount]);

  // Handle Wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (animatingRef.current) return;
      if (Math.abs(e.deltaY) < 10) return;

      if (e.deltaY > 0) {
        updateSlide(currentIndex + 1);
      } else {
        updateSlide(currentIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, updateSlide]);

  // Handle Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (animatingRef.current) return;
      if (e.key === "ArrowDown") {
        updateSlide(currentIndex + 1);
      } else if (e.key === "ArrowUp") {
        updateSlide(currentIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, updateSlide]);

  // Handle Touch
  const touchStartY = useRef(0);
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (animatingRef.current) return;
      const touchEndY = e.touches[0].clientY;
      const delta = touchStartY.current - touchEndY;

      if (delta > 70) {
        updateSlide(currentIndex + 1);
      } else if (delta < -70) {
        updateSlide(currentIndex - 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentIndex, updateSlide]);

  return (
    <div className="page-portfolio selection:bg-black selection:text-white">
      <h1 className="sr-only">Portfólio de Branding Estratégico e Posicionamento de Marca</h1>

      {/* TOP NAV BAR - FULL NAVIGATION */}
      <header className="fixed top-0 w-full flex justify-between items-center px-12 py-10 z-50 bg-transparent">
        <div className="text-lg font-serif tracking-tight text-black uppercase font-headline">
          House Mazzutti
        </div>
        <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12">
          <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/">HOME</Link>
          <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/about">SOBRE</Link>
          <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/studio">STUDIO</Link>
          <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/produtora">PRODUTORA</Link>
          <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/agencia">AGÊNCIA</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/angelo">ANGELO</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/comunidade">COMUNIDADE</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/portfolio">PORTFÓLIO</Link>
          <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/blog">BLOG</Link>
          <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-black hover:opacity-70 transition-opacity duration-300" href="/contato">CONTATO</Link>
        </nav>
        <div className="flex items-center space-x-6 text-black">
          <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform">
            <span className="material-symbols-outlined" data-icon="search">search</span>
          </button>
          <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform flex flex-col space-y-1.5 w-6">
            <span className="block w-full h-[1px] bg-current"></span>
            <span className="block w-full h-[1px] bg-current"></span>
            <span className="block w-full h-[1px] bg-current"></span>
          </button>
        </div>
      </header>

      {/* Transition Overlay */}
      <div id="transition-overlay">
        <div id="transition-line"></div>
      </div>

      <main id="main-slider" className="h-full w-full">
        {/* [SLIDE 1] */}
        <div className={`slide ${currentIndex === 0 ? "active" : ""}`} data-index="0">
          <div className="flex h-full flex-col md:flex-row">
            {/* Left/Top: Image */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-neutral-100 relative overflow-hidden">
              <img
                alt="Portrait"
                className="w-full h-full object-cover grayscale transition-transform duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4KUVLJUL-uxvDKAfn2IfswuESvjVPbRKyIhOr6RAgX-gPHUSbYctz9jhHVRyhrPOvgp_F3f339FTKZ2mhKtmRsw1Or-AmM4LeyBQXQLMRP31QoOgFfQPK3xfhY4RNtunnrYPZC4V9mEPkrfWjBz0iKBMIwvWokt-XYQceqHYBtZErUvjI2khPxLKapxWYqHS0N2VjtMveW4bOeceZhgsr5k3bQ6DOR40hyL8fpJ4kuyCXaGpvOMPgit5ZRt4CcmS9Ua18PsBPgXw"
              />
            </div>
            {/* Right/Bottom: Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex items-center justify-center p-8 md:p-24 overflow-y-auto">
              <div className="max-w-md w-full space-y-[27px]">
                <span className="block text-[9px] uppercase tracking-[0.3em] font-light text-neutral-400">POSICIONAMENTO</span>
                <h2 className="text-[2rem] md:text-[2.75rem] font-body font-light tracking-widest text-black leading-tight">O QUE VOCÊ VÊ É RESULTADO.</h2>
                <p className="font-headline italic text-[1.1rem] md:text-[1.32rem] text-neutral-500 leading-relaxed">"O que sustenta não aparece. Nenhum projeto começa na imagem. Começa no entendimento."</p>
                <div className="fine-line"></div>
                <p className="text-[0.77rem] md:text-[0.88rem] text-neutral-600 tracking-wide font-light">Contexto. Momento. Posicionamento. A estética é consequência.</p>
                <div className="pt-[20px]">
                  <a className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" href="#">
                    VER PROJETOS <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* [SLIDE 2] */}
        <div className={`slide ${currentIndex === 1 ? "active" : ""}`} data-index="1">
          <div className="flex h-full flex-col md:flex-row-reverse">
            {/* Image */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-neutral-100 relative overflow-hidden">
              <img
                alt="Fashion"
                className="w-full h-full object-cover grayscale"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxxCED8XmlkgNbuGiBWOIoL_z8W4KNtk73xn8vQ-iW8GDkkVNi7X1jqkXb6AlWm6RX3cw0DJKVuj64s5VKTwHN4-JRumUk7k1WdMY2xl4wCBNUZM97L1mfESGVn3jK3UxigcDBkEptMRWuiNt9eJwAk9--RWcaUJIgxvPkcjp6XwpOxvSNIzA9LKZ4PXxdt9mmLGG_uMCYlYndBP79YuGkiWMCuzgJDFBDxSMg4BlXyypJqLa3rJCkOY0YCgpUX25kL9KLQuyenBE"
              />
            </div>
            {/* Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex items-center justify-center p-8 md:p-24 overflow-y-auto">
              <div className="max-w-md w-full space-y-[27px]">
                <span className="block text-[9px] uppercase tracking-[0.3em] font-light text-neutral-400">DIREÇÃO CRIATIVA</span>
                <h2 className="text-[2rem] md:text-[2.75rem] font-body font-light tracking-widest text-black leading-tight">O QUE PARECE SIMPLES FOI ESTRUTURADO.</h2>
                <p className="font-headline italic text-[1.1rem] md:text-[1.32rem] text-neutral-500 leading-relaxed">"O que parece natural foi direcionado. Nada aqui é aleatório."</p>
                <div className="fine-line"></div>
                <p className="text-[0.77rem] md:text-[0.88rem] text-neutral-600 tracking-wide font-light">Tudo parte de leitura. Porque imagem sem estratégia não sustenta. E execução sem direção não constrói.</p>
                <div className="pt-[20px]">
                  <a className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" href="#">
                    EXPLORAR PROJETOS <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* [SLIDE 3] */}
        <div className={`slide ${currentIndex === 2 ? "active" : ""}`} data-index="2">
          <div className="flex h-full flex-col md:flex-row">
            {/* Image */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-neutral-100 relative overflow-hidden">
              <img
                alt="Hands"
                className="w-full h-full object-cover grayscale"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9JOvmd61-d55EzR904FOgUgD6XCybSttKhy0e2AuHAcJFi1SIYxiCe0tiIr2GvnpHMiog9GeIBi_w14F-CbUeWoM_knk3_BS8YPNnduZwKZZ0dafgoO95ND97D968qi9tDRQwmL5bsnew3mZb7VpUkAIxCt8wbPRvypRvjcbHp7w9MqqdgMX5Z0dU939Tx5vH0GzHOBwMC-lSn3ZA1ytDq_2yVlpnVme8CsCuDj4cBc63ZO2BrbOQq1tTnWinjn4XJSTR-BUhJKg"
              />
            </div>
            {/* Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex items-center justify-center p-8 md:p-24 overflow-y-auto">
              <div className="max-w-md w-full space-y-[27px]">
                <span className="block text-[9px] uppercase tracking-[0.3em] font-light text-neutral-400">CONSTRUÇÃO</span>
                <h2 className="text-[2rem] md:text-[2.75rem] font-body font-light tracking-widest text-black leading-tight">CADA PROJETO É UMA RESPOSTA.</h2>
                <p className="font-headline italic text-[1.1rem] md:text-[1.32rem] text-neutral-500 leading-relaxed">"A uma pergunta que vem antes: o que essa marca precisa se tornar?"</p>
                <div className="fine-line"></div>
                <p className="text-[0.77rem] md:text-[0.88rem] text-neutral-600 tracking-wide font-light">Branding estratégico, posicionamento de marca e construção de autoridade através da imagem.</p>
                <div className="pt-[20px]">
                  <a className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" href="#">
                    VER COMO APLICAMOS <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Arrows */}
      <div className="fixed bottom-[40px] right-[40px] z-[60] flex flex-col gap-[12px]">
        <button
          aria-label="Anterior"
          className="nav-arrow"
          disabled={currentIndex === 0 || isAnimating}
          onClick={() => updateSlide(currentIndex - 1)}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <button
          aria-label="Próximo"
          className="nav-arrow"
          disabled={isAnimating}
          onClick={() => updateSlide(currentIndex + 1)}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>

      <style jsx global>{`
        body.is-animating {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
