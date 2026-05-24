"use client"

import { useState, useMemo, useEffect } from "react"

/**
 * A clean and minimal hook for managing paginated data.
 * @param items The full list of items to paginate.
 * @param pageSize Number of items per page.
 */
export function usePagination<T>(items: T[], pageSize: number = 10) {
    const [page, setPage] = useState(1)

    // Calculate total pages, ensuring at least 1 page exists
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

    // Reset to first page when items change (e.g. filters applied)
    useEffect(() => {
        setPage(1)
    }, [items.length])

    // Ensure current page is within valid range if items are removed
    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages)
        }
    }, [page, totalPages])

    // Get the current slice of items
    const paginatedItems = useMemo(() => {
        const start = (page - 1) * pageSize
        return items.slice(start, start + pageSize)
    }, [items, page, pageSize])

    return {
        page,
        setPage,
        totalPages,
        paginatedItems,
        totalItems: items.length
    }
}
