// Schema.org global da House Mazzutti (Organization + LocalBusiness + Person).
// Fonte única: @/config/site. NÃO hardcodar NAP/telefone/redes aqui.
// Coordenadas `geo` ficam pendentes até o Google Business Profile.

import {brand, contact, nap, social, leadership, timeline, cnpj} from '@/config/site'

const sameAs = Object.values(social).map((c) => c.url)
const streetAddress = `${nap.street} - ${nap.neighborhood}`

export const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${brand.url}/#organization`,
      name: brand.name,
      alternateName: [...brand.alternateNames],
      url: `${brand.url}/pt/`,
      logo: brand.logo,
      description: brand.tagline,
      foundingDate: String(timeline.foundedYear),
      taxID: cnpj,
      founder: {'@id': `${brand.url}/pt/angelo/#angelo`},
      areaServed: {'@type': 'City', name: nap.city},
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contact.phone,
        email: contact.email,
        contactType: 'customer support',
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
      },
      sameAs,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${brand.url}/#localbusiness`,
      name: brand.name,
      image: brand.logo,
      url: `${brand.url}/pt/`,
      telephone: contact.phone,
      email: contact.email,
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality: nap.city,
        addressRegion: nap.region,
        postalCode: nap.postalCode,
        addressCountry: nap.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        // Coordenadas via OpenStreetMap — confirmar com o pin exato do GBP.
        // No Google Maps: clique no pin do negócio → URL mostra @lat,lon.
        latitude: '-23.6181267',
        longitude: '-46.6325313',
      },
      hasMap: 'https://maps.google.com/?q=House+Mazzutti+Rua+General+Chagas+Santos+1058+Bosque+da+Saude+Sao+Paulo',
      areaServed: {'@type': 'City', name: nap.city},
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs,
    },
    {
      '@type': 'Person',
      '@id': `${brand.url}/pt/angelo/#angelo`,
      name: leadership.angelo.name,
      jobTitle: leadership.angelo.role,
      worksFor: {'@id': `${brand.url}/#organization`},
      url: `${brand.url}/pt/angelo/`,
      knowsAbout: [
        'Branding',
        'Direção Criativa',
        'Fotografia',
        'Produção Audiovisual',
        'Direção de Arte',
      ],
      sameAs: [social.instagram.url, social.linkedin.url],
    },
  ],
}
