import { useCart } from '@/hooks/useCart'
import { formatMoney } from '@/utils/formatMoney'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { X } from 'phosphor-react'
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
  const { cartItems, cartQuantity, cartItemsTotalPrice } = useCart()

  const isFinishButtonDisabled = !cartQuantity

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
                    <strong>{item.price}</strong>
                  </div>

                  <button type="button">Remover</button>
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

            <button type="button" disabled={isFinishButtonDisabled}>
              Finalizar compra
            </button>
          </CartDetails>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
