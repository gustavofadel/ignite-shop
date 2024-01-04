import {
  addItemToCartAction,
  removeCartItemAction,
} from '@/reducers/cart/actions'
import { cartReducer } from '@/reducers/cart/reducer'
import { ReactNode, useEffect, useReducer } from 'react'
import { createContext } from 'use-context-selector'

export interface Product {
  id: string
  imageUrl: string
  name: string
  price: number
  formattedPrice: string
  description: string
  defaultPriceId: string
}

interface CartContextType {
  cartItems: Product[]
  cartQuantity: number
  cartItemsTotalPrice: number
  addItemToCart: (newItem: Product) => void
  checkItemInCart: (cartItemId: string) => boolean
  removeCartItem: (cartItemId: string) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      items: [],
    },
    (initialState) => {
      if (typeof window === 'undefined') {
        return initialState
      }

      const storedStateAsJSON = localStorage.getItem(
        '@ignite-shop:cart-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const cartQuantity = cartState.items.length

  const cartItemsTotalPrice = cartState.items.reduce(
    (total, item) => total + item.price,
    0,
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)

    if (typeof window !== 'undefined') {
      localStorage.setItem('@ignite-shop:cart-state-1.0.0', stateJSON)
    }
  }, [cartState])

  function addItemToCart(newItem: Product) {
    dispatch(addItemToCartAction(newItem))
  }

  function checkItemInCart(cartItemId: string) {
    return cartState.items.some((item) => item.id === cartItemId)
  }

  function removeCartItem(cartItemId: string) {
    dispatch(removeCartItemAction(cartItemId))
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.items,
        cartQuantity,
        cartItemsTotalPrice,
        addItemToCart,
        checkItemInCart,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
