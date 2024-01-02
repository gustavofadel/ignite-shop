import logoImg from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Cart } from '../Cart'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      <Cart />
    </HeaderContainer>
  )
}
