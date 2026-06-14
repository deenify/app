"use client"

import React, { ReactNode, useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { cn } from '@/lib/utils/clsx'
import DashboardSidebar from './side-bar/DashboardSidebar'
import DashboardHeader from './header/DashboardHeader'
import DashboardBottombar from './bottom-bar/DashboardBottombar'
import MarketingFooter from '../marketing/footer/MarketingFooter'

type DrawerTabsType = "menu" | "language" | "settings"
interface DashboardLayoutWrapperProps { readonly children: ReactNode }


const DashboardLayoutWrapper = ({ children }: DashboardLayoutWrapperProps) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabsType | null>(null)

    const isMobile = useBreakpoint('lg', 'down')


    return (
        <div className='flex-1 h-dvh overflow-hidden flex'>
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

                    <div
                        id='dashboard-layout-wrapper-scroll-container'
                        className='flex-1 overflow-y-auto scrollbar-content flex flex-col justify-between'
                    >
                        {children}
                        <MarketingFooter />
                    </div>
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