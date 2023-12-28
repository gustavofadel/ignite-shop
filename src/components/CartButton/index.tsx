import { Handbag } from 'phosphor-react'
import { CartButtonContainer } from './styles'

interface CartButtonProps {
  quantity?: number
}

export function CartButton({ quantity = 0 }: CartButtonProps) {
  return (
    <CartButtonContainer>
      {quantity > 0 && <span>{quantity}</span>}
      <Handbag weight="bold" />
    </CartButtonContainer>
  )
}
