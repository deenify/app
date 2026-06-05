"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
export type PaginationProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
    align?: "left" | "center" | "right"
    isMobile?: boolean
    scrollContainerId?: string
    scrollDelay?: number
}

/**
 *  Ellipsis component with clickable action 2 dots styled good.
 */
function EllipsisDots({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "inline-flex h-7 min-w-7 items-center justify-center gap-0.5 rounded-full",
                "px-1.5 transition-colors duration-150 hover:bg-gray-100 bg-transparent"
            )}
            aria-label="Jump pages"
        >
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            <span className="h-1 w-1 rounded-full bg-gray-400" />
        </button>
    )
}

/**
 * Intellectual & Minimal Pagination Component.
 * Self-contained logic for professional ellipsis and stable range display.
 */
export function Pagination({
    page,
    totalPages,
    onPageChange,
    className,
    align = "right",
    isMobile = false,
    scrollContainerId,
    scrollDelay = 0
}: PaginationProps) {
    if (totalPages <= 1) return null

    const handlePageChange = (p: number) => {
        if (p < 1 || p > totalPages || p === page) return

        onPageChange(p)

        if (scrollContainerId) {
            setTimeout(() => {
                const element = document.getElementById(scrollContainerId)
                if (!element) return

                const isScrollable = element.scrollHeight > element.clientHeight
                if (isScrollable) {
                    element.scrollTo({ top: 0, behavior: "smooth" })
                } else {
                    element.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }, scrollDelay)
        }
    }

    // Stable pagination logic: calculates which page numbers/dots to show
    const items = React.useMemo(() => {
        const range = (s: number, e: number) => Array.from({ length: Math.max(0, e - s + 1) }, (_, i) => s + i)

        // Mobile: Show max 5 items total (compact range)
        if (isMobile) {
            if (totalPages <= 5) return range(1, totalPages)
            if (page <= 3) return [...range(1, 3), "dots", totalPages]
            if (page >= totalPages - 2) return [1, "dots", ...range(totalPages - 2, totalPages)]
            return [1, "dots", page, "dots", totalPages]
        }

        // Desktop: Standard 7 items range
        if (totalPages <= 7) return range(1, totalPages)
        const lSib = Math.max(page - 1, 1), rSib = Math.min(page + 1, totalPages)
        const showL = lSib > 2, showR = rSib < totalPages - 1
        if (!showL && showR) return [...range(1, 5), "dots", totalPages]
        if (showL && !showR) return [1, "dots", ...range(totalPages - 4, totalPages)]
        return [1, "dots", ...range(lSib, rSib), "dots", totalPages]
    }, [page, totalPages, isMobile])


    // Generic styles  
    const alignClass = { left: "justify-start", center: "justify-center", right: "justify-end" }[align]
    const btnBase = `inline-flex h-7 min-w-7 items-center justify-center rounded-full border 
    text-xs font-medium transition-all duration-200`
    const navBtn = `inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border 
    border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:bg-gray-50 
    disabled:pointer-events-none disabled:opacity-30`


    return (
        <nav
            aria-label="Pagination"
            className={cn(
                "flex w-full items-center gap-1 sm:gap-1.5",
                "select-none user-select-none",
                alignClass,
                className
            )}
        >
            <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className={navBtn}
            >
                <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            {items.map((item, i) => (
                item === "dots" ? (
                    <EllipsisDots
                        key={`dots-${i}`}
                        onClick={() => handlePageChange(
                            i === 1 ? Math.max(1, page - 5) : Math.min(totalPages, page + 5)
                        )}
                    />
                ) : (
                    <button
                        key={`p-${item}`}
                        onClick={() => handlePageChange(item as number)}
                        className={cn(
                            btnBase, item === page
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        )}
                        aria-current={item === page ? "page" : undefined}
                    >
                        {item}
                    </button>
                )
            ))}

            <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className={navBtn}
            >
                <ChevronRight className="h-3.5 w-3.5" />
            </button>
        </nav>
    )
}
