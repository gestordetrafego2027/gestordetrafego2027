import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand, contact} from '@/config/site'

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${brand.url}/pt/contato/#contactpage`,
  name: 'Contato — House Mazzutti',
  description: 'Fale com a House Mazzutti em São Paulo: books, branding e campanhas. Respondemos em até 1 dia útil.',
  url: `${brand.url}/pt/contato/`,
  mainEntity: {'@id': `${brand.url}/#organization`},
  contactOption: [
    {
      '@type': 'ContactPoint',
      telephone: contact.phone,
      email: contact.email,
      contactType: 'customer support',
      areaServed: 'BR',
      availableLanguage: ['Portuguese'],
    },
  ],
  inLanguage: 'pt-BR',
}

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/contato',
    locale,
    title: 'Contato — House Mazzutti | Studio, Agência e Produtora SP',
    description:
      'Fale com a House Mazzutti em São Paulo: books, branding e campanhas. Respondemos em até 1 dia útil.',
  })
}

export default function ContatoLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Contato', url: `${brand.url}/pt/contato/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(contactPageSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
