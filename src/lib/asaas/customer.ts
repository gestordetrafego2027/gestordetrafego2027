import { asaasFetch } from './client'
import { AsaasCustomerSchema, type AsaasCustomer } from './schemas'

interface UpsertCustomerInput {
  name: string
  email: string
  cpfCnpj?: string
  externalReference: string
}

/**
 * Garante um Customer no Asaas. Busca por externalReference (ex.: user_id Supabase
 * ou email para guest) e cria se não existe.
 */
export async function upsertCustomer(input: UpsertCustomerInput): Promise<AsaasCustomer> {
  const found = await asaasFetch<{ data?: unknown[] }>({
    method: 'GET',
    path: '/customers',
    query: { externalReference: input.externalReference, limit: 1 },
  })

  const existing = Array.isArray(found?.data) && found.data.length > 0 ? found.data[0] : null
  if (existing) {
    const parsed = AsaasCustomerSchema.parse(existing)
    // Cliente antigo pode ter sido criado sem CPF — atualiza se recebemos um agora.
    if (input.cpfCnpj && !parsed.cpfCnpj) {
      const updated = await asaasFetch<unknown>({
        method: 'POST',
        path: `/customers/${parsed.id}`,
        body: {
          name: input.name,
          email: input.email,
          cpfCnpj: input.cpfCnpj,
        },
      })
      return AsaasCustomerSchema.parse(updated)
    }
    return parsed
  }

  const created = await asaasFetch<unknown>({
    method: 'POST',
    path: '/customers',
    body: {
      name: input.name,
      email: input.email,
      cpfCnpj: input.cpfCnpj,
      externalReference: input.externalReference,
    },
  })
  return AsaasCustomerSchema.parse(created)
}
