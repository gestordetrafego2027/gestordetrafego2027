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
        // Coordenadas exatas do pin do GBP (extraídas da URL do Google Maps).
        latitude: '-23.6152908',
        longitude: '-46.6256534',
      },
      hasMap: 'https://www.google.com/maps/place/House+Mazzutti+Ag%C3%AAncia+%26+Produtora/@-23.6152859,-46.6282283,17z',
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
      '@type': 'FAQPage',
      '@id': `${brand.url}/pt/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é a House Mazzutti?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A House Mazzutti é um hub criativo em São Paulo que reúne studio fotográfico, agência de branding e produtora audiovisual sob uma mesma direção criativa, com Angelo Mazzutti.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quais serviços a House Mazzutti oferece?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Branding, identidade visual, gestão de redes sociais, produção audiovisual (fashion film, vídeo institucional, publicidade), fotografia editorial e de moda, books fotográficos e ensaios artísticos.',
          },
        },
        {
          '@type': 'Question',
          name: 'Onde fica o studio da House Mazzutti em São Paulo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O studio está localizado na Rua Oswaldo Aranha, no bairro Saúde, em São Paulo/SP, com atendimento a marcas em todo o Brasil e no exterior.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como contratar a House Mazzutti?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pelo formulário em housemazzutti.com/contato ou pelo WhatsApp. O processo começa com um briefing para entender o projeto antes de qualquer proposta.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quanto custa um book fotográfico na House Mazzutti?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Os pacotes de book no Studio da House Mazzutti variam conforme o escopo — número de looks, locação e direção criativa. Consulte os pacotes em housemazzutti.com/studio/book/ para valores detalhados.',
          },
        },
      ],
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
