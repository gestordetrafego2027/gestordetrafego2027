// updated
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
                        background: textColor, position:'absolute', top:'4px', left:0,
                        transition:'all 0.3s ease'}}/>
                      <span style={{display:'block', width:'36px', height:'1px',
                        background: textColor, position:'absolute', top:'14px', left:0,
                        transition:'all 0.3s ease'}}/>
                      <span style={{display:'block', width:'36px', height:'1px',
                        background: textColor, position:'absolute', top:'24px', left:0,
                        transition:'all 0.3s ease'}}/>
                    </button>
                </div>
            </header>

            {sideMenuOpen && (
              <>
                <div 
                  onClick={() => toggleMenu(false)}
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
                  animation:'slideIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards'
                }}>
                  <style>{`
                    @keyframes slideIn { 
                      from{transform:translateX(100%)} 
                      to{transform:translateX(0)} 
                    }
                  `}</style>
            
                  <div>
                    <div style={{display:'flex', justifyContent:'space-between',
                      alignItems:'center', marginBottom:'60px'}}>
                      <p style={{fontFamily:'Newsreader, serif', fontSize:'16px',
                        fontStyle:'italic', color:'white', margin:0}}>
                        HOUSE MAZZUTTI
                      </p>
                      <div 
                        onClick={() => toggleMenu(false)}
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

            <style jsx global>{`
                .font-raleway { font-family: var(--font-raleway), sans-serif; }
                .font-headline { font-family: var(--font-newsreader), serif; }
            `}</style>
        </>
    );
}
