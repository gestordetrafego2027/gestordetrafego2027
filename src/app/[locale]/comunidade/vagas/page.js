import { Link } from '@/i18n/navigation'
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import Header from '@/app/components/Header'
import FormModelo from '@/app/components/forms/FormModelo'
import {getTranslations} from 'next-intl/server'

export default async function ComunidadeVagasPage() {
  const t = await getTranslations('comunidade_vagas')
  return (
    <div className="bg-surface text-on-surface font-body antialiased">
      <Header variant="light" />

      <main className="bg-white">
        {/* HERO */}
        <section className="px-12 pt-40 pb-24 border-b-[0.5px] border-zinc-200">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-7">
              <span className="text-caption text-zinc-500 block mb-6">{t('hero_breadcrumb')}</span>
              <h1 className="text-h1 text-black mb-8">
                {t('hero_titulo')}
              </h1>
              <p className="text-body text-zinc-700 measure-editorial">
                {t('hero_texto')}
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <p className="text-caption text-zinc-400">
                {t('hero_badge')}
              </p>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="px-12 py-24">
          <div className="max-w-[760px] mx-auto">
            <div className="mb-12">
              <h2 className="text-h2 text-black mb-4">{t('form_titulo')}</h2>
              <p className="text-body text-zinc-600">
                {t('form_instrucao_pre')} <span className="text-red-600">*</span> {t('form_instrucao_pos')}
              </p>
            </div>
            <FormModelo sourceUrl="/comunidade/vagas" ctaLocation="hero" />
          </div>
        </section>

        {/* FAQ / CTA SECUNDÁRIO */}
        <section className="bg-zinc-50/50 px-12 py-24 border-t-[0.5px] border-zinc-200">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="text-caption text-zinc-500 block mb-4">{t('faq_label')}</span>
              <h3 className="text-h3 text-black mb-6">{t('faq_titulo')}</h3>
              <p className="text-body text-zinc-700 measure-editorial">
                {t('faq_texto')}
              </p>
            </div>
            <div className="flex md:justify-end items-start">
              <Link
                href="/comunidade"
                className="inline-block px-10 py-4 border-[0.5px] border-black text-black text-button hover:bg-black hover:text-white transition-all duration-500 text-center"
              >
                {t('cta_voltar')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
        <div className="flex flex-col items-center text-center">
          <div className="text-neutral-50 mb-12">
            <span className="hm-logo" style={{ fontSize: '40px' }}>
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-12">
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/">{t('footer_home')}</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/comunidade">{t('footer_comunidade')}</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/contato">{t('footer_contato')}</Link>
          </nav>
          <div className="text-caption text-neutral-700">
            {t('footer_copyright')}
          </div>
        </div>
        <div className="mt-6"><SiteFooterLinks /></div>
            </footer>
    </div>
  )
}
