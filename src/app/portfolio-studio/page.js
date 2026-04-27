'use client'

import Link from 'next/link';
import Header from '@/app/components/Header';

export default function PortfolioStudioPage() {
    return (
        <div className="bg-white text-on-surface font-body selection:bg-primary selection:text-on-primary">
            <style dangerouslySetInnerHTML={{__html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
                    font-size: 20px;
                }
                .columns-gallery-container {
                    height: 100vh;
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                    background-color: #ffffff;
                }
                .gallery-column {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    border-right: 1px solid rgba(0, 0, 0, 0.05);
                }
                .gallery-column:last-child {
                    border-right: none;
                }
                .column-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .project-item { position: relative; overflow: hidden; cursor: pointer; }
                .project-overlay { 
                    position: absolute; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    background: rgba(255,255,255,1) !important; 
                    color: #000 !important;
                    opacity: 0;
                    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    text-align: center;
                    padding: 2rem;
                    z-index: 10;
                }
                .gallery-column:hover .project-overlay { 
                    opacity: 1; 
                    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .project-overlay h4 { color: #000; font-family: 'Newsreader', serif; font-size: 18px; margin: 0; }
                .project-overlay span { color: #000; font-family: 'Raleway', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; }
                .gallery-item .overlay { opacity: 0; transition: opacity 0.4s ease; background: rgba(255,255,255,1) !important; }
                .gallery-item:hover .overlay { opacity: 1; }
            `}} />

            <Header />
            <div style={{padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid #e0e0e0'}}>
              <span style={{fontFamily: 'RocGrotesk', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase'}}>PORTFÓLIO STUDIO</span>
              <span style={{fontFamily: 'RocGrotesk', fontSize: '11px', color: '#888'}}>Home / Portfólio / Studio</span>
            </div>
            <style>{`
              header { background: #fff !important; }
              header a, header div, header span { color: #000 !important; }
            `}</style>
            <main className="min-h-screen" style={{ paddingTop: '80px' }}>
                <section className="bg-white w-full py-[16px] px-[40px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-[20px]">
                        <Link href="/portfolio-studio/projeto-essencia" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxXFX7iKpq0zTawLFzSng94FTqC8QmssH8UIMx6iZPuEIeFFimi1DVlCzdNyAx-7ZzfPyqfr0PD6Y1do7BO7upE9uT3z0p7MEC9gOT_-QcmR7D7n9ILiUC72Uk3pncnUI-_utLLZq5O5bw8uWL8Uhc81cOJJrRI8pIlDbC50zmv068KM36T4yaevUGEelVmUiACfma2Mp-Jji656PY9miFy3wYlgOE1SMbeKRGv64DJYBquV2fYfxpF_O5NEfaOEoodNYyOVGYbra" alt="Projeto Essência" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">DIREÇÃO DE IMAGEM</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Projeto Essência</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-studio/movimento-urbano" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXeu4Q08taagUiEU0oRy_WfWhic5_qLyLr1nXiBqhc49nYHLtgfzpzEknKHC8c18ICqtqLpI81ZgZeonbUv0whZLdOv-wFF7-x62Kpc8fI3cLDkDInEk0QTvLeB7F2siMYzg5AlMqvEHYdV9DOMr5l9PhPHywbNjxQfqRb6RJISWTCL3R1yQdE1mz2ozPE26wr0Ij3x5GEULlpnWjhfOYPIb-guSnqGxsDWX_tlCcse-g3jZRoMhAZDIh0TzUEbKyPeee9Z9TOUIcB" alt="Movimento Urbano" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">DIREÇÃO CRIATIVA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Movimento Urbano</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-studio/alfaiataria-moderna" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQL0BMQnfMGPt4hTwlz-SRUMnYZY4U5rG1WC6bylLDfghCKoScI3rtpRwlyty_5PL09Vbt5K5tjv2Pp4-F6DaT4vQQn32NU6RVnbTca6MvLSdJ3P2IaWqPQ8i_Sh1qc8zHS_87TVXHIWybRC-X8TV2IVZaLxtF8jU__u11uNp7rGD1OLQvEDOlyB1tqw8HHtm4tgB8JIsNQbhQqbg5JFrpCNdqI3FMcHyTCBsrPcfvRtxA_GMi4_VS4HK8umC5pps_0sPIO8q68n5" alt="Alfaiataria Moderna" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">POSICIONAMENTO</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Alfaiataria Moderna</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-studio/horizonte" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChtDNB7cdME0kaLamJozRvfkiJws6GrvrXBnE5QRIkxB2ppxix4CG2r_LeyGl5XP-xuzQILDQ9-6ZIMjAYUHBdzn-iH8v6Lxpa6zwjO6xR4CnSkRVonntUc7FphscJZCyOhoEd8rxJtVVZ2nPrj287s6BVqdbOQ52N9vhkG5IWwtk5vxPNnArouHvfxTGaIBJYgAcsGk1qElyInif8vlUCMxZkTDnPAmv_bx8gd_oQ9L1BxaSnKbCHQ8jqgLy-kf1WgkTEZeSrrMLR" alt="Horizonte" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">PRODUÇÃO DE IMAGEM</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Horizonte</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-studio/projeto-essencia" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXeu4Q08taagUiEU0oRy_WfWhic5_qLyLr1nXiBqhc49nYHLtgfzpzEknKHC8c18ICqtqLpI81ZgZeonbUv0whZLdOv-wFF7-x62Kpc8fI3cLDkDInEk0QTvLeB7F2siMYzg5AlMqvEHYdV9DOMr5l9PhPHywbNjxQfqRb6RJISWTCL3R1yQdE1mz2ozPE26wr0Ij3x5GEULlpnWjhfOYPIb-guSnqGxsDWX_tlCcse-g3jZRoMhAZDIh0TzUEbKyPeee9Z9TOUIcB" alt="Projeto Essência 2" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">DIREÇÃO DE IMAGEM</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Projeto Essência</span>
                            </div>
                        </Link>
                        <Link href="/portfolio-studio/movimento-urbano" className="gallery-item relative overflow-hidden bg-[#f3f3f4] w-full aspect-square min-h-[200px] block">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQL0BMQnfMGPt4hTwlz-SRUMnYZY4U5rG1WC6bylLDfghCKoScI3rtpRwlyty_5PL09Vbt5K5tjv2Pp4-F6DaT4vQQn32NU6RVnbTca6MvLSdJ3P2IaWqPQ8i_Sh1qc8zHS_87TVXHIWybRC-X8TV2IVZaLxtF8jU__u11uNp7rGD1OLQvEDOlyB1tqw8HHtm4tgB8JIsNQbhQqbg5JFrpCNdqI3FMcHyTCBsrPcfvRtxA_GMi4_VS4HK8umC5pps_0sPIO8q68n5" alt="Movimento Urbano 2" />
                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <span className="font-raleway text-[12px] uppercase tracking-[0.2em] text-black mb-2">DIREÇÃO CRIATIVA</span>
                                <span className="font-raleway text-[14px] italic text-[#5f5e5e]">Movimento Urbano</span>
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
