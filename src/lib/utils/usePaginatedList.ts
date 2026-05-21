"use client"

import { useEffect, useMemo, useState } from "react"

type Identifiable = { id?: string }

function listFingerprint<T>(items: T[], getId?: (item: T) => string): string {
    return items
        .map((item, index) => {
            if (getId) return getId(item)
            const id = (item as Identifiable).id
            return id ?? `idx-${index}`
        })
        .join(",")
}

export function usePaginatedList<T>(
    items: T[],
    pageSize = 6,
    getId?: (item: T) => string
) {
    const [page, setPage] = useState(1)

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
    const fingerprint = useMemo(() => listFingerprint(items, getId), [items, getId])

    useEffect(() => {
        if (page > totalPages) setPage(totalPages)
    }, [page, totalPages])

    useEffect(() => {
        setPage(1)
    }, [fingerprint, pageSize])

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * pageSize
        return items.slice(start, start + pageSize)
    }, [items, page, pageSize])

    return {
        page,
        setPage,
        totalPages,
        pageSize,
        paginatedItems,
        totalItems: items.length,
    }
}
