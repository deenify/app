"use client"

import React, { ReactNode, useState } from "react"
import MarketingFooter from "./footer/MarketingFooter"
import MarketingHeader from "./header/MarketingHeader"
import MobileSidebar from "./header/MobileSidebar"
import { useScrollReset } from "@/hooks/useViewportFix"
import MarketingFloatWrapper from "./MarketingFloatWrapper"
import { MARKETING_HEADER_HEIGHT } from "./header/content"
import { useBreakpoint } from "@/hooks/useBreakpoint"

interface MarketingLayoutWrapperProps {
    readonly children: ReactNode
}

const MARKETING_SCROLL_ID = "marketing-layout-wrapper-scroll-container"

const MarketingLayoutWrapper = ({ children }: MarketingLayoutWrapperProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isMobile = useBreakpoint("sm", "up")

    useScrollReset(MARKETING_SCROLL_ID)

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div
                id={MARKETING_SCROLL_ID}
                data-app-scroll
                className="app-scroll scrollbar-content relative flex min-h-0 flex-1 flex-col overflow-y-auto"
            >
                <div className="sticky inset-x-0 top-0 z-50">
                    <MarketingHeader
                        className="absolute inset-x-0 top-0 z-50"
                        isMenuOpen={isMenuOpen}
                        onMenuOpen={() => setIsMenuOpen(true)}
                    />
                </div>

                <div
                    className="relative"
                    style={{ paddingTop: MARKETING_HEADER_HEIGHT(isMobile) }}
                >
                    <MobileSidebar
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                    />
                    {children}
                </div>

                <MarketingFooter />
                <MarketingFloatWrapper scrollContainerId={MARKETING_SCROLL_ID} />
            </div>
        </div>
    )
}

export default MarketingLayoutWrapper
