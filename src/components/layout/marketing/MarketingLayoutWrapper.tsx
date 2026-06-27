"use client"

import React, { ReactNode, useRef, useState } from 'react'
import MarketingFooter from './footer/MarketingFooter'
import MarketingHeader from './header/MarketingHeader'
import MobileSidebar from './header/MobileSidebar'
import { ScrollContainerProvider } from '@/context/ScrollContainerContext'

interface MarketingLayoutWrapperProps {
    readonly children: ReactNode
}

const MarketingLayoutWrapper = ({ children }: MarketingLayoutWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className='layout flex flex-col'>
            <ScrollContainerProvider containerRef={scrollRef}>
                <div
                    ref={scrollRef}
                    id='marketing-layout-wrapper-scroll-container'
                    className='flex-1 overflow-y-auto scrollbar-content flex flex-col justify-between relative'
                >
                    <div className='sticky inset-0 bottom-auto z-50'>
                        <MarketingHeader
                            className='absolute inset-0 bottom-auto z-50'
                            isMenuOpen={isMenuOpen}
                            onMenuOpen={() => setIsMenuOpen(true)}
                        />
                    </div>
                    <div className='pt-20 relative'>
                        <MobileSidebar
                            isOpen={isMenuOpen}
                            onClose={() => setIsMenuOpen(false)}
                        />
                        {children}
                    </div>
                    <MarketingFooter />
                </div>
            </ScrollContainerProvider>
        </div>
    )
}

export default MarketingLayoutWrapper
