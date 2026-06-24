import {pageMetadata} from '@/lib/seo/metadata'
import {brandingServiceSchema, brandingFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/agencia/branding',
  title: 'Branding & Identidade de Marca em São Paulo | House Mazzutti',
  description:
    'Naming, identidade visual e posicionamento para marcas que precisam ser reconhecidas antes de serem explicadas. Da imersão ao fine art — House Mazzutti, São Paulo.',
})

export default function BrandingLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Agência', url: `${brand.url}/pt/agencia/`},
    {name: 'Branding', url: `${brand.url}/pt/agencia/branding/`},
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(brandingServiceSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(brandingFaqSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
