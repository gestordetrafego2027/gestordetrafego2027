'use client';

import Link from 'next/link';

export default function PortfolioProdutoraPage() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased">
      <style dangerouslySetInnerHTML={{
        __html: `
        .masonry-grid {
            column-count: 1;
            column-gap: 32px;
        }
        @media (min-width: 768px) {
            .masonry-grid {
                column-count: 2;
            }
        }
        @media (min-width: 1024px) {
            .masonry-grid {
                column-count: 4;
            }
        }
        .masonry-item {
            break-inside: avoid;
            margin-bottom: 32px;
        }
        .image-container {
            position: relative;
        }
        .image-container img {
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .image-container:hover img {
            transform: scale(1.03);
        }
        .image-container::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.35);
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
        }
        .image-container:hover::after {
            opacity: 1;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .page-title-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 28px 40px;
            border-top: 0.5px solid #e0e0e0;
            border-bottom: 0.5px solid #e0e0e0;
            margin-top: 73px; /* Precise height of the header for alignment */
            background: #fff;
        }

        .page-title {
            font-family: 'Raleway', sans-serif;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #000;
        }

        .breadcrumb {
            font-family: 'Newsreader', serif;
            font-size: 16px;
            font-style: italic;
            color: #5f5e5e;
            padding-right: 120px;
        }
    `
      }} />

      <header className="fixed top-0 w-full z-50 bg-white">
        <div className="flex justify-between items-center px-[48px] py-[20px] border-b-[0.5px] border-[#e0e0e0]">
          <div className="text-2xl font-headline italic tracking-tighter text-zinc-900">HOUSE MAZZUTTI</div>
          <nav className="hidden lg:flex gap-6">
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/">HOME</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/about">SOBRE</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/studio">STUDIO</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/produtora">PRODUTORA</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/agencia">AGÊNCIA</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/angelo">ANGELO</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/comunidade">COMUNIDADE</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/portfolio">PORTFÓLIO</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/blog">BLOG</Link>
            <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-900 hover:opacity-70 transition-opacity" href="/contato">CONTATO</Link>
          </nav>
        </div>
        <div className="mt-[2px] border-b-[0.5px] border-[#f0f0f0] w-full"></div>
      </header>
      
      <div className="page-title-bar">
        <span className="page-title">PORTFÓLIO PRODUTORA</span>
        <span className="breadcrumb">Home / Portfólio / Produtora</span>
      </div>

      <main className="pt-12 pb-20 px-6 md:px-8 lg:px-10">
        <div className="masonry-grid">
          {/* Item 1 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-1" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJOO2ewpINrihC29lFx3mir5RzM8gfiTV5nHTbzNMf-ur_JDooZ1wH58Zo02yua46oams5kA7XulQljwHTXeUANVzALwiPjc_LAhzio9-zK02kSfi7jk8nnmt7GmX58TKJ0YtyEtsPxp9cd2VfnjNqWKHTD4Un_sjdy4_TkWbepGuT-VeWdC4P7O8d5aSYQxYj8R4xjIQqd0RRQ7eTY5haJmX3Lt75QPPZjwCGHEmRTLqdv7ITP_ejRfwLSnN-wIDW-7rtkSQ-uDo" />
              </div>
            </Link>
          </div>
          {/* Item 2 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-1" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnrNU7Y0tVif3cR3hIujmG5_7viWTNhwKyyurK9Zvg7zhwYRKsCFuc3wkDCIjq6msKW_Fen6O-W9nvonCEXttkYUOqxnijv3QTyTkwOol6uZtZpUb3h5vrmA1cCGtHgCxGB_0Wy3qehv8SMdHDqbqkR5qMRojzGEHdWlXUP4veHAfCz5efzfV2UuqkZ4CSTreO9P1gGCmEUTqstu5-IYSVUTzgSjO5XD3oa-mPZBwr3m5aBTE88MPc8-BBa4uvtoqJHh0oZIQF9o0" />
              </div>
            </Link>
          </div>
          {/* Item 3 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-1" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_yI8B1svY6YH1ojBIQSbwR8moSbmovEQDN5AuNiGwU5YuWmDil3FZ9OSNzYHNOxjj0a7HH_RLJ8VT9oalryLx3SOPXJ3LkZOVqvccDw2_xJffNQfAKsEBnndb5hhQoIiu8DQ0bUNQe6NX9MR7liZk0RJNqjPX-WOlQ9lgdMdiGtzeVxv9bD5wfA6yTTDPVoZdInfbdHQAwWRAB5F5bcYSi6bKvc1-TgoMidwRHtnJigOgQG7A27MwnR5v5OhoLntObQWxUO8JXEg" />
              </div>
            </Link>
          </div>
          {/* Item 4 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-1" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0RRw4iBxAfO2KGq7KS7AyKPkApq5jV3nrwLjlAgYm-B5z_NfP3YcVx_Zh6gtpuPTP6ahMFH58Z4yDs0zWMirosLKyK2w1pdfY2V8DK6mVPnzLvlTTcqtywYwDO2NXsGC4lHAsL9kcawyg5lG51zOXXDJ7Kamsg-cODi4kyL6BKOUt0s4bbCcpvA9osfO7_QDEYwuNTXi5zXxxar_ldUBxgt9kqQfLIqqjERtPXc7MeYxcDGDoRPtKOBxCJWgiE8dmS4t9z8wH1ps" />
              </div>
            </Link>
          </div>

          {/* Item 5 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-2" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbeVl7zJ47Q-uUiHx_mXsNMmN1a8wJd1nIEFo08v2i3DDJPfD-UvOMtpvHAKmWnbrpgJok0Z-V1_uf0ZahNo9kei0o8VI2X7EIGKgCEGuRDZbSZi-EmLsqVFHRimj1Gs3GwT715A6DatCZ0JEIBhqI-tdtJOPwKJLI3SYa4sMadowE_kpHKLEJKftxUkMjocDjfrND5YlUrTX1dhjmPSfQBmB9h6z8FiKk5wzrR8YCtltSbebThkHbRs8znpuCw1U9zNXvaBvyI" />
              </div>
            </Link>
          </div>
          {/* Item 6 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-2" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOiBjKrm_093cociU2TgcjyHljVS5SWDtP387dv7bgHQBTeFsBG-Tu8rkQzWEDIos1jmMsSeqjQRlsmIKvOPhyOaJAfZRt3sdhzMYufrya1kPtJbXyq2cZrqeGnTg84ETTK604BD2JAgkz2w7Ff0XWix-Vw0eMfupqDjiOF0lGLM-m9iuTNSPvEh39LpRkb196CN76roMNT7WwCFsUtJIN_7BxqlOd6nQSdHBTi3g6ShsPetVzx5b_mTMpcCYUoj8-k7Gc0VpUv5k" />
              </div>
            </Link>
          </div>
          {/* Item 7 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-2" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7pD-hDXY8rz1R5BsKKU7ChCTc9eD2GencAmeid-F3e6KQKSEYZHPm-YxuxyLr4XVH_Mi5TcIZxVTZ8M2d5Kt5L7LR1aCqEIDuI8oYPbZduBIYDcLPWHxtZz61xhtKUg66n5DFTusY9TenJa6RQ3XYrKvnRH-NGksFmrsfJX97SbviDKZwNCXE9QniTEG3z85YeWVUlpGG_VwXiCa9qH4Mo7I8Pvz6DFiH-ClNkDbBhExLIWeQ2HYNSg0tGcRactzzXjKst1G8vkE" />
              </div>
            </Link>
          </div>
          {/* Item 8 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-2" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAYXre0Nq_AbwZRAe14kH7e8-t_eBkBW5DVEcvrBFIJuRUp_vsSO3geCcHLGZihnZjxTDs_6OE-64POhF_-ci36lVmDh8QlqjgiFVTZebwBZihG_YMV1kmF04-msX70IXvNya8L469sGkAmCvqysORjQvsolFWgXOILkHqkCxDHw5FWNOgd1KJYrY1S7nzXd8x-Jt5vyHvvtfV9JtiMcwiLiUFnHyBOLtgIbe1LJgpztvgiGuHQgpg_yiuNS7fDvt5Vgn2cZNQdQI" />
              </div>
            </Link>
          </div>

          {/* Item 9 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-3" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTZlzHlqmXhnNwDv0wU1XOWk047Ltg5b2T8HJY2rzSMKoC-abqXfvyEz7M8QaZBRiWygke5GrPkEvVgovOCAP5S6g0M36udGZie08HFyel-wAQOdBhLRIFnJ2akURYIv0Srj0sGLrRzfXhXWSJ7nvygz5i_2-4EhjVFreQfVvagTAkPa6htGxk3giU66YzcsNVH-7BOxCuwSraa5-citCXLEquqDjGaFVfIbu_kzlyVGJNG2wZ8urWfS06QDtJBoUJKQisv_pqzKg" />
              </div>
            </Link>
          </div>
          {/* Item 10 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-3" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFP3piJ9TPm0Y39xgJyL--Yav8IKoPRnzyCDdbXu9RL9uCe1a6zlLPHxDSjiCKcEwa-BKmZQieP1DQ5yXX7g0x8qkQgV6RZaJIx_Eq46Yte62Pphjpn5Y_6Liwlh1tZEmmUmjoErUYDclKGkF3iKKNd-jRTZzv9REmfcPDI1T4zGS9p3Fv2CvuUvyfCTARnVjLG4X82M6n5R5CQKWRh3D6bgw4GyM9ylt4FRYhT3Xi_nmyqR4r0xGakd4-lZegjpheRoUMyHJ5OA8" />
              </div>
            </Link>
          </div>
          {/* Item 11 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-3" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_1QpoVodN9bO5edX5gIx2g0hn4CnqImZpAivEk3RdV-f872F5guSDOADQ95qq4OzrB9MkOP-KCrXvTMsJdoYdf6nD3-SUTa5RPxVFTzU8UR0Ah1LAV9oofUP66ebVX_b5zi91woFPj2BoaBa5v9VZHi3tBJJPN6A3GYGE_54--0HCnurWdXMnPgBvbNx-Mr4AGB3xvPBDsqVLdnxu2NnhbDNrs7nSSQTgqtxzZocsijW7ASifCE63_nMGXT3hHAB685-pkmQuolE" />
              </div>
            </Link>
          </div>
          {/* Item 12 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-3" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAroWADJKmmyLJprx2J2CG25pgSZIhi5Ka6K9purLVLfnbgLvQzVKtW8DoI9q-UwtUnc_2KVQ476u4rIENls_N0fv8QC3CpFZe9g9uRgySakYg0E8tA9BMVuGYtheTQlWk27qJcG8BHX1b8F24FkioeRt7pPr9Ed1OveyMIW3xdPz66-v_xKrjhXs72l6B6x9d0c0Z99MqyckKF2bpEwerPO5jQ6Dk8kLQQPbPvMiPE4K2AhEKzhYy74rJpOkTehEnW9pUV7m5uj2s" />
              </div>
            </Link>
          </div>

          {/* Item 13 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-4" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0wzS6FYtdim3Cp2dlNKseXYFxiNZ-FtDBqgUQjqLupfP6Xkjbfib8WqoKCkS7sKq02W1uPW1-DWQV6Obka4LvLn0C07tqPrmKZ61J6LHF7pIVXyKZn2xSdkv9q1WNnEP1PQlwIMPX7OJ_LGTmnCnYYruME6-E0JnDaiW39Ze_cm5IgLp5AqBN974Q4D2NK8Ht5vHliQmRv91gGO67lXOs_bO9gX6k8QfcivTCOA8tK33YKN4dVCnI93YMlJ-FSvQtQZ50JtdqemU" />
              </div>
            </Link>
          </div>
          {/* Item 14 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-4" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2YcUDXo6TU-0auXBa3Bqhm3Ol9x0E7nSL2LLFLNdMFr8Np6yJflBQK3ZU0XTaKi5BAfJCSyz6sthw58CBHDzHpV1Y5jURxh0i4nu5bDRDigWb-5dMtCmc0BtHXVKAdOcB2B5OMivL0hfU1DvB2DlW6PrYCsaS45_zyhLKWrLjwmZcEzJArS-S8BopfhHb7exy0lRDKTWoWrnl6rKey998U9xk4Enwj8TAlkWVM8-Ac6W4Aw1lfW6N1sJMexWEBLpWY0Qo_HejRSg" />
              </div>
            </Link>
          </div>
          {/* Item 15 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-4" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[4/3] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6x6rQ1zsfDgMD61iPzFi89VwN8oz2IKqDXfMOHFpBHd9sezmoJvM_xxIPROEH7SV_wQBL1TMkTP_3GR6-5C5rmNXYOFO73g90hDmdsvX0YoM3Hj8RFXnOn1bBARE75xvG0gK3LDVMBWQA1CfhIquauJQmaNdft_cw7_O0wk9eiN3T5U20PXMcve7qJaXLEWBZrDt1lCmpSBumAgP3gl22qFyh21u2HmxUt-WMyxlWSjAsJHDXqT26bQYGIP_oNcBZ573yMVsen5I" />
              </div>
            </Link>
          </div>
          {/* Item 16 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/projeto-4" className="block">
              <div className="image-container overflow-hidden bg-surface-container-lowest">
                <img alt="" className="w-full aspect-[3/4] object-cover block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhyYcupWKl3LdpEdOKPzwZqtxE-AbPt17P4qDdtl7EZfFcdQYi8WZFLbCtX-ucCs8R7oxg1Us_HgVxMZrF9qSJ1wsLpLSN6UdnSVjz-4-ywTLX4nZpz28oPGvd-BY4WYSICOHErNVXkYBlhwSzC3GkFn3JPmHJQ3vIc15lE97S_6Jo6m5kZCypwWC1pzYd1diRVcs-_98fi4gW86ed2J-pa3fNoD-QoRdrxcPG0uVqP4oFxYGaiMuSNQ3ELVnAID_F3LXRB_UXHpU" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer style={{ background: '#0a0a0a', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Newsreader', serif", fontSize: '16px', color: '#fff', letterSpacing: '-0.02em' }}>House Mazzutti</div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <a href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', textDecoration: 'none' }}>Instagram</a>
          <a href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', textDecoration: 'none' }}>LinkedIn</a>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', color: '#333', letterSpacing: '0.1em' }}>© 2025 House Mazzutti</div>
      </footer>
    </div>
  );
}
