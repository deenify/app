"use client"

import React, { ReactNode, useState } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Sidebar from './side-bar/Sidebar'
import BottomBar from './bottom-bar/BottomBar'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { cn } from '@/lib/utils'


type DrawerTabsType = "menu" | "language" | "settings"
interface LayoutWrapperProptype { readonly children: ReactNode }


const LayoutWrapper = ({ children }: LayoutWrapperProptype) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabsType | null>(null)

    const isMobile = useBreakpoint('lg', 'down')

    return (
        <div className='flex w-dvh h-dvh'>
            <Sidebar
                isMobile={isMobile}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
            />

            <div
                className={cn(
                    "flex flex-col flex-1 overflow-hidden ease duration-300",
                    isMobile ? "pl-0" : !isLocked ? "pl-[76px]" : "pl-[280px]",
                )}
            >
                <Header
                    onToggleSidebar={() => {
                        if (isMobile) setActiveDrawerTab("menu")
                        else setSidebarExpanded(!sidebarExpanded)
                    }}
                />
                <div className='flex-1 overflow-y-auto scrollbar-content'>
                    <div className={cn(
                        'h-max min-h-full flex flex-col justify-between',
                        isMobile && 'pb-16'
                    )}>
                        <>{children}</>
                        <Footer />
                    </div>
                </div>
            </div>

            {isMobile && (
                <BottomBar
                    activeDrawerTab={activeDrawerTab || null}
                    onDrawerTabChange={setActiveDrawerTab}
                />
            )}
        </div>
    )
}

export default LayoutWrapper