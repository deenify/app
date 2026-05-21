/** Builds page numbers with ellipsis, e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 10] */
export function getPaginationRange(
    current: number,
    total: number,
    siblingCount = 1
): Array<number | "ellipsis"> {
    if (total <= 1) return [1]
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const pages = new Set<number>([1, total, current])
    for (let i = 1; i <= siblingCount; i++) {
        pages.add(current - i)
        pages.add(current + i)
    }

    const sorted = Array.from(pages)
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b)

    const result: Array<number | "ellipsis"> = []

    sorted.forEach((p, i) => {
        if (i > 0 && p - sorted[i - 1] > 1) result.push("ellipsis")
        result.push(p)
    })

    return result
}
