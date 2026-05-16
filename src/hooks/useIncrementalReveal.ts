"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Incrementally reveals a large list in fixed-size batches.
 *
 * This hook is useful for infinite-scroll style UIs where rendering everything
 * at once would be heavy. It reveals an initial batch, then auto-loads more
 * items when a sentinel element approaches the viewport.
 *
 * @param totalCount Total number of items available in the source list.
 * @param batchSize Number of items to reveal per load cycle. Defaults to 15.
 *
 * @returns
 * - `visibleCount`: number of items that should currently be rendered
 * - `newFromIndex`: start index for the latest appended batch
 * - `sentinelRef`: attach this to a bottom sentinel div
 * - `hasMore`: whether more items are still hidden
 *
 * @example
 * ```tsx
 * const { visibleCount, sentinelRef, hasMore } = useIncrementalReveal(items.length, 20)
 * const visibleItems = items.slice(0, visibleCount)
 *
 * return (
 *   <>
 *     {visibleItems.map((item) => <Card key={item.id} item={item} />)}
 *     {hasMore && <div ref={sentinelRef} className="h-8" />}
 *   </>
 * )
 * ```
 */
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
        }, { rootMargin: "0px 0px 800px 0px" })

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