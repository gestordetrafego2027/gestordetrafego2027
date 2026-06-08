'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/browser';

const SERVICE_LABEL = {
  book: { label: 'Book Profissional', backHref: '/studio/book' },
  ensaio: { label: 'Ensaio Pessoal', backHref: '/studio/ensaio' },
};

export default function StudioCheckoutPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error: err } = await supabase
        .from('store_products')
        .select('id, name, description, images, og_image_url, metadata, store_prices(stripe_price_id, unit_amount, active)')
        .eq('slug', slug)
        .eq('active', true)
        .maybeSingle();

      if (err || !data) { setError('Produto não encontrado.'); setLoading(false); return; }

      const activePrice = data.store_prices?.find(p => p.active);
      if (!activePrice) { setError('Preço indisponível no momento.'); setLoading(false); return; }

      setProduct(data);
      setPrice(activePrice);
      setLoading(false);
    }
    load();
  }, [slug]);

  async function handleCheckout() {
    setCheckoutLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ stripePriceId: price.stripe_price_id, quantity: 1 }],
          locale: 'pt',
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erro ao iniciar pagamento.');
      window.location.href = json.url;
    } catch (e) {
      setError(e.message);
      setCheckoutLoading(false);
    }
  }

  const service = product?.metadata?.service ?? slug?.split('-')[0];
  const serviceInfo = SERVICE_LABEL[service] ?? { label: 'Studio', backHref: '/studio' };
  const coverImage = product?.og_image_url ?? product?.images?.[0];

  const formatBRL = (cents) =>
    (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-6 text-center">
        <div>
          <p className="font-label uppercase tracking-[0.2em] text-[11px] text-zinc-500 mb-4">{error}</p>
          <Link href="/studio" className="font-label uppercase tracking-[0.2em] text-[10px] text-black border-b border-black pb-1">
            ← Voltar ao Studio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      {/* Header mínimo */}
      <div className="border-b border-zinc-200 bg-white px-8 py-5 flex items-center justify-between">
        <Link href="/" className="hm-logo" style={{ fontSize: '20px', color: 'black' }}>
          <span className="hm-house">House</span>
          <span className="hm-mazzutti">Mazzutti</span>
        </Link>
        <span className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400">CHECKOUT SEGURO</span>
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Coluna esquerda — imagem + info */}
        <div>
          {coverImage && (
            <div className="aspect-[4/5] overflow-hidden mb-8">
              <img fetchpriority="high" src={coverImage} alt={product.name} className="w-full h-full object-cover object-center" />
            </div>
          )}
          <span className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 block mb-2">
            HOUSE MAZZUTTI STUDIO · {serviceInfo.label.toUpperCase()}
          </span>
          <h1 className="font-headline text-2xl md:text-3xl text-black tracking-tight mb-4">{product.name}</h1>
          {product.description && (
            <ul className="space-y-2 mt-4">
              {product.description.split(' · ').map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-600 text-sm font-light">
                  <span className="text-black mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Coluna direita — resumo + botão */}
        <div className="md:pt-4">
          <div className="bg-white border border-zinc-200 p-8 mb-6">
            <p className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 mb-6">RESUMO DO PEDIDO</p>
            <div className="flex justify-between items-start mb-4">
              <span className="font-body text-sm text-zinc-700 leading-tight max-w-[60%]">{product.name}</span>
              <span className="font-headline text-lg text-black">{price && formatBRL(price.unit_amount)}</span>
            </div>
            <div className="border-t border-zinc-100 pt-4 flex justify-between items-center">
              <span className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-500">TOTAL</span>
              <span className="font-headline text-2xl text-black">{price && formatBRL(price.unit_amount)}</span>
            </div>
          </div>

          {error && (
            <p className="font-label text-[11px] text-red-600 uppercase tracking-[0.1em] mb-4">{error}</p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="w-full bg-black text-white py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-800 transition-colors disabled:opacity-50 mb-4"
          >
            {checkoutLoading ? 'REDIRECIONANDO...' : 'GARANTIR MEU PACOTE →'}
          </button>

          <p className="font-label text-[9px] uppercase tracking-[0.15em] text-zinc-400 text-center mb-8">
            Pagamento seguro via Stripe · Cartão e Boleto
          </p>

          <Link href={serviceInfo.backHref} className="font-label uppercase tracking-[0.2em] text-[9px] text-zinc-400 hover:text-black transition-colors block text-center">
            ← Voltar para {serviceInfo.label}
          </Link>
        </div>

      </div>
    </main>
  );
}
