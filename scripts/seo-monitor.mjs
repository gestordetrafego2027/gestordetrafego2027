#!/usr/bin/env node
/**
 * SEO Monitor — House Mazzutti
 * Roda semanalmente via cron e imprime relatório de saúde SEO.
 *
 * Instalar dependências: npm install node-fetch (se Node < 18, senão fetch nativo)
 * Cron semanal: 0 9 * * 1 cd ~/Desktop/gestordetrafego2027 && node scripts/seo-monitor.mjs >> logs/seo-monitor.log 2>&1
 */

const SITE = 'https://housemazzutti.com'
const DATE = new Date().toISOString().slice(0, 10)

const PAGES = [
  { url: '/pt/',          title: 'House Mazzutti — Direção Criativa e Branding em São Paulo', schemas: ['Organization', 'ProfessionalService', 'Person'] },
  { url: '/pt/agencia/',  title: 'Agência de Branding e Direção Criativa em São Paulo',       schemas: ['Service', 'FAQPage', 'BreadcrumbList'] },
  { url: '/pt/studio/',   title: 'Studio HMZT — Book, Ensaio e Direção de Imagem em SP',      schemas: ['Service', 'FAQPage', 'BreadcrumbList'] },
  { url: '/pt/produtora/',title: 'Produtora de Moda, Beleza e Publicidade em São Paulo',      schemas: ['Service', 'FAQPage', 'BreadcrumbList'] },
  { url: '/pt/angelo/',   title: 'Angelo Mazzutti — Diretor Criativo | House Mazzutti',        schemas: ['Person', 'BreadcrumbList'] },
  { url: '/pt/blog/book-para-modelos-quem-e-escolhido/', title: 'Book para Modelos: o que define quem é escolhido | House Mazzutti', schemas: ['BlogPosting', 'BreadcrumbList'] },
  { url: '/pt/politicas/privacidade/', title: 'Política de Privacidade — House Mazzutti',    schemas: ['BreadcrumbList'] },
]

function extract(html, pattern) {
  const m = html.match(pattern)
  return m ? m[1] : null
}

async function checkPage(page) {
  const issues = []
  let html = ''

  try {
    const res = await fetch(SITE + page.url, { signal: AbortSignal.timeout(15000) })
    if (res.status !== 200) {
      issues.push(`HTTP ${res.status}`)
      return { url: page.url, status: res.status, issues }
    }
    html = await res.text()
  } catch (e) {
    issues.push(`Fetch error: ${e.message}`)
    return { url: page.url, status: 'ERROR', issues }
  }

  // Title
  const title = extract(html, /<title>(.*?)<\/title>/)
  if (!title) issues.push('TITLE MISSING')
  else if (title !== page.title) issues.push(`TITLE MISMATCH\n    expected: ${page.title}\n    got:      ${title}`)

  // Canonical
  const canonical = extract(html, /rel="canonical" href="(.*?)"/)
  if (!canonical) issues.push('CANONICAL MISSING')
  else if (!canonical.includes('/pt/')) issues.push(`CANONICAL sem /pt/: ${canonical}`)

  // Schemas
  for (const schema of page.schemas) {
    if (!html.includes(`"@type":"${schema}"`)) {
      issues.push(`SCHEMA MISSING: ${schema}`)
    }
  }

  // OG
  const ogTitle = extract(html, /property="og:title" content="(.*?)"/)
  if (!ogTitle) issues.push('OG:TITLE MISSING')

  return {
    url: page.url,
    status: 200,
    title: title?.slice(0, 60),
    canonical,
    issues,
  }
}

async function checkSitemap() {
  const issues = []
  try {
    const res = await fetch(`${SITE}/sitemap.xml`, { signal: AbortSignal.timeout(15000) })
    const xml = await res.text()
    const urls = (xml.match(/<loc>(.*?)<\/loc>/g) || []).map(l => l.replace(/<\/?loc>/g, ''))
    const ptUrls = urls.filter(u => u.includes('/pt/'))
    const total = urls.length
    if (total < 40) issues.push(`Sitemap com apenas ${total} URLs (esperado ≥ 40)`)
    if (ptUrls.length < 10) issues.push(`Poucas URLs /pt/: ${ptUrls.length}`)
    return { total, ptUrls: ptUrls.length, issues }
  } catch (e) {
    return { total: 0, ptUrls: 0, issues: [`Sitemap error: ${e.message}`] }
  }
}

async function checkRobots() {
  const issues = []
  try {
    const res = await fetch(`${SITE}/robots.txt`, { signal: AbortSignal.timeout(10000) })
    const txt = await res.text()
    if (!txt.includes('sitemap.xml')) issues.push('robots.txt sem referência ao sitemap')
    if (!txt.includes('Disallow: /crm/')) issues.push('robots.txt não bloqueia /crm/')
    return { issues }
  } catch (e) {
    return { issues: [`robots error: ${e.message}`] }
  }
}

// ---- MAIN ----
console.log(`\n${'='.repeat(60)}`)
console.log(`SEO MONITOR — House Mazzutti | ${DATE}`)
console.log('='.repeat(60))

let totalIssues = 0

// Pages
console.log('\n📄 PÁGINAS\n')
for (const page of PAGES) {
  const result = await checkPage(page)
  const icon = result.issues.length === 0 ? '✅' : '❌'
  console.log(`${icon} ${result.url}`)
  if (result.issues.length > 0) {
    result.issues.forEach(i => console.log(`   → ${i}`))
    totalIssues += result.issues.length
  }
}

// Sitemap
console.log('\n🗺️  SITEMAP\n')
const sitemap = await checkSitemap()
const sitemapIcon = sitemap.issues.length === 0 ? '✅' : '❌'
console.log(`${sitemapIcon} sitemap.xml — ${sitemap.total} URLs (${sitemap.ptUrls} em /pt/)`)
sitemap.issues.forEach(i => console.log(`   → ${i}`))
totalIssues += sitemap.issues.length

// Robots
console.log('\n🤖 ROBOTS\n')
const robots = await checkRobots()
const robotsIcon = robots.issues.length === 0 ? '✅' : '❌'
console.log(`${robotsIcon} robots.txt`)
robots.issues.forEach(i => console.log(`   → ${i}`))
totalIssues += robots.issues.length

// Summary
console.log('\n' + '='.repeat(60))
if (totalIssues === 0) {
  console.log('✅ TUDO OK — nenhum problema encontrado')
} else {
  console.log(`⚠️  ${totalIssues} PROBLEMA(S) ENCONTRADO(S) — revisar acima`)
}
console.log('='.repeat(60) + '\n')

// Lembrete trimestral GBP
const month = new Date().getMonth() + 1
if ([1, 4, 7, 10].includes(month)) {
  console.log('📅 LEMBRETE TRIMESTRAL:')
  console.log('   Atualizar reviewCount em src/lib/seo/jsonld.js com total atual do GBP')
  console.log('   Atual configurado: 32 avaliações\n')
}

process.exit(totalIssues > 0 ? 1 : 0)
