import logoImg from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from '../CartButton'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      <CartButton />
    </HeaderContainer>
  )
}
