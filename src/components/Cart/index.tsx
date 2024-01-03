import { CartItem } from '@/contexts/CartContext'
import * as Dialog from '@radix-ui/react-dialog'
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
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'prod_PEDs2pjXxsTrCG',
      imageUrl:
        'https://files.stripe.com/links/MDB8YWNjdF8xT1BsQ2FHRlgxd1R3WFRWfGZsX3Rlc3RfZnBxNXl2bG5QZ2QyT0JPTDlncGhqaERD00hdDVVXn2',
      name: 'Camiseta Maratona Explorer 2.0',
      price: 'R$ 62,90',
    },
    {
      id: 'prod_PEDs2pjXxsTrCG',
      imageUrl:
        'https://files.stripe.com/links/MDB8YWNjdF8xT1BsQ2FHRlgxd1R3WFRWfGZsX3Rlc3RfZnBxNXl2bG5QZ2QyT0JPTDlncGhqaERD00hdDVVXn2',
      name: 'Camiseta Maratona Explorer 2.0',
      price: 'R$ 62,90',
    },
  ])
  const cartQuantity = cartItems.length
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
            {cartItems.map((item) => (
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
              <p>R$ 270,00</p>
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
