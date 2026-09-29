"use client"

import { useCallback, useEffect, useRef, useState, type Ref } from "react"

export type UseIncrementalRevealOptions<T> = {
    items: T[]
    /** Items revealed per load. Default 15. */
    batchLength?: number
    /** Load more when the sentinel is within this many px of the viewport bottom. Default 200. */
    offsetTop?: number
}

export type UseIncrementalRevealResult<T> = {
    /** Currently revealed slice of the source array. */
    items: T[]
    sentinelRef: Ref<HTMLDivElement>
    /** Start index of the latest batch — use with `Stagger` for entrance animation. */
    newFromIndex: number
    hasMore: boolean
}

/**
 * Incrementally reveals a large list in fixed-size batches when a sentinel nears the viewport.
 *
 * @example
 * ```tsx
 * const { items, sentinelRef, newFromIndex } = useIncrementalReveal({
 *   items: surahs,
 *   batchLength: 10,
 *   offsetTop: 200,
 * })
 *
 * return (
 *   <>
 *     {items.map((surah, i) => (
 *       <Stagger key={surah.id} index={i - newFromIndex} animate={i >= newFromIndex}>
 *         <Card surah={surah} />
 *       </Stagger>
 *     ))}
 *     <div ref={sentinelRef} className="col-span-full h-px w-full" aria-hidden />
 *   </>
 * )
 * ```
 */
export function useIncrementalReveal<T>({
    items: sourceItems,
    batchLength = 15,
    offsetTop = 200,
}: UseIncrementalRevealOptions<T>): UseIncrementalRevealResult<T> {
    const totalCount = sourceItems.length
    const [visibleCount, setVisibleCount] = useState(() =>
        Math.min(batchLength, totalCount)
    )
    const [newFromIndex, setNewFromIndex] = useState(0)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    const visibleCountRef = useRef(visibleCount)
    visibleCountRef.current = visibleCount

    useEffect(() => {
        const next = Math.min(batchLength, sourceItems.length)
        setVisibleCount(next)
        setNewFromIndex(0)
        visibleCountRef.current = next
    }, [sourceItems.length, batchLength])

    const loadMore = useCallback(() => {
        setVisibleCount((current) => {
            if (current >= totalCount) return current
            const next = Math.min(current + batchLength, totalCount)
            setNewFromIndex(current)
            visibleCountRef.current = next
            return next
        })
    }, [batchLength, totalCount])

    const loadMoreRef = useRef(loadMore)
    loadMoreRef.current = loadMore

    const isNearSentinel = useCallback(() => {
        const el = sentinelRef.current
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= window.innerHeight + offsetTop
    }, [offsetTop])

    const tryLoadMore = useCallback(() => {
        if (visibleCountRef.current >= totalCount) return
        loadMoreRef.current()
    }, [totalCount])

    // Single observer — stable deps so it is not torn down on every batch (avoids multi-second gaps).
    useEffect(() => {
        const el = sentinelRef.current
        if (!el || totalCount === 0) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) tryLoadMore()
            },
            { rootMargin: `0px 0px ${offsetTop}px 0px`, threshold: 0 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [offsetTop, totalCount, tryLoadMore])

    // If the sentinel stays in view after a batch, load the next batch immediately (no scroll nudge needed).
    useEffect(() => {
        if (visibleCount >= totalCount) return
        const id = requestAnimationFrame(() => {
            if (isNearSentinel()) tryLoadMore()
        })
        return () => cancelAnimationFrame(id)
    }, [visibleCount, totalCount, isNearSentinel, tryLoadMore])

    return {
        items: sourceItems.slice(0, visibleCount),
        sentinelRef,
        newFromIndex,
        hasMore: visibleCount < totalCount,
    }
}
