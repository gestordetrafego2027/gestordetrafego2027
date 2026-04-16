'use client';

import Header from '@/app/components/Header';

export default function ProdutoraModaPage() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out' })
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body antialiased">
            <title>House Mazzutti — PRODUTORA | Editorial de Moda</title>
            <meta name="description" content="Editorial de moda com direção criativa, fotografia fashion, lookbook e campanhas para marcas que buscam posicionamento, desejo e valor percebido." />
            
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

            <h1 className="sr-only">Editorial de Moda Profissional para Marcas e Campanhas</h1>
            
            {/* 1. HEADER */}
            <Header variant="dark" />


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
                            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-white/60 mb-6 block" data-aos="fade-up" data-aos-delay="100">MODA & EDITORIAL</span>
                            <h1 className="font-headline text-4xl md:text-[3.6rem] text-white leading-[1.05] tracking-tight" data-aos="fade-up" data-aos-delay="200">A estética que vende. A imagem que inspira.</h1>
                            <p className="font-label uppercase tracking-[0.2em] text-[12px] text-white/60 mt-4 mb-8 max-w-[450px] mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">Produção audiovisual especializada em moda, transformando conceitos em narrativas visuais de alto impacto para marcas e estilistas.</p>
                            <div data-aos="fade-up" data-aos-delay="400">
                                <button className="bg-transparent text-white border border-white px-10 py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors active:scale-95 duration-200">
                                    INICIAR PROJETO EDITORIAL
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
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-black mb-4 block" data-aos="fade-up">SERVIÇOS DE MODA</span>
                        <h2 className="font-headline text-black mb-4 tracking-tight text-base md:text-[1.375rem] lg:text-[2.85rem] leading-tight" data-aos="fade-up" data-aos-delay="100">Excelência técnica. Olhar editorial.</h2>
                        <p className="text-on-surface-variant font-body font-light text-base md:text-lg max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">Soluções completas para a comunicação visual da sua marca.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="style">style</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Direção de Moda</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Styling e direção criativa para garantir a coerência visual da marca.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="photo_camera">photo_camera</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Fotografia Fashion</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Captação profissional com padrão editorial internacional.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="auto_awesome_motion">auto_awesome_motion</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Social Content</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Criação de conteúdo dinâmico para redes sociais com estética premium.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="videocam">videocam</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Fashion Films</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Vídeos conceituais que transmitem a identidade e o movimento da coleção.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="500">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="camera">camera</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Campanhas</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Produção de fotos para catálogos, lookbooks e campanhas de lançamento.</p>
                            </div>
                            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="600">
                                <span className="material-symbols-outlined text-4xl mb-6 text-on-surface/80" data-icon="diamond">diamond</span>
                                <h3 className="font-headline mb-4 tracking-tight !text-lg">Pós-Produção High-End</h3>
                                <p className="text-on-surface-variant leading-relaxed font-light max-w-xs !text-[13px]">Tratamento de imagem e edição de vídeo com padrão internacional.</p>
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
                                    <span className="text-white font-headline text-lg italic">Moda</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square group overflow-hidden bg-black">
                            <img alt="Studio B&W 2" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyf4rGsunZdy5myR8J3NHtT2i6311OP1QSziyW6VEopX6KrDZQ8FzjqFROezSqTEdCeL1UEz68SKbmo4y6_8tIZn-Qd87T4BMCNw94eX716fioUxmsKQaYOgzUKBjMPO6KehiogAReAKUzI5wI6T-aopdya5SaU19XdbNZfGeBffxLoL_T2t4Nme5zHypUv21rXGrpMrMPAMGxOdZGYEGLoNOTAeyO5BK8ix-6FibtgMqUKrgiDJhW_KoRwXIdQdp4DEFNvKNIhiIZ" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Moda</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square group overflow-hidden bg-black">
                            <img alt="Studio B&W 3" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEZTYqz5dlAC5B-gYUBRyg7hFwwSUQxX4AhhEq69XgzRVhLVa55T1rs5dC9LzBxfwdgrUBRDlfI4H7KXyQ223-LSMCzJLwsV7AfdzhkvflvC1Wuk7QyH24pBWpdLClyEyseI2qb1pAw0PREGv4f0etcdzdEOosUPk994Z8YVPsNBUhQJfXgKiWSe27ahWlFx2ukHPXTUm4yWxY6PA244YlWtNW-P6LvzAJt9sSMAbTJRLgsaSG-f0KRVI5Pjeo2A3RIUeNRF2ohmkv" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Moda</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square group overflow-hidden bg-black">
                            <img alt="Studio B&W 4" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx5xaGklZZwAT2ann9AZ1LNezx6ylP80r5BeqYVN2DuOXwFWMSvPjPVnAyF2YnIf7ndsfC7aM9uzmKQLZ6omqt9C0XxODN9af8Ig4trBfWsSNbMvO39_iRLTCrsJCF3akrQjp9zkc_aR7dQhSyDBrfWhVhAoGibJGHhtLQ6dd0KCNXuvL3Cpt4KrENts3BgwN8N_JpyNoOfnea9sKE3QBwZErF5EKmeZLILDk0vNeA7hrVSvud6cwrKN1R3h5kDKEc1pzLAwwuP_CJ" />
                            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                    <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                    <span className="text-white font-headline text-lg italic">Moda</span>
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
                                    <span className="text-white font-headline text-lg italic">Moda</span>
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
                                            <span className="text-white font-headline text-lg italic">Moda</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-square group overflow-hidden bg-black">
                                    <img alt="Sub B&W 2" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN6o3rmcRIMUFrnGk9BlikGyErgn1cxd0Nan59VXcJ-szXJGppxE4EvhxMBa4vq6Qeq446LiyCI31jmxXBK48_9BE9G3AdHqd52xUwiyvuqg9BruQOCTc2kqyYpD_HuYkpkzyNLcH4f9BmWI8Lk67HWGORaVp11csp_1HvIBjvPqbZsJgWZcT5ffzkTSoKpUdTdPjskvcaX6s9-BeGvtovz0_ICHUpPtZb0ToIUGUfEnUIhvLFHeorJAzz7jzTiPDuDQZ60cRGb1rN" />
                                    <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <div className="bg-black/60 w-[86%] aspect-square flex flex-col items-center justify-center">
                                            <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                            <span className="text-white font-headline text-lg italic">Moda</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-[2/1] group overflow-hidden bg-black">
                                <img alt="Wide B&W" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIhMgtzfgqMlxkjJPTMUaoTvc1QiTqtDKjpdVBPhUdE1rEtsE0EKuZFJabikqvbDXQDHZ50-xRjSCI7ZF-rYKILQ5fALMKJYcFUtINFckDslUqbimINZmY_HXI3xSthcS5iWJeW4j7nm6re0yJo-IBKJN9u7BDAmzHxfsMDYf2T0MU-h2n9roi5tGZ4X-XwGz5yPg_Aua6Sb96roCpJjDSs3Gf2M3zx2sGEbSDbK33o1rMJ8H6_DkQapsR4o4vIS3mE4DjUsRtP5LZ" />
                                <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className="bg-black/60 h-[86%] aspect-square flex flex-col items-center justify-center">
                                        <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">EDITORIAL</span>
                                        <span className="text-white font-headline text-lg italic">Moda</span>
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
                        <h2 className="font-headline text-3xl md:text-5xl text-white italic mb-6">"Não é sobre produzir melhor. É sobre ser percebido de forma diferente."</h2>
                        <p className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60">Editorial bem construído é infraestrutura de comunicação.</p>
                    </div>
                </div>
            </section>

            {/* 7. PRICING */}
            <section className="bg-white px-[40px]">
                <div className="bg-surface-container-lowest py-32 px-12 md:px-24">
                    <div className="max-w-[1440px] mx-auto">
                        <div className="text-center mb-24">
                            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-4 block" data-aos="fade-up">TABELA DE INVESTIMENTO</span>
                            <h2 className="font-headline text-4xl md:text-5xl tracking-tight" data-aos="fade-up" data-aos-delay="100">Soluções para o seu negócio.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="p-12 border border-surface-container-high flex flex-col justify-between h-full bg-white transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] group" data-aos="fade-up" data-aos-delay="100">
                                <div>
                                    <h3 className="font-headline text-2xl mb-8">ESSENCIAL</h3>
                                    <div className="mb-12">
                                        <span className="text-4xl font-headline italic">Sob consulta</span>
                                    </div>
                                    <ul className="space-y-4 mb-12">
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Direção criativa
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Fotografia fashion
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Lookbook digital
                                        </li>
                                    </ul>
                                </div>
                                <button className="w-full border border-primary py-4 font-label uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all group-hover:border-white">SELECIONAR</button>
                            </div>
                            <div className="p-12 border border-zinc-100 flex flex-col justify-between h-full bg-white transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] group relative overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                                <div className="absolute top-6 right-6">
                                    <span className="font-label text-[8px] tracking-widest bg-black text-white px-2 py-1 group-hover:bg-white group-hover:text-black">MOST POPULAR</span>
                                </div>
                                <div>
                                    <h3 className="font-headline text-2xl mb-8">ESTRATÉGICO</h3>
                                    <div className="mb-12">
                                        <span className="text-4xl font-headline italic">Sob consulta</span>
                                    </div>
                                    <ul className="space-y-4 mb-12">
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Direção completa
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Foto e vídeo
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Lookbook + catálogo
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Fashion film
                                        </li>
                                    </ul>
                                </div>
                                <button className="w-full border border-primary py-4 font-label uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all group-hover:border-white">SELECIONAR AGORA</button>
                            </div>
                            <div className="p-12 border border-surface-container-high flex flex-col justify-between h-full bg-white transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] group" data-aos="fade-up" data-aos-delay="300">
                                <div>
                                    <h3 className="font-headline text-2xl mb-8">CAMPANHA COMPLETA</h3>
                                    <div className="mb-12">
                                        <span className="text-4xl font-headline italic">Sob consulta</span>
                                    </div>
                                    <ul className="space-y-4 mb-12">
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Conceito e direção
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Produção full
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Todos os formatos
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                            <span className="material-symbols-outlined text-lg" data-icon="check">check</span> Entrega multicanal
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
                        <h2 className="font-headline text-4xl md:text-5xl mb-24 tracking-tight" data-aos="fade-up">Moda que comunica.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div data-aos="fade-right">
                                <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 mb-12">COM EDITORIAL</h3>
                                <ul className="space-y-10">
                                    <li className="flex items-start gap-6">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="check_circle">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Linguagem Visual Consistente</p>
                                            <p className="text-white/50 text-sm">Campanhas mais fortes e presença de marca reconhecível.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="check_circle">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Percepção Premium</p>
                                            <p className="text-white/50 text-sm">Produto que gera desejo e maior conversão indireta.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="check_circle">check_circle</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Infraestrutura de Comunicação</p>
                                            <p className="text-white/50 text-sm">Um projeto gera ativos para todos os canais.</p>
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
                                            <p className="font-headline text-lg mb-2">Imagens Desconectadas</p>
                                            <p className="text-white/50 text-sm">Baixa diferenciação e dificuldade de posicionamento.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6 opacity-40">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="cancel">cancel</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Comunicação sem Identidade</p>
                                            <p className="text-white/50 text-sm">Marca genérica que depende de preço para vender.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6 opacity-40">
                                        <span className="material-symbols-outlined text-white pt-1" data-icon="cancel">cancel</span>
                                        <div>
                                            <p className="font-headline text-lg mb-2">Retrabalho Constante</p>
                                            <p className="text-white/50 text-sm">Produção sem estratégia que não sustenta crescimento.</p>
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
                    <h2 className="font-headline text-3xl md:text-5xl text-white mb-12 max-w-3xl leading-snug" data-aos="fade-up" data-aos-delay="100">Sua marca no próximo nível visual.</h2>
                    <button className="border border-white text-white px-16 py-6 font-label uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all" data-aos="fade-up" data-aos-delay="200">
                        ESTRUTURAR EDITORIAL DA MINHA MARCA
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
