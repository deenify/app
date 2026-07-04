"use client"

import { cn } from '@/lib/utils/clsx'
import React from 'react'
import { ReactNode } from 'react'

interface LayoutWrapperProptype {
    readonly children: ReactNode
}


const LayoutWrapper = ({ children }: LayoutWrapperProptype) => {
    return (
        <div className={cn('layout flex')}>
            <div className='flex flex-col flex-1 min-h-0 overflow-hidden'>
                {children}
            </div>
        </div>
    )
}

export default LayoutWrapper