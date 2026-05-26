import { redirect } from 'next/navigation';

/**
 * /pt/login/ → redireciona para /login/ (página fora do i18n)
 */
export default function LoginLocalePage() {
  redirect('/login');
}
