import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

function fmt(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

const TYPE_LABEL: Record<string, string> = {
  digital: 'Digital',
  service: 'Serviço',
  physical: 'Físico',
  bundle: 'Bundle',
}
const TYPE_COLOR: Record<string, string> = {
  digital: 'bg-blue-50 text-blue-700',
  service: 'bg-purple-50 text-purple-700',
  physical: 'bg-amber-50 text-amber-700',
  bundle: 'bg-emerald-50 text-emerald-700',
}

export default async function CatalogoAdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const md = (user?.app_metadata ?? {}) as { role?: string }
  if (md.role !== 'admin') redirect('/crm')

  const { data: products } = await supabase
    .from('store_products')
    .select(
      `
      id, slug, name, product_type, active, featured,
      store_prices ( id, unit_amount, currency, active, metadata ),
      store_product_categories ( store_categories ( name ) )
    `,
    )
    .order('created_at', { ascending: false })

  const { data: cats } = await supabase
    .from('store_categories')
    .select('id, slug, name')
    .order('display_order')

  // Contagens por tipo
  const active = products?.filter((p) => p.active).length ?? 0
  const inactive = (products?.length ?? 0) - active

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Catálogo</h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            {active} ativos · {inactive} inativos
          </p>
        </div>
        <a
          href="https://dashboard.stripe.com/test/products"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-700 transition-colors"
        >
          Gerenciar no Stripe ↗
        </a>
      </div>

      {/* Filtro por categoria */}
      {cats && cats.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {cats.map((c) => (
            <span
              key={c.id}
              className="px-3 py-1 text-xs border border-neutral-200 rounded-full text-neutral-600"
            >
              {c.name}
            </span>
          ))}
        </div>
      )}

      {/* Grid de produtos */}
      <div className="grid gap-3">
        {!products?.length ? (
          <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
            <p className="text-sm text-neutral-400">Nenhum produto no catálogo.</p>
          </div>
        ) : (
          products.map((product) => {
            const prices = (product.store_prices as any[]) ?? []
            const mainPrice = prices.find((p: any) => p.active) ?? prices[0]
            const isQuoteOnly = mainPrice?.metadata?.quote_only === 'true'
            const cats =
              (product.store_product_categories as any[])
                ?.map((pc: any) => pc.store_categories?.name)
                .filter(Boolean) ?? []

            return (
              <div
                key={product.id}
                className={`bg-white rounded-2xl border overflow-hidden flex items-center gap-4 px-5 py-4 ${product.active ? 'border-neutral-100' : 'border-dashed border-neutral-200 opacity-60'}`}
              >
                {/* Status indicator */}
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${product.active ? 'bg-green-500' : 'bg-neutral-300'}`}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-neutral-900 truncate">
                      {product.name}
                    </p>
                    {product.featured && (
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                        destaque
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLOR[product.product_type] ?? 'bg-neutral-100 text-neutral-600'}`}
                    >
                      {TYPE_LABEL[product.product_type] ?? product.product_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <p className="text-xs text-neutral-400 font-mono">/loja/{product.slug}</p>
                    {cats.map((c: string) => (
                      <span key={c} className="text-xs text-neutral-400">
                        · {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preço */}
                <div className="text-right flex-shrink-0">
                  {mainPrice ? (
                    isQuoteOnly ? (
                      <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded-lg">
                        Orçamento
                      </span>
                    ) : (
                      <p className="text-sm font-bold text-neutral-900">
                        {fmt(mainPrice.unit_amount)}
                      </p>
                    )
                  ) : (
                    <span className="text-xs text-neutral-300">sem preço</span>
                  )}
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {prices.length} preço{prices.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Link para ver no site */}
                <Link
                  href={`/loja/${product.slug}`}
                  target="_blank"
                  className="text-neutral-300 hover:text-neutral-700 transition-colors ml-2 flex-shrink-0"
                  title="Ver na loja"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            )
          })
        )}
      </div>

      <p className="text-xs text-neutral-400 text-center">
        Produtos e preços são gerenciados diretamente no Stripe Dashboard e sincronizados via
        webhook ou script de sync.
      </p>
    </div>
  )
}
