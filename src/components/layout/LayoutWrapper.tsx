"use client"

import React, { ReactNode, useState } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Sidebar from './side-bar/Sidebar'
import BottomBar from './bottom-bar/BottomBar'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { cn } from '@/lib/utils/clsx'
import { usePathname } from 'next/navigation'
import { LayoutConfiguration } from './side-bar/content'


type DrawerTabsType = "menu" | "language" | "settings"
interface LayoutWrapperProptype { readonly children: ReactNode }


const LayoutWrapper = ({ children }: LayoutWrapperProptype) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabsType | null>(null)

    const isMobile = useBreakpoint('lg', 'down')
    const pathname = usePathname()


    // Layout Configuration 
    const isLayoutHeaderExcluded =
        LayoutConfiguration.header.exclude.includes(pathname) ||
        LayoutConfiguration.header.exclude.every(exclude => pathname.startsWith(exclude))

    const isLayoutSidebarExcluded =
        LayoutConfiguration.sidebar.exclude.includes(pathname) ||
        LayoutConfiguration.sidebar.exclude.every(exclude => pathname.startsWith(exclude))

    const isLayoutBottomBarExcluded =
        LayoutConfiguration.bottomBar.exclude.includes(pathname) ||
        LayoutConfiguration.bottomBar.exclude.every(exclude => pathname.startsWith(exclude))

    const isLayoutFooterExcluded =
        LayoutConfiguration.footer.exclude.includes(pathname) ||
        LayoutConfiguration.footer.exclude.every(exclude => pathname.startsWith(exclude))


    return (
        // Layout Wrapper
        <div className='flex w-dvh h-dvh'>
            {/* Sidebar left-side  */}
            {!isLayoutSidebarExcluded && (
                <Sidebar
                    isMobile={isMobile}
                    isLocked={isLocked}
                    setIsLocked={setIsLocked}
                    sidebarExpanded={sidebarExpanded}
                    setSidebarExpanded={setSidebarExpanded}
                />
            )}

            {/* Content-Container right-side */}
            <div
                className={cn(
                    "flex flex-col flex-1 overflow-hidden ease duration-300",
                    !isLocked
                        ? "pl-[76px]"
                        : "2xl:pl-[280px] pl-[250px]",

                    (isMobile || isLayoutSidebarExcluded) && "pl-0"
                )}
            >
                {/* Header  top-bar */}
                {!isLayoutHeaderExcluded && (
                    <Header
                        onToggleSidebar={() => {
                            if (isMobile) setActiveDrawerTab("menu")
                            else setSidebarExpanded(!sidebarExpanded)
                        }}
                    />
                )}

                {/* Content-scroller inner-content */}
                <div className='flex-1 overflow-y-auto overflow-x-hidden scrollbar-content'>
                    <div className={cn('h-max min-h-full flex flex-col justify-between')}>
                        <>{children}</>
                        {!isLayoutFooterExcluded && (
                            <Footer />
                        )}
                    </div>
                </div>

                {/* Mobile-Actions bottom-Bar */}
                {!isLayoutBottomBarExcluded && (
                    <BottomBar
                        isVisible={isMobile}
                        activeDrawerTab={activeDrawerTab || null}
                        onDrawerTabChange={setActiveDrawerTab}
                    />
                )}
            </div>
        </div>
    )
}

export default LayoutWrapper