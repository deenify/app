"use client"

import React, { ReactNode, useState } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Sidebar from './side-bar/Sidebar'
import BottomBar from './bottom-bar/BottomBar'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { cn } from '@/lib/utils/clsx'


type DrawerTabsType = "menu" | "language" | "settings"
interface LayoutWrapperProptype { readonly children: ReactNode }


const LayoutWrapper = ({ children }: LayoutWrapperProptype) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabsType | null>(null)

    const isMobile = useBreakpoint('lg', 'down')

    return (
        // Layout Wrapper
        <div className='flex w-dvh h-dvh'>
            {/* Sidebar left-side  */}
            <Sidebar
                isMobile={isMobile}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
            />

            {/* Content-Container right-side */}
            <div
                className={cn(
                    "flex flex-col flex-1 overflow-hidden ease duration-300",
                    isMobile
                        ? "pl-0"
                        : !isLocked
                            ? "pl-[76px]"
                            : "2xl:pl-[280px] pl-[215px]",
                )}
            >
                {/* Header  top-bar */}
                <Header
                    onToggleSidebar={() => {
                        if (isMobile) setActiveDrawerTab("menu")
                        else setSidebarExpanded(!sidebarExpanded)
                    }}
                />

                {/* Content-scroller inner-content */}
                <div className='flex-1 overflow-y-auto overflow-x-hidden scrollbar-content'>
                    <div className={cn('h-max min-h-full flex flex-col justify-between')}>
                        <>{children}</>
                        <Footer />
                    </div>
                </div>

                {/* Mobile-Actions bottom-Bar */}
                <BottomBar
                    isVisible={isMobile}
                    activeDrawerTab={activeDrawerTab || null}
                    onDrawerTabChange={setActiveDrawerTab}
                />
            </div>
        </div>
    )
}

export default LayoutWrapper