export default function robots() {
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
          // Autenticação
          '/login',
          '/logout',
          '/auth/',
          '/verify',
          // Área logada
          '/minha-conta/',
          '/minha-conta/dados',
          '/minha-conta/pedidos',
          '/minha-conta/lgpd',
          // Checkout e transacionais
          '/academy/checkout',
          '/academy/checkout/',
          '/academy/dashboard',
          '/academy/certificado/',
          '/checkout/',
          '/carrinho/',
          '/obrigado',
          // Páginas de sistema
          '/p/',
        ],
      },
    ],
    sitemap: 'https://housemazzutti.com/sitemap.xml',
  }
}
