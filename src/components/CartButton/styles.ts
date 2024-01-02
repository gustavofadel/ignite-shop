import { styled } from '@/styles'

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  borderRadius: 6,
  position: 'relative',
  background: '$gray800',
  color: '$gray500',
  width: '4rem',
  height: '4rem',

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

  svg: {
    fontSize: '2rem',
  },

  '&:not(:disabled):hover': {
    opacity: 0.4,
    transition: 'all 0.2s',
  },
})
