import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductCard, isQuoteOnly, type ProductCardProduct } from '@/components/ecommerce/product/ProductCard'

// Mock next/image — em jsdom retorna um <img> simples.
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img src={src} alt={alt} />
  ),
}))

// Mock next/link — passthrough simples.
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

// Mock @/i18n/navigation — é o Link locale-aware que o ProductCard usa de fato.
// Sem isso a cadeia puxa next-intl -> next/navigation, que o pool vmForks do
// vitest não resolve (stub CJS sem extensão dentro do contexto de VM).
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
  redirect: vi.fn(),
}))

function makeProduct(over: Partial<ProductCardProduct> = {}): ProductCardProduct {
  return {
    id: 'p1',
    slug: 'ebook-marketing',
    name: 'Marketing para Modelos — Vol. 01',
    description: 'Ebook digital',
    product_type: 'digital',
    images: ['/img/cover.webp'],
    featured: false,
    store_prices: [
      { unit_amount: 4990, currency: 'brl', price_type: 'one_time', metadata: {} },
    ],
    store_product_categories: [
      { store_categories: { slug: 'academy', name: 'Academy' } },
    ],
    ...over,
  }
}

describe('ProductCard', () => {
  it('renderiza nome, preço BRL e link para /loja/[slug]', () => {
    render(<ProductCard product={makeProduct()} />)
    expect(screen.getByText(/Marketing para Modelos/i)).toBeInTheDocument()
    expect(screen.getByText(/R\$\s?49,90/)).toBeInTheDocument()
    const link = screen.getByTestId('product-card') as HTMLAnchorElement
    expect(link.getAttribute('href')).toBe('/loja/ebook-marketing')
  })

  it('renderiza imagem com alt = nome do produto', () => {
    render(<ProductCard product={makeProduct()} />)
    const img = screen.getByAltText(/Marketing para Modelos/i) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain('/img/cover.webp')
  })

  it('mostra "Solicitar orçamento" quando price tem metadata.quote_only=true', () => {
    const product = makeProduct({
      store_prices: [
        { unit_amount: 0, currency: 'brl', price_type: 'one_time', metadata: { quote_only: 'true' } },
      ],
    })
    render(<ProductCard product={product} />)
    expect(screen.getByText(/Solicitar orçamento/i)).toBeInTheDocument()
  })

  it('mostra badge "Destaque" quando featured=true', () => {
    render(<ProductCard product={makeProduct({ featured: true })} />)
    expect(screen.getByText(/Destaque/i)).toBeInTheDocument()
  })

  it('isQuoteOnly: true apenas quando metadata.quote_only === "true"', () => {
    expect(isQuoteOnly(undefined)).toBe(false)
    expect(isQuoteOnly([])).toBe(false)
    expect(isQuoteOnly([{ unit_amount: 100, currency: 'brl', price_type: 'one_time', metadata: {} }])).toBe(false)
    expect(isQuoteOnly([{ unit_amount: 0, currency: 'brl', price_type: 'one_time', metadata: { quote_only: 'true' } }])).toBe(true)
  })
})
