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
      numberOfEmployees: {'@type': 'QuantitativeValue', value: 5},
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
        {
          '@type': 'Question',
          name: 'Quem é o fundador da House Mazzutti?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A House Mazzutti foi fundada por Angelo Mazzutti, diretor criativo com 20 anos de ofício em audiovisual e direção de imagem. Angelo dirige cada projeto pessoalmente, da estratégia ao set.',
          },
        },
        {
          '@type': 'Question',
          name: 'A House Mazzutti faz fashion film?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. A Produtora House Mazzutti realiza fashion films para marcas de moda, beleza e joalheria em São Paulo. Cada produção começa com conceito criativo e é dirigida por Angelo Mazzutti do briefing ao master final.',
          },
        },
        {
          '@type': 'Question',
          name: 'A House Mazzutti atende marcas de outros estados?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Embora baseada em São Paulo, a House Mazzutti atende marcas e projetos em todo o Brasil. A base operacional é SP, mas produções externas são avaliadas por agenda e escopo.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre o Studio, a Agência e a Produtora da House Mazzutti?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O Studio cuida de fotografia editorial — books, ensaios pessoais e coberturas. A Agência cuida de branding, identidade visual e comunicação de marca. A Produtora cuida de campanhas audiovisuais — fashion film, vídeo institucional e publicidade. As três unidades operam sob uma mesma direção criativa.',
          },
        },
        {
          '@type': 'Question',
          name: 'House Mazzutti tem escola ou academia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. A House Mazzutti Academy oferece o Inside Out, um programa presencial de formação em direção de imagem e produção audiovisual para fotógrafos e profissionais do mercado criativo em São Paulo.',
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
        'Direção Criativa',
        'Branding',
        'Direção de Imagem',
        'Produção Audiovisual',
        'Fotografia Editorial',
        'Fashion Film',
        'Identidade Visual',
        'Posicionamento de Marca',
        'Set Design',
      ],
      sameAs,
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Diretor Criativo',
        occupationLocation: {'@type': 'City', name: 'São Paulo'},
      },
      founderOf: {'@id': `${brand.url}/#organization`},
    },
  ],
}
