import React from 'react'
import { socialLinks } from '@/data/social-link'
import Link from 'next/link'

const SocialLink = () => {
  return (
    <div className='flex gap-x-4 mx-auto mt-6'>
       {socialLinks.map((link, index) => (
        <Link className='w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center' href={link.link} key={index}>
            <link.icon className='text-zinc-900 hover:text-amber-900' size={20} />
        </Link>
       ))}
    </div>
  )
}

export default SocialLink
