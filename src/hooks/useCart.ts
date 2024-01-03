import { CartContext } from '@/contexts/CartContext'
import { useContextSelector } from 'use-context-selector'

export function useCart() {
  useContextSelector(CartContext, (context) => context)
}
