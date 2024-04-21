import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image alt='Logo' src={'/logo.svg'} width={80} height={80} />
  )
}

export default Logo
