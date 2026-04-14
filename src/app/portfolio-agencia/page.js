'use client';

import Link from 'next/link';

export default function PortfolioAgenciaPage() {
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
            <nav className="fixed top-0 w-full z-50 rounded-none bg-white border-b-[0.5px] border-[#e0e0e0]">
                <div className="flex justify-between items-center px-12 py-6 w-full">
                    <Link className="text-xl font-newsreader italic text-black uppercase tracking-tighter" href="/">HOUSE MAZZUTTI</Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/">HOME</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/about">SOBRE</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/studio">STUDIO</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/produtora">PRODUTORA</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-black font-bold border-b border-black" href="/agencia">AGÊNCIA</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/angelo">ANGELO</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/comunidade">COMUNIDADE</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-black font-bold border-b border-black" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/blog">BLOG</Link>
                        <Link className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-black transition-colors duration-300" href="/contato">CONTATO</Link>
                    </div>
                    <div className="md:hidden">
                        <span className="material-symbols-outlined text-black">menu</span>
                    </div>
                </div>
                <div className="w-full h-[0.5px] bg-[#f0f0f0]"></div>
            </nav>

            <main className="pt-[92px]">
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
                        {/* ROW 1 (Images 1-3 -> projeto-1) */}
                        <Link href="/portfolio-agencia/projeto-1" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="minimalist architectural facade with sharp lines and shadows in black and white high contrast style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCztuNFdb8shwCRAv3Bsu4SLDMCrXwPCScq2UmxBq-ilHuM4g5pitixup6fwmEOljq9k-mL5gCmccZTIN6tMoXAKowDI3FfnecMoRJncD8aPO21PtLQ-n_VMm3WKjykHh6UHjl1HJ2D-zZpSw-L3NFHi8mJnADexpAXXffFhEmv86p2joH--zEyszj-rYgHWXQlvs6bJLCywkiYOuUCUOjppddkoBIFgiwlvcMt1twGd9BFYMyiTfjpLliZvBSR8oaXu2zFDxV23wYC" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/projeto-1" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="close-up of premium textured paper stationery with embossed logo and elegant typography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaVBgQgFKATgBv7IAzqL9qM4Z0tOA45C0RlXRtRe1despK8uCFmb6ABwY_fMH4NutVCsomWLpCHenS7G0evvSm03iraBQkv92ihmyxAYExwZaNV4uhl-VtIdGueKoqVA-k1k4IUb7ScMPVYMHvSKaNKhR4WKGJu14xSbY1cRXTS5OCGhMtsXXdyJWO510D4M-DidHUk90vSyXEOCg0EHsxMkdOGiO7P8ThFHyO-MKK2ebWOr10Cta-sW_kk2vX5cHN-of4egs8cHDy" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/projeto-1" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="modern interior design with concrete walls and a single designer chair in dramatic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Y1aeRxCa2tGoLtb54iMboTpZUIQT_DGvvGANlOgw1_u7bPMiI3V9FsKiAeHPFdfPYURjyAAWg9t71txePJ1qJ0Lpo4BNxYoRPiLk1VuNiC3PvHreg9tsE1wFIK1FqltqL7f7OyX5LWQAJYYpGCHxfqxi-paF4BBi7-JXKpAE9It2vJ6OdmGdct0Uv8LRI3_XUTyhqS2fZOb1iYrvaiW4KqNrU3kvYcNtENEmWxVNo9G8zUhSxhN1HWfWOhvjG5-MbaGn9XDws9qX" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>

                        {/* ROW 2 (Images 4-6 -> projeto-2) */}
                        <Link href="/portfolio-agencia/projeto-2" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="high fashion editorial shot of a model in monochromatic avant-garde clothing in a white studio" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAOb3woBBAoEhHQeiAQ-xxW3hLimXSW6porlTujq1nAdts17Dv-ZkWZKPDSApNbCWqc6t5c935JpSK-3awrXuStAd43B2ZYIYekyK6_JNupytAQpKYWVA5Hz34e-rgYm_KFcAcEGEqw6b8WIX6suAf_db6WfDZ5rR_LaYDNwpR2YkD-BQA_8gH2CHI3KbSCszqAugjfpPs_sQXib63AaPqk1F_dqgroQaAFh1YM8RRRyZ3k_FMHagcvQnYGnlHGv33p8NAzVYw6d6u" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/projeto-2" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="top view of a minimal desk setup with a black notebook and designer pen on white marble" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACmVoRk5Gn_KW3DsDtr9XrS09UwwrCCEAbGicvAY27tenrMCK6Tgkd7ILsdxZMnzbaN-r77n5QPoKJzdBb5RnYGyxDFto1Ux2Ct0VESBaHSxCYwfSII07n2jPyg9NdK1cA18OVokoJFHNU9yNpDCbCg9akJpv70byTZgpWtwE4LBz78v4CWbSRNBfm7ibYSopMdXpOh583DhKfKGbK3BQHzKrJ7YPTtCBXuKdPpJI5oEu86xfD7Pc5VXezBgxXn5AIOVBu3_jHV59J" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/projeto-2" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="abstract composition of shadows on a clean white wall creating geometric shapes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT_2FMLfjs_zieDjYfygyjTNXZkZXayhW7NvUIf-CijoxSB23RvfKzilGeq2Sd2E5W8IZTKOFEGRkSOR-3MmbXOV260R7qdonIerI02IALz_UVIetf5BGLasaHz4VDyk4i0lYwxoviqSTvvZ_GS8sMZaZb4Nb888pWNU6iCyRECkI4B02pLGHTniF-Ev2roD7s9QKLQzF-nTXO65XDlp9OvJBuSnHJCEe3THSH1hxVkLWXdQfRMKfVSOZiXyG8JXTPUf--Bo4myuaw" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>

                        {/* ROW 3 (Images 7-9 -> projeto-3) */}
                        <Link href="/portfolio-agencia/projeto-3" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="luxury perfume bottle on a glass surface with soft ethereal light and shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvL81wIHgPu60U2O_M_riCy6TouA9EdeP4x7WdZxE9eXtp_G8kYsC1_2ghJAzVuZoDw-hkTdGWkU9IkdvmWQuWs0Va6RGxPN8D2XrE9pIX1Vznjl-hd9l0wjWU_J1ea1cXmfqPSE2LnGcmnUk36WgXlPf8q8u9O9Sd62fUeMg59KbN-kyBypj03GGwsb8LH96-bBLAazlcNRxh2w43j2VetfsXOu3EWUzuduXMjYVeyGLoH_RgDYiASoZ5KsZ1MPJRCo1eBlRS3Bdx" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/projeto-3" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="detail of a textured architectural model made of white plaster and wood" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi_UzmmY_T7ExfK1HnItZKNUYVjpMq3kKh-EgFVfDW_bwrKXQulS_R5Rn8LD-C3a9-7p19nJZaX4-4cNvw6UR2XeoNpMMyg_3RjeGXAxmWrR_tiCsNfFu_iJdZ8jIfcFKLG3lB__AEDjwER7pXsWLazFdRRi7boFbvz_Myv-LQbwu3-7becUO6JGgMX-NFaY39UPlLk42ef6JkXGifWVW93XJhQx0a3o6tnKck4fiKVbKMEpvA7qb2ues5XrvHGUfTmluMNAcrFnxn" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-agencia/projeto-3" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" data-alt="minimalist landscape of sand dunes in soft morning light with clean horizons" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM799IOqRKKO04q9dNmIhjibtvzN8zrSCciBxHxAeeQbniWjYP2sPDgoOS4HUBARNrefLv11vIwtYfYS_SxJCrNpx4yk_wf9IZ9c-5tTESwvloP8FWo0AnGYT16dcctnZRKJNQAipKJR4ZAvwdPC7mhOeDSg8dkTM0Xwf2wmefxuLF_Z7JU1HM9SWHE0L-gbFiAs7m9oXBqMW1Jc9O9RYvxLQjUk4Zii3lNqO2NJIPBUpXE5-4AYcPK2qf943sjYWoz2_Bah08_uZf" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">HMZT AGÊNCIA</span>
                                <span className="font-newsreader text-[14px] italic text-[#5f5e5e]">Branding &amp; Direção</span>
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
