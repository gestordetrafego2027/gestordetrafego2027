'use client';

import Link from 'next/link';
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

                        <Link href="/portfolio-studio/amanda-oliveira" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=14rW-APc6PLHSN0mYg6dAdQ-gR3xTY1SH" alt="Amanda Oliveira" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Amanda Oliveira</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/ana-laura-saar" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1hL-mEHAfg6n6TudZfcvk3kHDpGxCfHPN" alt="Ana Laura Saar" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Ana Laura Saar</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/chai-e-dai" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1j9m9l3MIiLkrDx4wGOGCx6zAwPvZ3iHt" alt="Chai e Dai" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Chai e Dai</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/debora-pantaglione" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=15fmxQlkbKnbYgwiA1ICYX98YyomSuydn" alt="Debora Pantaglione" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Debora Pantaglione</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/ana-rockenbach" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1GaKknAS4UNwDUjK_V0MDxjZdYofbI9tJ" alt="Ana Rockenbach" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Ana Rockenbach</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/francine-massoco" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1z5qfurH5TFEgjtcMkIDiifDBiYRhKBmM" alt="Francine Massoco" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Francine Massoco</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/anna-laura" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=15soluk_S_QhcoCrol4MQ1rksS5oVwvHR" alt="Anna Laura" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Anna Laura</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/gab-cruz" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=13j1IJvrjsFAaWuOWToZZn9AZvxdZRiJo" alt="Gab Cruz" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Gab Cruz</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/arielly" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1PObNeGFuxJtqZlcsP1_qTYSNl8Jx8cYq" alt="Arielly" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Arielly</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/iasmim" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1V3wIT3EludSEMPx3oRyq_F45pVhVC3e3" alt="Iasmim" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Iasmim</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/jamile-caroline" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1wUivw_5eRjFW2KYYBTUtkKPBRPiMAnkr" alt="Jamile Caroline" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jamile Caroline</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/jessica-bittelbrun" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1EfiA659dy0UDLb_uX0s6-Z2eDv8_DCvx" alt="Jessica Bittelbrun" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Jessica Bittelbrun</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/julia-moraes" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1I4QeAvSqw4wzpc5WzY47hvpanqiLqtd2" alt="Julia Moraes" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Julia Moraes</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/leticia-moraes" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=11pz8TEQZVhBQ5ETmpVo6uxrtOrmNhN-v" alt="Leticia Moraes" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Leticia Moraes</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/maria-eduarda" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1tw20TD6ZV69DMwPuEl5Li7KBy6gpn0jc" alt="Maria Eduarda" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Maria Eduarda</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/bruna-brummer" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1Myossd_io08p0hXSFDCJkjYVE3f2UiTW" alt="Bruna Brummer" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Bruna Brummer</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/iza-feser" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1xKIiEm8uyuNgGhyPAxDiD2ijp3ZqavhM" alt="Iza Feser" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Iza Feser</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/marina-machado" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1V-XiqUXay8yBsNMe853IPypXGoogy9a1" alt="Marina Machado" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Marina Machado</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/nataly-silva" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1CYdlLEvNiybl8sN-jXAhf7-lh9NVhDxk" alt="Nataly Silva" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Nataly Silva</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/patricia-marafon" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1o8rvLS5a9c7S7JjBlKfPo15gAPSZ2x7x" alt="Patricia Marafon" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Patricia Marafon</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/poliana-barreto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1TyjK9hlfrhwZmdrd9yT9Ayd8I0Trm1k1" alt="Poliana Barreto" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Poliana Barreto</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/sara-henriches" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1U6C6gT0UfB_uLHsLFgmtixnhKUa34zpP" alt="Sara Henriches" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Sara Henriches</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/vitoria-boidt" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1sKU7TwwBq37-AaYtmYymG9XpDqQqHQim" alt="Vitória Boidt" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">BOOK</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Vitória Boidt</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/andressa-gomiero" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=17ubt2ndVst7hX63UstgnGBlxhfMuwo1M" alt="Andressa Gomiero" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Andressa Gomiero</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/fernanda-treml" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1PukMacliOzBE3EykvFbtmalbUAYA94tP" alt="Fernanda Treml" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Fernanda Treml</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/nairicia-caberlon" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1Ru0sXlVzTguYhS-qR1y4LvzCtrauHRUC" alt="Naírícia Caberlon" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Naírícia Caberlon</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/thaisi-dias" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=147lS-xX8KSGgdpQWE02RDqOAmoRkEYqG" alt="Thaisi Dias" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Thaisi Dias</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/brenda-mattos" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1TimSu4Awxissb7ziVmLH43Y62Pdsj82D" alt="Brenda Mattos" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Brenda Mattos</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/gustavo-vioto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1iyrp1xNmElQW18y4juFnhKp5Ny_vbjCJ" alt="Gustavo Vioto" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Gustavo Vioto</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/paula-assuncao" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1Prd-D_pw3lX4uJxkOz_8A64Wb6R3RxSc" alt="Paula Assunção" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Paula Assunção</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/carol-costa" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1DUO7uSyBpc65cDonraS87Aa93wBd2Cu6" alt="Carol Costa" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Carol Costa</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/leif-sinclar" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1uVaaLCr9mqh0--92_h89SO6T08KRP8yd" alt="Leif Sinclar" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Leif Sinclar</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/rebeca-cabral" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1bycefQT0JnrChB5lUozjfv_YAOj1DHsY" alt="Rebeca Cabral" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Rebeca Cabral</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/cynthia-andrade" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=15ljtgP5brRlsTSiB485WwxApCDqM07jK" alt="Cynthia Andrade" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Cynthia Andrade</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/maria-tereza" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1YtJ5q2MYW6IiiLHxVNBZ6bswcqNugWSt" alt="Maria Tereza" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Maria Tereza</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/samara-samme" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1MrPrmHiavZsBgJzHEfcNNmfzqzZWTPiu" alt="Samara Samme" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Samara Samme</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/deise-smaniotto" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1EjMnWRVQOFtBWGpKi_zIZ1DvYBwbp7AP" alt="Deise Smaniotto" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Deise Smaniotto</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/marjorie-rossi" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1l5XlwvT4bx4Hi2keufRKEUwSegh1VlZW" alt="Marjorie Rossi" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Marjorie Rossi</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/simonny" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1nh2M1YH-x8o4xZGSzCrhGe5nhQqBoOBj" alt="Simonny" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Simonny</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/fernanda-costas" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1-z2IZLovbbB9jxkuLbssIjkmWPUClh1T" alt="Fernanda Costas" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Fernanda Costas</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/mileide-mihaile" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1V9hTzRGkvQKEE76BD--KEYYucwGtcRO8" alt="Mileide Mihaile" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">ENSAIO PESSOAL</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Mileide Mihaile</span>
                            </div>
                        </Link>

                        <Link href="/portfolio-studio/talita-dalbo" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://drive.google.com/uc?export=view&id=1HaIvvBcggY98dLPR0IHXg_tBRg2TwtNA" alt="Talita Dalbó" />
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
