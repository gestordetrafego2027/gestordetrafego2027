'use client'

import { trackAndOpenWhatsApp } from '@/lib/trackWhatsAppClick'

const MESSAGE = 'Olá, quero dar andamento na minha produção com a House Mazzutti.'

export default function WhatsAppFloatingButton() {
  function handleClick() {
    trackAndOpenWhatsApp({
      location: 'floating_button',
      message: MESSAGE,
    })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
      className="
        fixed bottom-20 md:bottom-6 right-6 z-40
        flex items-center justify-center
        w-14 h-14
        bg-black text-white
        shadow-lg
        hover:bg-white hover:text-black hover:border hover:border-black
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
      "
    >
      {/* WhatsApp SVG — inline para zero dependência */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.482.67 4.938 1.94 7.092L2 30l7.11-1.863A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.54 11.54 0 0 1-5.88-1.61l-.42-.25-4.22 1.106 1.13-4.1-.274-.434A11.56 11.56 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4c6.41 0 11.6 5.19 11.6 11.6 0 6.41-5.19 11.6-11.6 11.6zm6.36-8.684c-.348-.174-2.06-1.016-2.38-1.132-.318-.116-.55-.174-.78.174-.232.348-.898 1.132-1.1 1.364-.202.232-.404.26-.752.086-.348-.174-1.47-.542-2.8-1.726-1.034-.922-1.732-2.06-1.934-2.408-.202-.348-.022-.536.152-.71.156-.156.348-.406.522-.61.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.087-.174-.78-1.882-1.07-2.578-.282-.676-.568-.584-.78-.594l-.664-.012a1.274 1.274 0 0 0-.926.434c-.318.348-1.214 1.186-1.214 2.89 0 1.704 1.242 3.352 1.416 3.584.174.232 2.444 3.732 5.922 5.234.828.358 1.474.572 1.978.732.83.264 1.586.226 2.184.138.666-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.658-.087-.146-.318-.232-.666-.406z" />
      </svg>
    </button>
  )
}
