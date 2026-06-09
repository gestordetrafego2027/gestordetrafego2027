import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { getProductBySlug, formatPriceBRL } from '@/lib/academy/queries'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }) {
  const { type, slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Produto — House Mazzutti Academy' }
  const canonicalUrl = `https://housemazzutti.com/academy/${type}/${slug}/`
  return {
    title: `${product.seo_title || product.title} — House Mazzutti Academy`,
    description: product.seo_description || product.short_description || product.subtitle || '',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: product.seo_title || product.title,
      description: product.seo_description || product.short_description || '',
      url: canonicalUrl,
      siteName: 'House Mazzutti Academy',
      type: 'website',
      images: product.og_image_url
        ? [{ url: product.og_image_url, width: 1200, height: 630, alt: product.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seo_title || product.title,
      description: product.seo_description || product.short_description || '',
    },
  }
}

export default async function ProductPage({ params }) {
  const { type, slug } = await params
  const product = await getProductBySlug(slug)
  if (!product || product.type !== type) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isEnrolled = false
  if (user) {
    const { data } = await supabase.rpc('fn_user_has_active_enrollment', {
      p_user_id: user.id,
      p_product_id: product.id,
    })
    isEnrolled = data === true
  }

  const hasDiscount =
    product.original_price_cents && product.original_price_cents > product.price_cents
  const highlights = Array.isArray(product.highlights) ? product.highlights : []
  const requirements = Array.isArray(product.requirements) ? product.requirements : []

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        {/* HERO PRODUTO */}
        <section className="bg-neutral-900 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Link href="/academy" className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white">
                ← Academy
              </Link>
              <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-wide">
                <span className="rounded-full bg-white/10 px-3 py-1">{product.type}</span>
                {product.level && product.level !== 'todos' && (
                  <span className="rounded-full bg-white/10 px-3 py-1">{product.level}</span>
                )}
                {product.bestseller && (
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-amber-200">+ vendido</span>
                )}
              </div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{product.title}</h1>
              {product.subtitle && (
                <p className="mt-4 text-xl text-neutral-300">{product.subtitle}</p>
              )}
              {product.short_description && (
                <p className="mt-6 max-w-2xl text-base text-neutral-400">{product.short_description}</p>
              )}
              {product.author && (
                <p className="mt-8 text-sm text-neutral-400">
                  por <span className="text-white">{product.author.pen_name || 'House Mazzutti'}</span>
                </p>
              )}
            </div>

            {/* CARD DE COMPRA */}
            <aside className="rounded-2xl bg-white p-6 text-neutral-900 shadow-xl">
              {product.cover_url && (
                <img
                  src={product.cover_url}
                  alt={product.title}
                  className="mb-5 aspect-[16/10] w-full rounded-xl object-cover"
                />
              )}
              <div className="mb-6">
                {hasDiscount && (
                  <div className="text-sm text-neutral-400 line-through">
                    {formatPriceBRL(product.original_price_cents)}
                  </div>
                )}
                <div className="text-3xl font-semibold">
                  {product.price_cents === 0 ? 'Grátis' : formatPriceBRL(product.price_cents)}
                </div>
                {product.access_duration_days && (
                  <p className="mt-1 text-xs text-neutral-500">
                    Acesso por {product.access_duration_days} dias
                  </p>
                )}
                {!product.access_duration_days && (
                  <p className="mt-1 text-xs text-neutral-500">Acesso vitalício</p>
                )}
              </div>

              {isEnrolled ? (
                <Link
                  href={
                    product.type === 'course'
                      ? `/academy/curso/${product.slug}`
                      : '/academy/dashboard'
                  }
                  className="block w-full rounded-xl bg-emerald-600 px-6 py-3 text-center text-base font-medium text-white transition hover:bg-emerald-700"
                >
                  Acessar conteúdo
                </Link>
              ) : user ? (
                <Link
                  href={`/academy/checkout?product=${product.id}`}
                  className="block w-full rounded-xl bg-neutral-900 px-6 py-3 text-center text-base font-medium text-white transition hover:bg-neutral-800"
                >
                  Comprar agora
                </Link>
              ) : (
                <Link
                  href={`/login?redirect=/academy/${product.type}/${product.slug}`}
                  className="block w-full rounded-xl bg-neutral-900 px-6 py-3 text-center text-base font-medium text-white transition hover:bg-neutral-800"
                >
                  Entrar para comprar
                </Link>
              )}

              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                {product.type === 'course' && product.lesson_count > 0 && (
                  <li>• {product.lesson_count} aulas em {product.module_count} módulos</li>
                )}
                {product.duration_minutes && (
                  <li>• {Math.round(product.duration_minutes / 60)}h de conteúdo</li>
                )}
                {product.type === 'ebook' && product.page_count && (
                  <li>• {product.page_count} páginas em PDF</li>
                )}
                <li>• Pagamento via Pix, cartão ou boleto</li>
                <li>• Suporte direto da House Mazzutti</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* DESCRIÇÃO LONGA + HIGHLIGHTS */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold text-neutral-900">O que você vai aprender</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-neutral-700">
                      <span className="text-emerald-600">✓</span>
                      <span>{typeof h === 'string' ? h : h.text || JSON.stringify(h)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.long_description && (
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold text-neutral-900">Sobre</h2>
                <div className="prose prose-neutral max-w-none text-neutral-700">
                  {renderLongDescription(product.long_description)}
                </div>
              </div>
            )}

            {requirements.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Pré-requisitos</h2>
                <ul className="space-y-2 text-neutral-700">
                  {requirements.map((r, i) => (
                    <li key={i}>• {typeof r === 'string' ? r : r.text || JSON.stringify(r)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AUTHOR CARD */}
          {product.author && (
            <aside className="self-start rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="mb-3 text-sm uppercase tracking-widest text-neutral-500">Sobre o autor</h3>
              <p className="text-lg font-semibold text-neutral-900">
                {product.author.pen_name || 'House Mazzutti'}
              </p>
              {product.author.headline && (
                <p className="mt-1 text-sm text-neutral-600">{product.author.headline}</p>
              )}
              {product.author.bio_long && (
                <p className="mt-4 text-sm text-neutral-700">{product.author.bio_long}</p>
              )}
            </aside>
          )}
        </section>
      </main>
    </>
  )
}

function renderLongDescription(desc) {
  // long_description é jsonb (TipTap/Lexical) ou string. MVP: tenta string, depois JSON.
  if (typeof desc === 'string') {
    return desc.split('\n\n').map((p, i) => <p key={i}>{p}</p>)
  }
  if (desc && typeof desc === 'object') {
    // TipTap: { type: 'doc', content: [...] }. Extrai texto plano.
    const text = extractPlainText(desc)
    return text.split('\n\n').map((p, i) => <p key={i}>{p}</p>)
  }
  return null
}

function extractPlainText(node) {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractPlainText).join(' ')
  if (node.text) return node.text
  if (node.content) return extractPlainText(node.content)
  return ''
}
