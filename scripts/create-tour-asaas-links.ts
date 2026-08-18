/**
 * Cria os payment links no Asaas para o Tour Canoinhas (cartão 3x).
 *
 * Uso:
 *   npx tsx scripts/create-tour-asaas-links.ts
 *
 * Pré-requisitos:
 *   - ASAAS_API_KEY definido no ambiente
 *   - ASAAS_ENV=production
 *
 * O script imprime os IDs e URLs gerados.
 * Cole os valores no Coolify como variáveis de ambiente:
 *   ASAAS_LINK_ENSAIO_01=<url>
 *   ASAAS_LINK_ENSAIO_02=<url>
 *   ASAAS_LINK_ENSAIO_03=<url>
 */
import 'dotenv/config'

const BASE_URL =
  process.env.ASAAS_ENV === 'production'
    ? 'https://api.asaas.com/v3'
    : 'https://sandbox.asaas.com/api/v3'

const API_KEY = process.env.ASAAS_API_KEY
if (!API_KEY) throw new Error('ASAAS_API_KEY não definida')

async function createLink(payload: object) {
  const res = await fetch(`${BASE_URL}/paymentLinks`, {
    method: 'POST',
    headers: { access_token: API_KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(data))
  return data as { id: string; url: string; name: string }
}

const PLANS = [
  {
    envKey: 'ASAAS_LINK_ENSAIO_01',
    name: 'Tour Canoinhas · Ensaio 01',
    description: '3 produções · 10 fotos tratadas · Making of · 1 ao 7 de Outubro · Canoinhas, SC',
    value: 1900.00,
  },
  {
    envKey: 'ASAAS_LINK_ENSAIO_02',
    name: 'Tour Canoinhas · Ensaio 02',
    description: '4 produções · 15 fotos tratadas · 1 Backstage 20" · 1 ao 7 de Outubro · Canoinhas, SC',
    value: 2600.00,
  },
  {
    envKey: 'ASAAS_LINK_ENSAIO_03',
    name: 'Tour Canoinhas · Ensaio 03',
    description: '5 produções · 20 fotos tratadas · Backstage + Fashion Film 20" · 1 ao 7 de Outubro · Canoinhas, SC',
    value: 3200.00,
  },
]

async function main() {
  console.log(`\nAmbiente: ${process.env.ASAAS_ENV ?? 'sandbox'}`)
  console.log(`Base URL: ${BASE_URL}\n`)

  const results: Array<{ envKey: string; url: string; id: string }> = []

  for (const plan of PLANS) {
    process.stdout.write(`Criando "${plan.name}"… `)
    const link = await createLink({
      name: plan.name,
      description: plan.description,
      value: plan.value,
      billingType: 'CREDIT_CARD',
      chargeType: 'INSTALLMENT',
      maxInstallmentCount: 3,
      dueDateLimitDays: 30,
      isAddressRequired: false,
      notificationEnabled: true,
    })
    console.log(`✓  ${link.url}`)
    results.push({ envKey: plan.envKey, url: link.url, id: link.id })
  }

  console.log('\n── Cole no Coolify (env vars) ──────────────────────────')
  for (const r of results) {
    console.log(`${r.envKey}=${r.url}`)
  }
  console.log('────────────────────────────────────────────────────────\n')
}

main().catch((err) => { console.error(err); process.exit(1) })
