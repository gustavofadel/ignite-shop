import logoImg from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Cart } from '../Cart'
import { HeaderContainer } from './styles'

export function Header() {
  const { pathname } = useRouter()

  const showCart = pathname !== '/success'

  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      {showCart && <Cart />}
    </HeaderContainer>
  )
}
