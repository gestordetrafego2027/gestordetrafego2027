import { redirect } from 'next/navigation'

export const dynamic = 'force-static'

export default function InsideOutCheckoutRedirect() {
  redirect('/academy/workshop-producao-direcao-01')
}
