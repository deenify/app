"use client"

import React, { ReactNode, useRef } from 'react'
import MarketingFooter from './footer/MarketingFooter'
import MarketingHeader from './header/MarketingHeader'
import { ScrollContainerProvider } from '@/context/ScrollContainerContext'

interface MarketingLayoutWrapperProps {
    readonly children: ReactNode
}

const MarketingLayoutWrapper = ({ children }: MarketingLayoutWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    return (
        <div className='w-dvh h-dvh overflow-hidden flex flex-col'>
            <ScrollContainerProvider containerRef={scrollRef}>
                <div
                    ref={scrollRef}
                    id='marketing-layout-wrapper-scroll-container'
                    className='flex-1 overflow-y-auto scrollbar-content flex flex-col justify-between'
                >
                    <div className='sticky inset-0 bottom-auto z-50'>
                        <MarketingHeader className='absolute inset-0 bottom-auto z-50' />
                    </div>
                    <div className='pt-20'>
                        {children}
                    </div>
                    <MarketingFooter />
                </div>
            </ScrollContainerProvider>
        </div>
    )
}

export default MarketingLayoutWrapper