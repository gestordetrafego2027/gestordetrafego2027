# Performance e assets — House Mazzutti

Guia operacional da varredura de imagens, links e vídeos. O inventário completo,
com arquivo e linha, está em [`AUDIT_REPORT.md`](AUDIT_REPORT.md); o que ficou
pendente de decisão está em [`BROKEN_IMAGES_TODO.md`](BROKEN_IMAGES_TODO.md).

---

## ⛔ Primeiro: `www.housemazzutti.com` está fora do ar

Quem digita `www.` bate em tela de erro do navegador e não entra no site.

Medido em 2026-09-01, direto no servidor:

| Host | DNS | Certificado servido | HTTP |
|---|---|---|---|
| `housemazzutti.com` | 31.97.17.85 | Let's Encrypt, SAN = `housemazzutti.com` | 307 → `/pt/` ✅ |
| `www.housemazzutti.com` | 31.97.17.85 | `CN=TRAEFIK DEFAULT CERT` (autoassinado) | 503 |
| `app.housemazzutti.com` | sem registro | — | — |

O DNS do `www` aponta certo. O que falta é o Traefik do Coolify não ter router
para esse host: devolve o certificado padrão (`NET::ERR_CERT_AUTHORITY_INVALID`)
e, ignorando o TLS, um 503. Causa: nos Domains da aplicação está cadastrado só
`https://housemazzutti.com`, então o Let's Encrypt nunca emitiu certificado
cobrindo o `www`.

**Isso não tem correção no código.** O erro de TLS acontece antes de qualquer
requisição chegar ao Next.

### Como corrigir (painel do Coolify)

1. Aplicação → **Configuration → Domains**
2. Trocar o valor para os dois nomes, separados por vírgula:
   `https://housemazzutti.com,https://www.housemazzutti.com`
3. Salvar → **Redeploy**. O Traefik pede um certificado novo cobrindo os dois.
4. Conferir:

```bash
curl -sI https://www.housemazzutti.com/ | head -1
```

Deve responder `HTTP/2 308` (o redirect para o apex), não erro de certificado.

O redirect `www` → apex já está em `next.config.mjs` e entra em ação sozinho
assim que o certificado existir. Antes disso ele é inerte.

Confirme também se `app.housemazzutti.com` deveria existir — hoje não tem
registro DNS nenhum.

---

## O que foi feito nesta varredura

**Auditoria.** `scripts/audit-assets.cjs` mapeia toda referência de mídia em
`src/**` (fora de `crm/`, `api/`, `pages_backup/`), cruza com os arquivos reais
de `/public` e classifica cada uma: exata, case diferente, extensão diferente,
caminho recuperável ou inexistente. Também valida links internos contra a árvore
de rotas, os redirects do `next.config.mjs` e os redirects do middleware.

O matcher de rotas carrega um self-test: rotas propositalmente inexistentes
precisam falhar. Sem ele a primeira versão reportava zero links quebrados porque
o redirect `/:year(\d{4})/:path*` colapsava para `^/[^/]+/.*` e casava com tudo.

**Caminhos corrigidos.** Nenhum problema de maiúsculas ou de extensão — a
preocupação com Mac vs Linux não se confirmou. O que existia era caminho
apontando para pasta errada: thumbnails de JSON-LD em `/produtora/moda/<slug>/`
para projetos que moram em `acessorios/`, `beleza/` ou `institucional/`;
`/images/sobre/` para uma pasta que virou `/images/about/`; e referências sem o
nível de categoria.

**OG e logo.** A auditoria descartava como "externa" toda URL começando com
`http`, inclusive as do próprio domínio — 131 referências invisíveis, 6 delas
quebradas, entre elas o `logo` do schema Organization e as `og:image` das duas
landings de workshop.

**Fallbacks do blog.** Os fallbacks quebrados em `articles.js` foram repontados
para imagens reais do mesmo tema, fechando os 36 buracos visíveis sem tocar em
nenhum `src`.

**next/image.** 21 das 72 tags `<img>` migraram. As 55 restantes têm o motivo
escrito acima da tag.

**Vídeos.** Os 14 têm `preload` e `playsInline`; 13 têm poster.

**Cache.** `CDN-Cache-Control` nos assets de `/public`, regra explícita para
`/_next/static` e para `/_next/image`.

---

## Scripts

Os três são idempotentes e nenhum roda sozinho.

### `scripts/audit-assets.cjs` — auditoria (somente leitura)

```bash
node scripts/audit-assets.cjs
```

Regenera `AUDIT_REPORT.md` e `BROKEN_IMAGES_TODO.md`. Não altera nada do
projeto. Rode depois de produzir imagens novas, mexer em caminhos ou adicionar
páginas.

### `scripts/optimize-videos.js` — recomprime vídeos

`/public/videos` pesa 406 MB. `beatco-moda.mp4` tem 91 MB e
`depoimentos-inside-out.mp4` tem 90 MB, ambos servidos direto pelo Next, sem CDN
de vídeo.

```bash
node scripts/optimize-videos.js
```

Dry-run: lista os arquivos e o que seria gerado. Funciona sem ffmpeg.

```bash
node scripts/optimize-videos.js --apply
```

Gera, ao lado de cada `nome.mp4`, um `nome-optimized.mp4` (H.264, CRF 24,
faststart, no máximo 1920px) e um `nome-poster.jpg` (frame de 1s, 1280px).
**Não substitui o original e não altera o código** — depois de conferir o
resultado você troca os caminhos à mão.

Opções: `--only arquivo.mp4`, `--crf 26`, `--max-width 1440`.

Precisa de ffmpeg para `--apply`:

```bash
brew install ffmpeg
```

### `scripts/rename-to-kebab.js` — normaliza nomes de arquivo

19 arquivos em `/public` têm maiúscula, underscore ou ponto no meio do nome —
quase todos as fontes Roc Grotesk. Nenhum está quebrado hoje; o script é
preventivo, para que um `Capa.JPG` referenciado como `capa.jpg` não passe pelo
Mac e caia só no Linux.

```bash
node scripts/rename-to-kebab.js
```

Dry-run. Aborta se dois arquivos fossem colidir no mesmo nome.

```bash
node scripts/rename-to-kebab.js --apply --update-code
```

Renomeia **e** atualiza as referências em `src/**`. Rodar `--apply` sem
`--update-code` renomeia os arquivos e quebra todas as referências de uma vez.

Rode `node scripts/audit-assets.cjs` depois, sempre.

---

## Purgar o cache do Cloudflare após deploy

Os assets de `/public` são servidos com `max-age=31536000, immutable`. Isso é
seguro porque cada caminho é fixo e o conteúdo é trocado por arquivo novo, não
por sobrescrita. **Se você sobrescrever um arquivo mantendo o mesmo nome**, o
cache antigo continua valendo por um ano — aí o purge é obrigatório.

No painel: **Caching → Configuration → Purge Cache**. Prefira *Custom Purge*
com as URLs alteradas; *Purge Everything* joga fora o cache do site inteiro e a
primeira visita de todo mundo fica lenta.

Por API:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://housemazzutti.com/images/home/banner-1.webp"]}'
```

Imagens otimizadas (`/_next/image`) carregam `url`, `w` e `q` na query — ao
purgar uma imagem de origem, purgue também as variantes, ou use *Purge by
prefix* em `/_next/image`.

Detalhe medido com `next start`: o Next monta o `Cache-Control` de
`/_next/image` a partir do header do arquivo de origem, então o `max-age` que
chega ao navegador é o de `/public` (1 ano), não o `2592000` declarado na regra.
Só o `must-revalidate` vale ali. O `CDN-Cache-Control` passa intacto e é ele que
governa a borda. Se o TTL do navegador precisar cair, mexa no `max-age` dos
assets de `/public`.

---

## Como medir

**Lighthouse.** DevTools → Lighthouse → Mobile + Performance. Sempre em janela
anônima e contra produção, nunca contra `npm run dev` — o dev server não
pré-otimiza imagem e derruba o número artificialmente.

```bash
npx lighthouse https://housemazzutti.com/pt/ --preset=desktop --view
```

**DevTools → Network.** Filtre por *Img*, marque *Disable cache*, recarregue.
O que olhar:

- `Type` deve ser `avif` ou `webp` — se aparecer `jpeg`/`png` numa imagem de
  `/public`, ela não passou pelo `next/image`.
- `Size` de cada imagem contra o tamanho renderizado. Baixar 1920px para exibir
  em 400px significa `sizes` errado.
- `Cache-Control` na aba Headers.

**WebPageTest.** [webpagetest.org](https://www.webpagetest.org), local São
Paulo, conexão 4G. É o cenário real do público do site e é onde o peso dos
vídeos aparece.

**Verificar os headers de cache:**

```bash
curl -sI https://housemazzutti.com/images/home/banner-1.webp | grep -i cache
```

---

## Pendências

1. **93 imagens de artigo que não existem**, em 36 artigos. O `fallback` cobre a
   tela, mas o Open Graph usa `cover.src` direto e continua quebrado —
   compartilhar esses artigos no WhatsApp ou LinkedIn não mostra imagem. Lista
   por artigo em `BROKEN_IMAGES_TODO.md`; o fluxo é `foto-artigo-blog <slug>`.
2. **`/pt/portfolio-produtora/splash-boutique/`** renderiza uma galeria vazia:
   as 6 imagens não existem em `/public`, e o `thumbnailUrl` do JSON-LD desse
   projeto também aponta para arquivo inexistente.
3. **672 arquivos órfãos, 161 MB** em `/public`, listados no relatório. Nada foi
   removido. `/public/images-backup/` sozinho responde por boa parte.
4. **Vídeos** — rodar `scripts/optimize-videos.js`.
5. **Google Ads bloqueado pela própria CSP.** O console acusa
   `pagead2.googlesyndication.com` recusado pelo `connect-src` em toda página. A
   tag de conversão `AW-10839122958` não está registrando nada. Para liberar,
   adicione o host ao `connect-src` e ao `script-src` em `next.config.mjs` —
   deixei fora desta varredura por ser decisão de tracking, não de assets.
6. **`npm run lint` não roda** neste checkout: `node_modules/object.values` está
   sem `index.js` e derruba o plugin react do `eslint-config-next`. Falha
   idêntica no commit anterior a esta auditoria, então não veio dela. Resolve
   reinstalando as dependências.
