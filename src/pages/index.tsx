import { stripe } from '@/lib/stripe'
import { HomeContainer, Product } from '@/styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'

import { CartButton } from '@/components/CartButton'
import { formatMoney } from '@/utils/formatMoney'
import 'keen-slider/keen-slider.min.css'
import Head from 'next/head'
import Link from 'next/link'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    formattedPrice: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.formattedPrice}</span>
                  </div>

                  <CartButton color="green" size="large" type="button" />
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    const unitAmount = (price.unit_amount ?? 0) / 100
    const formattedUnitAmount = formatMoney(unitAmount)

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: unitAmount,
      formattedPrice: formattedUnitAmount,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
