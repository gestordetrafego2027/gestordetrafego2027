'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function StudioEnsaioPage() {
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out' })
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <title>House Mazzutti — STUDIO | Ensaio Pessoal</title>
            <meta name="description" content="Ensaio pessoal com direção estratégica de imagem. Construção de presença e autoridade visual para profissionais e empreendedores." />
            
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                .page-frame {
                    padding-left: 40px;
                    padding-right: 40px;
                }
            `}} />

            <h1 className="sr-only">Ensaio Pessoal com Direção de Imagem | House Mazzutti</h1>
            
            {/* 1. HEADER */}
            <nav className="top-0 left-0 w-full px-[100px] bg-transparent fixed pt-[40px] z-[9999]" id="main-nav" style={{ paddingTop: '65px' }}>
                <div className="flex justify-between items-center w-full max-w-[1920px] mx-auto">
                    <Link className="font-headline text-xl md:text-2xl tracking-tighter text-white uppercase ml-[20px]" href="/">HOUSE MAZZUTTI</Link>
                    <div className="flex items-center gap-8 text-white mr-[10px]">
                        <button
                          onClick={() => setSideMenuOpen(true)}
                          style={{background:'none', border:'none', cursor:'pointer',
                                  padding:0, position:'relative', width:'28px', height:'28px'}}
                          onMouseEnter={e => {
                            const spans = e.currentTarget.querySelectorAll('span')
                            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)'
                            spans[1].style.opacity = '0'
                            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)'
                          }}
                          onMouseLeave={e => {
                            const spans = e.currentTarget.querySelectorAll('span')
                            spans[0].style.transform = 'none'
                            spans[1].style.opacity = '1'
                            spans[2].style.transform = 'none'
                          }}
                        >
                          <span style={{display:'block', width:'28px', height:'1px', 
                            background:'white', position:'absolute', top:'6px', left:0,
                            transition:'all 0.3s ease'}}/>
                          <span style={{display:'block', width:'28px', height:'1px', 
                            background:'white', position:'absolute', top:'14px', left:0,
                            transition:'all 0.3s ease'}}/>
                          <span style={{display:'block', width:'28px', height:'1px', 
                            background:'white', position:'absolute', top:'22px', left:0,
                            transition:'all 0.3s ease'}}/>
                        </button>
                    </div>
                </div>
            </nav>

            {sideMenuOpen && (
              <div style={{
                position:'fixed', top:0, left:0, width:'100vw', height:'100vh',
                zIndex:99999, background:'#0a0a0a',
                display:'flex', flexDirection:'column',
                animation:'menuOpen 0.5s ease forwards'
              }}>
                <style>{`
                  @keyframes menuOpen { 
                    from { opacity:0; } 
                    to { opacity:1; } 
                  }
                `}</style>

                {/* Topo: logo + fechar */}
                <div style={{
                  display:'flex', justifyContent:'space-between', 
                  alignItems:'center', padding:'40px 60px'
                }}>
                  <p style={{fontFamily:'Newsreader, serif', fontSize:'18px',
                    fontStyle:'italic', color:'white', margin:0}}>
                    HOUSE MAZZUTTI
                  </p>
                  <div onClick={() => setSideMenuOpen(false)}
                    style={{cursor:'pointer', position:'relative', 
                            width:'28px', height:'28px'}}>
                    <span style={{display:'block', width:'28px', height:'1px', 
                      background:'white', position:'absolute', top:'14px', 
                      transform:'rotate(45deg)'}}/>
                    <span style={{display:'block', width:'28px', height:'1px', 
                      background:'white', position:'absolute', top:'14px', 
                      transform:'rotate(-45deg)'}}/>
                  </div>
                </div>

                {/* Links centralizados no meio da tela */}
                <nav style={{
                  flex:1, display:'flex', flexDirection:'column',
                  justifyContent:'center', alignItems:'center', gap:'20px'
                }}>
                  {[
                    {label:'HOME', href:'/'},
                    {label:'SOBRE', href:'/about'},
                    {label:'STUDIO', href:'/studio'},
                    {label:'PRODUTORA', href:'/produtora'},
                    {label:'AGÊNCIA', href:'/agencia'},
                    {label:'ANGELO', href:'/angelo'},
                    {label:'COMUNIDADE', href:'/comunidade'},
                    {label:'PORTFÓLIO', href:'/portfolio'},
                    {label:'BLOG', href:'/blog'},
                    {label:'CONTATO', href:'/contato'},
                  ].map(item => (
                    <Link key={item.label} href={item.href}
                      onClick={() => setSideMenuOpen(false)}
                      style={{
                        fontFamily:'Newsreader, serif', 
                        fontSize:'2.8rem',
                        fontStyle:'italic', 
                        fontWeight:'300', 
                        color:'#444',
                        textDecoration:'none', 
                        transition:'color 0.3s',
                        letterSpacing:'-0.02em',
                        textAlign:'center'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color='white'}
                      onMouseLeave={e => e.currentTarget.style.color='#444'}
                    >{item.label}</Link>
                  ))}
                </nav>

                {/* Rodapé */}
                <div style={{
                  display:'flex', justifyContent:'space-between', 
                  alignItems:'center', padding:'40px 60px',
                  borderTop:'0.5px solid #222'
                }}>
                  <div style={{display:'flex', gap:'32px'}}>
                    <a href="#" style={{fontFamily:'Raleway, sans-serif', 
                      fontSize:'9px', letterSpacing:'0.2em', 
                      textTransform:'uppercase', color:'#555', 
                      textDecoration:'none'}}>INSTAGRAM</a>
                    <a href="#" style={{fontFamily:'Raleway, sans-serif', 
                      fontSize:'9px', letterSpacing:'0.2em', 
                      textTransform:'uppercase', color:'#555', 
                      textDecoration:'none'}}>LINKEDIN</a>
                  </div>
                  <p style={{fontFamily:'Raleway, sans-serif', fontSize:'9px',
                    letterSpacing:'0.2em', textTransform:'uppercase', 
                    color:'#333', margin:0}}>© 2025 HOUSE MAZZUTTI</p>
                </div>
              </div>
            )}

            {/* 2. HERO SECTION */}
            <section className="relative h-screen w-full bg-white overflow-hidden px-[40px] pt-[25px] pb-[10px]">
                <div className="relative w-full h-full bg-[#111111] flex items-center justify-end min-h-[calc(100vh-75px)] pb-[20px]">
                    <div className="relative z-20 w-full px-[60px] flex justify-end pr-[120px]">
                        <div className="w-full max-w-[600px] flex flex-col items-center text-center ml-[-10px]">
                            {/* Geometric Icon */}
                            <div className="mb-8">
                                <svg className="w-[42px] h-[42px] text-white/80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L3 12L12 22L21 12L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 2L12 22" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 12L21 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-white/60 mb-6 block" data-aos="fade-up" data-aos-delay="100">DIREÇÃO DE ENSAIO</span>
                            <h1 className="font-headline text-4xl md:text-[3.6rem] text-white leading-[1.05] tracking-tight" data-aos="fade-up" data-aos-delay="200">A imagem que você projeta define como o mundo te percebe.</h1>
                            <p className="font-label uppercase tracking-[0.2em] text-[12px] text-white/60 mt-4 mb-8 max-w-[450px] mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">Ensaios fotográficos com direção de cena, moda e narrativa para quem busca autenticidade, autoridade e impacto visual exclusivo.</p>
                            <div data-aos="fade-up" data-aos-delay="400">
                                <button className="bg-transparent text-white border border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors active:scale-95 duration-200">
                                    INICIAR MEU ENSAIO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICES */}
            <section className="bg-white py-0 px-[40px] pt-[25px]">
                <div className="bg-[#f5f5f5] pt-[4rem] md:pt-[5rem] pb-[10rem] md:pb-[12rem]">
                    <div className="max-w-[1440px] mx-auto px-6 text-center">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">ENSAIO STUDIO</span>
                        <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">Não é sobre tirar fotos. É sobre criar ícones.</h2>
                        <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">Uma experiência pensada do conceito à curadoria.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="lightbulb">lightbulb</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Conceito Criativo</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Desenvolvimento da narrativa visual baseada na sua essência.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="checkroom">checkroom</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Styling & Moda</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Curadoria de looks que reforçam a mensagem desejada.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="movie_edit">movie_edit</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Direção no Set</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Direção completa de poses, expressão e presença.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="photo_camera">photo_camera</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Set de Luxo</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Estúdio próprio com infraestrutura de nível internacional.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="500">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="content_cut">content_cut</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Curadoria</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Seleção final das imagens que realmente posicionam.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="600">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="auto_awesome">auto_awesome</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Efeito House</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">A assinatura visual Mazzutti que te diferencia no mercado.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ASYMMETRICAL GALLERY */}
            <section className="bg-white px-[40px] py-0">
                <div className="grid grid-cols-1 gap-0 -mt-[30px] max-h-[1200px] overflow-hidden" style={{ maxHeight: 'calc(100% - 80px)' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                        <div className="relative aspect-square group overflow-hidden bg-black">
                            <img alt="Studio B&W 1" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHE-jdbFcfmgWLndXT3HgFYpU_BQZkJU9VKpODSd6zwx-comSTwpD21JwyVF0y7eTk1OX4OMY-HI9a5ZwPfC7cuujymVf4WmAVwNUkoN4kD2ZDqA8PkgIwRWZVzrpB6aLLcMhlqVUAdjWfD1WetjRiuvq-nJX7Pr8LlYVjK_lpWHn9r15N5FObTud86hUeTna_1HFUkKdQ7TI9y2v7PuedkEdhyixd2Xs9F4kUuQ4iuPdeZigs5chjosAhkVJ2SvKMz_Zi2KMUi8sC" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Book</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square group overflow-hidden bg-black">
                            <img alt="Studio B&W 2" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyf4rGsunZdy5myR8J3NHtT2i6311OP1QSziyW6VEopX6KrDZQ8FzjqFROezSqTEdCeL1UEz68SKbmo4y6_8tIZn-Qd87T4BMCNw94eX716fioUxmsKQaYOgzUKBjMPO6KehiogAReAKUzI5wI6T-aopdya5SaU19XdbNZfGeBffxLoL_T2t4Nme5zHypUv21rXGrpMrMPAMGxOdZGYEGLoNOTAeyO5BK8ix-6FibtgMqUKrgiDJhW_KoRwXIdQdp4DEFNvKNIhiIZ" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Book</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square group overflow-hidden bg-black">
                            <img alt="Studio B&W 3" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEZTYqz5dlAC5B-gYUBRyg7hFwwSUQxX4AhhEq69XgzRVhLVa55T1rs5dC9LzBxfwdgrUBRDlfI4H7KXyQ223-LSMCzJLwsV7AfdzhkvflvC1Wuk7QyH24pBWpdLClyEyseI2qb1pAw0PREGv4f0etcdzdEOosUPk994Z8YVPsNBUhQJfXgKiWSe27ahWlFx2ukHPXTUm4yWxY6PA244YlWtNW-P6LvzAJt9sSMAbTJRLgsaSG-f0KRVI5Pjeo2A3RIUeNRF2ohmkv" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Book</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square group overflow-hidden bg-black">
                            <img alt="Studio B&W 4" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx5xaGklZZwAT2ann9AZ1LNezx6ylP80r5BeqYVN2DuOXwFWMSvPjPVnAyF2YnIf7ndsfC7aM9uzmKQLZ6omqt9C0XxODN9af8Ig4trBfWsSNbMvO39_iRLTCrsJCF3akrQjp9zkc_aR7dQhSyDBrfWhVhAoGibJGHhtLQ6dd0KCNXuvL3Cpt4KrENts3BgwN8N_JpyNoOfnea9sKE3QBwZErF5EKmeZLILDk0vNeA7hrVSvud6cwrKN1R3h5kDKEc1pzLAwwuP_CJ" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Book</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0">
                        <div className="relative aspect-[3/4] md:aspect-auto group overflow-hidden bg-black">
                            <img alt="Portrait B&W" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNQVxyV6brR8f-reCUvqMUfYoUpns0yLX5IOaBNCmpxPYJxRK4jHLpK8Djryg-HaiABUJHsug1Dhld-K3jlFuEM8Es3QRdwrF9fhoy28iSnQzn0yp3h2pNnIUTz6_t9mqIjJdhrYSPVX17a-BLyPKHbT0m-uHq40UfrR1usx7WQyikmVfoL-xFuoUvwWg_IrXdez2r1vm1IE-ZmfuFbV3hPeDYI5XzecdC0YS5_91ZhBxoCdeVAhGzFAhpOn_vw8dNyhUbxElnA6tz" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Book</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-0">
                            <div className="grid grid-cols-2 gap-0">
                                <div className="relative aspect-square group overflow-hidden bg-black">
                                    <img alt="Sub B&W 1" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxaVk2Lchxwx56P9gnReb9J3KQfAe-yt_OXYaJemGNsFCKEfiClTYJy3PXawG5YWL4U6T7e9I7buVFs2raeHtlCKXtYd8c3-xlY4dB1tkCEDjUB3pO6ntf16P770QPGzhkCPFcIBGihgVzFpdqF_RNX3ELR5tk1BUODEDC2yoa1SY4zP31V0bxyMrcZYhoaZ8zrxgvVkVYex0ZRN-ktAmmBv2oUxMmjCR817r-BC6wbCvdgkvMCI9EXYlVthe6Cpi9_Cd0AD0r6SW" />
                                    <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                            <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                            <span className="text-white font-headline text-lg italic">Book</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-square group overflow-hidden bg-black">
                                    <img alt="Sub B&W 2" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN6o3rmcRIMUFrnGk9BlikGyErgn1cxd0Nan59VXcJ-szXJGppxE4EvhxMBa4vq6Qeq446LiyCI31jmxXBK48_9BE9G3AdHqd52xUwiyvuqg9BruQOCTc2kqyYpD_HuYkpkzyNLcH4f9BmWI8Lk67HWGORaVp11csp_1HvIBjvPqbZsJgWZcT5ffzkTSoKpUdTdPjskvcaX6s9-BeGvtovz0_ICHUpPtZb0ToIUGUfEnUIhvLFHeorJAzz7jzTiPDuDQZ60cRGb1rN" />
                                    <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                            <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                            <span className="text-white font-headline text-lg italic">Book</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-[2/1] group overflow-hidden bg-black">
                                <img alt="Wide B&W" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIhMgtzfgqMlxkjJPTMUaoTvc1QiTqtDKjpdVBPhUdE1rEtsE0EKuZFJabikqvbDXQDHZ50-xRjSCI7ZF-rYKILQ5fALMKJYcFUtINFckDslUqbimINZmY_HXI3xSthcS5iWJeW4j7nm6re0yJo-IBKJN9u7BDAmzHxfsMDYf2T0MU-h2n9roi5tGZ4X-XwGz5yPg_Aua6Sb96roCpJjDSs3Gf2M3zx2sGEbSDbK33o1rMJ8H6_DkQapsR4o4vIS3mE4DjUsRtP5LZ" />
                                <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className="bg-black/60 h-[86%] aspect-square flex flex-col items-center justify-center">
                                        <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                        <span className="text-white font-headline text-lg italic">Book</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TEAM SECTION */}
            <section className="bg-white px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-12">
                        <span className="font-label uppercase tracking-[0.3em] text-zinc-400 block mb-2 text-[10px]">QUEM ESTRUTURA</span>
                        <h2 className="font-headline text-3xl md:text-4xl text-black">Estratégia define. Imagem posiciona. Execução sustenta.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto max-w-[1386px]">
                        {/* Team Member 1: Lucas Mazzutti */}
                        <div className="space-y-8 flex flex-col items-center text-center mb-12">
                            <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                <img className="w-full h-full object-cover grayscale" alt="professional male portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0ESFf2VKUU01w1wDMvk9GSzceC_56tjvoVLme8E1KeN98y_Zc3Czxb47l9-giIZLy7mSRrqHj9zj4TNrDYF6-qHHrlZuYs5OK6L-MpUmwXBgRDC4HMoVG8uxvsjqwE64sm9SsADinIThjiDc6trCJ-GmADEkDjQ0xr990PJiKiBjDqIYnnO-J5hBFPuV90jlKCFIBhboqE9gA8O9y-e8JChB007vHeibnqmOp4yCmQIb11a7NCtW4pVkEGk5sdSQduOjAStefyk" />
                                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                        <Link className="text-white hover:text-zinc-300 transition-colors" href="/angelo">
                                            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="font-headline text-2xl font-medium">Lucas Mazzutti</p>
                                <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Direção Criativa</p>
                            </div>
                        </div>
                        {/* Team Member 2: Elena Silva */}
                        <div className="space-y-8 flex flex-col items-center text-center mb-12">
                            <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                <img className="w-full h-full object-cover grayscale" alt="professional female portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKZY7vY0_xHh4W3MKSd3jlEIhiiS5gF9XM3hbMqdr3jwFr16elkblrJVykxmXHcbVQeSdE7P4M_onqrLajroloIvYyXsYw_0dkx6h0ZB_8-X1qnqw4DSmV8kmBfkcAOXNZeI0dmCOHcnkHUelR4XxcDwB4AvZY1mvpxgCC2uMnR-KZ6SBTSb2TJ9SVM4WCCr2S10Gy74ML33Hkky5gHCBsKXvXWS5RGCOi9p4IhVIH2fWSwjIYsSOGaHsZpmM2Y5DpYCs4eCRR17g" />
                                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                        <Link className="text-white hover:text-zinc-300 transition-colors" href="/about">
                                            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="font-headline text-2xl font-medium">Elena Silva</p>
                                <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Estratégia de Marca</p>
                            </div>
                        </div>
                        {/* Team Member 3: Arthur Porto */}
                        <div className="space-y-8 flex flex-col items-center text-center mb-12">
                            <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                <img className="w-full h-full object-cover grayscale" alt="professional male portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa6TINUvFDwA7LqkkHXDdt1XoEvOHZPH3W5C2QvV6FRZfba0ajm5Uz7SjeIBB2cvjuqSy1_kYZlLfz-iW_L4qigAleWRqobN3LB08IXDDRI5N-GPiiRLh0Q3f-1by3ux6jIwMvx-36JFc9OdYIW0AifoBbPdrqq0aQY6QlBeQ_0tjxfuTSZLNTq9-cWum4QH8VCNJldD682F3o4XhHqfQ4p-LB97VETj8FHvw2375aLuDGGogL3XhITfCpJK56DcJ_QXEXNFpfMM8" />
                                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                        <Link className="text-white hover:text-zinc-300 transition-colors" href="/produtora">
                                            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="font-headline text-2xl font-medium">Arthur Porto</p>
                                <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Produção</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. QUOTE + VIDEO */}
            <section className="bg-white px-[40px]">
                <div className="relative h-[769px] w-full flex items-center justify-center overflow-hidden bg-black">
                    <img alt="Video Reel Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale blur-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIJolNlGXyY6byy38IAMCp6BioG4-zGYonIr-fh2jt-Y79LUqlS_WvgEtQLPhhAOGZWeE9-f_mPpcQ1KuB4pnKbBdakfikiA2PdPOYAS80Gx4AX7fPR143Zv3nLE15NF-x74AnVXceqSgBG3XQmLyiemq1iDlFy14deCLCGNNq7qeFS_RSLFZlJCfrjp9-G_CSo-dHRLppX2k25LR5lhAIiyz2AzaSidbjCIyT3x2mEFnLZVaQOh_KvW8OZNYjR0Wc7Oqyy96GiaTy" />
                    <div className="relative z-10 text-center px-8">
                        <button className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-12 mx-auto hover:bg-white/10 transition-colors group">
                            <span className="material-symbols-outlined text-white text-4xl group-hover:scale-110 transition-transform" data-icon="play_arrow">play_arrow</span>
                        </button>
                        <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">"Sua imagem já comunica algo — mesmo quando não existe intenção."</h2>
                        <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">A diferença está em decidir o que ela deve comunicar.</p>
                    </div>
                </div>
            </section>

            {/* 7. PRICING */}
            <section className="bg-white px-[40px]">
                <div className="bg-surface-container-lowest py-32 px-12 md:px-24">
                    <div className="max-w-[1440px] mx-auto">
                        <div className="text-center mb-24">
                            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-outline mb-4 block" data-aos="fade-up">TABELA DE INVESTIMENTO</span>
                            <h2 className="font-headline text-4xl md:text-5xl tracking-tight" data-aos="fade-up" data-aos-delay="100">Projetos de impacto. Valores reais.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="p-12 border border-surface-container-high flex flex-col justify-between h-full bg-white transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] group" data-aos="fade-up" data-aos-delay="100">
                                <div>
                                    <h3 className="font-headline text-2xl mb-8">ESSENCIAL</h3>
                                    <div className="mb-12">
                                        <span className="text-4xl font-headline italic">R$ 1.2k</span>
                                        <span className="text-xs font-label text-outline group-hover:text-white/50 block mt-2">ENTREGA EM 7 DIAS</span>
                                    </div>
                                    <ul className="space-y-4 mb-12">
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> 02 Looks Estratégicos
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> 08 Fotos Tratadas
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Direção de Pose
                                        </li>
                                    </ul>
                                </div>
                                <button className="w-full border border-primary py-4 font-label uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all group-hover:border-white">SELECIONAR</button>
                            </div>
                            <div className="p-12 border border-surface-container-high flex flex-col justify-between h-full bg-white transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] group relative overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                                <div className="absolute top-6 right-6">
                                    <span className="font-label text-[8px] tracking-widest bg-black text-white px-2 py-1 group-hover:bg-white group-hover:text-black">MOST POPULAR</span>
                                </div>
                                <div>
                                    <h3 className="font-headline text-2xl mb-8">ESTRATÉGICO</h3>
                                    <div className="mb-12">
                                        <span className="text-4xl font-headline italic">R$ 2.8k</span>
                                        <span className="text-xs font-label text-outline group-hover:text-white/50 block mt-2">ENTREGA EM 10 DIAS</span>
                                    </div>
                                    <ul className="space-y-4 mb-12">
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> 05 Looks Estratégicos
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> 20 Fotos Tratadas
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Moodboard Personalizado
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> 01 Video Reel (Apresentação)
                                        </li>
                                    </ul>
                                </div>
                                <button className="w-full border border-primary py-4 font-label uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all group-hover:border-white">SELECIONAR AGORA</button>
                            </div>
                            <div className="p-12 border border-surface-container-high flex flex-col justify-between h-full bg-white transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] group" data-aos="fade-up" data-aos-delay="300">
                                <div>
                                    <h3 className="font-headline text-2xl mb-8">PREMIUM</h3>
                                    <div className="mb-12">
                                        <span className="text-4xl font-headline italic">R$ 5.5k</span>
                                        <span className="text-xs font-label text-outline group-hover:text-white/50 block mt-2">PRODUÇÃO FULL-DAY</span>
                                    </div>
                                    <ul className="space-y-4 mb-12">
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Looks Ilimitados
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> 40 Fotos High-End
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Direção de Imagem Completa
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> 03 Video Reels (Conteúdo)
                                        </li>
                                    </ul>
                                </div>
                                <button className="w-full border border-primary py-4 font-label uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all group-hover:border-white">SOLICITAR ORÇAMENTO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. COMPARATIVE */}
            <section className="bg-white px-[40px]">
                <div className="bg-black text-white py-32 px-12 md:px-24">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight" data-aos="fade-up">A diferença está na direção.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div data-aos="fade-right">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 mb-12">COM DIREÇÃO (HOUSE)</h3>
                                <ul className="space-y-10">
                                    <li className="flex items-start gap-6">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="check_circle">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Posicionamento de Mercado</p>
                                            <p className="text-white/50 text-sm">Cada foto é pensada para um tipo de cliente específico.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="check_circle">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Segurança no Set</p>
                                            <p className="text-white/50 text-sm">Você nunca fica perdido. Orientamos cada respiração.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="check_circle">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Qualidade Editorial</p>
                                            <p className="text-white/50 text-sm">Tratamento de imagem que respeita a textura da pele.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div data-aos="fade-left">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 mb-12">SEM DIREÇÃO</h3>
                                <ul className="space-y-10">
                                    <li className="flex items-start gap-6 opacity-40">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="cancel">cancel</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Fotos Genéricas</p>
                                            <p className="text-white/50 text-sm">Material que parece amador e não gera interesse.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6 opacity-40">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="cancel">cancel</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Insegurança e Pose Vazia</p>
                                            <p className="text-white/50 text-sm">A falta de orientação transparece no olhar.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6 opacity-40">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="cancel">cancel</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Pós-Produção Excessiva</p>
                                            <p className="text-white/50 text-sm">Filtros que "plastificam" o modelo e perdem naturalidade.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FINAL CTA */}
            <section className="bg-white px-[40px]">
                <div className="bg-black py-32 px-12 md:px-24 text-center flex flex-col items-center">
                    <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug" data-aos="fade-up" data-aos-delay="100">Sua nova imagem começa agora.</h2>
                    <button className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="200">
                        INICIAR DIAGNÓSTICO DO MEU ENSAIO
                    </button>
                </div>
            </section>

            {/* 10. FOOTER */}
            <footer className="bg-black text-white py-24 px-12 border-t-[0.5px] border-zinc-900 flex flex-col items-center w-full text-center space-y-8">
                <h2 className="text-2xl font-serif text-white mb-12 uppercase tracking-tight">House Mazzutti</h2>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 mb-12">
                    <div className="space-y-4">
                        <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-500">SOCIAL</p>
                        <div className="flex space-x-8 justify-center">
                            <Link className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 hover:text-white transition-colors" href="https://instagram.com/housemazzutti">INSTAGRAM</Link>
                            <Link className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 hover:text-white transition-colors" href="https://linkedin.com/company/housemazzutti">LINKEDIN</Link>
                        </div>
                    </div>
                </div>
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 pb-12">
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/contato">CONTATO</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/portfolio">PORTFÓLIO</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/about">SOBRE</Link>
                    <Link className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-white transition-colors duration-200" href="/blog">BLOG</Link>
                </nav>
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 border-t-[0.5px] border-zinc-900">
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600">© 2025 House Mazzutti</p>
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-600 mt-4 md:mt-0">23.5505° S, 46.6333° W</p>
                </div>
            </footer>
        </div>
    );
}
