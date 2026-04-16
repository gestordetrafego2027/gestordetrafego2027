'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * GLOBAL HEADER COMPONENT
 * Handles main navigation and fullscreen side menu overlay
 * 
 * @param {string} variant - 'light' (white bg, black text) or 'dark' (transparent bg, white text)
 */
export default function Header({ variant = 'dark' }) {
    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    const toggleMenu = (open) => {
        setSideMenuOpen(open);
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const isLightVariant = variant === 'light';
    const textColor = isLightVariant ? '#000000' : '#ffffff';
    const bgColor = isLightVariant ? '#ffffff' : 'transparent';
    const borderColor = isLightVariant ? '#e0e0e0' : 'transparent';

    return (
        <>
            <header 
                className="fixed top-0 w-full flex justify-between items-center px-12 py-10 z-[100] transition-colors duration-300"
                style={{ backgroundColor: bgColor, borderBottom: isLightVariant ? `0.5px solid ${borderColor}` : 'none' }}
            >
                <Link 
                    href="/" 
                    className="text-lg font-serif tracking-tight uppercase font-headline no-underline"
                    style={{ color: textColor }}
                >
                    House Mazzutti
                </Link>

                <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12">
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={{ color: textColor }} href="/">HOME</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={{ color: textColor }} href="/about">SOBRE</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={{ color: textColor }} href="/studio">STUDIO</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={{ color: textColor }} href="/produtora">PRODUTORA</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={{ color: textColor }} href="/agencia">AGÊNCIA</Link>
                </nav>

                <div className="flex items-center space-x-6" style={{ color: textColor }}>
                    <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform">
                        <span className="material-symbols-outlined" data-icon="search">search</span>
                    </button>
                    
                    {/* ANIMATED HAMBURGER */}
                    <button
                        onClick={() => toggleMenu(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            position: 'relative',
                            width: '36px',
                            height: '36px'
                        }}
                        onMouseEnter={e => {
                            const spans = e.currentTarget.querySelectorAll('span');
                            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                            spans[1].style.opacity = '0';
                            spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
                        }}
                        onMouseLeave={e => {
                            const spans = e.currentTarget.querySelectorAll('span');
                            spans[0].style.transform = 'none';
                            spans[1].style.opacity = '1';
                            spans[2].style.transform = 'none';
                        }}
                    >
                        <span className="block w-full h-[1px] mb-2 transition-transform duration-300" style={{ backgroundColor: textColor }}></span>
                        <span className="block w-full h-[1px] mb-2 transition-opacity duration-300" style={{ backgroundColor: textColor }}></span>
                        <span className="block w-full h-[1px] transition-transform duration-300" style={{ backgroundColor: textColor }}></span>
                    </button>
                </div>
            </header>

            {/* FULLSCREEN SIDE MENU OVERLAY */}
            <div 
                className={`fixed inset-0 z-[200] transition-opacity duration-500 ${sideMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                onClick={() => toggleMenu(false)}
            >
                <div 
                    className={`absolute inset-y-0 right-0 w-full max-w-[320px] md:w-[25vw] bg-[#0a0a0a] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col p-16 ${sideMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={e => e.stopPropagation()}
                >
                    {/* CLOSE BUTTON */}
                    <button 
                        onClick={() => toggleMenu(false)}
                        className="absolute top-10 right-10 text-white hover:opacity-50 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-4xl font-light">close</span>
                    </button>

                    {/* BRANDING */}
                    <div className="mb-16">
                        <span className="text-white font-serif italic text-xl tracking-tight uppercase">HMZT</span>
                    </div>

                    {/* NAVIGATION LINKS */}
                    <nav className="flex flex-col space-y-3 mb-auto">
                        {[
                            { name: 'HOME', href: '/' },
                            { name: 'SOBRE', href: '/about' },
                            { name: 'STUDIO', href: '/studio' },
                            { name: 'PRODUTORA', href: '/produtora' },
                            { name: 'AGÊNCIA', href: '/agencia' },
                            { name: 'ANGELO', href: '/angelo' },
                            { name: 'COMUNIDADE', href: '/comunidade' },
                            { name: 'PORTFÓLIO', href: '/portfolio' },
                            { name: 'BLOG', href: '/blog' },
                            { name: 'CONTATO', href: '/contato' }
                        ].map((link, idx) => (
                            <Link 
                                key={idx}
                                href={link.href}
                                onClick={() => toggleMenu(false)}
                                className="text-white font-raleway uppercase tracking-[0.2em] text-[13px] font-light no-underline hover:underline"
                                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* FOOTER INFO */}
                    <div className="mt-auto pt-16 border-t border-white/10 space-y-8">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] font-light text-neutral-500 mb-4">FOLLOW US</p>
                            <div className="flex space-x-6">
                                <a href="#" className="text-white text-[10px] uppercase tracking-[0.2em] font-light hover:opacity-50 transition-opacity">Instagram</a>
                                <a href="#" className="text-white text-[10px] uppercase tracking-[0.2em] font-light hover:opacity-50 transition-opacity">LinkedIn</a>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[10px] font-light text-neutral-400">SAO PAULO / BRASIL</p>
                            <p className="text-[9px] font-light text-neutral-600">© 2025 HOUSE MAZZUTTI</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .font-raleway { font-family: var(--font-raleway), sans-serif; }
                .font-headline { font-family: var(--font-newsreader), serif; }
            `}</style>
        </>
    );
}
