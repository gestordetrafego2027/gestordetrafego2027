import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/comunidade',
    locale,
    title: 'Comunidade House Mazzutti — Rede de Marca e Imagem',
    description:
      'Uma rede que conecta cuidado, conhecimento e construção de marca em São Paulo. Conheça a Comunidade House Mazzutti.',
  })
}

export default function ComunidadeLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Comunidade', url: `${brand.url}/pt/comunidade/`},
  ])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
