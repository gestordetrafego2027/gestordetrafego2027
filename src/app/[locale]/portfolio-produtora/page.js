'use client';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';
export default function PortfolioProdutoraPage() {
    return (
        <div className="bg-white text-on-surface selection:bg-black selection:text-white min-h-screen">
            <style dangerouslySetInnerHTML={{ __html: `
                .font-newsreader { font-family: 'Newsreader', serif; font-style: italic; }
                .font-raleway { font-family: 'Raleway', sans-serif; }
                .font-manrope { font-family: 'Manrope', sans-serif; }
                .gallery-item {
                    min-height: 200px;
                    aspect-ratio: 1 / 1;
                }
                .gallery-item .overlay {
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    background-color: rgba(255, 255, 255, 1) !important;
                }
                .gallery-item:hover .overlay {
                    opacity: 1;
                }
                .gallery-item img {
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    min-height: 200px;
                    object-fit: cover;
                }
                .gallery-item:hover img {
                    transform: scale(1.02);
                }
            `}} />
            <Header />
            <style>{`
              header { background: #fff !important; }
              header a, header div, header span { color: #000 !important; }
            `}</style>
            <main className="pt-[92px]" style={{ paddingTop: '80px' }}>
                <section className="border-y-[0.5px] border-[#e0e0e0] px-[40px] py-[28px] bg-white flex justify-between items-center">
                    <h1 className="font-raleway text-[11px] uppercase tracking-[0.2em] text-black">PORTFÓLIO PRODUTORA</h1>
                    <nav className="font-newsreader text-[16px] italic text-[#5f5e5e] pr-[120px]">
                        Home / Portfólio / Produtora
                    </nav>
                </section>
                <section className="bg-white w-full py-[16px] px-[40px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-[20px]">
                        <Link href="/portfolio-produtora/barbara-porto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/barbara-porto/capa.jpg" alt="Barbara Porto" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Barbara Porto</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/camila-scarpa" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/camila-scarpa/capa.jpg" alt="Camila Scarpa" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Camila Scarpa</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/poema-paris" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/poema-paris/capa.jpg" alt="Poema Paris" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Poema Paris</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/pontok" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/pontok/capa.jpg" alt="PontoK" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">PontoK</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/dumond" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/dumond/capa.jpg" alt="Dumond" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Dumond</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/signus" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/signus/capa.jpg" alt="Signus" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Signus</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/signus-versolato01" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/signus-versolato01/capa.jpg" alt="Signus Versolato 01" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Signus - Versolato 01</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/signus-versolato02" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/signus-versolato02/capa.jpg" alt="Signus Versolato 02" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Signus - Versolato 02</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/signus-vertz" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/signus-vertz/capa.jpg" alt="Signus Vertz" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Signus - Vertz</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/elyah" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/elyah/capa.jpg" alt="Elyah" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Elyah</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/signus-fiamma" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/signus-fiamma/capa.jpg" alt="Signus Fiamma" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Signus - Fiamma</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/signus-lavorato" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/signus-lavorato/capa.jpg" alt="Signus Lavorato" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Signus - Lavorato</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/monica-costa-jewerly" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/monica-costa-jewerly/capa.jpg" alt="Monica Costa Jewerly" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Monica Costa Jewerly</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/signus-jean-pierre" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/acessorios/signus-jean-pierre/capa.jpg" alt="Signus Jean Pierre" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ACESSÓRIOS</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Signus - Jean Pierre</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/alletto-still" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/alletto-still/capa.jpg" alt="Alletto Still" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Alletto Still</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/jequiti-sense" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/jequiti-sense/capa.jpg" alt="Jequiti - Sense" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jequiti - Sense</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/we-pink-ze-felipe" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/we-pink-ze-felipe/capa.jpg" alt="We Pink - Zé Felipe" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">We Pink - Zé Felipe</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/we-pink-01" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/we-pink-01/capa.jpg" alt="We Pink 01" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">We Pink 01</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/jequiti-galisteu" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/jequiti-galisteu/capa.jpg" alt="Jequiti - Galisteu" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jequiti - Galisteu</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/natalia-beauty" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/natalia-beauty/capa.jpg" alt="Natalia Beauty" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Natalia Beauty</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/jequiti-larissa-manoela" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/jequiti-larissa-manoela/capa.jpg" alt="Jequiti - Larissa Manoela" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jequiti - Larissa Manoela</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/oceane" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/beleza/oceane/capa.jpg" alt="Oceane" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BELEZA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Oceane</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/beatco" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/moda/beatco/capa.jpg" alt="Beatco" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">MODA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Beatco</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/pous" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/moda/pous/capa.jpg" alt="Pous" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">MODA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Pous</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/toli" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/moda/toli/capa.jpg" alt="Toli" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">MODA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Toli</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/unique-chic" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/moda/unique-chic/capa.jpg" alt="Unique Chic" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">MODA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Unique Chic</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-produtora/sense-hotel" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/produtora/institucional/sense-hotel/capa.jpg" alt="Sense Hotel" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">INSTITUCIONAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Sense Hotel</span>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <footer className="bg-[#0a0a0a] w-full flex justify-between items-center px-[48px] py-[32px] text-white">
                <div className="font-newsreader italic text-lg text-white">HOUSE MAZZUTTI</div>
                <div className="flex gap-8 items-center">
                    <Link className="font-manrope text-[10px] uppercase tracking-wider text-[#333] hover:text-white transition-colors duration-300" href="#">INSTAGRAM</Link>
                    <Link className="font-manrope text-[10px] uppercase tracking-wider text-[#333] hover:text-white transition-colors duration-300" href="#">LINKEDIN</Link>
                </div>
                <div className="font-manrope text-[10px] uppercase tracking-wider text-[#333]">Copyright © 2025 House Mazzutti</div>
            </footer>
        </div>
    );
}
