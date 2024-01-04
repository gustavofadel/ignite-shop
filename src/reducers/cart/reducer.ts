import { CartItem } from '@/contexts/CartContext'
import { produce } from 'immer'
import { ActionTypes } from './actions'

interface CartState {
  items: CartItem[]
}

export function cartReducer(state: CartState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM_TO_CART: {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.newItem.id,
      )

      const itemPresentInCart = itemIndex >= 0

      return produce(state, (draft) => {
        if (!itemPresentInCart) {
          draft.items.push(action.payload.newItem)
        }
      })
    }

    case ActionTypes.REMOVE_CART_ITEM: {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.cartItemId,
      )

      const itemPresentInCart = itemIndex >= 0

      return produce(state, (draft) => {
        if (itemPresentInCart) {
          draft.items.splice(itemIndex, 1)
        }
      })
    }

    default:
      return state
  }
}
