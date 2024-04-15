import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

type EmptyCartProps = {
    closeCart: () => void
}

const EmptyCart = ({ closeCart }: EmptyCartProps) => {
    const closeCartTrigger = () => {
        closeCart()
    }
  return (
    <div className='flex flex-col items-center gap-4 h-full justify-center'>
      <ShoppingCart className='h-7 w-7 text-black' />
      <div className='text-lg font-semibold text-black'>Your cart is empty</div>
      <Button onClick={closeCartTrigger} className='rounded-full bg-[#83543d] text-sm py-4'>Continue shopping</Button> 
    </div>
  )
}

export default EmptyCart
