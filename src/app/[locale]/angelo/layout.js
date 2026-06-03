import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand, leadership, social} from '@/config/site'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${brand.url}/pt/angelo/#angelo`,
  name: leadership.angelo.name,
  jobTitle: 'Diretor Criativo',
  description: leadership.angelo.bio,
  worksFor: {'@id': `${brand.url}/#organization`},
  url: `${brand.url}/pt/angelo/`,
  image: `${brand.url}/images/angelo/angelo-mazzutti.webp`,
  knowsAbout: [
    'Branding',
    'Direção Criativa',
    'Fotografia',
    'Produção Audiovisual',
    'Direção de Arte',
    'Identidade Visual',
  ],
  sameAs: [social.instagram.url, social.linkedin.url],
}

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/angelo',
    locale,
    title: 'Angelo Mazzutti — Diretor Criativo e de Imagem | HMZT',
    description:
      '15 anos de audiovisual e direção de imagem para grandes marcas e celebridades. Conheça o diretor por trás da House Mazzutti.',
  })
}

export default function AngeloLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Angelo Mazzutti', url: `${brand.url}/pt/angelo/`},
  ])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(personSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
