import { useCart } from '@/hooks/useCart'
import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ImagesSection,
  SuccessContainer,
} from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  products: {
    id: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { cleanCart } = useCart()

  const shirtCount = products.length
  const shirtCountText = shirtCount === 1 ? 'camiseta' : 'camisetas'

  useEffect(() => {
    cleanCart()
  }, [])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesSection>
          {products.map((product, index) => (
            <ImageContainer key={product.id} style={{ order: index }}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesSection>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{shirtCount}</strong> {shirtCountText} já está a caminho da
          sua casa.{' '}
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = query.session_id as string

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product
    return { id: product.id, imageUrl: product.images[0] }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}
