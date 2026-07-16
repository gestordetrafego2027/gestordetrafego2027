export default function robots() {
  // AI crawlers explicitamente permitidos para indexação GEO/AEO.
  // GPTBot (OpenAI), Google-Extended (Gemini/SGE), CCBot (Common Crawl / Anthropic),
  // ClaudeBot (Anthropic), PerplexityBot, meta-externalagent (Meta AI), Applebot-Extended (Apple AI).
  const aiCrawlerRules = [
    'GPTBot',
    'Google-Extended',
    'CCBot',
    'ClaudeBot',
    'PerplexityBot',
    'meta-externalagent',
    'Applebot-Extended',
  ].map((userAgent) => ({
    userAgent,
    allow: '/',
    disallow: ['/crm/', '/api/', '/academy/comunidade/', '/academy/dashboard/', '/academy/certificado/', '/academy/curso/'],
  }))

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Área administrativa
          '/crm/',
          // APIs — não indexar
          '/api/',
          // Autenticação (rotas não-i18n)
          '/login',
          '/logout',
          '/auth/',
          '/verify',
          '/pt/verify/',
          // Área logada — sem e com prefixo de locale /pt/
          '/minha-conta/',
          '/pt/minha-conta/',
          // Checkout e transacionais — sem e com prefixo de locale /pt/
          '/academy/checkout',
          '/academy/comunidade/',
          '/academy/dashboard',
          '/academy/certificado/',
          '/academy/curso/',
          '/checkout/',
          '/pt/checkout/',
          '/carrinho/',
          '/pt/carrinho/',
          // Confirmação de pagamento locale
          '/pt/canoinhas/checkout/',
          '/pt/canoinhas/confirmacao/',
          // Newsletter de cancelamento (transacional)
          '/pt/newsletter/cancelado/',
          // Páginas de sistema (propostas via token — noindex no metadata também)
          '/p/',
          '/pt/p/',
        ],
      },
      ...aiCrawlerRules,
    ],
    sitemap: 'https://housemazzutti.com/sitemap.xml',
  }
}
