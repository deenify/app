"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ChatSupport from "@/components/shared/float/ChatSupport"
import JumpBack from "@/components/shared/float/JumpBack"
import { isMarketingRoute } from "../routes.config"

interface MarketingFloatingSupportProps {
    scrollContainerId: string
}

const SHOW_AFTER_PX = 400

const MarketingFloatWrapper = ({ scrollContainerId }: MarketingFloatingSupportProps) => {
    const pathname = usePathname()
    const [showChatSupport, setShowChatSupport] = useState(true)
    const [showJumpBack, setShowJumpBack] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        const container = document.getElementById(scrollContainerId)
        if (!container) return

        const handleScroll = () => {
            const scrollTop = container.scrollTop
            const maxScroll = container.scrollHeight - container.clientHeight
            const footerHeight = document.getElementById("contact")?.clientHeight ?? 0

            const isNearBottom = maxScroll > 0 && scrollTop > maxScroll - footerHeight
            const isNearTopOrBottom = scrollTop > SHOW_AFTER_PX && !isNearBottom

            setShowJumpBack(isNearTopOrBottom)
            setShowChatSupport(!isNearBottom)
        }

        handleScroll()
        container.addEventListener("scroll", handleScroll, { passive: true })

        return () => container.removeEventListener("scroll", handleScroll)
    }, [scrollContainerId])

    const scrollToTop = () => {
        document.getElementById(scrollContainerId)?.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (!isMarketingRoute(pathname)) {
        return null
    }

    return (
        <div className="pointer-events-none fixed bottom-6 right-3 z-[80] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 xs:bottom-8 xs:right-5 sm:bottom-10 sm:right-6">
            <JumpBack isVisible={showJumpBack} onClick={scrollToTop} />
            <ChatSupport
                isVisible={showChatSupport}
                isOpen={isChatOpen}
                onToggle={() => setIsChatOpen(!isChatOpen)}
                onClose={() => setIsChatOpen(false)}
            />
        </div>
    )
}

export default MarketingFloatWrapper
