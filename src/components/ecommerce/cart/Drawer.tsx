'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { useCartStore } from '@/lib/cart/store'
import { CartLine } from './Line'
import { CartSummary } from './Summary'
import { Link } from '@/i18n/navigation'

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, clearCart, itemCount } = useCartStore()
  const count = itemCount()

  return (
    <Dialog.Root open={drawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Drawer lateral */}
        <Dialog.Content
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300"
          aria-describedby={undefined}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
            <Dialog.Title className="font-semibold text-neutral-900 text-lg">
              Carrinho
              {count > 0 && (
                <span className="ml-2 text-sm font-normal text-neutral-400">
                  ({count} {count === 1 ? 'item' : 'itens'})
                </span>
              )}
            </Dialog.Title>
            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-red-500 transition-colors"
                >
                  Limpar
                </button>
              )}
              <Dialog.Close className="rounded-lg p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Dialog.Close>
            </div>
          </div>

          {/* Itens */}
          <div className="flex-1 overflow-y-auto px-6 py-2">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                <div className="text-5xl text-neutral-200">◻</div>
                <div>
                  <p className="font-medium text-neutral-600">Seu carrinho está vazio</p>
                  <p className="text-sm text-neutral-400 mt-1">Adicione produtos para continuar</p>
                </div>
                <Link
                  href="/loja"
                  onClick={closeDrawer}
                  className="mt-2 px-6 py-2.5 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors"
                >
                  Ver loja
                </Link>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <CartLine key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer com resumo */}
          {items.length > 0 && (
            <div className="border-t border-neutral-100 px-6 py-5 bg-neutral-50">
              <CartSummary onClose={closeDrawer} />
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
