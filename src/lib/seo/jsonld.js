// Schema.org global da House Mazzutti (Organization + LocalBusiness + Person).
// Fonte única: @/config/site. NÃO hardcodar NAP/telefone/redes aqui.
// GBP: House Mazzutti Agência & Produtora · 5.0 ⭐ (32 avaliações) · Serviço de fotografia
// Plus Code: 99MF+VP Bosque da Saúde, São Paulo - SP

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
      alternateName: ['HouseMazzutti', 'HMZT', 'House Mazzutti Agência & Produtora'],
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
      name: 'House Mazzutti Agência & Produtora',
      // Nome exato do GBP — deve bater com o perfil do Google Business.
      alternateName: brand.name,
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
        // Coordenadas OSM — bater com o pin exato do GBP via Maps URL @lat,lon
        latitude: '-23.6165731',
        longitude: '-46.6288975',
      },
      hasMap: 'https://maps.app.goo.gl/housemazzutti',
      // AggregateRating do GBP em 2026-06-03 · atualizar trimestralmente.
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '32',
        bestRating: '5',
        worstRating: '1',
      },
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
