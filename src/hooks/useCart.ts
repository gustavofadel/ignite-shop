import { CartContext } from '@/contexts/CartContext'
import { useContextSelector } from 'use-context-selector'

export function useCart() {
  return useContextSelector(CartContext, (context) => context)
}
