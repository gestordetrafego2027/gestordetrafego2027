import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Link, useRouter, usePathname e redirect locale-aware
// Usar esses em vez de next/link / next/navigation nas páginas do site
export const { Link, useRouter, usePathname, redirect } = createNavigation(routing)
