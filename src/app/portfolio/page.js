'use client'

import React from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'

export default function Portfolio() {
  const sections = [
    {
      id: 'studio',
      label: 'STUDIO',
      title: 'HMZT STUDIO',
      description: 'Ensaios, books e coberturas pessoais com direção estética guiada por estratégia.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4KUVLJUL-uxvDKAfn2IfswuESvjVPbRKyIhOr6RAgX-gPHUSbYctz9jhHVRyhrPOvgp_F3f339FTKZ2mhKtmRsw1Or-AmM4LeyBQXQLMRP31QoOgFfQPK3xfhY4RNtunnrYPZC4V9mEPkrfWjBz0iKBMIwvWokt-XYQceqHYBtZErUvjI2khPxLKapxWYqHS0N2VjtMveW4bOeceZhgsr5k3bQ6DOR40hyL8fpJ4kuyCXaGpvOMPgit5ZRt4CcmS9Ua18PsBPgXw',
      link: '/portfolio-studio'
    },
    {
      id: 'produtora',
      label: 'PRODUTORA',
      title: 'HMZT PRODUTORA',
      description: 'Editoriais de moda, publicidade e vídeos institucionais sob uma direção criativa rigorosa.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxxCED8XmlkgNbuGiBWOIoL_z8W4KNtk73xn8vQ-iW8GDkkVNi7X1jqkXb6AlWm6RX3cw0DJKVuj64s5VKTwHN4-JRumUk7k1WdMY2xl4wCBNUZM97L1mfESGVn3jK3UxigcDBkEptMRWuiNt9eJwAk9--RWcaUJIgxvPkcjp6XwpOxvSNIzA9LKZ4PXxdt9mmLGG_uMCYlYndBP79YuGkiWMCuzgJDFBDxSMg4BlXyypJqLa3rJCkOY0YCgpUX25kL9KLQuyenBE',
      link: '/portfolio-produtora'
    },
    {
      id: 'agencia',
      label: 'AGÊNCIA',
      title: 'HMZT AGÊNCIA',
      description: 'Branding, desenvolvimento web e estratégias integradas para marcas de alto valor.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9JOvmd61-d55EzR904FOgUgD6XCybSttKhy0e2AuHAcJFi1SIYxiCe0tiIr2GvnpHMiog9GeIBi_w14F-CbUeWoM_knk3_BS8YPNnduZwKZZ0dafgoO95ND97D968qi9tDRQwmL5bsnew3mZb7VpUkAIxCt8wbPRvypRvjcbHp7w9MqqdgMX5Z0dU939Tx5vH0GzHOBwMC-lSn3ZA1ytDq_2yVlpnVme8CsCuDj4cBc63ZO2BrbOQq1tTnWinjn4XJSTR-BUhJKg',
      link: '/portfolio-agencia'
    }
  ]

  return (
    <div className="bg-white text-black selection:bg-black selection:text-white min-h-screen">
      <Header variant="dark" />
      
      <main>
        {/* HERO */}
        <section className="bg-zinc-900 py-64 swiss-grid">
          <div className="max-w-4xl">
            <span className="label-micro text-white/40 mb-8 block">CURADORIA</span>
            <h1 className="hero-title text-white">Selected Projects.</h1>
            <p className="body-text text-white/40 mt-12 max-w-2xl">
              Uma seleção de trabalhos que exemplificam nossa busca por precisão estética e impacto estratégico em cada detalhe.
            </p>
          </div>
        </section>

        {/* PROJECTS LIST */}
        <div className="border-t border-zinc-100">
          {sections.map((section, index) => (
            <section key={section.id} className={`flex flex-col lg:flex-row border-b border-zinc-100 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto relative overflow-hidden bg-zinc-100 grayscale hover:grayscale-0 transition-all duration-1000">
                <img src={section.image} className="w-full h-full object-cover" alt={section.title} />
              </div>
              <div className="w-full lg:w-1/2 p-12 md:p-24 lg:p-40 flex flex-col justify-center">
                <span className="label-micro text-zinc-400 mb-8 block">{section.label}</span>
                <h2 className="section-title mb-12">{section.title}</h2>
                <p className="body-text text-zinc-500 mb-16 max-w-md">{section.description}</p>
                <Link href={section.link} className="btn-swiss w-fit">
                  EXPLORAR PROJETOS
                </Link>
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="bg-white py-40 swiss-grid">
        <div className="flex flex-col items-center text-center">
          <div className="mb-20">
            <span className="hm-logo" style={{fontSize: '32px'}}>
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-8 mb-24">
            <Link className="menu-item text-zinc-400 hover:text-black" href="/">HOME</Link>
            <Link className="menu-item text-zinc-400 hover:text-black" href="/about">SOBRE</Link>
            <Link className="menu-item text-zinc-400 hover:text-black" href="/studio">STUDIO</Link>
            <Link className="menu-item text-zinc-400 hover:text-black" href="/agencia">AGÊNCIA</Link>
            <Link className="menu-item text-zinc-400 hover:text-black" href="/portfolio">PORTFÓLIO</Link>
            <Link className="menu-item text-zinc-400 hover:text-black" href="/contato">CONTATO</Link>
          </nav>
          <div className="label-micro text-zinc-300">
            © 2025 House Mazzutti — Direção de Imagem & Estratégia
          </div>
        </div>
      </footer>
    </div>
  )
}
