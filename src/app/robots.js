export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/crm/',
          '/api/',
          '/academy/checkout',
          '/academy/checkout/',
          '/academy/dashboard',
          '/academy/certificado/',
          '/login',
        ],
      },
    ],
    sitemap: 'https://housemazzutti.com/sitemap.xml',
  }
}
