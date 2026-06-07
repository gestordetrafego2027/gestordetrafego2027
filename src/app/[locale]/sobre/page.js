import Link from 'next/link'
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import Header from '@/app/components/Header'
import {getTranslations} from 'next-intl/server'

export default async function SobrePage() {
  const t = await getTranslations('about')
  const tFooter = await getTranslations('footer');

  const boutique_cards = t.raw('boutique_cards')
  const metodo_items = t.raw('metodo_items')
  const diferencial_items = t.raw('diferencial_items')

  return (
    <div className="bg-white">
      <Header variant="dark" />

      <main>
        {/* HERO */}
        <section className="bg-black text-white px-12 md:px-48 pt-48 pb-32">
          <div className="max-w-4xl">
            <span className="text-caption text-white/60 mb-6 block">
              {t('hero_label')}
            </span>
            <h1 className="text-h1 text-white mb-8 hmzt-hero-title">
              {t('strategic_subtitulo')}
            </h1>
            <p className="text-body text-white/75 mb-12 measure-editorial">
              {t('hero_texto')}
            </p>
            <Link
              href="/contato"
              className="inline-block px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500"
            >
              {t('hero_cta')}
            </Link>
          </div>
        </section>

        {/* ORIGEM */}
        <section className="bg-white text-black px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-neutral-400 mb-6 block">{t('origem_label')}</span>
            <h2 className="text-h2 text-black mb-8">
              {t('origem_titulo')}
            </h2>
            <p className="text-body text-neutral-600 measure-editorial mb-6">
              {t('origem_p1')}
            </p>
            <p className="text-body text-neutral-600 measure-editorial">
              {t('origem_p2')}
            </p>
          </div>
        </section>

        {/* O QUE SOMOS */}
        <section className="bg-neutral-100 text-black px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-neutral-400 mb-6 block">{t('strategic_label')}</span>
            <h2 className="text-h2 text-black mb-8">
              {t('strategic_titulo')}
            </h2>
            <p className="text-body text-neutral-600 measure-editorial">
              {t('strategic_subtitulo')}
            </p>
          </div>
        </section>

        {/* COMO FUNCIONAMOS — frentes (boutique_cards) */}
        <section className="bg-white text-black px-12 md:px-48 py-32">
          <div className="max-w-5xl">
            <span className="text-caption text-neutral-400 mb-6 block">{t('boutique_label')}</span>
            <h2 className="text-h2 text-black mb-16">
              {t('boutique_titulo')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              {boutique_cards.map((card) => (
                <div
                  key={card.title}
                  className="group bg-white p-10 md:p-12"
                >
                  <h3 className="font-headline text-2xl md:text-3xl text-black tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <span className="text-caption text-neutral-500">
                    {card.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGIA */}
        <section className="bg-black text-white px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-white/50 mb-6 block">{t('metodo_bg')}</span>
            <h2 className="text-h2 text-white mb-12">
              {t('metodo_titulo')}
            </h2>
            <ol className="space-y-5">
              {metodo_items.map((etapa, i) => (
                <li key={i} className="flex items-baseline gap-6">
                  <span className="font-headline text-white/40 text-lg w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-body text-white/85">{etapa.desc}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DIFERENCIAL */}
        <section className="bg-white text-black px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-neutral-400 mb-6 block">{t('diferencial_label')}</span>
            <h2 className="text-h2 text-black mb-8">
              {t('diferencial_titulo')}
            </h2>
            <p className="text-body text-neutral-600 mb-4 measure-editorial">
              {t('diferencial_intro')}
            </p>
            <ul className="space-y-2">
              {diferencial_items.map((item, i) => (
                <li key={i} className="text-body text-neutral-600">{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* LIDERANÇA */}
        <section className="bg-neutral-100 text-black px-12 md:px-48 py-32">
          <div className="max-w-5xl">
            <span className="text-caption text-neutral-400 mb-6 block">{t('origem_label')}</span>
            <h2 className="text-h2 text-black mb-16">
              {t('producao_label')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              <div className="bg-white p-10 md:p-12">
                <div className="text-h3 text-black">Angelo Mazzutti</div>
                <div className="text-caption text-neutral-500 mt-2 mb-6">{t('origem_role')}</div>
                <p className="text-body text-neutral-600">
                  {t('origem_p1')}
                </p>
              </div>
              <div className="bg-white p-10 md:p-12">
                <div className="text-h3 text-black">Mateus Sacavem</div>
                <div className="text-caption text-neutral-500 mt-2 mb-6">{t('producao_role')}</div>
                <p className="text-body text-neutral-600">
                  {t('producao_p1')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO + CTA */}
        <section className="bg-black text-white px-12 md:px-48 py-40 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-h1 text-white hmzt-hero-title">
              {t('cta_titulo')}
            </h2>
            <p className="text-body text-white/70 measure-editorial mx-auto">
              {t('hero_texto')}
            </p>
            <Link
              href="/contato"
              className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500"
            >
              {t('hero_cta')}
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
        <div className="flex flex-col items-center text-center">
          <div className="mb-16">
            <span className="hm-logo" style={{fontSize: '40px', color: '#fafafa'}}>
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </span>
          </div>
          <div className="flex space-x-10 mb-16">
            <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">Instagram</a>
            <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/">Home</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/studio">Studio</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/portfolio">Portfólio</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/contato">Contato</Link>
          </nav>
          <div className="text-caption text-neutral-700">
            {tFooter('copyright')}
          </div>
        </div>
        <div className="mt-6"><SiteFooterLinks /></div>
            </footer>
    </div>
  )
}
