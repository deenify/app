"use client"

import React, { ReactNode, useRef, useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useScrollReset } from '@/hooks/useViewportFix'
import { cn } from '@/lib/utils/clsx'
import DashboardSidebar from './side-bar/DashboardSidebar'
import DashboardHeader from './header/DashboardHeader'
import DashboardBottombar from './bottom-bar/DashboardBottombar'
import MarketingFooter from '../marketing/footer/MarketingFooter'
import { ScrollContainerProvider } from '@/context/ScrollContainerContext'
import { DailyChallengeModal } from '@/components/pages/dashboard/overview/DailyChallengeModal'
// import DashboardBreadcrum from '@/components/pages/dashboard/generic/DashboardBreadcrum'
// import { Button } from '@/components/ui/button'
// import { usePathname } from 'next/navigation'
// import { SparklesIcon } from 'lucide-react'

type DrawerTabsType = "menu" | "language" | "settings"
interface DashboardLayoutWrapperProps { readonly children: ReactNode }


const DashboardLayoutWrapper = ({ children }: DashboardLayoutWrapperProps) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabsType | null>(null)
    const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null)
    const isMobile = useBreakpoint('lg', 'down')

    useScrollReset(scrollRef)

    // const pathname = usePathname()
    // const pageTitle = pathname.split('/').pop()


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
                <div className='flex-1 min-h-0 flex flex-col overflow-hidden'>
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
                            className='flex-1 min-h-0 overflow-y-auto scrollbar-content flex flex-col justify-between'
                        >
                            {/* <section className='container overflow-visible'>
                                <DashboardBreadcrum
                                    items={[
                                        { label: "Dashboard", href: "/dashboard" },
                                        ...(pageTitle && pageTitle !== "dashboard"
                                            ? [{ label: pageTitle, href: pathname }]
                                            : []
                                        )]}
                                    className='border-b border-gray-300 py-4'
                                />
                            </section> */}

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

            <DailyChallengeModal
                isOpen={isChallengeModalOpen}
                onOpenChange={setIsChallengeModalOpen}
                title="Daily Quest"
            />
        </div>
    )
}

export default DashboardLayoutWrapper