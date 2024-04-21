'use client'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface SidebarItemProps {
    lable: string,
    href: string,
    icon: LucideIcon
}

const SidebarRouteItem = ({
    lable,
    icon: Icon,
    href
}: SidebarItemProps) => {
    const pathname = usePathname()
    const router = useRouter()

    console.log(pathname, href)

    const isActive = pathname === href
    
    const onClick = () => {
        router.push(href)
    }
    return (
        <button onClick={onClick} type='button' className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-orange-300/20", isActive && "text-orange-700 bg-orange-200/20 hover:bg-orange-200/20 hover:text-orange-700")}>
            <div className='flex items-center gap-x-2 py-4'>
                <Icon size={22} className={cn("text-slate-500", isActive && "text-orange-700")}/>
                {lable}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-orange-700 transition-all h-[54px]", isActive && "opacity-100")} />
        </button>
    )
}

export default SidebarRouteItem
