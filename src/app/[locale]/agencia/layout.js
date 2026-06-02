import {pageMetadata} from '@/lib/seo/metadata'
import {agenciaServiceSchema, agenciaFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/agencia',
    locale,
    title: 'Agência de Branding e Direção Criativa em São Paulo',
    description:
      'Branding, web e comunicação para marcas que querem presença com estratégia. Direção criativa autoral da House Mazzutti em SP.',
  })
}

export default function AgenciaLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Agência', url: `${brand.url}/pt/agencia/`},
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(agenciaServiceSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(agenciaFaqSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
