"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { getPaginationRange } from "@/lib/utils/pagination-range"

export type PaginationProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
    align?: "left" | "center" | "right"
}

const pageBtn =
    "inline-flex h-7 min-w-7 items-center justify-center rounded-full border text-xs font-medium transition-[background-color,border-color,color,opacity] duration-150 ease-out"
const pageIdle = "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
const pageActive = "border-emerald-600 bg-emerald-600 text-white"
const navBtn =
    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-[background-color,opacity] duration-150 ease-out hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-35"

function EllipsisDots({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex h-7 min-w-7 items-center justify-center gap-0.5 rounded-full bg-transparent px-1.5 transition-colors duration-150 hover:bg-gray-100"
            aria-label="More pages"
        >
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            <span className="h-1 w-1 rounded-full bg-gray-400" />
        </button>
    )
}

export function Pagination({
    page,
    totalPages,
    onPageChange,
    className,
    align = "right",
}: PaginationProps) {
    if (totalPages <= 1) return null

    const range = getPaginationRange(page, totalPages, 1)
    const alignClass =
        align === "left" ? "justify-start" : align === "center" ? "justify-center" : "justify-end"

    const go = (p: number) => {
        if (p < 1 || p > totalPages || p === page) return
        onPageChange(p)
    }

    return (
        <nav
            className={cn("flex w-full min-w-0 flex-wrap items-center gap-1", alignClass, className)}
            aria-label="Pagination"
        >
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => go(page - 1)}
                className={navBtn}
                aria-label="Previous page"
            >
                <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            {range.map((item, i) =>
                item === "ellipsis" ? (
                    <EllipsisDots
                        key={`ellipsis-${i}`}
                        onClick={() => {
                            const next = range[i + 1]
                            const prev = range[i - 1]
                            if (typeof next === "number" && next > page) {
                                go(Math.min(totalPages, page + 3))
                            } else if (typeof prev === "number" && prev < page) {
                                go(Math.max(1, page - 3))
                            }
                        }}
                    />
                ) : (
                    <button
                        key={`p-${item}`}
                        type="button"
                        onClick={() => go(item)}
                        aria-current={item === page ? "page" : undefined}
                        className={cn(pageBtn, item === page ? pageActive : pageIdle)}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => go(page + 1)}
                className={navBtn}
                aria-label="Next page"
            >
                <ChevronRight className="h-3.5 w-3.5" />
            </button>
        </nav>
    )
}
