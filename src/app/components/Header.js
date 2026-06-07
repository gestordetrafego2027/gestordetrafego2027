// updated
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import LangSwitcher from './LangSwitcher';
import { CartButton } from '@/components/ecommerce/CartButton';
import { useTranslations } from 'next-intl';

/**
 * GLOBAL HEADER COMPONENT
 * Handles main navigation and fullscreen side menu overlay
 *
 * @param {string} variant - 'light' (white bg, black text) or 'dark' (transparent bg, white text)
 */
export default function Header({ variant = 'dark' }) {
    const pathname = usePathname();
    const t = useTranslations('nav');
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [solucoesOpen, setSolucoesOpen] = useState(false);
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
                    className="uppercase no-underline flex items-baseline"
                    style={{ color: currentTextColor }}
                >
                    <span className="hm-logo" style={{fontSize: '28px'}}>
                        <span className="hm-house">House</span>
                        <span className="hm-mazzutti">Mazzutti</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12">
                    <Link className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/')} href="/">{t('home')}</Link>
                    <div
                        className="relative"
                        onMouseEnter={() => setSolucoesOpen(true)}
                        onMouseLeave={() => setSolucoesOpen(false)}
                    >
                        <button
                            type="button"
                            className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300 flex items-center gap-1"
                            style={{
                                color: currentTextColor,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                borderTop: ['/agencia', '/produtora', '/studio'].some((p) => pathname.startsWith(p)) ? `0.5px solid ${currentTextColor}` : 'none',
                                paddingTop: ['/agencia', '/produtora', '/studio'].some((p) => pathname.startsWith(p)) ? '4px' : '0',
                            }}
                            aria-haspopup="true"
                            aria-expanded={solucoesOpen}
                        >
                            {t('solucoes')}
                            <span style={{ fontSize: '8px', transform: solucoesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▾</span>
                        </button>
                        {solucoesOpen && (
                            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '22px', zIndex: 120 }}>
                                <div style={{ background: '#ffffff', border: '0.5px solid #e0e0e0', minWidth: '236px', padding: '8px 0', boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}>
                                    {[
                                        { label: t('agencia'), href: '/agencia', desc: t('agencia_desc') },
                                        { label: t('produtora'), href: '/produtora', desc: t('produtora_desc') },
                                        { label: t('studio'), href: '/studio', desc: t('studio_desc') },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSolucoesOpen(false)}
                                            style={{ display: 'block', padding: '12px 20px', textDecoration: 'none', transition: 'background 0.2s' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = '#f4f4f4')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                        >
                                            <span style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#000', marginBottom: '3px' }}>{item.label}</span>
                                            <span style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.08em', color: '#888' }}>{item.desc}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <Link className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/comunidade')} href="/comunidade">{t('comunidade')}</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/academy')} href="/academy">{t('academy')}</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/portfolio')} href="/portfolio">{t('portfolio')}</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/blog')} href="/blog">{t('blog')}</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/contato')} href="/contato">{t('contato')}</Link>
                    <Link className="font-label uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity duration-300" style={getLinkStyle('/login')} href="/login">{t('cliente')}</Link>
                </nav>

                <div className="flex items-center space-x-6" style={{ color: currentTextColor }}>
                    <LangSwitcher textColor={currentTextColor} />
                    <CartButton color={currentTextColor === '#000000' ? 'black' : 'white'} />
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
                      <div style={{margin:0}}>
                        <span className="hm-logo" style={{fontSize: '24px', color: 'white'}}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                      </div>
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

                    <nav style={{display:'flex', flexDirection:'column',
                      gap:'16px', marginBottom:'40px'}}>
                      {[
                        {label: t('home'), href:'/'},
                        {label: t('comunidade'), href:'/comunidade'},
                        {label: t('academy'), href:'/academy'},
                        {label:'↳ MARKETING PARA MODELOS · VOL. 01', href:'/academy/marketing-para-modelos', sub: true},
                        {label: t('portfolio'), href:'/portfolio'},
                        {label: t('blog'), href:'/blog'},
                        {label: t('contato'), href:'/contato'},
                        {label: t('cliente'), href:'/login', highlight: true},
                      ].map(item => (
                        <Link key={item.href} href={item.href}
                          onClick={() => closeMenu()}
                          style={{
                            fontFamily:'RocGrotesk, sans-serif',
                            fontSize: item.sub ? '9px' : '10px',
                            letterSpacing:'0.2em',
                            textTransform:'uppercase',
                            color: item.highlight ? 'white' : (item.sub ? '#a4e80a' : '#aaa'),
                            textDecoration:'none',
                            transition:'color 0.3s',
                            marginTop: item.highlight ? '8px' : (item.sub ? '-4px' : undefined),
                            paddingTop: item.highlight ? '16px' : undefined,
                            paddingLeft: item.sub ? '12px' : undefined,
                            borderTop: item.highlight ? '1px solid #333' : undefined,
                            fontWeight: item.highlight ? 500 : undefined,
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = 'white'}
                          onMouseLeave={e => e.currentTarget.style.color = item.highlight ? 'white' : (item.sub ? '#a4e80a' : '#aaa')}
                        >{item.label}</Link>
                      ))}
                    </nav>

                    {/* Soluções — grupo secundário */}
                    <div style={{marginBottom:'40px'}}>
                      <p style={{fontFamily:'RocGrotesk, sans-serif', fontSize:'9px',
                        letterSpacing:'0.2em', textTransform:'uppercase',
                        color:'#444', marginBottom:'16px'}}>{t('solucoes')}</p>
                      <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
                        {[
                          {label: t('agencia'), href:'/agencia'},
                          {label: t('produtora'), href:'/produtora'},
                          {label: t('studio'), href:'/studio'},
                          {label: t('angelo'), href:'/angelo'},
                        ].map(item => (
                          <Link key={item.href} href={item.href}
                            onClick={() => closeMenu()}
                            style={{
                              fontFamily:'RocGrotesk, sans-serif',
                              fontSize:'10px',
                              letterSpacing:'0.2em',
                              textTransform:'uppercase',
                              color:'#666',
                              textDecoration:'none',
                              transition:'color 0.3s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color='white'}
                            onMouseLeave={e => e.currentTarget.style.color='#666'}
                          >{item.label}</Link>
                        ))}
                      </div>
                    </div>

                    <div style={{marginBottom:'48px'}}>
                      <p style={{fontFamily:'Raleway, sans-serif', fontSize:'9px',
                        letterSpacing:'0.2em', textTransform:'uppercase',
                        color:'#555', marginBottom:'16px'}}>{t('localizacao')}</p>
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
                        color:'#555', marginBottom:'16px'}}>{t('follow')}</p>
                      <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                        <a href="https://instagram.com/housemazzutti" target="_blank" rel="noopener" style={{fontFamily:'Newsreader, serif',
                          fontSize:'14px', fontStyle:'italic', color:'#aaa',
                          textDecoration:'none', transition:'color 0.3s'}}
                          onMouseEnter={e => e.currentTarget.style.color='white'}
                          onMouseLeave={e => e.currentTarget.style.color='#aaa'}
                        >Instagram</a>
                        <a href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener" style={{fontFamily:'Newsreader, serif',
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
                    color:'#333', margin:0}}>{t('footer_copy') || '© 2026 HOUSE MAZZUTTI'}</p>
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
