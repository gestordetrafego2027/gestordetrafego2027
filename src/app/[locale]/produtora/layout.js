import {pageMetadata} from '@/lib/seo/metadata'
import {produtoraServiceSchema, produtoraFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/produtora',
    locale,
    title: 'Produtora de Moda, Beleza e Publicidade em São Paulo',
    description:
      'Produção executiva, casting e set design para campanhas de moda, beleza e institucional. Produtora da House Mazzutti em SP.',
    image: { src: '/images/produtora/moda/hero.webp', alt: 'Produtora House Mazzutti — Moda, Beleza e Publicidade em São Paulo' },
  })
}

export default function ProdutoraLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(produtoraServiceSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(produtoraFaqSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
