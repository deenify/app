"use client"

import { cn } from '@/lib/utils/clsx'
import React from 'react'
import { ReactNode } from 'react'
import { useViewportFix } from '@/hooks/useViewportFix'

interface LayoutWrapperProptype {
    readonly children: ReactNode
}


const LayoutWrapper = ({ children }: LayoutWrapperProptype) => {
    useViewportFix();

    return (
        <div className={cn('w-dvh h-dvh overflow-hidden flex')}>
            <div className='flex flex-col flex-1 overflow-y-auto scrollbar-content'>
                {children}
            </div>
        </div>
    )
}

export default LayoutWrapper