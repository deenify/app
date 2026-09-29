"use client"

import React, { ReactNode, useState } from "react"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { useScrollReset } from "@/hooks/useViewportFix"
import DashboardSidebar from "./side-bar/DashboardSidebar"
import DashboardHeader from "./header/DashboardHeader"
import DashboardBottombar from "./bottom-bar/DashboardBottombar"
import MarketingFooter from "../marketing/footer/MarketingFooter"
import { DailyChallengeModal } from "@/components/pages/dashboard/overview/DailyChallengeModal"
import { cn } from "@/lib/utils/clsx"

type DrawerTabsType = "menu" | "language" | "settings"

interface DashboardLayoutWrapperProps {
    readonly children: ReactNode
}

const DASHBOARD_SCROLL_ID = "dashboard-layout-wrapper-scroll-container"

const DashboardLayoutWrapper = ({ children }: DashboardLayoutWrapperProps) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabsType | null>(null)
    const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false)

    const isMobile = useBreakpoint("lg", "down")

    useScrollReset(DASHBOARD_SCROLL_ID)

    return (
        <div className="flex min-h-0 flex-1 w-full">
            <DashboardSidebar
                isMobile={isMobile}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
            />

            <div
                className={cn(
                    "flex min-h-0 flex-1 flex-col overflow-hidden transition-[padding] duration-300",
                    !isLocked ? "pl-[76px]" : "pl-[250px] 2xl:pl-[280px]",
                    isMobile && "pl-0"
                )}
            >
                <DashboardHeader
                    className="shrink-0"
                    onToggleSidebar={() => {
                        if (isMobile) setActiveDrawerTab("menu")
                        else setSidebarExpanded(!sidebarExpanded)
                    }}
                />

                <main
                    id={DASHBOARD_SCROLL_ID}
                    data-app-scroll
                    className="app-scroll scrollbar-content flex min-h-0 
                    flex-1 flex-col overflow-y-auto"
                >
                    {children}
                    <MarketingFooter />
                </main>

                <DashboardBottombar
                    isVisible={isMobile}
                    activeDrawerTab={activeDrawerTab}
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
