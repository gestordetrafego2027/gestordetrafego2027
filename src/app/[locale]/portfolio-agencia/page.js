

import Link from 'next/link';
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import Image from "next/image";
import Header from '@/app/components/Header';
import { getTranslations } from 'next-intl/server';

export default async function PortfolioAgenciaPage() {
    const tFooter = await getTranslations('footer');
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
                    <h1 className="font-raleway text-[11px] uppercase tracking-[0.2em] text-black">PORTFÓLIO AGÊNCIA</h1>
                    <nav className="font-newsreader text-[16px] italic text-[#5f5e5e] pr-[120px]">
                        Home / Portfólio / Agência
                    </nav>
                </section>

                {/* 3. GALLERY */}
                <section className="bg-white w-full py-[16px] px-[40px]">
                    {/* Grid Rows Construction */}
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-[20px]">
                        <Link href="/portfolio-agencia/house-mazzutti" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/house-mazzutti/capa.webp" alt="House Mazzutti" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">House Mazzutti</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/knowhol" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/knowhol/capa.webp" alt="Knowhol" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Knowhol</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/mabdo" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/mabdo/capa.webp" alt="Mabdo" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Mabdo</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/on-take" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/on-take/capa.webp" alt="On Take" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">On Take</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/pous" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/pous/capa.webp" alt="Pous" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Pous</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/samrat" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/samrat/capa.webp" alt="Samrat" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Samrat</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/alletto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/alletto/capa.webp" alt="Alletto" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Alletto</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/fort" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/fort/fort-negocios-imobiliarios-branding-identidade-visual-house-mazzutti-agencia-capa.webp" alt="Fort Negócios Imobiliários" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Fort Negócios Imobiliários</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/dra-ariadne-barbosa" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/dra-ariadne-barbosa/dra-ariadne-barbosa-logo-branding-manual-de-marca-identidade-visual-house-mazzutti-agencia-capa.webp" alt="Dra. Ariadne Barbosa" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Dra. Ariadne Barbosa</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/jucileia-soares" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/jucileia-soares/jucileia-soares-branding-identidade-visual-house-mazzutti-agencia-capa.webp" alt="Jucileia Soares" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jucileia Soares</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/lbo" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/lbo/lbo-consultoria-logo-marca-branding-house-mazzutti-agencia-design-capa.webp" alt="LBO Consultoria" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">LBO Consultoria</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/luiz-jr" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full block" style={{aspectRatio: '2/3'}}>
                            <Image src="/images/agencia/luiz-jr/luiz-jr-branding-identidade-visual-house-mazzutti-agencia-capa.webp" alt="Luiz Jr" fill sizes="(max-width: 768px) 100vw, 33vw" quality={80} loading="lazy" className="w-full h-full object-cover object-center" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">AGÊNCIA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Luiz Jr</span>
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
                    <Link className="font-manrope text-[10px] uppercase tracking-wider text-[#333] hover:text-white transition-colors duration-300" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">INSTAGRAM</Link>
                    <Link className="font-manrope text-[10px] uppercase tracking-wider text-[#333] hover:text-white transition-colors duration-300" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LINKEDIN</Link>
                </div>
                <div className="font-manrope text-[10px] uppercase tracking-wider text-[#333]">{tFooter('copyright')}</div>
              <div className="mt-6"><SiteFooterLinks /></div>
            </footer>
        </div>
    );
}
