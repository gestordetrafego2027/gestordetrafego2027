'use client';

import Link from 'next/link';
import Image from "next/image";
import Header from '@/app/components/Header';

export default function PortfolioStudioPage() {
    return (
        <div className="bg-white text-on-surface selection:bg-black selection:text-white min-h-screen">
            <style dangerouslySetInnerHTML={{ __html: `
                .font-newsreader { font-family: 'Newsreader', serif; font-style: italic; }
                .font-raleway { font-family: 'Raleway', sans-serif; }
                .font-manrope { font-family: 'Manrope', sans-serif; }
                
                /* Custom image hover transition for the gallery */
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

            {/* 1. HEADER (TopNavBar) */}
            <Header />
            <style>{`
              header { background: #fff !important; }
              header a, header div, header span { color: #000 !important; }
            `}</style>

            <main className="pt-[92px]" style={{ paddingTop: '80px' }}>
                {/* 2. TITLE BLOCK */}
                <section className="border-y-[0.5px] border-[#e0e0e0] px-[40px] py-[28px] bg-white flex justify-between items-center">
                    <h1 className="font-raleway text-[11px] uppercase tracking-[0.2em] text-black">PORTFÓLIO STUDIO</h1>
                    <nav className="font-newsreader text-[16px] italic text-[#5f5e5e] pr-[120px]">
                        Home / Portfólio / Studio
                    </nav>
                </section>

                {/* 3. GALLERY */}
                <section className="bg-white w-full py-[16px] px-[40px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-[20px]">

                        <Link href="/portfolio-studio/amanda-oliveira" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/amanda-oliveira/capa.jpg" alt="Amanda Oliveira" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Amanda Oliveira</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/ana-laura-saar" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/ana-laura-saar/5.jpg" alt="Ana Laura Saar" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Ana Laura Saar</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/chai-e-dai" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/chai-e-dai/capa.jpg" alt="Chai e Dai" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Chai e Dai</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/debora-pantaglione" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/debora-pantaglione/capa.jpg" alt="Debora Pantaglione" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Debora Pantaglione</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/ana-rockenbach" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/ana-rockenbach/capa.jpg" alt="Ana Rockenbach" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Ana Rockenbach</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/francine-massoco" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/francine-massoco/capa.jpg" alt="Francine Massoco" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Francine Massoco</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/anna-laura" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/anna-laura/capa.jpg" alt="Anna Laura" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Anna Laura</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/gab-cruz" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/gab-cruz/capa.jpg" alt="Gab Cruz" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Gab Cruz</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/arielly" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/arielly/capa.jpg" alt="Arielly" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Arielly</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/iasmim" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/iasmim/capa.jpg" alt="Iasmim" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Iasmim</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/jamile-caroline" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/jamile-caroline/capa.jpg" alt="Jamile Caroline" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jamile Caroline</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/jessica-bittelbrun" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/jessica-bittelbrun/capa.jpg" alt="Jessica Bittelbrun" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jessica Bittelbrun</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/julia-moraes" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/julia-moraes/capa.jpg" alt="Julia Moraes" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Julia Moraes</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/leticia-moraes" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/leticia-moraes/capa.jpg" alt="Leticia Moraes" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Leticia Moraes</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/maria-eduarda" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/maria-eduarda/capa.jpg" alt="Maria Eduarda" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Maria Eduarda</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/bruna-brummer" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/bruna-brummer/capa.jpg" alt="Bruna Brummer" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Bruna Brummer</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/iza-feser" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/iza-feser/capa.jpg" alt="Iza Feser" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Iza Feser</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/marina-machado" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/marina-machado/capa.jpg" alt="Marina Machado" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Marina Machado</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/nataly-silva" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/nataly-silva/capa.jpg" alt="Nataly Silva" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Nataly Silva</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/patricia-marafon" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/patricia-marafon/capa.jpg" alt="Patricia Marafon" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Patricia Marafon</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/poliana-barreto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/poliana-barreto/capa.jpg" alt="Poliana Barreto" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Poliana Barreto</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/sara-henriches" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/sara-henriches/capa.jpg" alt="Sara Henriches" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Sara Henriches</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/vitoria-boidt" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/vitoria-boidt/capa.jpg" alt="Vitória Boidt" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Vitória Boidt</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/andressa-gomiero" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/andressa-gomiero/capa.jpg" alt="Andressa Gomiero" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Andressa Gomiero</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/fernanda-treml" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/fernanda-treml/capa.jpg" alt="Fernanda Treml" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Fernanda Treml</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/nairicia-caberlon" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/nairicia-caberlon/capa.jpg" alt="Naírícia Caberlon" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Naírícia Caberlon</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/thaisi-dias" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/thaisi-dias/capa.jpg" alt="Thaisi Dias" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Thaisi Dias</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/brenda-mattos" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/brenda-mattos/capa.jpg" alt="Brenda Mattos" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Brenda Mattos</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/gustavo-vioto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/gustavo-vioto/capa.jpg" alt="Gustavo Vioto" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Gustavo Vioto</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/paula-assuncao" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/paula-assuncao/capa.jpg" alt="Paula Assunção" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Paula Assunção</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/carol-costa" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/carol-costa/capa.jpg" alt="Carol Costa" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Carol Costa</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/leif-sinclar" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/leif-sinclar/capa.jpg" alt="Leif Sinclar" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Leif Sinclar</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/rebeca-cabral" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/rebeca-cabral/capa.jpg" alt="Rebeca Cabral" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Rebeca Cabral</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/cynthia-andrade" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/cynthia-andrade/capa.jpg" alt="Cynthia Andrade" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Cynthia Andrade</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/maria-tereza" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/maria-tereza/capa.jpg" alt="Maria Tereza" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Maria Tereza</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/samara-samme" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/samara-samme/capa.jpg" alt="Samara Samme" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Samara Samme</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/deise-smaniotto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/deise-smaniotto/capa.jpg" alt="Deise Smaniotto" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Deise Smaniotto</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/marjorie-rossi" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/marjorie-rossi/capa.jpg" alt="Marjorie Rossi" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Marjorie Rossi</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/simonny" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/simonny/capa.jpg" alt="Simonny" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Simonny</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/fernanda-costas" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/fernanda-costas/capa.jpg" alt="Fernanda Costas" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Fernanda Costas</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/mileide-mihaile" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/mileide-mihaile/capa.jpg" alt="Mileide Mihaile" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Mileide Mihaile</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/talita-dalbo" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/studio/talita-dalbo/capa.jpg" alt="Talita Dalbó" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-top" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Talita Dalbó</span>
                            </div>
                        </Link>

                    </div>
                </section>
            </main>

            {/* 4. FOOTER */}
            <footer className="bg-[#0a0a0a] w-full flex justify-between items-center px-[48px] py-[32px] text-white">
                <div className="text-white">
                    <span className="hm-logo" style={{fontSize: '22px'}}>
                        <span className="hm-house">House</span>
                        <span className="hm-mazzutti">Mazzutti</span>
                    </span>
                </div>
                <div className="flex gap-8 items-center">
                    <Link className="font-manrope text-[10px] uppercase tracking-wider text-[#333] hover:text-white transition-colors duration-300" href="#">INSTAGRAM</Link>
                    <Link className="font-manrope text-[10px] uppercase tracking-wider text-[#333] hover:text-white transition-colors duration-300" href="#">LINKEDIN</Link>
                </div>
                <div className="font-manrope text-[10px] uppercase tracking-wider text-[#333]">Copyright © 2025 House Mazzutti</div>
            </footer>
        </div>
    );
}
