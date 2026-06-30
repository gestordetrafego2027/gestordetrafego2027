import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { formatBRL } from '@/lib/format/price'

export type ProductCardPrice = {
  unit_amount: number
  currency: string
  price_type: string
  metadata?: { quote_only?: string }
}

export type ProductCardCategory = { slug: string; name: string }

export type ProductCardProduct = {
  id: string
  slug: string
  name: string
  description: string | null
  product_type: string
  images: string[]
  featured: boolean
  store_prices: ProductCardPrice[]
  store_product_categories?: { store_categories: ProductCardCategory }[]
}

export function isQuoteOnly(prices: ProductCardPrice[] | undefined): boolean {
  return prices?.[0]?.metadata?.quote_only === 'true'
}

/**
 * Card de produto da /loja. Server component (compatível com SSG).
 * Toda a tipografia/cor segue o sistema da House Mazzutti.
 */
export function ProductCard({ product }: { product: ProductCardProduct }) {
  const price = product.store_prices?.[0]
  const image = product.images?.[0] ?? null
  const quoteOnly = isQuoteOnly(product.store_prices)
  const category = product.store_product_categories?.[0]?.store_categories

  return (
    <Link
      href={`/loja/${product.slug}`}
      data-testid="product-card"
      className="group block rounded-xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-400 transition-all duration-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-50">
            <span className="text-4xl" aria-hidden>
              {product.product_type === 'service'
                ? '✦'
                : product.product_type === 'digital'
                  ? '◈'
                  : '◻'}
            </span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4">
        {category && (
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
            {category.name}
          </span>
        )}
        <h3 className="font-semibold text-neutral-900 leading-snug mt-0.5 mb-1 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{product.description}</p>
        )}
        {quoteOnly ? (
          <span className="inline-block text-xs font-medium text-neutral-600 border border-neutral-300 rounded-full px-3 py-0.5">
            Solicitar orçamento
          </span>
        ) : price ? (
          <p className="text-base font-bold text-neutral-900">
            {formatBRL(price.unit_amount, price.currency)}
            {price.price_type === 'recurring' && (
              <span className="text-xs font-normal text-neutral-400 ml-1">/mês</span>
            )}
          </p>
        ) : null}
      </div>
    </Link>
  )
}
