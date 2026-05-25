import { redirect } from 'next/navigation';

// Página /agencia ainda não tem rota dedicada — redireciona para /comunidade
// onde a unidade Agência é apresentada dentro da estrutura House Mazzutti.
export default function AgenciaPage() {
  redirect('/comunidade');
}
