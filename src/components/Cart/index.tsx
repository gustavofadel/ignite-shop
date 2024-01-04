import { useCart } from '@/hooks/useCart'
import { formatMoney } from '@/utils/formatMoney'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { CartButton } from '../CartButton'
import {
  CartClose,
  CartContent,
  CartDetails,
  CartProduct,
  CartProductDetails,
  CartProductImage,
} from './styles'

export function Cart() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { cartItems, cartQuantity, cartItemsTotalPrice, removeCartItem } =
    useCart()

  function handleRemoveItem(cartItemId: string) {
    removeCartItem(cartItemId)
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  const isCartEmpty = cartQuantity === 0
  const isFinishButtonDisabled = isCartEmpty || isCreatingCheckoutSession
  const disabledFinishButtonText = isCartEmpty
    ? 'Nenhum item no carrinho'
    : 'Aguarde...'
  const finishButtonText = isFinishButtonDisabled
    ? disabledFinishButtonText
    : 'Finalizar compra'

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton quantity={cartQuantity} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {cartItems?.map((item) => (
              <CartProduct key={item.id}>
                <CartProductImage>
                  <Image width={95} height={95} src={item.imageUrl} alt="" />
                </CartProductImage>

                <CartProductDetails>
                  <div>
                    <p>{item.name}</p>
                    <strong>{item.formattedPrice}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remover
                  </button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartDetails>
            <div>
              <span>Quantidade</span>
              <p>
                {cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}
              </p>
            </div>

            <div>
              <span>Valor total</span>
              <p>{formatMoney(cartItemsTotalPrice)}</p>
            </div>

            <button
              type="button"
              disabled={isFinishButtonDisabled}
              onClick={handleCheckout}
            >
              {finishButtonText}
            </button>
          </CartDetails>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
