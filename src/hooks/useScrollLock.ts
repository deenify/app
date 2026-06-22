"use client"

import { useEffect } from "react"
import { useScrollContainer } from "@/context/ScrollContainerContext"

export function useScrollLock(active: boolean) {
    const scrollRef = useScrollContainer()

    useEffect(() => {
        if (!active) return

        const el = scrollRef?.current as HTMLElement | null
        const prev = el
            ? { overflow: el.style.overflow, touchAction: el.style.touchAction }
            : null

        if (el) {
            el.style.overflow = "hidden"
            el.style.touchAction = "none"
        }

        return () => {
            if (el && prev) {
                el.style.overflow = prev.overflow
                el.style.touchAction = prev.touchAction
            }
        }
    }, [active, scrollRef])
}
