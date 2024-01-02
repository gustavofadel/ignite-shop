import { styled } from '@/styles'
import * as Dialog from '@radix-ui/react-dialog'

export const CartContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',

  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '48rem',
  padding: '7.2rem 4.8rem 4.8rem',
  background: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  h2: {
    fontWeight: 'bold',
    fontSize: '$lg',
    color: '$gray100',
    marginBottom: '3.2rem',
  },

  'h2 + section': {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,

    gap: '2.4rem',
    overflowY: 'auto',
  },
})

export const CartClose = styled(Dialog.Close, {
  background: 'none',
  border: 'none',
  color: '$gray500',
  position: 'absolute',
  top: '2.8rem',
  right: '2.8rem',
})

export const CartProduct = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
})

export const CartProductImage = styled('div', {
  width: '10.194rem',
  height: '9.3rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  img: {
    aspectRatio: 1,
    objectFit: 'cover',
  },
})

export const CartProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  gap: '0.8rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    gap: '0.2rem',
    alignSelf: 'stretch',

    p: {
      color: '$gray300',
      fontSize: '$md',
    },

    strong: {
      color: '$gray100',
      fontSize: '$md',
    },
  },

  button: {
    background: 'none',
    border: 'none',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    gap: '1rem',
    fontWeight: 'bold',
    fontSize: '$sm',
    color: '$green500',

    '&:hover': {
      color: '$green300',
      transition: 'color 0.4s',
    },
  },
})

export const CartDetails = styled('section', {
  display: 'flex',
  flexDirection: 'column',

  marginTop: 'auto',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    span: {
      fontSize: '$sm',
    },

    p: {
      color: '$gray300',
      textAlign: 'right',
    },

    '&:nth-child(2)': {
      fontWeight: 'bold',
      marginTop: '0.4375rem',

      span: {
        fontSize: '$md',
      },

      p: {
        color: '$gray100',
        fontSize: '$xl',
      },
    },
  },

  button: {
    width: '100%',
    background: '$green500',
    color: '$white',
    border: 'none',
    borderRadius: 8,
    padding: '2rem 3.2rem',
    marginTop: '5.5rem',
    fontWeight: 700,
    fontSize: '$md',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})
