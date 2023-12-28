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
  cursor: 'pointer',

  svg: {
    fontSize: '2rem',
  },

  '&:not(:disabled):hover': {
    opacity: 0.4,
    transition: 'all 0.2s',
  },
})
