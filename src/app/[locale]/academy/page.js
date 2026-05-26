import { redirect } from 'next/navigation';

/**
 * /pt/academy/ → redireciona para /academy/ (página fora do i18n)
 */
export default function AcademyLocalePage() {
  redirect('/academy');
}
