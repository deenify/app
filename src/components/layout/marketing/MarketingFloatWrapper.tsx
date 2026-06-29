"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ChatSupport from "@/components/shared/float/ChatSupport"
import JumpBack from "@/components/shared/float/JumpBack"

interface MarketingFloatingSupportProps {
    containerRef: React.RefObject<HTMLDivElement>
}


const SHOW_AFTER_PX = 400

const MarketingFloatWrapper = ({ containerRef }: MarketingFloatingSupportProps) => {
    const pathname = usePathname()
    const [showChatSupport, setShowChatSupport] = useState(true)
    const [showJumpBack, setShowJumpBack] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        const container = containerRef.current

        if (!container) return

        const handleScroll = () => {
            const scrollTop = container.scrollTop
            const maxScroll = container.scrollHeight - container.clientHeight
            const footerHeight = document.getElementById("contact")?.clientHeight ?? 0

            const isNearBottom = maxScroll > 0 && scrollTop > maxScroll - footerHeight
            const isNearTopOrBottom = scrollTop > SHOW_AFTER_PX && !isNearBottom

            setShowJumpBack(isNearTopOrBottom)
            setShowChatSupport(isNearBottom ? false : true)
        }

        handleScroll()
        container.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            container.removeEventListener("scroll", handleScroll)
        }
    }, [containerRef])

    const scrollToTop = () => {
        containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (pathname !== "/") {
        return null
    }

    return (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex 
        flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            <JumpBack
                isVisible={showJumpBack}
                onClick={scrollToTop}
            />
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
