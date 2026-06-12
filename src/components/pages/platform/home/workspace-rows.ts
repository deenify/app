import type { WorkspaceModule } from "./content"

/** First row: cols − 1 · middle rows: cols · last row: remainder (≤ cols − 1), centered */
export function groupWorkspaceRows(
    items: WorkspaceModule[],
    columns: number
): WorkspaceModule[][] {
    const cols = Math.max(2, columns)
    if (items.length === 0) return []

    const rows: WorkspaceModule[][] = []
    let index = 0

    rows.push(items.slice(0, Math.min(cols - 1, items.length)))
    index = rows[0].length

    while (index < items.length) {
        const remaining = items.length - index
        if (remaining <= cols - 1) {
            rows.push(items.slice(index))
            break
        }
        rows.push(items.slice(index, index + cols))
        index += cols
    }

    return rows
}

export function getWorkspaceColumns(
    isLgUp: boolean,
    isMdUp: boolean,
    isSmUp: boolean
): number {
    if (isLgUp) return 6
    if (isMdUp) return 5
    if (isSmUp) return 4
    return 3
}
