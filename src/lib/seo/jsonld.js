// Schema.org global da House Mazzutti (Organization + LocalBusiness + Person).
// Fonte única: @/config/site. NÃO hardcodar NAP/telefone/redes aqui.
// Coordenadas `geo` ficam pendentes até o Google Business Profile.

import {brand, contact, nap, social, leadership, timeline} from '@/config/site'

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
