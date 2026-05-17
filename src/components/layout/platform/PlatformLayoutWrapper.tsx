"use client"

import React, { ReactNode } from 'react'
import PlatformFooter from './footer/PlatformFooter'
import PlatformHeader from './header/PlatformHeader'

interface PlatformLayoutWrapperProps {
    readonly children: ReactNode
}

const PlatformLayoutWrapper = ({ children }: PlatformLayoutWrapperProps) => {
    return (
        <div className='w-dvh h-dvh overflow-hidden flex flex-col'>
            <div>
                <PlatformHeader />
            </div>
            <div className='flex-1 overflow-y-auto scrollbar-content flex flex-col justify-between'>
                {children}
                <PlatformFooter />
            </div>
        </div>
    )
}

export default PlatformLayoutWrapper