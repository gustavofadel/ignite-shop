import { styled } from '@/styles'

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  borderRadius: 6,
  position: 'relative',

  span: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    gap: '0.8rem',
    position: 'absolute',
    width: '2.4rem',
    height: '2.4rem',
    right: '-0.7rem',
    top: '-0.7rem',

    backgroundColor: '$green500',
    border: '3px solid $gray900',
    borderRadius: '50%',
    fontWeight: 700,
    fontSize: '$xs',
    textAlign: 'center',
    color: '$white',
  },

  variants: {
    color: {
      gray: {
        backgroundColor: '$gray800',
        color: '$gray500',

        '&:not(:disabled):hover': {
          opacity: 0.4,
          transition: 'all 0.4s',
        },
      },

      green: {
        backgroundColor: '$green500',
        color: '$white',

        '&:not(:disabled):hover': {
          backgroundColor: '$green300',
          transition: 'background-color 0.4s',
        },
      },
    },

    size: {
      medium: {
        width: '3rem',
        height: '3rem',

        svg: {
          fontSize: '1.5rem',
        },
      },

      large: {
        width: '3.5rem',
        height: '3.5rem',

        svg: {
          fontSize: '2rem',
        },
      },
    },
  },

  defaultVariants: {
    color: 'gray',
    size: 'medium',
  },
})
