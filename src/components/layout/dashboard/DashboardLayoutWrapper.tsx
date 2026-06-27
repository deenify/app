"use client"

import React, { ReactNode, useRef, useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { cn } from '@/lib/utils/clsx'
import DashboardSidebar from './side-bar/DashboardSidebar'
import DashboardHeader from './header/DashboardHeader'
import DashboardBottombar from './bottom-bar/DashboardBottombar'
import MarketingFooter from '../marketing/footer/MarketingFooter'
import { ScrollContainerProvider } from '@/context/ScrollContainerContext'

type DrawerTabsType = "menu" | "language" | "settings"
interface DashboardLayoutWrapperProps { readonly children: ReactNode }


const DashboardLayoutWrapper = ({ children }: DashboardLayoutWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabsType | null>(null)

    const isMobile = useBreakpoint('lg', 'down')


    return (
        <div className='layout flex'>
            <DashboardSidebar
                isMobile={isMobile}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
            />

            <div
                className={cn(
                    "flex flex-col justify-between flex-1 overflow-hidden ease duration-300",
                    !isLocked
                        ? "pl-[76px]"
                        : "2xl:pl-[280px] pl-[250px]",
                    isMobile && "pl-0"
                )}
            >
                <div className='flex-1 flex flex-col overflow-hidden'>
                    <DashboardHeader
                        onToggleSidebar={() => {
                            if (isMobile) setActiveDrawerTab("menu")
                            else setSidebarExpanded(!sidebarExpanded)
                        }}
                    />

                    <ScrollContainerProvider containerRef={scrollRef}>
                        <div
                            ref={scrollRef}
                            id='dashboard-layout-wrapper-scroll-container'
                            className='flex-1 overflow-y-auto scrollbar-content flex flex-col justify-between'
                        >
                            {children}
                            <MarketingFooter />
                        </div>
                    </ScrollContainerProvider>
                </div>

                <DashboardBottombar
                    isVisible={isMobile}
                    activeDrawerTab={activeDrawerTab || null}
                    onDrawerTabChange={setActiveDrawerTab}
                />
            </div>
        </div>
    )
}

export default DashboardLayoutWrapper