'use client'

import { useEffect, useId } from 'react'

/**
 * FormDrawer — Responsive container for lead-capture forms.
 *
 * Mobile (< md): slides up from the bottom as a bottom sheet (up to 90vh, rounded top).
 * Desktop (≥ md): slides in from the right as a side drawer (40vw, min 480px / max 640px, full height).
 *
 * Props:
 *  - isOpen   {boolean}    Controls visibility.
 *  - onClose  {() => void} Called when user dismisses (backdrop click, X, or Escape).
 *  - title    {string}     Heading shown at the top of the drawer.
 *  - subtitle {string?}    Optional supporting line beneath the title.
 *  - children {ReactNode}  Form content rendered in the scrollable body.
 */
export default function FormDrawer({ isOpen, onClose, title, subtitle, children }) {
  const titleId = useId()

  // Kept mounted so the close animation can play; visual state is driven by `isOpen`.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div
      className={`fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer / Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          'fixed z-50 bg-white shadow-2xl font-body text-black',
          'transition-transform duration-300 ease-out',
          // Mobile: bottom sheet
          'inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl',
          isOpen ? 'translate-y-0' : 'translate-y-full',
          // Desktop: right drawer (override transforms + position)
          'md:inset-y-0 md:right-0 md:left-auto md:bottom-auto md:top-0',
          'md:h-screen md:max-h-screen md:w-[40vw] md:min-w-[480px] md:max-w-[640px]',
          'md:rounded-none',
          isOpen ? 'md:translate-x-0 md:translate-y-0' : 'md:translate-x-full md:translate-y-0',
          'flex flex-col',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="min-w-0">
            <h2 id={titleId} className="font-headline text-xl md:text-2xl text-black truncate">
              {title}
            </h2>
            {subtitle ? (
              <p className="font-body text-sm text-gray-500 mt-1">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 -mr-2 -mt-1 rounded-full text-black hover:bg-gray-100 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  )
}
