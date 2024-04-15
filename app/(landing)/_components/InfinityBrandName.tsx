import React from 'react'
import Image from 'next/image'
import { brands } from '@/data/brands'

const InfinityBrandName = () => {
  return (
    <div className='container mb-14'>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {brands.map((brand, index) => (
                    <li key={index}>
                        <Image src={brand.image} width={198} height={66} alt="logo" />
                    </li>
                ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {brands.map((brand, index) => (
                    <li key={index}>
                        <Image src={brand.image} width={198} height={66} alt="logo" />
                    </li>
                ))}
            </ul>                
        </div>
    </div>
  )
}

export default InfinityBrandName
