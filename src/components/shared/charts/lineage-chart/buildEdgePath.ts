import type { LineageEdgeRouting } from "./types"

type Point = { x: number; y: number }

type PathInput = {
    from: Point
    to: Point
    nodeWidth: number
    nodeHeight: number
    routing: LineageEdgeRouting
    direction: "vertical" | "horizontal"
    /** Shared trunk X for sibling fan-out (horizontal layout) */
    busX?: number
}

function anchorVertical(from: Point, to: Point, nodeWidth: number, nodeHeight: number) {
    return {
        start: { x: from.x + nodeWidth / 2, y: from.y + nodeHeight },
        end: { x: to.x + nodeWidth / 2, y: to.y },
    }
}

function anchorHorizontal(from: Point, to: Point, nodeWidth: number, nodeHeight: number) {
    return {
        start: { x: from.x + nodeWidth, y: from.y + nodeHeight / 2 },
        end: { x: to.x, y: to.y + nodeHeight / 2 },
    }
}

export function buildEdgePath({
    from,
    to,
    nodeWidth,
    nodeHeight,
    routing,
    direction,
    busX,
}: PathInput): string {
    const { start, end } =
        direction === "vertical"
            ? anchorVertical(from, to, nodeWidth, nodeHeight)
            : anchorHorizontal(from, to, nodeWidth, nodeHeight)

    if (routing === "straight") {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`
    }

    if (routing === "orthogonal") {
        if (direction === "vertical") {
            const midY = start.y + (end.y - start.y) / 2
            return `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`
        }

        if (busX !== undefined) {
            return `M ${start.x} ${start.y} L ${busX} ${start.y} L ${busX} ${end.y} L ${end.x} ${end.y}`
        }

        const midX = start.x + (end.x - start.x) / 2
        return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`
    }

    const dx = end.x - start.x
    const dy = end.y - start.y
    const c1 =
        direction === "vertical"
            ? { x: start.x, y: start.y + dy * 0.45 }
            : { x: start.x + dx * 0.45, y: start.y }
    const c2 =
        direction === "vertical"
            ? { x: end.x, y: end.y - dy * 0.45 }
            : { x: end.x - dx * 0.45, y: end.y }

    return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`
}

/** Bus X between parent right edge and children for visible fan-out */
export function computeSiblingBusX(
    parentRight: number,
    childLefts: number[],
    nodeWidth: number
): number {
    if (childLefts.length === 0) return parentRight + nodeWidth * 0.4
    const nearest = Math.min(...childLefts)
    return parentRight + (nearest - parentRight) * 0.38
}
