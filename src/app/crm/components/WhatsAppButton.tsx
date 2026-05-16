import { whatsappUrl } from '@/lib/whatsapp'

export default function WhatsAppButton({
  phone,
  message,
  label = '💬 WhatsApp',
  size = 'sm',
}: {
  phone: string | null | undefined
  message?: string
  label?: string
  size?: 'xs' | 'sm' | 'md'
}) {
  const url = whatsappUrl(phone, message)
  if (!url) return null

  const sizes: Record<string, string> = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white ${sizes[size]} transition-colors`}
    >
      {label}
    </a>
  )
}
