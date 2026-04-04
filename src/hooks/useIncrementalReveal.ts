"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useIncrementalReveal(totalCount: number, batchSize = 15) {
    const [visibleCount, setVisibleCount] = useState(Math.min(batchSize, totalCount))
    const [newFromIndex, setNewFromIndex] = useState(0)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setVisibleCount(Math.min(batchSize, totalCount))
        setNewFromIndex(0)
    }, [totalCount, batchSize])

    const loadMore = useCallback(() => {
        setVisibleCount((n) => {
            if (n >= totalCount) return n
            const next = Math.min(n + batchSize, totalCount)
            setNewFromIndex(n)
            return next
        })
    }, [batchSize, totalCount])

    useEffect(() => {
        const el = sentinelRef.current
        if (!el || visibleCount >= totalCount) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) loadMore()
        }, { rootMargin: "0px 0px 400px 0px" })

        const onScroll = () => {
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight + 400) loadMore()
        }

        observer.observe(el)
        window.addEventListener("scroll", onScroll, { passive: true })

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", onScroll)
        }
    }, [visibleCount, totalCount, loadMore])

    return {
        visibleCount,
        newFromIndex,
        sentinelRef,
        hasMore: visibleCount < totalCount,
    }
}