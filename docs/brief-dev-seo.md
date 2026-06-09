# Brief Dev — SEO Técnico

> Atualizado: 2026-06-09  
> Destinatário: desenvolvedor responsável pelo projeto housemazzutti.com  
> Não requer deploy urgente — pode ser agrupado em uma PR única.

---

## 0. DNS — NÃO REMOVER o registro TXT

O registro TXT de verificação do domínio (Google Search Console / provedor de e-mail)
**não deve ser removido**. Qualquer limpeza de DNS deve preservar todos os registros do
tipo TXT existentes. Confirmar antes de qualquer alteração de zona.

---

## 1. Sitemap — incluir `/academy` e e-books

### Status atual
`src/app/sitemap.js` já inclui:
- `/academy` (priority 0.8) e landings estáticas do Academy
- Produtos do Academy via query Supabase (`academy_products` onde `status = 'published'`),
  gerando URLs no formato `/pt/academy/{type}/{slug}/`

### O que falta
A query Supabase filtra apenas `type` genérico. E-books têm `type = 'ebook'` (confirmar
na tabela). Verificar se a coluna `type` dos e-books retorna corretamente; se estiver
retornando nulo ou valor diferente, ajustar o `select` ou adicionar filtro explícito.

**Ação:** executar no Supabase (prod `ohmnzalkfbhdivtttzsa`):

```sql
SELECT slug, type, status FROM academy_products ORDER BY type;
```

Se `type` dos e-books não for `'ebook'`, corrigir os registros ou adaptar o mapeamento
de URL no `sitemap.js`. URL canônica esperada: `/pt/academy/ebook/{slug}/`.

---

## 2. Trailing slash — redirecionar variantes sem barra final

### Comportamento correto
Todas as URLs do site terminam com `/` (Next.js já está configurado com
`trailingSlash: true` ou equivalente). Qualquer acesso sem barra final deve retornar
**301** para a versão com barra.

### Ação
Confirmar em `next.config.mjs` que `trailingSlash: true` está ativo.  
Se não estiver, adicionar:

```js
// next.config.mjs
const nextConfig = {
  trailingSlash: true,
  // ... restante
}
```

Após o deploy, testar:
```
curl -I https://housemazzutti.com/pt/blog/<slug>
# Deve retornar 301 → /pt/blog/<slug>/
```

---

## 3. URLs do WordPress — limpar 404s

Durante auditoria foram detectadas URLs antigas do WordPress indexadas ou linkadas
externamente que retornam 404. Exemplos de padrão:

- `/wp-content/...`
- `/wp-admin/...`
- `/?p=...`
- `/feed/`
- `/category/...`
- `/tag/...`

### Ação
Adicionar regras de redirect em `next.config.mjs` → array `redirects`:

```js
async redirects() {
  return [
    // Bloco WordPress — redireciona tudo para home ou página mais próxima
    { source: '/wp-content/:path*', destination: '/', permanent: true },
    { source: '/wp-admin/:path*',   destination: '/', permanent: true },
    { source: '/wp-login.php',      destination: '/', permanent: true },
    { source: '/feed',              destination: '/pt/blog/', permanent: true },
    { source: '/feed/',             destination: '/pt/blog/', permanent: true },
    { source: '/category/:path*',   destination: '/pt/blog/', permanent: true },
    { source: '/tag/:path*',        destination: '/pt/blog/', permanent: true },
    // Query string legada (?p=NNN) — Next não suporta redirect por query param nativo;
    // tratar via middleware (ver nota abaixo) ou aceitar 404 se volume for baixo.
  ]
},
```

> **Nota `?p=NNN`:** Next.js `redirects` não filtra query params. Se o GSC mostrar
> volume relevante nessas URLs, implementar um middleware em
> `src/middleware.ts` que detecta `req.nextUrl.searchParams.has('p')` e redireciona
> para `/pt/blog/`.

---

## Checklist de validação pós-deploy

- [ ] `sitemap.xml` contém pelo menos uma URL `/pt/academy/ebook/...`
- [ ] `curl -I https://housemazzutti.com/pt/blog` retorna 301 para `.../blog/`
- [ ] `curl -I https://housemazzutti.com/wp-content/uploads/foo.jpg` retorna 301
- [ ] `curl -I https://housemazzutti.com/feed` retorna 301
- [ ] Registro TXT do DNS está intacto (verificar no painel do registrador)
- [ ] GSC — re-inspecionar URLs corrigidas após indexação

---

## Contexto adicional

| Item | Arquivo |
|------|---------|
| Sitemap atual | `src/app/sitemap.js` |
| Config Next.js | `next.config.mjs` |
| Middleware (se existir) | `src/middleware.ts` |
| Supabase prod project | `ohmnzalkfbhdivtttzsa` |
