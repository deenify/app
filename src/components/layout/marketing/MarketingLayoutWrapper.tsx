"use client"

import React, { ReactNode } from 'react'
import MarketingFooter from './footer/MarketingFooter'
import MarketingHeader from './header/MarketingHeader'

interface MarketingLayoutWrapperProps {
    readonly children: ReactNode
}

const MarketingLayoutWrapper = ({ children }: MarketingLayoutWrapperProps) => {
    return (
        <div className='w-dvh h-dvh overflow-hidden flex flex-col'>
            <div>
                <MarketingHeader />
            </div>
            <div className='flex-1 overflow-y-auto scrollbar-content flex flex-col justify-between'>
                {children}
                <MarketingFooter />
            </div>
        </div>
    )
}

export default MarketingLayoutWrapper