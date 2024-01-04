import { CartItem } from '@/contexts/CartContext'
import { useCart } from '@/hooks/useCart'
import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { formatMoney } from '@/utils/formatMoney'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'

interface ProductProps {
  product: CartItem
}

export default function Product({ product }: ProductProps) {
  const { addItemToCart, checkItemInCart } = useCart()

  function handleAddItemToCart() {
    addItemToCart(product)
  }

  const itemAlreadyInCart = checkItemInCart(product.id)
  const addItemToCartButtonText = itemAlreadyInCart
    ? 'Produto adicionado no carrinho'
    : 'Colocar na sacola'

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <button disabled={itemAlreadyInCart} onClick={handleAddItemToCart}>
            {addItemToCartButtonText}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_PEDs2pjXxsTrCG' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id || ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  const unitAmount = (price.unit_amount ?? 0) / 100
  const formattedUnitAmount = formatMoney(unitAmount)

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: unitAmount,
        formattedPrice: formattedUnitAmount,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
