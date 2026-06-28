import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { formatPriceBRL } from '@/lib/academy/queries'

const TYPE_LABEL = {
  ebook: 'Ebook',
  course: 'Curso',
  mentorship: 'Mentoria',
  community_access: 'Comunidade',
  live_event: 'Live',
  bundle: 'Combo',
  subscription: 'Assinatura',
}

export default function ProductCard({ product }) {
  if (!product) return null
  const hasDiscount =
    product.original_price_cents && product.original_price_cents > product.price_cents
  return (
    <Link
      href={`/academy/${product.type}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      {product.cover_url ? (
        <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 relative">
          <Image
            src={product.cover_url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={80}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] w-full bg-neutral-100" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-500">
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-medium text-neutral-700">
            {TYPE_LABEL[product.type] || product.type}
          </span>
          {product.bestseller && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
              + vendido
            </span>
          )}
          {product.new_release && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
              Novidade
            </span>
          )}
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold text-neutral-900">{product.title}</h3>
        {product.subtitle && (
          <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{product.subtitle}</p>
        )}

        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            {hasDiscount && (
              <div className="text-xs text-neutral-400 line-through">
                {formatPriceBRL(product.original_price_cents)}
              </div>
            )}
            <div className="text-xl font-semibold text-neutral-900">
              {product.price_cents === 0 ? 'Grátis' : formatPriceBRL(product.price_cents)}
            </div>
          </div>
          {product.avg_rating > 0 && (
            <div className="text-xs text-neutral-500">
              ★ {Number(product.avg_rating).toFixed(1)} ({product.rating_count})
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
