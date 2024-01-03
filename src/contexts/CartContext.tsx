import {
  addItemToCartAction,
  removeCartItemAction,
} from '@/reducers/cart/actions'
import { cartReducer } from '@/reducers/cart/reducer'
import { ReactNode, createContext, useEffect, useReducer } from 'react'

export interface CartItem {
  id: string
  imageUrl: string
  name: string
  price: number
  formattedPrice: string
}

interface CartContextType {
  cartItems: CartItem[]
  cartItemsTotalPrice: number
  addItemToCart: (newItem: CartItem) => void
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
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-shop:cart-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const cartItemsTotalPrice = cartState.items.reduce(
    (total, item) => total + item.price,
    0,
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)

    localStorage.setItem('@ignite-shop:cart-state-1.0.0', stateJSON)
  }, [cartState])

  function addItemToCart(newItem: CartItem) {
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
