import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import React from 'react'
import { FaFacebook } from 'react-icons/fa'

const SocialLogin = () => {
  return (
    <div className='flex w-full items-center gap-x-2'>
        <Button variant={'outline'} size={'lg'} className='w-full' onClick={() => {}}><FcGoogle className='h-5 w-5' /></Button>
        <Button variant={'outline'} size={'lg'} className='w-full' onClick={() => {}}><FaFacebook className='h-5 w-5 text-[#1877F2]' /></Button>
    </div>
  )
}

export default SocialLogin
