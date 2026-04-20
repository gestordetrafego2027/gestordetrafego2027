// updated
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * GLOBAL HEADER COMPONENT
 * Handles main navigation and fullscreen side menu overlay
 * 
 * @param {string} variant - 'light' (white bg, black text) or 'dark' (transparent bg, white text)
 */
export default function Header({ variant = 'dark' }) {
    const pathname = usePathname();
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const lastScroll = useRef(0);

    useEffect(() => {
        setVisible(true);
        setScrolled(window.scrollY > window.innerHeight * 0.9);
        lastScroll.current = window.scrollY;

        const handleScroll = () => {
            const current = window.scrollY;
            if (current < window.innerHeight * 0.9) {
                setVisible(true);
                setScrolled(false);
                return;
            }
            if (current > lastScroll.current && current > window.innerHeight) {
                setVisible(false);
            } else {
                setVisible(true);
                setScrolled(true);
            }
            lastScroll.current = current;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const toggleMenu = (open) => {
        setSideMenuOpen(open);
        if (open) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };

    const closeMenu = () => {
        setClosing(true);
        setTimeout(() => {
            setSideMenuOpen(false);
            setClosing(false);
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }, 400);
    };

    const isLightVariant = variant === 'light';
    const currentTextColor = isLightVariant ? '#000000' : scrolled ? '#000000' : '#ffffff';
    const currentBgColor = scrolled ? '#ffffff' : isLightVariant ? '#ffffff' : 'transparent';
    const currentBorder = scrolled || isLightVariant ? '0.5px solid #e0e0e0' : 'none';

    const getLinkStyle = (path) => {
        const isActive = pathname === path || 
                         pathname === path + '/' || 
                         (path !== '/' && pathname.startsWith(path))
        return {
            color: currentTextColor,
            borderTop: isActive ? `0.5px solid ${currentTextColor}` : 'none',
            paddingTop: isActive ? '4px' : '0'
        }
    };

    return (
        <>
            <header 
                className="flex justify-between items-center px-12"
                style={{ 
                    transform: visible ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.4s ease',
                    backgroundColor: currentBgColor,
                    borderBottom: currentBorder,
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 100,
                    paddingTop: '28px',
                    paddingBottom: '28px'
                }}
            >
                <Link 
                    href="/" 
                    className="text-base font-serif tracking-tight uppercase font-headline no-underline"
                    style={{ color: currentTextColor }}
                >
                    House Mazzutti
                </Link>

                <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12">
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/')} href="/">HOME</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/about')} href="/about">SOBRE</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/studio')} href="/studio">STUDIO</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/produtora')} href="/produtora">PRODUTORA</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/agencia')} href="/agencia">AGÊNCIA</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/angelo')} href="/angelo">ANGELO</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/comunidade')} href="/comunidade">COMUNIDADE</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/portfolio')} href="/portfolio">PORTFÓLIO</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/blog')} href="/blog">BLOG</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[11px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/contato')} href="/contato">CONTATO</Link>
                </nav>

                <div className="flex items-center space-x-6" style={{ color: currentTextColor }}>
                    <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform">
                        <span className="material-symbols-outlined" data-icon="search">search</span>
                    </button>
                    
                    {/* ANIMATED HAMBURGER */}
                    <button
                      onClick={() => toggleMenu(true)}
                      style={{background:'none', border:'none', cursor:'pointer',
                              padding:0, position:'relative', width:'36px', height:'28px'}}
                      onMouseEnter={e => {
                        const spans = e.currentTarget.querySelectorAll('span')
                        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)'
                        spans[1].style.opacity = '0'
                        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)'
                      }}
                      onMouseLeave={e => {
                        const spans = e.currentTarget.querySelectorAll('span')
                        spans[0].style.transform = 'none'
                        spans[1].style.opacity = '1'
                        spans[2].style.transform = 'none'
                      }}
                    >
                      <span style={{display:'block', width:'36px', height:'1px',
                        background: currentTextColor, position:'absolute', top:'4px', left:0,
                        transition:'all 0.3s ease'}}/>
                      <span style={{display:'block', width:'36px', height:'1px',
                        background: currentTextColor, position:'absolute', top:'14px', left:0,
                        transition:'all 0.3s ease'}}/>
                      <span style={{display:'block', width:'36px', height:'1px',
                        background: currentTextColor, position:'absolute', top:'24px', left:0,
                        transition:'all 0.3s ease'}}/>
                    </button>
                </div>
            </header>

            {sideMenuOpen && (
              <>
                <div 
                  onClick={() => closeMenu()}
                  style={{position:'fixed', inset:0, zIndex:99998,
                          background:'rgba(0,0,0,0.3)'}}
                />
                <div style={{
                  position:'fixed', top:0, right:0, bottom:0,
                  width:'25vw', minWidth:'320px',
                  background:'#0a0a0a', zIndex:99999,
                  display:'flex', flexDirection:'column',
                  justifyContent:'space-between',
                  padding:'60px 48px',
                  animation: closing 
                    ? 'slideOut 0.4s cubic-bezier(0.4,0,0.2,1) forwards' 
                    : 'slideIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards'
                }}>

            
                  <div>
                    <div style={{display:'flex', justifyContent:'space-between',
                      alignItems:'center', marginBottom:'60px'}}>
                      <p style={{fontFamily:'Newsreader, serif', fontSize:'16px',
                        fontStyle:'italic', color:'white', margin:0}}>
                        HOUSE MAZZUTTI
                      </p>
                      <div 
                        onClick={() => closeMenu()}
                        style={{cursor:'pointer', position:'relative', 
                                width:'24px', height:'24px'}}
                      >
                        <span style={{display:'block', width:'24px', height:'1px',
                          background:'white', position:'absolute', top:'12px',
                          transform:'rotate(45deg)'}}/>
                        <span style={{display:'block', width:'24px', height:'1px',
                          background:'white', position:'absolute', top:'12px',
                          transform:'rotate(-45deg)'}}/>
                      </div>
                    </div>
            
                    <div style={{marginBottom:'48px'}}>
                      <p style={{fontFamily:'Raleway, sans-serif', fontSize:'9px',
                        letterSpacing:'0.2em', textTransform:'uppercase',
                        color:'#555', marginBottom:'16px'}}>LOCALIZAÇÃO</p>
                      <p style={{fontFamily:'Newsreader, serif', fontSize:'14px',
                        fontStyle:'italic', color:'#aaa', lineHeight:'1.8', margin:0}}>
                        São Paulo, Brasil
                      </p>
                      <p style={{fontFamily:'Newsreader, serif', fontSize:'14px',
                        fontStyle:'italic', color:'#aaa', lineHeight:'1.8', margin:0}}>
                        23.5505° S, 46.6333° W
                      </p>
                    </div>
            
                    <div style={{width:'100%', height:'0.5px', 
                      background:'#222', marginBottom:'48px'}}/>
            
                    <div>
                      <p style={{fontFamily:'Raleway, sans-serif', fontSize:'9px',
                        letterSpacing:'0.2em', textTransform:'uppercase',
                        color:'#555', marginBottom:'16px'}}>FOLLOW US</p>
                      <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                        <a href="#" style={{fontFamily:'Newsreader, serif',
                          fontSize:'14px', fontStyle:'italic', color:'#aaa',
                          textDecoration:'none', transition:'color 0.3s'}}
                          onMouseEnter={e => e.currentTarget.style.color='white'}
                          onMouseLeave={e => e.currentTarget.style.color='#aaa'}
                        >Instagram</a>
                        <a href="#" style={{fontFamily:'Newsreader, serif',
                          fontSize:'14px', fontStyle:'italic', color:'#aaa',
                          textDecoration:'none', transition:'color 0.3s'}}
                          onMouseEnter={e => e.currentTarget.style.color='white'}
                          onMouseLeave={e => e.currentTarget.style.color='#aaa'}
                        >LinkedIn</a>
                      </div>
                    </div>
                  </div>
            
                  <p style={{fontFamily:'Raleway, sans-serif', fontSize:'9px',
                    letterSpacing:'0.2em', textTransform:'uppercase',
                    color:'#333', margin:0}}>© 2025 HOUSE MAZZUTTI</p>
                </div>
              </>
            )}

            <style>{`
                .font-label { font-family: var(--font-body), sans-serif; }
                .font-headline { font-family: var(--font-headline), serif; }
                @keyframes slideIn { 
                  from{transform:translateX(100%)} 
                  to{transform:translateX(0)} 
                }
                @keyframes slideOut { 
                  from{transform:translateX(0)} 
                  to{transform:translateX(100%)} 
                }
            `}</style>
        </>
    );
}
