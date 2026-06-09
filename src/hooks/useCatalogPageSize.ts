"use client"

import { useBreakpoint } from "@/hooks/useBreakpoint"

/**
 * Page size aligned with catalog grid columns:
 * grid-cols-1 → 8 | xs:2 → 8 | sm:3 → 9 | lg:2 → 8 | xl:3 → 9 | 2xl:4 → 12
 */
export function useCatalogPageSize(): number {
    const is2XlUp = useBreakpoint("2xl", "up")
    const isXlUp = useBreakpoint("xl", "up")
    const isLgUp = useBreakpoint("lg", "up")
    const isSmUp = useBreakpoint("sm", "up")
    const isXsUp = useBreakpoint("xs", "up")

    if (is2XlUp) return 12
    if (isXlUp) return 9
    if (isLgUp) return 8
    if (isSmUp) return 9
    if (isXsUp) return 8
    return 8
}
